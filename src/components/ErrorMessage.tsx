import { CircleAlertIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type ErrorMessageProps = {
  className?: string;
  message?: string;
};

const DEFAULT_ERROR_MESSAGE = 'Something went wrong';

export const ErrorMessage = ({ className, message = DEFAULT_ERROR_MESSAGE }: ErrorMessageProps) => {
  return (
    <div className={cn('flex flex-col items-center gap-2 text-red-500', className)}>
      <CircleAlertIcon className="size-5" />
      <p className="text-center text-sm font-medium">{message}</p>
    </div>
  );
};
export default ErrorMessage;
