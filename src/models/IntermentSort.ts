import Interment from "./Interment";

const cemeterySort = (a: Interment, b: Interment) => {
  const cemeteryA = a.cemeteryName;
  const cemeteryB = b.cemeteryName;
  return cemeteryA.localeCompare(cemeteryB);
};

const normalizePerson = (person?: string | null) => {
  return (person || '').toLocaleLowerCase().replace(/[()]/g, '');
};

const personSort = (a: Interment, b: Interment) => {
  const personA = normalizePerson(a.person);
  const personB = normalizePerson(b.person);
  if (personA && !personB) {
    return -1;
  }
  if (!personA && personB) {
    return 1;
  }
  if (!personA && !personB) {
    return 0;
  }
  return personA.localeCompare(personB);
};

const IntermentSort = (a: Interment, b: Interment) => {
  return cemeterySort(a, b) || personSort(a, b);
};

export default IntermentSort;
