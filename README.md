# ArgazkiNabigatu: Explorador de Argazki Irekia con IA
![argazkinabigatu](https://github.com/user-attachments/assets/9c7a7eaa-a845-4adc-9e6c-d57401eddffe)


ArgazkiNabigatu es un experimento para mejorar la experiencia de navegación del archivo fotográfico de Argazki Irekia, aplicando tecnologías modernas de IA y una interfaz de usuario intuitiva. El proyecto busca hacer más accesible este valioso patrimonio fotográfico a la ciudadanía, ademas de eliminar la necesidad de clasificar las imagenes manualmente como se estaba haciendo hasta ahora.

## Características principales

1. **Búsqueda instantánea**: Las búsquedas se realizan directamente en el navegador del usuario, proporcionando resultados en tiempo real mientras se escribe.

2. **Visión artificial con LLaMA**: Se usa modelo open source LLaMA Vision 3.2 11B de Meta para el análisis y clasificación de imágenes, permitiendo búsquedas más inteligentes y contextuales.

3. **Interfaz moderna**: Diseñada para ser intuitiva y responsive, facilitando la exploración del archivo fotográfico.

## Arquitectura técnica

- **Frontend**: Desplegado en Vercel con CDN de Cloudflare para optimizar la entrega de contenido
- **Imágenes**: Servidas directamente desde los servidores del Gobierno Vasco
- **Base de datos**: Generada mediante scraping y almacenada en formato JSON
- **IA**: Integración con LLaMA Vision para análisis de imágenes usando la API Together AI

### Proceso de scraping

El proyecto incluye un script Python que:
1. Extrae metadatos e imágenes del archivo original
2. Procesa las imágenes con LLaMA Vision
3. Genera un JSON estructurado con toda la información

## Créditos y agradecimientos

Este proyecto es un fork de [RetroGasteiz](https://github.com/0x10-z/retrogasteiz) desarrollado por [Iker Ocio Zuazo](https://ikerocio.com), que a su vez es un fork de [RetroSantander](https://github.com/JaimeObregon/retrosantander) creado por [Jaime Gómez-Obregón](https://twitter.com/JaimeObregon).

Agradezco especialmente a ambos desarrolladores por compartir su código bajo licencia open source, lo que ha permitido la creación de ArgazkiNabigatu.

## Licencia

Este proyecto es software libre y se distribuye bajo la licencia GNU AFFERO GENERAL PUBLIC LICENSE versión 3.

Esto significa que puedes utilizar este programa para usos personales o comerciales, modificarlo y distribuirlo libremente. Al hacerlo, debes:
- Publicar el código fuente con tus aportaciones
- Distribuirlo bajo la misma licencia
- Preservar la información sobre la autoría original

Para cumplir con este último punto, debes mantener en tu sitio web una mención visible a los autores originales:
- Jaime Gómez-Obregón ([RetroSantander](https://github.com/JaimeObregon/retrosantander))
- Iker Ocio Zuazo ([RetroGasteiz](https://github.com/0x10-z/retrogasteiz))
- Y una mención a este repo
