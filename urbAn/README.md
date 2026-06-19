# Development Todo

## Landing page

- [ ] Fold
- [ ] Hook (error)
- [ ] Chat
- [ ] Meet urbAn
- [ ] How it works
- [ ] Icons
- [ ] Share your layer
- [ ] Footer

- [ ] !**Desktop**!

## App

When going from the desktop landing page to the app, the user should get a warning  (like the one that currently shows when the user opens the landng page on desktop) telling then to open the app on their mobile device.

### Onboarding

- [ ] User picker
- [ ] New user form
- [ ] Archetype quiz
- [ ] Archetype outcome

### Home screen

#### Side Quests

- [ ] Empty state
- [ ] Loading all side quests for the current route
- [ ] Split up side quests based on completion status
- [ ] Completing a side quest
- [ ] Show local tip on side quest completion

#### Meetups

- [ ] Empty state
- [ ] Load nearby users in their respective list based on distance
- [ ] Send meetup request
- [ ] Receive meetup request
- [ ] See user information when receiving a request
- [ ] Accept meetup
- [ ] Meetup location is visible for both participants
- [ ] Meetup location dissapear when both participants reach the location
- [ ] Filters

#### Routes

- [ ] Display all routes
- [ ] Display routes based on their archetype (do they fit the current user archetype)
- [ ] Be able to like the route (heart needs to change, no actual functionality needed)
- [ ] See route details
- [ ] Start a route
- [ ] Starting a route gives the user a popup with the route title
- [ ] Cancel current route (confirmation)
- [ ] Filters

### Profile page

- [ ] Load profile information
- [ ] Load profile achievements (does everything load in when the profile page loads)
- [ ] Unique profile avatar for the user is displayed

### Settings page

- [ ] User information is loaded
- [ ] All settings have a toggle input (checkbox with fancy CSS)
- [ ] Visibility toggle works
- [ ] Dark mode toggle works
- [ ] Log out sends user back to user picker page (confirmation)
- [ ] Delete account removes current user profile from database and sends user back to landing page (confirmation)

### Edit profile page

- [ ] User can pick a new avatar
- [ ] Current user information is loaded 
- [ ] User edits are updated in the database upon saving (confirmation)

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

