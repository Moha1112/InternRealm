import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10 text-center bg-background">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive shadow-sm"
      >
        <AlertTriangle className="h-8 w-8" />
      </motion.div>

      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
        404 – Page Not Found
      </h1>

      <p className="text-muted-foreground text-base sm:text-lg max-w-md mb-8">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild>
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Home
          </Link>
        </Button>

        <Button variant="outline" asChild>
          <Link to="/login" className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            Sign In
          </Link>
        </Button>
      </div>
    </div>
  );
}