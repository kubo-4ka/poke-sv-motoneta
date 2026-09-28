#!/usr/bin/env node
'use strict';
/*
 * データの整合性チェック
 *   node tools/check.js
 * データを編集したら、tools/coverage.js と合わせて実行してください。問題があると終了コード 1 で終わります。
 *
 * 見ているもの：必須項目の欠け、同じカテゴリ内の名前の重複、パルデア図鑑・わざマシン番号の欠番と重複、
 * 進化・姿・出店先・食事パワーの参照切れ、クイズで正解が決まらない問題、主な内訳の件数の変化。
 * （外部の一覧に対してすべてそろっていることを保証するものではありません。作者のベストエフォートです）
 */
const d = require('../data.js');
const { CATS, SPOILERS, ENTRIES, SCOPES, SHOPLOC, quizAmbiguous, QUIZ_KEYS } = d;

const errors = [];
const warns = [];
const err = (m) => errors.push(m);
const warn = (m) => warns.push(m);
const TYPES = ['ノーマル', 'ほのお', 'みず', 'でんき', 'くさ', 'こおり', 'かくとう', 'どく', 'じめん', 'ひこう', 'エスパー', 'むし', 'いわ', 'ゴースト', 'ドラゴン', 'あく', 'はがね', 'フェアリー'];

// 1. 必須項目
for (const e of ENTRIES) {
  const id = `${e.c}:${e.ja}`;
  if (!CATS[e.c]) err(`不正なカテゴリ ${id}`);
  for (const k of ['ja', 'en', 'jo', 'eo']) if (e[k] == null || e[k] === '' || (Array.isArray(e[k]) && !e[k].length)) err(`${k} が空 ${id}`);
  if (!(e.sp >= 0 && e.sp < SPOILERS.length)) err(`ネタバレ段階が不正 ${id}`);
  if (![1, 2, 3].includes(e.cf)) err(`確からしさが不正 ${id}`);
  if (e.ty) for (const t of e.ty) if (!TYPES.includes(t)) err(`不正なタイプ ${t} ${id}`);
}

// 2. 同じカテゴリ内の重複
const seen = new Map();
for (const e of ENTRIES) {
  const k = e.c + ':' + e.ja;
  if (seen.has(k)) err(`日本語名の重複 ${k}`);
  seen.set(k, e);
}
const enSeen = new Map();
for (const e of ENTRIES) {
  const k = e.c + ':' + e.en;
  if (enSeen.has(k)) warn(`英語名が同じ ${k}（${enSeen.get(k).ja}・${e.ja}）…クイズの EN→JA では出題しません`);
  else enSeen.set(k, e);
}

// 3. 番号の欠番・重複
const seq = (label, nums, from, to) => {
  const set = new Set();
  for (const n of nums) { if (set.has(n)) err(`${label} ${n} が重複`); set.add(n); }
  for (let i = from; i <= to; i++) if (!set.has(i)) err(`${label} ${i} が欠番`);
};
seq('パルデア図鑑', ENTRIES.filter((e) => e.c === 'pokemon' && e.p).map((e) => e.p), 1, 400);
seq('わざマシン', ENTRIES.filter((e) => e.tm).map((e) => e.tm), 1, 171);

// 4. 参照切れ
const pokeNames = new Set(ENTRIES.filter((e) => e.c === 'pokemon').map((e) => e.ja));
for (const e of ENTRIES.filter((x) => x.evo)) for (const stage of e.evo) for (const [n] of stage) if (!pokeNames.has(n)) err(`進化の参照切れ ${e.ja} → ${n}`);
const towns = new Set(ENTRIES.filter((e) => e.c === 'place').map((e) => e.ja));
for (const t of SHOPLOC.SHOP_TOWNS) if (!towns.has(t)) err(`町の参照切れ ${t}`);
const shops = new Set(ENTRIES.filter((e) => e.c === 'shop').map((e) => e.ja));
for (const s of Object.keys(SHOPLOC.SHOP_LOCS)) if (!shops.has(s)) err(`お店の参照切れ ${s}`);
for (const e of ENTRIES) {
  for (const [t] of e.loc || []) if (!towns.has(t)) err(`出店先の町の参照切れ ${e.ja} → ${t}`);
  if (e.menu) {
    for (const s of e.menu.shops) if (!shops.has(s)) err(`メニューのお店の参照切れ ${e.ja} → ${s}`);
    for (const t of e.menu.towns) if (!towns.has(t)) err(`メニューの町の参照切れ ${e.ja} → ${t}`);
    // 食事をするお店だけを「食べられる町」に数える（材料を売るお店はメニューに入れない）
    for (const s of e.menu.shops) if (['缶の大将', 'オーラオーラ', 'ベーカリー オルノ'].includes(s)) err(`材料のお店がメニューに入っている ${e.ja} → ${s}`);
  }
  if (e.buy) for (const t of e.buy.towns) if (!towns.has(t)) err(`材料を買える町の参照切れ ${e.ja} → ${t}`);
}
const ingNames = new Set(ENTRIES.filter((e) => (e.t || []).includes('ing')).map((e) => e.ja));
for (const e of ENTRIES.filter((x) => x.recipes)) for (const [n, ing] of e.recipes) for (const i of ing.split('、')) if (!ingNames.has(i)) err(`レシピの材料の参照切れ ${n} → ${i}`);
for (const k of ['menu', 'sand', 'ing']) {
  const miss = ENTRIES.filter((e) => (e.t || []).includes(k) && !(k === 'menu' ? e.menu : k === 'sand' ? e.recipes : e.ingv));
  for (const e of miss) err(`食事パワーのデータがない ${e.ja}`);
}

// 5. クイズで正解が決まらない問題（アプリは出題しないが、件数を知らせる）
for (const m of Object.keys(QUIZ_KEYS)) {
  const amb = quizAmbiguous(m, ENTRIES);
  if (amb.size) warn(`クイズ ${m}：問題文が同じで正解が複数ある ${amb.size} 件（出題しない）… ${[...amb].map((e) => e.ja).join('・')}`);
}

// 6. 主な内訳の件数（前回から変わっていないか）
for (const s of SCOPES) {
  const n = ENTRIES.filter(s.match).length;
  if (n !== s.total) err(`主な内訳の件数が変わった「${s.label}」: ${n}（data.js の SCOPES では ${s.total}）`);
}

for (const w of warns) console.log('注意: ' + w);
if (errors.length) {
  for (const e of errors) console.log('エラー: ' + e);
  console.log(`\n${errors.length} 件のエラー`);
  process.exit(1);
}
console.log(`OK（${ENTRIES.length} 件。注意 ${warns.length} 件）`);
