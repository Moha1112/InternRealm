import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth.js'
import { LogOut, ArrowLeft, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function LogoutForm({ className, ...props }) {
  const { user, logout, isLoading } = useAuth()
  const navigate = useNavigate()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [countdown, setCountdown] = useState(5) // 5-second countdown before auto-logout

  // Auto-logout after countdown completes
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => navigate('/login'), 2000)
      return () => clearTimeout(timer)
    }
  }, [user, navigate])

  // Countdown timer for auto-logout
  useEffect(() => {
    if (isLoggingOut && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (isLoggingOut && countdown === 0) {
      handleLogout().then()
    }
  }, [isLoggingOut, countdown])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
      setIsLoggingOut(false)
    }
  }

  if (!user) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="text-center animate-in fade-in">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <LogOut className="h-6 w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-medium">You've been logged out</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Redirecting to login page...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <LogOut className="h-6 w-6" />
            Logout
          </CardTitle>
          <CardDescription>
            Are you sure you want to sign out?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm">
              You're currently logged in as <span className="font-medium">{user.email}</span>
            </p>

            {isLoggingOut && (
              <div className="flex items-center gap-2 text-sm text-yellow-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Logging out in {countdown} seconds...</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            variant="destructive"
            onClick={handleLogout}
            disabled={isLoggingOut || isLoading}
            className="w-full"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging Out...
              </>
            ) : (
              <>
                <LogOut className="mr-2 h-4 w-4" />
                Confirm Logout
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            disabled={isLoggingOut || isLoading}
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}