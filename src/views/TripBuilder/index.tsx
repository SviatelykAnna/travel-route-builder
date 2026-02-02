import { ReactFlowProvider } from '@xyflow/react';

import { Toaster } from 'sonner';

import Canvas from './Canvas';
import Sidebar from './Sidebar';

const TripBuilder = () => (
  <ReactFlowProvider>
    <div className="bg-background flex h-dvh w-full">
      <Sidebar />
      <Canvas />
      <Toaster richColors position="top-right" />
    </div>
  </ReactFlowProvider>
);

export default TripBuilder;
