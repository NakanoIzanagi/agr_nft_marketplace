import { FC } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

interface TokenomicsSectionProps {
  value: number;
  color: string;
  title: string;
  amount: string;
}

const TokenomicsSection: FC<TokenomicsSectionProps> = ({ value, color, title, amount }) => {
  return (
    <div className="relative p-6 transition-shadow duration-300 bg-[#192c1a] rounded-lg shadow-lg hover:shadow-2xl">
      <CircularProgressbar
        value={value}
        maxValue={100}
        text={`${value}%`}
        styles={buildStyles({
          pathColor: color,
          textColor: color,
          trailColor: '#2C2C2C',
        })}
      />
      <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
      <p className="text-lg font-medium">{amount}</p>
    </div>
  );
};

export default TokenomicsSection;
