# UIvent - Sistem Manajemen Proker Mahasiswa UI

UIvent adalah platform berbasis web untuk manajemen dan dokumentasi program kerja (proker) atau event yang diadakan oleh organisasi kemahasiswaan di Universitas Indonesia. Aplikasi ini membantu organisasi seperti BEM, Himpunan, dan UKM untuk mengelola, mempublikasikan, dan melacak status acara mereka dengan mudah, serta mempermudah untuk mendapatkan peserta

---

# 📌 Fitur Utama

- 🔐 **Autentikasi dan Role**
  - Role `Umum`: Melihat dan mencari event
  - Role `Organisasi`: CRUD event proker mereka sendiri
  - Role `Admin`: CRUD semua data dan melihat statistik global

- 🗂️ **Manajemen Proker/Event**
  - Buat, ubah, dan hapus event
  - Kategorisasi event (Seni, Olahraga, Lomba, dll)

- 📊 **Statistik Aktivitas**
  - Jumlah peserta event
  - Kepuasan peserta terhadap event (rating)

- 🔍 **Pencarian dan Filter**
  - Berdasarkan kategori dan organisasi

- ✅ **Tracking Status Proker**
  - Status: Perencanaan, Berjalan, Selesai

## 💻 Tech Stack:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![Cloudinary](https://img.shields.io/badge/Cloudinary-%231563FF.svg?style=for-the-badge&logo=cloud&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) 

## 📊 Diagram

Database UML:  
![UML](./Kelengkapan/Database%20UML.png)

Entity Relationship Diagram:  


Flowchart:  


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