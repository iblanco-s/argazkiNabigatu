// rs-permalink.js
import { app } from './retrosantander.js'
import '../components/rs-grid.js'

const grid = document.querySelector('rs-grid')

export const handlePermalink = (permalink) => {
  const checkElementPresence = () => {
    const targetElement = grid.container.querySelector(
      '[label-id^="label-' + permalink + '"]'
    )
    if (targetElement) {
      targetElement.click()
    } else {
      setTimeout(checkElementPresence, 5000)
    }
  }

  if (permalink) {
    app.permalink = permalink
    app.searchImage()
    setTimeout(checkElementPresence, 1000)
  }
}
