export default class Database {
  constructor() {
    this.data = {}
    this.maxCount = 0
    this.documents = []
  }

  calculateTFIDF() {
    Object.keys(this.data).map(word => {
      const wordData = this.data[word]
      const tf = wordData.count / this.maxCount
      const idf = Math.log(this.documents.length / wordData.documents.length) + 1
      this.data[word].tfidf = tf / idf
    })
  }

  addWord(document, word, entity) {
    // Add documents if new one
    !this.documents.includes(document) && this.documents.push(document)
    // If word not already exist
    if (!this.data[word]) {
      this.data[word] = { count: 1, entity, documents: [document], word }
      this.maxCount === 0 && this.maxCount++
    } else {
      ++this.data[word].count > this.maxCount && this.maxCount++
      !this.data[word].documents.includes(document) && this.data[word].documents.push(document)
    }
  }

  result() {
    this.calculateTFIDF()
    return Object.values(this.data)
      .sort((a, b) => a.tfidf < b.tfidf)
      .slice(0, 59)
      .sort((a, b) => a.tfidf < b.tfidf)
  }
}
