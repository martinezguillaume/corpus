import { getFilesFromDir, getFileContent } from './files'

export default class Data {
  constructor() {
    this.texts = []
  }

  load() {
    return getFilesFromDir('../data').then(files =>
      Promise.all(files.map(file => getFileContent(`../data/${file}`))).then(contents => {
        this.texts = contents
        return contents
      })
    )
  }
}
