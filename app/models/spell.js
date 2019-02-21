export default class Spell {
  constructor(data) {
    this.name = data.name
    this.description = data.desc
    this.range = data.range
    this.duration = data.duration
    this.index = data.index
    this.url = data.url
    this.level = data.level
  }
  getTemplate() {
    return `
    <li onclick="app.controllers.spellController.setActive('${this.url}')">${this.name}</li>
    `
  }

  getDetails() {
    return `
    <div class="card">
    <div class="card-title">
    <h3>${this.name}</h3>
  </div>
  <div class="card-body">
  <p>${this.range}</p>
  <p>${this.duration}</p>
  <p>${this.level}</p>
    <p>${this.description}</p>
  </div>
  <button onclick="app.controllers.spellController.learnSpell()">Learn</button>
</div>`

  }
}