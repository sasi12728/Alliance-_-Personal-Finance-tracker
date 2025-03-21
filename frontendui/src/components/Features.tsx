
import React, { useEffect } from 'react';
import { 
  CreditCard, 
  LineChart, 
  BellRing, 
  PiggyBank, 
  Wallet, 
  Lock
} from 'lucide-react';

const Features = () => {
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
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 reveal">
            Features
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 reveal delayed-100">
            Powerful tools to master your finances
          </h2>
          <p className="text-lg text-foreground/70 reveal delayed-200">
            Our comprehensive suite of features helps you take control of your financial life,
            from everyday expenses to long-term planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<CreditCard />}
            title="Expense Tracking"
            description="Automatically categorize and track your spending in real-time. Connect your accounts and get instant updates."
            delay="delayed-100"
          />
          <FeatureCard 
            icon={<LineChart />}
            title="Financial Insights"
            description="Visualize your spending patterns and get personalized recommendations to optimize your financial habits."
            delay="delayed-200"
          />
          <FeatureCard 
            icon={<BellRing />}
            title="Smart Alerts"
            description="Receive custom notifications for bills, unusual spending, and budget limits to stay on top of your finances."
            delay="delayed-300"
          />
          <FeatureCard 
            icon={<PiggyBank />}
            title="Savings Goals"
            description="Set and track progress toward your savings goals, whether it's a vacation, a new home, or retirement."
            delay="delayed-100"
          />
          <FeatureCard 
            icon={<Wallet />}
            title="Budget Planning"
            description="Create customized budgets that adapt to your lifestyle and spending habits while keeping you on track."
            delay="delayed-200"
          />
          <FeatureCard 
            icon={<Lock />}
            title="Bank-Level Security"
            description="Rest easy knowing your financial data is protected with military-grade encryption and secure authentication."
            delay="delayed-300"
          />
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description,
  delay
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay: string;
}) => {
  return (
    <div className={`p-6 rounded-xl border border-border bg-white hover:shadow-md transition-all duration-300 reveal ${delay}`}>
      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
};

export default Features;
