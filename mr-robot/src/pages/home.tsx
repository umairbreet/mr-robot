// src/pages/home.tsx
import { useEffect, useState } from 'react';
import '../styles/pages/home.css'; // We'll create this CSS file

const Home: React.FC = () => {
    const [typingText, setTypingText] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);
    const fullText = "MR. ROBOT SECURITY SYSTEMS";

    // Typing animation effect
    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypingText(fullText.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                // Blinking cursor effect
                const cursorInterval = setInterval(() => {
                    setCursorVisible(prev => !prev);
                }, 500);
                return () => clearInterval(cursorInterval);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div className="hacker-theme">
            {/* Terminal Header */}
            <div className="terminal-header">
                <div className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                </div>
                <div className="terminal-title">root@mr-robot:~</div>
            </div>

            {/* Main Content */}
            <main className="main-content">
                {/* Hero Section - Terminal Style */}
                <section className="terminal-section">
                    <div className="terminal-card">
                        <div className="terminal-line">
                            <span className="prompt">$</span>
                            <span className="command">system_status --check</span>
                        </div>
                        <div className="terminal-output">
                            <div className="matrix-text">
                                {typingText}
                                <span className={`cursor ${cursorVisible ? 'visible' : ''}`}>_</span>
                            </div>
                            <div className="status-line">
                                <span className="status-tag online">[ONLINE]</span>
                                <span>All systems operational</span>
                            </div>
                            <div className="status-grid">
                                <div className="status-item">
                                    <div className="status-label">SECURITY</div>
                                    <div className="status-bar">
                                        <div className="status-fill" style={{ width: '98%' }}></div>
                                    </div>
                                    <div className="status-value">98%</div>
                                </div>
                                <div className="status-item">
                                    <div className="status-label">NETWORK</div>
                                    <div className="status-bar">
                                        <div className="status-fill" style={{ width: '99%' }}></div>
                                    </div>
                                    <div className="status-value">99%</div>
                                </div>
                                <div className="status-item">
                                    <div className="status-label">ENCRYPTION</div>
                                    <div className="status-bar">
                                        <div className="status-fill" style={{ width: '100%' }}></div>
                                    </div>
                                    <div className="status-value">100%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section - Hacker Cards */}
                <section className="services-section">
                    <h2 className="section-title">
                        <span className="hacker-title">OUR_SERVICES</span>
                        <span className="blink">_</span>
                    </h2>
                    
                    <div className="services-grid">
                        {/* Card 1 - Penetration Testing */}
                        <div className="hacker-card">
                            <div className="card-header">
                                <div className="card-icon">🔓</div>
                                <h3 className="card-title">PENETRATION_TESTING</h3>
                            </div>
                            <div className="card-content">
                                <p className="card-description">
                                    Identify vulnerabilities before attackers do. Our ethical hacking team simulates real-world attacks.
                                </p>
                                <div className="card-stats">
                                    <div className="stat">
                                        <span className="stat-label">SUCCESS_RATE</span>
                                        <span className="stat-value green">97%</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-label">THREATS_FOUND</span>
                                        <span className="stat-value red">1.2K+</span>
                                    </div>
                                </div>
                                <button className="hacker-button">
                                    <span className="button-text">ACCESS_SERVICE</span>
                                    <span className="button-arrow">→</span>
                                </button>
                            </div>
                            <div className="card-glow"></div>
                        </div>

                        {/* Card 2 - Network Security */}
                        <div className="hacker-card">
                            <div className="card-header">
                                <div className="card-icon">🌐</div>
                                <h3 className="card-title">NETWORK_SECURITY</h3>
                            </div>
                            <div className="card-content">
                                <p className="card-description">
                                    Secure your network infrastructure with advanced monitoring, firewalls, and intrusion detection.
                                </p>
                                <div className="card-stats">
                                    <div className="stat">
                                        <span className="stat-label">UPTIME</span>
                                        <span className="stat-value cyan">99.9%</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-label">ALERTS_24H</span>
                                        <span className="stat-value yellow">42</span>
                                    </div>
                                </div>
                                <button className="hacker-button">
                                    <span className="button-text">MONITOR_NOW</span>
                                    <span className="button-arrow">→</span>
                                </button>
                            </div>
                            <div className="card-glow"></div>
                        </div>

                        {/* Card 3 - Data Encryption */}
                        <div className="hacker-card">
                            <div className="card-header">
                                <div className="card-icon">🔐</div>
                                <h3 className="card-title">DATA_ENCRYPTION</h3>
                            </div>
                            <div className="card-content">
                                <p className="card-description">
                                    Military-grade encryption for your sensitive data. End-to-end protection that's unbreakable.
                                </p>
                                <div className="card-stats">
                                    <div className="stat">
                                        <span className="stat-label">ENCRYPTION_LEVEL</span>
                                        <span className="stat-value purple">AES-256</span>
                                    </div>
                                    <div className="stat">
                                        <span className="stat-label">DATA_PROTECTED</span>
                                        <span className="stat-value blue">500TB+</span>
                                    </div>
                                </div>
                                <button className="hacker-button">
                                    <span className="button-text">ENCRYPT_DATA</span>
                                    <span className="button-arrow">→</span>
                                </button>
                            </div>
                            <div className="card-glow"></div>
                        </div>
                    </div>
                </section>

                {/* Stats Section - Matrix Style */}
                <section className="stats-section">
                    <div className="matrix-background">
                        <div className="stats-container">
                            <div className="stat-card">
                                <div className="stat-number" data-count="1500">0</div>
                                <div className="stat-label">SECURITY_BREACHES_PREVENTED</div>
                                <div className="stat-line"></div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number" data-count="99">0</div>
                                <div className="stat-label">CLIENT_SATISFACTION</div>
                                <div className="stat-line"></div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number" data-count="24">0</div>
                                <div className="stat-label">RESPONSE_TIME_MINUTES</div>
                                <div className="stat-line"></div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number" data-count="100">0</div>
                                <div className="stat-label">COMPLIANCE_CERTIFICATIONS</div>
                                <div className="stat-line"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Live Feed Section */}
                <section className="feed-section">
                    <h2 className="section-title">
                        <span className="hacker-title">LIVE_SECURITY_FEED</span>
                        <span className="blink">_</span>
                    </h2>
                    
                    <div className="feed-container">
                        <div className="feed-terminal">
                            <div className="feed-header">
                                <span className="feed-status active"></span>
                                REAL-TIME_THREAT_MONITORING
                            </div>
                            <div className="feed-content">
                                <div className="feed-line">
                                    <span className="timestamp">[18:45:23]</span>
                                    <span className="log-type info">[INFO]</span>
                                    <span>Firewall updated to v4.2.1</span>
                                </div>
                                <div className="feed-line">
                                    <span className="timestamp">[18:46:01]</span>
                                    <span className="log-type warning">[WARNING]</span>
                                    <span>Unusual activity detected from IP: 192.168.1.105</span>
                                </div>
                                <div className="feed-line">
                                    <span className="timestamp">[18:46:30]</span>
                                    <span className="log-type success">[SUCCESS]</span>
                                    <span>Threat neutralized - Malware signature: Trojan.Generic.1234</span>
                                </div>
                                <div className="feed-line">
                                    <span className="timestamp">[18:47:15]</span>
                                    <span className="log-type info">[INFO]</span>
                                    <span>System scan initiated - Estimated completion: 5min</span>
                                </div>
                                <div className="feed-line">
                                    <span className="timestamp">[18:48:00]</span>
                                    <span className="log-type danger">[DANGER]</span>
                                    <span>DDOS attempt detected - Mitigation in progress...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-terminal">
                        <div className="cta-header">
                            <div className="cta-dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <div className="cta-title">initiate_secure_connection</div>
                        </div>
                        <div className="cta-content">
                            <div className="cta-message">
                                <p>READY_TO_HACK_THE_SYSTEM?</p>
                                <p>(ETHICALLY, OF COURSE)</p>
                            </div>
                            <div className="cta-actions">
                                <button className="glow-button">
                                    <span className="button-glitch">GET_STARTED</span>
                                    <span className="button-normal">GET_STARTED</span>
                                </button>
                                <button className="hollow-button">
                                    <span className="button-text">REQUEST_DEMO</span>
                                    <span className="button-code">&lt;/&gt;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Matrix Background Effect */}
            <div className="matrix-bg"></div>
        </div>
    );
};

export default Home;