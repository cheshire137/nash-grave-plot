import Interment from './Interment'
import Cemetery from './Cemetery'
import Person from './Person'

const cemeterySort = (a: Cemetery, b: Cemetery) => {
  return a.name.localeCompare(b.name)
}

const normalizeName = (name?: string | null) => {
  return (name || '').toLocaleLowerCase().replace(/[()]/g, '')
}

const personSort = (a: Person, b: Person) => {
  const personA = normalizeName(a.name)
  const personB = normalizeName(b.name)
  if (personA && !personB) return -1
  if (!personA && personB) return 1
  if (!personA && !personB) return 0
  return personA.localeCompare(personB)
}

const IntermentSort = (a: Interment, b: Interment) => {
  return cemeterySort(a.cemetery, b.cemetery) || personSort(a.person, b.person)
}

export default IntermentSort
