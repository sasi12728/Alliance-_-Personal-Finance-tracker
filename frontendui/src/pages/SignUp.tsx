
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Eye, EyeOff, Check, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  // Password validation criteria
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword;
  
  const isPasswordValid = hasMinLength && hasUpperCase && hasNumber;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      toast({ title: "Invalid password", description: "Ensure your password meets all requirements.", variant: "destructive" });
      return;
    }
    if (!passwordsMatch) {
      toast({ title: "Passwords don't match", description: "Please ensure both passwords match.", variant: "destructive" });
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password })
      });
      console.log(JSON.stringify({ name, email, password }))
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "An error occurred.");
      }
      toast({ title: "Success", description: "Account created successfully!", variant: "success" });
    } catch (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
          <ArrowLeft size={16} />
          <span>Back to home</span>
        </Link>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Link to="/" className="inline-block mb-6">
              <div className="flex items-center justify-center">
                <span className="bg-primary text-primary-foreground w-10 h-10 rounded-md flex items-center justify-center mr-2 text-xl font-bold">F</span>
                <span className="text-2xl font-display font-bold text-foreground">FinanceFlow</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
            <p className="mt-2 text-muted-foreground">Start managing your finances today</p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a strong password"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-muted-foreground">Password must:</p>
                  <div className="text-xs flex items-center gap-2 text-muted-foreground">
                    {hasMinLength ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <X size={12} className="text-red-500" />
                    )}
                    <span className={hasMinLength ? "text-green-700" : "text-red-500"}>
                      Be at least 8 characters long
                    </span>
                  </div>
                  <div className="text-xs flex items-center gap-2 text-muted-foreground">
                    {hasUpperCase ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <X size={12} className="text-red-500" />
                    )}
                    <span className={hasUpperCase ? "text-green-700" : "text-red-500"}>
                      Include at least one uppercase letter
                    </span>
                  </div>
                  <div className="text-xs flex items-center gap-2 text-muted-foreground">
                    {hasNumber ? (
                      <Check size={12} className="text-green-500" />
                    ) : (
                      <X size={12} className="text-red-500" />
                    )}
                    <span className={hasNumber ? "text-green-700" : "text-red-500"}>
                      Include at least one number
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                
                {confirmPassword && (
                  <div className="mt-2 text-xs flex items-center gap-2">
                    {passwordsMatch ? (
                      <>
                        <Check size={12} className="text-green-500" />
                        <span className="text-green-700">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <X size={12} className="text-red-500" />
                        <span className="text-red-500">Passwords don't match</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Create account
            </Button>
            
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/signin" className="text-primary hover:text-primary/80 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
