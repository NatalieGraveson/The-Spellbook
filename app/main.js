import SpellController from "./components/spellController.js";



class App {
  constructor() {
    this.controllers = {
      spellController: new SpellController()
    }
  }
}

// @ts-ignore
window.app = new App()