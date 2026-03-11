const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const SUBS_FILE = path.join(__dirname, 'subscriptions.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize subscriptions file if it doesn't exist
if (!fs.existsSync(SUBS_FILE)) {
  fs.writeFileSync(SUBS_FILE, JSON.stringify([]));
}

// Mock Database (Data migrated from frontend)
const db = {
  teamData: {
    name: "FaZe Clan",
    logo: "assets/faze.jpg",
    worldRanking: 11,
    description: "FaZe Clan 是一家总部位于美国的全球顶级电子竞技组织。其 CS 分部以国际化阵容著称，在 2025-2026 赛季经历了一系列人员调整后，依然保持在世界顶尖梯队，并获得了 2025 年布达佩斯 Major 亚军。",
  },
  players: [
    { alias: "karrigan", name: "Finn Andersen", role: "IGL (指挥)", country: "丹麦", rating: "0.90", image: "assets/karrigan.jpg" },
    { alias: "frozen", name: "David Čerňanský", role: "Rifler (步枪手)", country: "斯洛伐克", rating: "1.15", image: "assets/frozen.jpg" },
    { alias: "Twistzz", name: "Russel Van Dulken", role: "Rifler (步枪手)", country: "加拿大", rating: "1.12", image: "assets/twistzz.jpg" },
    { alias: "broky", name: "Helvijs Saukants", role: "AWPer (狙击手)", country: "拉脱维亚", rating: "1.11", image: "assets/broky.jpg" },
    { alias: "jcobbb", name: "Jakub Pietruszewski", role: "Rifler (步枪手/新秀)", country: "波兰", rating: "1.05", image: "assets/jcobbb.jpg" }
  ],
  playerDetails: {
    Twistzz: {
      fullName: "Russel Van Dulken",
      birthday: "1999-11-14",
      totalWinnings: "$1,500,000+",
      mouseSettings: { dpi: 800, sensitivity: 0.9, hz: 1000 },
      careerHighlights: [
        "PGL Major Antwerp 2022 Champion",
        "Intel Grand Slam Season 4 Winner",
        "Intel Grand Slam Season 1 Winner",
        "Top 20 players of 2023 (#7 HLTV)"
      ],
      roles: ["Entry Fragger", "Clutcher", "Headshot Machine"],
      stats: { aim: 98, strategy: 85, impact: 94, utility: 80, consistency: 92 },
      bio: "Twistzz 被公认为 CS 历史上最伟大的北美选手之一。他以极其精准的爆头和关键时刻的残局能力闻名。他是历史上唯一一位赢得两次 Intel 大满贯的选手。"
    },
    karrigan: {
      fullName: "Finn Andersen",
      birthday: "1990-04-14",
      totalWinnings: "$1,600,000+",
      mouseSettings: { dpi: 400, sensitivity: 1.2, hz: 1000 },
      careerHighlights: [
        "PGL Major Antwerp 2022 Champion",
        "Intel Grand Slam Season 4 Winner",
        "Most successful IGL in CS history",
        "Known for aggressive T-side calling"
      ],
      roles: ["IGL", "Entry Fragger", "Veteran Leader"],
      stats: { aim: 75, strategy: 99, impact: 88, utility: 95, consistency: 82 },
      bio: "karrigan 是 CS 历史上最成功的指挥官之一。他以能够将不同背景的顶尖选手整合为冠军之师而闻名，是 FaZe Clan 战术体系的灵魂。"
    },
    frozen: {
      fullName: "David Čerňanský",
      birthday: "2002-07-18",
      totalWinnings: "$800,000+",
      mouseSettings: { dpi: 400, sensitivity: 1.1, hz: 1000 },
      careerHighlights: [
        "Top 20 players of 2023 (#12 HLTV)",
        "Flashpoint 3 Champion",
        "EPL Season 18 Champion",
        "Youngest player to play in a Major qualifier at 13"
      ],
      roles: ["Rifler", "Clutcher", "Anchor"],
      stats: { aim: 92, strategy: 88, impact: 90, utility: 85, consistency: 96 },
      bio: "frozen 是一名天赋异禀的斯洛伐克选手，在加入 FaZe 之前已在 MOUZ 证明了自己。他以冷静的残局处理和极其稳定的火力输出著称。"
    },
    broky: {
      fullName: "Helvijs Saukants",
      birthday: "2001-02-14",
      totalWinnings: "$1,200,000+",
      mouseSettings: { dpi: 400, sensitivity: 1.0, hz: 1000 },
      careerHighlights: [
        "IEM Katowice 2022 MVP",
        "PGL Major Antwerp 2022 Champion",
        "Top 20 players of 2022 (#6 HLTV)",
        "Known for incredible clutch statistics"
      ],
      roles: ["AWPer", "Clutcher"],
      stats: { aim: 94, strategy: 82, impact: 92, utility: 78, consistency: 95 },
      bio: "broky 是拉脱维亚的顶尖狙击手，也是 FaZe 阵中最稳健的残局大师。他在 2022 年迎来了职业生涯巅峰，拿到了多个 MVP 奖项。"
    },
    jcobbb: {
      fullName: "Jakub Pietruszewski",
      birthday: "2004-05-22",
      totalWinnings: "$50,000+",
      mouseSettings: { dpi: 800, sensitivity: 0.8, hz: 1000 },
      careerHighlights: [
        "Signed by FaZe Clan in 2025",
        "Former star of Polish Tier-2 scene",
        "PGL Cluj-Napoca 2026 Quarterfinalist",
        "Considered the future of Polish CS"
      ],
      roles: ["Rifler", "Entry Fragger", "Young Prospect"],
      stats: { aim: 90, strategy: 75, impact: 85, utility: 70, consistency: 80 },
      bio: "jcobbb 是 FaZe 在 2025 年签下的波兰新星。作为一名极具侵略性的步枪手，他承担了填补 ropz 离队后火力空缺的重任，展现出了巨大的潜力。"
    }
  },
  news: [
    {
      id: 1,
      title: "frozen Leads FaZe to Victory in ESL Pro League Season 23",
      date: "Mar 08, 2026",
      tag: "TOURNAMENT",
      image: "assets/frozen.jpg",
      desc: "David 'frozen' Čerňanský puts up a masterful performance as FaZe Clan starts their campaign with a clean 2-0 sweep.",
      content: "ESL Pro League Season 23 揭幕战中，FaZe Clan 展现了惊人的统治力。David 'frozen' Čerňanský 在 Ancient 和 Nuke 两张地图上交出了 1.45 的平均 Rating，带领战队以 2-0 完胜对手。这场胜利标志着 FaZe 在 2026 赛季初期的强劲势头，也证明了战队在休赛期的调整非常成功。主教练在赛后采访中表示，frozen 的稳定发挥是战队取胜的关键，而全队的配合也达到了新的高度。"
    },
    {
      id: 2,
      title: "jcobbb Reflects on His First Major Experience with FaZe",
      date: "Mar 01, 2026",
      tag: "INTERVIEW",
      image: "assets/jcobbb.jpg",
      desc: "The Polish rising star discusses his adjustment to the team and the expectations for the remainder of the 2026 season.",
      content: "作为 FaZe Clan 最年轻的成员，jcobbb 在他的首次 Major 之旅后分享了深刻的感悟。这位波兰新星坦言，在顶级舞台上竞技的压力远超想象，但队友们的支持让他迅速适应。'karrigan 的领导力让我感到安心，' jcobbb 在采访中说道，'我们虽然在决赛中失利，但这只是开始。' 展望 2026 赛季剩余的比赛，他表示将专注于个人技术的打磨，力争在接下来的 IEM 科隆中为粉丝带来更多惊喜。"
    },
    {
      id: 3,
      title: "Twistzz Reaches 1.5M Career Prize Money Milestone",
      date: "Feb 20, 2026",
      tag: "MILESTONE",
      image: "assets/twistzz.jpg",
      desc: "After the recent PGL Major performance, Twistzz becomes the highest-earning North American player in history.",
      content: "Russel 'Twistzz' Van Dulken 再次刷新了历史。凭借在 PGL 2026 Major 中的出色表现，他的职业生涯总奖金正式突破 150 万美元大关，进一步巩固了其作为北美 CS 历史上最成功选手的地位。Twistzz 不仅是历史上唯一一位赢得两次大满贯的选手，他的职业道德和赛场表现也一直是年轻选手的楷模。为了庆祝这一里程碑，FaZe 官方商城也将推出限量版签名周边。"
    }
  ],
  achievements: [
    { year: 2025, title: "StarLadder Budapest Major 2025", placement: "亚军 🥈" },
    { year: 2023, title: "IEM Sydney 2023", placement: "冠军 🏆" },
    { year: 2023, title: "Intel Grand Slam Season 4", placement: "大满贯得主 🌟" },
    { year: 2022, title: "PGL Major Antwerp 2022", placement: "冠军 🏆" },
    { year: 2022, title: "IEM Cologne 2022", placement: "冠军 🏆" }
  ],
  subscriptions: []
};

// API Routes
app.get('/api/team', (req, res) => res.json(db.teamData));
app.get('/api/players', (req, res) => res.json(db.players));
app.get('/api/players/:alias', (req, res) => {
  const alias = req.params.alias;
  const basicInfo = db.players.find(p => p.alias.toLowerCase() === alias.toLowerCase());
  const detailInfo = db.playerDetails[alias] || db.playerDetails['Twistzz']; // Fallback
  
  if (basicInfo) {
    res.json({ ...basicInfo, ...detailInfo });
  } else {
    res.status(404).json({ message: "Player not found" });
  }
});

app.get('/api/news', (req, res) => res.json(db.news));
app.get('/api/news/:id', (req, res) => {
  const newsItem = db.news.find(item => item.id === parseInt(req.params.id));
  if (newsItem) res.json(newsItem);
  else res.status(404).json({ message: "News not found" });
});
app.get('/api/achievements', (req, res) => res.json(db.achievements));

// Global Search API
app.get('/api/search', (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : '';
  if (!query) return res.json({ players: [], news: [] });

  const filteredPlayers = db.players.filter(p => 
    p.alias.toLowerCase().includes(query) || 
    p.name.toLowerCase().includes(query) ||
    p.role.toLowerCase().includes(query)
  );

  const filteredNews = db.news.filter(n => 
    n.title.toLowerCase().includes(query) || 
    n.desc.toLowerCase().includes(query) ||
    n.tag.toLowerCase().includes(query)
  );

  res.json({
    players: filteredPlayers,
    news: filteredNews
  });
});

// Newsletter Subscription Route
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  
  try {
    const subs = JSON.parse(fs.readFileSync(SUBS_FILE));
    if (subs.some(s => s.email === email)) {
      return res.status(400).json({ message: "Already subscribed!" });
    }
    
    subs.push({ email, date: new Date() });
    fs.writeFileSync(SUBS_FILE, JSON.stringify(subs, null, 2));
    console.log(`New subscription saved: ${email}`);
    
    setTimeout(() => {
      res.json({ message: "Subscription successful!" });
    }, 1000);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
