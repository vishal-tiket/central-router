function chunk(array, size = 1) {
  size = Math.max(Math.ceil(size), 0);

  const length = array == null ? 0 : array.length;

  if (!length || size < 1) {
    return [];
  }

  let index = 0;
  let resIndex = 0;

  const result = new Array(Math.ceil(length / size));

  while (index < length) {
    result[resIndex++] = array.slice(index, index + size);
    index = index + size;
  }
  return result;
}

export default chunk;
