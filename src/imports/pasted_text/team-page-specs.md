For Rally, the **Team page** should feel like the **identity and people hub** of the workspace, not another dashboard and not just a settings form. Since Rally’s model is currently **one team = one project**, and the foundation already separates **team selection/create/join** from deeper **team settings** and **member management**, the Team page should help users understand **who is in this workspace, what this team is, and who can do what**. 

The page should answer 4 things quickly:

* What team am I in?
* Who is here?
* What is my role and what can I do?
* How do I invite, manage, or switch teams?

## Best entry model

I would structure it like this:

* **Team Home** = default page
* **Members** = people-focused view
* **Settings** = structure and identity
* **Permissions** = simplified V1 overview

That fits the current foundation better than making “Team” a single long settings page, because Rally already distinguishes between the entry/team flow and later management screens. 

## Best V1 layout

```text
Header: Team name | Project name | Invite | Switch team | Search people

Left rail:
- Team Home
- Members
- Settings
- Permissions
- Danger zone (owner only)

Main:
- Team identity card
- Members / active people
- Role and access summary
- Pending invites / requests
- Team quick actions
- Recent team changes

Right panel:
- Selected member details
- Role info
- Permission summary
- Team metadata
```

## What should be on the Team Home page

### 1. Team identity card

This should be the first thing users see.

Show:

* team name
* project name
* team logo/icon
* short description
* maybe created by / owner
* privacy or self-hosted status badge if you surface that later

This matters because the foundation says team setup requires **team name** and **project name**, with description and logo/icon optional. 

### 2. Members overview

This should be the most important section on the page.

Show:

* member count
* owners/admins/members/viewers count
* a small grid/list of people
* online / active now indicators
* quick filters by role

Rally is team-first, so the Team page should feel human immediately, not like a configuration screen. The product is meant to gather work, people, and action into one place, so the people layer should be central here. 

### 3. My role and access

This is especially important for clarity.

Show:

* current user role
* what they can do in this team
* what they cannot do
* a short explanation when something is restricted

That aligns with the role-based model in the foundation, where Owner, Admin, Member, and Viewer have very different expectations and permissions. 

### 4. Pending invites / join state

This should be visible for owners and admins.

Show:

* pending invites
* invite link status
* recently joined people
* maybe invite expiration or resend action later

Invite links are already part of the entry flow and permission model, so this belongs here naturally. 

### 5. Team quick actions

This should act like a control strip, especially for owners/admins.

Good actions:

* Invite member
* Change role
* Open member management
* Edit team details
* Open permissions
* Create/join another team

For members and viewers, this strip should be smaller:

* View members
* Copy invite link if allowed
* Switch team
* View my access

### 6. Recent team changes

This is what makes the page feel alive instead of static.

Show:

* new member joined
* role changed
* invite sent
* viewer access changed
* team logo/description updated

Because owners/admins care about control and observability, this is one of the most valuable sections for the management side of Rally. 

## What should be in the Members view

This should be a proper people-management screen.

Each row/card should show:

* avatar
* name
* role
* status
* joined recently or not
* access summary
* actions menu if permitted

When a member is selected, the side panel should show:

* full role
* what they can access
* recent activity summary
* invite status
* actions like promote, demote, remove, or restrict if permitted

This matches the foundation’s explicit inclusion of **member management** as a management screen. 

## What should be in Settings

Keep this practical and short in V1.

Show:

* team name
* project name
* description
* logo/icon
* maybe team theme later, but not custom branding yet

One important thing: the foundation says **teams do not get separate brand identities in V1**, so Settings should not become a giant branding page. Keep it operational. 

## What should be in Permissions

This page should be very clear, not advanced.

A good V1 permissions overview should show:

* role matrix
* what each role can do
* which pages/sections viewers can access
* who controls access

That maps directly to the current permission model, where owner/admin can manage members, manage calendars/lists, manage chat groups/channels, and control viewer access by page/section, while viewers remain read-only in most interaction areas. 

## What makes the Team page engaging

For Rally, engaging should mean **clear, alive, and reassuring**.

The best engaging elements here are:

* member presence
* recent joins and invite states
* active role summaries
* calm team identity
* quick management actions
* subtle live indicators

This page should make users feel:

* “I know who is in this workspace”
* “I know what kind of workspace this is”
* “I know what I’m allowed to do”

That fits Rally’s broader goal of making users feel calm, in control, and ready to work. 

## What absolutely needs to be above the fold

When the user opens Team, they should immediately see:

* team name + project name
* invite or switch-team action
* member overview
* my role/access
* one management or people-focused action

That is the real first page.

## Role-based behavior

This page should adapt a lot by role.

**Owner**

* full team identity controls
* member management
* admin management
* delete team access
* viewer-access controls

**Admin**

* member management
* access controls where allowed
* calendar/chat/team organization controls
* no owner-only destructive actions

**Member**

* see members
* understand access
* maybe copy invite link only if allowed
* no role or team-structure management

**Viewer**

* read-only people and team info
* clear explanation of limited access
* no edit/invite/management actions

That follows the current role matrix closely. 

## What not to do

Avoid these in V1:

* turning Team into another dashboard
* hiding members behind settings
* mixing deep permissions logic into every row
* making it a brand customization page
* adding too many analytics or charts
* forcing viewers to see broken disabled UI everywhere

## My strongest recommendation

Make Team work like this:

**Team Home = identity + members + role clarity + invites + recent team changes**
**Members = detailed people management**
**Settings = team metadata**
**Permissions = simple role overview**

That gives Rally a Team page that feels important, trustworthy, and clearly different from Dashboard: Dashboard is about work, while Team is about **workspace identity, people, and access**.

Next, I can turn this into an exact desktop wireframe with Team Home, Members, Settings, and Permissions.
