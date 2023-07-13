// rs-permalink.js
import { app } from '../modules/retrosantander.js'
import '../components/rs-grid.js'

const grid = document.querySelector('rs-grid')

export const handlePermalink = (permalink) => {
  const checkElementPresence = () => {
    console.log(`[${permalink}]`)
    const targetElement = grid.container.querySelector(`rs-grid#${permalink}`)
    if (targetElement) {
      targetElement.click()
    } else {
      setTimeout(checkElementPresence, 5000)
    }
  }

  if (permalink) {
    app.permalink = permalink
    app.searchImage()
    // setTimeout(checkElementPresence, 5000)
  }
}
