export const vw = (percentage = 100) => percentage / 100 * window.innerWidth
export const vh = (percentage = 100) => percentage / 100 * window.innerHeight

export const remify = px => `${px / 16}rem` // parseInt(getComputedStyle(document.body).fontSize)

export const getRem = (rem = 1) => parseInt(getComputedStyle(document.body).fontSize) * rem
export const getPx = emString => parseFloat(emString.replace(/rem$/, '')) * getRem()
export const getEmifiedPx = px => getPx(remify(px))