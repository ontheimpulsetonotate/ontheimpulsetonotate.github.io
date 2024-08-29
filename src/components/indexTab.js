import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { DATA_KEYS } from '../constants/apiConstants'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES, TIMINGS } from '../constants/stylesConstants'
import apiServices from '../services/apiServices'
import { getDataStringSorter, validateString } from '../utils/commonUtils'
import mixins from '../utils/mixins'
import { addEventListener } from '../utils/reactUtils'
import Header from './common/header'
import FilteredImg, { FilterImgContainer } from './common/img/filteredImg'
import SortArrow from './common/text/sortArrow'


const IndexTab = ({ onRowClick }) => {
  const [indexIsOpened, setIndexIsOpened] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [sort, setSort] = useState({ index: 0, isAscending: true })
  const [hoverIndex, setHoverIndex] = useState()
  const [imgIsLoaded, setImgIsLoaded] = useState()

  const data = apiServices.categorizedData.main

  const headers = [
    ['artist', () => _.sortBy(data, frag => frag.imgNum[0])],
    ['medium', () => [...data].sort(getDataStringSorter(DATA_KEYS.MEDIUM))],
    ['section', () => [...data].sort(getDataStringSorter(DATA_KEYS.SECTION_TITLE))],
    ['page', () => _.sortBy(data, frag => frag.pageNum[0])]
  ]

  const handleClick = (e, state) => {
    e.stopPropagation()
    setIndexIsOpened(state)
    setShouldAnimate(true)
  }

  const handleRowClick = (e, data) => {
    e.stopPropagation()
    const { textData } = apiServices
    const matchByTitle = ({ sectionTitle }) => sectionTitle === data.sectionTitle
    const matches = textData.filter(matchByTitle)
    const index = matches.length === 1 ?
      textData.findIndex(matchByTitle) :
      textData.findIndex(({ text }) => data.text === text)
    onRowClick(index)
    setIndexIsOpened(false)
  }

  const sortedData = useMemo(() => {
    const sorted = headers[sort.index][1]()
    return sort.isAscending ? sorted : _.reverse(sorted)
  }, [sort.index, sort.isAscending])

  useEffect(() => addEventListener(document, 'click', () => {
    setIndexIsOpened(false)
    setShouldAnimate(true)
  }))

  const { imgLink } = sortedData[hoverIndex] ?? {}

  useEffect(() => {
    if (!imgLink) return
    const img = document.createElement('img')
    img.onload = () => setImgIsLoaded(true)
    img.src = imgLink
  }, [hoverIndex])

  const handleMouseEnter = i => {
    setHoverIndex(i)
    setImgIsLoaded(false)
  }


  const buttonFocus = indexIsOpened ? undefined : -1

  return (
    <IndexTabContainer
      style={{
        transition: validateString(shouldAnimate, `left ${TIMINGS.INDEX_SLIDE}ms ease-in-out`),
        left: indexIsOpened ? `calc(${SIZES.OPENED_INDEX_LEFT_VALUE}vw - ${SIZES.PAGE_MARGIN} * 3)` : `calc(${SIZES.CLOSED_INDEX_LEFT_VALUE}vw - ${SIZES.PAGE_MARGIN})`,
        cursor: validateString(!indexIsOpened, 'pointer')
      }}
      onClick={e => handleClick(e, true)}
      onTransitionEnd={() => setShouldAnimate(false)}>
      <HeaderContainer>
        <h2>Index</h2>
        {!imgLink &&
          <button
            onClick={e => handleClick(e, false)}
            tabIndex={buttonFocus}>[CLOSE]</button>}
        {hoverIndex !== undefined && imgIsLoaded &&
          <FilteredImg
            backgroundColor={COLORS.BROWN}
            src={imgLink}
            maxSize={SIZES.INDEX_TAB_FIGURE_SIZE} />}
      </HeaderContainer>
      <TableContainer>
        <TableHead>
          {
            headers.map(([name], i) => {
              const isSorting = sort.index === i
              const isPageHeader = name === 'page'
              return (
                <p key={name} onClick={() => setSort(prev => ({
                  index: i,
                  isAscending: isSorting ? !prev.isAscending : true
                }))}>
                  {!isPageHeader && name}
                  <SortArrow isSorting={isSorting} isAscending={sort.isAscending} />
                  {isPageHeader && name}
                </p>
              )
            })
          }
        </TableHead>
        {sortedData.map((data, i) => {
          const { imgNum, artistFirstName, artistLastName, medium, sectionTitle, pageNum } = data
          return <Row
            key={i}
            onMouseOver={() => handleMouseEnter(i)}
            onMouseOut={() => setHoverIndex()}
            onClick={e => handleRowClick(e, data)}>
            <p>
              {i === hoverIndex && <HoverArrow>→</HoverArrow>}
              [{imgNum.map(num => _.padStart(num, 3, '0')).join('—')}] {artistLastName}{validateString(artistFirstName, `, ${artistFirstName}`)}
            </p>
            <p>{medium}</p>
            <p>{sectionTitle}</p>
            <p>
              {!!pageNum.length && `P. ${pageNum.map(num => _.padStart(num, 3, '0')).join(' — ')}`}
            </p>
          </Row>
        }
        )}
      </TableContainer>
    </IndexTabContainer>
  )
}

const IndexTabContainer = styled.div`
${mixins.highZIndex(4)}
  width: ${100 - SIZES.OPENED_INDEX_LEFT_VALUE}vw;
  height: 100vh;
  position: absolute;
  top: 0;
  padding: 0 ${SIZES.PAGE_MARGIN};

  background-color: ${COLORS.LIGHT_BEIGE};
  user-select: none;
`

const TableContainer = styled.div`
  ${mixins.noScrollBar}
  position: absolute;
  width: calc(100% - ${SIZES.PAGE_MARGIN} * 2);
  top: ${SIZES.INDEX_STICKY_TOP};
  overflow-y: scroll;
  height: calc(100vh - ${SIZES.INDEX_STICKY_TOP});
`
const HeaderContainer = styled(Header)`
  ${mixins.flex('initial', 'space-between')}

  ${FilterImgContainer} {
    position: absolute;
    top: ${SIZES.PAGE_MARGIN};
    right: ${SIZES.PAGE_MARGIN};
  }
`

const Row = styled.div`
  ${mixins.border()}
  width: 100%;
  display: grid;
  grid-template-columns: ${SIZES.INDEX_ARTIST_WIDTH} ${SIZES.INDEX_MEDIUM_WIDTH} 1fr ${SIZES.INDEX_PAGE_NUM_WIDTH};
  cursor: pointer;

  p {
    font-family: ${FONT_FAMILIES.APERCU_COND};
    font-weight: normal;
    line-height: ${FONT_SIZES.LEADING_L};
    text-transform: uppercase;
  }

  th {
    text-align: left;
  }

  td, th {
    padding: 0;
  }

  :last-child {
    justify-self: end;
  }
`

const TableHead = styled(Row)`
  ${mixins.border(2)}
  position: sticky;
  top: -1px;
  background-color: ${COLORS.LIGHT_BEIGE};
  cursor: initial;

  p {
    width: fit-content;
    font-weight: 500;
    cursor: pointer;
  }
`

const HoverArrow = styled.span`
  padding-right: ${SIZES.ARROW_PADDING};
`

export default IndexTab