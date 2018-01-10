const { prop, filter, map, sortBy, propEq, join, compose, pluck } = R
const deckUrl = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'

/* 
  HTML
*/
const deckCardHtml = u => `<div class="deck-card"><img width="160" height="245" src="${u}"/></div>`
const shuffleCardHtml = img => `<div class="shuffle-card">${img}</div>`

const getDeckId = prop('deck_id')
const drawCards = id => fetch(`https://deckofcardsapi.com/api/deck/${id}/draw/?count=2`)
  .then(res => res.json())

const getCards = prop('cards')
const sortByValue = sortBy(prop('value'))
const pluckImg = pluck('image')
const toImgString = compose(join(''), map(deckCardHtml))

const renderfactory = id => imgString => {
  document.querySelector(id).innerHTML = shuffleCardHtml(imgString)
}

const render = renderfactory("#cards")
const renderTwo = renderfactory("#cards-two")


const transformData = compose(toImgString, pluckImg, sortByValue, getCards)

const fetchAndRender = fn => fetch(deckUrl)
  .then(res => res.json())
  .then(getDeckId)
  .then(drawCards)
  .then(compose(fn, transformData))

var blackjack = {
  template: '#blackjack',
  data: function () {
    return {};
  },
  methods: {
    fetchCards: function () {
      fetchAndRender(render)
      fetchAndRender(renderTwo)
    }
  }

}


