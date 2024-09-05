import { useEffect } from 'react'
import styled from 'styled-components'
import { FONT_FAMILIES, FONT_SIZES, FONT_SIZES_RESPONSIVE } from '../../../constants/stylesConstants'
import parserServices from '../../../services/parserServices'
import { validateString } from '../../../utils/commonUtils'
import mixins from '../../../utils/mixins'

const ProjectCitation = ({ artistFirstName, artistLastName, medium, workDetails, copyright }) => {
  return (
    <Footnote>
      <h3>{artistLastName}{validateString(artistFirstName, ` ${artistFirstName}`)}</h3>
      <h3>{medium}</h3>
      <p>
        <span>{parserServices.parse(workDetails)}</span>
        {copyright && <span> </span>}
        <span>{parserServices.parse(copyright)}</span>
      </p>
    </Footnote>
  )
}


const Footnote = styled.span`
  h3, p {
    ${mixins.dynamicSizes({ fontSize: FONT_SIZES_RESPONSIVE.SMALL })}
  }

  h3 {
    font-family: ${FONT_FAMILIES.APERCU_COND};
    ${mixins.dynamicSizes({ lineHeight: FONT_SIZES_RESPONSIVE.LEADING_XS })}
  }

  p {
    ${mixins
    .chain()
    .dynamicSizes({ paddingTop: FONT_SIZES_RESPONSIVE.LEADING_XS })
    .paragraphSpacing(FONT_SIZES_RESPONSIVE.LEADING_XS)}
    font-family: ${FONT_FAMILIES.APERCU};
  }
`

export default ProjectCitation