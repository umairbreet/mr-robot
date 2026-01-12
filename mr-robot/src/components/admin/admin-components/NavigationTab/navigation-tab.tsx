import React from 'react';

interface NavigationTabsProps {
    activeTab: 'overview' | 'systems' | 'data' | 'logs';
    onTabChange: (tab: 'overview' | 'systems' | 'data' | 'logs') => void;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'overview', label: 'OVERVIEW', icon: '📊', color: 'from-green-500/10 to-cyan-500/10', border: 'border-green-500' },
        { id: 'systems', label: 'SYSTEMS', icon: '🖥️', color: 'from-cyan-500/10 to-purple-500/10', border: 'border-cyan-500' },
        { id: 'data', label: 'DATA', icon: '💾', color: 'from-purple-500/10 to-pink-500/10', border: 'border-purple-500' },
        { id: 'logs', label: 'LOGS', icon: '📋', color: 'from-red-500/10 to-orange-500/10', border: 'border-red-500' }
    ] as const;

    const activeTabConfig = tabs.find(tab => tab.id === activeTab);

    return (
        <div className="
            relative bg-black/30 backdrop-blur-sm border border-gray-700 
            rounded-lg p-2 mb-6 overflow-hidden
            before:content-[''] before:absolute before:inset-0 
            before:bg-gradient-to-r before:from-transparent before:via-green-500/5 before:to-transparent
            before:pointer-events-none
        ">
            {/* Animated Background */}
            <div className="
                absolute inset-0 opacity-20
                bg-[linear-gradient(90deg,transparent_50%,rgba(0,255,0,0.1)_50%)]
                bg-[length:100px_100px] animate-[scan_10s_linear_infinite]
            "></div>

            {/* Tabs Container */}
            <div className="relative flex flex-col sm:flex-row gap-1 z-10">
                {tabs.map(tab => {
                    const isActive = activeTab === tab.id;
                    
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`
                                relative group flex-1 min-w-0 px-4 py-3 rounded-md
                                font-mono text-sm font-bold uppercase tracking-wider
                                transition-all duration-300 ease-out
                                border border-transparent
                                overflow-hidden
                                ${isActive 
                                    ? `text-white ${tab.color} bg-gradient-to-br shadow-lg ${tab.border} border` 
                                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/30'
                                }
                                before:content-[''] before:absolute before:inset-0 
                                before:bg-gradient-to-r before:from-transparent before:via-green-500/10 before:to-transparent
                                before:translate-x-[-100%] before:transition-transform before:duration-500
                                hover:before:translate-x-[100%]
                            `}
                        >
                            {/* Tab Content */}
                            <div className="relative flex items-center justify-center sm:justify-start gap-2 z-10">
                                <span className={`
                                    text-lg transition-all duration-300
                                    ${isActive ? 'animate-bounce' : 'group-hover:scale-110'}
                                `}>
                                    {tab.icon}
                                </span>
                                <span className="hidden sm:inline">
                                    <span className="text-gray-600">$ </span>
                                    {tab.label}
                                </span>
                            </div>

                            {/* Active Indicator */}
                            {isActive && (
                                <>
                                    <div className="
                                        absolute bottom-0 left-1/2 transform -translate-x-1/2
                                        w-1/2 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent
                                        rounded-full
                                    "></div>
                                    <div className="
                                        absolute -bottom-1 left-1/2 transform -translate-x-1/2
                                        w-2 h-2 bg-green-500 rounded-full animate-pulse
                                        shadow-[0_0_10px_rgba(16,185,129,0.5)]
                                    "></div>
                                </>
                            )}

                            {/* Hover Glow */}
                            <div className="
                                absolute inset-0 opacity-0 group-hover:opacity-100
                                bg-gradient-to-r from-transparent via-green-500/5 to-transparent
                                transition-opacity duration-300
                            "></div>
                        </button>
                    );
                })}
            </div>

            {/* Status Bar */}
            <div className="
                relative mt-4 pt-3 border-t border-gray-700/50
                flex items-center justify-between
            ">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <div className="
                            w-2 h-2 rounded-full bg-green-500 
                            animate-[pulse_2s_ease-in-out_infinite]
                            shadow-[0_0_10px_rgba(16,185,129,0.5)]
                        "></div>
                        <div className="
                            w-2 h-2 rounded-full bg-cyan-500 
                            animate-[pulse_2s_ease-in-out_infinite_0.2s]
                            shadow-[0_0_10px_rgba(6,182,212,0.5)]
                        "></div>
                        <div className="
                            w-2 h-2 rounded-full bg-purple-500 
                            animate-[pulse_2s_ease-in-out_infinite_0.4s]
                            shadow-[0_0_10px_rgba(139,92,246,0.5)]
                        "></div>
                    </div>
                    <span className="text-xs font-mono text-gray-500">
                        STATUS: <span className="text-green-500 font-bold">ACTIVE</span>
                    </span>
                </div>

                {/* Active Tab Display */}
                <div className="flex items-center gap-2">
                    <div className="
                        px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm
                        border border-gray-700
                    ">
                        <span className="text-xs font-mono text-gray-400">
                            ACTIVE TAB: 
                        </span>
                        <span className={`
                            text-xs font-mono font-bold ml-1
                            ${activeTabConfig?.border.replace('border-', 'text-')}
                        `}>
                            {activeTab.toUpperCase()}
                        </span>
                    </div>
                    
                    {/* Connection Indicator */}
                    <div className="flex items-center gap-1">
                        <div className="
                            w-2 h-2 rounded-full bg-green-500 
                            animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]
                        "></div>
                        <span className="text-xs font-mono text-gray-500">
                            LIVE
                        </span>
                    </div>
                </div>
            </div>

            {/* Terminal Style Bottom Border */}
            <div className="
                absolute bottom-0 left-0 right-0 h-px
                bg-gradient-to-r from-transparent via-green-500 to-transparent
                opacity-30
            "></div>

            {/* Corner Accents */}
            <div className="
                absolute top-0 left-0 w-2 h-2 
                border-t border-l border-green-500/50 rounded-tl
            "></div>
            <div className="
                absolute top-0 right-0 w-2 h-2 
                border-t border-r border-green-500/50 rounded-tr
            "></div>
            <div className="
                absolute bottom-0 left-0 w-2 h-2 
                border-b border-l border-green-500/50 rounded-bl
            "></div>
            <div className="
                absolute bottom-0 right-0 w-2 h-2 
                border-b border-r border-green-500/50 rounded-br
            "></div>
        </div>
    );
};

export default NavigationTabs;