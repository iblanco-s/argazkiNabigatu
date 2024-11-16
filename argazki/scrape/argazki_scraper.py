import json
import os
import time
import requests
from bs4 import BeautifulSoup
from together import Together
from difflib import SequenceMatcher
from typing import Dict, List, Tuple, Optional

class ArgazkiScraper:
    def __init__(self):
        self.client = self._initialize_together_client()
        self.script_dir = os.path.dirname(os.path.abspath(__file__))
        self.json_file_path = os.path.join(self.script_dir, 'scraped_photos.json')
        self.base_url = "https://argazki.irekia.euskadi.eus/es/photos/{}"
        
    @staticmethod
    def _initialize_together_client() -> Together:
        api_key = os.environ.get('TOGETHER_API_KEY')
        if not api_key:
            raise ValueError("TOGETHER_API_KEY environment variable not set.")
        return Together(api_key=api_key)

    @staticmethod
    def _is_similar(a: str, b: str, threshold: float = 0.9) -> bool:
        return SequenceMatcher(None, a.lower(), b.lower()).ratio() > threshold

    @staticmethod
    def _parse_date(value: str) -> Optional[Dict[str, int]]:
        try:
            parts = value.split()
            month_dict = {
                'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4,
                'mayo': 5, 'junio': 6, 'julio': 7, 'agosto': 8,
                'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
            }
            return {
                'day': int(parts[0]),
                'month': month_dict.get(parts[2].lower(), 0),
                'year': int(parts[-1])
            }
        except (IndexError, ValueError):
            print(f"Invalid date format: {value}")
            return None

    def get_ai_enhancements(self, image_url: str, title: str, tags: List[str]) -> Tuple[str, List[str]]:
        prompt = (
            f"Título: {title}\n"
            f"Etiquetas: {', '.join(tags)}\n\n"
            "Por favor, proporciona un nuevo título corto relacionado con la imagen y el título dado "
            "Además, proporciona nuevas etiquetas de objetos encontrados en la imagen nuevas"
            "Responde en el siguiente formato JSON:\n"
            "{\n"
            '  "title_ia": "Tu nuevo título aquí",\n'
            '  "tags_ia": ["etiqueta1", "etiqueta2", "etiqueta3", "etiqueta4", "etiqueta5"]\n'
            "}"
        )

        for attempt in range(5):
            try:
                response = self.client.chat.completions.create(
                    model="meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
                    messages=[{
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {"type": "image_url", "image_url": {"url": image_url}}
                        ]
                    }],
                    max_tokens=2048,
                    temperature=0.7,
                    top_p=0.7,
                    top_k=50,
                    repetition_penalty=1,
                    stop=["<|eot_id|>", "<|eom_id|>"],
                    stream=False
                )

                if response and hasattr(response, 'choices') and response.choices:
                    ai_data = json.loads(response.choices[0].message.content)
                    return ai_data.get('title_ia', ''), ai_data.get('tags_ia', [])

            except Exception as e:
                print(f"Attempt {attempt + 1} failed: {e}")
                if attempt < 4: 
                    time.sleep(1)

        return '', []

    def scrape_photo(self, photo_id: int) -> Optional[Dict]:
        url = self.base_url.format(photo_id)
        response = requests.get(url)
        if response.status_code != 200:
            print(f"Failed to retrieve photo {photo_id}")
            return None

        soup = BeautifulSoup(response.content, 'html.parser')
        photo_data = self._extract_basic_info(soup, photo_id)
        
        if not photo_data:
            return None

        # Add AI enhancements
        if photo_data.get("image_url") and photo_data.get("title"):
            title_ia, tags_ia = self.get_ai_enhancements(
                photo_data["image_url"],
                photo_data["title"],
                photo_data.get("tags", [])
            )
            photo_data["title_ia"] = title_ia
            photo_data["tags_ia"] = self._filter_unique_tags(tags_ia, photo_data.get("tags", []))

        return photo_data

    def _extract_basic_info(self, soup: BeautifulSoup, photo_id: int) -> Optional[Dict]:
        photo_data = {"id": str(photo_id), "permalink": str(photo_id)}
        
        # Extract image information
        img_tag = soup.select_one('div.image img')
        if not img_tag:
            return None
            
        photo_data["file"] = img_tag.get('alt', '')
        photo_data["image_url"] = "https:" + img_tag.get('src', '')
        
        # Extract license
        legal_div = soup.select_one('div.legal2')
        if legal_div:
            license_text = legal_div.text.strip()
            license_start = license_text.find("'") + 1
            license_end = license_text.rfind("'")
            photo_data["license"] = license_text[license_start:license_end] if license_start != -1 and license_end != -1 else "Unknown"
        
        # Extract metadata
        self._extract_metadata(soup, photo_data)
        
        return photo_data

    def _extract_metadata(self, soup: BeautifulSoup, photo_data: Dict):
        table = soup.find('table')
        if not table:
            return

        for row in table.find_all('tr', class_='item'):
            label = row.find('span', class_='label').text.strip().rstrip(':')
            value = row.find('td').text.strip()

            if label == 'Descripción':
                photo_data['title'] = value
            elif label == 'Tags':
                tag_td = row.find('td')
                photo_data['tags'] = [span.find('a').text.strip() 
                                    for span in tag_td.find_all('span', class_='tag') 
                                    if span.find('a')] if tag_td else []
            elif label == 'Fecha':
                photo_data['date'] = self._parse_date(value)
            elif label in ['Fuente', 'Ubicación', 'Autor', 'Dimensiones']:
                key = {'Fuente': 'source', 'Ubicación': 'location', 
                      'Autor': 'author', 'Dimensiones': 'size'}[label]
                photo_data[key] = value

    def _filter_unique_tags(self, new_tags: List[str], existing_tags: List[str]) -> List[str]:
        unique_tags = []
        for new_tag in new_tags:
            if not any(self._is_similar(new_tag, existing_tag) 
                      for existing_tag in existing_tags + unique_tags):
                unique_tags.append(new_tag)
        return unique_tags

    def scrape_range(self, start_id: int, end_id: int):
        for photo_id in range(start_id, end_id + 1):
            photo_data = self.scrape_photo(photo_id)
            if photo_data:
                self._save_progress([photo_data])
            print(f"Scraped photo {photo_id}")
            time.sleep(1)  # Rate limiting

    def _save_progress(self, new_photos: List[Dict]):
        # Load existing data
        existing_data = []
        if os.path.exists(self.json_file_path) and os.path.getsize(self.json_file_path) > 0:
            with open(self.json_file_path, 'r', encoding='utf-8') as f:
                existing_data = json.load(f)

        # Add only new photos that don't exist yet
        for new_photo in new_photos:
            if not any(photo['id'] == new_photo['id'] for photo in existing_data):
                existing_data.append(new_photo)
        
        # Save updated data
        with open(self.json_file_path, 'w', encoding='utf-8') as f:
            json.dump(existing_data, f, ensure_ascii=False, indent=4)

def main():
    scraper = ArgazkiScraper()
    start_id = 1
    end_id = 26225
    scraper.scrape_range(start_id, end_id)

if __name__ == "__main__":
    main() 