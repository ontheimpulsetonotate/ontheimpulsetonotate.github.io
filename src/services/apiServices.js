import _ from 'lodash'
import { DATA_KEYS, FRAGMENT_TYPES } from '../constants/apiConstants'
import textHtml from '../data/text'
import { stringsAreEqual } from '../utils/commonUtils'
import NodeData from '../utils/helpers/nodeData'


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

  const interviewRegExp = /^\[DIALOGUE ([A-Z])[0-9]\]/

  let lastRef
  const data = Array.from(main.querySelector('tbody').children)
    .slice(2)
    .map(tr => {
      const tdArray = Array.from(tr.querySelectorAll('td')).slice(0, dataKeys.length)
      const nodeData = new NodeData()
      const refNum = tdArray[0].innerText
      const title = tdArray[3].innerText

      if (!refNum.trim() && title)
        nodeData.type = FRAGMENT_TYPES.ORPHAN
      else if (refNum.match(/^\[[0-9]+\]/))
        nodeData.type = FRAGMENT_TYPES.TEXT
      else if (refNum.match(interviewRegExp))
        nodeData.type = FRAGMENT_TYPES.INTERVIEW
      else return false

      tdArray.forEach((td, i) => {
        const key = dataKeys[i]
        const strippedHtml = strip(td.innerHTML)

        if ([DATA_KEYS.IMG_NUM, DATA_KEYS.PAGE_NUM].includes(key)) {
          nodeData[key] = parseNumRange(td.innerHTML)

          if (key === DATA_KEYS.IMG_NUM) {
            if (nodeData.isOrphan)
              nodeData[key] = lastRef
            else lastRef = nodeData[key]

            if (nodeData.isInterview)
              nodeData.interviewPrefix =
                td.innerHTML.match(interviewRegExp)?.[1]
          }
        }
        else if ([DATA_KEYS.WORK_DETAILS, DATA_KEYS.TEXT].includes(key))
          nodeData[key] = td.innerHTML
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
          nodeData[key] = notes
        }
        else if (key) nodeData[key] = strippedHtml
      })

      // TODO: nodeData.imgNum - multiple
      nodeData.getImgLinks()
      console.log(nodeData.imgLinks)
      if (nodeData.isText) {
        nodeData.imgLink = `01_Primary-Text/REF_${_.padStart(nodeData.imgNum[0], 3, '0')}.webp`
      }
      else if (nodeData.isInterview)
        nodeData.imgLink = `04_Interviews/Interview_${nodeData.interviewPrefix}${nodeData.imgNum}.webp`
      return nodeData
    })
    .filter(d => d)

  return _.groupBy(data, DATA_KEYS.TYPE)
})()


const allData = Object.values(categorizedData).flat()
const getNodeByTitle = title =>
  allData.filter(({ sectionTitle }) => stringsAreEqual(title, sectionTitle))

const textData = categorizedData[FRAGMENT_TYPES.TEXT]
  .filter(({ text }) => text)

const mixedData = categorizedData[FRAGMENT_TYPES.TEXT].map((node) => {
  const { sectionTitle, imgNum } = node
  const associatedInterviews =
    categorizedData.interview.filter(data =>
      stringsAreEqual(data.interview, sectionTitle))

  const orphanNode = categorizedData[FRAGMENT_TYPES.ORPHAN]
    .find(data =>
      _.intersection(data[DATA_KEYS.IMG_NUM], imgNum).length)
  const orphanInterviews = !orphanNode ? [] :
    categorizedData.interview.filter(data =>
      stringsAreEqual(data.interview, orphanNode[DATA_KEYS.SECTION_TITLE]))
  return [node, associatedInterviews, orphanNode, orphanInterviews]
})


// console.log(mixedData.flat(2).filter(t => t))


const apiServices = {
  strip,
  parseNumRange,
  getNodeByTitle,
  categorizedData,
  allData,
  textData,
  mixedData
}

export default apiServices