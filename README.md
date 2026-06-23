# urbAn

We developed a web app called urbAn for solo travellers visiting Antwerp. The app helps people explore the city in a more personal way, based on their interests, personality, and travel style.  
At the start, users take a short and fun quiz. Based on their answers, they receive an exploration archetype and personalised routes around the city. Each route shows a different side of Antwerp, from niche food spots, vintage shopping sprint to a mythic mysterious path.
Along the way, users can also complete small challenges, unlock local tips, and find meet-up spots where they can connect with locals and other travellers who share similar interests.

The idea behind the concept is simple:
“There is a version of Antwerp for every version of you.”

## Team members

- **Saigita Goossens**: Implementer
- **Mar Dorta Garcia**: Plant, Coordinator
- **Isabella Nunes de Freitas**: Completer-Finisher, Shaper
- **Kjell Elslander**: Teamworker, Implementer

## Technology

### Supabase

To store all our data (routes, profiles, challenges,...) we are using Supabase. It's an easy way for us to connect a working database to our project without needing to over complicate things.  
It allows us to edit the table, add entries, updata data, and delete entries straight from the table view, whilst also giving us the option to query the data with SQL queries.  

Supabase is also a scalable solution because the free tier already includes a large amount of usage, and plans can easily be upgraded. It also has a built in authentication table that can be easily linked to the existing profiles (using UUID).

### Mapbox

Since we have a map in our product, we needed a service that provided a high level of customisability while also having a strong base for us to build on. So we landed on Mapbox.  
Mapbox allows us to add routes / points on the map and serves as a live map for the user to see their own location on. On top of that it has its own style editor so it was not hard for us to make the map fit our style.

### Other

**React Router**: project structure.  
**ML5**: detect movement to simulate lenticular poster based on user position.  
**GSAP**: animations on the landing page.  

## Requirements

- Internet required
- Works on iPhone (landing page also works on mac)

## Features

- User receives an archetype that fits their travel habits after completing a quiz in the onboarding.
- User sees routes based on their archetype.
- Routes are displayed on a map. The route starts from the user's current location and goes from one stop to the other.
- Routes have unique challenges for the user to complete. Completing a challenge unlocks a tip about antwerp.
- Users have the ability to meet up with other nearby users. Requesting a meetup with a user prompts them with the option to either decline or accept.

## Installation / Usage Guide

### Step 1 - Clone the repository

Get the code on your local machine:

```bash
git clone https://github.com/KjellSchool/urbAn.git
```

This will give you the entire project. This includes the following:

- Tryouts for different technologies
- Simulation of a lenticular poster (project using ML5)
- The web app

### Step 2 - Install dependencies

No matter which of the two projects you want to use (web app / poster), run the following command while having the respective folder selected in the terminal:

```bash
npm install
```

This will install all necessary dependencies.

### Step 3 - Other necessities 

For the web app you will need two other things before it will work. 

First of all for the map to work you will need a token. You can get one of these by creating an account and copying it from the tokes page.

Then replace the token that is in the `map.tsx` component with your own token. This way you have full access to the map's capabilities.

_<span style="color: red;">You do not actually need one because the token for our project is hardcoded in the map component.</span>_

You will also need to gain access to the database. You do this by adding the **project url** and the **publishable key** to the `.env` file.  
The `.env` file should look like this:

```
VITE_SUPABASE_URL="https://oyzvqqbanissrvkjdgek.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="sb_publishable_5d6k1hOHz2u6MXY9zOs9aA_PF-_DZ_g"
```

### Step 4 - Running the project

To run the poster project, run the following commant (while having the folder selected in the terminal):

```bash
npm run dev
```

You can run the web app by using the same project, but if you want the full experience (mobile view), you should run the following commanc since it will allow you to open the local host project on your mobile device.

```bash
npm run dev -- --host
```

## Case video

[See video file](./assets/case-movie.mp4)

## Links

- **Live project**: https://www.urban-antwerp.vercel.app
- **Behance**: https://www.behance.net/gallery/251482487/urbAn
- **FigJam**: https://www.figma.com/board/fueTyQkvxErkZeyuJaGtEn/Research-urbAn?node-id=176-918&t=tMLHr65VKN6fVyrf-1
- **Figma**: https://www.figma.com/design/uTJ0ocMKxadZa8G87OVoLa/Design-urbAn?node-id=18-2&t=VkoBTD2AH7f8fRv9-1 