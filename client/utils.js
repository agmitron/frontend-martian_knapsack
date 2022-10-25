export const noop = () => {};

export const sleep = ms => new Promise(r => setTimeout(r, ms));

export function bindKeyboardShortcuts(keyHandlerMapping) {
  return (e, payload) => {
    const handler = keyHandlerMapping[e.key];

    if (handler) {
      handler(e, payload);
    }
  };
}
