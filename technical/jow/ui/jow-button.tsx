import { Button } from '@/technical/ui/button';
import { cn } from '@/technical/ui/helpers';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

const JowButton: React.FunctionComponent<Props> = ({ className, ...props }) => {
  return (
    <Button
      className={cn(
        'h-24 w-full rounded-none rounded-b-3xl text-4xl md:inline-block md:h-32 md:w-96 md:rounded-b-none md:rounded-r-3xl',
        className
      )}
      {...props}
    />
  );
};

export { JowButton };
