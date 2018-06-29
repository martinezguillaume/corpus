import fromPairs from 'lodash.frompairs'
import { purify } from './string'
import { getFileContent } from './files'

export default class Dico {
  load() {
    this.dico = {}
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const dicoPromises = letters.map(letter => getFileContent(`../dico/dico_${letter}.txt`))
    const stopwordsPromise = getFileContent('../dico/stopwords.txt')
    return Promise.all([...dicoPromises, stopwordsPromise]).then(contents =>
      contents.forEach((content, index) => {
        // Dico
        if (index < letters.length)
          this.dico[letters[index]] = fromPairs(
            content.split('\n').map(word => {
              const splitWord = word.split('\t')
              return [purify(splitWord[0]), purify(splitWord[1])]
            })
          )
        // Stopword
        else {
          this.stopwords = purify(content).split(' ')
        }
      })
    )
  }

  isPresent(word) {
    if (!word) {
      return false
    }
    const firstLetter = word[0]
    const dico = this.dico[firstLetter]
    return dico && dico[word]
  }

  isStopWord(word) {
    if (!word) {
      return false
    }
    return !!this.stopwords.find(stopword => word === stopword)
  }
}
