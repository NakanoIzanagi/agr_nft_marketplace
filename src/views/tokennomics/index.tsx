import { FC } from 'react';
import TokenomicsSection from './tokenomicsSection';

export const TokenomicsView: FC = () => {
  return (
    <div className="flex flex-col items-center mt-10 px-6 py-12 pb-40 xl:w-[1000px] bg-gradient-to-b from-transparent via-black/50 to-black/20">
      {/* Title Section */}
      <h2 className="mb-8 text-4xl font-bold text-white animate__animated animate__fadeIn">Tokenomics</h2>

      {/* Description Section */}
      <p className="max-w-2xl mb-12 text-lg text-center animate__animated animate__fadeIn animate__delay-1s">
        We believe that a well-defined roadmap is the key to achieving our vision and driving our organization towards success.
      </p>

      {/* Tokenomics Details Section */}
      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
        <TokenomicsSection
          value={6}
          color="#4A90E2"
          title="Team"
          amount="($600,000,000)"
        />
        <TokenomicsSection
          value={60}
          color="#E94E77"
          title="Pre Sale"
          amount="($1,000,000,000)"
        />
        <TokenomicsSection
          value={31}
          color="#50E3C2"
          title="Liquidity"
          amount="($174,500,000,000)"
        />
      </div>
    </div>
  );
};

export default TokenomicsView;
