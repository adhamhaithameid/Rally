import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Check, Zap, AlertCircle } from "lucide-react";
import svgPaths from "../../imports/svg-gyowvurp60";

// ── Helpers ───────────────────────────────────────────────────────────────────

function RallyLogo({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="27 26 133 127" width={size} height={size} fill="none">
      <path d={svgPaths.p6b466c0} fill="#ff4615" />
    </svg>
  );
}

const INPUT      = "w-full pl-9 pr-3 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[#ff4615] transition-colors placeholder:text-muted-foreground";
const INPUT_PR9  = "w-full pl-9 pr-9 py-2.5 rounded-[8px] border border-border bg-background text-foreground text-[13px] outline-none focus:border-[#ff4615] transition-colors placeholder:text-muted-foreground";

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

// ── Left branding panel ───────────────────────────────────────────────────────

function BrandPanel() {
  const features = [
    "Everything your team needs in one workspace",
    "AI-powered chat, tasks, and planning tools",
    "Secure and private — self-hosting ready",
    "14-day free trial, no credit card required",
    "Switch between classic and Command Center UX",
  ];

  return (
    <div className="hidden lg:flex flex-col justify-between px-12 py-12 w-[420px] flex-shrink-0 border-r border-border bg-card">
      <div>
        <Link to="/" className="inline-flex items-center gap-2.5 mb-12">
          <RallyLogo size={28} />
          <span className="text-[18px] font-bold text-foreground">Rally</span>
        </Link>

        <h2 className="text-[26px] font-bold text-foreground leading-snug mb-4">
          Your team's command<br />center awaits.
        </h2>
        <p className="text-[13px] text-muted-foreground mb-8 leading-relaxed">
          Set up your workspace in under 2 minutes. Invite your team and start building something great.
        </p>

        <ul className="space-y-3">
          {features.map(f => (
            <li key={f} className="flex items-start gap-2.5">
              <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "#fff2ed" }}>
                <Check className="size-2.5" style={{ color: "#ff4615" }} />
              </span>
              <span className="text-[12px] text-foreground">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-8 border-t border-border">
        <p className="text-[13px] text-foreground font-medium mb-1">"Rally replaced five tools for us."</p>
        <p className="text-[11px] text-muted-foreground">— Design lead at a 40-person product team</p>
      </div>
    </div>
  );
}

// ── Signup V2 ─────────────────────────────────────────────────────────────────

export function SignupV2() {
  const navigate = useNavigate();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [showCf,   setShowCf]   = useState(false);
  const [agreed,   setAgreed]   = useState(false);
  const [loading,  setLoading]  = useState(false);

  const strength  = getStrength(password);
  const pwMatch   = confirm === "" || password === confirm;
  const canSubmit = name && email && password.length >= 8 && password === confirm && agreed;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => navigate("/team-selection-v2"), 700);
  }

  return (
    <div className="min-h-screen flex bg-background">
      <BrandPanel />

      {/* Form side */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 min-w-0 overflow-y-auto">
        {/* Mobile logo */}
        <Link to="/" className="lg:hidden inline-flex items-center gap-2 mb-8">
          <RallyLogo size={24} />
          <span className="text-[16px] font-bold text-foreground">Rally</span>
        </Link>

        <div className="w-full max-w-sm">
          <div className="mb-7">
            <h1 className="text-[22px] font-bold text-foreground mb-1">Create your account</h1>
            <p className="text-[13px] text-muted-foreground">Start your free 14-day trial today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input value={name} onChange={e => setName(e.target.value)}
                  type="text" placeholder="John Doe" required autoFocus
                  className={INPUT} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input value={email} onChange={e => setEmail(e.target.value)}
                  type="email" placeholder="john@example.com" required
                  className={INPUT} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input value={password} onChange={e => setPassword(e.target.value)}
                  type={showPw ? "text" : "password"} placeholder="Min. 8 characters" required
                  className={INPUT_PR9} />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPw ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
              </div>
              <PasswordStrengthBar password={password} />
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-[11px] font-medium text-foreground mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input value={confirm} onChange={e => setConfirm(e.target.value)}
                  type={showCf ? "text" : "password"} placeholder="Repeat password" required
                  className={`${INPUT_PR9} ${!pwMatch ? "border-red-400 focus:border-red-400" : ""}`} />
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
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5">
              <button type="button" onClick={() => setAgreed(v => !v)}
                className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
                style={agreed ? { background: "#ff4615", borderColor: "#ff4615" } : { borderColor: "var(--border)" }}>
                {agreed && <Check className="size-2.5 text-white" />}
              </button>
              <span className="text-[12px] text-muted-foreground leading-relaxed">
                I agree to the{" "}
                <a href="#" className="hover:underline transition-colors" style={{ color: "#ff4615" }}>Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="hover:underline transition-colors" style={{ color: "#ff4615" }}>Privacy Policy</a>
              </span>
            </div>

            {/* Submit */}
            <button type="submit" disabled={!canSubmit || loading}
              className="w-full h-10 flex items-center justify-center gap-2 rounded-[8px] text-white text-[13px] font-medium transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "#ff4615" }}>
              {loading ? (
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <> Create account <ArrowRight className="size-3.5" /></>
              )}
            </button>
          </form>

          {/* Sign in link */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <p className="text-center text-[13px] text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login-v2" className="font-medium hover:underline transition-colors" style={{ color: "#ff4615" }}>
              Sign in
            </Link>
          </p>

          {/* Classic link */}
          <div className="mt-8 text-center">
            <Link to="/signup"
              className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              <Zap className="size-3" />
              Switch to classic view
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] text-muted-foreground">
          No credit card required · Cancel anytime
        </p>
      </div>
    </div>
  );
}
