const queue = {};

export const addToQueue = (key, p) => {
  if (!queue[key]) {
    queue[key] = [];
  }

  queue[key].push(p);

  Promise.all(queue[key]).then(() => {
    queue[key].splice(0, queue[key].length);
  });
};

export const waitForSetters = async (key) => {
  await Promise.all(queue[key] || []);
};
