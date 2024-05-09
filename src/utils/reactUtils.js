export const addEventListener = (target, type, listener, options) => {
  target.addEventListener(type, listener, options)
  return () => target.removeEventListener(type, listener, options)
}