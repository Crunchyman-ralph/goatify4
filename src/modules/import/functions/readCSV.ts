export function readCSV(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    var reader = new FileReader()
    reader.onload = function () {
      resolve(reader.result as string)
    }
    reader.onerror = function (error) {
      reject(error)
    }

    reader.readAsText(file)
  })
}
