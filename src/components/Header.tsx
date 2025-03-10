
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Shield, Car } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-6 md:px-12 border-b border-slate-100 flex justify-between items-center z-10">
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
          <Car className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold tracking-tight">PlateVision</h1>
          <p className="text-xs text-muted-foreground">License Plate Recognition Demo</p>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center space-x-8">
        <a 
          href="#features" 
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Features
        </a>
        <a 
          href="#demo" 
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Demo
        </a>
        <a 
          href="#documentation" 
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Documentation
        </a>
      </nav>
      
      <div className="flex items-center">
        <button 
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium",
            "bg-primary text-white shadow-md hover:bg-primary/90 transition-all duration-300"
          )}
        >
          <Shield className="h-4 w-4" />
          <span>Enterprise</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
