import csv from 'csvtojson'

export async function convertCSVToJSON(string: string): Promise<object> {
  return await csv().fromString(string)
}
