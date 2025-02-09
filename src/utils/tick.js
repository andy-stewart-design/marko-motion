export function tick(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delay);
  });
}
