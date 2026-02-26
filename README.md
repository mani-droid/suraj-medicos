# 🏥 Suraj Medicos — Smart Pharmacy Web App

A professional, industry-level medical pharmacy web application. Built without a traditional database, this app leverages modern browser storage, AI, and API integrations to provide a seamless, app-like experience for customers while keeping operations simple for the pharmacy owner via WhatsApp.

## ✨ Core Features Built

### 🛍️ Smart E-Commerce Engine
* **Memory Cart (Local Storage):** Cart items are saved in the browser. Customers won't lose their orders if they accidentally refresh or close the tab.
* **Custom Medicine Requests:** A dedicated input box allows users to order unlisted or rare medicines.
* **WhatsApp Checkout Routing:** The cart compiles all grid items and custom requests into a cleanly formatted list and pushes it directly to the pharmacy's WhatsApp, automatically asking for final stock confirmation and the discounted bill.

### 🤖 AI Pharmacist Assistant
* **Botpress Integration:** A floating AI chatbot trained specifically on Suraj Medicos' custom Knowledge Base.
* **Smart Routing:** Instructs customers on store policies, operating hours, and edge cases (like medical emergencies and prescription requirements) without human intervention.

### 📱 Progressive Web App (PWA)
* **Installable:** Customers can click "Add to Home Screen" on iOS and Android to install the website as a native app with a custom icon.
* **Service Worker:** Powered by `sw.js` and `manifest.json` for app-like full-screen display.

### 🗺️ Advanced UI/UX
* **Live Store Status:** A dynamic navbar badge that reads the real-world clock and automatically switches between "🟢 Open Now" and "🔴 Closed" based on the store's actual operating hours.
* **Interactive Dark-Mode Map:** Embedded Google Maps iframe with CSS filters to match the site's sleek dark theme.
* **Rich Link Previews:** Open Graph meta tags so the link looks like a premium card when shared on WhatsApp, Facebook, or Instagram.
* **Smooth Interactions:** Custom animated cursor, typewriter effects, health tips carousel, and a sliding FAQ accordion.

### 📧 Backend-Free Integrations
* **Web3Forms:** The "Send a Message" contact form routes directly to the owner's email inbox without needing a PHP or Node.js backend.
* **Google Analytics:** Invisible tracking script to monitor daily visitors, devices, and traffic sources.

---

## 📁 File Structure

```text
suraj-medicos/
│
├── index.html      ← Main HTML (UI, Meta tags, Botpress script, GA snippet)
├── style.css       ← All styles, animations, and responsive breakpoints
├── script.js       ← Logic (Cart engine, Live clock, Typewriter, FAQ)
├── manifest.json   ← PWA App Manifest (App name, theme color, icons)
├── sw.js           ← PWA Service Worker (For installability)
├── images/         ← Folder for actual pharmacy photos
│   ├── hero-pharmacy.jpg
│   └── about-pharmacy.jpg
└── README.md       ← Documentation


*Built with HTML, CSS & Vanilla JS — No frameworks required.*
