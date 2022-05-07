const component = 'rs-menu'
const template = document.createElement('template')

template.innerHTML = `
  <style>
    button {
      padding: 0;
      margin: 0 var(--gap);
      border: none;
      background: none;
      cursor: pointer;
      transition: transform 250ms;
    }

    button.open {
      transform: rotate(90deg);
    }

    button svg {
      height: 25px;
      vertical-align: middle;
      fill: white;
      transition: transform 200ms ease;
    }

    article {
      position: fixed;
      width: 100%;
      max-width: var(--about-width);
      height: calc(100% - var(--header-height));
      top: var(--header-height);
      right: 0;
      overflow: scroll;
      box-sizing: border-box;
      padding: var(--gap);
      border-left: 1px solid var(--color-neutral-700);
      box-shadow: -5px 0 5px #1c191750;
      background-color: #171717f0; /* --color-neutral-900 */
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      transition: 350ms;
      font-size: 15px;
      font-weight: 400;
      line-height: 1.35;
      padding: calc(2 * var(--gap));
    }

    article.hidden {
      transform: translateX(var(--about-width));
    }

    article h1 {
      font-size: 21px;
      width: calc(100% + 2* var(--gap));
      margin: 0 0 0 -15px;
      padding: 0 0 0 15px;
      background: var(--color-neutral-200);
      color: var(--color-neutral-800);
    }

    article a {
      color: inherit;
      text-decoration: underline;
      text-decoration-style: dotted;
      text-decoration-thickness: 2px;
    }

    article a:hover {
      text-decoration-style: solid;
    }

    article strong {
      font-weight: 700;
    }

    article ul {
      font-size: 15px;
      list-style: none;
      padding: 0;
      margin: calc(2 * var(--gap)) 0 0 0;
    }

    article ul li {
      display: flex;
      align-items: center;
      margin: calc(var(--gap) / 3) 0;
    }

    article ul li svg {
      height: 16px;
      margin-right: 8px;
      fill: white;
    }
  </style>
  <button>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
    </svg>
  </button>
  <article class="hidden">
    <!--
      Este proyecto es software libre y se distribuye bajo la licencia
      GNU AFFERO GENERAL PUBLIC LICENSE versión 3.

      Esto significa que puedes utilizar este programa para usos personales o
      comerciales, modificarlo a tu gusto y distribuirlo libremente. Pero al
      hacerlo tú también debes publicar el código fuente con tus aportaciones,
      distribuirlo bajo la misma licencia y preservar la información sobre la
      autoría original.

      Para esto último debes mantener en tu sitio web, en un lugar discreto pero
      visible, una mención a Jaime Gómez-Obregón como autor original y un enlace a
      https://github.com/JaimeObregon/retrosantander/.

      Si deseas que sea yo mismo quien adapte este programa al archivo
      fotográfico de tu entidad, quizá puedas contratarme: https://twitter.com/JaimeObregon.
    -->

    <h1>Retrosantander es un experimento</h1>

    <p>
      Un experimento personal de
      <strong>Jaime Gómez-Obregón</strong> con el archivo fotográfico del
      <strong>Centro de Documentación de la Imagen de Santander</strong>
      (CDIS).
    </p>

    <p>
      El CDIS es una entidad dependiente del Ayuntamiento de Santander que
      tiene como objetivo poner a disposición de la ciudadanía el patrimonio
      fotográfico municipal.
    </p>

    <p>
      Las imágenes que aquí puedes ver son obra de sus respectivos autores y
      <strong>los derechos pertenecen al Ayuntamiento de Santander</strong>.
      Estas imágenes te son transmitidas directamente desde los servidores del
      Ayuntamiento. Yo no las he copiado ni modificado, ni tampoco las alojo,
      sirvo o redistribuyo.
    </p>

    <p>
      Por favor, <strong>apoya el trabajo del CDIS</strong> y adquiere una
      licencia de las imágenes que desees utilizar con fines comerciales.
    </p>

    <h1>Retrosantander es software libre</h1>

    <p>
      El código fuente de Retrosantander y una explicación detallada de los
      porqués de este proyecto personal
      <strong>están disponibles en GitHub</strong>
      con licencia abierta.
    </p>

    <ul>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
          <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
        </svg>
        <a href="https://portal.ayto-santander.es/portalcdis/">
          Centro de Documentación de la Imagen de Santander
        </a>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
        </svg>
        <a href="https://twitter.com/jaimeobregon">
          Jaime Gómez-Obregón
        </a>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
        </svg>
        <a href="https://github.com/JaimeObregon/retrosantander/">
          Retrosantander en GitHub
        </a>
      </li>
    </ul>
  </article>
`

customElements.define(
  component,

  class extends HTMLElement {
    hamburger
    article

    constructor() {
      super()
      const root = this.attachShadow({ mode: 'open' })
      root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
      this.hamburger = this.shadowRoot.querySelector('button')
      this.article = this.shadowRoot.querySelector('article')

      this.hamburger.addEventListener('click', () => (this.open = !this.open))

      document.addEventListener('click', (event) => {
        if (event.target !== this) {
          this.open = false
        }
      })

      document.addEventListener('keyup', (event) => {
        event.key === 'Escape' && (this.open = false)
      })
    }

    get open() {
      return this.hamburger.classList.contains('open')
    }

    set open(value) {
      this.hamburger.classList.toggle('open', value)
      this.article.classList.toggle('hidden', !value)
    }
  }
)
