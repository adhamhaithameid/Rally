import { useState } from "react";
import { Link } from "react-router";
import { Mail, ArrowLeft, ArrowRight, Send, Zap, RefreshCw } from "lucide-react";
import svgPaths from "../../imports/svg-gyowvurp60";

function RallyLogo({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="27 26 133 127" width={size} height={size} fill="none">
      <path d={svgPaths.p6b466c0} fill="#ff4615" />
    </svg>
  );
}

const INPUT = "w-full pl-9 pr-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[#ff4615] transition-colors placeholder:text-muted-foreground";

export function ForgotPasswordV2() {
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [resent,    setResent]    = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 700);
  }

  function handleResend() {
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      {/* Card */}
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2.5 mb-10">
          <RallyLogo />
          <span className="text-[17px] font-bold text-foreground">Rally</span>
        </Link>

        {!submitted ? (
          <>
            {/* Icon */}
            <div className="w-12 h-12 rounded-[12px] flex items-center justify-center mb-6"
              style={{ background: "#fff2ed" }}>
              <Mail className="size-6" style={{ color: "#ff4615" }} />
            </div>

            <h1 className="text-[22px] font-bold text-foreground mb-1">Forgot your password?</h1>
            <p className="text-[13px] text-muted-foreground mb-7">
              No worries — enter your email and we'll send you reset instructions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-medium text-foreground mb-1.5">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <input value={email} onChange={e => setEmail(e.target.value)}
                    type="email" placeholder="john@example.com" required autoFocus
                    className={INPUT} />
                </div>
              </div>

              <button type="submit" disabled={!email || loading}
                className="w-full h-10 flex items-center justify-center gap-2 rounded-[8px] text-white text-[13px] font-medium transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "#ff4615" }}>
                {loading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <><Send className="size-3.5" /> Send reset link</>
                )}
              </button>
            </form>

            <Link to="/login-v2"
              className="flex items-center justify-center gap-1.5 mt-6 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="size-3.5" /> Back to sign in
            </Link>
          </>
        ) : (
          <>
            {/* Success icon */}
            <div className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
              style={{ background: "#eaf7f0" }}>
              <Send className="size-6" style={{ color: "#0f6a43" }} />
            </div>

            <h1 className="text-[22px] font-bold text-foreground mb-1">Check your email</h1>
            <p className="text-[13px] text-muted-foreground mb-2">
              We've sent password reset instructions to:
            </p>
            <p className="text-[13px] font-medium text-foreground mb-7 break-all">{email}</p>

            {/* Info box */}
            <div className="rounded-[10px] border border-border bg-card p-4 mb-6 space-y-2">
              <p className="text-[12px] text-foreground">The link will expire in <span className="font-medium">15 minutes</span>.</p>
              <p className="text-[12px] text-muted-foreground">
                Didn't get it? Check your spam folder or{" "}
                <button onClick={handleResend}
                  className="font-medium transition-colors hover:underline"
                  style={{ color: "#ff4615" }}>
                  {resent ? "Sent!" : "resend"}
                </button>
                {resent && (
                  <span className="ml-1 text-[11px]" style={{ color: "#0f6a43" }}>✓</span>
                )}
              </p>
            </div>

            <Link to="/login-v2">
              <button className="w-full h-10 flex items-center justify-center gap-2 rounded-[8px] border border-border bg-background text-foreground text-[13px] hover:bg-muted transition-colors">
                <ArrowLeft className="size-3.5" /> Back to sign in
              </button>
            </Link>

            {/* Try different email */}
            <button onClick={() => { setSubmitted(false); setEmail(""); }}
              className="flex items-center justify-center gap-1.5 w-full mt-3 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
              <RefreshCw className="size-3" /> Try a different email
            </button>
          </>
        )}

        {/* Classic link */}
        <div className="mt-10 text-center">
          <Link to="/forgot-password"
            className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
            <Zap className="size-3" /> Switch to classic view
          </Link>
        </div>
      </div>
    </div>
  );
}
