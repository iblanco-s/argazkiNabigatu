const component = 'rs-error-modal'
const template = document.createElement('template')

template.innerHTML = `
  <style>
    .modal {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(23, 23, 23, 0.95);
      padding: 24px 32px;
      border-radius: 12px;
      z-index: 1000;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      max-width: 400px;
      width: calc(100% - 48px);
      box-sizing: border-box;
    }

    .modal.show {
      display: block !important;
    }

    .modal h2 {
      margin-top: 0;
      margin-bottom: 16px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 1.2rem;
      font-weight: 500;
    }

    .modal p {
      color: rgba(255, 255, 255, 0.7);
      line-height: 1.5;
      margin: 0 0 20px 0;
      font-size: 0.95rem;
    }

    .close-button {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 24px;
      height: 24px;
      border: none;
      background: none;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      transition: color 0.2s ease;
    }

    .close-button:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    @media (max-width: 480px) {
      .modal {
        padding: 20px 24px;
        width: calc(100% - 32px);
      }

      .modal h2 {
        font-size: 1.1rem;
        margin-bottom: 12px;
      }

      .modal p {
        font-size: 0.9rem;
        margin-bottom: 16px;
      }
    }
  </style>
  <div class="modal">
    <button class="close-button" aria-label="Close">×</button>
    <h2>⚠️   Error por parte de Argazki</h2>
    <p>Actualmente, el servidor del Gobierno Vasco que aloja las imágenes está dando error. El fallo ya ha sido notificado al departamento técnico y se está investigando.</p>
  </div>
`

customElements.define(
  component,
  class extends HTMLElement {
    constructor() {
      super()
      const root = this.attachShadow({ mode: 'open' })
      root.append(template.content.cloneNode(true))
      this.modal = root.querySelector('.modal')
      this.setupCloseButton()
    }

    setupCloseButton() {
      const closeButton = this.shadowRoot.querySelector('.close-button')
      closeButton.addEventListener('click', () => this.hide())
    }

    show() {
      if (this.modal) {
        this.modal.classList.add('show')
      }
    }

    hide() {
      if (this.modal) {
        this.modal.classList.remove('show')
      }
    }
  }
)