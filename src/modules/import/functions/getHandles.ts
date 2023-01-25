export function getHandles(jsonObject: object) {
  let handles: string[] = []
  for (let key in jsonObject) {
    if (jsonObject[key as keyof object]['Handle'] != '') {
      handles.push(jsonObject[key as keyof object]['Handle'])
    }
  }
  return handles
}
