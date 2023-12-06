const SOURCE = {
  development: "https://storage.vipul-pandit.in/storage/index.html?version=2.0",
  production: "https://storage.vipul-pandit.in/storage/index.html?version=2.0",
};

export const getSource = () => {
  const isClient = typeof window !== "undefined";
  if (!isClient) return "";

  const env = process.env.NODE_ENV;

  const process = window?.process;
  if (process?.LOCAL_STORAGE) {
    return process.LOCAL_STORAGE;
  } else {
    return SOURCE[env] ?? SOURCE["development"];
  }
};
