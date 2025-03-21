
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    content: "FinanceFlow transformed how I handle my finances. The intuitive interface and real-time insights help me make smarter decisions every day.",
    author: "Sophia Williams",
    role: "Marketing Director",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    id: 2,
    content: "As someone who always struggled with budgeting, this app has been a game-changer. The automatic categorization feature saves me hours of manual work.",
    author: "David Chen",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    id: 3,
    content: "I've tried many finance apps, but FinanceFlow stands out with its clean design and powerful features. My savings have improved by 30% since using it.",
    author: "Emma Johnson",
    role: "Small Business Owner",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&auto=format&fit=crop&q=80",
    rating: 4
  },
  {
    id: 4,
    content: "The goal tracking feature keeps me motivated to save for my dream vacation. I can finally see my financial progress in real-time.",
    author: "Marcus Taylor",
    role: "Healthcare Professional",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&auto=format&fit=crop&q=80",
    rating: 5
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

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
    <section id="testimonials" className="py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 reveal">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 reveal delayed-100">
            Trusted by thousands of users worldwide
          </h2>
          <p className="text-lg text-foreground/70 reveal delayed-200">
            Hear from our community of users who have transformed their financial lives with FinanceFlow.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div 
              className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
            >
              <div className="glass bg-white/50 rounded-2xl p-8 md:p-10 shadow-sm border border-white/30 reveal">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  {[...Array(5 - testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-gray-300" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl font-medium mb-8 text-foreground/90">
                  "{testimonials[activeIndex].content}"
                </p>
                
                <div className="flex items-center">
                  <img 
                    src={testimonials[activeIndex].avatar} 
                    alt={testimonials[activeIndex].author}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-bold">{testimonials[activeIndex].author}</h4>
                    <p className="text-sm text-foreground/70">{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                disabled={isAnimating}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              {testimonials.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={`w-2 h-2 p-0 rounded-full ${activeIndex === index ? 'bg-primary' : 'bg-primary/30'}`}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setActiveIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }}
                  disabled={isAnimating}
                />
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                disabled={isAnimating}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
