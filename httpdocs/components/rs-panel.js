import { app } from '../modules/retrosantander.js'
import './rs-license-cdis.js'
import './rs-license-cc-by-sa.js'
import './rs-license-cc-by-nc-sa.js'

const component = 'rs-panel'
const template = document.createElement('template')
const facesPerRow = 5

template.innerHTML = `
  <style>
    aside {
      position: fixed;
      width: 100%;
      max-width: var(--panel-width);
      height: calc(100% - var(--header-height));
      top: var(--header-height);
      left: 0;
      overflow: scroll;
      box-sizing: border-box;
      padding: var(--gap);
      border-right: 1px solid var(--color-neutral-800);
      box-shadow: 5px 0 5px #1c191750;
      background-color: #171717f0;
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      transition: 350ms;
      opacity: 1;
    }

    aside.hidden {
      transform: translateX(calc(-1 * var(--panel-width)));
      opacity: 0;
    }

    aside button {
      position: absolute;
      width: 4em;
      height: 4em;
      top: .25em;
      right: .25em;
      padding: 0;
      border-radius: 100%;
      border: none;
      background: transparent;
      transition: background ease-in-out 150ms;
      cursor: pointer;
    }

    aside button:hover {
      background: var(--color-neutral-800);
    }

    aside button svg {
      display: block;
      width: 25px;
      margin: auto;
      stroke: currentColor;
      stroke-width: 2px;
      color: var(--color-neutral-500);
      transition: color ease-in-out 150ms;
    }

    aside button:hover svg {
      color: var(--color-neutral-400);
    }

    aside button svg path {
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    aside h2 {
      font-size: 11px;
      margin: 0 0 10px 0;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--color-neutral-400);
    }

    aside ul {
      margin: 0;
      padding: 0;
      line-height: 1.5;
      list-style: none;
    }

    aside section ul li {
      width: calc(100% / ${facesPerRow});
      display: inline;
    }

    aside a {
      color: inherit;
      text-decoration: underline;
      text-decoration-style: dotted;
      text-decoration-thickness: 2px;
    }

    aside a:hover {
      text-decoration-style: solid;
    }

    aside section {
      font-weight: 500;
    }

    aside section.hidden {
      display: none;
    }

    aside section:not(:first-of-type) h2 {
      margin-top: calc(2 * var(--gap));
    }

    aside section#details svg {
      width: 20px;
      vertical-align: middle;
      stroke: currentColor;
      stroke-width: 2px;
      fill: none;
    }

    aside section#details dl {
      display: grid;
      grid-template-columns: 25px auto;
      grid-template-rows: auto;
      row-gap: calc(var(--gap) / 3);
      margin: 0;
    }

    aside section#details dl dd {
      grid-column-start: 2;
      display: flex;
      align-items: center;
      margin: 0;
      text-overflow: ellipsis;
    }

    aside section#details dl dt svg path {
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    aside section#details dl dt,
    aside section#details dl dd {
      vertical-align: middle;
    }

    aside section#details abbr {
      cursor: help;
    }

    aside section#faces ul {
      --border-width: 3px;
      display: flex;
      flex-wrap: wrap;
    }

    aside section#faces ul li {
      font-size: 0;
      padding: var(--border-width);
      box-sizing: border-box;
    }

    aside section#objects ul li.active {
      color: var(--color-red-600);
    }

    aside section#faces ul li img {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border: var(--border-width) solid transparent;
      border-radius: 100%;
      background-repeat: no-repeat;
    }

    aside section#faces ul li img.active {
      border-color: var(--color-yellow-500);
    }

    aside rs-license-cc-by-sa {
      display: block;
      margin-top: calc(2 * var(--gap));
    }

    @media (max-width: 768px) {
      aside {
        font-size: 14px;
        top: auto;
        bottom: 0;
        height: 30vh;
        border-top-left-radius: 1em;
        border-top-right-radius: 1em;
        box-shadow: 0 -5px 5px #1c191750;
      }

      aside section#details dl {
        display: flex;
        flex-wrap: wrap;
      }

      aside section#details dl dt {
        width: 25px;
      }

      aside section#details dl dd {
        width: calc(50% - 25px);
      }
    }

    /* Estilo para el contenedor del checkbox */
      .custom-checkbox {
        display: block;
        position: relative;
        padding-left: 25px;
        margin-bottom: 12px;
        margin-top:12px;
        cursor: pointer;
        user-select: none;
      }

      /* Estilo para el checkbox oculto */
      .custom-checkbox input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
      }

      /* Estilo para la casilla de verificación personalizada */
      .custom-checkbox .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: #ccc;
        border-radius: 4px;
      }

      /* Estilo cuando el checkbox está marcado */
      .custom-checkbox input:checked ~ .checkmark {
        background-color: #2196f3;
      }

      /* Estilo para la marca de verificación que aparecerá cuando el checkbox esté marcado */
      .custom-checkbox .checkmark:after {
        content: '';
        position: absolute;
        display: none;
      }

      /* Mostrar la marca de verificación cuando el checkbox está marcado */
      .custom-checkbox input:checked ~ .checkmark:after {
        display: block;
      }

      /* Estilo para la marca de verificación */
      .custom-checkbox .checkmark:after {
        left: 6px;
        top: 3px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
      }
  </style>
  <aside class="hidden">
    <button>
      <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 24 24">
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <section id="details">
      <h2>Ficha técnica</h2>
      <dl></dl>
    </section>

    <section id="faces">
      <h2><span></span> Personas detectadas</h2>
      <ul></ul>
    </section>

    <section id="objects">
      <h2><span></span> Objetos detectados</h2>
      <ul></ul>
    </section>

    <section id="tags">
      <h2>Etiquetas automáticas</h2>
      <ul></ul>
    </section>

    <footer></footer>
  </aside>
`

customElements.define(
  component,

  class extends HTMLElement {
    constructor() {
      super()
      const root = this.attachShadow({ mode: 'open' })
      root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
      this.aside = this.shadowRoot.querySelector('aside')
      this.details = this.shadowRoot.querySelector('dl')
      this.button = this.aside.querySelector('button')
      this.footer = this.shadowRoot.querySelector('footer')

      this.button.addEventListener('click', () => app.restore())

      this.aside.addEventListener('mouseover', (event) => {
        if (event.target.dataset.id) {
          app.activeLayer = event.target.dataset.id
        }
      })

      this.aside.addEventListener('mouseout', (event) => {
        if (event.target.dataset.id) {
          app.activeLayer = false
        }
      })
    }

    set activeLayer(id) {
      this.aside.querySelectorAll('section *[data-id]').forEach((element) => {
        element.classList.toggle('active', element.dataset.id === id)
      })
    }

    set data(data) {
      const panel = this.shadowRoot.querySelector('aside')

      if (!data) {
        panel.classList.add('hidden')
        return
      }

      const excludeLabels = ['Female', 'Male', 'Woman', 'Man', 'Child', 'Adult']

      data.objects = data.objects.filter(
        (item) => !excludeLabels.includes(item.label)
      )

      const { details, faces, objects, tags } = data

      this.details.innerHTML = app.project.panel(details)

      Array('faces', 'objects', 'tags').forEach((key) => {
        this.shadowRoot
          .querySelector(`section#${key}`)
          .classList.toggle('hidden', !data[key].length)
      })

      panel.querySelector('section#faces h2 span').innerHTML = faces.length
      panel.querySelector('section#objects h2 span').innerHTML = objects.length

      const url = app.project.image(details.id)

      var checkbox = this.shadowRoot.getElementById(`colorize_${details.id}`)

      function getImageElement(src, defaultUrl) {
        const imgElement1 = app.selected.shadowRoot.querySelector(
          `img[src="${src}"]`
        )
        const imgElement2 = app.selected.shadowRoot.querySelector(
          `img[src="${defaultUrl}"]`
        )

        return imgElement1 ? imgElement1 : imgElement2
      }

      checkbox.addEventListener('change', function () {
        const originalUrl = url
        const colorizedUrl = url.replace('/webp/', '/colorized/') // Cambia el atributo src al de la imagen coloreada
        const defaultUrl = '/retrogasteiz/unavailable.png'
        let imgElement

        if (checkbox.checked) {
          imgElement = getImageElement(originalUrl, defaultUrl)
          imgElement.src = colorizedUrl
        } else {
          imgElement = getImageElement(colorizedUrl, defaultUrl)
          imgElement.src = originalUrl
        }

        // En caso de error, cambia a la imagen por defecto
        imgElement.onerror = function () {
          imgElement.src = defaultUrl
        }
      })

      const containerWidth = panel.querySelector('ul').offsetWidth / facesPerRow
      const containerHeight = containerWidth

      const { width, height } = app.selected.getBoundingClientRect()
      const aspectRatio = width / height

      panel.querySelector('section#faces ul').innerHTML = faces
        .map((face) => {
          const backgroundHeight = containerHeight / face.height
          const backgroundWidth = backgroundHeight * aspectRatio

          const realFaceWidth =
            (containerHeight * aspectRatio * face.width) / face.height

          const facePadding = (containerWidth - realFaceWidth) / 2 - 5

          const positionX = backgroundWidth * face.left - facePadding
          const positionY = backgroundHeight * face.top

          return `
            <li style="height: ${containerHeight}px">
              <img
                src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                data-id="${face.id}"
                alt="${face.name}"
                style="
                  background-image: url(${url});
                  background-size: ${backgroundWidth}px ${backgroundHeight}px;
                  background-position:
                    -${Math.max(positionX, 0)}px
                    -${Math.max(positionY, 0)}px;
                "
              />
            </li>
          `
        })
        .join('')

      panel.querySelector('section#objects ul').innerHTML = objects
        .map(
          (object) =>
            `<li data-id="${object.id}" data-label="${object.label}">${object.name}</li>`
        )
        .join(', ')

      panel.querySelector('section#tags ul').innerHTML = tags
        .map(
          (tag) => `
            <li><a
                href="/?q=${tag.name}"
                title="«${tag.label}» (Confianza: ${tag.confidence} %)"
              >${tag.name}</a></li>`
        )
        .join(', ')

      if (details.license === 'cdis') {
        this.footer.innerHTML = `<rs-license-cdis></rs-license-cdis>`
      } else if (details.license === 'cc-by-sa') {
        this.footer.innerHTML = `<rs-license-cc-by-sa></rs-license-cc-by-sa>`
      } else if (details.license === 'CC BY-NC-SA 4.0') {
        this.footer.innerHTML = `<rs-license-cc-by-nc-sa></rs-license-cc-by-nc-sa>`
      }

      panel.classList.remove('hidden')
    }
  }
)
