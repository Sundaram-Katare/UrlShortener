# 🔗 Safe Linkr

A full-stack web application that lets users shorten URLs with added security — unsafe/malicious URLs are flagged and blocked using Google's Safe Browsing API.

Live Demo: [**Hosted on Vercel**](https://url-shortener-lime-two.vercel.app/)

## 📷 Screenshots
<img width="1899" height="912" alt="image" src="https://github.com/user-attachments/assets/d554afe6-4b19-4f09-9fc2-27e83468bdfc" />


---

## 🚀 Features

- ✅ Shorten any valid URL
- 🛡️ Checks for **malware, phishing, and unsafe URLs** before shortening
- 📊 Track total clicks and views
- 🔐 Auth token support (optional for future upgrade)
- ⚡ Built with Docker, PostgreSQL (NeonDB), and modern web stack

---

## 🛠️ Tech Stack

### Frontend:
- **React.js**
- **Tailwind CSS**
- **Framer Motion**
- **Axios**

### Backend:
- **Node.js + Express.js**
- **PostgreSQL (via NeonDB)**
- **Google Safe Browsing API**
- **JWT (future ready)**

### DevOps:
- **Docker + docker-compose**
- **Render Deployment**
- **Environment Variable Support**

---

## 🧪 Local Development Setup

> Requires: Docker + Docker Compose

1. Clone the repo:

```bash
git clone https://github.com/Sundaram-Katare/UrlShortener.git
cd UrlShortener
```

2. Add .env
```bash
  PORT=5000
DATABASE_URL=your_neon_db_url
SAFE_BROWSING_API_KEY=your_google_safe_browsing_api_key
JWT_SECRET=your_secret_key
```

3. Run
```bash
 docker-compose up --build
```

4. Access

Frontend: http://localhost:3000

Backend: http://localhost:5000
