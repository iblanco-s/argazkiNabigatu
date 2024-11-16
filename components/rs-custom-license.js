const component = 'rs-license'
const template = document.createElement('template')

template.innerHTML = `
  <style>
    :host {
      text-align: center;
    }
    p {
      font-size: 16px;
      margin: 0;
      color: #ffffff70;
    }
    span {
      font-size: 16px;
      margin: 0;
      color: #ffffff70;
      text-decoration: underline;
    }
  </style>
  <p>
    Con licencia: <span id="license-text"></span>
  </p>
`

class RSLicense extends HTMLElement {
	constructor() {
	  super()
	  const root = this.attachShadow({ mode: 'open' })
	  root.append(template.content.cloneNode(true))
	}

	connectedCallback() {
	  const license = this.getAttribute('license') || 'CC BY-NC-SA 4.0'
	  const licenseText = this.shadowRoot.getElementById('license-text')
	  licenseText.textContent = license
	}
}

customElements.define(
  component,

  RSLicense
)