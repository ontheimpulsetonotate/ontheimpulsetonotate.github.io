import _ from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { DATA_KEYS } from '../../constants/apiConstants'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES, SIZES_RESPONSIVE, TIMINGS } from '../../constants/stylesConstants'
import apiServices from '../../services/apiServices'
import { getDataStringSorter, padNumber, validateString } from '../../utils/commonUtils'
import Size from '../../utils/helpers/size'
import mixins from '../../utils/mixins'
import { addEventListener } from '../../utils/reactUtils'
import Header from '../common/header/header'
import FilteredImg, { FilterImgContainer } from '../common/img/filteredImg'
import SortArrow from '../common/text/sortArrow'


const IndexDesktop = ({ onRowClick }) => {
  const [indexIsOpened, setIndexIsOpened] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [sort, setSort] = useState({ index: 0, isAscending: true })
  const [hoverIndex, setHoverIndex] = useState()

  const data = apiServices.indexTabData

  const headers = [
    ['reference', () => _.sortBy(data, frag => frag.imgNum[0])],
    ['medium', () => [...data].sort(getDataStringSorter(DATA_KEYS.MEDIUM))],
    ['section', () => [...data].sort(getDataStringSorter(DATA_KEYS.SECTION_TITLE))],
    ['read', () => _.sortBy(data, frag => frag.pageNum[0])]
  ]

  const handleClick = (e, state) => {
    e.stopPropagation()
    setIndexIsOpened(state)
    setShouldAnimate(true)
  }

  const handleRowClick = (e, { imgNum }) => {
    e.stopPropagation()
    onRowClick(imgNum[0])
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

  const { imgLinks } = sortedData[hoverIndex] ?? {}
  const imgLink = imgLinks?.[0]
  const handleMouseEnter = i => setHoverIndex(i)

  const buttonFocus = indexIsOpened ? undefined : -1

  return (
    <IndexDesktopContainer
      style={{
        transition: validateString(shouldAnimate, `left ${TIMINGS.INDEX_SLIDE}ms ease-in-out`),
        left: indexIsOpened ?
          SIZES.OPENED_INDEX_LEFT_VALUE.sub(SIZES.PAGE_MARGIN_DESKTOP.mult(2)).css :
          SIZES.CLOSED_INDEX_LEFT_VALUE.sub(SIZES.PAGE_MARGIN_DESKTOP).css,
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
        {hoverIndex !== undefined &&
          <FilteredImg
            src={imgLink}
            backgroundColor={COLORS.BROWN}
            maxWidth={SIZES_RESPONSIVE.INDEX_TAB_FIGURE_SIZE}
            maxHeight={SIZES_RESPONSIVE.INDEX_TAB_FIGURE_SIZE} />}
      </HeaderContainer>
      <TableContainer>
        <TableHead>
          {
            headers.map(([name], i) => {
              const isSorting = sort.index === i
              const isPageHeader = name === 'read'
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
        {sortedData.map((nodeData, i) => {
          const {
            imgNum,
            artistFirstName,
            artistLastName,
            medium,
            sectionTitle,
            pageNum
          } = nodeData
          return <Row
            key={i}
            onMouseOver={() => handleMouseEnter(i)}
            onMouseOut={() => setHoverIndex()}
            onClick={e => handleRowClick(e, nodeData)}>
            <p>
              {i === hoverIndex && <HoverArrow>→</HoverArrow>}
              [{imgNum.map(num => padNumber(num)).join('—')}] {artistLastName}{validateString(artistFirstName, `, ${artistFirstName}`)}
            </p>
            <p>{medium}</p>
            <p>{sectionTitle}</p>
            <p>
              {!!pageNum.length && `P. ${pageNum.map(num => padNumber(num)).join('—')}`}
            </p>
          </Row>
        }
        )}
      </TableContainer>
    </IndexDesktopContainer>
  )
}

const IndexDesktopContainer = styled.div`
${mixins.highZIndex(4)}
  width: ${Size.subFromFullWidth(SIZES.OPENED_INDEX_LEFT_VALUE).css};
  height: 100dvh;
  position: absolute;
  top: 0;
  padding: 0 ${SIZES.PAGE_MARGIN_DESKTOP.css};

  background-color: ${COLORS.BEIGE};
  user-select: none;
`

const TableContainer = styled.div`
  ${mixins.noScrollBar}
  position: absolute;
  width: calc(100% - ${SIZES.PAGE_MARGIN_DESKTOP.mult(2).css});
  top: ${SIZES.INDEX_STICKY_TOP_DESKTOP.css};
  overflow-y: scroll;
  height: ${Size.subFromFullHeight(SIZES.INDEX_STICKY_TOP_DESKTOP).css};
`
const HeaderContainer = styled(Header)`
  ${mixins.flex('initial', 'space-between')}

  ${FilterImgContainer} {
    position: absolute;
    top: ${SIZES.PAGE_MARGIN_DESKTOP.css};
    right: ${SIZES.PAGE_MARGIN_DESKTOP.css};
  }
`

const Row = styled.div`
  ${mixins.border()}
  width: 100%;
  display: grid;
  grid-template-columns: ${SIZES.INDEX_ARTIST_WIDTH} ${SIZES.INDEX_MEDIUM_WIDTH} 1fr ${SIZES.INDEX_PAGE_NUM_WIDTH.css};
  cursor: pointer;

  p {
    font-family: ${FONT_FAMILIES.APERCU_COND};
    font-weight: normal;
    line-height: ${FONT_SIZES.LEADING_M.css};
    text-transform: uppercase;
    margin: 0.75em 0;
    &:not(:last-child){
      margin-right: 0.25em;
    }
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
  background-color: ${COLORS.BEIGE};
  cursor: initial;

  p {
    width: fit-content;
    font-weight: 500;
    cursor: pointer;
  }
`

const HoverArrow = styled.span`
  padding-right: ${SIZES.ARROW_PADDING.css};
`

export default IndexDesktop