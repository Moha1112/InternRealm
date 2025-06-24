import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from "@/hooks/useAuth.js";
import { AlertCircleIcon } from "lucide-react"
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"

export default function Page() {
  const { user, register, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [_error, set_Error] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    set_Error(null);

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      set_Error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });
      
      // Reset form on success
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
      });
      
      // Redirect or show success message
      // navigate('/dashboard');
    } catch (err) {
      set_Error("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 flex-col space-y-6">
      
      <Card className="w-full max-w-md shadow-xl">
        
        <CardHeader className="space-y-1 text-center">
          {error && (
            <Alert className="mb-4" variant="destructive">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )}
          {_error && (
            <Alert className="mb-4" variant="destructive">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>{_error}</AlertTitle>
            </Alert>
          )}
          <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
          <CardDescription className="text-gray-600">
            Join our internship platform today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">First Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your first name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Last Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your last name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">I am a...</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student looking for internships</SelectItem>
                  <SelectItem value="company">Company offering internships</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium" onClick={clearError}>
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
