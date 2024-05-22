/**
 * Call the provided callback when the given input changes
 * its value attribute.
 * It creates an MutationObserver and link it to the input.
 */
const listenToValueChange = (
  input: HTMLInputElement,
  callback: (newValue: string) => void
) => {
  const observer = new MutationObserver((mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'value'
      ) {
        callback(input.value);
      }
    }
  });

  observer.observe(input, { attributes: true });

  return observer.disconnect;
};

export { listenToValueChange };
