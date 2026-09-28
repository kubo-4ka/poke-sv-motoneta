'use strict';

/* ================= Storage ================= */
const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode etc. */ }
  }
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const toHira = (s) => String(s).replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
const norm = (s) => toHira(String(s).normalize('NFKC').toLowerCase());

ENTRIES.forEach((e, i) => { e.id = e.c + ':' + e.ja; e.idx = i; });
const CAT_KEYS = Object.keys(CATS);

/* ================= Preferences ================= */
const defaultPrefs = () => ({
  spoil: [true, false, false, false],
  cats: Object.fromEntries(CAT_KEYS.map((k) => [k, true])),
  en: true,
  ev: true,
  evo: false, // 進化の系統を表示する（初回はネタバレを避けて表示しない）
  evoHow: false, // 進化の方法・条件を表示する（同上）
  voice: '', // 読み上げに使う音声（voiceURI）
  rate: 0.9,
  vol: 1
});
const prefs = Object.assign(defaultPrefs(), store.get('pmz.prefs', {}));
prefs.cats = Object.assign(defaultPrefs().cats, prefs.cats || {});
if (!Array.isArray(prefs.spoil) || prefs.spoil.length !== SPOILERS.length) prefs.spoil = defaultPrefs().spoil;
const savePrefs = () => store.set('pmz.prefs', prefs);

let stats = store.get('pmz.stats', {}); // id -> [correct, wrong]
const saveStats = () => store.set('pmz.stats', stats);
const record = (e, ok) => { const s = stats[e.id] || [0, 0]; s[ok ? 0 : 1]++; stats[e.id] = s; saveStats(); };
const rate = (e) => { const s = stats[e.id]; return s && s[0] + s[1] ? s[0] / (s[0] + s[1]) : null; };

const isVisible = (e) => prefs.spoil[e.sp] && prefs.cats[e.c];
const visibleEntries = () => ENTRIES.filter(isVisible);

/* ================= Theme ================= */
const THEMES = [
  { id: 'auto', label: '自動（端末の設定）', sw: ['#b0001f', '#1c1826'] },
  { id: 'scarlet', label: 'スカーレット', sw: ['#9c0019', '#db6a00'], bar: '#9c0019' },
  { id: 'violet', label: 'バイオレット', sw: ['#3f0b86', '#1c77bd'], bar: '#3f0b86' },
  { id: 'orange', label: 'オレンジ', sw: ['#c24e00', '#1b58a3'], bar: '#c24e00' },
  { id: 'grape', label: 'グレープ', sw: ['#34094f', '#4b8a16'], bar: '#34094f' },
  { id: 'star', label: 'スター', sw: ['#17130a', '#f2b705'], bar: '#17130a' },
  { id: 'cassiopeia', label: 'カシオペア', sw: ['#a98cf2', '#121019'], bar: '#241c3a' }
];
const darkMQ = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : { matches: false, addEventListener() {} };
// テーマは index.html 冒頭のスクリプトでも読むため、JSON ではなく文字列のまま保存する
let themeChoice = 'auto';
try { themeChoice = localStorage.getItem('pmz.theme') || 'auto'; } catch (e) {}
if (!THEMES.some((t) => t.id === themeChoice) && themeChoice !== 'ghost') themeChoice = 'auto';
if (themeChoice === 'ghost') themeChoice = 'cassiopeia'; // 旧名からの移行

function applyTheme() {
  const id = themeChoice === 'auto' ? (darkMQ.matches ? 'cassiopeia' : 'scarlet') : themeChoice;
  document.documentElement.dataset.theme = id;
  const t = THEMES.find((x) => x.id === id);
  $('meta[name="theme-color"]').setAttribute('content', t ? t.bar : '#9c0019');
  const swatch = (t) => `<span class="swatch" style="background:linear-gradient(135deg, ${t.sw[0]} 50%, ${t.sw[1]} 50%)"></span>`;
  $('#themeMenu').innerHTML = THEMES.map((t) =>
    `<button class="theme-opt" role="menuitemradio" aria-checked="${t.id === themeChoice}" data-theme="${t.id}" type="button">${swatch(t)}${esc(t.label)}</button>`).join('');
  $('#themeChips').innerHTML = THEMES.map((t) =>
    `<button class="chip" type="button" aria-pressed="${t.id === themeChoice}" data-theme="${t.id}">${esc(t.label)}</button>`).join('');
}
function setTheme(id) {
  themeChoice = id;
  try { localStorage.setItem('pmz.theme', id); } catch (e) {}
  applyTheme();
}
darkMQ.addEventListener && darkMQ.addEventListener('change', () => { if (themeChoice === 'auto') applyTheme(); });

$('#themeBtn').addEventListener('click', (ev) => {
  const menu = $('#themeMenu');
  menu.hidden = !menu.hidden;
  $('#themeBtn').setAttribute('aria-expanded', String(!menu.hidden));
  ev.stopPropagation();
});
document.addEventListener('click', (ev) => {
  const opt = ev.target.closest('[data-theme]');
  if (opt && (opt.classList.contains('theme-opt') || opt.classList.contains('chip'))) setTheme(opt.dataset.theme);
  if (!ev.target.closest('.theme-wrap')) { $('#themeMenu').hidden = true; $('#themeBtn').setAttribute('aria-expanded', 'false'); }
});

/* ================= Rendering helpers ================= */
const SP_CLASS = ['sp0', 'sp1', 'sp2', 'sp3'];
const confStars = (cf) => `<span class="conf" title="推測の確からしさ">${'★'.repeat(cf)}<span class="off">${'★'.repeat(3 - cf)}</span></span>`;
const dexSlug = (en) => en.toLowerCase().replace(/é/g, 'e').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const pad = (n, w) => String(n).padStart(w, '0');
// 由来は文字列か、諸説あるときは配列。先頭を代表の説としてクイズに使う
const main = (v) => (Array.isArray(v) ? v[0] : v);
const theories = (v) => (Array.isArray(v) ? v : [v]);
const theoryHTML = (v) => {
  const list = theories(v);
  return list.length === 1 ? esc(list[0])
    : `<ol class="theories">${list.map((t) => `<li>${esc(t)}</li>`).join('')}</ol>`;
};
// 進化の系統：段階を「→」、同じ段階の分岐を「／」でつなぐ。ほかの名前はタップで一覧の検索へ
const evoHTML = (e) => e.evo.map((stage) => stage.map(([name, how]) => {
  const label = name === e.ja ? `<b class="evo-self">${esc(name)}</b>` : `<button class="evo-link" type="button" data-jump="${esc(name)}">${esc(name)}</button>`;
  return label + (how && prefs.evoHow ? `<span class="evo-how">（${esc(how)}）</span>` : '');
}).join('<span class="evo-sep">／</span>')).join('<span class="evo-arrow">→</span>');
const formHTML = (e) => `<ul class="forms">${e.fm.map(([ja, en, note]) => `<li>${esc(ja)}${prefs.en ? ` <span class="cat-en" lang="en">${esc(en)}</span>` : ''}${note ? `<small>${esc(note)}</small>` : ''}</li>`).join('')}</ul>`;
const TYPE_KEYS = { ノーマル: 'normal', ほのお: 'fire', みず: 'water', でんき: 'electric', くさ: 'grass', こおり: 'ice', かくとう: 'fighting', どく: 'poison', じめん: 'ground', ひこう: 'flying', エスパー: 'psychic', むし: 'bug', いわ: 'rock', ゴースト: 'ghost', ドラゴン: 'dragon', あく: 'dark', はがね: 'steel', フェアリー: 'fairy' };
const typeHTML = (ty) => ty.map((t) => `<span class="type t-${TYPE_KEYS[t] || 'normal'}">${esc(t)}</span>`).join('');
// 技の性能と、名前とのつながりを考える手がかりになるひとこと
function moveNote(e) {
  const notes = [];
  if (e.mcls === '変化') notes.push('ダメージを与えない変化技');
  else if (e.pw >= 120) notes.push('威力がとても高い大技');
  else if (e.pw >= 90) notes.push('威力が高め');
  else if (e.pw && e.pw <= 40) notes.push('威力は控えめ');
  if (e.ac === null && e.mcls !== '変化') notes.push('必ず当たる');
  else if (e.ac !== null && e.ac <= 70) notes.push('当たりにくい');
  else if (e.ac !== null && e.ac < 100) notes.push('やや当たりにくい');
  if (e.prio > 0) notes.push('先に攻撃できる先制技');
  if (e.prio < 0) notes.push('後から動く技');
  return notes.join('・');
}
const moveHTML = (e) => `<span class="mstat">${esc(e.mcls)}</span><span class="mstat">威力 ${e.pw ?? '—'}</span><span class="mstat">命中 ${e.ac ?? '—'}</span><span class="mstat">PP ${e.pp}</span>${moveNote(e) ? `<small class="mnote">${esc(moveNote(e))}</small>` : ''}`;
const link = (href, label) => `<a href="${href}" target="_blank" rel="noopener">${label} ↗</a>`;

// ---- 食事パワー ----
const POWER_TYPE = new RegExp('：(' + Object.keys(TYPE_KEYS).join('|') + ')');
function powerHTML(p) {
  const m = p.match(/^(.+?)(?:：(.+?))? (Lv\d)$/);
  if (!m) return `<span class="pw">${esc(p)}</span>`;
  const hit = foodPow.p && powMatch(p) ? ' hit' : '';
  return `<span class="pw${hit}">${esc(m[1])}${m[2] ? typeHTML([m[2]]) : ''}<small>${esc(m[3])}</small></span>`;
}
const powersHTML = (list) => `<span class="pws">${list.map(powerHTML).join('')}</span>`;
const townsHTML = (towns) => {
  const vis = towns.filter(townVisible), hidden = towns.length - vis.length;
  return vis.map((t) => `<span class="town">${esc(t)}</span>`).join('') + (hidden ? `<small class="mnote">ほか ${hidden} か所（ネタバレ範囲外の町）</small>` : '');
};
function foodHTML(e) {
  const out = [];
  if (e.menu) {
    const m = e.menu;
    out.push(`<dt class="ev">食べられる町</dt><dd class="ev">${townsHTML(m.towns)}<small class="mnote">${esc(m.shops.join('・'))}${m.note ? '。' + esc(m.note) : ''}</small></dd>`);
    out.push(`<dt class="ev">食事パワー</dt><dd class="ev">${m.sets ? `<ul class="recipes">${m.sets.map(([n, p]) => `<li${foodPow.p ? (p.some(powMatch) ? ' class="hit"' : ' class="miss"') : ''}><b>${esc(n)}</b>${powersHTML(p)}</li>`).join('')}</ul>` : powersHTML(m.powers)}</dd>`);
  }
  if (e.buy) out.push(`<dt class="ev">材料を買える店</dt><dd class="ev">${e.buy.towns.length ? townsHTML(e.buy.towns) : ''}<small class="mnote">${esc(e.buy.shops.join('・'))}（サンドウィッチの材料として買える）</small></dd>`);
  if (e.recipes) out.push(`<dt class="ev">レシピと食事パワー</dt><dd class="ev"><ul class="recipes">${e.recipes.map(([n, ing, p]) => `<li${foodPow.p ? (p.some(powMatch) ? ' class="hit"' : ' class="miss"') : ''}><b>${esc(n)}</b><small class="ing">${esc(ing)}</small>${powersHTML(p)}</li>`).join('')}</ul></dd>`);
  if (e.ingv) {
    const [fl, pw, ty] = e.ingv;
    const v = (a) => a.map(([k, n]) => `${esc(k)} ${n > 0 ? n : '−' + -n}`).join('・');
    out.push(`<dt class="ev">味・パワー・タイプ</dt><dd class="ev ingv"><span><b>味</b>${v(fl)}</span><span><b>パワー</b>${v(pw)}</span><span><b>タイプ</b>${ty.map(([k, n]) => (TYPE_KEYS[k] ? typeHTML([k]) : esc(k)) + `<small>${n}</small>`).join(' ')}</span><small class="mnote">ゲーム内には表示されない内部の値。サンドウィッチでは材料の値を足し合わせ、上位のものから食事パワーが決まる。</small></dd>`);
  }
  if (e.flavorRule) out.push(`<dt class="ev">味とパワー</dt><dd class="ev"><table class="flavor-rule"><thead><tr><th>いちばん強い味</th><th>2番目の味</th><th>ボーナスが付くパワー</th></tr></thead><tbody>${e.flavorRule.map(([a, b, p]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td><td>${esc(p)}</td></tr>`).join('')}</tbody></table></dd>`);
  return out.join('');
}

// ---- 英語の読み上げ ----
const canSpeak = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
const sayBtn = (text) => (canSpeak ? `<button class="say" type="button" data-say="${esc(text)}" aria-label="英語で読み上げる" title="英語で読み上げる">♪</button>` : '');
const FEMALE = /female|woman|samantha|zira|aria|jenny|ava|allison|susan|karen|moira|tessa|fiona|victoria|serena|kate|hazel|libby|sonia|natasha|clara|emma|michelle|sara|google us english|google uk english female|catherine|nicky|joanna|salli|kimberly|ivy|kendra/i;
const MALE = /\bmale\b|david|mark|guy|daniel|alex|fred|george|ryan|thomas|william|james|brian|christopher|eric|roger|steffan|aaron|arthur|oliver|google uk english male/i;
function enVoices() {
  if (!canSpeak) return [];
  const score = (v) => (FEMALE.test(v.name) && !/\bmale\b/i.test(v.name.replace(/female/i, '')) ? 0 : MALE.test(v.name) ? 2 : 1) + (/^en-US/i.test(v.lang) ? 0 : 0.5) + (v.localService ? 0 : 0.2);
  return speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang)).sort((a, b) => score(a) - score(b) || a.name.localeCompare(b.name));
}
function currentVoice() {
  const vs = enVoices();
  return vs.find((v) => v.voiceURI === prefs.voice) || vs[0] || null;
}
function say(text) {
  if (!canSpeak || !text) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text.replace(/〇〇/g, '').replace(/[’]/g, "'"));
  const v = currentVoice();
  if (v) u.voice = v;
  u.lang = v ? v.lang : 'en-US';
  u.rate = Number(prefs.rate) || 0.9;
  u.volume = prefs.vol == null ? 1 : Number(prefs.vol);
  speechSynthesis.speak(u);
}
document.addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-say]');
  if (!b) return;
  ev.preventDefault(); ev.stopPropagation();
  say(b.dataset.say);
}, true);
function renderVoiceSettings() {
  const vs = enVoices();
  $('#voiceNone').hidden = !!vs.length && canSpeak;
  $('#voiceSel').innerHTML = vs.map((v) => `<option value="${esc(v.voiceURI)}">${esc(v.name)}（${esc(v.lang)}）</option>`).join('');
  const cur = currentVoice();
  if (cur) $('#voiceSel').value = cur.voiceURI;
  $('#voiceRate').value = prefs.rate; $('#voiceRateOut').textContent = '×' + Number(prefs.rate).toFixed(1);
  $('#voiceVol').value = prefs.vol; $('#voiceVolOut').textContent = Math.round(prefs.vol * 100) + '%';
}
if (canSpeak) speechSynthesis.addEventListener('voiceschanged', renderVoiceSettings);
$('#voiceSel').addEventListener('change', (ev) => { prefs.voice = ev.target.value; savePrefs(); say('Pokémon'); });
$('#voiceRate').addEventListener('input', (ev) => { prefs.rate = Number(ev.target.value); savePrefs(); $('#voiceRateOut').textContent = '×' + prefs.rate.toFixed(1); });
$('#voiceVol').addEventListener('input', (ev) => { prefs.vol = Number(ev.target.value); savePrefs(); $('#voiceVolOut').textContent = Math.round(prefs.vol * 100) + '%'; });
$('#voiceTest').addEventListener('click', () => say('Pokémon'));

// ---- お店の出店先（町の名前がネタバレになる場合は伏せる） ----
const townVisible = (t) => { const p = ENTRIES.find((x) => x.c === 'place' && x.ja === t); return !p || !!prefs.spoil[p.sp]; };
function locHTML(e) {
  const vis = e.loc.filter(([t]) => townVisible(t));
  const hidden = e.loc.length - vis.length;
  return vis.map(([t, n]) => `<span class="town">${esc(t)}${n ? `<small>×${n}</small>` : ''}</span>`).join('') + (hidden ? `<small class="mnote">ほか ${hidden} か所（ネタバレ範囲外の町）</small>` : '');
}
function shopMatrixHTML(shops) {
  const L = SHOPLOC_ALL;
  const towns = L.SHOP_TOWNS.filter(townVisible);
  const rows = shops.filter((e) => e.loc);
  if (!rows.length || !towns.length) return '';
  const cell = (e, t) => { const h = e.loc.find(([x]) => x === t); return h ? `<td class="on" title="${esc(e.ja)}：${esc(t)}${h[1] ? ' ' + h[1] + '店舗' : ''}">${h[1] || '●'}</td>` : '<td></td>'; };
  const short = (t) => t.replace(/タウン|シティ/, '');
  return `<details class="shop-map"><summary>出店先の一覧と傾向（町ごとのお店）</summary>
    <div class="shop-map-scroll"><table><thead><tr><th></th>${towns.map((t) => `<th><span>${esc(short(t))}</span></th>`).join('')}</tr></thead>
    <tbody>${rows.map((e) => `<tr><th>${esc(e.ja)}</th>${towns.map((t) => cell(e, t)).join('')}</tr>`).join('')}</tbody></table></div>
    <p class="hint">● は1店舗、数字は店舗数。フレンドリィショップ（ポケモンセンターの中）は除いています。</p>
    <h4>出店先から読み取れる傾向（推測）</h4>
    <ul class="shop-notes">${L.SHOP_NOTES.filter(([, d]) => L.SHOP_TOWNS.every((t) => townVisible(t) || !d.includes(t))).map(([h, d]) => `<li><b>${esc(h)}</b>　${esc(d)}</li>`).join('')}</ul>
  </details>`;
}
const SHOPLOC_ALL = { SHOP_TOWNS, SHOP_LOCS, SHOP_NOTES };

function entryHTML(e, opts = {}) {
  const s = stats[e.id];
  const many = theories(e.jo).length + theories(e.eo).length > 2;
  const badges = [
    `<span class="badge cat">${esc(CATS[e.c].short)}</span>`,
    e.ty ? typeHTML(e.ty) : '',
    e.p ? `<span class="badge" title="パルデア図鑑の番号">パルデア ${pad(e.p, 3)}</span>` : '',
    e.no ? `<span class="badge" title="全国図鑑の番号">全国 ${pad(e.no, 4)}</span>` : '',
    e.tm ? `<span class="badge" title="わざマシンの番号">わざマシン ${pad(e.tm, 3)}</span>` : '',
    `<span class="badge ${SP_CLASS[e.sp]}" title="${esc(SPOILERS[e.sp].desc)}">${esc(SPOILERS[e.sp].label)}</span>`,
    many ? '<span class="badge" title="由来の説が複数あります">諸説あり</span>' : '',
    e.unk ? '<span class="badge unk" title="裏取りできなかった点があります">不明点あり</span>' : '',
    confStars(e.cf)
  ].join('');
  const links = e.c === 'pokemon' ? [
    link(`https://zukan.pokemon.co.jp/detail/${pad(e.no, 4)}`, '公式ずかん'),
    prefs.en ? link(`https://www.pokemon.com/us/pokedex/${dexSlug(e.en)}`, 'Pokédex (EN)') : '',
    link(`https://wiki.xn--rckteqa2e.com/wiki/${encodeURIComponent(e.ja)}`, 'ポケモンWiki'),
    prefs.en ? link(`https://bulbapedia.bulbagarden.net/wiki/${encodeURIComponent(e.en.replace(/ /g, '_'))}_(Pok%C3%A9mon)`, 'Bulbapedia') : ''
  ].join('') : '';
  const cat = e.cat ? esc(e.cat[0]) + (prefs.en ? `<span class="cat-en" lang="en">${esc(e.cat[1])}${sayBtn(e.cat[1])}</span>` : '') : '';
  const stat = s ? `<span>正答 ${s[0]} / ${s[0] + s[1]}</span>` : '';
  return `<article class="entry${opts.hide ? ' hidden-answer' : ''}${opts.cls ? ' ' + opts.cls : ''}" data-id="${esc(e.id)}">
    <div class="entry-head">
      <span class="entry-name">${esc(e.ja)}</span>
      ${prefs.en ? `<span class="entry-en" lang="en">${esc(e.en)}${sayBtn(e.en)}</span>` : ''}
      <span class="entry-badges">${badges}</span>
    </div>
    <dl class="origin">
      <dt>日本語名</dt><dd>${theoryHTML(e.jo)}</dd>
      ${prefs.en ? `<dt>英語名</dt><dd>${theoryHTML(e.eo)}</dd>` : ''}
      ${e.mcls ? `<dt class="ev">性能</dt><dd class="ev mstats">${moveHTML(e)}</dd>` : ''}
      ${prefs.ev && cat ? `<dt class="ev">公式の分類</dt><dd class="ev">${cat}</dd>` : ''}
      ${e.c === 'pokemon' && prefs.evo ? `<dt class="ev">進化</dt><dd class="ev evo">${e.evo ? evoHTML(e) : '進化しない'}</dd>` : ''}
      ${e.fm ? `<dt class="ev">姿</dt><dd class="ev">${formHTML(e)}</dd>` : ''}
      ${foodHTML(e)}
      ${e.loc ? `<dt class="ev">出店している町</dt><dd class="ev">${locHTML(e)}</dd>` : ''}
      ${prefs.ev && e.ev ? `<dt class="ev">根拠・補足</dt><dd class="ev">${esc(e.ev)}</dd>` : ''}
      ${e.unk ? `<dt class="unk">分からないこと</dt><dd class="unk">${esc(e.unk)}</dd>` : ''}
    </dl>
    ${links || stat ? `<div class="entry-foot">${links}${stat}</div>` : ''}
  </article>`;
}

/* ================= Spoiler bar ================= */
function renderSpoilBar() {
  const on = SPOILERS.filter((_, i) => prefs.spoil[i]).map((s) => s.label);
  const vis = visibleEntries().length;
  $('#spoilBar').innerHTML = `<span>🔒 ネタバレ範囲：<b>${on.length ? esc(on.join('・')) : 'なし'}</b></span>
    <span>表示 ${vis} / ${ENTRIES.length} 件</span>
    <button class="text-btn" type="button" data-go="settings">変更</button>`;
}
document.addEventListener('click', (ev) => {
  const go = ev.target.closest('[data-go]');
  if (!go) return;
  showView(go.dataset.go);
  if (go.dataset.go === 'settings') {
    const p = $('#spoilPanel');
    p.classList.remove('flash'); void p.offsetWidth; p.classList.add('flash');
  }
});

/* ================= Views ================= */
const VIEWS = ['list', 'quiz', 'coverage', 'settings', 'about'];
function showView(name) {
  if (!VIEWS.includes(name)) name = 'list';
  VIEWS.forEach((v) => {
    const el = $('#view-' + v);
    if (v === name) el.setAttribute('data-active', ''); else el.removeAttribute('data-active');
  });
  $$('.nav-item').forEach((b) => { if (b.dataset.view === name) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  store.set('pmz.view', name);
  $('#spoilBar').hidden = name === 'settings'; // 設定ではその場で変えられるので出さない
  if (name === 'list') renderList();
  if (name === 'coverage') renderCoverage();
  if (name === 'quiz') renderQuizSetup();
  window.scrollTo(0, 0);
}
$$('.nav-item').forEach((b) => b.addEventListener('click', () => showView(b.dataset.view)));

function refreshAll() {
  renderSpoilBar();
  renderSettings();
  renderQuizSetup();
  if ($('#view-list').hasAttribute('data-active')) renderList();
}

/* ================= Quiz ================= */
const MODES = [
  { id: 'origin', tag: 'NAME → ORIGIN', title: '元ネタ当て', desc: '名前を見て、日本語名の由来を選ぶ', prompt: 'この名前の由来は？',
    q: (e) => ({ main: e.ja, sub: prefs.en ? e.en : '' }), a: (e) => main(e.jo), longAnswer: true },
  { id: 'name', tag: 'ORIGIN → NAME', title: '名前当て', desc: '由来の説明から、どの名前かを選ぶ', prompt: 'この由来をもつ名前は？',
    q: (e) => ({ main: main(e.jo), long: true, badge: CATS[e.c].short }), a: (e) => e.ja },
  { id: 'ja2en', en: true, tag: 'JA → EN', title: '英語名当て', desc: '日本語名から英語版の名前を選ぶ', prompt: '英語版の名前は？',
    q: (e) => ({ main: e.ja, badge: CATS[e.c].short }), a: (e) => e.en },
  { id: 'en2ja', en: true, tag: 'EN → JA', title: '日本語名当て', desc: '英語名から日本語版の名前を選ぶ', prompt: '日本語版の名前は？',
    q: (e) => ({ main: e.en, badge: CATS[e.c].short }), a: (e) => e.ja },
  { id: 'eorigin', en: true, tag: 'EN ORIGIN', title: '英語名の元ネタ', desc: '英語名を見て、英語名の由来を選ぶ', prompt: 'この英語名の由来は？',
    q: (e) => ({ main: e.en, sub: e.ja }), a: (e) => main(e.eo), longAnswer: true, ok: (e) => !/^日本語名と同じ/.test(main(e.eo)) },
  { id: 'card', tag: 'FLASH CARD', title: 'めくりカード', desc: '由来を思い出してから、めくって確かめる', prompt: '由来を思い出したら「めくる」',
    q: (e) => ({ main: e.ja, sub: prefs.en ? e.en : '', badge: CATS[e.c].short }), card: true }
];
let quizCats = Object.assign(Object.fromEntries(CAT_KEYS.map((k) => [k, true])), store.get('pmz.quizCats', {}));
const quizOpts = Object.assign({ count: '10', distract: 'same', weak: true, auto: false }, store.get('pmz.quizOpts', {}));

function quizPool(mode) {
  return visibleEntries().filter((e) => quizCats[e.c] && (!mode || !mode.ok || mode.ok(e)));
}

function renderQuizSetup() {
  const modes = MODES.filter((m) => !m.en || prefs.en);
  $('#modeList').innerHTML = modes.map((m) => `<button class="mode" type="button" data-mode="${m.id}">
      <span class="mode-tag">${esc(m.tag)}</span><span class="mode-title">${esc(m.title)}</span><span class="mode-desc">${esc(m.desc)}</span>
    </button>`).join('');
  const vis = visibleEntries();
  $('#quizCats').innerHTML = CAT_KEYS.filter((k) => prefs.cats[k]).map((k) => {
    const n = vis.filter((e) => e.c === k).length;
    return `<button class="chip" type="button" data-qcat="${k}" aria-pressed="${!!quizCats[k]}">${esc(CATS[k].label)}<span class="n">${n}</span></button>`;
  }).join('');
  const n = quizPool().length;
  $('#poolHint').textContent = n < 2
    ? '出題できる問題がありません。「設定」でネタバレ範囲やカテゴリを増やしてください。'
    : `いまの設定で出題されるのは ${n} 件です（ネタバレ範囲は「設定」で変更）。`;
  $('#optCount').value = quizOpts.count;
  $('#optDistract').value = quizOpts.distract;
  $('#optWeak').checked = quizOpts.weak;
  $('#optAuto').checked = quizOpts.auto;
  $('#settingsSummary').textContent = `${quizOpts.count === '0' ? '全部' : quizOpts.count + '問'}・${n}件から`;
}
$('#modeList').addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-mode]');
  if (b) startQuiz(MODES.find((m) => m.id === b.dataset.mode));
});
$('#quizCats').addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-qcat]');
  if (!b) return;
  quizCats[b.dataset.qcat] = !quizCats[b.dataset.qcat];
  store.set('pmz.quizCats', quizCats);
  renderQuizSetup();
});
[['optCount', 'count', 'value'], ['optDistract', 'distract', 'value'], ['optWeak', 'weak', 'checked'], ['optAuto', 'auto', 'checked']].forEach(([id, key, prop]) => {
  $('#' + id).addEventListener('change', (ev) => { quizOpts[key] = ev.target[prop]; store.set('pmz.quizOpts', quizOpts); renderQuizSetup(); });
});

let Q = null; // current quiz state

function pickWeighted(list, n) {
  const items = list.map((e) => {
    const s = stats[e.id] || [0, 0];
    const w = quizOpts.weak ? Math.max(0.4, 1 + s[1] * 1.5 - s[0] * 0.4) : 1;
    return { e, key: Math.pow(Math.random(), 1 / w) };
  });
  items.sort((a, b) => b.key - a.key);
  return items.slice(0, n).map((x) => x.e);
}

function startQuiz(mode, onlyThese) {
  const pool = quizPool(mode);
  if (pool.length < 2) { showView('quiz'); $('#settingsBox').open = true; return; }
  const count = Number(quizOpts.count) || pool.length;
  // 問題文が同じで正解が複数になるもの（例：英語名が同じ OL とビジネスマン）は出題しない
  const amb = quizAmbiguous(mode.id, pool);
  const askable = pool.filter((e) => !amb.has(e));
  const qs = onlyThese ? shuffle(onlyThese.filter((e) => !amb.has(e))) : pickWeighted(askable, Math.min(count, askable.length));
  if (!qs.length) { showView('quiz'); return; }
  Q = { mode, pool, qs, i: 0, score: 0, log: [] };
  $('#quizSetup').hidden = true; $('#quizResult').hidden = true; $('#quizPlay').hidden = false;
  document.body.classList.add('playing');
  window.scrollTo(0, 0);
  renderQuestion();
}

function buildChoices(e) {
  const mode = Q.mode;
  const correct = mode.a(e);
  const qText = mode.q(e).main;
  // 問題文が同じになる（＝どちらも正解になりうる）ものは選択肢に入れない
  const others = (list) => shuffle(list.filter((x) => x !== e && mode.a(x) && mode.a(x) !== correct && mode.q(x).main !== qText));
  let cands = quizOpts.distract === 'same' ? others(Q.pool.filter((x) => x.c === e.c)) : [];
  if (cands.length < 3) cands = cands.concat(others(Q.pool.filter((x) => !cands.includes(x))));
  const seen = new Set([correct]);
  const picks = [];
  for (const x of cands) {
    const a = mode.a(x);
    if (seen.has(a)) continue;
    seen.add(a); picks.push(x);
    if (picks.length === 3) break;
  }
  return shuffle([e, ...picks]);
}

function renderQuestion() {
  const e = Q.qs[Q.i];
  const mode = Q.mode;
  Q.answered = false;
  $('#progressLabel').textContent = `${Q.i + 1} / ${Q.qs.length}`;
  $('#scoreLabel').textContent = mode.card ? `覚えた ${Q.score}` : `${Q.score} 正解`;
  $('#progressBar').style.width = `${(Q.i / Q.qs.length) * 100}%`;
  $('#prompt').textContent = mode.prompt;
  const q = mode.q(e);
  $('#qCard').innerHTML = `${q.badge ? `<div class="q-badges"><span class="badge cat">${esc(q.badge)}</span></div>` : ''}
    <div class="q-main${q.long ? ' long' : ''}"${/[a-z]/i.test(q.main) && !q.long ? ' lang="en"' : ''}>${esc(q.main)}${/^[\x20-\x7eé’&]+$/.test(q.main) ? sayBtn(q.main) : ''}</div>
    ${q.sub ? `<div class="q-sub">${esc(q.sub)}</div>` : ''}`;
  $('#explain').innerHTML = '';
  $('#nextBtn').hidden = true;
  $('#flipBtn').hidden = !mode.card;
  $('#knownYes').hidden = true; $('#knownNo').hidden = true;
  if (mode.card) { $('#choices').innerHTML = ''; return; }
  Q.choices = buildChoices(e);
  $('#choices').innerHTML = Q.choices.map((x, i) =>
    `<button class="choice" type="button" data-i="${i}"><span class="key">${i + 1}</span><span>${esc(mode.a(x))}</span></button>`).join('');
}

function answer(i) {
  if (!Q || Q.answered || Q.mode.card) return;
  const e = Q.qs[Q.i];
  const chosen = Q.choices[i];
  if (!chosen) return;
  Q.answered = true;
  const ok = chosen === e;
  if (ok) Q.score++;
  record(e, ok);
  Q.log.push({ e, ok });
  $$('#choices .choice').forEach((b, j) => {
    b.disabled = true;
    if (Q.choices[j] === e) b.classList.add('correct');
    else if (j === i) b.classList.add('wrong');
  });
  $('#scoreLabel').textContent = `${Q.score} 正解`;
  $('#explain').innerHTML = entryHTML(e);
  $('#nextBtn').hidden = false;
  $('#nextBtn').textContent = Q.i + 1 < Q.qs.length ? '次へ' : '結果を見る';
  if (ok && quizOpts.auto) setTimeout(() => { if (Q && Q.answered && Q.qs[Q.i] === e) next(); }, 1100);
  else $('#nextBtn').focus({ preventScroll: true });
}
$('#choices').addEventListener('click', (ev) => {
  const b = ev.target.closest('.choice');
  if (b) answer(Number(b.dataset.i));
});

function flip() {
  if (!Q || !Q.mode.card || Q.answered) return;
  Q.answered = 'flipped';
  $('#explain').innerHTML = entryHTML(Q.qs[Q.i]);
  $('#flipBtn').hidden = true;
  $('#knownYes').hidden = false; $('#knownNo').hidden = false;
}
function selfGrade(ok) {
  if (!Q || Q.answered !== 'flipped') return;
  const e = Q.qs[Q.i];
  Q.answered = true;
  if (ok) Q.score++;
  record(e, ok);
  Q.log.push({ e, ok });
  next();
}
$('#flipBtn').addEventListener('click', flip);
$('#qCard').addEventListener('click', () => { if (Q && Q.mode.card) flip(); });
$('#knownYes').addEventListener('click', () => selfGrade(true));
$('#knownNo').addEventListener('click', () => selfGrade(false));

function next() {
  if (!Q) return;
  Q.i++;
  if (Q.i >= Q.qs.length) { showResult(); return; }
  renderQuestion();
  window.scrollTo(0, 0);
}
$('#nextBtn').addEventListener('click', next);

function showResult() {
  document.body.classList.remove('playing');
  $('#quizPlay').hidden = true; $('#quizResult').hidden = false;
  const total = Q.qs.length;
  const r = Q.score / total;
  $('#resultMode').textContent = Q.mode.title;
  $('#resultScore').textContent = Q.score;
  $('#resultTotal').textContent = ` / ${total}`;
  $('#resultTitle').textContent = r === 1 ? 'パーフェクト！ 名づけ博士です' : r >= 0.8 ? 'すばらしい！ かなり詳しいですね' : r >= 0.5 ? 'いい調子！ 一覧で復習してみましょう' : 'これから覚えていきましょう';
  const misses = Q.log.filter((x) => !x.ok).map((x) => x.e);
  $('#retryMissBtn').hidden = misses.length === 0;
  $('#review').innerHTML = `<h2 class="sub-head">ふりかえり</h2>` + Q.log.map((x) => entryHTML(x.e, { cls: x.ok ? 'hit' : 'miss' })).join('');
  window.scrollTo(0, 0);
}
$('#againBtn').addEventListener('click', () => startQuiz(Q.mode));
$('#retryMissBtn').addEventListener('click', () => startQuiz(Q.mode, Q.log.filter((x) => !x.ok).map((x) => x.e)));
$('#backBtn').addEventListener('click', quitQuiz);
$('#quitBtn').addEventListener('click', quitQuiz);
function quitQuiz() {
  Q = null;
  document.body.classList.remove('playing');
  $('#quizPlay').hidden = true; $('#quizResult').hidden = true; $('#quizSetup').hidden = false;
  renderQuizSetup();
  window.scrollTo(0, 0);
}

document.addEventListener('keydown', (ev) => {
  if (!Q || $('#quizPlay').hidden || ev.target.matches('input, select, textarea')) return;
  if (/^[1-4]$/.test(ev.key)) { answer(Number(ev.key) - 1); ev.preventDefault(); }
  else if (ev.key === 'Enter' || ev.key === ' ') {
    if (Q.mode.card) { if (!Q.answered) flip(); else if (Q.answered === 'flipped') selfGrade(true); }
    else if (Q.answered) next();
    ev.preventDefault();
  } else if (ev.key === 'Escape') quitQuiz();
});

/* ================= List ================= */
let libCat = 'all';
function renderList() {
  const vis = visibleEntries();
  const cats = CAT_KEYS.filter((k) => prefs.cats[k]);
  if (libCat !== 'all' && !cats.includes(libCat)) libCat = 'all';
  $('#libCats').innerHTML = [`<button class="chip" type="button" data-lcat="all" aria-pressed="${libCat === 'all'}">すべて<span class="n">${vis.length}</span></button>`]
    .concat(cats.map((k) => `<button class="chip" type="button" data-lcat="${k}" aria-pressed="${libCat === k}">${esc(CATS[k].label)}<span class="n">${vis.filter((e) => e.c === k).length}</span></button>`)).join('');

  $('#libCatSel').textContent = '：' + (libCat === 'all' ? 'すべて' : CATS[libCat].label);
  const q = norm($('#libSearch').value.trim());
  let list = vis.filter((e) => libCat === 'all' || e.c === libCat);
  renderTypeFilter();
  if (libTypes.length) list = list.filter((e) => e.c === 'pokemon' && libTypes.every((t) => (e.ty || []).includes(t)));
  if (q) list = list.filter((e) => norm([e.ja, ...theories(e.jo), e.ev, ...(e.ty || []), e.mcls || '', e.sub || '', ...(e.fm || []).map((f) => f[0] + ' ' + f[1]), e.cat ? e.cat[0] : '', e.no ? pad(e.no, 4) : '', e.p ? 'パルデア' + pad(e.p, 3) : '', e.tm ? 'わざマシン' + pad(e.tm, 3) + ' 技マシン' + pad(e.tm, 3) : ''].concat(prefs.en ? [e.en, ...theories(e.eo), e.cat ? e.cat[1] : ''] : []).join(' ')).includes(q));
  if (foodPow.p) list = list.filter((e) => e.c !== 'food' || foodMatch(e));
  const sort = $('#libSort').value;
  if (sort === 'default') list.sort((a, b) => (a.c === b.c && a.ord != null && b.ord != null ? a.ord - b.ord : a.idx - b.idx));
  else if (sort === 'power') list.sort((a, b) => (b.c === 'move') - (a.c === 'move') || (b.pw || 0) - (a.pw || 0) || (a.ord || 0) - (b.ord || 0) || a.idx - b.idx);
  else if (sort === 'kana') list.sort((a, b) => toHira(a.ja).localeCompare(toHira(b.ja), 'ja'));
  else if (sort === 'en') list.sort((a, b) => a.en.localeCompare(b.en, 'en'));
  else if (sort === 'paldea') list.sort((a, b) => (a.p || 9999) - (b.p || 9999) || (a.tm || 999) - (b.tm || 999));
  else if (sort === 'national') list.sort((a, b) => (a.no || 9999) - (b.no || 9999) || (a.tm || 999) - (b.tm || 999));
  else if (sort === 'weak') list.sort((a, b) => (rate(a) ?? 2) - (rate(b) ?? 2));

  const hiddenBySpoiler = ENTRIES.filter((e) => prefs.cats[e.c] && !prefs.spoil[e.sp]).length;
  $('#libCount').textContent = `${list.length} 件を表示` + (hiddenBySpoiler ? `（ネタバレ設定で ${hiddenBySpoiler} 件を非表示）` : '');
  libItems = list;
  // 食事パワーで絞り込み中は、該当が0件でも料理のグループ（絞り込みの操作）を残す
  const keepFood = foodPow.p && prefs.cats.food && (libCat === 'all' || libCat === 'food') && !libTypes.length;
  if (!list.length && !keepFood) { $('#libList').innerHTML = '<p class="empty">該当する名前がありません。</p>'; return; }
  // 検索中や、カテゴリを1つに絞ったときは開いた状態で表示する
  const autoOpen = !!q || libCat !== 'all' || libTypes.length > 0;
  const groups = CAT_KEYS.map((k) => [k, list.filter((e) => e.c === k)]).filter(([k, a]) => a.length || (k === 'food' && keepFood));
  $('#libList').innerHTML = groups.map(([k, a]) => {
    const open = autoOpen || libOpen.has(k) || (k === 'food' && !!foodPow.p);
    return `<details class="lib-group" data-gcat="${k}"${open ? ' open' : ''}>
      <summary><span>${esc(CATS[k].label)}</span><span class="n">${a.length} 件</span></summary>
      <div class="lib-body">${open ? groupBody(k) : ''}</div>
    </details>`;
  }).join('');
}
// ---- ポケモンのタイプで絞り込む（2つまで。2つなら両方を持つポケモン） ----
let libTypes = (store.get('pmz.libTypes', []) || []).filter((t) => TYPE_KEYS[t]).slice(0, 2);
function renderTypeFilter() {
  $('#libTypes').innerHTML = Object.keys(TYPE_KEYS).map((t) => {
    const on = libTypes.includes(t);
    const off = !on && libTypes.length >= 2;
    return `<button type="button" class="type t-${TYPE_KEYS[t]} type-btn" data-type="${esc(t)}" aria-pressed="${on}"${off ? ' disabled' : ''}>${esc(t)}</button>`;
  }).join('');
  $('#libTypeSel').innerHTML = libTypes.length ? '：' + typeHTML(libTypes) : '';
  $('#libTypeClear').hidden = !libTypes.length;
}
$('#libTypes').addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-type]');
  if (!b || b.disabled) return;
  const t = b.dataset.type;
  libTypes = libTypes.includes(t) ? libTypes.filter((x) => x !== t) : libTypes.concat(t).slice(0, 2);
  store.set('pmz.libTypes', libTypes);
  renderList();
});
$('#libTypeClear').addEventListener('click', () => { libTypes = []; store.set('pmz.libTypes', libTypes); renderList(); });
if (libTypes.length) $('#libTypeBox').open = true;

// ---- 食事パワーで絞り込む ----
// タマゴパワー・二つ名パワー・かがやきパワーはパワーだけ、ほかはパワー＋タイプ（タイプは指定しなくてもよい）
const FOOD_POWERS = ['タマゴ', 'そうぐう', 'ほかく', 'けいけんち', 'おとしもの', 'レイド', 'でかでか', 'ちびちび', '二つ名', 'かがやき'];
const POWER_NOTE = { タマゴ: 'ピクニックのバスケットにタマゴが見つかりやすくなる', そうぐう: 'そのタイプのポケモンに出会いやすくなる', ほかく: 'そのタイプのポケモンを捕まえやすくなる', けいけんち: 'そのタイプのポケモンを倒したときの経験値が増える', おとしもの: 'そのタイプのポケモンの落とし物が増える', レイド: 'そのタイプのテラレイドで、もらえる道具が増える', でかでか: 'そのタイプの大きいポケモンに出会いやすくなる', ちびちび: 'そのタイプの小さいポケモンに出会いやすくなる', 二つ名: 'そのタイプの、あかしの付いたポケモンに出会いやすくなる', かがやき: 'そのタイプの色違いのポケモンに出会いやすくなる（ひでんスパイスを2つ以上使ったときだけ）' };
const TYPELESS = ['タマゴ'];
let foodPow = Object.assign({ p: '', t: '' }, store.get('pmz.foodPow', {}));
if (!FOOD_POWERS.includes(foodPow.p)) foodPow = { p: '', t: '' };
if (!TYPE_KEYS[foodPow.t]) foodPow.t = '';
// 「そうぐう：ゴースト Lv1」のような文字列が、選んだパワー（とタイプ）に合うか
function powMatch(s) {
  const m = s.match(/^(.+?)(?:：(.+?))? Lv\d$/);
  if (!m || m[1] !== foodPow.p) return false;
  return !foodPow.t || m[2] === foodPow.t;
}
function foodMatch(e) {
  if (e.menu) return e.menu.sets ? e.menu.sets.some(([, p]) => p.some(powMatch)) : e.menu.powers.some(powMatch);
  if (e.recipes) return e.recipes.some(([, , p]) => p.some(powMatch));
  if (e.ingv) {
    // 材料：そのパワーの値がプラスで、タイプの値もある（全タイプの材料を含む）
    const [, pw, ty] = e.ingv;
    const hasP = pw.some(([k, n]) => k === foodPow.p && n > 0);
    return hasP && (!foodPow.t || TYPELESS.includes(foodPow.p) || ty.some(([k, n]) => (k === foodPow.t || k === '全タイプ') && n > 0));
  }
  return false;
}
function foodFilterHTML() {
  // ボタンの件数は、ネタバレ範囲・検索・カテゴリの絞り込みを反映した料理の中で数える
  const base = visibleEntries().filter((e) => e.c === 'food' && (e.menu || e.recipes || e.ingv));
  const count = (p, t) => { const keep = foodPow; foodPow = { p, t }; const n = base.filter(foodMatch).length; foodPow = keep; return n; };
  const typed = foodPow.p && !TYPELESS.includes(foodPow.p);
  const sel = foodPow.p ? foodPow.p + 'パワー' + (foodPow.t ? '：' + foodPow.t : '') : '';
  return `<details class="type-filter food-filter"${foodPow.p || foodFilterOpen ? ' open' : ''}>
    <summary>食事パワーで絞り込む${sel ? `<span class="sel">：${esc(sel)}</span>` : ''}</summary>
    <div class="ff-step"><span class="ff-label">① パワー</span><div class="chips">${FOOD_POWERS.map((p) => { const n = count(p, ''); return `<button type="button" class="chip" data-fpow="${esc(p)}" aria-pressed="${foodPow.p === p}"${n ? '' : ' disabled'}>${esc(p)}<span class="n">${n}</span></button>`; }).join('')}</div></div>
    ${foodPow.p ? `<p class="hint ff-note">${esc(foodPow.p)}パワー：${esc(POWER_NOTE[foodPow.p])}。</p>` : ''}
    ${typed ? `<div class="ff-step"><span class="ff-label">② タイプ<small>（任意）</small></span><div class="type-btns"><button type="button" class="chip" data-ftype="" aria-pressed="${!foodPow.t}">指定なし</button>${Object.keys(TYPE_KEYS).map((t) => { const n = count(foodPow.p, t); return `<button type="button" class="type t-${TYPE_KEYS[t]} type-btn" data-ftype="${esc(t)}" aria-pressed="${foodPow.t === t}"${n ? '' : ' disabled'} title="${n} 件">${esc(t)}</button>`; }).join('')}</div></div>` : ''}
    ${foodPow.p && !typed ? `<p class="hint ff-note">このパワーはタイプに関係なく付くので、パワーだけで絞り込みます。</p>` : ''}
    ${foodPow.p ? `<p class="hint ff-note">メニュー・サンドウィッチのレシピ・材料から探します。材料は「そのパワーの値がある」ものです。<button class="text-btn" type="button" data-fclear>絞り込みを解除</button></p>` : `<p class="hint ff-note">パワーを選ぶと、タイプも選べます（タイプのないタマゴパワーは、パワーだけ）。</p>`}
  </details>`;
}
let foodFilterOpen = false;
$('#libList').addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-fpow], [data-ftype], [data-fclear]');
  if (!b || b.disabled) return;
  if (b.hasAttribute('data-fclear')) foodPow = { p: '', t: '' };
  else if (b.dataset.fpow != null) foodPow = foodPow.p === b.dataset.fpow ? { p: '', t: '' } : { p: b.dataset.fpow, t: '' };
  else foodPow.t = foodPow.t === b.dataset.ftype ? '' : b.dataset.ftype;
  foodFilterOpen = true;
  store.set('pmz.foodPow', foodPow);
  const y = window.scrollY;
  renderList();
  window.scrollTo(0, y);
});

// 閉じているグループは中身を作らず、開いたときに作る（件数が多いため）
let libItems = [];
const libOpen = new Set(store.get('pmz.libOpen', []));
function groupBody(k) {
  const items = libItems.filter((e) => e.c === k);
  const order = (typeof SUB_ORDER !== 'undefined' && SUB_ORDER[k]) || null;
  if (k === 'shop') return shopMatrixHTML(items) + cardsHTML(items);
  if (k === 'food') return foodFilterHTML() + (items.length ? '' : '<p class="empty">この食事パワーが付く料理・材料はありません（ネタバレ範囲外のものは数えていません）。</p>') + subsHTML(k, items, order);
  if (!order) return cardsHTML(items);
  return subsHTML(k, items, order);
}
function subsHTML(k, items, order) {
  // 小分類ごとに、さらに折りたたむ（検索中・食事パワーで絞り込み中は開く）
  const autoOpen = !!$('#libSearch').value.trim() || (k === 'food' && !!foodPow.p);
  return order.map((sub) => [sub, items.filter((e) => e.sub === sub)]).filter(([, a]) => a.length).map(([sub, a]) => {
    const key = k + '/' + sub;
    const open = autoOpen || libOpen.has(key);
    return `<details class="lib-sub" data-gcat="${esc(key)}"${open ? ' open' : ''}>
      <summary><span>${esc(sub)}</span><span class="n">${a.length} 件</span></summary>
      <div class="lib-body">${open ? cardsHTML(a) : ''}</div>
    </details>`;
  }).join('');
}
function cardsHTML(list) {
  const hide = $('#libHide').checked;
  return list.map((e) => entryHTML(e, { hide })).join('');
}
function subBody(key) {
  const [k, sub] = key.split('/');
  return cardsHTML(libItems.filter((e) => e.c === k && e.sub === sub));
}
$('#libList').addEventListener('toggle', (ev) => {
  const d = ev.target;
  if (!d.matches || !d.matches('.lib-group, .lib-sub')) return;
  const k = d.dataset.gcat;
  const body = d.querySelector(':scope > .lib-body');
  if (d.open && !body.innerHTML) body.innerHTML = d.matches('.lib-sub') ? subBody(k) : groupBody(k);
  // 検索していないときの開閉だけを覚えておく
  if (!$('#libSearch').value.trim() && libCat === 'all') {
    if (d.open) libOpen.add(k); else libOpen.delete(k);
    store.set('pmz.libOpen', [...libOpen]);
  }
}, true);
$('#libExpand').addEventListener('click', () => $$('#libList .lib-group').forEach((d) => { d.open = true; }));
$('#libCollapse').addEventListener('click', () => $$('#libList .lib-group').forEach((d) => { d.open = false; }));
$('#libCats').addEventListener('click', (ev) => {
  const b = ev.target.closest('[data-lcat]');
  if (b) { libCat = b.dataset.lcat; renderList(); }
});
$('#libSearch').addEventListener('input', renderList);
$('#libSort').addEventListener('change', renderList);
$('#libHide').addEventListener('change', () => { store.set('pmz.libHide', $('#libHide').checked); renderList(); });
$('#libHide').checked = !!store.get('pmz.libHide', false);
// 進化の系統の名前から、その名前の一覧へ移動する
document.addEventListener('click', (ev) => {
  const j = ev.target.closest('[data-jump]');
  if (!j) return;
  ev.stopPropagation();
  if (Q) quitQuiz();
  libCat = 'all';
  $('#libSearch').value = j.dataset.jump;
  showView('list');
});
$('#libList').addEventListener('click', (ev) => {
  if (ev.target.closest('a, [data-jump]')) return;
  const card = ev.target.closest('.entry');
  if (card && $('#libHide').checked) card.classList.toggle('hidden-answer');
});

/* ================= Coverage ================= */
const PALETTE = ['var(--accent)', 'var(--accent-2)', '#3f9c86', '#5b76d6', '#c86b9e', '#9a8a6a'];
const pct = (n, d) => (d ? Math.min(100, (n / d) * 100) : 0);
const fmtPct = (n, d) => { const p = pct(n, d); return (p < 10 && p > 0 ? p.toFixed(1) : Math.round(p)) + '%'; };

function stackBar(parts) {
  const total = parts.reduce((s, p) => s + p.n, 0) || 1;
  return `<div class="stack-bar">${parts.map((p, i) => `<span style="width:${(p.n / total) * 100}%;background:${PALETTE[i % PALETTE.length]}" title="${esc(p.label)} ${p.n}"></span>`).join('')}</div>
    <div class="legend">${parts.map((p, i) => `<span><i style="background:${PALETTE[i % PALETTE.length]}"></i>${esc(p.label)} ${p.n}</span>`).join('')}</div>`;
}

function renderCoverage() {
  const count = (fn) => ENTRIES.filter(fn).length;
  const n = (v) => v.toLocaleString('ja-JP');
  $('#covBig').innerHTML = `
    <div class="stat"><b>${n(ENTRIES.length)}</b><span>収録している名前</span></div>
    <div class="stat"><b>${n(count((e) => [e.jo, e.eo].some(Array.isArray)))}</b><span>由来の説を<br>複数並べた名前</span></div>
    <div class="stat"><b>${n(count((e) => !!e.unk))}</b><span>「分からないこと」<br>を書いた名前</span></div>`;

  // カテゴリ：件数の棒と、開くと小分類
  const cats = CAT_KEYS.map((k, i) => ({ k, i, n: count((e) => e.c === k) }));
  const max = Math.max(...cats.map((c) => c.n));
  $('#covCats').innerHTML = cats.map(({ k, i, n: c }) => {
    const subs = ((typeof SUB_ORDER !== 'undefined' && SUB_ORDER[k]) || []).map((s) => [s, count((e) => e.c === k && e.sub === s)]).filter(([, x]) => x);
    const smax = Math.max(1, ...subs.map(([, x]) => x));
    const row = `<span class="cov-label">${esc(CATS[k].label)}</span><span class="cov-num">${n(c)}</span><div class="bar"><span style="width:${(c / max) * 100}%;background:${PALETTE[i % PALETTE.length]}"></span></div>`;
    if (!subs.length) return `<div class="cov-row">${row}</div>`;
    return `<details class="cov-row cov-cat"><summary>${row}</summary><div class="cov-subs">${subs.map(([s, x]) => `<div class="cov-sub"><span>${esc(s)}</span><span class="cov-num">${n(x)}</span><div class="bar thin"><span style="width:${(x / smax) * 100}%;background:${PALETTE[i % PALETTE.length]}"></span></div></div>`).join('')}</div></details>`;
  }).join('');

  // 主な内訳：件数だけ
  const groups = [...new Set(SCOPES.map((s) => s.group))];
  $('#covScopes').innerHTML = groups.map((g) => `<div class="cov-group"><h3>${esc(g)}</h3><ul class="cov-list">${SCOPES.filter((s) => s.group === g).map((s) => `<li><span>${esc(s.label.replace(/（本編 ?\d+ ?種）|（本編 No\.001〜171）/, ''))}</span><b>${n(count(s.match))}</b></li>`).join('')}</ul></div>`).join('');

  // ネタバレ段階 × カテゴリの表（色の濃さ＝件数）
  const cells = CAT_KEYS.map((k) => SPOILERS.map((_, i) => count((e) => e.c === k && e.sp === i)));
  const cmax = Math.max(...cells.flat());
  $('#covSpoil').innerHTML = `<div class="heat-scroll"><table class="heat"><thead><tr><th></th>${SPOILERS.map((s) => `<th>${esc(s.label)}</th>`).join('')}</tr></thead><tbody>${CAT_KEYS.map((k, r) => `<tr><th>${esc(CATS[k].short)}</th>${cells[r].map((x) => `<td${x / cmax > 0.55 ? ' class="hi"' : ''} style="--a:${x ? 0.12 + 0.88 * (x / cmax) : 0}">${x ? n(x) : '—'}</td>`).join('')}</tr>`).join('')}</tbody>
    <tfoot><tr><th>合計</th>${SPOILERS.map((_, i) => `<td>${n(count((e) => e.sp === i))}</td>`).join('')}</tr></tfoot></table></div>`;

  $('#covConf').innerHTML = stackBar([3, 2, 1].map((c) => ({ label: ['', '★ 根拠が弱い・はっきりしない', '★★ 有力な説', '★★★ 綴りや語の対応がはっきり'][c], n: count((e) => e.cf === c) })))
    + `<p class="hint" style="margin:10px 0 0">★の数は、作者の推測の手ごたえの目安です。</p>`;
}

/* ================= Settings ================= */
function spoilChecksHTML(prefix, values) {
  return SPOILERS.map((s, i) => `<label class="check"><input type="checkbox" data-${prefix}="${i}"${values[i] ? ' checked' : ''}>
    <span><b>${esc(s.label)}</b>（${ENTRIES.filter((e) => e.sp === i).length} 件）<small>${esc(s.desc)}</small></span></label>`).join('');
}
function evoChecksHTML(prefix) {
  return `<label class="check"><input type="checkbox" data-${prefix}="evo"${prefs.evo ? ' checked' : ''}> ポケモンの進化の系統（進化前・進化後）を表示する<small>オフにすると、進化先の名前も表示されません</small></label>
    <label class="check"><input type="checkbox" data-${prefix}="evoHow"${prefs.evoHow ? ' checked' : ''}> 進化の方法・条件（レベル、道具、特別な条件など）を表示する</label>`;
}
function renderSettings() {
  renderVoiceSettings();
  $('#spoilChecks').innerHTML = spoilChecksHTML('sp', prefs.spoil);
  $('#catChecks').innerHTML = CAT_KEYS.map((k) => `<label class="check"><input type="checkbox" data-cat="${k}"${prefs.cats[k] ? ' checked' : ''}>
    <span>${esc(CATS[k].label)}（${ENTRIES.filter((e) => e.c === k).length}）</span></label>`).join('');
  $('#optEn').checked = prefs.en;
  $('#optEv').checked = prefs.ev;
  $('#evoChecks').innerHTML = evoChecksHTML('evo');
  $('#spoilDefs').innerHTML = SPOILERS.map((s) => `<dt>${esc(s.label)}</dt><dd>${esc(s.desc)}</dd>`).join('');
}
$('#spoilChecks').addEventListener('change', (ev) => {
  const i = ev.target.dataset.sp;
  if (i == null) return;
  prefs.spoil[Number(i)] = ev.target.checked; savePrefs(); refreshAll();
});
$('#catChecks').addEventListener('change', (ev) => {
  const k = ev.target.dataset.cat;
  if (!k) return;
  prefs.cats[k] = ev.target.checked; savePrefs(); refreshAll();
});
$('#evoChecks').addEventListener('change', (ev) => {
  const k = ev.target.dataset.evo;
  if (!k) return;
  prefs[k] = ev.target.checked; savePrefs(); refreshAll();
});
$('#optEn').addEventListener('change', (ev) => { prefs.en = ev.target.checked; savePrefs(); refreshAll(); });
$('#optEv').addEventListener('change', (ev) => { prefs.ev = ev.target.checked; savePrefs(); refreshAll(); });
$('#resetStats').addEventListener('click', () => {
  if (!confirm('正答率の記録をすべて消します。よろしいですか？')) return;
  stats = {}; saveStats(); refreshAll();
});
$('#showGate').addEventListener('click', openGate);

/* ================= First-run notice ================= */
function openGate() {
  const dlg = $('#gate');
  $('#gateChecks').innerHTML = spoilChecksHTML('gsp', prefs.spoil);
  $('#gateEvoChecks').innerHTML = evoChecksHTML('gevo');
  if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
}
$('#gate').addEventListener('cancel', (ev) => { if (!store.get('pmz.ack', false)) ev.preventDefault(); });
$('#gateForm').addEventListener('submit', () => {
  const vals = $$('#gateChecks input').map((x) => x.checked);
  if (!vals.some(Boolean)) vals[0] = true;
  prefs.spoil = vals;
  $$('#gateEvoChecks input').forEach((x) => { prefs[x.dataset.gevo] = x.checked; });
  savePrefs();
  store.set('pmz.ack', true);
  refreshAll();
});

/* ================= PWA ================= */
let installEvt = null;
window.addEventListener('beforeinstallprompt', (ev) => { ev.preventDefault(); installEvt = ev; $('#installBtn').hidden = false; });
$('#installBtn').addEventListener('click', async () => {
  if (!installEvt) return;
  installEvt.prompt();
  await installEvt.userChoice.catch(() => {});
  installEvt = null; $('#installBtn').hidden = true;
});
if ('serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

/* ================= Boot ================= */
applyTheme();
renderSettings();
renderSpoilBar();
showView(store.get('pmz.view', 'list'));
if (!store.get('pmz.ack', false)) openGate();
