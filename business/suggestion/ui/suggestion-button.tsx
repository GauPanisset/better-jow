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
    const suggestions = await getBetterSuggestions(count);
    await jowClient.createShoppingList(suggestions);
    window.location.replace('/grocery/shopping-list');
  };

  useEffect(() => {
    originalButton.style.display = 'none';
  }, [originalButton]);

  return (
    <JowButton onClick={createShoppingListWithBetterSuggestions}>
      C'est parti !
    </JowButton>
  );
};

export { SuggestionButton };
