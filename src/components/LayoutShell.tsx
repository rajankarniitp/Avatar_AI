import { ReactNode } from 'react';

type LayoutShellProps = {
  children: ReactNode;
};

const LayoutShell = ({ children }: LayoutShellProps) => {
  return (
    <div className="min-h-screen bg-navy text-white">
      <div className="pointer-events-none fixed inset-0 bg-radial-glow" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default LayoutShell;
