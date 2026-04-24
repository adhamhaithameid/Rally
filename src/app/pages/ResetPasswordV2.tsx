import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Lock, Eye, EyeOff, Check, AlertCircle, Zap, ShieldCheck } from "lucide-react";
import svgPaths from "../../imports/svg-gyowvurp60";

function RallyLogo({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="27 26 133 127" width={size} height={size} fill="none">
      <path d={svgPaths.p6b466c0} fill="var(--rally-brand)" />
    </svg>
  );
}

const INPUT_PW = "w-full pl-9 pr-9 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground";

interface PwStrength { score: number; label: string; color: string }

function getStrength(pw: string): PwStrength {
  if (!pw) return { score: 0, label: "", color: "" };
  let s = 0;
  if (pw.length >= 8)          s++;
  if (/[A-Z]/.test(pw))        s++;
  if (/[0-9]/.test(pw))        s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (s <= 1) return { score: s, label: "Weak",   color: "#EF4444" };
  if (s === 2) return { score: s, label: "Fair",   color: "#F59E0B" };
  if (s === 3) return { score: s, label: "Good",   color: "#0f5fd7" };
  return              { score: 4, label: "Strong", color: "#0f6a43" };
}

function PasswordStrengthBar({ password }: { password: string }) {
  const { score, label, color } = getStrength(password);
  if (!password) return null;
  return (
    <div className="mt-1.5 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex-1 h-1 rounded-full transition-colors"
            style={{ background: i <= score ? color : "var(--border)" }} />
        ))}
      </div>
      <p className="text-[10px]" style={{ color }}>{label}</p>
    </div>
  );
}

const PW_REQUIREMENTS = [
  { label: "At least 8 characters",       test: (p: string) => p.length >= 8 },
  { label: "One uppercase letter (A–Z)",   test: (p: string) => /[A-Z]/.test(p) },
  { label: "One number (0–9)",             test: (p: string) => /[0-9]/.test(p) },
  { label: "One special character (!@#…)", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export function ResetPasswordV2() {
  const navigate  = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [showCf,   setShowCf]   = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [loading,  setLoading]  = useState(false);

  const strength = getStrength(password);
  const pwMatch  = confirm === "" || password === confirm;
  const canSubmit = strength.score >= 2 && password === confirm && confirm !== "";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/login-v2"), 2500);
    }, 700);
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          {/* Animated check */}
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "#eaf7f0" }}>
            <ShieldCheck className="size-8" style={{ color: "#0f6a43" }} />
          </div>
          <h1 className="text-[22px] font-bold text-foreground mb-2">Password updated!</h1>
          <p className="text-[13px] text-muted-foreground mb-6">
            Your password has been reset successfully. Redirecting you to sign in…
          </p>
          {/* Redirect progress bar */}
          <div className="w-full h-1 rounded-full bg-muted overflow-hidden mb-8">
            <div className="h-full rounded-full" style={{ background: "#0f6a43", width: "100%", animation: "progress 2.5s linear forwards" }} />
          </div>
          <style>{`@keyframes progress { from { width: 0% } to { width: 100% } }`}</style>
          <Link to="/login-v2"
            className="text-[12px] hover:underline transition-colors"
            style={{ color: "var(--rally-brand)" }}>
            Go to sign in now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link to="/" className="inline-flex items-center gap-2.5 mb-10">
          <RallyLogo />
          <span className="text-[17px] font-bold text-foreground">Rally</span>
        </Link>

        {/* Icon */}
        <div className="w-12 h-12 rounded-[12px] flex items-center justify-center mb-6"
          style={{ background: "var(--rally-brand-soft-light)" }}>
          <Lock className="size-6" style={{ color: "var(--rally-brand)" }} />
        </div>

        <h1 className="text-[22px] font-bold text-foreground mb-1">Set a new password</h1>
        <p className="text-[13px] text-muted-foreground mb-7">
          Your new password must be different from your previous one.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New password */}
          <div>
            <label className="block text-[11px] font-medium text-foreground mb-1.5">New password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input value={password} onChange={e => setPassword(e.target.value)}
                type={showPw ? "text" : "password"} placeholder="••••••••" required autoFocus
                className={INPUT_PW} />
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPw ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
              </button>
            </div>
            <PasswordStrengthBar password={password} />
          </div>

          {/* Requirements */}
          {password && (
            <div className="rounded-[8px] bg-muted/40 border border-border px-3 py-3 space-y-1.5">
              {PW_REQUIREMENTS.map(req => {
                const met = req.test(password);
                return (
                  <div key={req.label} className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: met ? "#eaf7f0" : "var(--muted)" }}>
                      <Check className="size-2" style={{ color: met ? "#0f6a43" : "var(--text-muted)" }} />
                    </span>
                    <span className="text-[11px]" style={{ color: met ? "var(--text-foreground)" : "var(--text-muted)" }}>
                      {req.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Confirm password */}
          <div>
            <label className="block text-[11px] font-medium text-foreground mb-1.5">Confirm new password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <input value={confirm} onChange={e => setConfirm(e.target.value)}
                type={showCf ? "text" : "password"} placeholder="Repeat password" required
                className={`${INPUT_PW} ${!pwMatch ? "border-red-400 focus:border-red-400" : ""}`} />
              <button type="button" onClick={() => setShowCf(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showCf ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
              </button>
            </div>
            {!pwMatch && confirm && (
              <p className="flex items-center gap-1 text-[11px] text-red-500 mt-1">
                <AlertCircle className="size-3" /> Passwords don't match
              </p>
            )}
            {pwMatch && confirm && password === confirm && (
              <p className="flex items-center gap-1 text-[11px] mt-1" style={{ color: "#0f6a43" }}>
                <Check className="size-3" /> Passwords match
              </p>
            )}
          </div>

          {/* Submit */}
          <button type="submit" disabled={!canSubmit || loading}
            className="w-full h-10 flex items-center justify-center gap-2 rounded-[8px] text-white text-[13px] font-medium transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: "var(--rally-brand)" }}>
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <><ShieldCheck className="size-3.5" /> Reset password</>
            )}
          </button>
        </form>

        <Link to="/login-v2"
          className="flex items-center justify-center gap-1.5 mt-6 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
          Back to sign in
        </Link>

        {/* Classic link */}
        <div className="mt-8 text-center">
          <Link to="/reset-password"
            className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
            <Zap className="size-3" /> Switch to classic view
          </Link>
        </div>
      </div>
    </div>
  );
}