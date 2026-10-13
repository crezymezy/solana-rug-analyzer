// Telegram HTML Message Templates — Angel Bots (DexTracker + RugAnalyzer)
// Korrigierte Version: valides Telegram-HTML (keine style-Attribute, keine Farben).
// Einsatz: parseMode: 'html' in GramJS setzen, alte Escapes (\_ \*) entfernen.

function esc(s) {
  return String(s ?? '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);
}

// ── DexTracker: Token-Alert ─────────────────────────────────────────
function buildTokenMessage(d) {
  const {
    name, symbol, address, score,
    mc, liq, vol24, vol1h, age,
    buys1h, sells1h, buys24h, sells24h,
    ch5m, ch1h, ch6h, ch24h,
    holders, top10, mintStatus, freezeStatus, lpStatus,
    socials, chartLinks, tradeLinks
  } = d;

  const badge = score >= 70 ? '🟢' : score >= 40 ? '🟠' : '🔴';

  let m = '';
  m += `<b>💎 ${esc(name)} (${esc(symbol)})</b> ${badge} <b>${score}/100</b>\n`;
  m += `<code>${esc(address)}</code>\n\n`;

  m += `<b>📊 Market</b>\n`;
  m += `<code>MC</code> ${esc(mc)}   <code>LIQ</code> ${esc(liq)}\n`;
  m += `<code>VOL</code> ${esc(vol24)} (24h)${vol1h ? ' · ' + esc(vol1h) + ' (1h)' : ''}\n`;
  m += `<code>AGE</code> ${esc(age)}\n\n`;

  m += `<b>📈 Price</b>\n`;
  m += `<i>5m ${esc(ch5m)} · 1h ${esc(ch1h)} · 6h ${esc(ch6h)} · 24h ${esc(ch24h)}</i>\n\n`;

  m += `<b>🔄 Trades</b>\n`;
  m += `1h: ${esc(buys1h)} / ${esc(sells1h)} · 24h: ${esc(buys24h)} / ${esc(sells24h)}\n\n`;

  m += `<b>👥 Holders</b>\n`;
  m += `${esc(holders)}${top10 ? ' · Top10: ' + esc(top10) + '%' : ''}\n\n`;

  m += `<b>🛡️ Security</b>\n`;
  m += `Mint: ${esc(mintStatus)} · Freeze: ${esc(freezeStatus)} · LP: ${esc(lpStatus)}\n\n`;

  if (socials && socials.length) {
    m += `<b>🌐 Socials</b>\n${socials.join(' · ')}\n\n`;
  }
  m += `<b>📉 Charts</b>\n${chartLinks.join(' · ')}\n`;
  m += `<b>🤖 Trade</b>\n${tradeLinks.join(' · ')}`;
  return m;
}

// ── RugAnalyzer: Rug-Check ──────────────────────────────────────────
function buildRugMessage(d) {
  const {
    name, symbol, address, score, badge,
    age, mc, liq, price, supply,
    ch5m, ch1h, ch6h, ch24h,
    buys1h, sells1h, bsr1h, buys24h, sells24h, bsr24h,
    holders, top5, top10, top1, top1Addr,
    mintStatus, freezeStatus, lpStatus, dev,
    checks, socials, chartLinks, tradeLinks
  } = d;

  let m = '';
  m += `${badge} <b>Score: ${score}/100</b>\n\n`;
  m += `<b>🪙 ${esc(name)} (${esc(symbol)})</b> · Solana · ${esc(age)}\n`;
  m += `<code>${esc(address)}</code>\n\n`;

  m += `<b>💰 Market</b>\n`;
  m += `<code>MC</code> ${esc(mc)}   <code>PRICE</code> ${esc(price)}\n`;
  m += `<code>LIQ</code> ${esc(liq)}   <code>VOL</code> ${esc(supply)}\n\n`;

  m += `<b>📈 Price</b>\n<i>5m ${esc(ch5m)} · 1h ${esc(ch1h)} · 6h ${esc(ch6h)} · 24h ${esc(ch24h)}</i>\n\n`;

  m += `<b>🔄 Trades</b>\n`;
  m += `1h: ${esc(buys1h)}/${esc(sells1h)} (${esc(bsr1h)}x) · 24h: ${esc(buys24h)}/${esc(sells24h)} (${esc(bsr24h)}x)\n\n`;

  m += `<b>👥 Holders</b>\n`;
  m += `${esc(holders)} · Top5: ${esc(top5)} · Top10: ${esc(top10)}\n`;
  m += `#1: ${esc(top1)} <code>${esc(top1Addr.slice(0, 8))}…</code>\n\n`;

  m += `<b>🔐 Security</b>\n`;
  m += `Mint: ${esc(mintStatus)} · Freeze: ${esc(freezeStatus)} · LP: ${esc(lpStatus)}\n`;
  if (dev) m += `Dev: ${esc(dev)}\n`;
  m += '\n';

  if (checks && checks.length) {
    m += `<b>✅ Risk Factors</b>\n${checks.map(c => '• ' + esc(c)).join('\n')}\n\n`;
  }
  if (socials && socials.length) {
    m += `<b>🌐 Socials</b>\n${socials.join(' · ')}\n\n`;
  }
  m += `<b>📉 Charts</b>\n${chartLinks.join(' · ')}\n`;
  m += `<b>🤖 Trade</b>\n${tradeLinks.join(' · ')}`;
  return m;
}

module.exports = { esc, buildTokenMessage, buildRugMessage };
