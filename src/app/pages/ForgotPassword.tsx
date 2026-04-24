import { useState } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Mail, ArrowLeft, ArrowRight, Zap } from "lucide-react";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - in real app, send reset email
    setSubmitted(true);
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Forgot Password?</h1>
          <p className="text-muted-foreground">
            {submitted 
              ? "Check your email for reset instructions" 
              : "No worries, we'll send you reset instructions"}
          </p>
        </div>

        <Card>
          {!submitted ? (
            <>
              <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>
                  Enter your email address and we'll send you a link to reset your password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Send Reset Link
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </form>

                <div className="mt-6">
                  <Link to="/login" className="flex items-center justify-center text-sm text-blue-600 hover:underline">
                    <ArrowLeft className="mr-2 size-4" />
                    Back to login
                  </Link>
                </div>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Check Your Email</CardTitle>
                <CardDescription>
                  We've sent password reset instructions to {email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-sm text-foreground">
                    Didn't receive the email? Check your spam folder or{" "}
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      try again
                    </button>
                  </p>
                </div>

                <Link to="/login">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 size-4" />
                    Back to login
                  </Button>
                </Link>
              </CardContent>
            </>
          )}
        </Card>

        <div className="mt-4 text-center">
          <Link to="/forgot-password-v2"
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