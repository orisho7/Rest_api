# 🎙️ Podcast App

A modern podcast search and discovery app built with Next.js and Express. Search through millions of podcasts, discover trending shows, and explore genres—all in a sleek, responsive UI!

## ✨ Features

- **🔍 Search Podcasts**: Search through millions of podcasts using the iTunes API.
- **🔥 Trending Podcasts**: View the top trending podcasts from the iTunes RSS feed.
- **🎯 Browse by Genre**: Explore podcasts by genre (placeholder for now).
- **🌟 Promoted Podcasts**: View promoted podcasts (placeholder for now).
- **💻 Modern UI**: Built with Next.js and Tailwind CSS for a clean, responsive design.

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Express.js, Axios, SQLite (for storing search results)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd podcast-app
   ```

2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

4. Start the backend server:
   ```bash
   cd ../backend
   npm start
   ```

5. Start the frontend development server:
   ```bash
   cd ../frontend
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3001`.

## 📝 Usage

- **🔍 Search**: Use the search bar in the top navbar to search for podcasts.
- **🔥 Trending**: View trending podcasts on the home page.
- **🎯 Browse by Genre**: Explore podcasts by genre (placeholder for now).
- **🌟 Promoted**: View promoted podcasts (placeholder for now).

## 🔧 API Endpoints

- **GET /search**: Search for podcasts using the iTunes API.
- **GET /trending**: Fetch trending podcasts from the iTunes RSS feed.

## 🔐 Environment Variables

- `PORT`: The port on which the backend server runs (default: 3000).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details. 
