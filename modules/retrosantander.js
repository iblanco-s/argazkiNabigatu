import { database } from './database.js'
import { projects } from './projects.js'
import History from './history.js'
import '../components/rs-logo.js'
import '../components/rs-title.js'
import '../components/rs-search.js'
import '../components/rs-menu.js'
import '../components/rs-grid.js'
import '../components/rs-panel.js'
import '../components/rs-help.js'
import '../components/rs-loading.js'
import '../components/rs-text-loading.js'
import '../components/rs-error-modal.js'
import { handlePermalink } from './permalink.js'

const debounceDelay = 350

const help = document.querySelector('rs-help')
const logo = document.querySelector('rs-logo')
const grid = document.querySelector('rs-grid')
const menu = document.querySelector('rs-menu')
const title = document.querySelector('rs-title')
const panel = document.querySelector('rs-panel')
const search = document.querySelector('rs-search')
const loading = document.querySelector('rs-loading')
const textLoading = document.querySelector('rs-text-loading')
const errorModal = document.querySelector('rs-error-modal')

// Error handling for images
window.addEventListener('error', (event) => {
  if (event.target instanceof HTMLImageElement) {
    const errorCount = parseInt(sessionStorage.getItem('imageErrorCount') || '0') + 1;
    sessionStorage.setItem('imageErrorCount', errorCount.toString());
    
    if (errorCount >= 5) {
      const errorModal = document.querySelector('rs-error-modal');
      if (errorModal) {
        errorModal.show();
      }
    }
  }
}, true);

window.addEventListener('unhandledrejection', (event) => {
  const errorModal = document.querySelector('rs-error-modal');
  if (errorModal) {
    errorModal.show();
  }
});

// Escapa una cadena para interpolarla de manera segura en HTML
const escape = (string) =>
  string.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
      }[tag])
  )

// Tokeniza una cadena. Véase https://es.stackoverflow.com/a/62032.
// `Manuel   González-Mesones` > `manuel gonzalez mesones`.
const normalize = (string) => {
  return string
    .toLowerCase()
    .normalize('NFD')
    .replace(
      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
      '$1'
    )
    .normalize()
    .replace(/[^a-z0-9ñç ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const app = {
  results: [],

  _permalink: '',
  page: 0,

  history: new History(),

  // Establece el título visible en la cabecera de sitio.
  set title(caption) {
    title.caption = caption
  },

  // Establece el título por defecto de la interfaz.
  set placeholder(caption) {
    title.placeholder = caption
  },

  // Devuelve la imagen que has establecido previamente.
  get permalink() {
    return this._permalink
  },

  // Establece una imagen en concreto que quieres ver.
  set permalink(permalink) {
    this._permalink = permalink
    permalink && this.searchImage()
  },

  // Devuelve el término de búsqueda actual.
  get query() {
    return search.query
  },

  // Consigna un término en el buscador.
  set query(query) {
    search.query = query
  },

  // Muestra (`progress` > 0) u oculta (`progress` < 0) el indicador de carga.
  // `progress` es un valor entre cero y uno, ambos inclusive, que determina
  // el porcentaje de progreso.
  set loading(progress) {
    loading.progress = progress
  },

  // Abre o cierra, en función de `data`, el panel lateral con los datos de una imagen.
  set panel(data) {
    panel.data = data
  },

  // Devuelve la imagen seleccionada, si hay una.
  get selected() {
    return grid.selected
  },

  async setActiveLayerAsync(layer) {
    panel.activeLayer = layer
    grid.activeLayer = layer

    const id = this.selected.getAttribute('id')
    const record = database.find(id)
    this.title = layer ? grid.activeLayer : record.title
  },

  // Destaca un objeto de la visión artificial, cuando hay una imagen seleccionada.
  set activeLayer(layer) {
    this.setActiveLayerAsync(layer).catch((_) => {})
  },

  // Muestra la imágen con el ID existente en `this.permalink`.
  searchImage() {
    const results = database.firstAndSome(app.permalink)

    this.results = results

    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      const url = new URL(document.location.href)
      if (app.permalink !== url.searchParams.get('i')) {
        // history.pushState(
        //   null,
        //   null,
        //   app.permalink ? `/?i=${app.permalink}` : '/'
        // )
        this.history.addParam(History.I, app.permalink)
      }

      this.restore()
      this.results.length ? grid.append() : grid.clear()

      this.title = ''
      help.hidden = Boolean(this.results.length)
    }, debounceDelay)
  },

  // Lanza una búsqueda del término existente en `this.query`.
  search() {
    const { results, suggestions } = database.search(this.query)

    search.suggestions = suggestions

    const unchanged =
      results.length === this.results.length &&
      results.every((item, i) => item === this.results[i])

    if (unchanged) {
      return
    }

    this.results = results

    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      const url = new URL(document.location.href)
      if (app.query !== url.searchParams.get('q')) {
        //history.pushState(null, null, app.query ? `/?q=${app.query}` : '/')
        app.query && this.history.addParam(History.Q, app.query)
      }

      this.restore()
      if (this.page > 0) {
        this.results.length ? grid.append(this.page) : grid.clear()
      } else {
        this.results.length ? grid.append() : grid.clear()
      }
      this.title = ''
      help.hidden = Boolean(this.results.length)
    }, debounceDelay)
  },

  // Restaura el zoom, cierra el panel y deselecciona la imagen que pudiera haber seleccionada.
  restore() {
    grid.restore()
  },
}

// const { hostname } = document.location
// const project = hostname.split('.')[0]

// console.log('Hostname:', hostname)
// console.log('Project:', project)
// console.log('Available projects:', Object.keys(projects))

// if (!project || !projects[project]) {
//   console.error(`No project found for hostname: ${hostname}`)
//   console.error('Available projects:', Object.keys(projects))
//   throw new Error(`No hay ningún proyecto asociado a TEST ${hostname}.`)
// }

// app.project = projects[project]
const project = 'argazki'

if (!projects[project]) {
  console.error(`The forced project '${project}' is not available`)
  console.error('Available projects:', Object.keys(projects))
  throw new Error(`El proyecto forzado '${project}' no está disponible.`)
}

app.project = projects[project]


// logo.innerHTML = app.project.logo
;(async () => {
  const response = await fetch(app.project.about)
  menu.innerHTML = await response.text()
})()
;(async () => {
  const response = await fetch(app.project.help)
  help.innerHTML = await response.text()
})()

await database.load(app.project.database, textLoading)

// Inicializa la aplicación.
const url = new URL(document.location.href)
const count = database.count.toLocaleString()

const query = url.searchParams.get('q')
const photoId = url.searchParams.get('i')
const page = parseInt(url.searchParams.get('p'))

// Orden de prioridad 1 -> Busquedas
app.query = query

// Orden de prioridad 2 -> Si buscas una foto en concreto, no buscas otra cosa
app.permalink = photoId

// Orden de prioridad 3 -> Si buscas cargar una página en concreto, no deberias estar buscando nada más
app.page = page

handlePermalink(photoId)

app.placeholder = app.project.placeholder(count)
app.title = ''

if (query) {
  // Realizar acción basada en el parámetro 'q'
  //console.log(`Realizando búsqueda con el query: ${query}`)
  // ...
} else if (photoId) {
  // Realizar acción basada en el parámetro 'i'
  //console.log(`Mostrando la primera foto con el ID: ${photoId}`)
  // ...
} else if (page) {
  // Realizar acción basada en el parámetro 'p'
  //console.log(`Cargando contenido a partir de la página: ${page}`)
  // ...
} else {
  // No se proporcionaron parámetros válidos
  //console.log('No se proporcionaron parámetros válidos en la URL')
}

// Add event listener for the custom error event
document.addEventListener('showErrorModal', (event) => {
  const errorModal = document.querySelector('rs-error-modal');
  if (errorModal && errorModal instanceof HTMLElement) {
    errorModal.show();
  }
});

export { app, database, escape, normalize }
