/*
 * ポケモンSV元ネタ推測図鑑 ― 追加コンテンツ「ゼロの秘宝」の言葉（ポケモン以外）
 *
 * 前編・碧の仮面（キタカミの里）と後編・藍の円盤（ブルーベリー学園）で出会う人物・地名・用語・アイテムです。
 * 「設定」の「遊んでいる図鑑」で、キタカミ図鑑（碧の仮面）・ブルーベリー図鑑（藍の円盤）をオンにしたときだけ表示します。
 * 日英の名前は ポケモンWiki・Bulbapedia・PokéAPI で照らし合わせました。由来は作者の推測です。
 * 技（追加コンテンツのわざマシンと、追加コンテンツで登場した技）は data-dlc-moves.js にあります。
 *
 * [カテゴリ, 日本語名, 英語名, ネタバレ段階, 確からしさ, 日本語名の由来, 英語名の由来, 補足, どちらの追加コンテンツか（kitakami＝碧の仮面／blueberry＝藍の円盤）, タグ（任意）]
 */
var DLC_ENTRIES = [
  // ===== 本編の人物（追加分） =====
  ['person', 'イヌガヤ', 'Harrington', 1, 3, '犬榧（いぬがや＝イチイの仲間の木）', 'Cephalotaxus harringtonii（イヌガヤの学名）', 'アカデミーの前の校長で、オルティガの教育係。パルデアの人物と同じく植物の名前で、英語名は学名から。', null],
  ['person', 'タナカ', 'Carmen', 1, 2, '田中（たなか＝ビワの品種の名前）', 'Mespilus germanica（セイヨウカリン。ビワと結び付けられてきた果物）の名前から、とされる', 'スター団のしたっぱで、チーム・カーフのボスのビワの親友。ビワの品種「田中」から付いた名前で、2人の仲の良さが名前にも表れている。', null, ['star2']],
  // ===== 人物：碧の仮面 =====
  ['person', 'ゼイユ', 'Carmine', 1, 3, ['groseille（フランス語で「赤スグリ」）を縮めた形', '弟のスグリと同じ、スグリの仲間の植物'], ['carmine（カーマイン＝深い赤色）', 'currant（スグリ）の響き'], 'スグリの姉。キタカミの家族は、スグリの仲間（ユキノシタのなかま）の植物でそろえた名前になっている。日本語はフランス語の赤スグリ、英語は赤い色の名前で、どちらも髪の赤い差し色と合う。', 'kitakami', ['dlcperson']],
  ['person', 'スグリ', 'Kieran', 1, 3, '酸塊（すぐり＝赤や黒の小さな実をつける低木）', ['currant（スグリ）の響き', 'Kieran（アイルランドの男性名。「小さな黒髪の子」という意味）'], 'ゼイユの弟。パルデアの主な人物と同じく植物の名前。英語名は、黒い髪とスグリの両方にかけているとみられる。', 'kitakami', ['dlcperson']],
  ['person', 'ユキノシタ', 'Yukito', 1, 3, ['雪の下（ゆきのした＝ユキノシタ科の草）', 'スグリの仲間が入る植物のグループ「ユキノシタ目」'], 'Yukito（日本語名の「雪（ゆき）」から作った名前）', 'ゼイユ・スグリの祖父（会話では「おじいさん」）。孫たち（スグリ）と同じ植物のグループの名前になっている。', 'kitakami', ['dlcperson']],
  ['person', 'ヒエ', 'Hideko', 1, 2, '稗（ひえ＝昔からある雑穀）', 'Hideko（日本の女性の名前）', 'ゼイユ・スグリの祖母（会話では「おばあさん」）。', 'kitakami', ['dlcperson'], '英語名 Hideko は公式の説明がありません。祖父ユキノシタの英語名 Yukito が「ユキ」から作られているのと同じく、「ヒエ」の「ヒ」で始まる日本の女性名にしたとみられます（推測）。'],
  ['person', 'サザレ', 'Perrin', 1, 3, '細石（さざれいし＝小石。国歌「君が代」にも出てくる言葉）', 'Perrin（フランス語の男性名 Pierre＝石 の愛称）', 'キタカミを旅するカメラ好きの写真家。日本語・英語とも「石」にまつわる名前。', 'kitakami', ['dlcperson']],
  ['person', 'ビリオ', 'Billy', 1, 3, 'billionaire（ビリオネア＝億万長者）の前半', 'billionaire の前半', 'ネアといっしょに旅をするセレブ。2人の名前を合わせると「ビリオネア（億万長者）」になる。', 'kitakami', ['dlcperson']],
  ['person', 'ネア', "O'Nare", 1, 3, 'billionaire（ビリオネア）の後半', "billionaire の後半（O'Nare）", '不動産会社の社長のセレブ。ビリオと2人で「ビリオネア」。日英とも同じ言葉遊び。', 'kitakami', ['dlcperson']],
  ['person', 'ブライア', 'Briar', 1, 3, 'briar（ブライア＝地中海に生えるツツジの仲間の低木。根はパイプの材料になる）', 'briar', 'ブルーベリー学園の先生。キタカミの林間学校の引率として登場する。服やピアスに、スカーレットブック・バイオレットブックと同じ飾りがある。', 'kitakami', ['dlcperson']],
  // ===== 人物：藍の円盤 =====
  ['person', 'シアノ', 'Cyrano', 1, 2, ['cyan（シアン＝青緑色）', 'Cyanococcus（ブルーベリーの仲間の学名）'], ['シアノと同じ響き', 'arándano（スペイン語でブルーベリー）'], 'ブルーベリー学園の校長。学園の名前にちなんだブルーベリーの学名から。英語名は、フランスの戯曲『シラノ・ド・ベルジュラック』の主人公と同じ綴りでもある。', 'blueberry', ['dlcperson']],
  ['person', 'カキツバタ', 'Drayton', 1, 3, ['杜若（かきつばた＝アヤメの仲間の花）', '「たつ（竜）」を並べ替えた文字が入っている（カキ「ツバタ」）'], 'Drayden（イッシュ地方のドラゴン使いのジムリーダー・シャガの英語名）に似せた名前', 'ブルベリーグ四天王のドラゴン使い。イッシュのシャガもアヤメの仲間の花の名前で、日英とも彼につながる名前になっている。', 'blueberry', ['dlcperson']],
  ['person', 'ネリネ', 'Amarys', 1, 3, ['Nerine（ネリネ＝ヒガンバナの仲間の花）', '練り（ねり＝鋼を鍛えること）'], 'Amaryllidaceae（ネリネが入るヒガンバナ科）', 'ブルーベリー学園の生徒会長で、はがねタイプの使い手。日本語は花の名前に、鋼を「練る」をかけたとみられる。', 'blueberry', ['dlcperson']],
  ['person', 'アカマツ', 'Crispin', 1, 3, ['赤松（あかまつ）', '窯（かま＝かまど）'], 'pine（マツ）＋crispy（カリッと焼けた）', 'ほのおタイプの使い手で料理好き。日英とも、マツの木に料理と火をかけた名前。', 'blueberry', ['dlcperson']],
  ['person', 'タロ', 'Lacey', 1, 3, 'taro（タロイモ）', ['Clay（イッシュのジムリーダー・ヤーコンの英語名）の並べ替え', 'Araceae（タロイモが入るサトイモ科）'], 'フェアリータイプの使い手。父はイッシュのジムリーダー・ヤーコン（Clay）。ヤーコンもタロイモも、根を食べる野菜。', 'blueberry', ['dlcperson']],
  ['person', 'シンクロミ', 'Synclaire', 1, 3, 'シンクロマシン（彼女が作った機械）', 'Synchro Machine＋Sinclair（人の名前）', 'テラリウムドームの研究者。ポケモンとシンクロできる機械をくれる。', 'blueberry', ['dlcperson']],
  ['person', 'おやつおやじ', 'Snacksworth', 3, 3, 'おやつ＋おやじ（年配の男性）', 'snacks（おやつ）＋-worth（イギリスの地名によくある語尾）', '藍の円盤のクリア後に、おやつと引き換えに伝説のポケモンに会わせてくれる人。', 'blueberry', ['dlcperson']],
  // ===== トレーナーの種類 =====
  ['person', 'お祭り少年', 'Festival Boy', 1, 3, '祭り（まつり）＋少年', 'festival（祭り）＋boy', 'キタカミの里で、甚平を着て勝負を挑んでくる男の子。', 'kitakami', ['tclass']],
  ['person', 'お祭り少女', 'Festival Girl', 1, 3, '祭り＋少女', 'festival＋girl', 'キタカミの里で、甚平を着て勝負を挑んでくる女の子。', 'kitakami', ['tclass']],
  ['person', '怖いお兄さん', 'Ruffian', 1, 3, '怖い（こわい）＋お兄さん', 'ruffian（ならず者、乱暴者）', 'キタカミの里で出会う、ヤンキー風の若い男性。', 'kitakami', ['tclass']],
  ['person', '怖いお姉さん', 'Delinquent', 1, 3, '怖い＋お姉さん', 'delinquent（非行少年・少女）', 'キタカミの里で出会う、ヤンキー風の女性。昔の作品では「こわいおねえさん」とひらがなで書いていた。', 'kitakami', ['tclass']],
  ['person', 'キタカミ鬼面衆', 'Kitakami Ogre Clan', 1, 3, '鬼面（きめん＝鬼の面）＋衆（しゅう＝人の集まり）', 'ogre（鬼）＋clan（一族）', 'オモテ祭りのあと、キタカミの各地にいる鬼のお面をかぶった強いトレーナーたち。もとは子どもたちの足腰を鍛えるための集まりとされる。', 'kitakami', ['tclass']],
  ['person', 'リーグ部', 'League Club', 1, 3, 'league（リーグ）＋部（部活動）', 'league＋club（部活動）', 'ブルーベリー学園の、ポケモン勝負の部活動の部員。', 'blueberry', ['tclass']],
  // ===== 地名：キタカミの里 =====
  ['place', 'キタカミの里', 'Kitakami', 1, 3, ['北（きた）＋神（かみ）・上（かみ）', '岩手県・宮城県の地名「北上（きたかみ）」'], '日本語名をそのままローマ字にした形', '碧の仮面の舞台。日本の東北地方の農村がモデルとみられる、山あいの里。', 'kitakami', ['dlcplace']],
  ['place', 'スイリョクタウン', 'Mossui Town', 1, 3, ['翠緑（すいりょく＝あざやかな緑色）', 'ヒスイ（翡翠）。昔のシンオウ地方「ヒスイ地方」の名前とも重なる'], ['moss（コケ）・moss green（コケのような緑色）', '日本語名の「スイ」'], 'キタカミの里でただ一つの集落。日英とも「緑」の言葉。', 'kitakami', ['dlcplace']],
  ['place', 'キタカミセンター', 'Kitakami Hall', 1, 3, 'キタカミ＋center（施設）', 'Kitakami＋hall（会館）', 'オモテ祭りが開かれる、鬼が山のふもとの施設。', 'kitakami', ['dlcplace']],
  ['place', 'アップルヒルズ', 'Apple Hills', 1, 3, 'apple（リンゴ）＋hills（丘）', 'apple＋hills', 'スイリョクタウンの西に広がる、リンゴ畑の丘。', 'kitakami', ['dlcplace']],
  ['place', '鬼が山', 'Oni Mountain', 1, 3, '鬼（おに）が棲む山', 'oni（日本語の「鬼」）＋mountain', '里の真ん中にある火山。英語名にも日本語の oni がそのまま使われている。', 'kitakami', ['dlcplace']],
  ['place', '鬼角峡谷', 'Fellhorn Gorge', 1, 3, '鬼の角（つの）＋峡谷', ['fell（獰猛な・山）＋horn（角）＋gorge（峡谷）'], '鬼が山から流れる川が作った峡谷。', 'kitakami', ['dlcplace']],
  ['place', '鬼歯空洞', "Oni's Maw", 1, 3, '鬼の歯（は）＋空洞（くうどう＝ほら穴）', "oni（鬼）＋maw（大きな口）", '鬼が棲むと伝えられる洞窟。日英とも「鬼の口」に見立てている。', 'kitakami', ['dlcplace']],
  ['place', '恐れ穴', 'Dreaded Den', 2, 3, '恐れ（おそれ）＋穴（あな）', 'dreaded（恐れられた）＋den（巣穴）', '鬼歯空洞の奥にある、オーガポンのすみか。', 'kitakami', ['dlcplace']],
  ['place', '落合川原', 'Mossfell Confluence', 1, 3, '落合（おちあい＝川と川が合流する所）＋川原', 'moss（コケ）＋fell（山）＋confluence（合流点）', '2つの川が合流する河原。日英とも「合流」の言葉。', 'kitakami', ['dlcplace']],
  ['place', 'キタカミ街道', 'Kitakami Road', 1, 3, 'キタカミ＋街道（かいどう＝主な道）', 'Kitakami＋road', 'バス停がある、里の入り口の道。', 'kitakami', ['dlcplace']],
  ['place', 'キタカミ原生地域', 'Kitakami Wilds', 1, 3, '原生（げんせい＝人の手が入っていない自然）＋地域', 'Kitakami＋wilds（荒野）', '里の北に広がる、手つかずの自然。', 'kitakami', ['dlcplace']],
  ['place', '地獄谷', 'Infernal Pass', 1, 3, '地獄（じごく）谷。火山の噴気が出る谷によく付く名前（実在の温泉地にもある）', 'infernal（地獄の）＋pass（山道）', '鬼が山の西を弧の形に通る山道。', 'kitakami', ['dlcplace']],
  ['place', 'てらす池', 'Crystal Pool', 2, 3, ['照らす（てらす）', 'テラスタルの「テラス」'], 'crystal（結晶）＋pool（池）', '鬼が山の山頂にある池。池の底のことが物語に関わる。', 'kitakami', ['dlcplace']],
  ['place', 'とこしえの森', 'Timeless Woods', 1, 3, '永久（とこしえ＝いつまでも変わらない）の森', 'timeless（時を超えた）＋woods（森）', '里の北東の、木々が茂る森。', 'kitakami', ['dlcplace']],
  ['place', 'ともっこプラザ', 'Loyalty Plaza', 1, 3, 'ともっこ（里の英雄とされるポケモン）＋plaza（広場）', 'loyalty（忠誠）＋plaza。ともっこの英語名 Loyal Three から', 'ともっこの像がある広場。', 'kitakami', ['dlcplace']],
  ['place', 'ひやみず洞', 'Chilling Waterhead', 1, 3, '冷や水（ひやみず＝冷たい水）＋洞（ほら＝洞穴）', 'chilling（冷たい）＋waterhead（水源）', '鬼が山の北の、高低差のある洞窟。', 'kitakami', ['dlcplace']],
  ['place', 'フジが原', 'Wistful Fields', 1, 2, '藤（ふじ）が原', 'wistful（もの悲しい、懐かしい）＋fields（野原）', '里の南西に広がる細長い野原。', 'kitakami', ['dlcplace']],
  ['place', '舞出山道', "Reveler's Road", 1, 3, '舞い出る（まいでる）＋山道（さんどう）。祭りの踊り手が出ていく道', "reveler（お祭りで浮かれ騒ぐ人）＋road", 'スイリョクタウンからキタカミセンターへ向かう、祭りの屋台が並ぶ道。', 'kitakami', ['dlcplace']],
  ['place', '楽土の荒地', 'Paradise Barrens', 1, 3, '楽土（らくど＝楽園）の荒地', 'paradise（楽園）＋barrens（荒れ地）', '里の北西の岩だらけの荒地。「楽園」と「荒地」という反対の言葉の組み合わせ。', 'kitakami', ['dlcplace']],
  ['place', 'キタカミ六選', 'Six Wonders of Kitakami', 1, 3, 'キタカミ＋六選（6つ選んだ名所）', 'six wonders（6つの不思議・名所）', '里に点在する6か所の名所。パルデア十景と同じような名所選び。', 'kitakami', ['dlcplace']],
  // ===== 地名：ブルーベリー学園 =====
  ['place', 'ブルーベリー学園', 'Blueberry Academy', 1, 3, 'blueberry（ブルーベリー）＋学園', 'blueberry＋academy', 'イッシュ地方の海の上にある学校。オレンジ・グレープアカデミーと同じく、果物の名前の学校。', 'blueberry', ['dlcplace']],
  ['place', 'テラリウムドーム', 'Terarium', 1, 3, 'terrarium（テラリウム＝ガラス容器の中で植物を育てる箱庭）＋テラスタル', 'terrarium＋Terastal', '学園の地下にある、ポケモンのすむ環境を再現した巨大なドーム。', 'blueberry', ['dlcplace']],
  ['place', 'サバンナエリア', 'Savanna Biome', 1, 3, 'savanna（サバンナ）＋area', 'savanna＋biome（生物群系）', 'テラリウムドームの、草原を再現したエリア。英語は「エリア」ではなく生態学の言葉 biome（バイオーム）。', 'blueberry', ['dlcplace']],
  ['place', 'コーストエリア', 'Coastal Biome', 1, 3, 'coast（海岸）＋area', 'coastal（海岸の）＋biome', '海と南の島を再現したエリア。', 'blueberry', ['dlcplace']],
  ['place', 'キャニオンエリア', 'Canyon Biome', 1, 3, 'canyon（峡谷）＋area', 'canyon＋biome', '岩山と峡谷を再現したエリア。', 'blueberry', ['dlcplace']],
  ['place', 'ポーラエリア', 'Polar Biome', 1, 3, 'polar（極地の）＋area', 'polar＋biome', '雪と氷の極地を再現したエリア。', 'blueberry', ['dlcplace']],
  ['place', 'センタースクエア', 'Central Plaza', 1, 3, 'center（中心）＋square（広場）', 'central＋plaza（広場）', 'テラリウムドームの真ん中の広場。', 'blueberry', ['dlcplace']],
  ['place', '電気石の岩窟', 'Chargestone Cavern', 1, 3, '電気石（でんきせき＝トルマリン）＋岩窟（がんくつ）', 'charge（電気を帯びる）＋stone＋cavern（洞窟）', 'イッシュ地方にある同じ名前の洞窟を再現した場所。', 'blueberry', ['dlcplace']],
  ['place', 'ともしびの迷路', 'Torchlit Labyrinth', 1, 3, '灯（ともしび）＋迷路', 'torchlit（たいまつに照らされた）＋labyrinth（迷宮）', 'コーストエリアにある洞窟。', 'blueberry', ['dlcplace']],
  // ===== 用語 =====
  ['term', 'ゼロの秘宝', 'The Hidden Treasure of Area Zero', 1, 3, 'エリアゼロ＋秘宝（ひほう＝隠された宝）', 'hidden treasure（隠された宝）＋Area Zero', '追加コンテンツ全体の名前。本編の「宝探し」とつながっている。', 'kitakami', ['dlcterm']],
  ['term', '碧の仮面', 'The Teal Mask', 1, 3, '碧（あお・みどり＝青みがかった緑）の仮面', 'teal（青緑色）＋mask', '前編の名前。オーガポンの緑のめんのこと。', 'kitakami', ['dlcterm']],
  ['term', '藍の円盤', 'The Indigo Disk', 1, 3, '藍（あい＝濃い青）の円盤', 'indigo（藍色）＋disk', '後編の名前。日本語は碧（緑）と藍（青）で、色をそろえている。', 'blueberry', ['dlcterm']],
  ['term', 'オモテ祭り', 'Festival of Masks', 1, 3, ['面（おもて＝お面）＋祭り', '表（おもて）と裏（うら）'], 'festival（祭り）＋masks（仮面）', 'ともっこをたたえる、キタカミの里の伝統行事。お面をつけて参加する。日本語の「おもて」は能のお面の言い方でもある。', 'kitakami', ['dlcterm']],
  ['term', 'ともっこ', 'Loyal Three', 1, 3, ['友（とも）＋〜っ子', '「ともっこさま」と、さまを付けて呼ばれる'], 'loyal（忠実な）＋three（3）', '里を鬼から守ったと伝えられる3匹のポケモン（イイネイヌ・マシマシラ・キチキギス）。桃太郎のイヌ・サル・キジがモデル。', 'kitakami', ['dlcterm']],
  ['term', '鬼退治フェス', "Ogre Oustin'", 1, 3, '鬼退治（おにたいじ）＋festival', "ogre（鬼）＋oust（追い出す）", 'キタカミセンターで遊べるミニゲーム。', 'kitakami', ['dlcterm']],
  ['term', 'ブルベリーグ', 'Blueberry League', 1, 3, 'ブルーベリー＋league（リーグ）を縮めた形', 'Blueberry＋league', 'ブルーベリー学園の中の、ポケモン勝負のランキング。上位の4人が四天王になる。', 'blueberry', ['dlcterm']],
  ['term', 'ステラ', 'Stellar', 3, 3, 'stella（ラテン語で「星」）', 'stellar（星の）', 'テラパゴスと関わる、特別なテラスタイプ。', 'blueberry', ['dlcterm']],
  ['term', 'キビキビパニック', 'Mochi Mayhem', 3, 3, ['きびだんご（桃太郎の家来へのごほうび）＋きびきび（てきぱき）', 'panic（大混乱）'], 'mochi（餅）＋mayhem（大混乱）', '藍の円盤のあとのエピローグ（番外編）。日本語は桃太郎の「きびだんご」、英語は「餅」で、どちらも毒の餅の騒動にかけている。', 'blueberry', ['dlcterm']],
  // ===== アイテム：碧の仮面 =====
  ['item', 'ようせいのハネ', 'Fairy Feather', 1, 3, '妖精（ようせい）の羽（ハネ）', 'fairy（妖精）＋feather（羽）', 'フェアリータイプの技を強くする持ち物。', 'kitakami'],
  ['item', 'みついりりんご', 'Syrupy Apple', 1, 3, '蜜入り（みついり）りんご', 'syrupy（シロップのような）＋apple', 'カジッチュをカミッチュに進化させる道具。蜜が入ったリンゴ。', 'kitakami'],
  ['item', 'ボンサクのちゃわん', 'Unremarkable Teacup', 1, 3, '凡作（ぼんさく＝ありふれた作品）の茶碗', 'unremarkable（ありふれた）＋teacup', 'マガイモノのチャデスを進化させる道具。日英とも「ふつうの品」。', 'kitakami'],
  ['item', 'ケッサクのちゃわん', 'Masterpiece Teacup', 1, 3, '傑作（けっさく＝すぐれた作品）の茶碗', 'masterpiece（傑作）＋teacup', 'タカイモノのチャデスを進化させる道具。ボンサク（凡作）と対になる名前。', 'kitakami'],
  ['item', 'みどりのめん', 'Teal Mask', 2, 3, '緑の面（めん＝お面）', 'teal（青緑色）＋mask', 'オーガポンのお面。追加コンテンツ前編の名前（碧の仮面）にもなっている。', 'kitakami'],
  ['item', 'いどのめん', 'Wellspring Mask', 2, 3, '井戸（いど）の面', 'wellspring（泉、水源）＋mask', 'オーガポンに持たせると、みずタイプのめんの姿になる。', 'kitakami'],
  ['item', 'かまどのめん', 'Hearthflame Mask', 2, 3, '竈（かまど）の面', 'hearth（暖炉、かまど）＋flame（炎）＋mask', 'オーガポンに持たせると、ほのおタイプのめんの姿になる。', 'kitakami'],
  ['item', 'いしずえのめん', 'Cornerstone Mask', 2, 3, '礎（いしずえ＝建物の土台の石）の面', 'cornerstone（礎石）＋mask', 'オーガポンに持たせると、いわタイプのめんの姿になる。井戸・竈・礎と、日英とも暮らしに欠かせないものの名前。', 'kitakami'],
  ['item', 'たいりょくのもち', 'Health Mochi', 1, 3, '体力（たいりょく）の餅（もち）', 'health（体力）＋mochi（餅）', 'HPの基礎ポイントを上げる餅。本編の「たいりょくのハネ」と同じ並びの名前。英語にも mochi がそのまま入っている。', 'kitakami'],
  ['item', 'きんりょくのもち', 'Muscle Mochi', 1, 3, '筋力（きんりょく）の餅', 'muscle（筋肉）＋mochi', '攻撃の基礎ポイントを上げる餅。', 'kitakami'],
  ['item', 'ていこうのもち', 'Resist Mochi', 1, 3, '抵抗（ていこう）の餅', 'resist（耐える）＋mochi', '防御の基礎ポイントを上げる餅。', 'kitakami'],
  ['item', 'ちりょくのもち', 'Genius Mochi', 1, 3, '知力（ちりょく）の餅', 'genius（天才）＋mochi', '特攻の基礎ポイントを上げる餅。', 'kitakami'],
  ['item', 'せいしんのもち', 'Clever Mochi', 1, 3, '精神（せいしん）の餅', 'clever（賢い）＋mochi', '特防の基礎ポイントを上げる餅。', 'kitakami'],
  ['item', 'しゅんぱつのもち', 'Swift Mochi', 1, 3, '瞬発（しゅんぱつ）の餅', 'swift（素早い）＋mochi', '素早さの基礎ポイントを上げる餅。', 'kitakami'],
  ['item', 'まっさらもち', 'Fresh-Start Mochi', 1, 3, 'まっさら（真っさら＝新しくて何もない）＋餅', 'fresh start（新しいスタート）＋mochi', '基礎ポイントをすべて0に戻す餅。', 'kitakami'],
  ['item', 'おしゃれカードみどり', 'Teal Style Card', 1, 3, 'おしゃれ＋card＋緑', 'teal（青緑）＋style（おしゃれ）＋card', '林間学校の服装を選べるようになる大切なもの。', 'kitakami'],
  ['item', 'けっしょうのかけら', 'Crystal Cluster', 2, 2, '結晶（けっしょう）のかけら', 'crystal（結晶）＋cluster（かたまり）', '物語の中で手に入る大切なもの。', 'kitakami'],
  ['item', 'ロトりぼう', 'Roto-Stick', 1, 2, 'ロトム＋棒（ぼう）。お祭りで振る光る棒', 'Roto（ロトム）＋stick（棒）', 'オモテ祭りの前にもらえる、光る棒。', 'kitakami'],
  ['item', 'きらめくおまもり', 'Glimmering Charm', 3, 3, 'きらめく（光る）お守り', 'glimmering（ちらちら光る）＋charm（お守り）', 'テラレイドバトルでテラピースが多くもらえるお守り。', 'kitakami'],
  ['item', 'きれいなウロコ', 'Prism Scale', 1, 3, '綺麗な鱗（うろこ）', 'prism（プリズム＝光を虹色に分ける）＋scale（うろこ）', 'ヒンバスを持たせて通信交換すると、ミロカロスに進化する。', 'kitakami'],
  ['item', 'れいかいのぬの', 'Reaper Cloth', 1, 3, '霊界（れいかい）の布', 'reaper（死神）＋cloth（布）', 'サマヨールを持たせて通信交換すると、ヨノワールに進化する。', 'kitakami'],
  ['item', 'するどいキバ', 'Razor Fang', 1, 3, '鋭い牙（キバ）', 'razor（かみそり）＋fang（牙）', 'グライガーに持たせて夜にレベルアップすると、グライオンに進化する。', 'kitakami'],
  // ===== アイテム：藍の円盤 =====
  ['item', 'ふくごうきんぞく', 'Metal Alloy', 1, 3, '複合金属（ふくごうきんぞく）', 'metal alloy（合金）', 'ジュラルドンをブリジュラスに進化させる道具。', 'blueberry'],
  ['item', 'テラピースステラ', 'Stellar Tera Shard', 3, 3, 'テラピース＋stella（ラテン語で星）', 'Stellar（星の）＋Tera Shard', 'テラスタイプをステラにするテラピース。', 'blueberry'],
  ['item', 'シンクロマシン', 'Synchro Machine', 1, 3, 'synchronize（同調する）＋machine', 'synchro＋machine', 'ポケモンとシンクロして、思いどおりに動かせる機械。', 'blueberry'],
  ['item', 'おしゃれカードあお', 'Indigo Style Card', 1, 3, 'おしゃれ＋card＋青', 'indigo（藍色）＋style＋card', 'ブルーベリー学園の制服などを選べるようになる大切なもの。', 'blueberry'],
  ['item', 'りゅうのウロコ', 'Dragon Scale', 1, 3, '竜の鱗（うろこ）', 'dragon＋scale', 'シードラを持たせて通信交換すると、キングドラに進化する。', 'blueberry'],
  ['item', 'アップグレード', 'Upgrade', 1, 3, 'upgrade（性能を上げること）', 'upgrade', 'ポリゴンを持たせて通信交換すると、ポリゴン２に進化する。', 'blueberry'],
  ['item', 'あやしいパッチ', 'Dubious Disc', 1, 3, '怪しい（あやしい）＋patch（修正プログラム）', 'dubious（怪しげな）＋disc（ディスク）', 'ポリゴン２を持たせて通信交換すると、ポリゴンＺに進化する。日本語は「修正プログラム」、英語は「ディスク」。', 'blueberry'],
  ['item', 'プロテクター', 'Protector', 1, 3, 'protector（防具）', 'protector', 'サイドンを持たせて通信交換すると、ドサイドンに進化する。', 'blueberry'],
  ['item', 'エレキブースター', 'Electirizer', 1, 3, 'electric（電気）＋booster（増幅器）', 'electric＋-izer（〜にするもの）', 'エレブーを持たせて通信交換すると、エレキブルに進化する。', 'blueberry'],
  ['item', 'マグマブースター', 'Magmarizer', 1, 3, 'magma（マグマ）＋booster', 'Magmar（ブーバー）＋-izer', 'ブーバーを持たせて通信交換すると、ブーバーンに進化する。', 'blueberry'],
  ['item', 'いちごアメざいく', 'Strawberry Sweet', 1, 3, '苺（いちご）＋飴細工（あめざいく＝飴で作った細工もの）', 'strawberry＋sweet（お菓子）', 'マホミルに持たせて回ると、マホイップに進化する。アメざいくの形で、マホイップの飾りが変わる。', 'blueberry'],
  ['item', 'ハートアメざいく', 'Love Sweet', 1, 3, 'heart（ハート）＋飴細工', 'love（愛）＋sweet', 'マホミルの進化に使うアメざいく。', 'blueberry'],
  ['item', 'ベリーアメざいく', 'Berry Sweet', 1, 3, 'berry（ベリー）＋飴細工', 'berry＋sweet', 'マホミルの進化に使うアメざいく。', 'blueberry'],
  ['item', 'よつばアメざいく', 'Clover Sweet', 1, 3, '四つ葉（よつば）＋飴細工', 'clover（クローバー）＋sweet', 'マホミルの進化に使うアメざいく。', 'blueberry'],
  ['item', 'おはなアメざいく', 'Flower Sweet', 1, 3, 'お花＋飴細工', 'flower＋sweet', 'マホミルの進化に使うアメざいく。', 'blueberry'],
  ['item', 'スターアメざいく', 'Star Sweet', 1, 3, 'star（星）＋飴細工', 'star＋sweet', 'マホミルの進化に使うアメざいく。', 'blueberry'],
  ['item', 'リボンアメざいく', 'Ribbon Sweet', 1, 3, 'ribbon＋飴細工', 'ribbon＋sweet', 'マホミルの進化に使うアメざいく。', 'blueberry'],
  ['item', 'ガラナツのえだ', 'Galarica Twig', 1, 2, 'ガラル＋ナッツ（木の実）の枝', 'Galar＋-ica（植物の名前によくある語尾）＋twig（小枝）', 'ガラル地方の木の枝。コーストエリアで夕方に拾える。コーストスクエアの女の子に8本渡すとガラナツブレス、15本でガラナツリースを作ってくれる。', 'blueberry'],
  ['item', 'ガラナツブレス', 'Galarica Cuff', 1, 3, 'ガラナツ＋bracelet（ブレスレット）', 'Galarica＋cuff（腕輪）', 'ガラルのすがたのヤドンに使うと、ガラルのすがたのヤドランに進化する。', 'blueberry'],
  ['item', 'ガラナツリース', 'Galarica Wreath', 1, 3, 'ガラナツ＋wreath（リース＝花や枝の輪）', 'Galarica＋wreath', 'ガラルのすがたのヤドンに使うと、ガラルのすがたのヤドキングに進化する。頭にかぶせる冠。', 'blueberry'],
  ['item', 'こころのしずく', 'Soul Dew', 3, 3, '心（こころ）の雫（しずく）', 'soul（魂）＋dew（しずく）', 'ラティアス・ラティオスに持たせる道具。藍の円盤のクリア後に出会う伝説のポケモンにまつわる。', 'blueberry'],
  ['item', 'いでんしのくさび', 'DNA Splicers', 3, 3, '遺伝子（いでんし）の楔（くさび）', 'DNA＋splicer（つなぎ合わせる道具）', 'キュレムとレシラム・ゼクロムを合体させる道具。', 'blueberry'],
  ['item', 'ネクロプラスソル', 'N-Solarizer', 3, 3, 'Necrozma（ネクロズマ）＋plus＋sol（ラテン語で太陽）', 'N（ネクロズマ）＋solar（太陽の）＋-izer', 'ネクロズマとソルガレオを合体させる道具。', 'blueberry'],
  ['item', 'ネクロプラスルナ', 'N-Lunarizer', 3, 3, 'Necrozma＋plus＋luna（ラテン語で月）', 'N＋lunar（月の）＋-izer', 'ネクロズマとルナアーラを合体させる道具。', 'blueberry']
].map(([c, ja, en, sp, cf, jo, eo, ev, dlc, t, unk]) => {
  const e = { c, ja, en, sp, cf, jo, eo, ev, dlc };
  if (t) e.t = t;
  if (unk) e.unk = unk;
  return e;
});

// ===== おやつ・かけじく・あかし・リボン・お店・料理（藍の円盤のクリア後や、施設で出会うもの） =====
DLC_ENTRIES.push(
  { c: 'term', ja: 'ブルレク', en: 'Blueberry Quest', sp: 1, cf: 3, jo: 'ブルーベリー・スペシャル・レクリエーション（Blueberry Special Recreation）の略', eo: 'Blueberry＋quest（課題、冒険）。略して BBQ（バーベキューと同じ綴り）', ev: 'テラリウムドームで出される課題。こなすとBPがもらえる。英語の略称 BBQ はバーベキューと同じで、ちょっとした言葉遊びになっている。', dlc: 'blueberry', t: ['dlcterm'] },
  { c: 'term', ja: 'ブルーベリーポイント', en: 'Blueberry Points', sp: 1, cf: 3, jo: 'Blueberry＋point（点数）。略して BP', eo: 'Blueberry points（BP）', ev: 'ブルーベリー学園の中で使える独自のポイント。購買部や学生食堂で使う。', dlc: 'blueberry', t: ['dlcterm'] },
  { c: 'term', ja: 'シンクロ', en: 'Synchro', sp: 1, cf: 3, jo: 'synchronize（同調する）の略', eo: 'synchro', ev: 'シンクロマシンを使って、連れているポケモンを思いどおりに動かすこと。', dlc: 'blueberry', t: ['dlcterm'] },
  { c: 'item', ja: '〇〇のおやつ', en: '〇〇 Treat', sp: 3, cf: 3, jo: '伝説のポケモンの名前＋おやつ（例：ファイヤーのおやつ）', eo: '伝説のポケモンの名前＋treat（ごほうびのお菓子）', ev: 'おやつおやじからもらう大切なもの。全部で25種類あり、持っているとパルデアの決まった場所に、その伝説のポケモンが現れる。日本語は「おやつ」、英語は動物へのごほうびの「treat」。', dlc: 'blueberry' },
  { c: 'item', ja: 'あくのかけじく', en: 'Scroll of Darkness', sp: 3, cf: 3, jo: '悪（あく）の掛け軸（かけじく）', eo: 'scroll（巻物）＋of darkness（闇の）', ev: 'ダクマに見せると、いちげきのかたのウーラオスに進化する。ダクマを連れているとマリナード市場の競りに出る。日本語は床の間に飾る「掛け軸」、英語は「巻物」。', dlc: 'blueberry' },
  { c: 'item', ja: 'みずのかけじく', en: 'Scroll of Waters', sp: 3, cf: 3, jo: '水（みず）の掛け軸', eo: 'scroll＋of waters（水の）', ev: 'ダクマに見せると、れんげきのかたのウーラオスに進化する。', dlc: 'blueberry' },
  { c: 'term', ja: 'のうむのあかし', en: 'Misty Mark', sp: 1, cf: 3, jo: '濃霧（のうむ＝深い霧）＋あかし（証）。二つ名は「きりにとまどう」', eo: 'Misty＋mark。二つ名は「the Mist Drifter」（mist drifter＝霧の中をさまよう者）', ev: 'キタカミの里で、霧の日に出会った野生のポケモンにまれに付く。二つ名：きりにとまどう（例：「きりにとまどう ファイアロー」）／英語：Talonflame the Mist Drifter。', dlc: 'kitakami', t: ['mark'] },
  { c: 'term', ja: 'パートナーリボン', en: 'Partner Ribbon', sp: 3, cf: 3, jo: 'partner（相棒）＋ribbon。二つ名は「〇〇の あいぼう」', eo: "partner＋ribbon。二つ名は「<トレーナーの名前>'s Partner」", ev: 'リーグ部の先生やブルベリーグの仲間と交換したポケモンに付いているリボン。二つ名に、もとのトレーナーの名前が入る。', dlc: 'blueberry', t: ['ribbon'] },
  { c: 'shop', ja: '桃沢商店', en: "Peachy's", sp: 1, cf: 3, jo: ['桃沢（ももさわ）＋商店。名字のような、昔ながらの個人商店の名前', '桃（もも）。キタカミの物語の桃太郎のモチーフ'], eo: 'peachy（桃のような、すてきな）＋-’s（〜の店）', ev: 'スイリョクタウンにある、里でただ一つの個人商店。日英とも「桃」が入っている。', dlc: 'kitakami' },
  { c: 'shop', ja: '購買部', en: 'School Store', sp: 1, cf: 3, jo: '購買部（こうばいぶ＝学校の売店）', eo: 'school store（学校の売店）', ev: 'ブルーベリー学園の売店。学園の中で使えるポイント（BP）で買い物をする。', dlc: 'blueberry' },
  { c: 'shop', ja: '学生食堂', en: 'Blueberry Academy Cafeteria', sp: 1, cf: 3, jo: '学生（がくせい）＋食堂（しょくどう）', eo: 'Blueberry Academy＋cafeteria（カフェテリア、セルフサービスの食堂）', ev: 'ブルーベリー学園の食堂。量の多い手作りの料理が出る。', dlc: 'blueberry' },
  { c: 'food', ja: 'キタカミそば', en: 'Kitakami Fried Noodles', sp: 1, cf: 3, jo: 'キタカミ＋そば（焼きそば）', eo: 'Kitakami＋fried noodles（焼きそば）', ev: 'オモテ祭りの屋台（キタカミセンター）の料理。日本語は「そば」、英語は「焼いた麺」と言い分けている。', dlc: 'kitakami', t: ['menu'],
    menu: { shops: [], note: 'オモテ祭りの屋台', towns: ['キタカミセンター'], powers: ['ほかく：どく Lv2', 'おとしもの：ドラゴン Lv1', 'でかでか：かくとう Lv1'] } },
  { c: 'food', ja: '学園ピザ', en: 'Academy Pizza', sp: 1, cf: 3, jo: '学園（がくえん）＋pizza', eo: 'academy＋pizza', ev: '学生食堂のメニュー。ソーセージとチーズで学園の校章を描いた特大ピザ。', dlc: 'blueberry', t: ['menu'],
    menu: { shops: ['学生食堂'], towns: ['ブルーベリー学園'], powers: ['ちびちび：全タイプ Lv2', 'レイド：全タイプ Lv1'] } },
  { c: 'food', ja: '学園シェーキ', en: 'Academy Shake', sp: 1, cf: 3, jo: '学園＋shake（シェイク）', eo: 'academy＋shake', ev: '学生食堂のメニュー。アイスと果物を詰め込んだ冷たい飲み物。', dlc: 'blueberry', t: ['menu'],
    menu: { shops: ['学生食堂'], towns: ['ブルーベリー学園'], powers: ['おとしもの：全タイプ Lv2', '二つ名：全タイプ Lv1'] } },
  { c: 'food', ja: '学園ポテト', en: 'Academy Fries', sp: 1, cf: 3, jo: '学園＋potato（フライドポテト）', eo: 'academy＋fries（フライドポテト）', ev: '学生食堂のメニュー。山盛りのフライドポテト。日本語は「ポテト」、英語は「fries」。', dlc: 'blueberry', t: ['menu'],
    menu: { shops: ['学生食堂'], towns: ['ブルーベリー学園'], powers: ['でかでか：全タイプ Lv2', 'けいけんち：全タイプ Lv1'] } },
  { c: 'food', ja: '学園定食', en: 'Academy Special', sp: 1, cf: 3, jo: '学園＋定食（ていしょく＝決まった組み合わせの食事）', eo: 'academy＋special（特別メニュー）', ev: '学生食堂のいちばん高いメニュー。シアノ校長が選んだ料理の組み合わせ。かがやきパワーが付く珍しい料理。', dlc: 'blueberry', t: ['menu'],
    menu: { shops: ['学生食堂'], towns: ['ブルーベリー学園'], powers: ['ほかく：全タイプ Lv2', 'タマゴ Lv1', 'かがやき：全タイプ Lv1'] } }
);

if (typeof module !== 'undefined') module.exports = DLC_ENTRIES;
