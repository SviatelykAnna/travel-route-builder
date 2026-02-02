import { Route, Routes } from 'react-router-dom';

import { NotFound } from './views/NotFound';
import { TripBuilder } from './views/TripBuilder';

function App() {
  return (
    <Routes>
      <Route path="/" element={<TripBuilder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
