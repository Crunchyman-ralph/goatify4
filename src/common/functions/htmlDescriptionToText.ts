export function htmlDescriptionToText(
  html: string,
  maxLength?: number
): string {
  let result: string

  // remove html entities (e.g. &amp;)
  var txt = document.createElement('textarea')
  txt.innerHTML = html
  result = txt.value

  // remove html tags
  var regX = /(<([^>]+)>)/gi
  result = result.replace(regX, '')

  // remove multiple spaces
  result = result.replace(/(\r\n|\n|\r)/gm, ' ')

  if (typeof maxLength != 'undefined' && result.length > maxLength) {
    return result.substring(0, maxLength).trim() + '...'
  } else {
    return result
  }
}
