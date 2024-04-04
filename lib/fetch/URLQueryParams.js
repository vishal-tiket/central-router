export const stringifyURLQuery = (params) => {
  const convertedToString = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [key, value.toString()])
  );

  const searchParams = new URLSearchParams(convertedToString);

  return searchParams.toString();
};
