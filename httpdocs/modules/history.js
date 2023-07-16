class History {
  // Agrega Params como una propiedad estática de History
  static I = 'i'
  static P = 'p'
  static Q = 'q'

  constructor() {
    this.url = new URL(window.location.href)
  }

  // Añade o actualiza un parámetro
  addParam(param, value) {
    if (![History.I, History.P, History.Q].includes(param)) {
      throw new Error('Parámetro desconocido: ' + param)
    }

    this.url.searchParams.set(param, value)
    window.history.pushState({}, '', this.url)
  }

  // Obtiene el valor de un parámetro
  getParam(param) {
    if (![History.I, History.P, History.Q].includes(param)) {
      throw new Error('Parámetro desconocido: ' + param)
    }

    return this.url.searchParams.get(param)
  }

  // Elimina un parámetro
  removeParam(param) {
    if (![History.I, History.P, History.Q].includes(param)) {
      throw new Error('Parámetro desconocido: ' + param)
    }

    this.url.searchParams.delete(param)
    window.history.pushState({}, '', this.url)
  }
}

export default History
