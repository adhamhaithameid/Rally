For Rally, the **to-do / Tasks page** should feel like a **workbench**, not a report and not a giant kanban wall. The dashboard already gives awareness, so the Tasks page should make it instantly clear **what to do now, what is at risk, and how to update work fast**. That fits your current foundation well: Tasks are a core product area, V1 already expects a board/list model plus task details, tasks include title, description, mentions, due date, priority, labels/categories, and status, members can edit tasks in V1, and viewers are read-only. 

The page should answer 4 things in a few seconds:

* What should I work on first?
* What is overdue or blocked?
* What changed since I last checked?
* How do I create or update a task quickly?

## Best entry model

I would not make everyone land on a full board by default.

Use this:

* **Default view:** **My Work**
* **Secondary view:** **Team Board**
* **Third view:** **All Tasks**

That gives members a fast personal task surface, while owners/admins can still move into team-wide management easily.

A very strong V1 pattern would be:

* **My Work** = list grouped by time
  `Overdue / Today / Upcoming / Later`
* **Team Board** = board grouped by status
  `To Do / In Progress / Blocked / Done`
* **All Tasks** = full searchable/filterable list

## Best V1 layout

```text
Header: Search | Filters | Sort | View switcher | New Task | Ask AI

Subnav:
My Work | Team Board | All Tasks | Completed

Main:
- Focus strip
- Quick add
- Main task list / board
- Selected task detail panel
```

## What should be on the first page

### 1. Focus strip

This should be the first thing users see.

Show small summary cards like:

* Overdue
* Due today
* Blocked
* Done today

This is engaging because it creates immediate clarity and momentum without turning the page into analytics.

### 2. Quick Add

This needs to be very visible.

Users should be able to create a task from the top of the page without leaving the screen. Make it fast enough for something like:

* “Review proposal tomorrow”
* “Prepare sprint notes for Friday”
* “Fix upload issue high priority”

If Rally wants to feel fast, task creation cannot be buried.

### 3. Main task list

For the default **My Work** page, the most useful first layout is:

* **Overdue**
* **Today**
* **Upcoming**
* **Later / No date**

This is better than a full board as the first screen because it helps people decide what to do next immediately.

Each task row/card should show only the most useful information:

* status
* title
* due date
* priority
* labels/categories
* mentions / people involved
* tiny context indicators like linked file, chat, or event

Because Rally is all-in-one, those context indicators are important. A task should not feel isolated from the rest of the workspace.

### 4. Selected task detail panel

When a task is clicked, open a right-side detail panel instead of forcing a full page transition every time.

This panel should show:

* title
* description
* status
* due date
* priority
* labels
* mentions
* related chat/thread
* related files
* related event
* activity history

This is one of the places where Rally can feel much better than a basic to-do app. A task is not just text. It lives inside the team’s actual work context.

### 5. Recently changed / needs attention

This should be a smaller section, not the main page.

Show things like:

* task updated by teammate
* due date changed
* task moved to blocked
* task created from chat or AI
* comment or mention on a task

This matters even more because members can edit all tasks in V1. If many people can update tasks, users need lightweight visibility into what changed. 

### 6. AI assist

AI should help, but it should not dominate the Tasks page.

Good AI actions here would be:

* break this task into steps
* suggest priority
* summarize related chat
* create tasks from meeting notes
* plan my day from open tasks

And if AI creates or changes tasks, keep the same Rally rule: **preview first, confirm before action**. 

## What makes the Tasks page engaging

For Rally, engaging should mean **momentum**, not gamification.

The most engaging things on this page are:

* a clear “what needs attention” strip
* fast inline task creation
* satisfying completion/update interactions
* live teammate updates
* linked context from files, chat, and calendar
* a small “done today” signal

A good Tasks page should make users feel progress, not just show them a database.

## What should each task card show

A Rally task card should feel compact but informative.

At minimum, show:

* status marker
* title
* due date
* priority
* labels
* mentions
* small context chips such as:

  * file linked
  * chat linked
  * event linked
  * AI-generated / AI-assisted

That last part is what makes Rally unique. The tasks system should feel connected to the rest of the workspace.

## What absolutely needs to be above the fold

When the user opens Tasks, they should immediately see:

* search / filters
* New Task or Quick Add
* overdue / today counts
* the first chunk of their task list
* one selected task detail or one clear action state

That is the real first page.

## Role behavior

Keep the main structure consistent for everyone, then adjust the actions:

* **Owners/Admins:** extra filtering, more team-wide views, easier access to Team Board
* **Members:** full create/edit flow, default to My Work
* **Viewers:** same structure, but read-only with disabled create/edit actions and a clear read-only explanation

That matches the permission model you already set for tasks and viewers. 

## Empty and good states

You need both.

If the workspace is new:

* show a simple starter state
* create first task
* import or create from AI
* create tasks from meeting notes or chat

If the user has nothing urgent:

* show a calm “You’re clear for today” state
* then show upcoming tasks and a create button

That feels much better than an empty blank list.

## What not to do

Avoid these in V1:

* opening on a giant full board by default
* too many charts or productivity analytics
* hiding task creation behind multiple clicks
* making task cards too dense
* separating tasks from their chat/file/calendar context
* turning the page into a second dashboard

## My strongest recommendation

Make Rally Tasks work like this:

**Default = My Work list**
**Secondary = Team Board**
**Selected task = right-side detail panel**
**Always-visible quick add + filters + AI assist**

That gives you a first Tasks page that feels calm, fast, and clearly part of a real all-in-one workspace, not just a copied kanban tool.

The next useful step is turning this into an exact wireframe with desktop sections, task row contents, and the selected-task panel layout.
