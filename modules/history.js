class History {
  static I = 'i'
  static P = 'p'
  static Q = 'q'

  constructor() {
    this.url = new URL(window.location.href)
    this.lastState = new URLSearchParams(this.url.search).toString()
    this.updateTimeout = null
    this.debounceDelay = 3000 // Second delay
  }

  debouncedUpdateHistory() {
    clearTimeout(this.updateTimeout)
    this.updateTimeout = setTimeout(() => {
      this.updateHistory()
    }, this.debounceDelay)
  }

  // Añade o actualiza un parámetro
  addParam(param, value) {
    if (![History.I, History.P, History.Q].includes(param)) {
      throw new Error('Parámetro desconocido: ' + param)
    }

    if (param !== History.P) {
      this.url.searchParams.set(param, value)
      this.debouncedUpdateHistory()
    } else {
      this.url.searchParams.set(param, value)
      window.history.replaceState({}, '', this.url)
    }
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
    
    if (param !== History.P) {
      this.debouncedUpdateHistory()
    } else {
      window.history.replaceState({}, '', this.url)
    }
  }

  // Helper method to update history only when there's a meaningful change
  updateHistory() {
    const newState = new URLSearchParams(this.url.searchParams).toString()
    if (this.lastState !== newState) {
      window.history.pushState({}, '', this.url)
      this.lastState = newState
    } else {
      window.history.replaceState({}, '', this.url)
    }
  }
}

export default History
