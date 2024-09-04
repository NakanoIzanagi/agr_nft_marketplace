import React from 'react';

interface CustomLayoutProps {
  children: React.ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 bg-blue-600">
        <h1 className="text-xl text-white">Custom Page Layout</h1>
      </header>
      <main className="flex-grow p-4">
        {children}
      </main>
      <footer className="p-4 mt-auto bg-blue-600">
        <p className="text-center text-white">&copy; 2024 My Project</p>
      </footer>
    </div>
  );
};

export default CustomLayout;
