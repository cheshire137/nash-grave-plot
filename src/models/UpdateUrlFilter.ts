function UpdateUrlFilter(key: string, value: string) {
  if (window.history.pushState) {
    const searchParams = new URLSearchParams(window.location.search);
    if (value.length > 0) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
    const url = new URL(window.location.href);
    url.search = searchParams.toString();
    window.history.pushState({}, '', url.toString());
  }
}

export default UpdateUrlFilter;
