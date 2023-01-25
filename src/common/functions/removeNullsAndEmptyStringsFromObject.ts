export function removeNullsAndEmptyStringsFromObject(
  obj: object,
  propertyExceptions?: string[]
): object {
  var clean = Object.fromEntries(
    Object.entries(obj)
      .map(([k, v]) => [
        k,
        v === Object(v)
          ? removeNullsAndEmptyStringsFromObject(v, propertyExceptions)
          : v,
      ])
      .filter(([property, value]) => {
        if (propertyExceptions?.includes(property)) {
          return true
        } else {
          return (
            value != null &&
            value != '' &&
            (value !== Object(value) || Object.keys(value).length)
          )
        }
      })
  )
  return Array.isArray(obj) ? Object.values(clean) : clean
}
