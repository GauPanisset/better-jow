import { useEffect, useMemo, useState } from 'react';

import { listenToValueChange } from '@/technical/helpers/listen-to-value-change';
import { getJowClient } from '@/technical/jow/services/jow-client';
import { JowButton } from '@/technical/jow/ui/jow-button';

import { getBetterSuggestions } from '../services/get-better-suggestions';

type Props = {
  originalButton: HTMLButtonElement;
};

const SuggestionButton: React.FunctionComponent<Props> = ({
  originalButton,
}) => {
  const [count, setCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const jowClient = useMemo(getJowClient, []);

  useEffect(() => {
    const countInput = originalButton.parentElement?.querySelector('input');
    if (!countInput) {
      return;
    }

    const disconnect = listenToValueChange(countInput, (newValue) =>
      setCount(parseInt(newValue, 10))
    );

    return () => {
      disconnect();
    };
  }, [originalButton]);

  const createShoppingListWithBetterSuggestions = async () => {
    setIsLoading(true);
    const suggestions = await getBetterSuggestions(count);
    await jowClient.createShoppingList(suggestions);
    window.location.replace('/grocery/shopping-list');
  };

  useEffect(() => {
    originalButton.style.display = 'none';
  }, [originalButton]);

  return (
    <JowButton
      disabled={isLoading}
      onClick={createShoppingListWithBetterSuggestions}
      className="animate-shimmer bg-[linear-gradient(110deg,hsl(var(--primary)),40%,hsl(var(--accent)),60%,hsl(var(--primary)))] bg-[length:300%_100%] hover:bg-primary/90 hover:bg-none disabled:bg-none"
    >
      C'est parti
      {isLoading ? (
        <span className="inline-flex">
          {[0, 0.08, 0.16].map((delay) => (
            <span
              key={delay}
              style={{ animationDelay: `${delay}s` }}
              className="animate-bounce text-4xl"
            >
              .
            </span>
          ))}
        </span>
      ) : (
        ' !'
      )}
    </JowButton>
  );
};

export { SuggestionButton };
