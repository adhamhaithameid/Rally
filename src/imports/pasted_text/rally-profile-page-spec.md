For Rally, the **Profile page** should feel like a **personal control center**, not a social profile and not a dumping ground for settings. The foundation already places **Profile / personal settings** in the main team navigation, supports **prebuilt themes**, and assumes users may belong to **multiple teams**, so this page should help users manage **who they are, how they work, and how Rally behaves for them**. 

The page should answer 4 things quickly:

* Who am I in this workspace?
* What do I need to notice or adjust?
* How is Rally set up for me?
* How do I switch teams or manage my account fast?

## Best entry model

I would structure Profile like this:

* **Overview** = default page
* **Preferences** = theme, notifications, behavior
* **Access & Teams** = roles across teams
* **Security** = account and session controls

That works better than one long settings page.

## Best V1 layout

```text
Header: Avatar | Name | Role | Current team | Edit profile

Left rail:
- Overview
- Preferences
- Access & Teams
- Security

Main:
- Identity card
- My work snapshot
- Status / availability
- Notifications / shortcuts
- Personal preferences
- Recent activity / saved items

Right panel:
- Current team info
- My permissions
- Quick switches
- Session/account info
```

## What should be on the Profile Overview page

### 1. Identity card

This should be the first thing users see.

Show:

* avatar
* display name
* email/handle
* current role in this team
* current team name
* maybe short bio or title later

This is the anchor for the page.

### 2. My work snapshot

This is what makes the page useful, not just administrative.

Show:

* tasks due soon
* upcoming events
* unread mentions/messages
* recent files

Not a full dashboard, just a compact personal summary. Since Rally is all-in-one, the profile should still remind the user what is attached to them personally.

### 3. Status / availability

This is important if Rally includes chat and voice like Discord.

Show:

* online / away / do not disturb
* maybe a short custom status
* current presence in voice or active session later

This makes the profile feel alive and connected to team communication.

### 4. Quick preferences

These should be visible early.

Show:

* theme selection
* notification summary
* language if added later
* default landing page if you support it later

The foundation already says users choose from prebuilt themes, while teams do not get separate brand identities in V1, so this belongs in personal settings, not team settings. 

### 5. Recent activity / continue working

This is one of the most engaging sections.

Show:

* recent files
* recent AI threads
* recent chats
* recently viewed tasks

This gives the page continuity and makes it feel useful every day.

### 6. Saved / pinned items

This is a very strong quality-of-life feature.

Show:

* saved conversations
* pinned files/folders
* important tasks
* bookmarked AI threads

That makes the Profile page feel personal, not generic.

## What should be in Preferences

Keep this clean and practical.

Show:

* theme mode and theme choice
* notification preferences
* sound preferences for chat/voice
* compact vs comfortable density if added later
* AI behavior preferences that are user-level only

Do not put team-wide controls here. This page should be about the user’s own experience.

## What should be in Access & Teams

This should explain the user’s place in Rally clearly.

Show:

* all teams the user belongs to
* role in each team
* current team switcher
* simple permission summary for the current team

This fits the product model where a user can belong to multiple teams and switch between them. 

A useful summary block here would say things like:

* Can create tasks
* Can send messages
* Can join voice
* Cannot manage calendars/lists

That reduces confusion a lot.

## What should be in Security

Even in V1, this page should feel trustworthy.

Show:

* password/account actions
* active sessions/devices if supported
* sign out
* maybe connected apps/integrations later

Rally’s promise includes privacy and self-hosting, so users should feel that their account is under control. 

## What makes the Profile page engaging

For Rally, engaging should mean **personal, useful, and calming**.

The most engaging elements are:

* a good identity card
* status and availability
* continue working
* saved items
* clean preferences with immediate visual feedback
* team/role clarity

The page should make users feel:

* “This workspace knows me”
* “I can control my experience”
* “I can jump back into work fast”

## What absolutely needs to be above the fold

When the user opens Profile, they should immediately see:

* avatar + name
* current team + current role
* status / availability
* quick preferences
* recent personal work snapshot

That is the real first page.

## Role behavior

The structure should stay mostly the same, but the access summary changes by role:

* **Owner/Admin:** clearer access summary, more teams/management visibility
* **Member:** work-focused summary and preferences
* **Viewer:** read-only clarity, no AI interaction controls, no action-heavy work widgets if not useful

That matches the role model where viewers can see AI outputs but cannot interact with AI, and where capabilities differ a lot by role. 

## What not to do

Avoid these in V1:

* making Profile a copy of Dashboard
* making it a purely social page
* burying themes and notifications too deep
* mixing team settings into personal settings
* overloading it with analytics
* showing lots of disabled controls with no explanation

## My strongest recommendation

Make Rally Profile work like this:

**Overview = identity + status + my work snapshot + saved items**
**Preferences = theme + notifications + behavior**
**Access & Teams = roles, permissions, switching teams**
**Security = account control**

That gives you a Profile page that feels personal, useful, and clearly different from Dashboard or Team. It becomes the user’s **home for self, not for the whole workspace**.

I can turn all of the pages so far into one clean sitemap or a full desktop layout system next.
