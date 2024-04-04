export const error = (e) => {
  return {
    code: "RUNTIME_ERROR",
    message: e instanceof Error ? e.message : "Oops, something went wrong!",
    data: null,
  };
};
