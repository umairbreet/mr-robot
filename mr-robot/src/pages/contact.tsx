// src/pages/contact.tsx
import React, { useEffect, useState } from 'react';
import { fetchContentCards } from '../services/api';
import ContentCard from '../components/admin/admin-components/ContentCard/content-card';
import '../styles/pages/contact.css'; // We'll create this CSS file

interface ContentCardData {
    id: number;
    title: string;
    description?: string;
    image_url?: string;
}

const Contact: React.FC = () => {
    const [cards, setCards] = useState<ContentCardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        encryption: true
    });
    const [isSending, setIsSending] = useState(false);
    const [sendStatus, setSendStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        const getCards = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchContentCards();
                setCards(data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to fetch cards';
                console.error('Error fetching cards:', err);
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };
        getCards();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        setSendStatus('idle');

        // Simulate sending encrypted message
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const success = Math.random() > 0.3; // 70% success rate for demo
        setSendStatus(success ? 'success' : 'error');
        setIsSending(false);

        if (success) {
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                encryption: true
            });
        }
    };

    const generateEncryptionKey = () => {
        const chars = '0123456789ABCDEF';
        let key = '';
        for (let i = 0; i < 32; i++) {
            key += chars[Math.floor(Math.random() * chars.length)];
        }
        return key;
    };

    const [encryptionKey] = useState(generateEncryptionKey());

    return (
        <div className="contact-container">
            {/* Terminal Header */}
            <div className="terminal-header">
                <div className="terminal-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                </div>
                <div className="terminal-title">user@mr-robot:~$ contact --initiate</div>
            </div>

            <main className="contact-main">
                {/* Contact Header */}
                <section className="contact-header-section">
                    <div className="contact-header-card">
                        <div className="header-content">
                            <h1 className="terminal-text">
                                <span className="prompt">$</span>
                                <span className="command">initiate_secure_contact</span>
                            </h1>
                            <div className="header-description">
                                <p>Secure communication channel established. All messages are end-to-end encrypted.</p>
                                <div className="connection-status">
                                    <span className="status-dot connected"></span>
                                    <span className="status-text">CONNECTION_ENCRYPTED</span>
                                    <span className="status-key">KEY: {encryptionKey}</span>
                                </div>
                            </div>
                        </div>
                        <div className="header-stats">
                            <div className="stat-item">
                                <div className="stat-icon">🔐</div>
                                <div className="stat-info">
                                    <div className="stat-value">AES-256</div>
                                    <div className="stat-label">ENCRYPTION</div>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">⚡</div>
                                <div className="stat-info">
                                    <div className="stat-value">&lt;1ms</div>
                                    <div className="stat-label">PING</div>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon">🛡️</div>
                                <div className="stat-info">
                                    <div className="stat-value">100%</div>
                                    <div className="stat-label">SECURE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main Content Grid */}
                <div className="contact-grid">
                    {/* Left Column - Contact Form */}
                    <div className="contact-form-section">
                        <div className="form-terminal">
                            <div className="form-header">
                                <div className="form-title">
                                    <span className="form-icon">📧</span>
                                    <span>SEND_ENCRYPTED_MESSAGE</span>
                                </div>
                                <div className="form-subtitle">
                                    All fields are required. Messages are automatically encrypted.
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="hacker-form">
                                <div className="form-group">
                                    <label className="form-label">
                                        <span className="label-text">IDENTITY</span>
                                        <span className="label-required">*</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="hacker-input"
                                            placeholder="Enter your codename..."
                                            disabled={isSending}
                                        />
                                        <div className="input-glow"></div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <span className="label-text">ENCRYPTED_EMAIL</span>
                                        <span className="label-required">*</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="hacker-input"
                                            placeholder="secure@domain.encrypted"
                                            disabled={isSending}
                                        />
                                        <div className="input-glow"></div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <span className="label-text">SUBJECT_LINE</span>
                                        <span className="label-required">*</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="hacker-select"
                                            disabled={isSending}
                                        >
                                            <option value="">Select subject...</option>
                                            <option value="security_audit">Security Audit Request</option>
                                            <option value="consulting">Consulting Inquiry</option>
                                            <option value="penetration_test">Penetration Testing</option>
                                            <option value="emergency">Emergency Response</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <div className="input-glow"></div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">
                                        <span className="label-text">ENCRYPTED_MESSAGE</span>
                                        <span className="label-required">*</span>
                                    </label>
                                    <div className="input-wrapper">
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={6}
                                            className="hacker-textarea"
                                            placeholder="Type your secure message here..."
                                            disabled={isSending}
                                        ></textarea>
                                        <div className="input-glow"></div>
                                    </div>
                                    <div className="message-counter">
                                        <span className="counter-text">Characters: {formData.message.length}</span>
                                        <span className="counter-encrypted">Encrypted: ✓</span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            name="encryption"
                                            checked={formData.encryption}
                                            onChange={handleInputChange}
                                            className="hacker-checkbox"
                                            disabled={isSending}
                                        />
                                        <span className="checkbox-custom"></span>
                                        <span className="checkbox-text">Enable military-grade encryption (AES-256)</span>
                                    </label>
                                </div>

                                {sendStatus === 'error' && (
                                    <div className="error-terminal">
                                        <div className="error-header">
                                            <span className="error-icon">⚠️</span>
                                            TRANSMISSION_FAILED
                                        </div>
                                        <div className="error-content">
                                            Message could not be delivered. Please try again or use alternative contact methods.
                                        </div>
                                    </div>
                                )}

                                {sendStatus === 'success' && (
                                    <div className="success-terminal">
                                        <div className="success-header">
                                            <span className="success-icon">✅</span>
                                            MESSAGE_ENCRYPTED_AND_SENT
                                        </div>
                                        <div className="success-content">
                                            Your message has been successfully encrypted and delivered securely.
                                            You will receive a response within 24 hours.
                                        </div>
                                    </div>
                                )}

                                <div className="form-actions">
                                    <button
                                        type="submit"
                                        className="encrypt-button"
                                        disabled={isSending}
                                    >
                                        {isSending ? (
                                            <>
                                                <span className="button-spinner"></span>
                                                <span className="button-text">ENCRYPTING...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="button-icon">🔐</span>
                                                <span className="button-text">ENCRYPT_AND_SEND</span>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="clear-button"
                                        onClick={() => setFormData({
                                            name: '',
                                            email: '',
                                            subject: '',
                                            message: '',
                                            encryption: true
                                        })}
                                        disabled={isSending}
                                    >
                                        <span className="button-icon">🗑️</span>
                                        <span className="button-text">CLEAR_FORM</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column - Contact Info & Cards */}
                    <div className="contact-info-section">
                        {/* Quick Contact Info */}
                        <div className="info-terminal">
                            <div className="info-header">
                                <span className="info-icon">📞</span>
                                ALTERNATIVE_CONTACT_METHODS
                            </div>
                            <div className="info-content">
                                <div className="contact-method">
                                    <div className="method-icon">✉️</div>
                                    <div className="method-info">
                                        <div className="method-label">ENCRYPTED_EMAIL</div>
                                        <div className="method-value">contact@mr-robot.encrypted</div>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <div className="method-icon">🔑</div>
                                    <div className="method-info">
                                        <div className="method-label">PGP_KEY</div>
                                        <div className="method-value">0xFA1E5EC7BEEFCA5E</div>
                                        <div className="method-note">For encrypted communications only</div>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <div className="method-icon">📱</div>
                                    <div className="method-info">
                                        <div className="method-label">SIGNAL</div>
                                        <div className="method-value">+1-XXX-XXX-XXXX</div>
                                        <div className="method-note">End-to-end encrypted calls</div>
                                    </div>
                                </div>
                                <div className="contact-method">
                                    <div className="method-icon">🌐</div>
                                    <div className="method-info">
                                        <div className="method-label">ONION_SITE</div>
                                        <div className="method-value">mrrobot3j2j2j2.onion</div>
                                        <div className="method-note">Tor network required</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Response Time Info */}
                        <div className="response-terminal">
                            <div className="response-header">
                                <span className="response-icon">⏱️</span>
                                RESPONSE_TIMES
                            </div>
                            <div className="response-content">
                                <div className="response-item urgent">
                                    <div className="response-type">EMERGENCY</div>
                                    <div className="response-time">&lt; 15 minutes</div>
                                </div>
                                <div className="response-item high">
                                    <div className="response-type">HIGH_PRIORITY</div>
                                    <div className="response-time">1-2 hours</div>
                                </div>
                                <div className="response-item normal">
                                    <div className="response-type">STANDARD</div>
                                    <div className="response-time">24 hours</div>
                                </div>
                                <div className="response-item low">
                                    <div className="response-type">GENERAL</div>
                                    <div className="response-time">2-3 days</div>
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Cards Section */}
                        <div className="cards-section">
                            <div className="cards-header">
                                <span className="cards-icon">💾</span>
                                <span>DYNAMIC_CONTENT</span>
                            </div>
                            
                            {error && (
                                <div className="error-card">
                                    <div className="error-card-header">
                                        <span className="error-card-icon">⚠️</span>
                                        FETCH_ERROR
                                    </div>
                                    <div className="error-card-content">
                                        Error: {error}
                                    </div>
                                </div>
                            )}
                            
                            {loading ? (
                                <div className="loading-terminal">
                                    <div className="loading-content">
                                        <div className="loading-spinner"></div>
                                        <div className="loading-text">LOADING_CONTENT...</div>
                                    </div>
                                </div>
                            ) : (
                                <div className="cards-grid">
                                    {cards.length === 0 ? (
                                        <div className="empty-terminal">
                                            <div className="empty-content">
                                                <div className="empty-icon">📭</div>
                                                <div className="empty-text">NO_CONTENT_AVAILABLE</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="hacker-cards-grid">
                                            {cards.map((card) => (
                                                <ContentCard
                                                    key={card.id}
                                                    title={card.title}
                                                    description={card.description}
                                                    image_url={card.image_url}
                                                    status="secure"
                                                    hackLevel={5}
                                                    dataSize="Active"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Live Status */}
                <section className="status-section">
                    <div className="status-terminal">
                        <div className="status-header">
                            <span className="status-icon">📡</span>
                            LIVE_COMMUNICATION_STATUS
                        </div>
                        <div className="status-content">
                            <div className="status-item online">
                                <span className="status-dot"></span>
                                <span className="status-text">ENCRYPTION_ACTIVE</span>
                            </div>
                            <div className="status-item online">
                                <span className="status-dot"></span>
                                <span className="status-text">SERVER_CONNECTED</span>
                            </div>
                            <div className="status-item online">
                                <span className="status-dot"></span>
                                <span className="status-text">FIREWALL_ACTIVE</span>
                            </div>
                            <div className="status-item scanning">
                                <span className="status-dot"></span>
                                <span className="status-text">THREAT_SCANNING</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Matrix Background */}
            <div className="matrix-bg"></div>
        </div>
    );
};

export default Contact;