
import React from 'react';
import { User, Mail, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileContentProps {
  userData: {
    name: string;
    email: string;
    imageUrl: string;
  };
}

const ProfileContent: React.FC<ProfileContentProps> = ({ userData }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0">
              <Avatar className="h-24 w-24">
                {userData.imageUrl ? (
                  <AvatarImage src={userData.imageUrl} alt={userData.name} />
                ) : (
                  <AvatarFallback className="text-2xl">{getInitials(userData.name)}</AvatarFallback>
                )}
              </Avatar>
            </div>
            
            <div className="space-y-4 flex-grow">
              <div>
                <div className="flex items-center mb-1">
                  <User className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Name</span>
                </div>
                <div className="font-medium">{userData.name}</div>
              </div>
              
              <div>
                <div className="flex items-center mb-1">
                  <Mail className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Email</span>
                </div>
                <div className="font-medium">{userData.email}</div>
              </div>
              
              <Button variant="outline" className="mt-4">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Total Tracked Assets</div>
              <div className="text-2xl font-semibold">€14,537.71</div>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Monthly Savings</div>
              <div className="text-2xl font-semibold">€1,200.00</div>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Active Budgets</div>
              <div className="text-2xl font-semibold">6</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileContent;
