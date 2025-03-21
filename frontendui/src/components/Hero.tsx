
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, LineChart, CreditCard, PiggyBank, TrendingUp } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative pt-28 pb-24 overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08), transparent 70%)',
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 reveal">
            <span className="animate-pulse-slow mr-2">•</span> Simplify your finances
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 max-w-3xl reveal delayed-100">
            Smart finance management for the{" "}
            <span className="text-primary">modern lifestyle</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mb-10 reveal delayed-200">
            Take control of your financial life with powerful tools that help you track expenses, 
            plan budgets, and achieve your financial goals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 reveal delayed-300">
            <Button size="lg" className="group">
              Get Started Free
              <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
          
          <div className="mt-16 relative reveal delayed-400">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10"></div>
            <div className="relative z-0 mx-auto">
              <div className="glass rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
                <div className="bg-primary/10 px-4 py-3 flex items-center gap-2 border-b border-white/20">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 text-sm text-foreground/60">FinanceFlow Dashboard</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 p-8 gap-6">
                  <DashboardCard 
                    title="Spending Overview" 
                    value="$2,854.90" 
                    change="+14%" 
                    positive={true}
                    icon={<LineChart className="w-5 h-5" />} 
                  />
                  <DashboardCard 
                    title="Monthly Budget" 
                    value="$8,500.00" 
                    change="75%" 
                    progress={true}
                    icon={<CreditCard className="w-5 h-5" />} 
                  />
                  <DashboardCard 
                    title="Savings Goal" 
                    value="$12,750.50" 
                    change="-2.3%" 
                    positive={false}
                    icon={<PiggyBank className="w-5 h-5" />} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </section>
  );
};

const DashboardCard = ({ 
  title, 
  value, 
  change, 
  positive, 
  progress,
  icon 
}: { 
  title: string; 
  value: string; 
  change: string;
  positive?: boolean;
  progress?: boolean;
  icon: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-border shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-foreground/70">{title}</h3>
        <div className="p-2 rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
      <div className="mb-2">
        <div className="text-2xl font-bold">{value}</div>
        {progress ? (
          <div className="mt-2">
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full"
                style={{ width: change }}
              ></div>
            </div>
            <div className="text-xs mt-1 text-foreground/60">{change} of budget used</div>
          </div>
        ) : (
          <div className={`text-sm flex items-center ${positive ? 'text-green-500' : 'text-red-500'}`}>
            <TrendingUp className={`w-4 h-4 mr-1 ${!positive && 'rotate-180'}`} />
            {change} this month
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
