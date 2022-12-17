function UpdateUrlFilter(key, value) {
  if (window.history.pushState) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    const newUrlSearch = `?${searchParams.toString()}`;
    if (newUrlSearch !== '?' && window.location.search !== newUrlSearch) {
      window.history.pushState({}, '', newUrlSearch);
    }
  }
}

export default UpdateUrlFilter;
