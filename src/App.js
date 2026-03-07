import React from 'react';
import './App.css';

// 模拟来自 HLTV 的战队数据
const teamData = {
  name: "FaZe Clan",
  logo: "https://img-cdn.hltv.org/teamlogo/9b9f931d8c1c49987f1ce2152d1bbcf7.png?ixlib=java-2.1.0&w=100&s=12022ba63011a6ccfce508d5edff444d", // HLTV FaZe Logo
  worldRanking: 2, // 示例排名
  description: "FaZe Clan 是一家总部位于美国的知名电子竞技组织。他们的 CS 分部以其强大的国际阵容和极具观赏性的打法闻名，曾赢下 PGL 安特卫普 Major 以及第四赛季 Intel 大满贯。",
};

const players = [
  { alias: "karrigan", name: "Finn Andersen", role: "IGL (指挥)", country: "🇩🇰 丹麦", rating: "0.92" },
  { alias: "rain", name: "Håvard Nygaard", role: "Rifler (步枪手/突破)", country: "🇳🇴 挪威", rating: "1.08" },
  { alias: "broky", name: "Helvijs Saukants", role: "AWPer (狙击手)", country: "🇱🇻 拉脱维亚", rating: "1.14" },
  { alias: "ropz", name: "Robin Kool", role: "Rifler (步枪手/自由人)", country: "🇪🇪 爱沙尼亚", rating: "1.16" },
  { alias: "frozen", name: "David Čerňanský", role: "Rifler (步枪手)", country: "🇸🇰 斯洛伐克", rating: "1.13" }
];

const achievements = [
  { year: 2023, title: "IEM Sydney 2023", placement: "冠军 🏆" },
  { year: 2023, title: "Intel Grand Slam Season 4", placement: "大满贯得主 🌟" },
  { year: 2022, title: "PGL Major Antwerp 2022", placement: "冠军 🏆" },
  { year: 2022, title: "IEM Cologne 2022", placement: "冠军 🏆" },
  { year: 2022, title: "IEM Katowice 2022", placement: "冠军 🏆" }
];

function App() {
  return (
    <div className="app-container">
      {/* 头部信息 */}
      <header className="hero-section">
        <img src={teamData.logo} alt={`${teamData.name} Logo`} className="team-logo" />
        <h1 className="team-name">{teamData.name}</h1>
        <div className="badge">HLTV World Ranking: #{teamData.worldRanking}</div>
        <p className="team-desc">{teamData.description}</p>
      </header>

      {/* 阵容列表 */}
      <section className="roster-section">
        <h2>现役阵容 (Active Roster)</h2>
        <div className="players-grid">
          {players.map((player, index) => (
            <div className="player-card" key={index}>
              <h3 className="player-alias">{player.alias}</h3>
              <p className="player-name">{player.name}</p>
              <div className="player-details">
                <span className="role">{player.role}</span>
                <span className="country">{player.country}</span>
              </div>
              <div className="player-rating">
                HLTV Rating 2.0: <strong>{player.rating}</strong>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 荣誉列表 */}
      <section className="achievements-section">
        <h2>主要荣誉 (Notable Achievements)</h2>
        <ul className="achievements-list">
          {achievements.map((item, index) => (
            <li key={index} className="achievement-item">
              <span className="year">{item.year}</span>
              <span className="title">{item.title}</span>
              <span className="placement">{item.placement}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 页脚 */}
      <footer className="footer">
        <p>数据参考自 <a href="https://www.hltv.org/" target="_blank" rel="noreferrer">HLTV.org</a> | 仅供学习参考</p>
      </footer>
    </div>
  );
}

export default App;