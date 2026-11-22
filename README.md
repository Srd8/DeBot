# Epic Gift Telegram Mini App

## التشغيل والنشر
1. ثبّت الحزم:
   `npm install`
2. انسخ `.env.example` إلى `.env` واضبط متغيرات البيئة (`BOT_TOKEN`، `ADMIN_ID`، `DATABASE_URL` إن رغبت في PostgreSQL).
3. شغّل الخادم المحلي أو ارفع المشروع على Vercel:
   `npm start`
4. فعّل Webhook البوت على:
   `https://<your-domain>/api/telegram-webhook`
