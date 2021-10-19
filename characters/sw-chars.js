import { people } from '../data/people.js'

const main = document.querySelector('#main')

people.forEach(element => {
const personFig = document.createElement('figure')
const personImg = document.createElement('img')
personImg.src = `https://starwars-visualguide.com/assets/img/characters/1.jpg`
const personCaption = document.createElement('figCaption')
personCaption.textContent = 'Person name goes here'

personFig.appendChild(personImg)
personFig.appendChild(personCaption)

main.appendChild(personFig)
}
)