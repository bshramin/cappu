export const timeoutPromise = (promise, ms) => {
  let timer;
  return Promise.race([
    promise,
    new Promise((_r, rej) => (timer = setTimeout(rej, ms))),
  ]).finally(() => clearTimeout(timer));
};
