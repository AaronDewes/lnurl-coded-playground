/** @format */

const main = document.querySelector('main')
import App from './App.svelte'
import '@picocss/pico/css/pico.css'

const app = new App({
  target: main
})

export default app
