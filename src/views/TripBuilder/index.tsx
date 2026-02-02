import { ReactFlowProvider } from '@xyflow/react';

import { Canvas } from './Canvas';
import { Sidebar } from './Sidebar';

export const TripBuilder = () => (
  <ReactFlowProvider>
    <div className="bg-background flex h-dvh w-full">
      <Sidebar />
      <Canvas />
    </div>
  </ReactFlowProvider>
);
