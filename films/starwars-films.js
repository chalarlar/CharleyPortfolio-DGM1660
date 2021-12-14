import { films } from '../data/films.js'
import { getLastNumber } from '../utils/index.js'

let filmList = document.querySelector('#filmList')

let titleList = document.createElement('ol')

for (let i = 0; i < films.length; i++) {
    let figure = document.createElement('figure')
    let figImg = document.createElement('img')
    figImg.src = `https://starwars-visualguide.com/assets/img/films/${i + 1}.jpg`
    let figCaption = document.createElement('figCaption')

    const foundFilm = films.find(film => getLastNumber(film.url) === (i + 1).toString())

    figCaption.textContent = foundFilm.title

    figure.appendChild(figImg)
    figure.appendChild(figCaption)
    
    filmList.appendChild(figure)
}

function populateFilmCard(film) {
    const swPoster = document.createElement('div')
    swPoster.className = 'poster'
    const filmCard = document.createElement('div')
    filmCard.className = 'card'
    filmCard.addEventListener('click', () =>
      filmCard.classList.toggle('is-flipped'),
    )
  
    const front = populateCardFront(film)
    const back = populateCardBack(film)
  
    filmCard.appendChild(front)
    filmCard.appendChild(back)
    swPoster.appendChild(filmCard)
    filmGrid.appendChild(swPoster)
  }
