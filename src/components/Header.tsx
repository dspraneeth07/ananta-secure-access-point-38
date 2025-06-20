
import React from 'react';
import { Shield, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { logout } = useAuth();

  return (
    <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Logo - TGANB */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/68edd6e3-5f88-4e5e-a0be-b0e347c0ea8b.png" 
              alt="TGANB Logo" 
              className="w-16 h-16 mr-4"
            />
          </div>

          {/* Center Content */}
          <div className="flex-1 text-center">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">
              TELANGANA ANTI NARCOTICS BUREAU
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Drug Offenders Profiling, Analysis and Monitoring System <span className="font-medium">(DOPAMS)</span>
            </p>
          </div>

          {/* Right Logo and Actions - Telangana State Police */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/159bcf83-7cc1-4082-96a7-d6dc17d9b086.png" 
              alt="Telangana State Police" 
              className="w-16 h-16"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
