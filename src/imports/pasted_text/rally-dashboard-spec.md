For Rally, the dashboard should be a **command center**, not a homepage, not a feed, and not a wall of widgets. The first page should make the user feel: “I know what matters, I know where the team is active, and I can act immediately.” That matches the foundation pack’s direction of **awareness + action**, with AI suggestions, quick actions, recent chats, due tasks, and upcoming events as the core. 

The first screen should answer 4 things in a few seconds:

* What needs my attention now?
* What happens next today?
* Where is my team active right now?
* How can Rally or AI help me move faster?

## The best V1 dashboard structure

I would build it like this:

```text
Header: Team switcher | Global search / command bar | New | Notifications | Profile

Row 1: AI Daily Brief (hero)        | Quick Actions
Row 2: My Work Now                  | Next Up
Row 3: Mentions / Recent Chats      | Continue Working
Row 4: Team Pulse                   | Role-based panel
```

## What should be in each section

**1. AI Daily Brief**
This should be the main engaging block. Not a big chatbot window — a smart summary card.

It should say things like:

* 2 tasks are due today
* 1 meeting starts in 40 minutes
* 3 unread mentions need attention
* the launch brief was updated recently
* here are 2 suggested actions

Example actions:

* Summarize what changed since yesterday
* Turn today’s meeting into tasks
* Find the latest file related to X
* Draft my plan for today

This is where Rally feels different from a normal workspace. The AI is not a separate feature; it is helping the user understand the workspace. AI actions should still require confirmation before they execute. Also, if admins disable AI access to chats, this card should simply avoid chat-based suggestions instead of acting like that data exists. 

**2. Quick Actions**
This should be a compact card with the 4–6 most common actions, such as:

* Create task
* Upload file
* Create event
* Open AI
* Start or join voice
* Start chat / DM

This is one of the most important parts of the dashboard because it turns the first page into a launchpad.

**3. My Work Now**
This should be the biggest practical block after the AI brief.

Show:

* overdue tasks
* due today
* in progress
* blocked items

Let users do very light actions here:

* mark done
* snooze / reschedule
* open task

Do not turn this into the full tasks page. The goal is triage, not full management.

**4. Next Up**
This is the time-based card.

Show:

* next meeting
* events today
* join now button when relevant
* maybe a “prepare with AI” action for meetings

This card matters because calendar is one of Rally’s core systems and time-based work is naturally high priority.

**5. Mentions / Recent Chats**
Do not show a giant chat feed. Show only the most relevant items:

* unread mentions
* direct messages
* important channel activity
* maybe pinned team announcement if one exists

This should answer: “Where do I need to reply?” not “What happened everywhere?”

**6. Continue Working**
This is the part many dashboards miss, but it will make Rally feel very useful.

Show:

* recently opened files
* files updated by teammates that relate to the user
* recently viewed tasks
* last active channel

This creates continuity. It helps the user pick work back up instantly.

**7. Team Pulse**
This is the team-awareness block.

Show:

* active voice channels
* who is online / in a room
* a small live status like “3 people in Design Voice”
* maybe one important team-wide update

Because Rally has Discord-like voice, this section can be genuinely engaging. A “Join now” card for live rooms is much more useful than generic activity stats.

**8. Role-based panel**
Keep the main dashboard shell the same for everyone, then swap one smaller panel based on role.

For **owners**, show team health: pending invites, permission-related notices, storage usage, maybe service/space alerts if you surface self-hosted health later.
For **admins**, show things like channel/calendar setup needs, restricted access issues, or team structure items.
For **members**, show blockers, assigned-to-you items, or waiting-on-you work.
For **viewers**, show a read-only summary of followed items, upcoming events, and recent important updates.

That lets the product stay consistent without pretending all roles need the same emphasis. Your pack already makes it clear that owners and admins care more about control and observability, while members care more about speed and low-friction work. 

## What makes a dashboard engaging for Rally

Engaging should not mean flashy. For Rally, engaging means:

* **personalized**: it feels like the page knows what matters to this user
* **live**: active voice rooms, updated files, real unread mentions
* **actionable**: every major block has one obvious next move
* **continuous**: “continue where you left off” is always visible

The most engaging things on this page will probably be:

* the AI daily brief
* live voice / team activity
* continue working
* join-now meeting states
* one-click quick actions

Use subtle motion only where it adds warmth: AI brief, voice activity, upload/progress feedback.

## What absolutely should be above the fold

On first load, before scrolling, I would make sure users can see:

* the command/search bar
* AI daily brief
* quick actions
* my work now
* next up

That is the real “first page”.

## New team / empty dashboard

A new team should **not** land on an empty dashboard.

For a fresh workspace, replace the normal dashboard with a setup-first version:

* invite teammates
* create first channel
* create first task
* create first event
* upload first files
* ask AI to help set up the workspace

A short setup checklist is much better than empty cards. This also fits the onboarding direction in the foundation pack. 

## What not to put on the dashboard

Avoid these, especially in V1:

* a full calendar month view
* a full task board
* a full file browser
* a long all-team activity feed
* lots of charts and analytics for everyone
* too many equal-sized cards
* a big marketing-style welcome banner after day one

The dashboard should **point into** the product, not try to become every page at once.

## My simplest recommendation

If you want the cleanest version of Rally’s dashboard, make it this:

**AI brief + quick actions + my tasks + next events + mentions + continue working + live team pulse**

That gives you a first page that feels useful, intelligent, and immediately active without becoming noisy.

Next step could be turning this into a real dashboard wireframe with exact card sizes and desktop layout.
