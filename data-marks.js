/*
 * ポケモンSV元ネタ推測図鑑 ― リボン・あかし・二つ名
 *
 * 本編（追加コンテンツなし）で手に入るリボンとあかしです。二つ名は、そのリボン・あかしを選ぶと
 * バトルでポケモンの名前といっしょに表示される呼び名（例：「おねむな ファイアロー」）。
 * 名前・二つ名・条件は Bulbapedia（Mark / List of Ribbons in the games）とポケモンWiki（あかし・二つ名・各リボン）で照らし合わせました。
 * 追加コンテンツやほかの作品・配信でしか付かないもの（のうむ・かんそう・つりあげられた・カレー・オヤブン・さいきょうのあかし、
 * パートナーリボン など）は入れていません。
 */
var MARK_ENTRIES = (function () {
  const list = [];
  // しくみの言葉
  list.push(
    { c: 'term', ja: 'あかし', en: 'Mark', sp: 0, cf: 3, jo: ['証（あかし＝しるし、証拠）。そのポケモンが「どんなときに・どんな様子で」出会ったかのしるし', '「〇〇のあかし」と、出会ったときの時間・天気・気分などを表す'], eo: 'mark（しるし・記号）', ev: '捕まえた野生のポケモンにまれに付いている特別なしるし。ステータス画面ではリボンと同じ場所に並ぶ。1つ選ぶと、バトルに出したときに二つ名が付く。', t: ['system', 'markinfo'] },
    { c: 'term', ja: 'リボン', en: 'Ribbon', sp: 0, cf: 3, jo: 'ribbon（リボン）。賞や記念の品として胸などに付けるリボン', eo: 'ribbon', ev: 'ポケモンががんばったこと・達成したことの記念にもらえる飾り。表彰のリボン（勲章の綬）のイメージ。1つ選ぶと二つ名が付く。', t: ['system', 'markinfo'] },
    { c: 'term', ja: '二つ名', en: 'Title', sp: 0, cf: 3, jo: ['二つ名（ふたつな）＝本名とは別の呼び名、異名・通り名', '武将や剣豪の「〇〇の〇〇」という異名のような呼び方'], eo: 'title（肩書き・称号）。英語では名前の後ろに the ～ と付く（例：Talonflame the Sleepy）', ev: 'リボンかあかしを1つ選ぶと、バトルで繰り出すときに名前の前に付く呼び名。例：しょうしのあかし →「おねむな ファイアロー」。日本語は名前の前、英語は後ろに付く。', t: ['system', 'markinfo'] }
  );

  // あかし：[日本語名, 漢字・意味, 二つ名, 英語名, 英語の二つ名, 英語の二つ名の意味, 付く条件, ネタバレ段階, 由来に不明点]
  const MARKS = [
    // 時間帯
    ['しょうごのあかし', '正午（しょうご＝お昼の12時）', 'はらペコの', 'Lunchtime Mark', 'the Peckish', 'peckish＝小腹がすいた', '昼に出会った野生のポケモンにまれに付く'],
    ['しょうしのあかし', '（漢字は示されていない）', 'おねむな', 'Sleepy-Time Mark', 'the Sleepy', 'sleepy＝眠い', '夜に出会った野生のポケモンにまれに付く', 0, '「しょうし」がどんな漢字なのかは、ゲーム内でも wiki でも説明が見つかりません。「宵（よい）」「消灯（しょうとう）」など夜に関係する言葉からの造語か、「正午（しょうご）」と対にした響きと推測されます。'],
    ['たそがれのあかし', '黄昏（たそがれ＝夕暮れ）。「誰そ彼（たそかれ＝あれはだれ？）」と顔が見分けにくい時間から', 'そろそろねむい', 'Dusk Mark', 'the Dozy', 'dozy＝うとうとした', '夕方に出会った野生のポケモンにまれに付く'],
    ['あかつきのあかし', '暁（あかつき＝夜明け前）', 'はやくにめざめた', 'Dawn Mark', 'the Early Riser', 'early riser＝早起きの人', '朝に出会った野生のポケモンにまれに付く'],
    // 天気
    ['どんてんのあかし', '曇天（どんてん＝くもり空）', 'くもをみつめる', 'Cloudy Mark', 'the Cloud Watcher', 'cloud watcher＝雲をながめる人', 'くもりの日に出会った野生のポケモンにまれに付く'],
    ['あめふりのあかし', '雨降り', 'あめにむせぶ', 'Rainy Mark', 'the Sodden', 'sodden＝びしょぬれの', '雨の日に出会った野生のポケモンにまれに付く'],
    ['いかづちのあかし', '雷（いかづち＝かみなりの古い言い方）', 'かみなりにさわぐ', 'Stormy Mark', 'the Thunderstruck', 'thunderstruck＝雷に打たれたように驚いた', '雷雨の日に出会った野生のポケモンにまれに付く'],
    ['こうせつのあかし', '降雪（こうせつ＝雪が降ること）', 'ゆきにころがる', 'Snowy Mark', 'the Snow Frolicker', 'frolicker＝はしゃぎ回る者', '雪の日に出会った野生のポケモンにまれに付く'],
    ['ごうせつのあかし', '豪雪（ごうせつ＝大雪）', 'こごえふるえる', 'Blizzard Mark', 'the Shivering', 'shivering＝震えている', '吹雪の日に出会った野生のポケモンにまれに付く'],
    ['さじんのあかし', '砂塵（さじん＝砂ぼこり）', 'すなにまみれる', 'Sandstorm Mark', 'the Sandswept', 'sandswept＝砂に吹きさらされた', '砂あらしの日に出会った野生のポケモンにまれに付く'],
    // 特別な日・めずらしさ
    ['うんめいのあかし', '運命', 'うんめいかんじる', 'Destiny Mark', 'the Chosen One', 'the chosen one＝選ばれし者', 'プレイヤーの誕生日（設定した日）に出会った野生のポケモンにまれに付く'],
    ['ときどきみるあかし', '時々見る', 'ひとになれてる', 'Uncommon Mark', 'the Sociable', 'sociable＝人なつっこい', '野生のポケモンにまれに付く'],
    ['みたことのないあかし', '見たことのない', 'ひとをしらない', 'Rare Mark', 'the Recluse', 'recluse＝世捨て人・引きこもり', '野生のポケモンにごくまれに付く、とてもめずらしいあかし'],
    // 性格・気分
    ['わんぱくなあかし', '腕白（わんぱく＝いたずら好きで元気）', 'あばれんぼうの', 'Rowdy Mark', 'the Rowdy', 'rowdy＝騒がしい・乱暴な'],
    ['のうてんきなあかし', '能天気（のうてんき＝のんきで深く考えない）', 'なにもかんがえてない', 'Absent-Minded Mark', 'the Spacey', 'spacey＝ぼんやりした'],
    ['きんちょうのあかし', '緊張', 'ドキドキしてる', 'Jittery Mark', 'the Anxious', 'anxious＝不安な'],
    ['きたいのあかし', '期待', 'ワクワクしてる', 'Excited Mark', 'the Giddy', 'giddy＝浮かれた'],
    ['カリスマのあかし', 'charisma（カリスマ＝人を引きつける力）', 'オーラをかんじる', 'Charismatic Mark', 'the Radiant', 'radiant＝光り輝く'],
    ['れいせいのあかし', '冷静', 'クールな', 'Calmness Mark', 'the Serene', 'serene＝落ち着いた'],
    ['じょうねつのあかし', '情熱', 'アグレッシブな', 'Intense Mark', 'the Feisty', 'feisty＝威勢のいい'],
    ['ゆだんのあかし', '油断', 'ボーっとしてる', 'Zoned-Out Mark', 'the Daydreamer', 'daydreamer＝空想にふける人'],
    ['たこうのあかし', '多幸（たこう＝幸せが多いこと）', 'しあわせそうな', 'Joyful Mark', 'the Joyful', 'joyful＝うれしそうな'],
    ['ふんぬのあかし', '憤怒（ふんぬ＝激しい怒り）', 'プンプンおこる', 'Angry Mark', 'the Furious', 'furious＝激怒した'],
    ['びしょうのあかし', '微笑（びしょう＝ほほえみ）', 'ニコニコわらう', 'Smiley Mark', 'the Beaming', 'beaming＝にこにこした'],
    ['ひそうのあかし', '悲愴（ひそう＝悲しくいたましい）', 'メソメソなく', 'Teary Mark', 'the Teary-Eyed', 'teary-eyed＝涙ぐんだ'],
    ['かいちょうのあかし', '快調（かいちょう＝調子がいい）', 'ごきげんな', 'Upbeat Mark', 'the Chipper', 'chipper＝元気で陽気な'],
    ['げきはつのあかし', '激発（げきはつ＝感情が激しく爆発する）', 'ふきげんな', 'Peeved Mark', 'the Grumpy', 'grumpy＝不機嫌な'],
    ['りせいのあかし', '理性', 'ちてきな', 'Intellectual Mark', 'the Scholar', 'scholar＝学者'],
    ['ほんのうのあかし', '本能', 'あれくるう', 'Ferocious Mark', 'the Rampaging', 'rampaging＝暴れ回る'],
    ['こうかつのあかし', '狡猾（こうかつ＝ずる賢い）', 'スキをねらう', 'Crafty Mark', 'the Opportunist', 'opportunist＝機会をうかがう人'],
    ['こわもてのあかし', '強面（こわもて＝怖い顔つき）', 'いかつい', 'Scowling Mark', 'the Stern', 'stern＝いかめしい'],
    ['やさがたのあかし', '優形（やさがた＝やさしい姿・顔つき）', 'やさしげな', 'Kindly Mark', 'the Kindhearted', 'kindhearted＝心やさしい'],
    ['どうようのあかし', '動揺', 'あわてんぼうの', 'Flustered Mark', 'the Easily Flustered', 'easily flustered＝すぐ慌てる'],
    ['こうようのあかし', '高揚（こうよう＝気分が高まる）', 'やるきまんまんの', 'Pumped-Up Mark', 'the Driven', 'driven＝やる気に駆られた'],
    ['けんたいのあかし', '倦怠（けんたい＝だるくて、やる気が出ない）', 'やるきゼロの', 'Zero Energy Mark', 'the Apathetic', 'apathetic＝無気力な'],
    ['じしんのあかし', '自信', 'ふんぞりかえった', 'Prideful Mark', 'the Arrogant', 'arrogant＝傲慢な'],
    ['ふしんのあかし', '不信（ふしん＝自分を信じられない）', 'じしんのない', 'Unsure Mark', 'the Reluctant', 'reluctant＝気が進まない', null, 0, '「ふしん」の漢字は示されていません。二つ名が「じしんのない」なので「不信」とみていますが、「不振（調子が出ない）」の可能性もあります。'],
    ['ぼくとつのあかし', '朴訥（ぼくとつ＝飾り気がなく口べた）', 'そぼくな', 'Humble Mark', 'the Humble', 'humble＝控えめな'],
    ['ふじゅんのあかし', '（漢字は示されていない）', 'きどっている', 'Thorny Mark', 'the Pompous', 'pompous＝もったいぶった。英語の Thorny は「とげとげしい」', null, 0, '「ふじゅん」の漢字は示されていません。「不純（すなおでない）」とすると二つ名「きどっている」とつながりますが、推測です。'],
    ['げんきのあかし', '元気', 'げんきいっぱいの', 'Vigor Mark', 'the Lively', 'lively＝生き生きした'],
    ['ふちょうのあかし', '不調（ふちょう＝調子が悪い）', 'どこかくたびれた', 'Slump Mark', 'the Worn-Out', 'worn-out＝くたびれた'],
    // 本作で登場したあかし
    ['でっかいあかし', 'でっかい（とても大きい）', 'でっかい', 'Jumbo Mark', 'the Great', 'great＝大きな・偉大な', 'いちばん大きいサイズのポケモンを、そのサイズを調べている人に見せるともらえる', 1],
    ['ちっちゃいあかし', 'ちっちゃい（とても小さい）', 'ちっちゃい', 'Mini Mark', 'the Teeny', 'teeny＝ちっちゃな', 'いちばん小さいサイズのポケモンを、そのサイズを調べている人に見せるともらえる', 1],
    ['ものひろいのあかし', '物拾い（落ちている物を拾うこと）。特性「ものひろい」と同じ言葉', 'トレジャーハンター', 'Itemfinder Mark', 'the Treasure Hunter', 'treasure hunter＝宝探しをする人。Itemfinder は昔の作品の道具「ダウジングマシン」の英語名', '道具を拾ったときに、手持ちの先頭のポケモンにまれに付く'],
    ['あいぼうのあかし', '相棒（あいぼう＝いっしょに行動する仲間）', 'たよれるあいぼう', 'Partner Mark', 'the Reliable Partner', 'reliable partner＝頼れる相棒', '手持ちに入れていっしょに歩いていると、まれに付く'],
    ['グルメなあかし', 'gourmet（グルメ＝食通）', 'グルメな', 'Gourmand Mark', 'the Gourmet', 'gourmand＝大食い・食いしん坊。gourmet＝食通', 'サンドウィッチを作ったり、お店で食事をしたりしたときに、手持ちのポケモンにまれに付く'],
    ['ヌシのあかし', 'ヌシ（主＝その場所をおさめる大きなポケモン）', 'ヌシだった', 'Titan Mark', 'the Former Titan', 'former titan＝元ヌシ', 'ヌシを倒したあと、同じ場所にもどってきたポケモンを捕まえると付く', 1]
  ];
  MARKS.forEach(([ja, kanji, title, en, enTitle, enMean, cond, sp = 0, unk]) => {
    const e = {
      c: 'term', ja, en, sp, cf: unk ? 1 : 3,
      jo: (kanji.startsWith('（') ? '「' + ja.replace(/のあかし$/, '') + '」（漢字は不明）' : kanji) + '＋あかし（証）。二つ名は「' + title + '」',
      eo: en.replace(/ Mark$/, '') + '＋mark。二つ名は「' + enTitle + '」（' + enMean + '）',
      ev: (cond || '野生のポケモンにまれに付く、そのポケモンの性格や気分を表すあかし') + '。二つ名：' + title + '（例：「' + title + ' ファイアロー」）／英語：Talonflame ' + enTitle + '。',
      t: ['mark']
    };
    if (unk) e.unk = unk;
    list.push(e);
  });

  // リボン：[日本語名, 由来, 二つ名, 英語名, 英語の二つ名, もらえる場所・条件, ネタバレ段階]
  const RIBBONS = [
    ['パルデア チャンプリボン', 'パルデア＋champion（チャンピオン）＋ribbon', 'パルデアチャンピオン', 'Paldea Champion Ribbon', 'the Paldea Champion', 'チャンピオンテストに合格して殿堂入りしたときにもらえる。クリア後は「学校最強大会」で優勝してももらえる', 2],
    ['がんばリボン', '頑張る＋ribbon（「がんば」と「リボン」を重ねた言葉遊び）', 'あのころがんばった', 'Effort Ribbon', 'the Once Well-Trained', 'よく鍛えたポケモン（努力値の合計が上限）を、ハッコウシティの人に見せるともらえる', 1],
    ['なかよしリボン', '仲良し＋ribbon', 'しんゆうの', 'Best Friends Ribbon', 'the Great Friend', 'とてもなついているポケモンを、カラフシティの人に見せるともらえる', 1],
    ['マスターランクリボン', 'master（達人）＋rank（階級）＋ribbon', 'ランクマスター', 'Master Rank Ribbon', 'the Rank Master', '通信のランクバトルで、いちばん上のマスターボール級に上がってから1回勝つともらえる', 1]
  ];
  RIBBONS.forEach(([ja, jo, title, en, enTitle, cond, sp]) => list.push({
    c: 'term', ja, en, sp, cf: 3, jo: jo + '。二つ名は「' + title + '」', eo: en + '。二つ名は「' + enTitle + '」',
    ev: cond + '。二つ名：' + title + '／英語：' + enTitle + '。', t: ['ribbon']
  }));
  return list;
})();

if (typeof module !== 'undefined') module.exports = MARK_ENTRIES;
