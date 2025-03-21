
import React from 'react';
import { ChevronRight, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <a 
              href="#" 
              className="text-2xl font-display font-bold text-foreground flex items-center mb-4"
            >
              <span className="bg-primary text-primary-foreground w-8 h-8 rounded-md flex items-center justify-center mr-2">F</span>
              FinanceFlow
            </a>
            <p className="text-foreground/70 mb-6">
              Simplifying personal finance management for everyone.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Facebook size={18} />} href="#" />
              <SocialLink icon={<Twitter size={18} />} href="#" />
              <SocialLink icon={<Instagram size={18} />} href="#" />
              <SocialLink icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <div className="space-y-3">
              <FooterLink text="Features" href="#features" />
              <FooterLink text="Pricing" href="#pricing" />
              <FooterLink text="Testimonials" href="#testimonials" />
              <FooterLink text="FAQ" href="#" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <div className="space-y-3">
              <FooterLink text="About Us" href="#" />
              <FooterLink text="Careers" href="#" />
              <FooterLink text="Blog" href="#" />
              <FooterLink text="Press Kit" href="#" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3">
              <ContactItem 
                icon={<Mail size={16} />} 
                text="support@financeflow.com" 
              />
              <ContactItem 
                icon={<Phone size={16} />} 
                text="+1 (555) 123-4567" 
              />
              <ContactItem 
                icon={<MapPin size={16} />} 
                text="123 Finance St, San Francisco, CA" 
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/60 mb-4 md:mb-0">
            © {new Date().getFullYear()} FinanceFlow. All rights reserved.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-foreground/60">
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ text, href }: { text: string; href: string }) => {
  return (
    <a 
      href={href} 
      className="text-foreground/70 hover:text-foreground transition-colors flex items-center group"
    >
      <ChevronRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
      {text}
    </a>
  );
};

const ContactItem = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <div className="flex items-center gap-2 text-foreground/70">
      <span className="text-primary">{icon}</span>
      <span>{text}</span>
    </div>
  );
};

const SocialLink = ({ icon, href }: { icon: React.ReactNode; href: string }) => {
  return (
    <a 
      href={href} 
      className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/70 hover:bg-primary/10 hover:text-primary transition-colors"
    >
      {icon}
    </a>
  );
};

export default Footer;
