export default () => {
  const style = document.createElement('style')
  const css = `.grab = {cursor: move;cursor: grab;cursor: -moz-grab;cursor: -webkit-grab;}.grabbing{cursor:grabbing;cursor:-moz-grabbing;cursor:-webkit-grabbing}`
  style.type = 'text/css'
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
  const head = document.head || document.getElementsByTagName('head')[0]
  head.appendChild(style)
}
