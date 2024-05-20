import { Button } from '@/technical/ui/button';

type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

const JowButton: React.FunctionComponent<Props> = (props) => {
  return (
    <Button
      className="h-24 w-full rounded-none rounded-b-3xl text-4xl md:inline-block md:h-32 md:w-96 md:rounded-b-none md:rounded-r-3xl"
      {...props}
    />
  );
};

export { JowButton };
