import Interment from './Interment';
import Cemetery from './Cemetery';

const cemeterySort = (a: Cemetery, b: Cemetery) => {
  return a.name.localeCompare(b.name);
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
  return cemeterySort(a.cemetery, b.cemetery) || personSort(a, b);
};

export default IntermentSort;
