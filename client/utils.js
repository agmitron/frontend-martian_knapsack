export const noop = () => {};

export const sleep = ms => new Promise(r => setTimeout(r, ms));
