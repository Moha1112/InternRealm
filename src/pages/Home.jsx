import {
  Search,
  Briefcase,
  CheckCircle,
  LineChart,
} from 'lucide-react';
import { ArrowRight, Target, Users, TrendingUp, Star, MapPin, Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from "@/hooks/useAuth.js";

export default function Home() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    if ( user ) {
      navigate("/dashboard");
    }
  }, [navigate, isLoading, user]);

  const features = [
    {
      icon: Target,
      title: 'Smart Matching',
      description: 'AI-powered system matches you with internships that fit your skills and career goals.'
    },
    {
      icon: Users,
      title: 'Top Companies',
      description: 'Connect with leading companies across various industries and find your perfect match.'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Build valuable experience, expand your network, and accelerate your career development.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Students' },
    { number: '2K+', label: 'Partner Companies' },
    { number: '95%', label: 'Success Rate' },
    { number: '4.8', label: 'Average Rating', icon: Star }
  ];

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <nav className="bg-background/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-primary">InternRealm</div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild className="btn-modern">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="btn-modern bg-primary hover:bg-primary/90">
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-foreground mb-6 tracking-tight">
            Find Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-muted-foreground">Internship</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with top companies, discover exciting opportunities, and kickstart your career 
            with the perfect internship experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-modern bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3" asChild>
              <Link to="/register">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="btn-modern px-8 py-3" asChild>
              <Link to="/internships">Browse Internships</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-card py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-foreground">{stat.number}</span>
                  {stat.icon && <stat.icon className="h-6 w-6 text-yellow-500 ml-1" />}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose InternRealm?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need to find and secure your perfect internship
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-effect p-8 rounded-2xl modern-shadow interactive-hover">
                <div className="bg-muted w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Explore Opportunities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card p-6 rounded-xl modern-shadow interactive-hover">
              <MapPin className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Location-Based Search</h3>
              <p className="text-muted-foreground mb-4">Find internships near you with our interactive map</p>
              <Button variant="outline" className="btn-modern" asChild>
                <Link to="/internships">View Map</Link>
              </Button>
            </div>
            <div className="bg-card p-6 rounded-xl modern-shadow interactive-hover">
              <Calendar className="h-8 w-8 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">Interview Calendar</h3>
              <p className="text-muted-foreground mb-4">Schedule and manage your interviews efficiently</p>
              <Button variant="outline" className="btn-modern" asChild>
                <Link to="/interviews">View Calendar</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">Ready to Start Your Journey?</h2>
          <p className="text-primary-foreground/80 mb-8 text-lg max-w-2xl mx-auto">
            Join thousands of students who have found their dream internships through our platform.
          </p>
          <Button size="lg" className="btn-modern bg-background text-foreground hover:bg-background/90 px-8 py-3" asChild>
            <Link to="/register">
              Create Your Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
