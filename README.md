# 🎬 myFlix Client

A responsive, single-page React application that serves as the client-side interface for the **myFlix** movie app. It allows users to browse movies, view detailed information, manage a personal list of favorite movies, and update their user profile.

---

## 📌 Objective

The goal of this project is to build a rich client-side application using the **MERN** (MongoDB, Express, React, Node.js) stack. The client interacts with an existing server-side REST API to retrieve and manipulate movie and user data.

---

## 🌐 Live Demo

_Deployed at:_  
[]https://cinemabyinge.netlify.app
---

## 🧩 Key Features

### 🔍 Main View
- Displays a list of all movies (with image, title, and description).
- Allows filtering by genre and title using a search bar.
- Lets users log out and navigate to their profile.

### 🎞️ Single Movie View
- Shows details about a selected movie (description, genre, director).
- Allows users to add or remove the movie from their favorites list.

### 🔑 Login View
- Authenticates returning users via username and password.

### 📝 Signup View
- Registers new users with username, password, email, and birthday.

### 🙍‍♂️ Profile View
- Displays and updates user information.
- Shows a list of favorite movies.
- Allows removing favorite movies or deleting the account.

---

## 👤 Target Users
Movie enthusiasts who want to explore, learn about, and save their favorite movies.

---

## 🛠️ Technology Stack

- **Frontend**: React, Bootstrap, React Router, Parcel
- **Backend**: Express & Node.js (not part of this repo but connects to it)
- **Database**: MongoDB (via Mongoose)
- **Hosting**: Netlify / GitHub Pages (client), Heroku (API)
- **Authentication**: Token-based (JWT)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── movie-card/
│   ├── movie-view/
│   ├── login-view/
│   ├── signup-view/
│   ├── profile-view/
│   └── navigation-bar/
├── App.jsx
├── main-view.jsx
└── index.jsx
```

---

## ✅ Technical Requirements Met

- SPA with routing and dynamic URLs
- Movie filtering with search functionality
- Bootstrap styling and responsiveness
- Functional components throughout
- Parcel build tool
- Full CRUD interaction with server
- Optional features in progress (e.g., director/genre views)

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run start
```
