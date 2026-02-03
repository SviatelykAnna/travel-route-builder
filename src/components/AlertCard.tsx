import { CircleAlertIcon, InfoIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type AlertVariant = 'error' | 'info';

type AlertCardProps = {
  className?: string;
  message?: string;
  title?: string;
  variant?: AlertVariant;
};

const variantConfig = {
  error: {
    Icon: CircleAlertIcon,
    defaultTitle: 'Error',
    defaultMessage: 'Something went wrong',
    container: 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30',
    iconWrapper: 'bg-red-100 dark:bg-red-900/50',
    iconClass: 'text-red-600 dark:text-red-400',
    title: 'text-red-800 dark:text-red-200',
    message: 'text-red-700 dark:text-red-300',
  },
  info: {
    Icon: InfoIcon,
    defaultTitle: 'Info',
    defaultMessage: 'Here is some information',
    container: 'border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-950/30',
    iconWrapper: 'bg-blue-100 dark:bg-blue-900/50',
    iconClass: 'text-blue-600 dark:text-blue-400',
    title: 'text-blue-800 dark:text-blue-200',
    message: 'text-blue-700 dark:text-blue-300',
  },
};

export const AlertCard = ({ className, message, title, variant = 'error' }: AlertCardProps) => {
  const config = variantConfig[variant];
  const { Icon } = config;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'flex items-start gap-3 rounded-lg border px-4 py-3 text-left',
        config.container,
        className,
      )}
    >
      <span
        className={cn(
          'flex size-8 shrink-0 items-center justify-center rounded-full',
          config.iconWrapper,
        )}
        aria-hidden
      >
        <Icon className={cn('size-4', config.iconClass)} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className={cn('text-sm font-medium', config.title)}>{title ?? config.defaultTitle}</p>
        <p className={cn('text-sm', config.message)}>{message ?? config.defaultMessage}</p>
      </div>
    </div>
  );
};

export default AlertCard;
