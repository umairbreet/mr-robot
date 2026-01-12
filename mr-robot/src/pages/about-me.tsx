// src/pages/about-me.tsx
import { useState, useEffect } from 'react';
import '../styles/pages/about-me.css'; // We'll create this CSS file

const AboutMe: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'timeline'>('profile');
    const [typedText, setTypedText] = useState('');
    const [cursorVisible, setCursorVisible] = useState(true);
    
    const aboutText = `Hello! I'm Robo Breet, a cybersecurity engineer and ethical hacker. 
    I have a passion for technology and a deep commitment to protecting user privacy and security.
    
    For over a decade, I've been working on the front lines of digital security, 
    identifying vulnerabilities before they can be exploited and building robust 
    defense systems for organizations worldwide.`;

    // Typing effect for bio
    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= aboutText.length) {
                setTypedText(aboutText.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
                // Blinking cursor
                const cursorInterval = setInterval(() => {
                    setCursorVisible(prev => !prev);
                }, 500);
                return () => clearInterval(cursorInterval);
            }
        }, 30);

        return () => clearInterval(interval);
    }, []);

    // Skills data
    const skills = [
        { name: "Penetration Testing", level: 95, color: "#00ff00" },
        { name: "Network Security", level: 90, color: "#00ffff" },
        { name: "Cryptography", level: 88, color: "#ff00ff" },
        { name: "Reverse Engineering", level: 85, color: "#ffff00" },
        { name: "Malware Analysis", level: 82, color: "#ff5f56" },
        { name: "Digital Forensics", level: 80, color: "#27ca3f" },
    ];

    // Timeline data
    const timeline = [
        { year: "2012", title: "Started Security Journey", description: "First discovered passion for cybersecurity" },
        { year: "2014", title: "Certified Ethical Hacker", description: "Obtained CEH certification" },
        { year: "2016", title: "Senior Pentester", description: "Joined major security firm" },
        { year: "2018", title: "Security Lead", description: "Led team of 10 security engineers" },
        { year: "2020", title: "Started Consulting", description: "Founded independent security consultancy" },
        { year: "2023", title: "Mr. Robot Security", description: "Launched current venture" },
    ];

    return (
        <div className="about-container">
            {/* Terminal Header */}
            <div className="terminal-header">
                <div className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                </div>
                <div className="terminal-title">user@mr-robot:~$ whoami</div>
            </div>

            <main className="about-main">
                {/* Profile Section */}
                <section className="profile-section">
                    <div className="profile-card">
                        <div className="profile-header">
                            <div className="avatar-container">
                                <div className="avatar">
                                    <div className="avatar-inner">
                                        <div className="avatar-icon">🤖</div>
                                    </div>
                                    <div className="avatar-glow"></div>
                                    <div className="status-indicator online"></div>
                                </div>
                                <div className="avatar-info">
                                    <h1 className="username">
                                        <span className="username-text">ROBO_BREET</span>
                                        <span className="username-tag">@mr_robot</span>
                                    </h1>
                                    <div className="user-title">CYBERSECURITY_ENGINEER</div>
                                    <div className="user-status">
                                        <span className="status-dot"></span>
                                        <span className="status-text">AVAILABLE_FOR_CONTRACT</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-content">
                            <div className="bio-terminal">
                                <div className="terminal-line">
                                    <span className="prompt">$</span>
                                    <span className="command">cat ~/about_me.txt</span>
                                </div>
                                <div className="terminal-output">
                                    <pre className="bio-text">
                                        {typedText}
                                        <span className={`cursor ${cursorVisible ? 'visible' : ''}`}>█</span>
                                    </pre>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="contact-grid">
                                <div className="contact-item">
                                    <span className="contact-icon">📧</span>
                                    <div className="contact-info">
                                        <div className="contact-label">EMAIL</div>
                                        <div className="contact-value">robobreet@mr-robot.security</div>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-icon">🔑</span>
                                    <div className="contact-info">
                                        <div className="contact-label">PGP_KEY</div>
                                        <div className="contact-value">0xFA1E5EC7BEEFCA5E</div>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-icon">💻</span>
                                    <div className="contact-info">
                                        <div className="contact-label">GITHUB</div>
                                        <div className="contact-value">github.com/mr_robot</div>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-icon">🔒</span>
                                    <div className="contact-info">
                                        <div className="contact-label">SIGNAL</div>
                                        <div className="contact-value">+1-XXX-XXX-XXXX</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Navigation Tabs */}
                <section className="tabs-section">
                    <div className="tabs-container">
                        <div className="tabs">
                            <button 
                                className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                                onClick={() => setActiveTab('profile')}
                            >
                                <span className="tab-icon">👤</span>
                                <span className="tab-text">PROFILE</span>
                            </button>
                            <button 
                                className={`tab ${activeTab === 'skills' ? 'active' : ''}`}
                                onClick={() => setActiveTab('skills')}
                            >
                                <span className="tab-icon">⚡</span>
                                <span className="tab-text">SKILLS</span>
                            </button>
                            <button 
                                className={`tab ${activeTab === 'timeline' ? 'active' : ''}`}
                                onClick={() => setActiveTab('timeline')}
                            >
                                <span className="tab-icon">📅</span>
                                <span className="tab-text">TIMELINE</span>
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="tab-content">
                            {activeTab === 'profile' && (
                                <div className="profile-tab">
                                    <div className="info-grid">
                                        <div className="info-card">
                                            <div className="info-header">
                                                <span className="info-icon">🎓</span>
                                                <h3>EDUCATION</h3>
                                            </div>
                                            <div className="info-content">
                                                <div className="info-item">
                                                    <div className="info-title">MS in Cybersecurity</div>
                                                    <div className="info-subtitle">MIT (2011-2013)</div>
                                                </div>
                                                <div className="info-item">
                                                    <div className="info-title">BS in Computer Science</div>
                                                    <div className="info-subtitle">Stanford (2007-2011)</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="info-card">
                                            <div className="info-header">
                                                <span className="info-icon">🏆</span>
                                                <h3>CERTIFICATIONS</h3>
                                            </div>
                                            <div className="info-content">
                                                <div className="cert-badge">CEH</div>
                                                <div className="cert-badge">OSCP</div>
                                                <div className="cert-badge">CISSP</div>
                                                <div className="cert-badge">GPEN</div>
                                                <div className="cert-badge">GWAPT</div>
                                                <div className="cert-badge">GXPN</div>
                                            </div>
                                        </div>

                                        <div className="info-card">
                                            <div className="info-header">
                                                <span className="info-icon">🛡️</span>
                                                <h3>SPECIALTIES</h3>
                                            </div>
                                            <div className="info-content">
                                                <div className="specialty">Red Team Operations</div>
                                                <div className="specialty">Threat Intelligence</div>
                                                <div className="specialty">Secure Architecture</div>
                                                <div className="specialty">Incident Response</div>
                                                <div className="specialty">Zero Trust Networks</div>
                                                <div className="specialty">Cloud Security</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'skills' && (
                                <div className="skills-tab">
                                    <div className="skills-container">
                                        {skills.map((skill, index) => (
                                            <div key={index} className="skill-item">
                                                <div className="skill-header">
                                                    <span className="skill-name">{skill.name}</span>
                                                    <span className="skill-percent">{skill.level}%</span>
                                                </div>
                                                <div className="skill-bar">
                                                    <div 
                                                        className="skill-fill" 
                                                        style={{ 
                                                            width: `${skill.level}%`,
                                                            backgroundColor: skill.color 
                                                        }}
                                                    ></div>
                                                    <div className="skill-glow" style={{ backgroundColor: skill.color }}></div>
                                                </div>
                                                <div className="skill-level">
                                                    <div className="level-marker" style={{ left: '20%' }}><span>NOVICE</span></div>
                                                    <div className="level-marker" style={{ left: '40%' }}><span>INTERMEDIATE</span></div>
                                                    <div className="level-marker" style={{ left: '60%' }}><span>ADVANCED</span></div>
                                                    <div className="level-marker" style={{ left: '80%' }}><span>EXPERT</span></div>
                                                    <div className="level-marker" style={{ left: '100%' }}><span>MASTER</span></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'timeline' && (
                                <div className="timeline-tab">
                                    <div className="timeline">
                                        {timeline.map((item, index) => (
                                            <div key={index} className="timeline-item">
                                                <div className="timeline-marker">
                                                    <div className="timeline-year">{item.year}</div>
                                                    <div className="timeline-dot"></div>
                                                    <div className="timeline-line"></div>
                                                </div>
                                                <div className="timeline-content">
                                                    <h3 className="timeline-title">{item.title}</h3>
                                                    <p className="timeline-description">{item.description}</p>
                                                    <div className="timeline-tags">
                                                        <span className="tag">CYBERSECURITY</span>
                                                        <span className="tag">PROFESSIONAL</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Quote Section */}
                <section className="quote-section">
                    <div className="quote-terminal">
                        <div className="terminal-line">
                            <span className="prompt">$</span>
                            <span className="command">fortune | cowsay</span>
                        </div>
                        <div className="terminal-output">
                            <pre className="quote-text">
                                {`
 _________________________________________
/ The only truly secure system is one    \\
| that is powered off, cast in a block   |
| of concrete and sealed in a lead-lined |
| room with armed guards - and even then |
| I have my doubts.                      |
\\                                         /
 -----------------------------------------
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
                                `}
                            </pre>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="about-cta">
                    <div className="cta-card">
                        <div className="cta-content">
                            <h2 className="cta-title">WANT_TO_COLLABORATE?</h2>
                            <p className="cta-description">
                                Looking for security audits, penetration testing, or security consulting?
                                Let's discuss how we can work together to secure your systems.
                            </p>
                            <div className="cta-buttons">
                                <button className="hacker-button">
                                    <span className="button-text">SEND_ENCRYPTED_MESSAGE</span>
                                    <span className="button-icon">🔐</span>
                                </button>
                                <button className="outline-button">
                                    <span className="button-text">REQUEST_CV</span>
                                    <span className="button-icon">📄</span>
                                </button>
                            </div>
                        </div>
                        <div className="cta-glow"></div>
                    </div>
                </section>
            </main>

            {/* Matrix Background */}
            <div className="matrix-bg"></div>
        </div>
    );
};

export default AboutMe;