import { Link } from "react-router";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="h-full flex items-center justify-center bg-background p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-muted mb-4">404</h1>
        <h2 className="text-3xl font-bold text-foreground mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/">
            <Button variant="outline">Go to Home</Button>
          </Link>
          <Link to="/app/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
