# UIvent - Sistem Manajemen Proker Mahasiswa UI

UIvent is a web-based platform that aims to help the management and documentation of work programs (proker) or events held by student organizations at the University of Indonesia. This application goal is to help organizations (ex: BEM, Himpunan, and UKM) to easily manage, publish, and track the status of their events, as well as making it more accessible for participants to register and updated.

---

## 📌 Fitur Utama

- 🔐 **Autentication and Role**
  - Public Role: View and search for events
  - Organization Role: CRUD their own work program events
  - Admin Role: CRUD all data and view global statistics

- 🗂️ **Work Program/Event Management** 
  - Create, edit, and delete events
  - Event categorization (Art, Sports, Competition, etc.)

- 📊 **Activity Statistics**
  - Number of event participants
  - Participants satisfaction towards the event (rating)

- 🔍 **Search dan Filter**
  - Based on category and organization

- ✅ **Tracking Status**
  - Status: Planning, In Progress, Completed

## 💻 Tech Stack:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-%231563FF.svg?style=for-the-badge&logo=cloud&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) 

## 📊 Diagram

Database UML:  
![UML](./Kelengkapan/Database%20UML.png)

Entity Relationship Diagram:  
![ERD](./Kelengkapan/ERD.png)

Flowchart:  
![Flowchart](./Kelengkapan/Flowchart.png)


## 💻 Installation Guide

Clone this repository
```
git clone https://github.com/aryawiandra/UIvent.git
```

### Frontend

- Ensure you are in the right folder  
![Frontend]()

- Run npm install to install all dependencies
  ```
  npm install
  ```

- To test installation result, run:
  ```
  npm run dev
  ```

### Backend

- Ensure you are in the right folder  
![Backend]()

- Run npm install to install all dependencies
  ```
  npm install
  ```

- Create a `.env` file and add following variables:
  ```
  PG_CONNECTION_URL=postgres://your-username:your-password@localhost:5432/db_name
  JWT_SECRET=your_jwt_secret_key
  JWT_EXPIRES_IN=expire_time_if_needed
  CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
  ```

- To test installation result, run:
  ```
  npm run start
  ```

## 📝 Documentation