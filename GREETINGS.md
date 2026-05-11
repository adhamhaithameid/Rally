# Rally Greeting System

Used in **Dashboard V2** (`/app/home`) and **AI Chat V2** (`/app/ai-chat`) to display
a contextual, human-feeling greeting at the top of each page.

---

## How it works

The utility lives in `src/app/utils/greetings.ts` and exports a single function:

```ts
getGreeting(name?: string): string
```

| Argument | Type | Description |
|---|---|---|
| `name` | `string \| undefined` | User's full name. The function extracts the first word automatically. |

**Returns** a greeting string for the current moment, with `{name}` already resolved.

### Context signals

| Signal | Weight |
|---|---|
| Time of day | **70 %** chance of picking a time-appropriate message when one exists |
| Day of week | Included in the same 70 % pool |
| Fallback | General (timeless) messages used the remaining 30 % of the time |

Time buckets:
- **Morning** — 05:00–11:59
- **Afternoon** — 12:00–16:59
- **Evening** — 17:00–20:59
- **Night** — 21:00–04:59

### Name handling

- Templates marked `requiresName: true` are **only** included when a name is provided.
- If no name is given, the pool is automatically narrowed to anonymous-safe messages.

---

## Full template catalogue

`{name}` is replaced with the user's first name. Templates without `{name}` are used as-is.

| Template | Time hint | Day hint |
|---|---|---|
| `{name} returns!` | — | — |
| `Back at it, {name}` | — | — |
| `Back at it!` | — | — |
| `Coffee and Claude time?` | morning | — |
| `Evening` | evening / night | — |
| `Evening, {name}` | evening / night | — |
| `Good afternoon` | afternoon | — |
| `Good afternoon, {name}` | afternoon | — |
| `Good evening` | evening | — |
| `Good evening, {name}` | evening | — |
| `Good morning` | morning | — |
| `Good morning, {name}` | morning | — |
| `Greetings, whoever you are` | — | — |
| `Happy Friday` | — | Friday |
| `Happy Friday, {name}` | — | Friday |
| `Happy Monday` | — | Monday |
| `Happy Monday, {name}` | — | Monday |
| `Happy Saturday!` | — | Saturday |
| `Happy Saturday, {name}!` | — | Saturday |
| `Happy Sunday` | — | Sunday |
| `Happy Sunday, {name}` | — | Sunday |
| `Happy Thursday` | — | Thursday |
| `Happy Thursday, {name}` | — | Thursday |
| `Happy Tuesday` | — | Tuesday |
| `Happy Tuesday, {name}` | — | Tuesday |
| `Happy Wednesday` | — | Wednesday |
| `Happy Wednesday, {name}` | — | Wednesday |
| `Hello, night owl` | night | — |
| `Hey there` | — | — |
| `Hey there, {name}` | — | — |
| `Hi {name}, how are you?` | — | — |
| `Hi, how are you?` | — | — |
| `How was your day, {name}?` | evening / night | — |
| `How was your day?` | evening / night | — |
| `How's it going, {name}?` | — | — |
| `How's it going?` | — | — |
| `Sunday session, {name}?` | — | Sunday |
| `Sunday session?` | — | Sunday |
| `That Friday feeling` | — | Friday |
| `That Friday feeling, {name}` | — | Friday |
| `Welcome` | — | — |
| `Welcome to the weekend` | — | Fri / Sat |
| `Welcome to the weekend, {name}` | — | Fri / Sat |
| `Welcome, {name}` | — | — |
| `What's new, {name}?` | — | — |
| `What's new?` | — | — |
| `What's on your mind tonight?` | evening / night | — |
| `What's on your mind, {name}?` | — | — |
| `What's on your mind?` | — | — |


---

## Adding a new greeting

1. Open `src/app/utils/greetings.ts`.
2. Append an entry to the `GREETINGS` array:

```ts
{ text: "My new greeting, {name}", requiresName: true, timeHints: ["morning"] },
```

3. No other changes needed — the utility picks from the array automatically.
