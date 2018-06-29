import fs from 'fs'
import path from 'path'

export const getFileContent = file =>
  new Promise((resolve, reject) =>
    fs.readFile(
      path.join(__dirname, file),
      'utf8',
      (err, data) => (err ? reject(err) : resolve(data))
    )
  )

export const getFilesFromDir = dir =>
  new Promise((resolve, reject) =>
    fs.readdir(path.join(__dirname, dir), (err, data) => (err ? reject(err) : resolve(data)))
  )
