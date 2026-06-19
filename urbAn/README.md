# Development Todo

## Landing page

- [x] Fold
- [x] Hook (error)
- [x] Chat
- [ ] Meet urbAn (still needs the carousel)
- [x] How it works
- [x] Icons
- [x] Share your layer
- [x] Footer

- [ ] !**Desktop**!

## App

When going from the desktop landing page to the app, the user should get a warning  (like the one that currently shows when the user opens the landng page on desktop) telling then to open the app on their mobile device.

### Onboarding

- [x] User picker
- [x] New user form
- [x] Archetype quiz
- [ ] Archetype outcome (still needs social media sharing, don't focus on this)

### Home screen

#### Side Quests

- [x] Empty state
- [x] Loading all side quests for the current route
- [ ] Split up side quests based on completion status
- [x] Completing a side quest
- [x] Show local tip on side quest completion

#### Meetups

- [x] Empty state
- [x] Load nearby users in their respective list based on distance
- [ ] Load all data for a nearby user
- [x] Send meetup request
- [x] Receive meetup request
- [x] See user information when receiving a request
- [ ] User request distance is correct
- [x] Accept meetup
- [ ] sending and accepting / declining confirmations
- [ ] Meetup location is visible for both participants
- [ ] Meetup location dissapear when both participants reach the location
- [ ] Filters

#### Routes

- [x] Display all routes
- [ ] Display routes based on their archetype (do they fit the current user archetype)
- [ ] Be able to like the route (heart needs to change, no actual functionality needed)
- [ ] See route details
- [x] Start a route
- [ ] Starting a route gives the user a popup with the route title
- [ ] Cancel current route (confirmation)
- [ ] Filters

### Profile page

- [x] Load profile information
- [ ] Load profile achievements (does everything load in when the profile page loads)
- [x] Unique profile avatar for the user is displayed

### Settings page

- [ ] User information is loaded
- [x] All settings have a toggle input (checkbox with fancy CSS)
- [ ] Visibility toggle works
- [ ] Dark mode toggle works
- [ ] Log out sends user back to user picker page (confirmation)
- [ ] Delete account removes current user profile from database and sends user back to landing page (confirmation)

### Edit profile page

- [ ] User can pick a new avatar
- [x] Current user information is loaded 
- [x] User edits are updated in the database upon saving (confirmation)

## Before submission

### Code cleanup

- [ ] Remove all unnecessary `console.log` lines from the code
- [ ] Remove all commented code
- [ ] Structure all files (imports - variables - functions - return)
- [ ] Make CSS variables for commonly used values
- [ ] Place useful comments above complicated lines of code that would be hard to explain without a hint

### Other

- [ ] Study lines of code you dont know the functionality off!!
- [ ] Split up CSS file into several components (not per page, but in pieces that make sense to be together)
- [ ] Import said css snippets in the right file

### Final check

- [ ] Do all main feature work?
- [ ] Does all styling look like the design?
- [ ] Do any errors appear in the console?
- [ ] What is the lighthouse score? (improve if below 80-90)

## Extra

- [ ] Create an admin page (no functionality needed)

