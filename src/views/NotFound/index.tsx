import { ArrowLeftIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div className="bg-background flex min-h-dvh w-full flex-col items-center justify-center px-6">
    <p className="text-muted-foreground text-7xl font-semibold tracking-tight sm:text-8xl">404</p>
    <h1 className="text-foreground mt-4 text-xl font-medium sm:text-2xl">Page not found</h1>
    <p className="text-muted-foreground mt-2 max-w-sm text-center text-sm">
      The page you’re looking for doesn’t exist or has been moved.
    </p>
    <Link
      to="/"
      className="bg-primary text-primary-foreground mt-8 flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
    >
      <ArrowLeftIcon className="size-4" />
      Back to Trip Builder
    </Link>
  </div>
);
