import '@/assets/globals.css';

import { createRoot } from 'react-dom/client';

import { SuggestionButton } from '@/business/suggestion/ui/suggestion-button';
import { getButtonWithInnerText } from '@/technical/helpers/get-button-with-inner-text';
import { getElementOrRetry } from '@/technical/helpers/get-element-or-retry';

export default defineContentScript({
  matches: ['<all_urls>'],
  cssInjectionMode: 'ui',

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      position: 'inline',
      name: 'jsx-better-jow',
      onMount: async () => {
        const button = await getElementOrRetry(
          "C'est parti !",
          getButtonWithInnerText
        );
        if (!button) {
          return null;
        }

        const container = document.createElement('div');
        container.className = 'flex';
        button.parentElement?.appendChild(container);

        const root = createRoot(container);

        root.render(<SuggestionButton originalButton={button} />);
        return root;
      },
      onRemove: async (root) => {
        (await root)?.unmount();
      },
    });

    ui.mount();
  },
});
