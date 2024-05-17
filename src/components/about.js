import styled from 'styled-components'
import { COLORS, FONT_FAMILIES, FONT_SIZES } from '../constants/stylesConstants'
import { remify } from '../utils/styleUtils'

const About = () => {
  return (
    <Container>
      <InnerContainer>
        <h3>ABOUT</h3>
        <p><i>On the Impulse to Notate</i> assembles an array of  dialogic encounters. Composed in fragments — written  and collected, designed and curated — this catalog resists linear narrative formulas to favor an open poetic syntax.</p>
        <p>Here, the designer relies on her propensity to  notate, aggregate, and persistently recompose.</p>
        <p>She materializes language that promotes movement toward knowledge and craft in conversation.</p>
        <p>She reads and translates stories spatially, frequently shifting their frames.</p>
        <hr />
        <p>This website is a direct translation of the book of the same name, designed and written by Lydia Chodosh in partial fulfillment of the RISD Graphic Design MFA.</p>
      </InnerContainer>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 0; // TODO cehck if can mixins
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${COLORS.LIGHT_BEIGE};
  display: grid; // TODO
  grid-template-columns: calc((92.5vw - 400px) / 2) 400px 1fr; // TODO
`

const InnerContainer = styled.div`
  grid-column-start: 2;
  margin-top: ${remify(140)}; // TODO

  h3 {
    font-family: ${FONT_FAMILIES.APERCU_COND};
    padding-bottom: ${remify(30)};
  }

  * {
    font-size: ${FONT_SIZES.LARGE};
    line-height:  ${FONT_SIZES.LEADING_DL};
    margin-bottom: ${FONT_SIZES.LEADING_DL};
/* 
    &:not(:last-child) {
      margin-bottom: ${FONT_SIZES.LEADING_DL};
    } */
  }
  
  hr {
    
  }
`

export default About