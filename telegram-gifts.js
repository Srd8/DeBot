const { dbGetGiftsCache, dbSetGiftsCache, resolveUser, callTelegramAPI, calcEffectiveStars, ADMIN_ID, ADMIN_DISCOUNT_PERCENT, setCors } = require('./_lib');
const { TELEGRAM_GIFTS_LIST, normalizeTelegramGifts } = require('./telegram-gifts-catalog');

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const userInfo = resolveUser(req);
  const userId = userInfo?.id || '';
  const now = Date.now();

  const cache = await dbGetGiftsCache();
  let gifts = cache.gifts || [];
  let liveSource = 'telegram_bot_api';

  try {
    if (!gifts.length || now - Number(cache.updatedAt || 0) > 5 * 60 * 1000) {
      const result = await callTelegramAPI('getAvailableGifts');
      const normalized = normalizeTelegramGifts(result?.gifts);
      if (normalized.length > 0) {
        gifts = normalized;
        await dbSetGiftsCache({ updatedAt: now, gifts });
      } else {
        liveSource = 'telegram_gifts_catalog_js';
        gifts = TELEGRAM_GIFTS_LIST;
      }
    }
  } catch {
    liveSource = 'telegram_gifts_catalog_js';
    gifts = TELEGRAM_GIFTS_LIST;
  }

  const enriched = gifts.map((g) => ({
    ...g,
    effective_star_count: userId ? calcEffectiveStars(g.star_count, userId) : g.star_count,
    is_admin_discount: Boolean(userId && String(userId) === ADMIN_ID),
    discount_percent: userId && String(userId) === ADMIN_ID ? ADMIN_DISCOUNT_PERCENT : 0
  }));

  return res.status(200).json({
    ok: true,
    source: liveSource,
    gifts: enriched
  });
};
