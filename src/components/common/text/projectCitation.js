import styled from 'styled-components'
import { FONT_FAMILIES, FONT_SIZES } from '../../../constants/stylesConstants'
import { validateString } from '../../../utils/commonUtils'
import parserServices from '../../../services/parserServices'

const ProjectCitation = ({ artistFirstName, artistLastName, medium, workDetails, copyright }) =>
  <Footnote>
    <h3>{artistLastName}{validateString(artistFirstName, ` ${artistFirstName}`)}</h3>
    <h3>{medium}</h3>
    <p>
      <span>{parserServices.parse(workDetails)}</span>
      {copyright && <span> </span>}
      <span>{parserServices.parse(copyright)}</span>
    </p>
  </Footnote>


const Footnote = styled.span`
  h3 {
    font-family: ${FONT_FAMILIES.APERCU_COND};
    font-size: ${FONT_SIZES.SMALL};
  }

  p {
    padding-top: 1em;
    font-size: ${FONT_SIZES.SMALL};
    font-family: ${FONT_FAMILIES.APERCU};
  }
`

export default ProjectCitation