import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'

const main = document.querySelector('#main')

const members = [...senators, ...representatives]

const senatorDiv = document.querySelector('.members')


function simplifiedMembers(chamberFilter) {
    const filteredArray = members.filter(member => chamberFilter ? member.short_title === chamberFilter : member)
   
    return filteredArray.map(senator => {
        const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
            gender: senator.gender,
            seniority: senator.seniority,
            missedVotesPct: senator.missed_votes_pct,
            loyaltyPct: senator.votes_with_party_pct,
            state: senator.state
        }
    })
}


populateSenatorDiv(simplifiedMembers())

function populateSenatorDiv(simpleSenators) {
    simpleSenators.forEach(senator => {
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

        figImg.src = senator.imgURL

        figCaption.textContent = senator.name
        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
    })
}





function populateDOM(members) {
    // remove all previous items before populating with new ones
  removeChildren(main)
  
  characters.forEach((element) => {
    const memberFig = document.createElement('figure')
    const personImg = document.createElement('img')
    let memberID = getLastNumber(element.url)
    personImg.src = `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`
    const memberCaption = document.createElement('figcaption')
    memberCaption.textContent = element.name
  
    memberFig.appendChild(personImg)
    memberFig.appendChild(memberCaption)
  
    main.appendChild(memberFig)
  })
  }