import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Calendar, Bell, BellOff, Info, Trophy, Map, X, User, Zap, ChevronRight } from 'lucide-react';

const recentMatches = [
  {
    id: 'm1',
    opponent: "paiN",
    score: "1 - 2",
    event: "ESL Pro League S23",
    result: "loss",
    date: "2026-03-07",
    maps: ["Ancient (W)", "Nuke (L)", "Anubis (L)"],
    stats: { mvp: "frozen", rating: "1.24", headshots: "58%" }
  },
  {
    id: 'm2',
    opponent: "G2",
    score: "0 - 2",
    event: "ESL Pro League S23",
    result: "loss",
    date: "2026-03-06",
    maps: ["Dust2 (L)", "Inferno (L)"],
    stats: { mvp: "m0nesy", rating: "1.45", headshots: "42%" }
  },
  {
    id: 'm3',
    opponent: "Astralis",
    score: "0 - 2",
    event: "PGL Cluj-Napoca 2026",
    result: "loss",
    date: "2026-02-17",
    maps: ["Mirage (L)", "Nuke (L)"],
    stats: { mvp: "device", rating: "1.32", headshots: "38%" }
  }
];

const upcomingMatches = [
  { id: 'u1', opponent: "NAVI", time: "20:00", event: "PGL Major Budapest 2026", date: "2026-03-20", venue: "Budapest Arena" },
  { id: 'u2', opponent: "Liquid", time: "18:30", event: "BLAST Premier Spring 2026", date: "2026-03-25", venue: "Online" }
];

const Matches = () => {
  const [reminders, setReminders] = useState(() => JSON.parse(localStorage.getItem('faze_cart_reminders') || '[]')); // Fixed key name consistency
  const [activeTab, setActiveTab] = useState('recent');
  const [selectedMatch, setSelectedMatch] = useState(null);

  const toggleReminder = (id) => {
    let newReminders;
    if (reminders.includes(id)) {
      newReminders = reminders.filter(r => r !== id);
    } else {
      newReminders = [...reminders, id];
    }
    setReminders(newReminders);
    localStorage.setItem('faze_reminders', JSON.stringify(newReminders));
  };

  return (
    <section id="section-matches" className="matches-section">
      <div className="section-header">
        <div className="section-tag"><Swords size={14} /> MATCH CENTER</div>
        <h2>Match Schedule</h2>
      </div>

      <div className="matches-tabs">
        <button className={`tab-btn ${activeTab === 'recent' ? 'active' : ''}`} onClick={() => setActiveTab('recent')}>Recent Results</button>
        <button className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>Upcoming Matches</button>
      </div>

      <div className="matches-list">
        <AnimatePresence mode='wait'>
          {activeTab === 'recent' ? (
            <motion.div
              key="recent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {recentMatches.map((match) => (
                <motion.div
                  key={match.id}
                  className="match-item recent"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedMatch(match)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="match-main">
                    <div className="match-info-top">
                      <span className="event-name"><Trophy size={12} /> {match.event}</span>
                      <span className="match-date">{match.date}</span>
                    </div>
                    <div className="match-teams-score">
                      <div className="team-name">FAZE</div>
                      <div className={`score-display ${match.result}`}>{match.score}</div>
                      <div className="team-name">{match.opponent}</div>
                    </div>
                    <div className="match-footer">
                      <div className="maps-row">
                        <Map size={12} />
                        {match.maps.map(map => <span key={map} className="map-tag">{map}</span>)}
                      </div>
                      <span className="view-details-hint">Click for details <ChevronRight size={14} /></span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {upcomingMatches.map((match) => (
                <div key={match.id} className="match-item upcoming">
                  <div className="match-main">
                    <div className="match-info-top">
                      <span className="event-name"><Trophy size={12} /> {match.event}</span>
                      <span className="match-date">{match.date} • {match.time}</span>
                    </div>
                    <div className="match-teams-score">
                      <div className="team-name">FAZE</div>
                      <div className="vs-label">VS</div>
                      <div className="team-name">{match.opponent}</div>
                    </div>
                    <div className="match-footer">
                      <div className="venue-info"><Info size={12} /> {match.venue}</div>
                      <button
                        className={`reminder-btn ${reminders.includes(match.id) ? 'active' : ''}`}
                        onClick={() => toggleReminder(match.id)}
                      >
                        {reminders.includes(match.id) ? (
                          <><BellOff size={14} /> Reminder Set</>
                        ) : (
                          <><Bell size={14} /> Notify Me</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedMatch && (
          <motion.div
            className="match-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMatch(null)}
          >
            <motion.div
              className="match-modal"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedMatch(null)}><X /></button>
              <div className="modal-header">
                <h3>Match Analysis</h3>
                <span className="event-tag">{selectedMatch.event}</span>
              </div>

              <div className="modal-score-board">
                <div className="modal-team">
                  <div className="modal-team-logo">FAZE</div>
                  <span>FaZe Clan</span>
                </div>
                <div className="modal-score">{selectedMatch.score}</div>
                <div className="modal-team">
                  <div className="modal-team-logo alt">{selectedMatch.opponent[0]}</div>
                  <span>{selectedMatch.opponent}</span>
                </div>
              </div>

              <div className="modal-stats-grid">
                <div className="modal-stat-card">
                  <User size={20} />
                  <span className="label">Match MVP</span>
                  <span className="value">{selectedMatch.stats.mvp}</span>
                </div>
                <div className="modal-stat-card">
                  <Zap size={20} />
                  <span className="label">Average Rating</span>
                  <span className="value">{selectedMatch.stats.rating}</span>
                </div>
                <div className="modal-stat-card">
                  <Swords size={20} />
                  <span className="label">HS Percentage</span>
                  <span className="value">{selectedMatch.stats.headshots}</span>
                </div>
              </div>

              <div className="modal-maps-section">
                <h4><Map size={16} /> Map Veto & Results</h4>
                <div className="modal-maps-list">
                  {selectedMatch.maps.map((map, i) => (
                    <div key={i} className="modal-map-item">
                      <span className="map-name">{map.split(' ')[0]}</span>
                      <span className={`map-result ${map.includes('(W)') ? 'win' : 'loss'}`}>
                        {map.includes('(W)') ? 'Victory' : 'Defeat'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Matches;

