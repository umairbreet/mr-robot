import React from 'react';

interface StatItem {
    label: string;
    value: string;
    color: string;
    icon: string;
}

interface StatsGridProps {
    stats: StatItem[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
    // Map color strings to Tailwind classes
    const getColorClasses = (color: string) => {
        const colorMap: { [key: string]: { text: string; bg: string; border: string } } = {
            '#10b981': {
                text: 'text-green-500',
                bg: 'bg-green-500',
                border: 'border-green-500'
            },
            '#06b6d4': {
                text: 'text-cyan-500',
                bg: 'bg-cyan-500',
                border: 'border-cyan-500'
            },
            '#ef4444': {
                text: 'text-red-500',
                bg: 'bg-red-500',
                border: 'border-red-500'
            },
            '#f59e0b': {
                text: 'text-yellow-500',
                bg: 'bg-yellow-500',
                border: 'border-yellow-500'
            },
            '#8b5cf6': {
                text: 'text-purple-500',
                bg: 'bg-purple-500',
                border: 'border-purple-500'
            }
        };
        
        return colorMap[color] || {
            text: 'text-gray-500',
            bg: 'bg-gray-500',
            border: 'border-gray-500'
        };
    };

    // Calculate progress width with animations
    const getProgressWidth = (stat: StatItem) => {
        if (stat.label.includes('CARDS')) {
            const count = parseInt(stat.value) || 0;
            return Math.min((count / 50) * 100, 100);
        }
        if (stat.label.includes('ALERTS')) {
            const count = parseInt(stat.value) || 0;
            return Math.min((count / 10) * 100, 100);
        }
        if (stat.label.includes('DATA')) {
            const num = parseFloat(stat.value) || 0;
            return Math.min((num / 100) * 100, 100);
        }
        if (stat.label.includes('SECURITY')) {
            const level = parseFloat(stat.value) || 0;
            return (level / 10) * 100;
        }
        return Math.random() * 60 + 40;
    };

    // Get trend icon
    const getTrendIcon = (label: string) => {
        if (label.includes('CARDS')) return '↗';
        if (label.includes('ALERTS')) return '⚠';
        if (label.includes('DATA')) return '↑';
        return '→';
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => {
                const colorClasses = getColorClasses(stat.color);
                const progressWidth = getProgressWidth(stat);
                const trendIcon = getTrendIcon(stat.label);

                return (
                    <div
                        key={index}
                        className={`
                            relative group bg-black/30 backdrop-blur-sm
                            border border-gray-700 rounded-xl p-5
                            transition-all duration-500 ease-out
                            hover:scale-[1.02] hover:shadow-2xl
                            overflow-hidden
                            before:content-[''] before:absolute before:inset-0
                            before:bg-gradient-to-br before:from-transparent before:via-${colorClasses.bg.replace('bg-', '')}/5 before:to-transparent
                            before:opacity-0 before:transition-opacity before:duration-500
                            group-hover:before:opacity-100
                            ${colorClasses.border} border-l-4
                        `}
                    >
                        {/* Animated Background */}
                        <div className="
                            absolute inset-0 opacity-5
                            bg-[linear-gradient(45deg,transparent_48%,rgba(0,255,0,0.1)_50%,transparent_52%)]
                            bg-[size:30px_30px] animate-[scan_20s_linear_infinite]
                        "></div>
                        
                        {/* Header */}
                        <div className="relative flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                {/* Animated Icon Container */}
                                <div className="relative">
                                    <div className={`
                                        relative w-12 h-12 rounded-xl
                                        bg-gradient-to-br from-black/50 to-${colorClasses.bg.replace('bg-', '')}/20
                                        border border-${colorClasses.border.replace('border-', '')}/30
                                        flex items-center justify-center
                                        group-hover:scale-110
                                        transition-transform duration-500
                                    `}>
                                        {/* Icon Glow */}
                                        <div className={`
                                            absolute inset-0 rounded-xl
                                            bg-${colorClasses.bg.replace('bg-', '')}/20 blur-md
                                            opacity-0 group-hover:opacity-100
                                            transition-opacity duration-500
                                        `}></div>
                                        
                                        {/* Icon */}
                                        <span className={`
                                            text-xl relative z-10
                                            group-hover:scale-125
                                            transition-transform duration-300
                                            ${colorClasses.text}
                                        `}>
                                            {stat.icon}
                                        </span>
                                        
                                        {/* Pulsing Ring */}
                                        <div className={`
                                            absolute -inset-2 rounded-2xl border-2 border-${colorClasses.border.replace('border-', '')}/30
                                            animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]
                                        `}></div>
                                    </div>
                                    
                                    {/* Floating Particle */}
                                    <div className={`
                                        absolute -top-1 -right-1 w-3 h-3 rounded-full
                                        bg-${colorClasses.bg.replace('bg-', '')}
                                        opacity-0 group-hover:opacity-100
                                        transition-opacity duration-500
                                        animate-[float_3s_ease-in-out_infinite]
                                    `}></div>
                                </div>
                                
                                {/* Label & Value */}
                                <div className="flex flex-col">
                                    <span className="
                                        text-xs font-mono uppercase tracking-wider text-gray-500
                                        group-hover:text-gray-400
                                        transition-colors duration-300
                                    ">
                                        {stat.label}
                                    </span>
                                    <span className={`
                                        text-2xl font-bold font-mono mt-1
                                        ${colorClasses.text}
                                        group-hover:text-white
                                        transition-colors duration-300
                                    `}>
                                        {stat.value}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Index Badge */}
                            <div className={`
                                absolute top-3 right-3 w-6 h-6 rounded-full
                                bg-gradient-to-br from-${colorClasses.bg.replace('bg-', '')} to-${colorClasses.bg.replace('bg-', '')}/70
                                flex items-center justify-center opacity-0
                                group-hover:opacity-100
                                transition-opacity duration-500
                            `}>
                                <span className="text-xs font-bold font-mono text-black">
                                    {index + 1}
                                </span>
                            </div>
                        </div>
                        
                        {/* Animated Progress Bar */}
                        <div className="relative mb-3">
                            <div className="
                                h-2 bg-black/30 rounded-full overflow-hidden
                                relative before:content-[''] before:absolute before:inset-0
                                before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent
                                before:animate-[shimmer_2s_linear_infinite]
                            ">
                                {/* Progress Bar */}
                                <div
                                    className={`
                                        h-full rounded-full transition-all duration-1000 ease-out
                                        bg-gradient-to-r from-${colorClasses.bg.replace('bg-', '')} to-${colorClasses.bg.replace('bg-', '')}/80
                                        relative overflow-hidden
                                        after:content-[''] after:absolute after:inset-0
                                        after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent
                                        after:animate-[shimmer_1s_linear_infinite]
                                    `}
                                    style={{ width: `${progressWidth}%` }}
                                >
                                    {/* Progress Dots */}
                                    <div className="
                                        absolute inset-0
                                        bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3)_1px,_transparent_1px)]
                                        bg-[size:10px_10px] opacity-30
                                    "></div>
                                </div>
                            </div>
                            
                            {/* Progress Percentage */}
                            <div className="
                                absolute -top-6 right-0 text-xs font-mono font-bold
                                bg-black/50 px-2 py-1 rounded
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-300
                            ">
                                <span className={colorClasses.text}>
                                    {Math.round(progressWidth)}%
                                </span>
                            </div>
                        </div>
                        
                        {/* Footer with Trend & Status */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
                            {/* Trend Indicator */}
                            <div className="flex items-center gap-2">
                                <div className={`
                                    w-8 h-8 rounded-lg
                                    bg-gradient-to-br from-${colorClasses.bg.replace('bg-', '')}/20 to-${colorClasses.bg.replace('bg-', '')}/10
                                    border border-${colorClasses.border.replace('border-', '')}/30
                                    flex items-center justify-center
                                    group-hover:scale-110
                                    transition-transform duration-300
                                `}>
                                    <span className={`
                                        text-lg font-bold ${colorClasses.text}
                                        group-hover:animate-pulse
                                    `}>
                                        {trendIcon}
                                    </span>
                                </div>
                                <span className="text-xs font-mono text-gray-500">
                                    {stat.label.includes('CARDS') ? 'Growing' : 
                                     stat.label.includes('ALERTS') ? 'Alert' : 
                                     stat.label.includes('DATA') ? 'Increasing' : 'Stable'}
                                </span>
                            </div>
                            
                            {/* Live Status */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <div className={`
                                        w-2 h-2 rounded-full ${colorClasses.bg}
                                        animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]
                                    `}></div>
                                    <div className={`
                                        w-2 h-2 rounded-full ${colorClasses.bg}
                                        animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite_0.2s]
                                    `}></div>
                                    <div className={`
                                        w-2 h-2 rounded-full ${colorClasses.bg}
                                        animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite_0.4s]
                                    `}></div>
                                </div>
                                <span className="
                                    text-xs font-mono font-bold px-2 py-1 rounded
                                    bg-black/50 border border-gray-700
                                ">
                                    <span className="text-gray-400">STATUS: </span>
                                    <span className={colorClasses.text}>LIVE</span>
                                </span>
                            </div>
                        </div>
                        
                        {/* Corner Accents */}
                        <div className={`
                            absolute top-0 left-0 w-3 h-3 
                            border-t border-l border-${colorClasses.border.replace('border-', '')}/50 rounded-tl
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300
                        `}></div>
                        <div className={`
                            absolute top-0 right-0 w-3 h-3 
                            border-t border-r border-${colorClasses.border.replace('border-', '')}/50 rounded-tr
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300
                        `}></div>
                        <div className={`
                            absolute bottom-0 left-0 w-3 h-3 
                            border-b border-l border-${colorClasses.border.replace('border-', '')}/50 rounded-bl
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300
                        `}></div>
                        <div className={`
                            absolute bottom-0 right-0 w-3 h-3 
                            border-b border-r border-${colorClasses.border.replace('border-', '')}/50 rounded-br
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300
                        `}></div>
                        
                        {/* Hover Effect Line */}
                        <div className={`
                            absolute bottom-0 left-1/4 right-1/4 h-px
                            bg-gradient-to-r from-transparent via-${colorClasses.border.replace('border-', '')} to-transparent
                            opacity-0 group-hover:opacity-50
                            transition-opacity duration-500
                        `}></div>
                    </div>
                );
            })}
            
            {/* Add custom animations to global styles via JS */}
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-10px) translateX(5px); }
                }
                
                @keyframes scan {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 100px 100px; }
                }
            `}</style>
        </div>
    );
};

export default StatsGrid;