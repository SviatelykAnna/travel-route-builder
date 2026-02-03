import { Camera, Hotel, Palmtree, ShoppingBag, Utensils } from 'lucide-react';

const itineraryItems = [
  {
    type: 'hotel',
    label: 'Hotel',
    icon: Hotel,
    color: 'text-violet-500',
    border: 'border-b-violet-500',
  },
  {
    type: 'beach',
    label: 'Beach',
    icon: Palmtree,
    color: 'text-cyan-500',
    border: 'border-b-cyan-500',
  },
  {
    type: 'attraction',
    label: 'Attraction',
    icon: Camera,
    color: 'text-rose-500',
    border: 'border-b-rose-500',
  },
  {
    type: 'restaurant',
    label: 'Restaurant',
    icon: Utensils,
    color: 'text-orange-500',
    border: 'border-b-orange-500',
  },
  {
    type: 'shopping',
    label: 'Shopping',
    icon: ShoppingBag,
    color: 'text-pink-500',
    border: 'border-b-pink-500',
  },
];

const IntineraryDetailsBar = () => {
  return (
    <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2">
      <div className="bg-card border-border flex items-center gap-1 rounded-xl border px-3 py-2 shadow-lg">
        <span className="text-muted-foreground mr-2 text-xs font-medium">Add to itinerary:</span>

        {itineraryItems.map(({ type, label, icon: Icon, color, border }) => (
          <div
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
