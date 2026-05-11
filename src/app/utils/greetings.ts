/**
 * Rally greeting utility.
 * Returns a contextually appropriate greeting string, optionally personalised
 * with the user's first name. Context is inferred from time of day and day of
 * week at the moment of the call, so each page load / session can feel fresh.
 */

type TimeHint = "morning" | "afternoon" | "evening" | "night";

interface GreetingEntry {
  /** Raw text — use {name} as the placeholder for the user's first name. */
  text: string;
  /** If true the template can only be used when a name is available. */
  requiresName?: boolean;
  /** Only surface this greeting during these times of day. */
  timeHints?: TimeHint[];
  /** Only surface this greeting on these day-of-week indices (0=Sun … 6=Sat). */
  dayHints?: number[];
}

const GREETINGS: GreetingEntry[] = [
  // ── Name-required ──────────────────────────────────────────────────────────
  { text: "{name} returns!",                   requiresName: true },
  { text: "Back at it, {name}",                requiresName: true },
  { text: "Evening, {name}",                   requiresName: true, timeHints: ["evening", "night"] },
  { text: "Good afternoon, {name}",            requiresName: true, timeHints: ["afternoon"] },
  { text: "Good evening, {name}",              requiresName: true, timeHints: ["evening"] },
  { text: "Good morning, {name}",              requiresName: true, timeHints: ["morning"] },
  { text: "Happy Friday, {name}",              requiresName: true, dayHints: [5] },
  { text: "Happy Monday, {name}",              requiresName: true, dayHints: [1] },
  { text: "Happy Saturday, {name}!",           requiresName: true, dayHints: [6] },
  { text: "Happy Sunday, {name}",              requiresName: true, dayHints: [0] },
  { text: "Happy Thursday, {name}",            requiresName: true, dayHints: [4] },
  { text: "Happy Tuesday, {name}",             requiresName: true, dayHints: [2] },
  { text: "Happy Wednesday, {name}",           requiresName: true, dayHints: [3] },
  { text: "Hey there, {name}",                 requiresName: true },
  { text: "Hi {name}, how are you?",           requiresName: true },
  { text: "How was your day, {name}?",         requiresName: true, timeHints: ["evening", "night"] },
  { text: "How's it going, {name}?",           requiresName: true },
  { text: "Sunday session, {name}?",           requiresName: true, dayHints: [0] },
  { text: "That Friday feeling, {name}",       requiresName: true, dayHints: [5] },
  { text: "Welcome to the weekend, {name}",    requiresName: true, dayHints: [5, 6] },
  { text: "Welcome, {name}",                   requiresName: true },
  { text: "What's new, {name}?",               requiresName: true },
  { text: "What's on your mind, {name}?",      requiresName: true },

  // ── No name required ───────────────────────────────────────────────────────
  { text: "Back at it!" },
  { text: "Coffee and Claude time?",            timeHints: ["morning"] },
  { text: "Evening",                            timeHints: ["evening", "night"] },
  { text: "Good afternoon",                     timeHints: ["afternoon"] },
  { text: "Good evening",                       timeHints: ["evening"] },
  { text: "Good morning",                       timeHints: ["morning"] },
  { text: "Greetings, whoever you are" },
  { text: "Happy Friday",                       dayHints: [5] },
  { text: "Happy Monday",                       dayHints: [1] },
  { text: "Happy Saturday!",                    dayHints: [6] },
  { text: "Happy Sunday",                       dayHints: [0] },
  { text: "Happy Thursday",                     dayHints: [4] },
  { text: "Happy Tuesday",                      dayHints: [2] },
  { text: "Happy Wednesday",                    dayHints: [3] },
  { text: "Hello, night owl",                   timeHints: ["night"] },
  { text: "Hey there" },
  { text: "Hi, how are you?" },
  { text: "How was your day?",                  timeHints: ["evening", "night"] },
  { text: "How's it going?" },
  { text: "Let's chat incognito" },
  { text: "Sunday session?",                    dayHints: [0] },
  { text: "That Friday feeling",                dayHints: [5] },
  { text: "Welcome" },
  { text: "Welcome to the weekend",             dayHints: [5, 6] },
  { text: "What's new?" },
  { text: "What's on your mind tonight?",       timeHints: ["evening", "night"] },
  { text: "What's on your mind?" },
  { text: "You're incognito" },
];

function getTimeHint(hour: number): TimeHint {
  if (hour >= 5  && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Returns a greeting string appropriate for the current time and day.
 *
 * @param name  The user's first name. If supplied, name-based templates are
 *              included in the candidate pool.
 * @param seed  Optional integer seed (0–100) used in tests to force a specific
 *              pool. In production leave this undefined.
 */
export function getGreeting(name?: string, seed?: number): string {
  const now       = new Date();
  const hour      = now.getHours();
  const day       = now.getDay();
  const timeHint  = getTimeHint(hour);

  // Filter: exclude name-required templates when no name is available
  const candidates = GREETINGS.filter(g => !(g.requiresName && !name));

  // 70 % of the time prefer context-specific messages (time / day of week)
  const specific = candidates.filter(
    g => g.timeHints?.includes(timeHint) || g.dayHints?.includes(day)
  );
  const general  = candidates.filter(g => !g.timeHints && !g.dayHints);

  const useSpecific = specific.length > 0 && (seed !== undefined ? seed < 70 : Math.random() < 0.7);
  const entry = pick(useSpecific ? specific : general);

  return entry.text.replace("{name}", name?.split(" ")[0] ?? "").trim();
}
