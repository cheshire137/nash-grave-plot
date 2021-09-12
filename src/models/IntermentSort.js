const cemeterySort = (a, b) => {
  const cemeteryA = a.cemeteryName;
  const cemeteryB = b.cemeteryName;
  return cemeteryA.localeCompare(cemeteryB);
};

const normalizePerson = person => {
  return (person || '').toLocaleLowerCase().replace(/[()]/g, '');
};

const personSort = (a, b) => {
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

const IntermentSort = (a, b) => {
  return personSort(a, b) || cemeterySort(a, b);
};

export default IntermentSort;
