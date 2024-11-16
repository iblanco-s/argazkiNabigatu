import { app } from '../modules/retrosantander.js'
import './rs-custom-license.js' // Updated import

const component = 'rs-panel'
const template = document.createElement('template')

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
      display: flex;
      flex-direction: column;
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
      width: calc(100% / 5);
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
	  column-gap: 5px;
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
	.description-container {
		display: inline;
	}

	.short-desc, .ver-mas {
		display: inline;
	}

	.ver-mas {
		margin-left: 5px;
	}

	.ver-mas a {
		text-decoration: underline;
		cursor: pointer;
	}


    /* New styles for additional details */
    aside section#details dt,
    aside section#details dd {
      padding: 5px 0;
    }

    aside section#details img {
      max-width: 100%;
      height: auto;
      margin-bottom: 10px;
    }

    aside section#details .tag-list {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
    }

    aside section#details .tag-list li {
      background-color: var(--color-neutral-700);
      padding: 5px 10px;
      border-radius: 5px;
      list-style: none;
    }

    aside > :not(footer) {
      flex-shrink: 0;
    }

    aside footer {
      margin-top: auto;
      padding-top: calc(var(--gap) * 2);
      flex-shrink: 0;
    }
  </style>
<aside class="hidden">
  <button>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
	  <path d="M6 18L18 6M6 6l12 12" />
	</svg>
  </button>

  <section id="details">
      <h2>Ficha técnica</h2>
      <dl></dl>
  </section>
  
  <section id="tags">
      <h2>Etiquetas Argazki</h2>
      <ul></ul>
  </section>

  <section id="tags_ia">
	  <h2>Etiquetas IA (llama 3.2 Vision 11b)</h2>
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

		this.shadowRoot.addEventListener('click', (event) => {
			if (event.target.closest('.ver-mas')) {
				event.preventDefault();
				this.toggleDescription(event);
			}
		});
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
		this.footer.innerHTML = `<rs-license license="${data.details.license}"></rs-license>`
		this.details.innerHTML = app.project.panel(data)
		const url = data.details.image_url

		const tags = data.details.tags

		panel.querySelector('section#tags ul').innerHTML = tags
		.map(
		  (tag) => `
			<li><a
				href="/?q=${tag}"
				title="${tag}"
			  >${tag}</a></li>`
		)
		.join('')

		const tags_ia = data.details.tags_ia

		panel.querySelector('section#tags_ia ul').innerHTML = tags_ia
		.map(
		  (tag) => `
			<li><a
				href="/?q=${tag}"
				title="${tag}"
			  >${tag}</a></li>`
		)
		panel.classList.remove('hidden')
	  }
  
	  toggleDescription(event) {
		const dd = event.target.closest('dd');
		const shortDesc = dd.querySelector('.short-desc');
		const fullDesc = dd.querySelector('.full-desc');
		const verMas = dd.querySelector('.ver-mas');

		if (shortDesc.style.display !== 'none')
		  shortDesc.style.display = 'none';
		  fullDesc.style.display = 'inline';
		  verMas.style.display = 'none';
	  }

	}
  )
