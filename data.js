/*
 * ポケモンSV元ネタ推測図鑑 ― 収録データ
 *
 * 対象：『ポケットモンスター スカーレット・バイオレット』本編（追加コンテンツ「ゼロの秘宝」は対象外）
 * 由来はすべて作者の「推測」です。公式が由来を明言しているものはほとんどありません。
 *
 * 1 件の書き方
 *   { c: 'person', ja: 'ネモ', en: 'Nemona', sp: 0, cf: 2,
 *     jo: ['説1', '説2'], eo: '英語名の由来', ev: '根拠・補足', t: ['rival'] }
 *
 *   c  … カテゴリ（CATS のキー）
 *   sp … ネタバレ段階（SPOILERS の番号）。設定でチェックした段階だけが表示・出題される
 *   cf … 推測の確からしさ 3=ほぼ確実（綴り・語の一致が明白） 2=有力 1=諸説・弱い
 *   jo / eo … 日本語名／英語名の由来。諸説あるものは配列で並べる（先頭を代表の説としてクイズに使う）
 *   ev … 根拠・補足
 *   tm … わざマシンの番号
 *   t  … 収録状況の集計用タグ（SCOPES を参照）
 *
 * ファイルの分担
 *   data-pokemon.js … ポケモン（パルデア図鑑 400 種。p＝パルデア図鑑番号、no＝全国図鑑番号、cat＝公式の分類）
 *   data-tm.js      … わざマシンの技（第9世代の技はこのファイルの「技」に番号付きで入れる）
 *   data-items.js   … アイテム（第9世代のアイテムはこのファイル）
 *   data-items2.js  … アイテムの追加分（ドーピング・持ち物・きのみ・大切なもの・ピクニック用品など）
 *   data-materials.js … ポケモンの落とし物（わざマシンの材料）
 *   data-bag.js     … 本編のバッグに入る道具の英語名の一覧（収録状況の分母）
 *   data-fashion.js … ファッション（服・小物・スマホロトムのカバー）
 *   data-life.js    … お店・料理・ピクニック・ファッション・地名の追加分
 *   data.js         … 人物・地名・第9世代のアイテムと技・用語、集計範囲。最後に全ファイルをまとめる
 */

const CATS = {
  pokemon: { label: 'ポケモン', short: 'ポケモン' },
  person:  { label: '人物', short: '人物' },
  place:   { label: '地名・施設', short: '地名' },
  item:    { label: 'アイテム', short: 'アイテム' },
  move:    { label: '技', short: '技' },
  ability: { label: 'とくせい', short: 'とくせい' },
  term:    { label: '用語・組織', short: '用語' },
  food:    { label: '料理・ピクニック', short: '料理' },
  shop:    { label: 'お店', short: 'お店' },
  fashion: { label: 'ファッション', short: 'ファッション' }
};

const SPOILERS = [
  { label: '序盤', desc: 'ゲーム開始〜テーブルシティ・アカデミー入学のころまでに分かる情報' },
  { label: '本編', desc: '3つのストーリー（ジム・スター団・ヌシ）の道中で出会うポケモン・人物・技' },
  { label: '終盤', desc: '各ストーリーの終盤、チャンピオンテスト・ポケモンリーグ、伝説・災厄のポケモン' },
  { label: 'クリア後', desc: 'エンディング以降の物語、エリアゼロ、パラドックスポケモン' }
];

const BASE_ENTRIES = [
  // ===== 人物 =====
  { c: 'person', ja: 'ハルト', en: 'Florian', sp: 0, cf: 2, jo: ['「晴る（はる）」「春（はる）」＋「ト」。アオイと合わせて「青春」になるという説', '晴翔・陽翔など、発売当時に人気の男の子の名前の響き'], eo: ['flora（花）＋-ian。植物にちなむ名が多いパルデアの人名に合わせたとみられる', 'ラテン系の男性名 Florian'], ev: '主人公の初期名。日本語版と英語版で別の名前になっている。', t: ['hero'] },
  { c: 'person', unk: '英語名 Juliana の由来は、公式にもポケモンWiki・Bulbapedia にも説明が見つかりませんでした。', ja: 'アオイ', en: 'Juliana', sp: 0, cf: 1, jo: ['葵（あおい、植物）', 'ハルトと合わせて「青春」の「青」', '発売当時に人気の女の子の名前'], eo: ['女性名 Juliana。はっきりした由来は見つからない', 'Julian／July（7月）の女性形の響き'], ev: '主人公の初期名。', t: ['hero'] },
  { c: 'person', ja: 'ネモ', en: 'Nemona', sp: 0, cf: 2, jo: ['ネモフィラ（瑠璃唐草、青い花）', 'anemone（アネモネ）の一部', 'ラテン語 nemo（だれでもない）'], eo: ['Nemophila（ネモフィラ）の響き', 'anemone（アネモネ）'], ev: 'パルデアの主要人物は植物名に由来するものが多い。', t: ['rival'] },
  { c: 'person', ja: 'ペパー', en: 'Arven', sp: 0, cf: 2, jo: ['pepper（コショウ）。料理好きな性格とも一致', 'peppermint（ペパーミント）'], eo: ['ハッカ（和種ミント）の学名 Mentha arvensis の種小名 arvensis', 'ノルウェー語などの人名 Arven（「遺産」の意味）'], ev: '日英とも「ミント」に行き着く。', t: ['rival'] },
  { c: 'person', ja: 'ボタン', en: 'Penny', sp: 0, cf: 3, jo: ['牡丹（ぼたん、花）', '服のボタン、コンピューターのボタン（ハッカーの特技）'], eo: ['peony（牡丹）→ Penny', 'penny（1セント硬貨）の響き'], ev: '日英で同じ花（牡丹）を指す。', t: ['rival'] },
  { c: 'person', ja: 'クラベル', en: 'Clavell', sp: 0, cf: 3, jo: 'clavel（スペイン語でカーネーション）', eo: 'clavel（スペイン語でカーネーション）', ev: 'アカデミーの校長。', t: ['teacher'] },
  { c: 'person', ja: 'オーリム', en: 'Sada', sp: 3, cf: 2, jo: ['olim（ラテン語で「かつて・昔」）。スカーレット（古代の側）の博士', 'aurum（ラテン語で金）の響き'], eo: 'pasado（スペイン語で「過去」）の後半', ev: 'スカーレットに登場する博士。日英とも「過去」を意味する語からとみられる。', t: ['prof'] },
  { c: 'person', ja: 'フトゥー', en: 'Turo', sp: 3, cf: 3, jo: 'futurum（ラテン語）／futuro（スペイン語）＝未来', eo: 'futuro（スペイン語で「未来」）の後半', ev: 'バイオレットに登場する博士。日英とも「未来」を意味する語から。', t: ['prof'] },
  { c: 'person', ja: 'ジニア', en: 'Jacq', sp: 0, cf: 2, jo: 'zinnia（百日草）', eo: ['百日草の学名の命名者として付く植物学者ジャカンの略記「Jacq.」', 'jack（男性名）の響き'], ev: '生物の先生。', t: ['teacher'] },
  { c: 'person', unk: '英語名 Miriam がなぜこの名前なのかは、裏取りできませんでした。', ja: 'ミモザ', en: 'Miriam', sp: 0, cf: 1, jo: 'mimosa（ミモザ、アカシアの花）', eo: ['Mimosa の「Mi-」で始まる女性名', 'myrrh（没薬＝薬草）の響き'], ev: '保健室の先生。', t: ['teacher'] },
  { c: 'person', ja: 'キハダ', en: 'Dendra', sp: 0, cf: 3, jo: '黄檗（きはだ、ミカン科の木）', eo: 'キハダの学名 Phellodendron の -dendron（ギリシャ語で木）', ev: 'バトル学の先生。', t: ['teacher'] },
  { c: 'person', ja: 'サワロ', en: 'Saguaro', sp: 0, cf: 3, jo: 'saguaro（サワロ、ベンケイチュウという巨大なサボテン）', eo: 'saguaro（サワロ）', ev: '家庭科の先生。', t: ['teacher'] },
  { c: 'person', ja: 'タイム', en: 'Tyme', sp: 0, cf: 3, jo: 'thyme（タイム、ハーブ）＋time（時間）', eo: 'thyme（タイム）＋time（時間）', ev: '数学の先生。', t: ['teacher'] },
  { c: 'person', ja: 'レホール', en: 'Raifort', sp: 0, cf: 2, jo: ['raifort（フランス語で西洋わさび）の発音をもじったもの', 'rábano（スペイン語でダイコン）の響き'], eo: 'raifort（フランス語で西洋わさび）', ev: '歴史の先生。', t: ['teacher'] },
  { c: 'person', ja: 'セイジ', en: 'Salvatore', sp: 0, cf: 3, jo: ['sage（セージ、ハーブ）', 'sage（賢者）'], eo: 'セージの学名 Salvia → イタリア人名 Salvatore', ev: '語学の先生。', t: ['teacher'] },
  { c: 'person', ja: 'ハッサク', en: 'Hassel', sp: 1, cf: 2, jo: '八朔（はっさく、柑橘）', eo: ['hazel（ハシバミ）の響き', 'Hassaku の短縮'], ev: '美術の先生。', t: ['teacher'] },
  { c: 'person', ja: 'カエデ', en: 'Katy', sp: 0, cf: 2, jo: '楓（かえで）', eo: ['katydid（キリギリスの仲間）。むしタイプ使いに合わせた', 'Katsura（カツラ、木の名前）の響き'], ev: 'セルクルタウンのジムリーダー（むし）。', t: ['gym'] },
  { c: 'person', ja: 'コルサ', en: 'Brassius', sp: 1, cf: 3, jo: 'colza（スペイン語でセイヨウアブラナ）', eo: ['Brassica（アブラナ属の学名）', 'brass（真ちゅう）＋芸術家らしいラテン風の語尾 -ius'], ev: 'ボウルタウンのジムリーダー（くさ）。日英とも同じ植物を指す。', t: ['gym'] },
  { c: 'person', ja: 'ハイダイ', en: 'Kofu', sp: 1, cf: 2, jo: '海帯（中国語 hǎidài＝昆布）', eo: ['kombu（昆布）の響き'], ev: 'カラフシティのジムリーダー（みず）で料理人。日英とも昆布を指すとみられる。', t: ['gym'] },
  { c: 'person', ja: 'ナンジャモ', en: 'Iono', sp: 1, cf: 2, jo: ['ナンジャモンジャ（ヒトツバタゴの俗称）', '「なんじゃ」（驚き）＋「も」'], eo: ['ion（イオン＝電気）', 'エアプランツ Tillandsia ionantha'], ev: 'ハッコウシティのジムリーダー（でんき）で配信者。', t: ['gym'] },
  { c: 'person', ja: 'アオキ', en: 'Larry', sp: 1, cf: 2, jo: ['アオキ（青木、ありふれた庭木）', 'よくある苗字「青木」'], eo: 'アオキの英名 Japanese laurel → Laurel → Larry', ev: 'チャンプルタウンのジムリーダー（ノーマル）。「普通の人」らしさを名前でも表している。', t: ['gym'] },
  { c: 'person', ja: 'ライム', en: 'Ryme', sp: 1, cf: 3, jo: ['lime（ライム）', 'rhyme（ラップの韻）'], eo: ['rime（霧氷）', 'rhyme（韻）'], ev: 'フリッジタウンのジムリーダー（ゴースト）でラッパー。', t: ['gym'] },
  { c: 'person', ja: 'リップ', en: 'Tulip', sp: 1, cf: 3, jo: ['チューリップ', 'lip（唇、メイクアップアーティスト）'], eo: 'tulip（チューリップ）', ev: 'ベイクタウンのジムリーダー（エスパー）。', t: ['gym'] },
  { c: 'person', ja: 'グルーシャ', en: 'Grusha', sp: 1, cf: 3, jo: 'груша（グルーシャ、ロシア語で洋梨）', eo: 'груша（ロシア語で洋梨）', ev: 'ナッペ山のジムリーダー（こおり）。', t: ['gym'] },
  { c: 'person', ja: 'オモダカ', en: 'Geeta', sp: 1, cf: 2, jo: '沢瀉（おもだか、水辺の草）', eo: ['オモダカ属の学名 Sagittaria の一部', 'インドの女性名 Gita／Geeta'], ev: 'ポケモンリーグの委員長。', t: ['league'] },
  { c: 'person', ja: 'チリ', en: 'Rika', sp: 2, cf: 3, jo: 'chili（唐辛子）', eo: 'paprika（パプリカ）', ev: '四天王（じめん）。日英とも唐辛子の仲間。', t: ['league'] },
  { c: 'person', ja: 'ポピー', en: 'Poppy', sp: 2, cf: 3, jo: 'poppy（ケシ・ヒナゲシ）', eo: 'poppy（ケシ・ヒナゲシ）', ev: '四天王（はがね）。', t: ['league'] },
  { c: 'person', ja: 'ピーニャ', en: 'Giacomo', sp: 1, cf: 2, jo: 'piña（スペイン語でパイナップル）', eo: ['パイナップルの学名 Ananas comosus の comosus', 'イタリアの男性名 Giacomo（ジャコモ）'], ev: 'スター団 あく組（チーム・セギン）のボス。DJ。', t: ['star'] },
  { c: 'person', ja: 'メロコ', en: 'Mela', sp: 1, cf: 2, jo: ['メロン（果物）', 'メロコア（メロディック・ハードコア、パンクロックの一種）。パンク風の姿から', 'メラメラ（炎）の響き'], eo: ['mela（イタリア語でリンゴ）', 'melon（メロン）の一部'], ev: 'スター団 ほのお組（チーム・シェダル）のボス。', t: ['star'] },
  { c: 'person', ja: 'シュウメイ', en: 'Atticus', sp: 1, cf: 2, jo: ['秋明菊（しゅうめいぎく）', '「秋明」＝忍びらしい風流な響き'], eo: ['古代ローマの文人アッティクスに由来する人名', 'Anemone hupehensis（シュウメイギク）とのつながりははっきりしない'], ev: 'スター団 どく組（チーム・シー）のボス。', t: ['star'] },
  { c: 'person', ja: 'オルティガ', en: 'Ortega', sp: 1, cf: 3, jo: 'ortiga（スペイン語でイラクサ）', eo: 'ortiga に近いスペイン系の姓 Ortega', ev: 'スター団 フェアリー組（チーム・ルクバー）のボス。', t: ['star'] },
  { c: 'person', ja: 'ビワ', en: 'Eri', sp: 1, cf: 3, jo: '枇杷（びわ）', eo: 'ビワの学名 Eriobotrya japonica の「Eri」', ev: 'スター団 かくとう組（チーム・カーフ）のボス。', t: ['star'] },
  { c: 'person', ja: 'カシオペア', en: 'Cassiopeia', sp: 1, cf: 3, jo: 'カシオペヤ座', eo: 'Cassiopeia（カシオペヤ座）', ev: 'スター団のボスを名乗る人物。各チームの名もカシオペヤ座の星に由来する。', t: ['star'] },

  // ===== 地名・施設 =====
  { c: 'place', unk: '公式に由来は説明されていません。スペイン語やパエリアとの関係は、響きからの推測です。', ja: 'パルデア地方', en: 'Paldea', sp: 0, cf: 1, jo: 'スペイン語 aldea（村）、paella（パエリア）などを連想させる造語と推測', eo: '日本語名と同じ', ev: 'モデルはイベリア半島（スペイン・ポルトガル）とされる。町の名は料理や台所道具にちなむものが多い。' },
  { c: 'place', ja: 'コサジタウン', en: 'Cabo Poco', sp: 0, cf: 3, jo: '小さじ（こさじ）', eo: 'cabo（スペイン語で岬）＋poco（少し）', ev: '冒険が始まる小さな町。', t: ['town'] },
  { c: 'place', ja: 'プラトタウン', en: 'Los Platos', sp: 0, cf: 3, jo: 'plato（スペイン語で皿）', eo: 'los platos（スペイン語で「皿たち」）', ev: '', t: ['town'] },
  { c: 'place', ja: 'テーブルシティ', en: 'Mesagoza', sp: 0, cf: 3, jo: 'テーブル', eo: 'mesa（スペイン語でテーブル）＋Zaragoza（スペインの都市サラゴサ）', ev: 'アカデミーのある大都市。', t: ['town'] },
  { c: 'place', ja: 'セルクルタウン', en: 'Cortondo', sp: 0, cf: 2, jo: 'cercle（セルクル＝菓子を抜く丸い型）', eo: 'cortador（型抜き）＋redondo（丸い）', ev: '', t: ['town'] },
  { c: 'place', ja: 'ボウルタウン', en: 'Artazon', sp: 1, cf: 3, jo: 'ボウル（器）', eo: 'arte（芸術）＋tazón（スペイン語でお椀）', ev: '芸術の町。', t: ['town'] },
  { c: 'place', ja: 'ハッコウシティ', en: 'Levincia', sp: 1, cf: 2, jo: '発酵（はっこう）＋発光（ネオンの光）', eo: 'levin（稲妻の古い言い方）＋levadura（スペイン語で酵母）＋Valencia', ev: 'でんきタイプのジムがある都会。', t: ['town'] },
  { c: 'place', ja: 'カラフシティ', en: 'Cascarrafa', sp: 1, cf: 2, jo: 'carafe（カラフ＝水差し）', eo: 'cascada（滝）＋garrafa（水差し）', ev: 'みずタイプのジムがある町。', t: ['town'] },
  { c: 'place', ja: 'マリナードタウン', en: 'Porto Marinada', sp: 1, cf: 3, jo: 'marinade（マリネ液）', eo: 'porto（ポルトガル語で港）＋marinada（マリネ）', ev: '港町。', t: ['town'] },
  { c: 'place', ja: 'チャンプルタウン', en: 'Medali', sp: 1, cf: 2, jo: 'チャンプルー（沖縄の「混ぜる」料理）', eo: 'medley（寄せ集め）の響き', ev: '', t: ['town'] },
  { c: 'place', ja: 'ピケタウン', en: 'Zapapico', sp: 1, cf: 2, jo: 'piquer（ピケ＝パイ生地にフォークで穴をあける製菓の作業）', eo: 'zapapico（スペイン語でつるはし）', ev: '鉱山の町。', t: ['town'] },
  { c: 'place', ja: 'フリッジタウン', en: 'Montenevera', sp: 1, cf: 3, jo: 'fridge（冷蔵庫）', eo: 'monte（山）＋nevera（スペイン語で冷蔵庫）', ev: '雪山の町。', t: ['town'] },
  { c: 'place', ja: 'ベイクタウン', en: 'Alfornada', sp: 1, cf: 2, jo: 'bake（焼く）', eo: 'forno（ポルトガル語でかまど）／hornada（ひと窯分）', ev: '', t: ['town'] },
  { c: 'place', ja: 'ナッペ山', en: 'Glaseado Mountain', sp: 1, cf: 3, jo: 'nappe（ナッペ＝ケーキにクリームを塗ること）', eo: 'glaseado（スペイン語で糖衣・アイシング）', ev: '雪をクリームに見立てた名前。' },
  { c: 'place', ja: 'ロースト砂漠', en: 'Asado Desert', sp: 1, cf: 3, jo: 'roast（焼く）', eo: 'asado（スペイン語で焼いた肉）', ev: '暑さを料理にたとえた名前。' },
  { c: 'place', ja: 'オージャの湖', en: 'Casseroya Lake', sp: 1, cf: 2, jo: 'olla（オジャ、スペイン語で鍋）', eo: 'casserole（キャセロール鍋）＋olla（鍋）', ev: '' },
  { c: 'place', ja: 'パルデアの大穴', en: 'Great Crater of Paldea', sp: 0, cf: 3, jo: '大穴（巨大なクレーター）', eo: 'great（大きな）＋crater（くぼ地）', ev: '地方の中央にある巨大な穴。' },
  { c: 'place', ja: 'エリアゼロ', en: 'Area Zero', sp: 2, cf: 2, jo: 'area（区域）＋zero（ゼロ）。原点・未踏の地', eo: '日本語名と同じ', ev: '大穴の内部。' },
  { c: 'place', ja: 'ゼロラボ', en: 'Zero Lab', sp: 3, cf: 3, jo: 'zero（エリアゼロ）＋lab（研究所）', eo: '日本語名と同じ', ev: '' },
  { c: 'term', ja: 'アカデミー', en: 'Academy', sp: 0, cf: 3, jo: ['academy（学園・学院）', '古代ギリシャの哲学者プラトンが開いた学園「アカデメイア」から。英雄アカデモスをまつる森にあったことにちなむ'], eo: ['academy', 'スペイン語 academia（塾・専門学校、学術団体）'], ev: '言葉の重みは国によって違う。日本では、日本学士院（英語名 Japan Academy）やアカデミー賞のような「学問・芸術の権威ある機関」の響きがある一方、「〇〇アカデミー」という名前の塾・専門学校・スクールにもよく使われ、「本格的に学べる所」という少し格好いい言葉として使われる。アメリカでは、私立の中高一貫校（プレップスクール）や、陸軍士官学校（ウェストポイント）・警察学校（ポリス・アカデミー）など、規律のある専門の学校のイメージが強い。イギリスでは、国から直接お金を受けて運営する公立の中等学校の呼び名にもなっている。モデルのスペインでは academia は語学学校や塾などの民間の学校を指すことが多い。パルデアのアカデミーは、年齢を問わずだれでも入れて、自分で課題を見つけて学ぶ学校として描かれている。', t: ['academy'] },
  { c: 'place', ja: 'オレンジアカデミー', en: 'Naranja Academy', sp: 0, cf: 3, jo: 'オレンジ。スカーレット（赤）に近い暖色', eo: 'naranja（スペイン語でオレンジ）', ev: 'スカーレットの学校。' },
  { c: 'place', ja: 'グレープアカデミー', en: 'Uva Academy', sp: 0, cf: 3, jo: 'グレープ（ブドウ）。バイオレット（紫）に近い色', eo: 'uva（スペイン語でブドウ）', ev: 'バイオレットの学校。' },

  { c: 'place', ja: 'ポケモンリーグ', en: 'Pokémon League', sp: 1, cf: 3, jo: 'Pokémon＋league（連盟）', eo: 'Pokémon＋league', ev: 'チャンピオンテストが行われる場所。本作ではオモダカが委員長を務める組織でもある。' },

  // ===== アイテム =====
  { c: 'item', ja: 'テラピース', en: 'Tera Shard', sp: 0, cf: 3, jo: 'テラスタル＋piece（かけら）', eo: 'tera＋shard（破片）', ev: 'テラスタイプを変えるのに使う。' },
  { c: 'item', ja: 'テラスタルオーブ', en: 'Tera Orb', sp: 0, cf: 3, jo: 'テラスタル＋orb（宝珠）', eo: 'tera＋orb（宝珠）', ev: 'テラスタルに使う道具。' },
  { c: 'item', ja: 'ひでんスパイス', en: 'Herba Mystica', sp: 1, cf: 3, jo: '秘伝（ひでん）＋スパイス', eo: 'herba（ラテン語で草）＋mystica（神秘の）', ev: '「あまい」「からい」など5種類ある。' },
  { c: 'item', ja: 'ブーストエナジー', en: 'Booster Energy', sp: 2, cf: 3, jo: 'boost（押し上げる、増幅する）＋energy', eo: 'booster＋energy', ev: '特定のポケモンの力を高める持ち物。', t: ['held9'] },
  { c: 'item', ja: 'とくせいガード', en: 'Ability Shield', sp: 1, cf: 3, jo: '特性（とくせい）＋guard（守る）', eo: 'ability（特性）＋shield（盾）', ev: '特性の変更を防ぐ持ち物。', t: ['held9'] },
  { c: 'item', ja: 'クリアチャーム', en: 'Clear Amulet', sp: 1, cf: 2, jo: '特性「クリアボディ」の clear＋charm（お守り）', eo: 'clear＋amulet（お守り）', ev: '能力を下げられるのを防ぐ持ち物。', t: ['held9'] },
  { c: 'item', ja: 'ものまねハーブ', en: 'Mirror Herb', sp: 1, cf: 3, jo: 'ものまね＋ハーブ（「しろいハーブ」などハーブ系の道具）', eo: 'mirror（鏡）＋herb', ev: '相手の能力の上昇をまねる持ち物。', t: ['held9'] },
  { c: 'item', ja: 'パンチグローブ', en: 'Punching Glove', sp: 1, cf: 3, jo: 'パンチ＋グローブ', eo: 'punching glove', ev: 'パンチ技を強くする持ち物。', t: ['held9'] },
  { c: 'item', ja: 'おんみつマント', en: 'Covert Cloak', sp: 1, cf: 3, jo: '隠密（おんみつ）＋マント', eo: 'covert（隠れた）＋cloak（外套）', ev: '技の追加効果を受けない持ち物。', t: ['held9'] },
  { c: 'item', ja: 'いかさまダイス', en: 'Loaded Dice', sp: 1, cf: 3, jo: 'いかさま（不正）＋ダイス', eo: 'loaded dice（重りを仕込んだいかさまのサイコロ、英語の慣用表現）', ev: '連続技の回数を増やしやすくする持ち物。', t: ['held9'] },
  { c: 'item', ja: 'ようせいのハネ', en: 'Fairy Feather', sp: 1, cf: 3, jo: '妖精（ようせい）＋羽（はね）', eo: 'fairy＋feather', ev: 'フェアリータイプの技を強くする持ち物。', t: ['held9'] },
  { c: 'item', ja: 'イワイノヨロイ', en: 'Auspicious Armor', sp: 1, cf: 3, jo: '祝いの鎧（いわいのよろい）。カタカナで古風な響きに', eo: 'auspicious（縁起の良い）＋armor', ev: 'カルボウをグレンアルマに進化させる。「イワイ」と「ノロイ」で対になっている。', t: ['evo9'] },
  { c: 'item', ja: 'ノロイノヨロイ', en: 'Malicious Armor', sp: 1, cf: 3, jo: '呪いの鎧（のろいのよろい）。カタカナで古風な響きに', eo: 'malicious（悪意のある）＋armor', ev: 'カルボウをソウブレイズに進化させる。', t: ['evo9'] },
  { c: 'item', ja: 'かしらのしるし', en: "Leader's Crest", sp: 2, cf: 3, jo: '頭（かしら＝首領）の印（しるし）', eo: 'leader（首領）＋crest（紋章・とさか）', ev: 'キリキザンの進化に関わる道具。', t: ['evo9'] },
  { c: 'item', ja: 'コレクレーのコイン', en: 'Gimmighoul Coin', sp: 1, cf: 3, jo: 'コレクレー＋コイン', eo: 'Gimmighoul＋coin', ev: 'コレクレーの進化に関わる道具。', t: ['evo9'] },
  { c: 'item', ja: 'スマホロトム', en: 'Rotom Phone', sp: 0, cf: 3, jo: 'スマホ（スマートフォン）＋ロトム', eo: 'Rotom＋phone', ev: '冒険に使う端末。' },
  { c: 'item', ja: 'わざマシンマシン', en: 'TM Machine', sp: 0, cf: 3, jo: '「わざマシン」を作るマシン', eo: 'TM（Technical Machine）＋machine', ev: 'ポケモンの落とし物などからわざマシンを作る。' },

  // ===== 技（第9世代で登場） =====
  { c: 'move', ja: 'テラバースト', en: 'Tera Blast', sp: 0, cf: 3, tm: 171, jo: 'テラスタル＋burst（破裂）', eo: 'tera＋blast（爆風）', ev: 'テラスタルすると技のタイプが変わる。' },
  { c: 'move', ja: 'くさわけ', en: 'Trailblaze', sp: 0, cf: 3, tm: 20, jo: '草分け（草を分けて道を拓く＝先駆者）', eo: 'trailblaze（道を切り拓く）', ev: '' },
  { c: 'move', ja: 'ひやみず', en: 'Chilling Water', sp: 0, cf: 3, tm: 22, jo: '冷や水（「冷や水を浴びせる」＝勢いをそぐ）', eo: 'chilling（冷やす・ぞっとさせる）＋water', ev: '当たると相手の攻撃が下がる。慣用句どおりの効果。' },
  { c: 'move', ja: 'とびつく', en: 'Pounce', sp: 0, cf: 3, tm: 21, jo: '飛びつく', eo: 'pounce（獲物に飛びかかる）', ev: '' },
  { c: 'move', ja: 'ゆきげしき', en: 'Snowscape', sp: 0, cf: 3, tm: 52, jo: '雪景色（ゆきげしき）', eo: 'snow＋landscape（景色）', ev: '天気を「ゆき」にする。' },
  { c: 'move', ja: 'かかとおとし', en: 'Axe Kick', sp: 1, cf: 3, jo: '踵落とし（空手などの蹴り技）', eo: 'axe kick（斧のように振り下ろす蹴り、格闘技の技名）', ev: '' },
  { c: 'move', ja: 'おはかまいり', en: 'Last Respects', sp: 1, cf: 3, jo: 'お墓参り', eo: 'pay one’s last respects（故人に最後の別れを告げる）', ev: '倒れた味方が多いほど威力が上がる。' },
  { c: 'move', ja: 'ルミナコリジョン', en: 'Lumina Crash', sp: 1, cf: 3, jo: 'lumina（光）＋collision（衝突）', eo: 'lumina＋crash（衝突）', ev: '' },
  { c: 'move', ja: 'いっちょうあがり', en: 'Order Up', sp: 1, cf: 3, jo: '一丁上がり（料理ができたときの掛け声）', eo: 'Order up!（料理ができたときの掛け声）', ev: '寿司モチーフのポケモンの技。' },
  { c: 'move', ja: 'ジェットパンチ', en: 'Jet Punch', sp: 1, cf: 3, jo: 'jet（噴射）＋punch', eo: 'jet＋punch', ev: '' },
  { c: 'move', ja: 'ハバネロエキス', en: 'Spicy Extract', sp: 1, cf: 3, jo: 'ハバネロ（激辛の唐辛子）＋エキス', eo: 'spicy（辛い）＋extract（抽出液）', ev: '' },
  { c: 'move', ja: 'ホイールスピン', en: 'Spin Out', sp: 1, cf: 3, jo: 'wheel spin（タイヤの空転）', eo: 'spin out（車がスリップしてスピンする）', ev: '' },
  { c: 'move', ja: 'ネズミざん', en: 'Population Bomb', sp: 1, cf: 3, jo: '鼠算（ねずみざん＝倍々に増える計算）', eo: 'population bomb（人口爆発）', ev: '最大10回連続で攻撃する。' },
  { c: 'move', ja: 'アイススピナー', en: 'Ice Spinner', sp: 1, cf: 3, tm: 124, jo: 'ice＋spinner（回転するもの）', eo: 'ice＋spinner', ev: '' },
  { c: 'move', ja: 'きょけんとつげき', en: 'Glaive Rush', sp: 2, cf: 3, jo: '巨剣（きょけん）＋突撃', eo: 'glaive（長柄の剣）＋rush（突進）', ev: '' },
  { c: 'move', ja: 'さいきのいのり', en: 'Revival Blessing', sp: 2, cf: 3, jo: '再起（さいき）の祈り', eo: 'revival（復活）＋blessing（祝福）', ev: '倒れた味方を復活させる。' },
  { c: 'move', ja: 'しおづけ', en: 'Salt Cure', sp: 1, cf: 3, jo: '塩漬け', eo: 'salt cure（塩漬け保存）', ev: '' },
  { c: 'move', ja: 'トリプルダイブ', en: 'Triple Dive', sp: 1, cf: 3, jo: 'triple（3回）＋dive（飛び込み）', eo: 'triple＋dive', ev: '' },
  { c: 'move', ja: 'キラースピン', en: 'Mortal Spin', sp: 1, cf: 3, jo: 'killer（殺し屋・すごい）＋spin', eo: 'mortal（致命的な）＋spin', ev: '' },
  { c: 'move', ja: 'うつしえ', en: 'Doodle', sp: 1, cf: 3, jo: '写し絵（うつしえ）', eo: 'doodle（落書き）', ev: '相手の特性を写し取る。' },
  { c: 'move', ja: 'みをけずる', en: 'Fillet Away', sp: 1, cf: 3, jo: '身を削る（自分を犠牲にする）', eo: 'fillet（魚をおろす）＋away', ev: 'HPを削って能力を上げる。' },
  { c: 'move', ja: 'ドゲザン', en: 'Kowtow Cleave', sp: 2, cf: 3, jo: '土下座（どげざ）＋斬（ざん）', eo: 'kowtow（叩頭＝頭を地につける礼）＋cleave（叩き斬る）', ev: '' },
  { c: 'move', ja: 'トリックフラワー', en: 'Flower Trick', sp: 1, cf: 3, jo: 'trick（手品）＋flower', eo: 'flower＋trick', ev: '' },
  { c: 'move', ja: 'フレアソング', en: 'Torch Song', sp: 1, cf: 3, jo: 'flare（炎）＋song（歌）', eo: 'torch song（失恋の歌）。torch（たいまつ）との掛け言葉', ev: '' },
  { c: 'move', ja: 'アクアステップ', en: 'Aqua Step', sp: 1, cf: 3, jo: 'aqua（水）＋step（踊りのステップ）', eo: 'aqua＋step', ev: '' },
  { c: 'move', ja: 'レイジングブル', en: 'Raging Bull', sp: 1, cf: 3, jo: 'raging bull（荒れ狂う雄牛）', eo: 'raging bull（荒れ狂う雄牛）', ev: '' },
  { c: 'move', ja: 'ゴールドラッシュ', en: 'Make It Rain', sp: 2, cf: 3, jo: 'gold rush（金を求めて人が殺到すること）', eo: 'make it rain（お金をばらまく、というスラング）', ev: '' },
  { c: 'move', ja: 'カタストロフィ', en: 'Ruination', sp: 2, cf: 3, jo: 'catastrophe（大災害）', eo: 'ruination（破滅）', ev: '' },
  { c: 'move', ja: 'アクセルブレイク', en: 'Collision Course', sp: 2, cf: 3, jo: 'accel（加速）＋break', eo: 'collision course（衝突進路、衝突が避けられない状況）', ev: '' },
  { c: 'move', ja: 'イナズマドライブ', en: 'Electro Drift', sp: 2, cf: 3, jo: '稲妻（いなずま）＋drive', eo: 'electro＋drift（ドリフト走行）', ev: '' },
  { c: 'move', ja: 'しっぽきり', en: 'Shed Tail', sp: 1, cf: 3, jo: '尻尾切り（トカゲの自切。「責任を押しつけて逃れる」の慣用句）', eo: 'shed（脱ぎ捨てる）＋tail', ev: '身代わりを残して交代する。' },
  { c: 'move', ja: 'さむいギャグ', en: 'Chilly Reception', sp: 1, cf: 3, jo: '寒いギャグ（すべったダジャレ）', eo: 'chilly reception（冷ややかな反応）', ev: '天気を「ゆき」にして交代する。' },
  { c: 'move', ja: 'おかたづけ', en: 'Tidy Up', sp: 1, cf: 3, jo: 'お片付け', eo: 'tidy up（片付ける）', ev: '場のまきびしなどを片付ける。' },
  { c: 'move', ja: 'ハイパードリル', en: 'Hyper Drill', sp: 1, cf: 3, jo: 'hyper＋drill', eo: 'hyper＋drill', ev: '' },
  { c: 'move', ja: 'ツインビーム', en: 'Twin Beam', sp: 1, cf: 3, jo: 'twin（2つの）＋beam', eo: 'twin＋beam', ev: '' },
  { c: 'move', ja: 'ふんどのこぶし', en: 'Rage Fist', sp: 1, cf: 3, jo: '憤怒（ふんど）の拳', eo: 'rage（激怒）＋fist（拳）', ev: '' },
  { c: 'move', ja: 'アーマーキャノン', en: 'Armor Cannon', sp: 1, cf: 3, jo: 'armor（鎧）＋cannon（大砲）', eo: 'armor＋cannon', ev: '' },
  { c: 'move', ja: 'むねんのつるぎ', en: 'Bitter Blade', sp: 1, cf: 3, jo: '無念（むねん＝悔しさ）の剣', eo: 'bitter（苦い・恨めしい）＋blade', ev: '' },
  { c: 'move', ja: 'でんこうそうげき', en: 'Double Shock', sp: 1, cf: 3, jo: '電光（でんこう）＋双撃（そうげき）。「電光石火」の響き', eo: 'double＋shock', ev: '' },
  { c: 'move', ja: 'デカハンマー', en: 'Gigaton Hammer', sp: 1, cf: 3, jo: 'でかい＋hammer', eo: 'gigaton（10億トン）＋hammer', ev: '' },
  { c: 'move', ja: 'ほうふく', en: 'Comeuppance', sp: 1, cf: 3, jo: '報復（ほうふく）', eo: 'comeuppance（当然の報い）', ev: '受けたダメージを大きくして返す。' },
  { c: 'move', ja: 'アクアカッター', en: 'Aqua Cutter', sp: 1, cf: 3, jo: 'aqua＋cutter', eo: 'aqua＋cutter', ev: '' },
  { c: 'move', ja: 'ダークアクセル', en: 'Wicked Torque', sp: 1, cf: 3, jo: 'ダーク（dark＝悪）＋アクセル（accelerator＝車のアクセル）', eo: 'wicked（邪悪な）＋torque（トルク＝エンジンが車輪を回す力）', ev: 'スター団のアジトで、ボスが乗る「スターモービル」（ブロロローム）だけが使う技。あく組（チーム・セギン）のスターモービルが使う。相手を眠らせることがある。日本語は車のペダル、英語はエンジンの回る力と、どちらも車の言葉。', t: ['starmobile'] },
  { c: 'move', ja: 'バーンアクセル', en: 'Blazing Torque', sp: 1, cf: 3, jo: 'バーン（burn＝燃える）＋アクセル', eo: 'blazing（燃え盛る）＋torque', ev: 'スター団のアジトで、ボスが乗る「スターモービル」（ブロロローム）だけが使う技。ほのお組（チーム・シェダル）のスターモービルが使う。相手をやけどにすることがある。日本語は車のペダル、英語はエンジンの回る力と、どちらも車の言葉。', t: ['starmobile'] },
  { c: 'move', ja: 'ポイズンアクセル', en: 'Noxious Torque', sp: 1, cf: 3, jo: 'ポイズン（poison＝毒）＋アクセル', eo: 'noxious（有毒な）＋torque', ev: 'スター団のアジトで、ボスが乗る「スターモービル」（ブロロローム）だけが使う技。どく組（チーム・シー）のスターモービルが使う。相手を毒にすることがある。日本語は車のペダル、英語はエンジンの回る力と、どちらも車の言葉。', t: ['starmobile'] },
  { c: 'move', ja: 'マジカルアクセル', en: 'Magical Torque', sp: 1, cf: 3, jo: 'マジカル（magical＝魔法の）＋アクセル', eo: 'magical＋torque', ev: 'スター団のアジトで、ボスが乗る「スターモービル」（ブロロローム）だけが使う技。フェアリー組（チーム・ルクバー）のスターモービルが使う。相手を混乱させることがある。日本語は車のペダル、英語はエンジンの回る力と、どちらも車の言葉。', t: ['starmobile'] },
  { c: 'move', ja: 'ファイトアクセル', en: 'Combat Torque', sp: 1, cf: 3, jo: 'ファイト（fight＝戦う）＋アクセル', eo: 'combat（戦闘）＋torque', ev: 'スター団のアジトで、ボスが乗る「スターモービル」（ブロロローム）だけが使う技。かくとう組（チーム・カーフ）のスターモービルが使う。相手をまひさせることがある。日本語は車のペダル、英語はエンジンの回る力と、どちらも車の言葉。', t: ['starmobile'] },
  { c: 'move', ja: 'スレッドトラップ', en: 'Silk Trap', sp: 1, cf: 3, jo: 'thread（糸）＋trap（罠）', eo: 'silk（絹糸）＋trap', ev: '' },

  // ===== 用語・組織 =====
  // ----- ゲームのしくみ（システム用語） -----
  { c: 'term', ja: 'ポケモン', en: 'Pokémon', sp: 0, cf: 3, jo: ['「ポケットモンスター（Pocket Monsters）」を縮めた言葉', 'ポケット（小さくしてボールに入れて持ち運べる）＋モンスター（ふしぎな生き物）'], eo: ['日本語の略称をそのまま英語に。é のアクセント記号は「ポケモン」と「エ」の音で読んでほしいという印', '海外では Pocket Monsters を略さずに使わなかった（「ポケットモンスター」の響きを避けた）とされる'], ev: 'ポケットに入るほど小さくなってボールに収まる、ふしぎな生き物たちの総称。1996年の第1作の題名『ポケットモンスター』が由来。', t: ['system'] },
  { c: 'term', ja: 'ポケモントレーナー', en: 'Pokémon Trainer', sp: 0, cf: 3, jo: 'ポケモン＋trainer（育てる人・調教師）', eo: 'Pokémon＋trainer', ev: 'ポケモンを育ててバトルする人。', t: ['system'] },
  { c: 'term', ja: 'レポート', en: 'Save', sp: 0, cf: 3, jo: ['report（報告書）。冒険の記録を書き残す、という見立て', 'シリーズ初期から続く「レポートを書く」という言い回し'], eo: 'save（保存する）', ev: 'ゲームの進み具合を保存すること。日本語は「報告書を書く」、英語は機能そのままの「保存」。', t: ['system'] },
  { c: 'term', ja: 'ボックス', en: 'Box', sp: 0, cf: 3, jo: 'box（箱）。捕まえたポケモンを預けておく場所', eo: 'box', ev: '手持ちに入りきらないポケモンを預ける場所。本作ではどこからでも開ける。', t: ['system'] },
  { c: 'term', ja: 'てもち', en: 'Party', sp: 0, cf: 3, jo: '手持ち（てもち＝手元に持っているもの）', eo: 'party（一行・仲間）', ev: '連れて歩ける最大6匹のポケモン。', t: ['system'] },
  { c: 'term', ja: 'ポケモン図鑑', en: 'Pokédex', sp: 0, cf: 3, jo: 'ポケモン＋図鑑', eo: 'Pokémon＋index（索引）', ev: '出会ったポケモンの記録。本作ではスマホロトムのアプリになっている。', t: ['system'] },
  { c: 'term', ja: 'ポケモンセンター', en: 'Pokémon Center', sp: 0, cf: 3, jo: 'ポケモン＋center（施設）', eo: 'Pokémon＋center', ev: 'ポケモンを回復してくれる施設。本作ではフレンドリィショップと一体になった屋外型。', t: ['system'] },
  { c: 'term', ja: 'バッグ', en: 'Bag', sp: 0, cf: 3, jo: 'bag（かばん）', eo: 'bag', ev: '道具を入れておくかばん。', t: ['system'] },
  { c: 'term', ja: 'わざ', en: 'Move', sp: 0, cf: 3, jo: '技（わざ）', eo: 'move（動き・手）', ev: 'ポケモンがバトルで使う行動。1匹4つまで覚えられる。', t: ['system'] },
  { c: 'term', ja: 'わざマシン', en: 'TM', sp: 0, cf: 3, jo: '技＋machine（機械）', eo: 'TM＝Technical Machine（技術の機械）', ev: 'ポケモンに技を覚えさせる道具。本作ではわざマシンマシンで作れる。', t: ['system'] },
  { c: 'term', ja: 'タイプ', en: 'Type', sp: 0, cf: 3, jo: 'type（型・種類）', eo: 'type', ev: 'ほのお・みず・くさなど18種類。相性がある。', t: ['system'] },
  { c: 'term', ja: 'とくせい', en: 'Ability', sp: 0, cf: 3, jo: '特性（とくせい＝そのものだけが持つ性質）', eo: 'ability（能力）', ev: 'ポケモンが持っている特別な力。', t: ['system'] },
  { c: 'term', ja: 'せいかく', en: 'Nature', sp: 0, cf: 3, jo: '性格', eo: 'nature（性質・生まれつき）', ev: 'ポケモンの性格。能力の伸び方が変わる。ミントで変えられる。', t: ['system'] },
  { c: 'term', ja: 'もちもの', en: 'Held Item', sp: 0, cf: 3, jo: '持ち物', eo: 'held（持たされた）＋item', ev: 'ポケモンに持たせる道具。', t: ['system'] },
  { c: 'term', ja: 'レベル', en: 'Level', sp: 0, cf: 3, jo: 'level（段階）', eo: 'level', ev: 'ポケモンの強さの目安。最大100。', t: ['system'] },
  { c: 'term', ja: 'けいけんち', en: 'Exp. Points', sp: 0, cf: 3, jo: '経験値', eo: 'experience points', ev: 'たまるとレベルが上がる。', t: ['system'] },
  { c: 'term', ja: 'しんか', en: 'Evolution', sp: 0, cf: 3, jo: '進化（生物が長い時間をかけて変わること）', eo: 'evolution', ev: 'ポケモンが姿を変えて強くなること。実際の生物学の「進化」とは違い、一瞬で姿が変わる、いわば「変態」に近い現象。', t: ['system'] },
  { c: 'term', ja: 'ひんし', en: 'Fainted', sp: 0, cf: 3, jo: '瀕死（ひんし＝死にかけている状態）', eo: 'fainted（気絶した）', ev: 'HPが0になって戦えなくなった状態。日本語は強い言葉、英語は「気絶」とやわらかい。', t: ['system'] },
  { c: 'term', ja: 'きゅうしょ', en: 'Critical Hit', sp: 0, cf: 3, jo: '急所（当たると大きなダメージになる体の部分）', eo: 'critical hit（決定的な一撃）', ev: '「きゅうしょに あたった！」でおなじみ。', t: ['system'] },
  { c: 'term', ja: 'こうかは ばつぐん', en: "It's super effective!", sp: 0, cf: 3, jo: '効果は抜群（ばつぐん＝ずば抜けている）', eo: 'super effective（とても効果的）', ev: 'タイプの相性がよい技が当たったときのメッセージ。', t: ['system'] },
  { c: 'term', ja: 'やせい', en: 'Wild', sp: 0, cf: 3, jo: '野生', eo: 'wild', ev: 'トレーナーのいないポケモン。', t: ['system'] },
  { c: 'term', ja: 'タマゴ', en: 'Egg', sp: 1, cf: 3, jo: '卵', eo: 'egg', ev: 'ピクニックのバスケットで見つかる。', t: ['system'] },
  { c: 'term', ja: 'なつき', en: 'Friendship', sp: 1, cf: 3, jo: '懐き（なつき＝慣れ親しむこと）', eo: 'friendship（友情）', ev: 'ポケモンがトレーナーをどれだけ好きか。なつきで進化するポケモンもいる。', t: ['system'] },
  { c: 'term', ja: 'いろちがい', en: 'Shiny', sp: 1, cf: 3, jo: '色違い', eo: 'shiny（光る）。出会うときにキラッと光ることから', ev: 'ごくまれに現れる、ふつうと色の違うポケモン。日本語は色、英語は光に注目した呼び方。', t: ['system'] },
  { c: 'term', ja: 'つうしんこうかん', en: 'Link Trade', sp: 0, cf: 3, jo: '通信＋交換。初代はケーブルでつないで交換した', eo: 'link（つながり、通信ケーブル）＋trade', ev: '', t: ['system'] },
  { c: 'term', ja: 'マジカルこうかん', en: 'Surprise Trade', sp: 0, cf: 3, jo: 'magical（魔法のような、何が来るかわからない）＋交換', eo: 'surprise（驚き）＋trade', ev: 'だれと何を交換するかわからない交換。日英とも「何が来るかお楽しみ」。', t: ['system'] },
  { c: 'term', ja: 'ポケポータル', en: 'Poké Portal', sp: 0, cf: 3, jo: 'ポケ＋portal（入り口）', eo: 'Poké＋portal', ev: '通信の入り口になる画面。', t: ['system'] },
  { c: 'term', ja: 'ユニオンサークル', en: 'Union Circle', sp: 0, cf: 3, jo: 'union（結びつき）＋circle（輪・仲間）', eo: 'union＋circle', ev: 'ほかのプレイヤーと一緒にパルデアを冒険できる通信。', t: ['system'] },
  { c: 'term', ja: 'ジム', en: 'Gym', sp: 0, cf: 3, jo: 'gym（体育館・トレーニング場）', eo: 'gym', ev: 'ジムリーダーがいる施設。本作ではジムテストがある。', t: ['system'] },
  { c: 'term', ja: 'ジムリーダー', en: 'Gym Leader', sp: 0, cf: 3, jo: 'gym＋leader', eo: 'gym leader', ev: '', t: ['system'] },
  { c: 'term', ja: 'ジムバッジ', en: 'Gym Badge', sp: 0, cf: 3, jo: 'gym＋badge（記章）', eo: 'gym badge', ev: 'ジムリーダーに勝つともらえる記章。', t: ['system'] },
  { c: 'term', ja: 'してんのう', en: 'Elite Four', sp: 1, cf: 3, jo: '四天王（仏教で四方を守る4人の神様。転じて、ある分野の4人の実力者）', eo: 'elite（えり抜きの）＋four', ev: '日本語は仏教由来の言葉、英語は「選り抜きの4人」。', t: ['system'] },
  { c: 'term', ja: 'チャンピオン', en: 'Champion', sp: 0, cf: 3, jo: 'champion（優勝者）', eo: 'champion', ev: '本作では、チャンピオンテストに合格すると「チャンピオンランク」になる。', t: ['system'] },
  { c: 'term', ja: 'トップチャンピオン', en: 'Top Champion', sp: 1, cf: 3, jo: 'top＋champion', eo: 'top＋champion', ev: 'チャンピオンランクのトレーナーの頂点に立つ人。', t: ['system'] },
  { c: 'term', ja: 'ポケモンライド', en: 'Ride', sp: 0, cf: 3, jo: 'ride（乗る）', eo: 'ride', ev: '相棒の伝説のポケモンに乗って移動すること。', t: ['system'] },
  { c: 'term', ja: 'えん（円）', en: 'Pokémon Dollar', sp: 0, cf: 3, jo: '円（日本の通貨の単位）', eo: 'Pokémon dollar（記号は P に横線を2本引いた ₽）', ev: 'ゲーム内のお金の単位。', t: ['system'] },
  { c: 'term', ja: 'テラスタル', en: 'Terastallization', sp: 0, cf: 2, jo: 'tera（テラ＝10の12乗）／terra（ラテン語で大地）＋crystal（結晶）', eo: 'tera＋crystallization（結晶化）', ev: 'ポケモンが宝石のように輝く現象。' },
  { c: 'term', ja: 'テラレイドバトル', en: 'Tera Raid Battle', sp: 0, cf: 3, jo: 'テラスタル＋raid（襲撃）＋battle', eo: 'tera＋raid＋battle', ev: '' },
  { c: 'term', ja: 'レッツゴー', en: "Let's Go", sp: 0, cf: 3, jo: 'Let’s go（行こう）', eo: 'Let’s go', ev: '連れ歩くポケモンに自動で戦ってもらう機能。' },
  { c: 'term', ja: 'スカーレット', en: 'Scarlet', sp: 0, cf: 3, jo: 'scarlet（緋色）。赤系の色名を付けるシリーズの伝統', eo: 'scarlet（緋色）', ev: '学校はオレンジ、表紙はコライドン。' },
  { c: 'term', ja: 'バイオレット', en: 'Violet', sp: 0, cf: 3, jo: 'violet（すみれ色）', eo: 'violet（すみれ色）', ev: '学校はグレープ、表紙はミライドン。' },
  { c: 'term', ja: '宝探し', en: 'Treasure Hunt', sp: 0, cf: 3, jo: '宝探し（課外授業の名前）', eo: 'treasure hunt', ev: '自分だけの「宝」を探す課外授業。' },
  { c: 'term', ja: 'レジェンドルート', en: 'Path of Legends', sp: 0, cf: 3, jo: 'legend（伝説）＋route（道）', eo: 'path（道）＋legends（伝説）', ev: 'ヌシポケモンを探すストーリーの名前。秘伝スパイスを探す。' },
  { c: 'term', ja: 'チャンピオンロード', en: 'Victory Road', sp: 0, cf: 3, jo: 'シリーズ伝統のポケモンリーグへ続く道の名前', eo: 'シリーズ伝統の名前 Victory Road', ev: '本作ではジムを巡るストーリーの名前。' },
  { c: 'term', ja: 'スターダスト★ストリート', en: 'Starfall Street', sp: 1, cf: 3, jo: ['stardust（星くず）＋street（通り）', 'スター団のアジトを巡る道のり'], eo: ['starfall（流れ星）＋street（通り）', '星が落ちる＝スター団の解散を暗示するとも'], ev: 'スター団のアジトを巡るストーリーの名前。' },
  { c: 'term', ja: 'スター大作戦', en: 'Operation Starfall', sp: 1, cf: 3, jo: 'スター団＋大作戦', eo: 'operation（作戦）＋starfall（流れ星）', ev: 'スター団のアジトを一つずつ訪ねる作戦の名前。' },
  { c: 'term', ja: 'ヌシポケモン', en: 'Titan Pokémon', sp: 0, cf: 3, jo: '主（ぬし＝その土地に長く棲む主）', eo: 'titan（巨人）', ev: '' },
  { c: 'term', ja: 'スター団', en: 'Team Star', sp: 0, cf: 3, jo: 'star（星）＋団', eo: 'team＋star', ev: '各チームの名はカシオペヤ座の星から。' },
  { c: 'term', ja: 'チーム・セギン', en: 'Segin Squad', sp: 1, cf: 3, jo: 'カシオペヤ座ε（イプシロン）星 セギン', eo: 'Segin（カシオペヤ座ε星）', ev: 'あく組。' },
  { c: 'term', ja: 'チーム・シェダル', en: 'Schedar Squad', sp: 1, cf: 3, jo: 'カシオペヤ座α（アルファ）星 シェダル（アラビア語で「胸」）', eo: 'Schedar（カシオペヤ座α星）', ev: 'ほのお組。' },
  { c: 'term', ja: 'チーム・シー', en: 'Navi Squad', sp: 1, cf: 3, jo: ['カシオペヤ座γ（ガンマ）星の別名「ツィー（Tsih／Cih）」', '中国語の「策（cè）」（馬のむち）に由来するとされる星の呼び名'], eo: 'カシオペヤ座γ星の愛称 Navi。宇宙飛行士ガス・グリソムのミドルネーム Ivan を逆さにした呼び名とされる', ev: 'どく組。同じ星を、日本語版は別名、英語版は愛称で呼んでいる。' },
  { c: 'term', ja: 'チーム・ルクバー', en: 'Ruchbah Squad', sp: 1, cf: 3, jo: 'カシオペヤ座δ（デルタ）星 ルクバー（アラビア語で「膝」）', eo: 'Ruchbah（カシオペヤ座δ星）', ev: 'フェアリー組。' },
  { c: 'term', ja: 'チーム・カーフ', en: 'Caph Squad', sp: 1, cf: 3, jo: 'カシオペヤ座β（ベータ）星 カーフ（アラビア語で「手のひら」）', eo: 'Caph（カシオペヤ座β星）', ev: 'かくとう組。' },
  { c: 'term', ja: 'スターモービル', en: 'Starmobile', sp: 1, cf: 3, jo: 'star＋automobile（自動車）', eo: 'star＋automobile', ev: 'スター団のボスが乗る車。' },
  { c: 'term', ja: 'マジボス', en: 'Big Boss', sp: 1, cf: 2, jo: ['マジ（本気・本当に）＋ボス。スター団の団員による呼び方', '「まじ」は若者言葉'], eo: 'big boss（大ボス）', ev: 'スター団の団員がリーダーを呼ぶときの言い方。英語版での対応語は Big Boss とみられる。' },
  { c: 'term', ja: 'テラスタイプ', en: 'Tera Type', sp: 0, cf: 3, jo: 'テラスタル＋type（タイプ）', eo: 'tera＋type', ev: 'テラスタルしたときのタイプ。' },
  { c: 'term', ja: 'ジムテスト', en: 'Gym Test', sp: 0, cf: 3, jo: 'gym（ジム）＋test（試験）', eo: 'gym＋test', ev: 'ジムリーダーに挑む前の試験。本作から。' },
  { c: 'term', ja: 'ピクニック', en: 'Picnic', sp: 0, cf: 3, jo: 'picnic（ピクニック）', eo: 'picnic', ev: 'サンドイッチを作ったり、ポケモンと遊んだりできる。' },
  { c: 'term', ja: '○番エリア', en: 'Province (Area ○)', sp: 0, cf: 3, jo: '東西南北＋番号＋area（区域）。例：南1番エリア', eo: 'province（地方）＋area。例：South Province (Area One)', ev: '町と町の間の道路にあたる場所の名前の付け方。' },
  { c: 'term', ja: 'パラドックスポケモン', en: 'Paradox Pokémon', sp: 2, cf: 3, jo: 'paradox（逆説・時間の矛盾）', eo: 'paradox', ev: '' },
  { c: 'term', ja: 'スカーレットブック', en: 'Scarlet Book', sp: 2, cf: 3, jo: 'スカーレット＋book', eo: 'Scarlet＋book', ev: '作中の古い探検記。パラドックスポケモンの名前の出どころとされる。' },
  { c: 'term', ja: 'バイオレットブック', en: 'Violet Book', sp: 2, cf: 3, jo: 'バイオレット＋book', eo: 'Violet＋book', ev: '作中の古い書物。パラドックスポケモンの名前の出どころとされる。' },
  { c: 'term', ja: 'ザ・ホームウェイ', en: 'The Way Home', sp: 3, cf: 3, jo: 'the way home（家に帰る道）', eo: 'the way home', ev: '最後の物語の名前。' }
];

// data.js の技はすべて第9世代で登場した技
BASE_ENTRIES.forEach((e) => { if (e.c === 'move') e.g9 = true; });

// ほかのファイル（data-pokemon.js / data-tm.js / data-items.js）とまとめる
const ENTRIES = typeof module !== 'undefined'
  ? [].concat(require('./data-pokemon.js'), BASE_ENTRIES, require('./data-tm.js'), require('./data-items.js'), require('./data-items2.js'), require('./data-materials.js'), require('./data-life.js'), require('./data-fashion.js'), require('./data-trainers.js'), require('./data-marks.js'), require('./data-abilities.js'), require('./data-abilities2.js'), require('./data-natures.js'))
  : [].concat(POKEMON_ENTRIES, BASE_ENTRIES, TM_ENTRIES, ITEM_ENTRIES, ITEM2_ENTRIES, MATERIAL_ENTRIES, LIFE_ENTRIES, FASHION_ENTRIES, TRAINER_ENTRIES, MARK_ENTRIES, ABILITY_ENTRIES, ABILITY2_ENTRIES, NATURE_ENTRIES);

// 本編のバッグに入る道具（収録状況の分母）。ポケモンの落とし物は data-materials.js の全件
const BAG = new Set([].concat(typeof module !== 'undefined' ? require('./data-bag.js') : BAG_ITEMS,
  ENTRIES.filter((e) => (e.t || []).includes('material')).map((e) => e.en), ['Gimmighoul Coin']));
ENTRIES.forEach((e) => { if ((['item', 'food'].includes(e.c) || / Book$/.test(e.en)) && BAG.has(e.en)) e.bag = true; });

// ---- 一覧で分けて表示する小分類（人物・アイテム・料理・技・用語・ファッション） ----
ENTRIES.forEach((e, i) => { e.idx0 = i; });
const SUB_ORDER = {
  person: ['主人公・ライバル', '博士', 'ジムリーダー', 'ポケモンリーグ', 'スター団', 'アカデミーの先生', 'そのほかの人物', 'トレーナーの種類'],
  item: ['ボール', '回復・飲み物', '育成（ドーピング・アメ・ミント）', 'バトル用の使い捨て道具', '持ち物（バトル用）', 'タイプの技を強くする持ち物', '進化・姿を変える道具', 'テラスタル・テラピース', 'きのみ', 'お宝（売るための道具）', '大切なもの', 'ピクニック用品', 'ポケモンの落とし物'],
  food: ['サンドウィッチのレシピ', 'サンドウィッチの材料・調味料', 'お店のメニュー', 'ピクニック・食事'],
  move: ['第9世代で登場した技', 'わざマシンの技'],
  term: ['ゲームのしくみ（システム）', 'せいかく（25種）', 'リボン・あかし・二つ名', '物語・組織・場所の言葉'],
  ability: ['第9世代で登場したとくせい', '第8世代までに登場したとくせい'],
  fashion: ['ブランド', '制服・上下', 'ヘッドウェア', 'アイウェア', 'グローブ', 'バッグ', 'レッグウェア', 'シューズ', 'スマホロトムのカバー']
};
const ITEM_SUB = {
  'ボール': ['Poké Ball', 'Great Ball', 'Ultra Ball', 'Master Ball', 'Premier Ball', 'Heal Ball', 'Net Ball', 'Nest Ball', 'Dive Ball', 'Dusk Ball', 'Timer Ball', 'Quick Ball', 'Repeat Ball', 'Luxury Ball', 'Level Ball', 'Lure Ball', 'Heavy Ball', 'Love Ball', 'Friend Ball', 'Moon Ball', 'Fast Ball', 'Dream Ball', 'Beast Ball'],
  '回復・飲み物': ['Potion', 'Super Potion', 'Hyper Potion', 'Max Potion', 'Full Restore', 'Revive', 'Max Revive', 'Full Heal', 'Antidote', 'Paralyze Heal', 'Awakening', 'Burn Heal', 'Ice Heal', 'Ether', 'Max Ether', 'Elixir', 'Max Elixir', 'Fresh Water', 'Soda Pop', 'Lemonade', 'Moomoo Milk', 'Energy Powder', 'Energy Root', 'Heal Powder', 'Revival Herb'],
  '育成（ドーピング・アメ・ミント）': ['HP Up', 'Protein', 'Iron', 'Calcium', 'Zinc', 'Carbos', 'PP Up', 'PP Max', 'Rare Candy', 'Ability Capsule', 'Ability Patch', 'Bottle Cap', 'Gold Bottle Cap', 'Health Feather', 'Muscle Feather', 'Resist Feather', 'Genius Feather', 'Clever Feather', 'Swift Feather'],
  'バトル用の使い捨て道具': ['Guard Spec.', 'Dire Hit', 'X Attack', 'X Defense', 'X Speed', 'X Accuracy', 'X Sp. Atk', 'X Sp. Def', 'Poké Doll', 'Escape Rope'],
  '進化・姿を変える道具': ['Fire Stone', 'Water Stone', 'Thunder Stone', 'Leaf Stone', 'Ice Stone', 'Moon Stone', 'Sun Stone', 'Shiny Stone', 'Dusk Stone', 'Dawn Stone', 'Oval Stone', 'Everstone', "King's Rock", 'Metal Coat', 'Razor Claw', 'Sweet Apple', 'Tart Apple', 'Cracked Pot', 'Chipped Pot', 'Auspicious Armor', 'Malicious Armor', "Leader's Crest", 'Gimmighoul Coin', 'Red Nectar', 'Yellow Nectar', 'Pink Nectar', 'Purple Nectar', 'Rotom Catalog'],
  'タイプの技を強くする持ち物': ['Soft Sand', 'Hard Stone', 'Miracle Seed', 'Black Glasses', 'Black Belt', 'Magnet', 'Mystic Water', 'Sharp Beak', 'Poison Barb', 'Never-Melt Ice', 'Spell Tag', 'Twisted Spoon', 'Charcoal', 'Dragon Fang', 'Silk Scarf', 'Silver Powder', 'Fairy Feather', 'Metal Coat', 'Normal Gem', 'Punching Glove'],
  'テラスタル・テラピース': ['Tera Orb', 'Tera Shard'],
  'お宝（売るための道具）': ['Tiny Mushroom', 'Big Mushroom', 'Balm Mushroom', 'Pearl', 'Big Pearl', 'Pearl String', 'Stardust', 'Star Piece', 'Comet Shard', 'Nugget', 'Big Nugget', 'Honey', 'Rare Bone', 'Pretty Feather', 'Tiny Bamboo Shoot', 'Big Bamboo Shoot'],
  '大切なもの': ['Rotom Phone', 'TM Machine', 'Adventure Guide', 'Oval Charm', 'Shiny Charm', 'Sandwich', "Koraidon's Poké Ball", "Miraidon's Poké Ball", "Kofu's Wallet", 'Herba Mystica']
};
const ITEM_SUB_OF = {};
Object.entries(ITEM_SUB).forEach(([sub, list]) => list.forEach((en) => { ITEM_SUB_OF[en] = sub; }));
function subOf(e) {
  const t = e.t || [];
  if (e.sub) return e.sub;
  if (e.c === 'item') {
    if (t.includes('material')) return 'ポケモンの落とし物';
    if (t.includes('shard')) return 'テラスタル・テラピース';
    if (t.includes('mint') || t.includes('candy')) return '育成（ドーピング・アメ・ミント）';
    if (t.includes('picnic') || e.en === 'Baguette') return 'ピクニック用品';
    if (t.includes('berry') || / Berry$/.test(e.en)) return 'きのみ';
    return ITEM_SUB_OF[e.en] || '持ち物（バトル用）';
  }
  if (e.c === 'food') return t.includes('sand') ? 'サンドウィッチのレシピ' : t.includes('menu') ? 'お店のメニュー' : t.includes('ing') ? 'サンドウィッチの材料・調味料' : 'ピクニック・食事';
  if (e.c === 'move') return e.g9 ? '第9世代で登場した技' : 'わざマシンの技';
  if (e.c === 'fashion') return t.includes('brand') ? 'ブランド' : 'ヘッドウェア';
  if (e.c === 'person') {
    if (t.includes('tclass')) return 'トレーナーの種類';
    if (t.includes('gym')) return 'ジムリーダー';
    if (t.includes('league') || e.ja === 'ハッサク' || e.ja === 'アオキ') return 'ポケモンリーグ';
    if (t.includes('star')) return 'スター団';
    if (t.includes('teacher')) return 'アカデミーの先生';
    if (t.includes('prof')) return '博士';
    if (t.includes('hero') || t.includes('rival')) return '主人公・ライバル';
    return 'そのほかの人物';
  }
  if (e.c === 'ability') return t.includes('ability9') ? '第9世代で登場したとくせい' : '第8世代までに登場したとくせい';
  if (e.c === 'term' && t.includes('nature')) return 'せいかく（25種）';
  if (e.c === 'term') return (t.includes('mark') || t.includes('ribbon') || t.includes('markinfo')) ? 'リボン・あかし・二つ名' : t.includes('system') ? 'ゲームのしくみ（システム）' : '物語・組織・場所の言葉';
  return '';
}
ENTRIES.forEach((e) => { const s = subOf(e); if (s) e.sub = s; });

// ---- カテゴリの中での並び順 ----
// 技：わざマシンの番号順（番号のない技は後ろ）。とくせい：パルデア図鑑でいちばん早く出てくる持ち主の順
const ABILITY_ORD = typeof module !== 'undefined' ? require('./data-abilities2.js').ABILITY_ORDER : ABILITY_ORDER;
ENTRIES.forEach((e) => {
  if (e.c === 'move') e.ord = e.tm || 1000 + e.idx0;
  if (e.c === 'ability') e.ord = (ABILITY_ORD[e.en] || 999) * 10000 + e.idx0;
});

// お店の出店先（data-shoplocs.js）
const SHOPLOC = typeof module !== 'undefined' ? require('./data-shoplocs.js') : { SHOP_TOWNS, SHOP_LOCS, SHOP_NOTES };
ENTRIES.forEach((e) => { if (e.c === 'shop' && SHOPLOC.SHOP_LOCS[e.ja]) e.loc = SHOPLOC.SHOP_LOCS[e.ja]; });

// 食事パワー（data-food.js）
const FOOD = typeof module !== 'undefined' ? require('./data-food.js') : { MENU_INFO, SAND_INFO, ING_INFO, ING_BUY, FLAVOR_RULE };
ENTRIES.forEach((e) => {
  const t = e.t || [];
  if (t.includes('menu') && FOOD.MENU_INFO[e.ja]) e.menu = FOOD.MENU_INFO[e.ja];
  if (t.includes('sand') && FOOD.SAND_INFO[e.ja]) e.recipes = FOOD.SAND_INFO[e.ja];
  if (t.includes('ing') && FOOD.ING_INFO[e.en]) e.ingv = FOOD.ING_INFO[e.en];
  if (t.includes('ing') && FOOD.ING_BUY[e.en]) e.buy = FOOD.ING_BUY[e.en];
  if (e.c === 'food' && e.ja === '食事パワー') e.flavorRule = FOOD.FLAVOR_RULE;
});

// 技の性能をまとめる
const MOVE_STATS_ALL = typeof module !== 'undefined' ? require('./data-movestats.js') : MOVE_STATS;
ENTRIES.forEach((e) => {
  const st = e.c === 'move' && MOVE_STATS_ALL[e.en];
  if (st) { const [type, cls, pw, ac, pp, prio] = st; Object.assign(e, { ty: [type], mcls: cls, pw, ac, pp, prio }); }
});

/*
 * 収録状況の集計範囲。total（分母）が概算のものは approx: true にする。
 * 分母の根拠は docs/COVERAGE.md にまとめています。
 */
const SCOPES = [
  { group: 'ポケモン', label: 'パルデア図鑑（本編 400 種）', total: 400, match: (e) => e.c === 'pokemon' && !!e.p },
  { group: 'ポケモン', label: 'スカーレット・バイオレット初登場（No.906〜1008）', total: 103, match: (e) => e.c === 'pokemon' && e.no >= 906 && e.no <= 1008 },
  { group: 'ポケモン', label: 'パルデア図鑑にないが本編で手に入るポケモン（交換・もらう）', total: 2, match: (e) => (e.t || []).includes('offdex') },
  { group: 'ポケモン', label: 'パラドックスポケモン（本編）', total: 16, match: (e) => e.c === 'pokemon' && e.cat && e.cat[1] === 'Paradox Pokémon' },
  { group: 'わざマシン', label: 'わざマシン（本編 No.001〜171）', total: 171, match: (e) => !!e.tm },
  { group: '技', label: 'わざマシンの技のうち、第1〜8世代からある技', total: 165, match: (e) => e.c === 'move' && !!e.tm && !e.g9 },
  { group: '技', label: '第9世代で登場した技（本編。スターモービルの技を含む）', total: 48, match: (e) => !!e.g9 },
  { group: 'アイテム', label: '第9世代で登場した持ち物（バトル用）', total: 8, match: (e) => (e.t || []).includes('held9') },
  { group: 'アイテム', label: '第9世代で登場した進化用の道具', total: 4, match: (e) => (e.t || []).includes('evo9') },
  { group: 'アイテム', label: '本編のバッグに入る道具すべて（わざマシンを除く）', total: BAG.size, match: (e) => !!e.bag },
  { group: 'アイテム', label: 'ポケモンの落とし物（わざマシンの材料）', total: 181, match: (e) => (e.t || []).includes('material') || e.en === 'Gimmighoul Coin' },
  { group: 'とくせい', label: '本編のポケモンが持つとくせいすべて（隠れ特性を含む）', total: 215, match: (e) => e.c === 'ability' },
  { group: 'とくせい', label: 'そのうち第9世代で登場したとくせい', total: 31, match: (e) => (e.t || []).includes('ability9') },
  { group: '用語', label: 'せいかく', total: 25, match: (e) => (e.t || []).includes('nature') },
  { group: '人物', label: 'ジムリーダー', total: 8, match: (e) => (e.t || []).includes('gym') },
  { group: '人物', label: 'ポケモンリーグ（四天王・トップ）', total: 5, match: (e) => (e.t || []).includes('league') || e.ja === 'ハッサク' || e.ja === 'アオキ' },
  { group: '人物', label: 'スター団のボス（5 人＋カシオペア）', total: 6, match: (e) => (e.t || []).includes('star') },
  { group: '人物', label: 'アカデミーの先生（校長・保健室を含む）', total: 9, match: (e) => (e.t || []).includes('teacher') },
  { group: '人物', label: 'トレーナーの種類（本編のパルデアで勝負するもの）', total: 23, match: (e) => (e.t || []).includes('tclass') },
  { group: '用語', label: 'あかし（本編で付くもの）', total: 47, match: (e) => (e.t || []).includes('mark') },
  { group: '用語', label: 'リボン（本編でもらえるもの）', total: 4, match: (e) => (e.t || []).includes('ribbon') },
  { group: '地名', label: '町・都市', total: 12, match: (e) => (e.t || []).includes('town') },
  { group: '地名', label: 'パルデア十景', total: 10, match: (e) => (e.t || []).includes('sight') },
  { group: '地名', label: '災厄のポケモンの祠', total: 4, match: (e) => (e.t || []).includes('shrine') },
  { group: 'お店', label: 'お店・飲食店（本編のチェーン店と専門店）', total: 32, match: (e) => e.c === 'shop' },
  { group: 'お店', label: '出店先の町が分かるお店（フレンドリィショップを除く）', total: 31, match: (e) => e.c === 'shop' && !!e.loc },
  { group: '料理', label: 'サンドウィッチのレシピ（系統）', total: 37, match: (e) => (e.t || []).includes('sand') },
  { group: '料理', label: '飲食店のメニュー（本編。寿司のセットはまとめて数える）', total: 58, match: (e) => (e.t || []).includes('menu') },
  { group: '料理', label: '食事パワーが分かるメニュー', total: 58, match: (e) => !!e.menu },
  { group: '料理', label: 'レシピと食事パワーが分かるサンドウィッチの系統', total: 37, match: (e) => !!e.recipes },
  { group: '料理', label: 'サンドウィッチの材料・調味料', total: 58, match: (e) => (e.t || []).includes('ing') },
  { group: 'ファッション', label: 'ファッションブランド', total: 14, match: (e) => (e.t || []).includes('brand') },
  { group: 'ファッション', label: '服・小物・スマホロトムのカバー（本編で手に入るもの）', total: 129, match: (e) => (e.t || []).includes('clothes') }
];

// ---- クイズの問題文と正解（同じ問題文で正解が複数になるものを見つけるため。app.js と tools/check.js で共通） ----
// [問題文として見えるもの, 正解として表示するもの]。問題カードには分類のバッジも出るので、カテゴリも問題文に含める
const first = (v) => (Array.isArray(v) ? v[0] : v);
const QUIZ_KEYS = {
  origin: (e) => [e.ja, first(e.jo)],
  name: (e) => [first(e.jo) + '｜' + e.c, e.ja],
  ja2en: (e) => [e.ja + '｜' + e.c, e.en],
  en2ja: (e) => [e.en + '｜' + e.c, e.ja],
  eorigin: (e) => [e.en + '｜' + e.ja, first(e.eo)]
};
// 問題文が同じで正解が違うもの（どちらを答えればよいか決まらない問題）の集合を返す
function quizAmbiguous(modeId, list) {
  const key = QUIZ_KEYS[modeId];
  if (!key) return new Set();
  const byQ = new Map();
  for (const e of list) { const [q, a] = key(e); if (!byQ.has(q)) byQ.set(q, []); byQ.get(q).push([e, a]); }
  const out = new Set();
  for (const arr of byQ.values()) if (new Set(arr.map(([, a]) => a)).size > 1) arr.forEach(([e]) => out.add(e));
  return out;
}

if (typeof module !== 'undefined') module.exports = { CATS, SPOILERS, ENTRIES, SCOPES, SUB_ORDER, SHOPLOC, QUIZ_KEYS, quizAmbiguous };
