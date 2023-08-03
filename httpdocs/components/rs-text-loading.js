const component = 'rs-text-loading'
const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      margin: 0 var(--gap);
    }

    cite {
        position: relative;
        top: calc(var(--header-height) + var(--gap));
        width: 100%;
        transition: transform 750ms ease;
    }

    cite {
      display: block;
      margin: 0 auto;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      text-align: center;
      text-overflow: '_';
      overflow: hidden;
      white-space: nowrap;
      box-sizing: border-box;
      max-width: 100%;
      transition: opacity 750ms ease;
      opacity: 0;
      color:#fff;
    }

    cite.static {
        opacity: 1;
    }

    /* Estilos para diferentes resoluciones aquí */

  </style>
  <cite></cite>
`

customElements.define(
  component,

  class extends HTMLElement {
    placeholder = 'Cargando imágenes...' // Texto de carga
    delay = { typing: 50 } // Retardo de escritura
    cite
    loadingInterval

    constructor() {
      super()
      const root = this.attachShadow({ mode: 'open' })
      root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
      this.cite = this.shadowRoot.querySelector('cite')
      this.startLoading()
    }

    get text() {
      return this.cite.innerText.trim()
    }

    set text(text) {
      const content = text.trim().length ? text.trim() : this.placeholder

      if (this.cite.innerText === content) {
        return
      }

      this.cite.innerText = content // Establecer el texto directamente
      this.cite.classList.remove('static') // Ocultar el texto (opacidad 0)

      // Agregar un retardo antes de aplicar la transición para asegurarte de que se aplique la opacidad 0 antes de cambiar a opacidad 1
      setTimeout(() => {
        this.cite.classList.add('static') // Mostrar el texto (opacidad 1)
      }, 50)
    }

    startLoading() {
      this.text = this.placeholder
    }

    hide() {
      this.style.display = 'none'
    }
  }
)
