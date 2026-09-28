#!/usr/bin/env node
'use strict';
/*
 * data.js（と data-*.js）から収録状況のドキュメント docs/COVERAGE.md を作り直す
 *   node tools/coverage.js
 * データを編集したら実行してください。
 *
 * このアプリは作者のベストエフォートの推測図鑑なので、「何割そろったか」ではなく「何件あるか」だけを載せます。
 */
const fs = require('fs');
const path = require('path');
const { CATS, SPOILERS, ENTRIES, SCOPES, SUB_ORDER } = require('../data.js');

const OUT = path.join(__dirname, '..', 'docs', 'COVERAGE.md');
const count = (fn) => ENTRIES.filter(fn).length;
const bar = (n, max, w = 24) => { const f = Math.max(n ? 1 : 0, Math.round((n / max) * w)); return '█'.repeat(f); };
const catKeys = Object.keys(CATS);

const today = new Date().toISOString().slice(0, 10);
const lines = [];
lines.push('# 収録状況', '');
lines.push(`> \`node tools/coverage.js\` でデータから自動生成しています（最終生成：${today}）。`);
lines.push('> 件数だけを載せていて、ネタバレになる名前は書いていません。');
lines.push('> このアプリは作者の推測をまとめたベストエフォートの図鑑で、ゲームのすべての言葉を網羅することを保証するものではありません。', '');
lines.push(`収録件数：**${ENTRIES.length} 件**（追加コンテンツ「ゼロの秘宝」と、ほかの作品・ポケモンHOME・配信が必要なものは対象外）`, '');

// カテゴリ
const catN = catKeys.map((k) => [k, count((e) => e.c === k)]);
const maxCat = Math.max(...catN.map(([, n]) => n));
lines.push('## カテゴリごとの件数', '');
lines.push('```mermaid', 'pie showData title 収録件数（カテゴリ別）');
for (const [k, n] of catN) lines.push(`  "${CATS[k].label}" : ${n}`);
lines.push('```', '');
lines.push('| カテゴリ | 件数 | |', '| --- | ---: | --- |');
for (const [k, n] of catN) lines.push(`| ${CATS[k].label} | ${n} | \`${bar(n, maxCat)}\` |`);
lines.push('');

// 小分類
lines.push('## 小分類ごとの件数', '');
for (const k of catKeys) {
  const subs = (SUB_ORDER[k] || []).map((s) => [s, count((e) => e.c === k && e.sub === s)]).filter(([, n]) => n);
  if (!subs.length) continue;
  lines.push(`**${CATS[k].label}**：` + subs.map(([s, n]) => `${s} ${n}`).join('／'), '');
}

// 主な内訳（作者が決めた対象範囲ごとの件数）
lines.push('## 主な内訳', '');
lines.push('作者が決めた対象範囲ごとの件数です（範囲の決め方は下の「対象範囲の決め方」）。', '');
lines.push('| 分野 | 内訳 | 件数 |', '| --- | --- | ---: |');
for (const s of SCOPES) lines.push(`| ${s.group} | ${s.label} | ${count(s.match)} |`);
lines.push('');

// ネタバレ段階 × カテゴリ
lines.push('## ネタバレ段階ごとの件数', '');
lines.push('| カテゴリ | ' + SPOILERS.map((s) => s.label).join(' | ') + ' |', '| --- |' + SPOILERS.map(() => ' ---: |').join(''));
for (const k of catKeys) lines.push(`| ${CATS[k].label} | ` + SPOILERS.map((_, i) => count((e) => e.c === k && e.sp === i) || '—').join(' | ') + ' |');
lines.push('| **合計** | ' + SPOILERS.map((_, i) => `**${count((e) => e.sp === i)}**`).join(' | ') + ' |', '');
lines.push(SPOILERS.map((s) => `- **${s.label}**：${s.desc}`).join('\n'), '');

// 推測について
lines.push('## 推測について', '');
lines.push('| 確からしさ | 意味 | 件数 |', '| --- | --- | ---: |');
[[3, '★★★', '綴りや語の対応がはっきりしている'], [2, '★★', '意味や図鑑の説明と合う、よく言われる説'], [1, '★', '根拠が弱い、または由来がはっきりしない']].forEach(([c, l, d]) => {
  lines.push(`| ${l} | ${d} | ${count((e) => e.cf === c)} |`);
});
lines.push('');
lines.push(`- 由来の説を複数並べている名前：**${count((e) => [e.jo, e.eo].some(Array.isArray))} 件**`);
lines.push(`- 「分からないこと」（裏取りできなかった点）を書いている名前：**${count((e) => !!e.unk)} 件**`);
lines.push(`- 進化の系統を載せているポケモン：**${count((e) => e.c === 'pokemon' && e.evo)} 種**／姿・フォルムを載せているポケモン：**${count((e) => e.fm)} 種**`, '');

lines.push('## 対象範囲の決め方', '');
lines.push('- **ポケモン**：本編のパルデア図鑑 400 種と、図鑑にはないが本編の交換・プレゼントで手に入るポケモン（ヌオー・ニャイキング）。');
lines.push('- **わざマシン**：本編のわざマシン No.001〜171（No.172 以降は追加コンテンツ）。技はわざマシンの技と、本編で登場した第9世代の技（スターモービル専用の技を含む）。');
lines.push('- **とくせい**：本編のポケモンが持つとくせい（隠れ特性を含む）。');
lines.push('- **アイテム**：本編（Ver.1.0.0）でバッグに入る道具（わざマシンを除く）。Bulbapedia の第9世代の道具の一覧から、追加コンテンツで増えたものと、ほかの作品・ポケモンHOME・配信がないと手に入らない道具を除いています。');
lines.push('- **人物**：主な登場人物と、本編のパルデアで勝負するトレーナーの種類。');
lines.push('- **地名・お店・料理・ファッション**：本編で行ける場所・お店と、そこで出会う料理・服（追加コンテンツ、ほかの作品のセーブデータ連動、配信で手に入るものは除く）。寿司のセットはまとめて数えています。');
lines.push('- **用語**：ゲームのしくみ、せいかく、リボン・あかし・二つ名、物語・組織の言葉。', '');

lines.push('## これから増やしたいもの', '');
lines.push('- ほかのポケモンが覚える技（レベルアップ・タマゴ技）');
lines.push('- 名前のある NPC、ヌシの呼び名、エリア・洞窟などの細かい地名');
lines.push('');

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, lines.join('\n'));
console.log('wrote ' + path.relative(process.cwd(), OUT));
