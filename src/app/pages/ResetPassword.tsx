import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Lock, CheckCircle2, ArrowRight, Zap } from "lucide-react";

export function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - in real app, update password
    setSuccess(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="min-h-full bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Rally</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Reset Password</h1>
          <p className="text-muted-foreground">Enter your new password below</p>
        </div>

        <Card>
          {!success ? (
            <>
              <CardHeader>
                <CardTitle>Create New Password</CardTitle>
                <CardDescription>
                  Your new password must be different from previous passwords
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Reset Password
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="size-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Password Reset Successfully</CardTitle>
                  <CardDescription className="mt-2">
                    Your password has been reset. Redirecting to login...
                  </CardDescription>
                </div>
              </CardHeader>
            </>
          )}
        </Card>

        <div className="mt-4 text-center">
          <Link to="/reset-password-v2"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-xs">
            <Zap className="size-3" style={{ color: "var(--rally-brand)" }} />
            Try the new experience
            <ArrowRight className="size-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}