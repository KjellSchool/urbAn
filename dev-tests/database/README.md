Project URL: https://ttbxdsfaocdhixlekbbg.supabase.co
Publishable key: sb_publishable_FpfOVBjvqI5ag8SAvPba_w_JVLS0wBi

1. Create Supabase project
Supabase Dashboard
→ New Project
→ Create project

2. Create database table
Table Editor
→ New Table

Table name:
profiles

Columns:
Name	Type
id	int8 / auto
name	text
email	text
date_of_birth	date
bio	text
created_at	timestamptz (default now())

Add demo rows:
Table Editor
→ profiles
→ Insert row
3. Get Supabase keys
Project Settings
→ API Keys

Copy:
Project URL
Publishable Key

Do NOT use:
Secret Key ❌

4. Allow frontend to read database (IMPORTANT)

Because RLS blocks access by default:
Table Editor
→ profiles
→ Add RLS Policy

Choose:
SELECT

SQL expression:
true

Final policy:
create policy "Allow public reads"
on "public"."profiles"
as permissive
for select
to public
using (
  true
);

5. Allow frontend edits

To let the profile form save changes back to Supabase, add an update policy too:

Choose:
UPDATE

SQL expression:
true

Final policy:
create policy "Allow public updates"
on "public"."profiles"
as permissive
for update
to public
using (
  true
)
with check (
  true
);

6. Allow frontend create and delete

To let the Add and Delete buttons work, add insert and delete policies too:

INSERT policy:
create policy "Allow public inserts"
on "public"."profiles"
as permissive
for insert
to public
with check (
  true
);

DELETE policy:
create policy "Allow public deletes"
on "public"."profiles"
as permissive
for delete
to public
using (
  true
);

VS Code / React setup

7. Install packages

Open terminal:
npm install
npm install vite react react-dom @vitejs/plugin-react
npm install @supabase/supabase-js

Run project:
npm run dev

8. Folder structure
database/
├── node_modules/
├── src/
│   ├── components/
│   │    └── Profiles.jsx
│   ├── lib/
│   │    └── supabase.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json

9. Create Supabase connection

Create:
src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "YOUR_URL";
const supabaseKey = "YOUR_PUBLISHABLE_KEY";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);