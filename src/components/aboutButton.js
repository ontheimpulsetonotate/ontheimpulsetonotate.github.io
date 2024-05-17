import styled from 'styled-components'
import { SIZES } from '../constants/stylesConstants'
import mixins from '../utils/mixins'


const AboutButton = () => {
  return (
    <ButtonContainer>
      <Button>
        About
      </Button>
    </ButtonContainer>
  )
}


// TODO: put bottom on container
const ButtonContainer = styled.div`
  ${mixins.highZIndex(1)}
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  /* position: fixed;
  bottom: ${SIZES.PAGE_MARGIN}; */
`

const Button = styled.button`
  position: absolute;
  left: ${SIZES.PAGE_MARGIN};
  bottom: ${SIZES.PAGE_MARGIN};
`


export default AboutButton