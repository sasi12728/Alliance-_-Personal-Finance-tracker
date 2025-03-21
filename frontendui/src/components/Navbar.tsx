
import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/90 shadow-sm backdrop-blur-md' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          <Link 
            to="/"
            className="text-2xl font-display font-bold text-foreground flex items-center"
          >
            <span className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center mr-2">F</span>
            FinanceFlow
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <NavItem label="Features" href="#features" />
            <NavItem label="Testimonials" href="#testimonials" />
            <NavItem label="Pricing" href="#pricing" />
            <Button variant="ghost" className="text-foreground/80 hover:text-foreground" asChild>
              <Link to="/signin">Log In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="pt-12">
                <div className="flex flex-col gap-4">
                  <MobileNavItem label="Features" href="#features" />
                  <MobileNavItem label="Testimonials" href="#testimonials" />
                  <MobileNavItem label="Pricing" href="#pricing" />
                  <div className="h-px w-full bg-border my-2"></div>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="/signin">Log In</Link>
                  </Button>
                  <Button className="w-full justify-start mt-2" asChild>
                    <Link to="/signup">Get Started</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </nav>
      </div>
    </header>
  );
};

const NavItem = ({ label, href }: { label: string; href: string }) => {
  return (
    <a 
      href={href}
      className="inline-flex items-center px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md transition-colors"
    >
      {label}
    </a>
  );
};

const MobileNavItem = ({ label, href }: { label: string; href: string }) => {
  return (
    <a 
      href={href}
      className="flex items-center px-3 py-3 text-lg font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-md transition-colors"
    >
      {label}
    </a>
  );
};

export default Navbar;
