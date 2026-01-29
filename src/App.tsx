import { Background, Controls, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { CountriesSearch } from './components/CountriesSearch';

function App() {
  return (
    <div className="bg-background flex h-dvh w-full">
      <CountriesSearch />

      <div className="h-full w-full">
        <ReactFlow>
          <Background bgColor="var(--react-flow-bg)" />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
