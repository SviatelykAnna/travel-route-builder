# Travel Route Builder

A visual travel itinerary planner built with React and React Flow. Create and manage travel routes by connecting countries, landmarks, hotels, restaurants, and beaches on an interactive canvas.

## Features

- **Interactive Canvas** - Drag, drop, and connect nodes to build your travel itinerary
- **Multiple Node Types** - Add countries, landmarks, hotels, restaurants, and beaches to your trip
- **Smart Connections** - Create routes between destinations with automatic cycle detection
- **Route Validation** - Define blocked routes to prevent invalid connections (e.g., certain country-to-country restrictions)
- **Country Search** - Browse and search countries from the REST Countries API
- **Import/Export** - Save your itinerary as JSON and load it later
- **Dark/Light Mode** - Toggle between themes for comfortable viewing
- **Responsive UI** - Modern, clean interface with smooth animations

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Flow** - Interactive node-based canvas
- **TailwindCSS 4** - Styling
- **TanStack Query** - Data fetching and caching
- **Zod** - Schema validation
- **React Router** - Client-side routing
- **Sonner** - Toast notifications
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/travel-route-builder.git
cd travel-route-builder
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start development server with HMR    |
| `npm run build`    | Type-check and build for production  |
| `npm run preview`  | Preview the production build locally |
| `npm run lint`     | Run ESLint to check for issues       |
| `npm run prettier` | Format code with Prettier            |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # Base UI components (Button, Input, Spinner)
│   └── AlertCard.tsx    # Alert/notification component
├── graph-core/          # Graph data structure library
│   ├── Graph.ts         # Core graph implementation
│   ├── EdgesValidator.ts # Edges validation logic
│   ├── nodes/           # Node base classes
│   └── edges/           # Edge base classes
├── lib/                 # Utilities and hooks
│   ├── hooks/           # Custom React hooks
│   └── utils.ts         # Helper functions
├── services/            # API integrations
│   └── rest-countries/  # REST Countries API client
└── views/               # Page components
    ├── TripBuilder/     # Main trip builder view
    │   ├── Canvas/      # React Flow canvas
    │   ├── Sidebar/     # Country list sidebar
    │   └── IntineraryDetailsBar/ # Draggable items toolbar
    └── NotFound/        # 404 page
```

## Usage

### Quick Start with Sample Data

The project includes a `mock-data.json` file with a pre-built itinerary. To load it:

1. Click the **Import** button in the top-right corner of the canvas
2. Select the `mock-data.json` file from the project root
3. The sample itinerary will be loaded onto the canvas

### Adding Countries

1. Browse the country list in the left sidebar
2. Use the search bar to filter countries
3. Drag a country from the sidebar onto the canvas

### Adding Itinerary Items

1. Use the toolbar at the bottom of the canvas
2. Drag items (Hotel, Beach, Landmark, Restaurant) onto the canvas
3. Position them as needed

### Creating Connections

1. Click and drag from a node's right handle (source)
2. Connect to another node's left handle (target)
3. Routes are validated automatically:
   - Cycles are prevented
   - Invalid routes are automatically blocked

### Import/Export

- Click **Export** to download your itinerary as JSON
- Click **Import** to load a previously saved itinerary

## Graph Core Library

The application includes a custom graph library (`src/graph-core/`) that handles:

- **Node Management** - Add, remove, and update nodes with position tracking
- **Edge Management** - Create and delete connections between nodes
- **Cycle Detection** - Prevents circular routes using BFS traversal
- **Route Validation** - Configurable rules to block specific connections
- **Serialization** - Import/export graph state as JSON

### Route Rules

Define blocked routes in `src/views/TripBuilder/Canvas/lib/constants.ts`:

```typescript
export const routeRules = `{
  "blockedEdges": [
    { "from": "FR", "to": "DE" },
    { "from": "IT", "to": "ES" }
  ]
}`;
```

## API Integration

The app fetches country data from the [REST Countries API](https://restcountries.com/):

- Endpoint: `https://restcountries.com/v3.1/all`
- Data includes: country name, flag, region, and more
- Cached using TanStack Query for optimal performance

## Development

### Code Quality

- **ESLint** - Linting with TypeScript and React hooks plugins
- **Prettier** - Code formatting with Tailwind plugin
- **Husky** - Pre-commit hooks for automated checks

### Adding New Node Types

1. Create a new node component in `src/views/TripBuilder/Canvas/nodes/`
2. Define the node data schema in `src/views/TripBuilder/Canvas/lib/tripBuilderSchema.ts`
3. Register the node type in `src/views/TripBuilder/Canvas/lib/constants.ts`
4. Add to `NODE_TYPES` in `src/views/TripBuilder/Canvas/types.ts`

## Thank You!
