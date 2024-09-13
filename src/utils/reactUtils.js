export const addEventListener = (target, type, listener, options) => {
  target.addEventListener(type, listener, options)
  return () => target.removeEventListener(type, listener, options)
}

export const getChildrenHeight = (elem, margin = 0) => Array
  .from(elem?.children ?? [])
  .reduce((sum, child, i) => sum + child.getBoundingClientRect().height + (i ? margin : 0), 0)