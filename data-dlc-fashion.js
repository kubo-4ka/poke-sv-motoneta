/*
 * ポケモンSV元ネタ推測図鑑 ― 追加コンテンツ「ゼロの秘宝」のファッション
 *
 * 碧の仮面（kitakami）・藍の円盤（blueberry）で手に入る服・小物・スマホロトムのカバーです（色違いはまとめて1件）。
 * 名前と入手方法は Bulbapedia（List of clothing in Pokémon Scarlet and Violet）で照らし合わせました。由来は作者の推測です。
 * ネタバレ段階：ふつうに手に入るものは「本編」、藍の円盤のクリア後（特別講師やリーグ部の再戦）にもらうものは「クリア後」。
 *
 * [小分類, 日本語名, 英語名, どちらの追加コンテンツか, ネタバレ段階, 日本語名の由来, 英語名の由来, 補足]
 */
var DLC_FASHION_ENTRIES = [
  // 制服・上下
  ['制服・上下', 'ニューせいふく（はる）', 'New Spring Uniform', 'kitakami', 1, 'new（新しい）＋制服（せいふく）＋春', 'new＋spring（春）＋uniform', '追加コンテンツを買うともらえる、アカデミーの新しい制服。夏・秋・冬もある。'],
  ['制服・上下', 'ニューせいふく（なつ）', 'New Summer Uniform', 'kitakami', 1, 'new＋制服＋夏', 'new＋summer＋uniform', ''],
  ['制服・上下', 'ニューせいふく（あき）', 'New Autumn Uniform', 'kitakami', 1, 'new＋制服＋秋', 'new＋autumn＋uniform', ''],
  ['制服・上下', 'ニューせいふく（ふゆ）', 'New Winter Uniform', 'kitakami', 1, 'new＋制服＋冬', 'new＋winter＋uniform', ''],
  ['制服・上下', 'おまつりじんべえ', 'Festival Jinbei', 'kitakami', 1, 'お祭り＋甚兵衛（じんべえ＝夏に着る和服の上下）', 'festival＋jinbei（甚兵衛をそのまま英語に）', 'オモテ祭りの前に、ゼイユとスグリのおばあさんがくれる。英語にも jinbei がそのまま使われている。'],
  ['制服・上下', 'ＢＢせいふく（はる）', 'BB Spring Uniform', 'blueberry', 1, 'BB（ブルーベリー）＋制服＋春', 'BB（Blueberry）＋spring uniform', 'ブルーベリー学園の制服。シアノ校長がくれる。夏・秋・冬もある。'],
  ['制服・上下', 'ＢＢせいふく（なつ）', 'BB Summer Uniform', 'blueberry', 1, 'BB＋制服＋夏', 'BB＋summer uniform', ''],
  ['制服・上下', 'ＢＢせいふく（あき）', 'BB Autumn Uniform', 'blueberry', 1, 'BB＋制服＋秋', 'BB＋autumn uniform', ''],
  ['制服・上下', 'ＢＢせいふく（ふゆ）', 'BB Winter Uniform', 'blueberry', 1, 'BB＋制服＋冬', 'BB＋winter uniform', ''],
  ['制服・上下', 'ＢＢジャージセットアップ', 'BB Tracksuit', 'blueberry', 1, 'BB＋jersey（ジャージ）＋set up（上下そろい）', 'BB＋tracksuit（運動着の上下）', 'リーグ部で、カキツバタがくれる。日本語の「ジャージ」は運動着を指す和製英語に近い使い方で、英語では tracksuit。'],
  ['制服・上下', 'リーグ部のふく', 'League Club Uniform', 'blueberry', 1, 'リーグ部＋服', 'League Club＋uniform', 'リーグ部の部員の服。'],
  ['制服・上下', 'かいぞうせいふくＴＹＰＥ１', 'Modified Uniform A', 'blueberry', 3, '改造（かいぞう）制服＋type 1。スター団の改造制服', 'modified（改造した）＋uniform＋A', 'スター団の特別講師の授業のあと、スター団からもらう。日本語は「TYPE1・2」、英語は「A・B」。'],
  ['制服・上下', 'かいぞうせいふくＴＹＰＥ２', 'Modified Uniform B', 'blueberry', 3, '改造制服＋type 2', 'modified uniform＋B', ''],
  // レッグウェア
  ['レッグウェア', 'スクールソックス', 'School Socks', 'kitakami', 1, 'school（学校）＋socks（靴下）', 'school socks', '新しい制服とセットの靴下。'],
  ['レッグウェア', 'スクールタイツ', 'School Tights', 'kitakami', 1, 'school＋tights（タイツ）', 'school tights', ''],
  ['レッグウェア', 'ボーダーハイソックス', 'Striped High Socks', 'kitakami', 1, 'border（ボーダー＝横じま）＋high socks', 'striped（しま模様の）＋high socks', '日本語の「ボーダー」は横じまを指す和製英語。英語では striped。'],
  ['レッグウェア', 'てあみのくつした', 'Knitted Socks', 'kitakami', 1, '手編み（てあみ）の靴下', 'knitted（編んだ）＋socks', '桃沢商店で買える。'],
  ['レッグウェア', 'みずたまハイソックス', 'Poké Dot High Socks', 'kitakami', 1, '水玉（みずたま＝水玉模様）＋high socks', 'polka dot（水玉模様）とPokéの掛け言葉＋high socks', '英語は polka dot の polka を Poké に替えた言葉遊び。'],
  ['レッグウェア', 'フラワープリントタイツ', 'Flower-Print Tights', 'kitakami', 1, 'flower print（花柄）＋tights', 'flower-print tights', ''],
  ['レッグウェア', 'ＢＢスクールソックス', 'BB School Socks', 'blueberry', 1, 'BB＋school socks', 'BB school socks', 'ブルーベリー学園の制服とセット。'],
  ['レッグウェア', 'バイカラータイツ', 'Bicolor Tights', 'blueberry', 1, 'bicolor（2色の）＋tights', 'bicolor tights', ''],
  // シューズ
  ['シューズ', 'スクールローファー', 'School Loafers', 'kitakami', 1, 'school＋loafer（ひものない革靴）', 'school loafers', ''],
  ['シューズ', 'スリッポン', 'Slip-Ons', 'kitakami', 1, 'slip-on（ひもがなく足を入れるだけの靴）', 'slip-ons', ''],
  ['シューズ', 'カジュアルスニーカー', 'Casual Sandals', 'kitakami', 1, 'casual（気軽な）＋sneaker（スニーカー）', 'casual＋sandals（サンダル）', '日本語は「スニーカー」、英語は「サンダル」と、名前の靴の種類が違う。'],
  ['シューズ', 'ＢＢスクールスニーカー', 'BB School Shoes', 'blueberry', 1, 'BB＋school＋sneaker', 'BB school shoes', ''],
  ['シューズ', 'ランニングスニーカー', 'Running Shoes', 'blueberry', 1, 'running（走る）＋sneaker', 'running shoes', ''],
  ['シューズ', 'エーテルシューズレプリカ', 'Replica Aether Shoes', 'blueberry', 3, 'エーテル財団（アローラ地方の団体）の靴＋replica（複製）', 'replica＋Aether（エーテル財団）＋shoes', 'マリナード市場で買える、昔の作品の組織の服のレプリカ。'],
  ['シューズ', 'ゴーストスニーカー', 'Ghost Sneakers', 'blueberry', 3, 'ghost（おばけ）＋sneaker', 'ghost sneakers', 'リーグ部での再戦のあと、ライムがくれる。'],
  ['シューズ', 'スターローヒール', 'Team Star Heels', 'blueberry', 3, 'star（スター団）＋low heel（低いかかと）', 'Team Star＋heels', ''],
  // グローブ
  ['グローブ', 'ニュースクールグローブ', 'New School Gloves', 'kitakami', 1, 'new＋school＋gloves（手袋）', 'new school gloves', ''],
  ['グローブ', 'トレーナーグローブ', 'Trainer Gloves', 'kitakami', 1, 'trainer＋gloves', 'trainer gloves', ''],
  ['グローブ', 'てあみのてぶくろ', 'Knitted Gloves', 'kitakami', 1, '手編みの手袋', 'knitted gloves', '桃沢商店で買える。'],
  ['グローブ', 'ライドグローブ', 'Riding Gloves', 'kitakami', 1, 'ride（乗る）＋gloves', 'riding gloves', ''],
  ['グローブ', 'ＢＢスクールグローブ', 'BB School Glove', 'blueberry', 1, 'BB＋school gloves', 'BB school glove', ''],
  ['グローブ', 'ビッグ４グローブ', 'Elite Gloves', 'blueberry', 3, 'big 4（四天王）＋gloves', 'elite（エリート＝四天王 Elite Four）＋gloves', 'リーグ部での再戦のあと、オモダカがくれる。日本語の「ビッグ4」も英語の「Elite」も四天王のこと。'],
  ['グローブ', 'ドラゴングローブレプリカ', 'Replica Dragon Gloves', 'blueberry', 3, 'dragon＋gloves＋replica', 'replica dragon gloves', '昔の作品のドラゴン使いの手袋のレプリカ。'],
  ['グローブ', 'スターグローブ', 'Team Star Gloves', 'blueberry', 3, 'star＋gloves', 'Team Star gloves', ''],
  // バッグ
  ['バッグ', 'ニュースクールリュック', 'New School Backpack', 'kitakami', 1, 'new＋school＋Rucksack（リュック、ドイツ語）', 'new school backpack', '日本語の「リュック」はドイツ語の Rucksack から。英語は backpack。'],
  ['バッグ', '2WAYナイロンリュック', 'Two-Way Nylon Backpack', 'kitakami', 1, '2way（2通りに使える）＋nylon（ナイロン）＋リュック', 'two-way nylon backpack', ''],
  ['バッグ', 'クラシックレザーリュック', 'Classic Leather Backpack', 'kitakami', 1, 'classic（伝統的な）＋leather（革）＋リュック', 'classic leather backpack', ''],
  ['バッグ', 'フリルリュック', 'Frilly Backpack', 'kitakami', 1, 'frill（フリル）＋リュック', 'frilly（フリルのついた）＋backpack', ''],
  ['バッグ', 'ＢＢスクールリュック', 'BB School Backpack', 'blueberry', 1, 'BB＋school＋リュック', 'BB school backpack', ''],
  ['バッグ', 'エナメルリュック', 'Enamel Backpack', 'blueberry', 1, 'enamel（エナメル＝つやのある素材）＋リュック', 'enamel backpack', ''],
  ['バッグ', 'トライアングルリュック', 'Triangle Backpack', 'blueberry', 1, 'triangle（三角形）＋リュック', 'triangle backpack', ''],
  ['バッグ', 'リーダーバッグレプリカ', 'Replica Leader Bag', 'blueberry', 3, 'leader（ジムリーダー）＋bag＋replica', 'replica leader bag', ''],
  // ヘッドウェア
  ['ヘッドウェア', 'ニュースクールハット', 'New School Hat', 'kitakami', 1, 'new＋school＋hat', 'new school hat', ''],
  ['ヘッドウェア', 'おにのめん', 'Ogre Mask', 'kitakami', 1, '鬼の面', 'ogre（鬼）＋mask', 'キタカミセンターのお面屋で買える。'],
  ['ヘッドウェア', 'イイネイヌのめん', 'Okidogi Mask', 'kitakami', 1, 'イイネイヌ＋面', 'Okidogi＋mask', 'ともっこのお面。オモテ祭りの屋台で売られている。'],
  ['ヘッドウェア', 'マシマシラのめん', 'Munkidori Mask', 'kitakami', 1, 'マシマシラ＋面', 'Munkidori＋mask', ''],
  ['ヘッドウェア', 'キチキギスのめん', 'Fezandipiti Mask', 'kitakami', 1, 'キチキギス＋面', 'Fezandipiti＋mask', ''],
  ['ヘッドウェア', 'イーブイのめん', 'Eevee Mask', 'kitakami', 1, 'イーブイ＋面', 'Eevee＋mask', ''],
  ['ヘッドウェア', 'ピカチュウのめん', 'Pikachu Mask', 'kitakami', 1, 'ピカチュウ＋面', 'Pikachu＋mask', ''],
  ['ヘッドウェア', 'イヤーフラップキャップ', 'Earflap Cap', 'kitakami', 1, 'ear flap（耳当て）＋cap', 'earflap cap', ''],
  ['ヘッドウェア', 'カンカン帽', 'Boater Hat', 'kitakami', 1, 'カンカン帽（麦わらを固く編んだ平らな帽子。叩くとカンカンと音がするからとも）', 'boater（舟遊び用の帽子）＋hat', '日本語は音、英語はボート遊びで、同じ帽子の呼び方が違う。'],
  ['ヘッドウェア', 'ボチビーニー', 'Greavard Beanie', 'kitakami', 1, 'ボチ（ポケモン）＋beanie（ニット帽）', 'Greavard（ボチ）＋beanie', ''],
  ['ヘッドウェア', 'むぎわら帽', 'Straw Fedora', 'kitakami', 1, '麦わら帽（むぎわらぼう）', 'straw（麦わら）＋fedora（中折れ帽）', ''],
  ['ヘッドウェア', 'ぽんぽん帽', 'Pom-Pom Beanie', 'kitakami', 1, 'ぽんぽん（毛糸の玉飾り）＋帽', 'pom-pom＋beanie', ''],
  ['ヘッドウェア', 'テンガロンハット', 'Stampede Hat', 'blueberry', 1, 'ten-gallon hat（つばの広いカウボーイの帽子）', 'stampede（家畜の暴走）＋hat', '日本語は帽子の種類の名前、英語はカウボーイらしい言葉に言い換えている。'],
  ['ヘッドウェア', 'ハカドッグビーニー', 'Houndstone Beanie', 'blueberry', 1, 'ハカドッグ（ポケモン）＋beanie', 'Houndstone（ハカドッグ）＋beanie', ''],
  ['ヘッドウェア', 'ショートブリムキャップ', 'Short Brim Cap', 'blueberry', 1, 'short brim（短いつば）＋cap', 'short brim cap', ''],
  ['ヘッドウェア', 'ファーメトロハット', 'Fur Bucket Hat', 'blueberry', 1, 'fur（毛皮）＋metro hat（メトロハット＝つばが下向きの帽子）', 'fur＋bucket hat（バケットハット）', ''],
  ['ヘッドウェア', 'ボールガイメット', 'Ball Guy Helmet', 'blueberry', 3, 'ボールガイ（昔の作品のモンスターボールの頭のキャラクター）＋helmet', 'Ball Guy＋helmet', ''],
  ['ヘッドウェア', 'マグマメットレプリカ', 'Replica Magma Suit Helmet', 'blueberry', 3, 'マグマ団（ホウエン地方の組織）＋helmet＋replica', 'replica Magma suit helmet', ''],
  ['ヘッドウェア', 'アクアメットレプリカ', 'Replica Aqua Suit Helmet', 'blueberry', 3, 'アクア団（ホウエン地方の組織）＋helmet＋replica', 'replica Aqua suit helmet', ''],
  ['ヘッドウェア', 'ＥＸＰメットレプリカ', 'Replica Expansion Suit Helmet', 'blueberry', 3, 'expansion（拡張）スーツ＋helmet＋replica', 'replica expansion suit helmet', ''],
  ['ヘッドウェア', 'スターメット', 'Team Star Helmet', 'blueberry', 3, 'star（スター団）＋helmet（ヘルメット）', 'Team Star helmet', ''],
  ['ヘッドウェア', 'ネルケメット', 'Clive Wig', 'blueberry', 3, 'ネルケ（クラベル校長の変装の名前）＋helmet', 'Clive（ネルケの英語名）＋wig（かつら）', 'リーグ部での再戦のあと、クラベル校長がくれる。日本語は「メット」、英語は「かつら」。'],
  // アイウェア
  ['アイウェア', 'ヘキサゴングラス', 'Hexagonal Glasses', 'kitakami', 1, 'hexagon（六角形）＋glasses', 'hexagonal glasses', ''],
  ['アイウェア', 'ヘキサゴンサングラス', 'Hexagonal Sunglasses', 'kitakami', 1, 'hexagon＋sunglasses', 'hexagonal sunglasses', ''],
  ['アイウェア', 'クラウンパントグラス', 'Crown Panto Glasses', 'kitakami', 1, 'crown panto（上が平らな丸めがねの形）＋glasses', 'crown panto glasses', ''],
  ['アイウェア', 'クラウンパントサングラス', 'Crown Panto Sunglasses', 'kitakami', 1, 'crown panto＋sunglasses', 'crown panto sunglasses', ''],
  ['アイウェア', 'アンダーブローグラス', 'Half-Moon Glasses', 'kitakami', 1, 'under brow（下側だけ枠のあるめがね）＋glasses', 'half-moon（半月形の）glasses', '日本語は枠の位置、英語はレンズの形で呼んでいる。'],
  ['アイウェア', 'アンダーブローサングラス', 'Half-Moon Sunglasses', 'kitakami', 1, 'under brow＋sunglasses', 'half-moon sunglasses', ''],
  ['アイウェア', 'ブローグラス', 'Clubmaster Glasses', 'kitakami', 1, 'brow（まゆ＝上側だけ太い枠のめがね）＋glasses', 'Clubmaster（このかたちのめがねの代表的な商品名）＋glasses', ''],
  ['アイウェア', 'ブローサングラス', 'Clubmaster Sunglasses', 'kitakami', 1, 'brow＋sunglasses', 'Clubmaster sunglasses', ''],
  ['アイウェア', 'ジョークグラス', 'Joke Glasses', 'kitakami', 1, 'joke（冗談）＋glasses。鼻めがね', 'joke glasses', 'キタカミセンターのお面屋で買える、鼻とひげのついためがね。'],
  ['アイウェア', 'ＵＶカットスポーツグラス', 'Polarized Sports Sunglasses', 'blueberry', 1, 'UV cut（紫外線をさえぎる）＋sports glasses', 'polarized（偏光の）＋sports sunglasses', ''],
  ['アイウェア', 'ハートグラス', 'Heart Glasses', 'blueberry', 1, 'heart（ハート形）＋glasses', 'heart glasses', ''],
  ['アイウェア', 'ウルトラグラスレプリカ', 'Replica Ultra Glasses', 'blueberry', 3, 'ウルトラ調査隊（アローラ地方の組織）のめがね＋replica', 'replica Ultra glasses', ''],
  ['アイウェア', 'スターグラス', 'Team Star Sunglasses', 'blueberry', 3, 'star（スター団）＋glasses。星形のサングラス', 'Team Star sunglasses', ''],
  // スマホロトムのカバー
  ['スマホロトムのカバー', 'テラほのおカバー', 'Tera Fire Case', 'kitakami', 1, 'テラスタル＋ほのお＋cover', 'Tera＋fire＋case', 'キタカミセンターのお面屋で買える。日本語は「カバー」、英語は「case」。'],
  ['スマホロトムのカバー', 'テラみずカバー', 'Tera Water Case', 'kitakami', 1, 'テラスタル＋みず＋cover', 'Tera＋water＋case', ''],
  ['スマホロトムのカバー', 'テラくさカバー', 'Tera Grass Case', 'kitakami', 1, 'テラスタル＋くさ＋cover', 'Tera＋grass＋case', ''],
  ['スマホロトムのカバー', 'ボールカバー', 'Poké Ball Case', 'kitakami', 1, 'ball（モンスターボール）＋cover', 'Poké Ball＋case', '色が5種類ある。'],
  ['スマホロトムのカバー', 'イイネイヌカバー', 'Okidogi Case', 'kitakami', 1, 'イイネイヌ＋cover', 'Okidogi＋case', ''],
  ['スマホロトムのカバー', 'キチキギスカバー', 'Fezandipiti Case', 'kitakami', 1, 'キチキギス＋cover', 'Fezandipiti＋case', ''],
  ['スマホロトムのカバー', 'マシマシラカバー', 'Munkidori Case', 'kitakami', 1, 'マシマシラ＋cover', 'Munkidori＋case', ''],
  ['スマホロトムのカバー', 'セレブカバー', 'Glitterati Case', 'kitakami', 1, 'celeb（セレブ）＋cover', 'glitterati（セレブたち）＋case', 'ネアとの最後の勝負のあとにもらえる。'],
  ['スマホロトムのカバー', 'サンドウィッチカバー', 'Sandwich Case', 'blueberry', 3, 'sandwich＋cover', 'sandwich＋case', 'リーグ部での再戦のあと、ペパーがくれる。トマト・ベーコン・フルーツの3種類。'],
  ['スマホロトムのカバー', 'スターだんカバー', 'Team Star Case', 'blueberry', 3, 'スター団＋cover', 'Team Star＋case', ''],
  ['スマホロトムのカバー', 'なげやりカバー', 'Surrendering Sunflora Case', 'blueberry', 3, '投げやり（なげやり＝どうでもいいという態度）＋cover。コルサの「なげやり」なキマワリの芸術作品', 'surrendering（降参する）＋Sunflora（キマワリ）＋case', 'リーグ部での再戦のあと、コルサがくれる。'],
  ['スマホロトムのカバー', 'ドンナモンジャカバー', 'Iono Zone Case', 'blueberry', 3, 'どんなもんじゃ（ナンジャモの決めぜりふ）＋cover', 'Iono（ナンジャモ）＋zone＋case', 'リーグ部での再戦のあと、ナンジャモがくれる。'],
  ['スマホロトムのカバー', 'ブルーベリーカバー', 'Blueberry Case', 'blueberry', 3, 'blueberry（ブルーベリー学園）＋cover', 'Blueberry＋case', 'ホワイトはタロ、ブラックはスグリが、再戦のあとにくれる。']
].map(([sub, ja, en, dlc, sp, jo, eo, ev]) => ({ c: 'fashion', ja, en, sp, cf: 3, jo, eo, ev, dlc, sub, t: ['clothesdlc'] }));

if (typeof module !== 'undefined') module.exports = DLC_FASHION_ENTRIES;
