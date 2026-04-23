For Rally, the AI page should feel like **ChatGPT in interaction, but like a workspace operator in value**. It should not just be a blank chatbot. Your foundation pack already points the AI toward answering questions, summarizing chats, reading files, suggesting tasks and calendar actions, searching the web, and performing platform actions only after confirmation, so the page should be built around **conversation + trusted context + safe action previews**. 

The AI page should answer 4 things immediately:

* What can I ask?
* What context can the AI access right now?
* What should I ask first?
* What actions can it help me take?

## Best entry model

I would not make the AI tab always open an old conversation by default.

Use this model:

* Clicking **AI** in the main nav opens **AI Home**
* Clicking **Ask AI** from a file, task, chat, or event opens a **new contextual AI thread**
* Keep **recent conversations** in the left sidebar so people can jump back into older threads fast

That keeps the page clear and predictable.

## Best V1 layout

```text
Header: New chat | History search | Source scope | Shared / Saved

Left sidebar:
- New chat
- Recent conversations
- Pinned conversations
- Shared AI threads

Main panel:
- Greeting + subtle AI mascot state
- Main input box
- Source/context chips
- Starter prompts
- Today / Catch-up strip
- Quick action cards
- Recent related items

Right panel:
- Current context
- Permissions / source access
- Attached files/tasks/events
- Pending actions to confirm
```

## What should be on the AI Home page

### 1. A large, obvious input box

This is the most important element.

It should feel simple like ChatGPT, but with Rally-specific context controls. Under or above the input, show source chips like:

* This team
* Files
* Tasks
* Calendar
* Chat
* Web

Only show what is actually available. If chat access is disabled by admins, the chat source should be hidden or marked unavailable, not fake-enabled. 

### 2. Starter prompt cards

Do not make users think too hard about the first prompt.

The best prompt groups for Rally are:

**Catch up**

* What changed since yesterday?
* Summarize unread chats
* What needs my attention today?

**Find**

* Find the latest file about the launch
* Show tasks related to onboarding
* What meeting notes mention this topic?

**Create**

* Draft a team update
* Turn this discussion into tasks
* Create an agenda for today’s meeting

**Act**

* Suggest what I should do next
* Prepare follow-ups from my last meeting
* Organize this work into a plan

This is what makes the AI page feel immediately useful.

### 3. A small “Today with AI” strip

Not a full dashboard. Just one lightweight summary row.

Show things like:

* 2 tasks due today
* 1 meeting soon
* 3 unread mentions
* 1 file updated recently

Each item should be clickable into a prompt, like:

* “Summarize these”
* “Prepare me”
* “Find related work”

This keeps the page alive without turning it into another dashboard.

### 4. Quick action cards

These should be action-first, not just prompt-first.

Examples:

* Summarize recent chat activity
* Find a file fast
* Draft a status update
* Turn notes into tasks
* Prepare for next meeting
* Search web + team knowledge together

These are especially important for members who want speed and low friction.

### 5. Recent conversations

This is critical if you want the AI page to feel like a real working tool.

Show:

* recent AI threads
* title
* last updated time
* scope badges like Files / Tasks / Chat / Web
* maybe who shared it, if shared

This gives continuity and makes AI feel like part of ongoing work, not a one-off prompt box.

### 6. Current context / attached items

Because Rally is integrated, users should be able to see what the AI is working with.

Show a small section for:

* attached file
* selected task
* related event
* linked chat/channel
* current team/project

That creates trust. Users should never wonder, “Why did the AI answer like that?”

## What the actual conversation screen should show

Once the user starts chatting, the page should become a focused working surface.

### Conversation header

Show:

* thread title
* current scope
* source badges
* share thread
* clear context
* maybe a “new from here” action

### Message area

Keep it very ChatGPT-like:

* user message
* AI response
* clean spacing
* code/file/task cards where needed
* citation or source linking when AI references Rally data

But Rally AI should not respond with text only. It should also return **structured result cards**, like:

* file matches
* task suggestions
* event suggestions
* chat summary cards
* action previews

That is where it becomes more useful than a normal chatbot.

### Composer

The composer should support:

* text input
* attach file
* attach task
* attach event
* attach channel/chat
* mention source scope
* maybe voice later, but not needed in V1

### Action confirmation area

This matters a lot.

If the AI wants to do something like create tasks, suggest calendar actions, or perform a platform action, show it as a preview card with a clear **Confirm** step. That matches your product rule that AI should propose actions before execution. 

### Follow-up suggestions

After each useful answer, show 2–4 next-step chips such as:

* Turn this into tasks
* Draft a reply
* Find supporting files
* Add to calendar
* Summarize shorter
* Search the web too

These make the AI feel active and engaging.

## What makes the AI page engaging

For Rally, engaging should mean **helpful, personalized, and alive**, not flashy.

The most engaging elements are:

* a personalized first prompt area
* workspace-aware starter actions
* structured answers, not just paragraphs
* visible source/context chips
* recent conversations
* subtle mascot states like ready, thinking, and done

Your foundation pack already suggests the mascot/helper should appear in AI states and micro-interactions, so I would use it lightly in the AI home and response states, not as a giant cartoon centerpiece. 

## What absolutely needs to be above the fold

When the user opens AI, they should immediately see:

* the input box
* the current source/context chips
* 4–6 starter prompts
* one small catch-up summary strip
* recent conversations or recent context

That is the real first page.

## Role and permission behavior

This part is important for trust:

* **Owners / admins / members** get the full interactive AI page
* **Viewers** should be able to see permitted AI outputs, but the input should be disabled or replaced with a read-only explanation
* **Chat-based AI help** should only appear when admin chat access is enabled
* **Actions** should always require confirmation before the AI changes anything

That lines up with the permission model in your foundation pack. 

## What not to do

Avoid these in V1:

* a completely blank chatbot screen
* a giant settings-heavy AI page
* too many tabs like “search / write / tasks / files / meetings / web” all separated
* long generic AI marketing copy
* hidden context that the user cannot inspect
* automatic actions without preview
* pretending the AI can see chats or files it does not actually have access to

## My strongest recommendation

Make Rally AI a **ChatGPT-style chat surface with visible workspace context**.

So the core formula becomes:

**simple chat UI + source chips + starter prompts + recent threads + structured action cards**

That will make the AI page feel familiar, powerful, and clearly different from a normal chatbot because it is tied directly to the team’s real work.

The next useful step is turning this into an exact desktop wireframe with the empty state, active thread state, and viewer read-only state.
