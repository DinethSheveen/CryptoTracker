# 📈 CryptoTracker
A modern cryptocurrency price tracker web application built with React and Vite that lets users view real-time crypto data, see price changes, and explore market info for popular coins.

---

## 🚀 Features

- 📊 Real-time cryptocurrency prices

- 🔍 Search functionality to find specific coins

- 📈 Price change indicators (24h, 7d, etc.)

- 💱 Optional display in multiple fiat currencies

- 🔥 Lightweight & fast UI powered by React + Vite

---

## 🛠 Tech Stack

| Technology | Purpose |
|-------|------------|
| React | UI components |
| JavaScript  | Core app logic |
| Vite | Dev server & build tooling
| Tailwind | Styling | 
| CoinGecko API | Fetching crypto market data | 
| Recharts | Chart visualization

---

##  📸 Screenshots

### 🏠 Home
![HomePage](/public/home.png)

### CoinPage
![CoinPage](/public/coin.png)

## 🧩 Usage

Once running locally:

- Type a crypto name or symbol in the search bar

- View price, 24h change, market cap, volume, etc.


### 📡 API Configuration

This project uses a public crypto market API (e.g., CoinGecko). If you need an API key:

Register for the API provider of your choice

Create a .env file in root

Add your key:

```bash

VITE_CRYPTO_API_KEY=your_api_key_here

```

### 📦 Installation
1. Clone the Repo

```bash

git clone https://github.com/DinethSheveen/CryptoTracker.git
cd CryptoTracker

```

2. Install dependencies

```bash

npm install

```

3. Run the dev server

```bash

npm run dev

```