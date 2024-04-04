export const jsonParse = (data, cx) => {
  try {
    return data && JSON.parse(data);
  } catch (e) {
    return undefined;
  }
};
