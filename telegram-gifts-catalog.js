// Dedicated catalog of Telegram Stars Gifts (with live Bot API getAvailableGifts support)

const TELEGRAM_GIFTS_LIST = [
  { id: '5170233102089322756', title: 'Plush Toy', emoji: '🧸', star_count: 15, tier: 'Classic' },
  { id: '5170145012310081615', title: 'Velvet Rose', emoji: '🌹', star_count: 25, tier: 'Classic' },
  { id: '5168043875654172773', title: 'Gift Box', emoji: '🎁', star_count: 25, tier: 'Classic' },
  { id: '5170250947678437525', title: 'Birthday Cake', emoji: '🎂', star_count: 50, tier: 'Celebration' },
  { id: '5170564780938756245', title: 'Champagne Bottle', emoji: '🍾', star_count: 50, tier: 'Celebration' },
  { id: '5170314324215857265', title: 'Bouquet', emoji: '💐', star_count: 50, tier: 'Celebration' },
  { id: '5170190019339263101', title: 'Rocket', emoji: '🚀', star_count: 50, tier: 'Special' },
  { id: '5170521118301225164', title: 'Trophy', emoji: '🏆', star_count: 100, tier: 'Premium' },
  { id: '5170220680862098066', title: 'Diamond Ring', emoji: '💍', star_count: 100, tier: 'Premium' },
  { id: '5168103777563050263', title: 'Gem Stone', emoji: '💎', star_count: 100, tier: 'Premium' },
  { id: '5170387141225750312', title: 'Golden Teddy', emoji: '🧸', star_count: 150, tier: 'Premium' },
  { id: '5170493347506064015', title: 'Royal Crown', emoji: '👑', star_count: 200, tier: 'VIP' },
  { id: '5170594168186613011', title: 'Unicorn', emoji: '🦄', star_count: 250, tier: 'VIP' },
  { id: '5170612141741595002', title: 'Dragon', emoji: '🐉', star_count: 500, tier: 'Ultra VIP' },
  { id: '5170639923751726119', title: 'UFO Vault', emoji: '🛸', star_count: 1000, tier: 'Ultra VIP' }
];

function normalizeTelegramGifts(rawGifts) {
  if (!Array.isArray(rawGifts) || !rawGifts.length) return [];
  return rawGifts.map((g) => ({
    id: String(g.id),
    title: g.sticker?.emoji ? `${g.sticker.emoji} Telegram Gift #${g.id}` : `Telegram Gift #${g.id}`,
    emoji: g.sticker?.emoji || '🎁',
    star_count: Number(g.star_count || 0),
    remaining_count: g.remaining_count ?? null,
    total_count: g.total_count ?? null,
    tier: 'Telegram Live'
  }));
}

module.exports = {
  TELEGRAM_GIFTS_LIST,
  normalizeTelegramGifts
};
