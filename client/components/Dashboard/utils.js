export function bindKeyboardShortcuts(keyHandlerMapping) {
  return (e, payload) => {
    const handler = keyHandlerMapping[e.key];

    if (handler) {
      handler(e, payload);
    }
  };
}

export const focusControls = {
  left: ({ columnIndex, cardIndex }, lastCardIndex) => ({
    columnIndex: columnIndex - 1,
    cardIndex: cardIndex > lastCardIndex ? lastCardIndex : cardIndex
  }),
  right: ({ columnIndex, cardIndex }, lastCardIndex) => ({
    columnIndex: columnIndex + 1,
    cardIndex: cardIndex > lastCardIndex ? lastCardIndex : cardIndex
  }),
  up: ({ columnIndex, cardIndex }, lastCardIndex) => ({
    columnIndex,
    cardIndex: cardIndex <= 0 ? lastCardIndex : cardIndex - 1
  }),
  down: ({ columnIndex, cardIndex }, lastCardIndex) => ({
    columnIndex,
    cardIndex: cardIndex >= lastCardIndex ? 0 : cardIndex + 1
  }),
  blur: () => [null, null],
  slide: ({ columnIndex, cardIndex }, lastCardIndex) => ({
    columnIndex,
    cardIndex: cardIndex >= lastCardIndex ? cardIndex - 1 : cardIndex
  })
};
