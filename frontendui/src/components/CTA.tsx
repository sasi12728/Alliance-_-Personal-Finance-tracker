
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, CheckCircle } from 'lucide-react';

const CTA = () => {
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
    <section className="py-24 px-4 relative overflow-hidden" style={{
      background: 'radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.1), transparent 70%)',
    }}>
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden glass border border-white/20 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 reveal">
                Start your financial journey today
              </h2>
              <p className="text-foreground/70 mb-8 reveal delayed-100">
                Join thousands of users who have transformed their relationship with money. Your financial freedom begins here.
              </p>
              
              <div className="space-y-3 mb-8">
                <BenefitItem text="No credit card required for trial" />
                <BenefitItem text="Set up in less than 5 minutes" />
                <BenefitItem text="Cancel anytime, no questions asked" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 reveal delayed-300">
                <Button size="lg" className="group">
                  Get Started Free
                  <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
            
            <div className="bg-primary/5 relative hidden md:block">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
                <div className="absolute top-3/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full filter blur-2xl"></div>
              </div>
              
              <div className="relative h-full flex items-center justify-center p-8">
                <div className="glass bg-white/30 rounded-xl p-6 border border-white/20 shadow-sm">
                  <div className="text-center mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      14-day free trial
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                      1
                    </div>
                    <span className="text-sm">Create your account</span>
                  </div>
                  
                  <div className="w-px h-4 bg-border ml-4"></div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                      2
                    </div>
                    <span className="text-sm">Connect your accounts</span>
                  </div>
                  
                  <div className="w-px h-4 bg-border ml-4"></div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-medium">
                      3
                    </div>
                    <span className="text-sm">Start managing your finances</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BenefitItem = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-2 reveal delayed-200">
      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
      <span className="text-foreground/80">{text}</span>
    </div>
  );
};

export default CTA;
