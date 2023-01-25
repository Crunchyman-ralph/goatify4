export function keyIsVariant(jsonObject: object, key: string) {
  if (
    jsonObject[key as keyof object]['Variant Barcode'] != '' ||
    jsonObject[key as keyof object]['Variant Compare At Price'] != '' ||
    jsonObject[key as keyof object]['Variant Grams'] != '' ||
    jsonObject[key as keyof object]['Variant Image'] != '' ||
    jsonObject[key as keyof object]['Variant Inventory Policy'] != '' ||
    jsonObject[key as keyof object]['Variant Inventory Qty'] != '' ||
    jsonObject[key as keyof object]['Variant Inventory Tracker'] != '' ||
    jsonObject[key as keyof object]['Variant Price'] != '' ||
    jsonObject[key as keyof object]['Variant Requires Shipping'] != '' ||
    jsonObject[key as keyof object]['Variant SKU'] != '' ||
    jsonObject[key as keyof object]['Variant Tax Code'] != '' ||
    jsonObject[key as keyof object]['Variant Taxable'] != ''
  ) {
    return true
  } else {
    return false
  }
}
