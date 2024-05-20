const DELAY = 500;

/**
 * Trying to retrieve an element of the document.
 * As it may not be present in the DOM when the function is executed, it can be re-triggered after a delay.
 * @param selector query selector used to find the element in the document
 * @param timeout time at which the function will stop to retry
 * @returns the queried element or null if the function times out.
 */
const getElementOrRetry = async <TElement>(
  selector: string,
  getter: (selector: string) => TElement | null = document.querySelector,
  timeout: number = 10000
): Promise<TElement | null> => {
  const element = getter(selector);
  if (!element && timeout) {
    return await new Promise((resolve) =>
      setTimeout(
        () => resolve(getElementOrRetry(selector, getter, timeout - DELAY)),
        DELAY
      )
    );
  }
  return element;
};

export { getElementOrRetry };
