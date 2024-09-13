import _ from 'lodash'
import { DATA_KEYS, FRAGMENT_TYPES } from '../constants/apiConstants'
import noTextHtml from '../data/noText'
import textHtml from '../data/text'
import { stringsAreEqual } from '../utils/commonUtils'
import NodeData from '../utils/helpers/nodeData'


const dataKeys = [
  DATA_KEYS.IMG_NUM,
  undefined,
  undefined,
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

const strip = html => {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent.trim() || ''
}

const parseNumRange = numRangeString =>
  [...numRangeString.matchAll(/[0-9]+/g)]
    .map(match => parseInt(match[0]))

const interviewRegExp = /^\[DIALOGUE ([A-Z])[0-9]\]/
const parseNum = ({ innerHTML }, key, nodeData, lastRef) => {
  const { isOrphan, isInterview } = nodeData
  nodeData[key] = parseNumRange(innerHTML)

  if (key !== DATA_KEYS.IMG_NUM) return lastRef
  if (isOrphan) return nodeData[key] = lastRef

  lastRef = nodeData[key]
  if (isInterview)
    nodeData.interviewPrefix =
      innerHTML.match(interviewRegExp)?.[1]

  return lastRef
}

const parseCitation = ({ innerHTML }, key, nodeData) => {
  const notesArray = innerHTML
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

const parseSheet = (html, isVisualEssay) => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = html
  const main = tempDiv.querySelector('.grid-container')

  let lastRef
  const data = Array.from(main.querySelector('tbody').children)
    .slice(2)
    .map(tr => {
      const tdArray = Array.from(tr.querySelectorAll('td')).slice(0, dataKeys.length)
      const nodeData = new NodeData()
      const refNum = tdArray[0].innerText
      const title = tdArray[3].innerText

      nodeData.type =
        isVisualEssay ? FRAGMENT_TYPES.VISUAL_ESSAY :
          !refNum.trim() && title ? FRAGMENT_TYPES.ORPHAN :
            refNum.match(/^\[[0-9]+\]/) ? FRAGMENT_TYPES.TEXT :
              refNum.match(interviewRegExp) ? FRAGMENT_TYPES.INTERVIEW : undefined

      if (!nodeData.type) return

      tdArray.forEach((td, i) => {
        const key = dataKeys[i]
        const keyIn = (...keys) => keys.includes(key)
        if (keyIn(DATA_KEYS.IMG_NUM, DATA_KEYS.PAGE_NUM))
          lastRef = parseNum(td, key, nodeData, lastRef)
        else if (keyIn(DATA_KEYS.WORK_DETAILS, DATA_KEYS.TEXT))
          nodeData[key] = td.innerHTML
        else if (keyIn(DATA_KEYS.FOOTNOTES, DATA_KEYS.PROJECTS))
          parseCitation(td, key, nodeData)
        else if (key) nodeData[key] = strip(td.innerHTML)
      })

      nodeData.getImgLinks()
      return nodeData
    })
    .filter(d => d)

  if (isVisualEssay) return data

  return data
    .filter(nodeData => nodeData && !nodeData.isInterview)
    .map(nodeData => {
      const { sectionTitle } = nodeData
      const associatedInterviews = nodeData.interview &&
        data.filter(
          data => data.isInterview &&
            stringsAreEqual(data.interview, sectionTitle))
      return [nodeData, associatedInterviews]
    })
    .flat(2)
    .filter(d => d)
}

const mainData = parseSheet(textHtml)
const visualEssayData = parseSheet(noTextHtml, true)

const textData = mainData.filter(({ text, isOrphan }) => text && !isOrphan)
const indexTabData = textData.filter(({ isInterview }) => !isInterview)
const imgData = mainData
  .filter(({ isImgNode }) => isImgNode)
  .map(nodeData => nodeData.getImgNodes(mainData))
  .flat()
const mixedData = mainData.filter(({ text }) => text)

const apiServices = {
  mainData,
  imgData,
  textData,
  mixedData,
  indexTabData,
  visualEssayData,
}

export default apiServices