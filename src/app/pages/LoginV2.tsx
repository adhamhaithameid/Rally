import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check, Zap } from "lucide-react";
import svgPaths from "../../imports/svg-gyowvurp60";

// ── Shared helpers ────────────────────────────────────────────────────────────

function RallyLogo({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="27 26 133 127" width={size} height={size} fill="none">
      <path d={svgPaths.p6b466c0} fill="var(--rally-brand)" />
    </svg>
  );
}

const INPUT = "w-full pl-9 pr-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[var(--rally-brand)] transition-colors placeholder:text-muted-foreground";

// ── Left branding panel ───────────────────────────────────────────────────────

function BrandPanel() {
  const features = [
    "Chat, AI, Tasks, Calendar & Files in one place",
    "Role-based team access control",
    "Your data, your privacy — self-hosting ready",
    "Seamless V1 and V2 experience switching",
  ];

  return (
    <div className="hidden lg:flex flex-col justify-between px-12 py-12 w-[420px] flex-shrink-0 border-r border-border bg-card">
      {/* Logo */}
      <div>
        <Link to="/" className="inline-flex items-center gap-2.5 mb-12">
          <RallyLogo size={28} />
          <span className="text-[18px] font-bold text-foreground">Rally</span>
        </Link>

        <h2 className="text-[26px] font-bold text-foreground leading-snug mb-4">
          Work together,<br />seamlessly.
        </h2>
        <p className="text-[13px] text-muted-foreground mb-8 leading-relaxed">
          Rally brings your entire team workflow into one calm, powerful workspace. Chat, plan, and ship — without switching tabs.
        </p>

        <ul className="space-y-3">
          {features.map(f => (
            <li key={f} className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "var(--rally-brand-soft-light)" }}>
                <Check className="size-2.5" style={{ color: "var(--rally-brand)" }} />
              </span>
              <span className="text-[12px] text-foreground">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Social proof */}
      <div className="pt-8 border-t border-border">
        <div className="flex items-center gap-3 mb-3">
          {["Sarah J", "Mike C", "Emily D", "Alex R"].map((name, i) => {
            const c = ["#3B82F6","#10B981","#F59E0B","#8B5CF6"];
            const init = name.split(" ").map(n => n[0]).join("");
            return (
              <div key={name} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-semibold ring-2 ring-card"
                style={{ background: c[i], marginLeft: i > 0 ? -8 : 0, zIndex: 4 - i, position: "relative" }}>
                {init}
              </div>
            );
          })}
        </div>
        <p className="text-[12px] text-muted-foreground">
          Trusted by <span className="text-foreground font-medium">1,200+ teams</span> worldwide
        </p>
      </div>
    </div>
  );
}

// ── Login V2 ──────────────────────────────────────────────────────────────────

export function LoginV2() {
  const navigate = useNavigate();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading,  setLoading]  = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate("/team-selection-v2"), 700);
  }

  return (
    <div className="min-h-screen flex bg-background">
      <BrandPanel />

      {/* Form side */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 min-w-0">
        {/* Mobile logo */}
        <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-8">
          <RallyLogo size={24} />
          <span className="text-[16px] font-bold text-foreground">Rally</span>
        </Link>

        <div className="w-full max-w-sm">
          <div className="mb-7">
            <h1 className="text-[22px] font-bold text-foreground mb-1">Welcome back</h1>
            <p className="text-[13px] text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input value={email} onChange={e => setEmail(e.target.value)}
                  type="email" placeholder="john@example.com" required autoFocus
                  className={INPUT} />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-medium text-foreground">Password</label>
                <Link to="/forgot-password-v2" className="text-[11px] transition-colors hover:underline"
                  style={{ color: "var(--rally-brand)" }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input value={password} onChange={e => setPassword(e.target.value)}
                  type={showPw ? "text" : "password"} placeholder="••••••••" required
                  className={INPUT.replace("pr-3", "pr-9")} />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPw ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setRemember(v => !v)}
                className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors"
                style={remember ? { background: "var(--rally-brand)", borderColor: "var(--rally-brand)" } : { borderColor: "var(--border)" }}>
                {remember && <Check className="size-2.5 text-white" />}
              </button>
              <span className="text-[12px] text-muted-foreground">Remember me for 30 days</span>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full h-10 flex items-center justify-center gap-2 rounded-[8px] text-white text-[13px] font-medium transition-opacity disabled:opacity-70"
              style={{ background: "var(--rally-brand)" }}>
              {loading ? (
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <> Sign in <ArrowRight className="size-3.5" /></>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <p className="text-center text-[13px] text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup-v2" className="font-medium transition-colors hover:underline" style={{ color: "var(--rally-brand)" }}>
              Sign up free
            </Link>
          </p>

          {/* Classic link */}
          <div className="mt-8 text-center">
            <Link to="/login"
              className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              <Zap className="size-3" />
              Switch to classic view
            </Link>
          </div>
        </div>

        <p className="mt-10 text-center text-[11px] text-muted-foreground max-w-xs">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-foreground transition-colors">Terms</a>
          {" "}and{" "}
          <a href="#" className="underline hover:text-foreground transition-colors">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}