/**
 * Get button Element with the given text.
 */
const getButtonWithInnerText = (innerText: string) => {
  const buttons = document.getElementsByTagName('button');

  for (const button of buttons) {
    if (button.innerText === innerText) {
      return button;
    }
  }

  return null;
};

export { getButtonWithInnerText };
