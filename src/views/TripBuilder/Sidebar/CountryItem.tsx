import { memo } from 'react';

import type { CountryNodeData } from '../Canvas/lib/graphSchema';
import { NODE_TYPES } from '../Canvas/types';

export const CountryItem = memo(({ cca2, name, flags }: CountryNodeData) => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData(
      'application/json',
      JSON.stringify({
        type: NODE_TYPES.COUNTRY,
        id: cca2,
        data: {
          cca2,
          name,
          flags,
        },
      }),
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragStart={onDragStart}
      draggable
      className="flex cursor-grab items-center gap-2 p-3 transition-colors hover:bg-amber-400/10"
    >
      <img draggable="false" src={flags.png} alt={name.common} className="h-auto w-5 shrink-0" />
      <p className="text-sm">{name.common}</p>
    </div>
  );
});
