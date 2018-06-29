export const removePunctuations = s => s.replace(/[^\w\s]|_/g, ' ')

export const removeDuplicateSpaces = s => s.replace(/\s+/g, ' ')

export const removeAccents = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export const purify = s => removeAccents(removeDuplicateSpaces(removePunctuations(s))).toLowerCase()

export const purifyToArray = s =>
  purify(s)
    .split(' ')
    .filter(word => word && isNaN(word))
