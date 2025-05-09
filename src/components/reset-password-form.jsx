import {useEffect, useState} from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Key, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { authAPI } from '@/api/authAPI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function ResetPasswordForm({ className, ...props }) {
  const [searchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const urlToken = searchParams.get('token');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: { errors }
  } = useForm({
    defaultValues: {
      token: urlToken || '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  // Auto-focus the first OTP slot if no URL token
  useEffect(() => {
    if (!urlToken) {
      setTimeout(() => setFocus('token'), 100);
    }
  }, [urlToken, setFocus]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      await authAPI.resetPassword(data.token, data.newPassword);
      setIsSubmitted(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Password reset failed');
      // Clear the OTP on error for security
      if (!urlToken) setValue('token', '');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="text-center animate-in fade-in">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-medium">Password Updated!</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Redirecting to login page...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Key className="h-6 w-6" />
            Reset Password
          </CardTitle>
          <CardDescription>
            {urlToken ? 'Enter your new password' : 'Paste your reset token'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              {error && (
                <div className="text-sm font-medium text-destructive p-2 bg-destructive/10 rounded-md">
                  {error}
                </div>
              )}

              {!urlToken && (
                <div className="grid gap-2">
                  <Label htmlFor="token">Reset Token</Label>
                  <Input
                    id="token"
                    placeholder="Paste your reset token"
                    {...register('token', {
                      required: 'Reset token is required',
                      pattern: {
                        value: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
                        message: 'Invalid token format. Please use the exact link from your email.'
                      }
                    })}
                    disabled={isLoading || !!urlToken}
                    className="font-mono" // Makes hyphens align better
                  />
                  {errors.token && (
                    <span className="text-sm text-destructive">
                      {errors.token.message}
                    </span>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Tip: Copy the entire token from your email, including hyphens
                  </p>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="NewSecurePass123"
                  {...register('newPassword', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                      message: 'Must include uppercase, lowercase, and number'
                    }
                  })}
                  disabled={isLoading}
                />
                {errors.newPassword && (
                  <span className="text-sm text-destructive">
                    {errors.newPassword.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === watch('newPassword') || 'Passwords do not match'
                  })}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <span className="text-sm text-destructive">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => navigate('/login')}
            className="w-full"
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}