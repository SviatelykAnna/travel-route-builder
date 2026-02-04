import { v4 as uuidv4 } from 'uuid';

import { type GraphNodeData, type NodeType } from '../Canvas/types';
import { itineraryItems } from './constants';

const IntineraryDetailsBar = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    type: NodeType,
    data: GraphNodeData,
  ) => {
    event.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        type,
        id: uuidv4(),
        data: {
          ...data,
        },
      }),
    );
    event.dataTransfer.effectAllowed = 'move';
  };
  return (
    <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
      <div className="bg-card border-border flex items-center gap-1 rounded-xl border px-3 py-2 shadow-lg">
        <span className="text-muted-foreground mr-2 text-xs font-medium">Add to itinerary:</span>

        {itineraryItems.map(({ type, label, icon: Icon, color, border, data }) => (
          <div
            onDragStart={(event) => onDragStart(event, type, data)}
            key={type}
            draggable
            className={`bg-card hover:bg-accent flex cursor-grab items-center gap-2 border-b px-3 py-2 transition-colors active:cursor-grabbing ${border}`}
            title={`Drag to add ${label}`}
          >
            <Icon className={`size-4 ${color}`} />
            <span className="text-card-foreground text-sm">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntineraryDetailsBar;
