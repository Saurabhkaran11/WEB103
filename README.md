# WEB103 Prework - Creatorverse

Submitted by: **Saurabh Agrawal**

About this web app: **Creatorverse is a React directory for discovering, adding, viewing, editing, and deleting favorite content creators. It supports Supabase CRUD when credentials are configured and includes local fallback data for quick previewing.**

Time spent: **3** hours

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [x] Picocss is used to style HTML elements
- [x] The content creator items are displayed in a creative format, like cards instead of a list
- [x] An image of each content creator is shown on their content creator card

The following **additional** features are implemented:

- [x] Local fallback storage keeps the app usable before Supabase credentials are added.
- [x] A reusable creator form powers both add and edit workflows.

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img width="1425" height="631" alt="Creatorverse" src="https://github.com/user-attachments/assets/416fd829-c070-4570-91e8-0b70b0b7ed1b" />

https://github.com/user-attachments/assets/a680b769-0960-4a26-86b0-840acc3426d2

## Setup

1. Install dependencies with `npm install`.
2. Create a Supabase project and run the SQL in `database.sql`.
3. Copy `.env.example` to `.env` and add your Supabase URL and anon key.
4. Start the app with `npm run dev`.

## Notes

The app uses Supabase when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are present. Without those values, it falls back to browser `localStorage` seeded with five sample creators so the UI can still be reviewed locally.

## License

Copyright 2026 Karan Agrawal

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
