# 🔗 Safe Linkr

A full-stack web application that lets users shorten URLs with added security — unsafe/malicious URLs are flagged and blocked using Google's Safe Browsing API.

Live Demo: [**Hosted on Vercel**](https://url-shortener-lime-two.vercel.app/)

## 📷 Screenshots
<img width="1904" height="909" alt="image" src="https://github.com/user-attachments/assets/e003fd57-2678-43a4-8ab7-8a6e7e9cc69e" />


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
