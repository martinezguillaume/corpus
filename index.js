import { purifyToArray } from './lib/string'
import Dico from './lib/dico'
import DataBase from './lib/database'
import Data from './lib/data'

const dico = new Dico()
const database = new DataBase()
const data = new Data()

dico
  .load()
  .then(() =>
    data.load().then(texts =>
      texts.forEach((text, index) =>
        purifyToArray(text).forEach(word => {
          if (dico.isStopWord(word)) {
            return
          } else if (dico.isPresent(word)) {
            database.addWord(index, word, false)
          } else {
            database.addWord(index, word, true)
          }
        })
      )
    )
  )
  .then(() => {
    console.log(database.result())
  })
