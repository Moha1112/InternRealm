import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth.js";
import { useEffect, useState } from "react";
import { CheckCircle } from 'lucide-react';

export function LoginForm({ className, ...props }) {
  const { user, login, isLoading, error, clearError } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // 5-second countdown

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/dashboard');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [user, navigate]);

  if (user) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="text-center animate-in fade-in">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600 animate-in zoom-in" />
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-medium">Already signed in!</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              onClick={() => navigate('/dashboard')}
              className="w-full"
            >
              Go to Dashboard Now
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/logout')}
              className="w-full"
            >
              Logout Instead
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      // Error is already handled in AuthContext
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {error && (
                <div className="text-sm font-medium text-destructive p-2 bg-destructive/10 rounded-md">
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  disabled={isLoading}
                />
                {errors.email && (
                  <span className="text-sm text-destructive">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  disabled={isLoading}
                />
                {errors.password && (
                  <span className="text-sm text-destructive">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                type="button"
                disabled={isLoading}
                onClick={() => {
                  // Implement Google login here
                }}
              >
                Login with Google
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="underline underline-offset-4"
                onClick={clearError}
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}