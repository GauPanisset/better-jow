import '@/assets/globals.css';

import { useState } from 'react';

import { Button } from '@/technical/ui/button';

const Popup = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>WXT + React</h1>
      <div>
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the WXT and React logos to learn more</p>
    </>
  );
};

export default Popup;
