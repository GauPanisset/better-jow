import { useEffect, useMemo } from 'react';

import { getJowClient } from '@/technical/jow/services/jow-client';
import { JowButton } from '@/technical/jow/ui/jow-button';

import { getBetterSuggestions } from '../services/get-better-suggestions';

type Props = {
  originalButton: HTMLButtonElement;
};

const SuggestionButton: React.FunctionComponent<Props> = ({
  originalButton,
}) => {
  const jowClient = useMemo(getJowClient, []);

  const createShoppingListWithBetterSuggestions = async () => {
    const suggestions = await getBetterSuggestions(6);
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
