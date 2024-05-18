import styled from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES, SIZES } from '../constants/stylesConstants'
import mixins from '../utils/mixins'
import FullContainer from './common/containers/fullContainer'

const About = () => {
  return (
    <Container>
      <InnerContainer>
        <div>
          <h3>ABOUT</h3>
          <p>
            <i>On the Impulse to Notate</i> assembles an array of dialogic encounters.
            Composed in fragments — written  and collected, designed and curated — this
            catalog resists linear narrative formulas to favor an open poetic syntax.
          </p>
          <p>
            Here, the designer relies on her propensity to notate,
            aggregate, and persistently recompose.
          </p>
          <p>
            She materializes language that promotes movement toward
            knowledge and craft in conversation.
          </p>
          <p>
            She reads and translates stories spatially, frequently shifting their frames.
          </p>
          <hr />
          <p>
            This website is a direct translation of the book of the same name, designed and
            written by Lydia Chodosh in partial fulfillment of the RISD Graphic Design MFA.
          </p>
        </div>
        <CreditContainer>
          <p>© 2024</p>
          <p>designed by lydia Chodosh</p>
          <p>Developed by donald Zhu</p>
        </CreditContainer>
      </InnerContainer>
    </Container>
  )
}

const Container = styled(FullContainer)`
  ${mixins.grid}
  background-color: ${COLORS.LIGHT_BEIGE};
`

const InnerContainer = styled.div`
  grid-column-start: 2;
  margin-top: ${SIZES.ABOUT_SECTION_TOP};
  padding: 0 ${SIZES.MIXED_VIEW_TEXT_PADDING};

  h3 {
    font-family: ${FONT_FAMILIES.APERCU_COND};
    margin-bottom: ${SIZES.HEADER_MARGIN};
  }

  * {
    font-size: ${FONT_SIZES.LARGE};
    line-height:  ${FONT_SIZES.LEADING_DL};
    margin-bottom: ${FONT_SIZES.LEADING_DL};
  }

  hr {
    margin: ${SIZES.ABOUT_SECTION_DIVIDER_MARGIN} 0;
    background-color: ${COLORS.BROWN};
    height: 1px;
    border: 0;
  }
`

const CreditContainer = styled.div`
  margin-top: calc(${FONT_SIZES.LEADING_DL} * 2);
  text-transform: uppercase;

  p {
    margin: 0;
    font-family: ${FONT_FAMILIES.APERCU_COND};
    font-size: ${FONT_SIZES.REGULAR};
  }
`

export default About