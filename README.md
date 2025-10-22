# Zenclik Project

This project is a full-stack web application for booking hot air balloon flights, built with React (frontend) and Node.js/Express (backend), using MongoDB for data storage. It includes admin and user features, image uploads via Cloudinary, and email notifications.

## Project Structure
- `web/` — React frontend
- `server/` — Node.js/Express backend
- `compose.yaml` — Docker Compose configuration
- `mongodb` — MongoDB database (containerized)

## Prerequisites
- Docker and Docker Compose installed

## How to Run
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd zenclik
   ```
2. Add environment variables:
   - Edit `server/.env` with your secrets (MongoDB, Cloudinary, email, etc.)
3. Build and start all services:
   ```bash
   docker compose up --build
   ```
   This will start:
   - MongoDB (port 27017)
   - Backend server (port 5000)
   - Frontend web app (port 3000)

4. Access the app:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000/api](http://localhost:5000/api)

## Useful Commands
- Stop all containers:
  ```bash
  docker compose down
  ```
- Rebuild containers:
  ```bash
  docker compose up --build
  ```

## Notes
- Make sure your `.env` files are correctly set up before running.
- For development, you can run frontend and backend separately using `npm start` or `npm run dev` in their respective folders.

## License
MIT
