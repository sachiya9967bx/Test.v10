# 📱 Peaky Blinders Session Site

Complete session/pairing code generator for Peaky Blinders WhatsApp Bot deployed on Render.

## 🚀 Deploy on Render

1. Fork this repository on GitHub
2. Go to [render.com](https://render.com)
3. Click "New +" → "Web Service"
4. Select your GitHub repository
5. Configure:
   - **Name**: `peaky-session-site`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
6. Click "Deploy"

## 📖 How to Use

1. Open your deployed site (e.g., `https://peaky-session-site.onrender.com`)
2. Enter your WhatsApp phone number with country code
3. Click "GET PAIRING CODE"
4. A 6-digit code will be generated
5. Go to WhatsApp → Settings → Linked Devices
6. Click "Link a Device" and enter the code
7. Done! Your session is authenticated

## 🔗 Integration with Bot

Update your bot's `index.js` to use the session site:

```javascript
const PAIRING_CODE_URL = 'https://jewish-md-session-site.onrender.com/api/request-code';
```

## 📝 API Endpoints

- `POST /api/request-code` - Request a new pairing code
- `GET /api/status/:sessionId` - Check session status
- `GET /api/download/:sessionId` - Download credentials file

## ⚙️ Environment Variables

No environment variables required - fully standalone!

## 🛡️ Features

✅ Beautiful UI with Peaky Blinders theme
✅ Real-time status updates
✅ Automatic credential storage
✅ Session auto-cleanup
✅ Mobile responsive
✅ No database required
✅ Pure Node.js + Express

## 📄 License

MIT
