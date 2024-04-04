const getItem = (key, defaultValue = []) => {
  /* istanbul ignore if */
  if (typeof window == "undefined") {
    return [];
  }
  try {
    const savedValue = localStorage.getItem(key);

    if (savedValue) {
      return JSON.parse(savedValue);
    }

    return defaultValue;
  } catch (err) /* istanbul ignore next */ {
    console.error(err);

    return defaultValue;
  }
};

const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) /* istanbul ignore next */ {
    console.error(err);
  }
};

export { getItem, setItem };
