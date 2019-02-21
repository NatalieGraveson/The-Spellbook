import Spell from "../models/spell.js";



// @ts-ignore
let _spellApi = axios.create({
  baseURL: 'http://www.dnd5eapi.co/api/spells/'
})

// @ts-ignore
let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Natalie/spells/'
})


let _state = {
  apiSpells: [],
  activeSpell: {},
  mySpells: []
}

let _subscribers = {
  apiSpells: [],
  activeSpell: [],
  mySpells: []
}

function setState(prop, data) {
  _state[prop] = data
  _subscribers[prop].forEach(fn => fn())
}

//public
export default class SpellService {
  learnSpell() {
    let spell = _state.activeSpell
    _sandbox.post('', spell)
      .then(res => {
        this.getMySpellsData()
      })
  }
  setActive(url) {
    _spellApi.get(url)
      .then(res => {
        setState('activeSpell', new Spell(res.data))
      })
  }
  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get ApiSpells() {
    return _state.apiSpells.map(s => new Spell(s))
  }
  get ActiveSpell() {
    return _state.activeSpell
  }
  get MySpells() {
    return _state.mySpells
  }
  getMySpellsData() {
    _sandbox.get()
      .then(res => {
        let data = res.data.data.map(s => new Spell(s))
        setState('mySpells', data)
      })
  }

  getApiSpells() {
    _spellApi.get()
      .then(res => {
        let data = res.data.results.map(s => new Spell(s))
        setState('apiSpells', data)
      })
      .catch(err => console.error(err))
  }


}