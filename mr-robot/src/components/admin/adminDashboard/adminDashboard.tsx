import React, { useState, useEffect } from 'react';
import { fetchContentCards, createContentCard, type ContentCard as APIContentCard } from '../../../services/api';
import ContentCard from '../admin-components/ContentCard/content-card';
import StatsGrid from '../admin-components/StatsGrid/stats-grid';
import TerminalOutput from '../admin-components/TerminalOutput/terminal-output';
import CreateCardForm from '../admin-components/CreateCardForm/create-card-form';
import NavigationTabs from '../admin-components/NavigationTab/navigation-tab';
import QuickActions from '../admin-components/QuickActions/quick-actions';

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'systems' | 'data' | 'logs'>('overview');
    const [contentCards, setContentCards] = useState<APIContentCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Fetch content cards on component mount
    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            setLoading(true);
            setError(null);
            const cards = await fetchContentCards();
            setContentCards(cards);
        } catch (err) {
            setError('Failed to fetch content cards');
            console.error('Error fetching cards:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCard = async (cardData: APIContentCard) => {
        try {
            setError(null);
            const createdCard = await createContentCard(cardData);
            setContentCards([createdCard, ...contentCards]);
            setShowCreateForm(false);
            return { success: true, data: createdCard };
        } catch (err) {
            const errorMsg = 'Failed to create content card';
            setError(errorMsg);
            console.error('Error creating card:', err);
            return { success: false, error: errorMsg };
        }
    };

    // Calculate stats from actual data
    const getStats = () => {
        const criticalCount = contentCards.filter(card => card.status === 'critical').length;
        const totalDataSize = contentCards.reduce((sum, card) => {
            const size = parseInt(card.dataSize?.replace(/\D/g, '') || '0') || 0;
            return sum + size;
        }, 0);
        const avgSecurity = contentCards.length > 0 
            ? (contentCards.reduce((sum, card) => sum + (card.hackLevel || 5), 0) / contentCards.length).toFixed(1)
            : '0.0';

        return [
            { 
                label: "CONTENT CARDS", 
                value: `${contentCards.length}`, 
                color: "#10b981",
                icon: "📊"
            },
            { 
                label: "CRITICAL ALERTS", 
                value: `${criticalCount}`, 
                color: "#ef4444",
                icon: "⚠️"
            },
            { 
                label: "TOTAL DATA", 
                value: `${totalDataSize > 1000 ? (totalDataSize / 1000).toFixed(1) + 'GB' : totalDataSize + 'MB'}`, 
                color: "#06b6d4",
                icon: "💾"
            },
            { 
                label: "AVG SECURITY", 
                value: `${avgSecurity}/10`, 
                color: "#f59e0b",
                icon: "🛡️"
            }
        ];
    };

    // Filter cards by status for different sections
    const systemCards = contentCards.filter(card => 
        card.status === 'active' || card.status === 'secure' || card.status === 'breached' || card.status === 'critical'
    );

    const logCards = contentCards.filter(card => 
        card.description?.toLowerCase().includes('log') || 
        card.title.toLowerCase().includes('log') ||
        card.status === 'critical'
    ).slice(0, 3);

    const quickActions = [
        { 
            label: "REFRESH DATA", 
            desc: "Reload all content cards", 
            color: "#10b981", 
            icon: "⟳", 
            action: fetchCards 
        },
        { 
            label: "CREATE CARD", 
            desc: "Add new content card", 
            color: "#06b6d4", 
            icon: "➕", 
            action: () => setShowCreateForm(true) 
        },
        { 
            label: "EXPORT DATA", 
            desc: "Download all cards as JSON", 
            color: "#8b5cf6", 
            icon: "📥", 
            action: () => {
                const dataStr = JSON.stringify(contentCards, null, 2);
                const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                const exportFileDefaultName = `content-cards-${new Date().toISOString().split('T')[0]}.json`;
                const linkElement = document.createElement('a');
                linkElement.setAttribute('href', dataUri);
                linkElement.setAttribute('download', exportFileDefaultName);
                linkElement.click();
            }
        }
    ];

    const terminalMessages = [
        { text: "[OK] Database connection: ACTIVE", color: "#06b6d4" },
        { text: `[INFO] Content cards loaded: ${contentCards.length}`, color: "#10b981" },
        { 
            text: loading ? '[STATUS] Loading data...' : '[STATUS] All systems operational', 
            color: loading ? "#f59e0b" : "#10b981" 
        },
        { 
            text: `[SECURITY] ${contentCards.filter(c => c.status === 'critical').length} critical alerts`, 
            color: contentCards.filter(c => c.status === 'critical').length > 0 ? "#ef4444" : "#10b981" 
        }
    ];

    return (
        <div className="
            min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900
            text-white font-mono relative overflow-x-hidden
        ">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-1">
                {/* Top Glow */}
                <div className="
                    absolute top-0 left-0 right-0 h-px
                    bg-gradient-to-r from-transparent via-green-500 to-transparent
                    animate-pulse
                "></div>
                
                {/* Spinning Circle */}
                <div className="
                    absolute top-1/4 right-10 w-32 h-32
                    border border-green-500/20 rounded-full
                    animate-[spin-slow_20s_linear_infinite]
                "></div>
                
                {/* Ping Circle */}
                <div className="
                    absolute bottom-1/3 left-10 w-48 h-48
                    border border-cyan-500/10 rounded-full
                    animate-[ping-slow_3s_cubic-bezier(0,0,0.2,1)_infinite]
                "></div>
                
                {/* Grid Background */}
                <div className="
                    absolute inset-0 opacity-20
                    bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),
                         linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)]
                    bg-[size:50px_50px]
                "></div>
                
                {/* Scanline */}
                <div className="
                    absolute top-0 left-0 right-0 h-px
                    bg-gradient-to-b from-transparent via-green-500/50 to-transparent
                    animate-[scan_8s_linear_infinite]
                "></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
                {/* Header */}
                <header className="mb-8">
                    <div className="
                        bg-black/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6
                        border-l-4 border-green-500
                        before:content-[''] before:absolute before:inset-0
                        before:bg-gradient-to-br before:from-transparent before:via-green-500/5 before:to-transparent
                        before:pointer-events-none relative
                    ">
                        <h1 className="
                            text-3xl md:text-4xl font-bold font-mono mb-3
                            flex flex-wrap items-baseline gap-2
                        ">
                            <span className="text-green-500">SYSTEM</span>
                            <span className="text-gray-400">://</span>
                            <span className="text-cyan-500">CONTENT</span>
                            <span className="text-gray-400">_</span>
                            <span className="text-yellow-500">DASHBOARD</span>
                        </h1>
                        <div className="flex items-center gap-3">
                            <div className="
                                w-2 h-2 rounded-full bg-green-500 animate-pulse
                            "></div>
                            <p className="text-sm md:text-base text-gray-300 font-mono">
                                [CONNECTION: <span className="text-green-500 font-bold">ACTIVE</span>] • 
                                USER: <span className="text-cyan-500 font-bold">ADMIN</span> • 
                                CARDS: <span className="text-yellow-500 font-bold">{contentCards.length}</span>
                            </p>
                        </div>
                    </div>
                </header>

                {/* Main Dashboard Content */}
                <main className="space-y-6">
                    {/* Error Display */}
                    {error && (
                        <div className="
                            bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-4
                            border-l-4 border-red-500
                            animate-pulse
                        ">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-red-500 font-mono font-bold">
                                    ERROR://system
                                </span>
                            </div>
                            <div className="text-red-500">
                                <p className="mb-2">{error}</p>
                                <button 
                                    className="
                                        px-4 py-2 border border-red-500/30 rounded text-sm
                                        font-mono text-red-500 bg-transparent
                                        transition-all duration-300 hover:border-red-500 hover:bg-red-500/10
                                    "
                                    onClick={fetchCards}
                                >
                                    RETRY CONNECTION
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Stats Grid */}
                    <StatsGrid stats={getStats()} />

                    {/* Navigation Tabs */}
                    <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />

                    {/* Terminal Output */}
                    <TerminalOutput 
                        title="system_monitor" 
                        messages={terminalMessages}
                        loading={loading}
                    />

                    {/* Create Card Form */}
                    {showCreateForm && (
                        <CreateCardForm 
                            onSubmit={handleCreateCard}
                            onCancel={() => setShowCreateForm(false)}
                        />
                    )}

                    {/* Content Cards Section */}
                    <section className="
                        bg-black/30 backdrop-blur-sm border border-gray-700 rounded-xl p-5 md:p-6
                    ">
                        <div className="
                            flex flex-col md:flex-row md:items-center justify-between
                            gap-4 mb-6 pb-4 border-b border-gray-700/50
                        ">
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                    <div className="flex flex-wrap items-baseline gap-1">
                                        <span className="text-green-500 font-bold font-mono text-lg">ACTIVE</span>
                                        <span className="text-gray-400 font-mono text-lg">_</span>
                                        <span className="text-cyan-500 font-bold font-mono text-lg">CARDS</span>
                                    </div>
                                </div>
                                <div className="
                                    text-xs text-gray-500 bg-black/50 px-3 py-1 rounded-full
                                    font-mono
                                ">
                                    {contentCards.length} SYSTEMS ONLINE
                                </div>
                            </div>
                            
                            <div className="flex gap-2">
                                <button 
                                    className="
                                        px-4 py-2 border border-yellow-500/30 rounded text-sm
                                        font-mono text-yellow-500 bg-transparent
                                        transition-all duration-300 hover:border-yellow-500 hover:bg-yellow-500/10
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                        flex items-center gap-2
                                    "
                                    onClick={fetchCards}
                                    disabled={loading}
                                >
                                    <span className="text-base">⟳</span>
                                    REFRESH
                                </button>
                                <button 
                                    className="
                                        px-4 py-2 border border-cyan-500/30 rounded text-sm
                                        font-mono text-cyan-500 bg-transparent
                                        transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-500/10
                                        flex items-center gap-2
                                    "
                                    onClick={() => setShowCreateForm(true)}
                                >
                                    <span className="text-base">+</span>
                                    DEPLOY NEW
                                </button>
                            </div>
                        </div>

                        {/* Cards Grid */}
                        <div className="mt-4">
                            {loading ? (
                                <div className="text-center py-12">
                                    <div className="flex justify-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-green-500 animate-[bounce_1s_ease-in-out_infinite]"></div>
                                        <div className="w-3 h-3 rounded-full bg-cyan-500 animate-[bounce_1s_ease-in-out_infinite_0.2s]"></div>
                                        <div className="w-3 h-3 rounded-full bg-purple-500 animate-[bounce_1s_ease-in-out_infinite_0.4s]"></div>
                                    </div>
                                    <p className="text-gray-500 font-mono">
                                        INITIALIZING CONTENT CARDS...
                                    </p>
                                </div>
                            ) : contentCards.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-5xl mb-4 opacity-50">🔄</div>
                                    <h3 className="text-xl font-bold font-mono text-gray-300 mb-2">
                                        NO SYSTEMS DETECTED
                                    </h3>
                                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                                        No content cards found in the database. Create your first system to begin monitoring.
                                    </p>
                                    <button 
                                        className="
                                            px-6 py-3 border border-cyan-500/30 rounded
                                            font-mono text-cyan-500 bg-transparent
                                            transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-500/10
                                        "
                                        onClick={() => setShowCreateForm(true)}
                                    >
                                        DEPLOY FIRST SYSTEM
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    {systemCards.map((card) => (
                                        <ContentCard 
                                            key={card.id}
                                            id={card.id}
                                            title={card.title}
                                            description={card.description}
                                            image_url={card.image_url}
                                            hackLevel={card.hackLevel}
                                            status={card.status}
                                            dataSize={card.dataSize}
                                            created_at={card.created_at}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Logs Section */}
                    {logCards.length > 0 && (
                        <section className="
                            bg-black/30 backdrop-blur-sm border border-gray-700 rounded-xl p-5 md:p-6
                        ">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700/50">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                                    <div className="flex flex-wrap items-baseline gap-1">
                                        <span className="text-red-500 font-bold font-mono text-lg">SECURITY</span>
                                        <span className="text-gray-400 font-mono text-lg">_</span>
                                        <span className="text-cyan-500 font-bold font-mono text-lg">LOGS</span>
                                    </div>
                                </div>
                                <div className="
                                    text-xs text-gray-500 bg-black/50 px-3 py-1 rounded-full
                                    font-mono
                                ">
                                    {logCards.length} RECENT EVENTS
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {logCards.map((card) => (
                                    <ContentCard 
                                        key={`log-${card.id}`}
                                        id={card.id}
                                        title={card.title}
                                        description={card.description}
                                        image_url={card.image_url}
                                        hackLevel={card.hackLevel}
                                        status={card.status}
                                        dataSize={card.dataSize}
                                        created_at={card.created_at}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Quick Actions */}
                    <QuickActions actions={quickActions} />
                </main>

                {/* Footer */}
                <footer className="
                    mt-8 pt-6 border-t border-gray-700/50
                ">
                    <div className="
                        flex flex-col md:flex-row items-center justify-between gap-4
                        text-sm text-gray-500 font-mono
                    ">
                        <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
                            <span className="flex items-center gap-1">
                                SESSION_ID: <span className="text-cyan-500 font-bold">
                                    {Math.random().toString(36).substr(2, 9).toUpperCase()}
                                </span>
                            </span>
                            <span className="hidden md:inline text-gray-700">|</span>
                            <span className="flex items-center gap-1">
                                UPTIME: <span className="text-green-500 font-bold">99.9%</span>
                            </span>
                            <span className="hidden md:inline text-gray-700">|</span>
                            <span className="flex items-center gap-1">
                                API_STATUS: <span className="text-green-500 font-bold">● LIVE</span>
                            </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 justify-center md:justify-end">
                            <span className="flex items-center gap-1">
                                <span className="text-green-500 font-bold">ENCRYPTION</span>
                                <span className="text-gray-400">: AES-256 ACTIVE</span>
                            </span>
                            <span className="hidden md:inline text-gray-700">•</span>
                            <span className="flex items-center gap-1">
                                <span className="text-yellow-500 font-bold">VERSION</span>
                                <span className="text-gray-400">: 2.0.1</span>
                            </span>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Add Custom Animations */}
            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                @keyframes ping-slow {
                    75%, 100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                
                @keyframes scan {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100vh); }
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;