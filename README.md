# Job Portal 💼

 > A full-stack **MERN Job Portal** connecting job seekers with employers.  
Job seekers can search/apply for jobs, employers can post/manage listings, and admins control everything from a central dashboard.

---

## 🌟 Features
- 🔑 Role-based Auth (Job Seeker, Employer, Admin) – JWT + bcryptjs  
- 🔍 Job search with filters (category, location, keywords, salary)  
- 📝 Employers can post, edit & delete jobs  
- 📊 Admin dashboard for managing users & jobs  
- ☁️ Cloudinary for resume/logo storage  

---

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS, Redux Toolkit, JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JWT, bcryptjs  
- **Other**: Cloudinary, Lucide-React, React-Icons  

---


## ⚡ Quick Start
```bash
# Backend
cd backend
npm install && npm start

# Frontend
cd frontend
npm install && npm run dev

````

## Screenshots
<img width="1920" height="972" alt="screencapture-localhost-5173-2025-09-18-12_27_04" src="https://github.com/user-attachments/assets/333c59e8-60f0-4965-a653-a662f054de1f" />

<img width="1920" height="1523" alt="screencapture-localhost-5173-signup-2025-09-18-12_27_43" src="https://github.com/user-attachments/assets/92584acb-521b-47a1-8802-74892dfd938f" />

<img width="1920" height="1278" alt="screencapture-localhost-5173-login-2025-09-18-12_27_32" src="https://github.com/user-attachments/assets/5c2cef57-2947-4669-a658-af6443cc7269" />

<img width="1920" height="968" alt="screencapture-localhost-5173-jobs-2025-09-18-12_28_00" src="https://github.com/user-attachments/assets/af48e122-7618-4b29-bf2e-5d916056b35b" />




##  🔑 Environment Variables (/backend/.env)

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

````


## 📋 Usage
- **Job Seekers**: 🔍 Search and apply for jobs.  
- **Employers**: 📝 Post and manage job listings.  
- **Admins**: 👨‍💼 Manage users and oversee job postings.

