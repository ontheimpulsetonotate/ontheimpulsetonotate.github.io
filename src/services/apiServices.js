import _ from 'lodash'
import { DATA_KEYS, FRAGMENT_TYPES } from '../constants/apiConstants'
import noTextHtml from '../data/noText'
import textHtml from '../data/text'
import { stringsAreEqual } from '../utils/commonUtils'


const strip = html => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent.trim() || ''
}

const parseNumRange = numRangeString =>
  [...numRangeString.matchAll(/[0-9]+/g)]
    .map(match => parseInt(match[0]))

const categorizedData = (() => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = textHtml
  const main = tempDiv.querySelector('.grid-container')

  const dataKeys = [
    DATA_KEYS.IMG_NUM,
    undefined,
    DATA_KEYS.IMG_LINK,
    DATA_KEYS.SECTION_TITLE,
    DATA_KEYS.PAGE_NUM,
    DATA_KEYS.LAST_NAME,
    DATA_KEYS.FIRST_NAME,
    DATA_KEYS.MEDIUM,
    DATA_KEYS.WORK_DETAILS,
    DATA_KEYS.COPY_RIGHT,
    DATA_KEYS.TEXT,
    DATA_KEYS.FOOTNOTES,
    DATA_KEYS.PROJECTS,
    DATA_KEYS.INTERVIEW
  ]
  const dialogueRegExp = /^\[DIALOGUE ([A-Z])[0-9]\]/

  const data = Array.from(main.querySelector('tbody').children)
    .slice(2)
    .map(tr => {
      const tdArray = Array.from(tr.querySelectorAll('td')).slice(0, dataKeys.length)
      let type
      if (tdArray[0].innerText.match(/^\[[0-9]+\]/))
        type = FRAGMENT_TYPES.MAIN
      else if (tdArray[0].innerText.match(dialogueRegExp))
        type = FRAGMENT_TYPES.INTERVIEW
      else return false

      const data = tdArray.reduce((trData, td, i) => {
        const key = dataKeys[i]
        const strippedHtml = strip(td.innerHTML)

        if ([DATA_KEYS.IMG_NUM, DATA_KEYS.PAGE_NUM].includes(key)) {
          trData[key] = parseNumRange(td.innerHTML)
          if (key === DATA_KEYS.IMG_NUM && type === FRAGMENT_TYPES.INTERVIEW) {
            trData[DATA_KEYS.INTERVIEW_PREFIX] =
              td.innerHTML.match(dialogueRegExp)?.[1]
          }
        }

        else if ([DATA_KEYS.WORK_DETAILS, DATA_KEYS.TEXT].includes(key))
          trData[key] = td.innerHTML
        else if ([DATA_KEYS.FOOTNOTES, DATA_KEYS.PROJECTS].includes(key)) {
          const notesArray = td.innerHTML
            .split('<br><br>')
            .filter(n => n)
          const notes = {}
          notesArray.forEach(note => {
            const noteNum = note.match(/\[([0-9]+)\]/)?.[1]
            if (noteNum)
              notes[noteNum] = note.replace(/^\[[0-9]+\] /, '')
          })
          trData[key] = notes
        }
        else if (key) trData[key] = strippedHtml

        return trData
      }, {})

      data[DATA_KEYS.TYPE] = type
      // TODO: data.imgNum - multiple
      if (type === FRAGMENT_TYPES.MAIN)
        data[DATA_KEYS.IMG_LINK] = `01_Primary-Text/REF_${_.padStart(data.imgNum[0], 3, '0')}.webp`
      else data[DATA_KEYS.IMG_LINK] = `04_Interviews/Interview_${data.interviewPrefix}${data.imgNum}.webp`
      return data
    })
    .filter(d => d)

  return _.groupBy(data, DATA_KEYS.TYPE)
})()

const allData = Object.values(categorizedData).flat()
const textData = categorizedData.main.filter(({ text }) => text)


const getNodeByTitle = title =>
  allData.filter(({ sectionTitle }) => stringsAreEqual(title, sectionTitle))


const apiServices = {
  strip,
  parseNumRange,
  getNodeByTitle,
  categorizedData,
  allData,
  textData
}

export default apiServices