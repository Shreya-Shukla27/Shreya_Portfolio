import { useState } from 'react';
import Loader from './components/ui/Loader';
import Home from './pages/Home';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <Loader onDone={() => {
          const loader = document.getElementById('loader');
          if (loader) { loader.classList.add('done'); setTimeout(() => setLoaded(true), 700); }
          else setLoaded(true);
        }} />
      )}
      {loaded && <Home />}
    </>
  );
}
