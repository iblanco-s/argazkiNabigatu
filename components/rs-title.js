import { database } from '../modules/retrosantander.js'

const component = 'rs-title'
const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      margin: 0 var(--gap);
      max-width: calc(100% - 200px);
      position: relative;
    }

    cite {
      display: block;
      margin: 0 auto;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      box-sizing: border-box;
      max-width: 100%;
      transition: width linear;
    }

    cite.static {
      text-overflow: ellipsis;
    }

    @media (max-width: 1536px) {
    }

    @media (max-width: 1280px) {
      cite {
        text-align: left;
        margin: 0;
      }
    }

    @media (max-width: 1024px) {
      cite {
        font-size: 18px;
      }
    }

    @media (max-width: 768px) {
      :host {
        max-width: calc(100% - 280px);
      }
      
      cite {
        font-size: 15px;
      }
    }

    @media (max-width: 640px) {
      :host {
        max-width: calc(100% - 220px);
      }
    }
  </style>
  <cite></cite>
`

customElements.define(
  component,

  class extends HTMLElement {
    placeholder = 'Explora miles de imágenes históricas'
    delay = { deleting: 5, typing: 30 }
    cite

    constructor() {
      super()
      const root = this.attachShadow({ mode: 'open' })
      root.append(template.content.cloneNode(true))
    }

    connectedCallback() {
      this.cite = this.shadowRoot.querySelector('cite')
    }

    get caption() {
      return this.cite.innerText.trim()
    }

    set caption(caption) {
      const text = caption.trim().length ? caption.trim() : this.placeholder

      if (this.cite.innerText === text) {
        return
      }

      const duration = this.cite.innerText.length * this.delay.deleting

      this.cite.style.width = '0ch'
      this.cite.style.transitionDuration = `${duration}ms`
      this.cite.classList.remove('static')

      setTimeout(() => {
        const duration = text.length * this.delay.typing
        this.cite.innerText = text
        this.cite.style.width = `${text.length}ch`
        this.cite.style.transitionDuration = `${duration}ms`
        setTimeout(() => this.cite.classList.add('static'), duration)
      }, duration)
    }
  }
)
