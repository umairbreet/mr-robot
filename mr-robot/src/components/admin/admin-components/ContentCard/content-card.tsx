import React from 'react';

interface ContentCardProps {
    id?: number;
    title: string;
    description?: string;
    image_url?: string;
    hackLevel?: number;
    status?: 'active' | 'breached' | 'secure' | 'critical';
    dataSize?: string;
    created_at?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
    id,
    title, 
    description, 
    image_url, 
    hackLevel = 5,
    status = 'secure',
    dataSize = '0MB',
    created_at
}) => {
    // Define all styles directly
    const statusConfig = {
        active: {
            border: 'border-hacker-cyan',
            bgGradient: 'bg-gradient-to-br from-black/30 to-hacker-cyan/10',
            text: 'text-hacker-cyan',
            color: '#06b6d4',
            badge: 'text-hacker-cyan',
            barColor: '#06b6d4'
        },
        breached: {
            border: 'border-hacker-yellow',
            bgGradient: 'bg-gradient-to-br from-black/30 to-hacker-yellow/10',
            text: 'text-hacker-yellow',
            color: '#f59e0b',
            badge: 'text-hacker-yellow',
            barColor: '#f59e0b'
        },
        secure: {
            border: 'border-hacker-green',
            bgGradient: 'bg-gradient-to-br from-black/30 to-hacker-green/10',
            text: 'text-hacker-green',
            color: '#10b981',
            badge: 'text-hacker-green',
            barColor: '#10b981'
        },
        critical: {
            border: 'border-hacker-red',
            bgGradient: 'bg-gradient-to-br from-black/30 to-hacker-red/10',
            text: 'text-hacker-red',
            color: '#ef4444',
            badge: 'text-hacker-red',
            barColor: '#ef4444'
        }
    };

    const currentStatus = statusConfig[status];
    const securityLevelColor = hackLevel > 7 ? '#10b981' : hackLevel > 4 ? '#f59e0b' : '#ef4444';
    const securityLevelText = hackLevel > 7 ? 'HIGH' : hackLevel > 4 ? 'MEDIUM' : 'LOW';
    const hackLevelBars = Array.from({ length: 10 }, (_, i) => i < hackLevel);

    const formattedDate = created_at 
        ? new Date(created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : null;

    return (
        <div className={`
            relative overflow-hidden flex flex-col h-full
            bg-black/30 backdrop-blur-sm rounded-lg p-4
            transition-all duration-300 hover:-translate-y-1
            hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]
            ${currentStatus.border} ${currentStatus.bgGradient}
            border
            before:content-[''] before:absolute before:top-0 before:-left-full 
            before:w-full before:h-full 
            before:bg-gradient-to-r before:from-transparent before:via-hacker-green/10 before:to-transparent
            before:transition-[left] before:duration-500
            hover:before:left-full
        `}>
            {/* Card Header */}
            <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                    <div 
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: currentStatus.color }}
                    ></div>
                    <span className="text-xs font-mono text-hacker-gray tracking-wide">
                        {id ? `SYSTEM_${id}` : 'NEW_SYSTEM'}
                    </span>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-bold uppercase font-mono bg-black/50 ${currentStatus.badge}`}>
                    {status.toUpperCase()}
                </div>
            </div>

            {/* Card Title */}
            <h3 className="text-lg font-bold font-mono my-2 leading-tight text-hacker-green">
                <span className="text-hacker-gray mr-1">$</span> {title}
            </h3>

            {/* Creation Date */}
            {formattedDate && (
                <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-[10px] font-mono uppercase text-hacker-gray">
                        DEPLOYED:
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-gray-300 bg-black/30">
                        {formattedDate}
                    </span>
                </div>
            )}

            {/* Description */}
            {description && (
                <div className="mb-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-hacker-cyan"></div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-hacker-cyan">
                            DESCRIPTION
                        </span>
                    </div>
                    <p className="font-mono text-sm leading-relaxed m-0 pl-4 text-gray-300 border-l-2 border-hacker-cyan/30">
                        {description}
                    </p>
                </div>
            )}

            {/* Image */}
            {image_url && (
                <div className="relative mb-4 rounded overflow-hidden h-40">
                    <img 
                        src={image_url} 
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
            )}

            {/* Security Level */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-hacker-gray">
                        SECURITY LEVEL
                    </span>
                    <span className="text-[11px] font-mono font-bold text-hacker-green">
                        {hackLevel}/10
                    </span>
                </div>
                <div className="flex gap-0.5 h-1.5 mb-1">
                    {hackLevelBars.map((filled, index) => (
                        <div 
                            key={index}
                            className={`flex-1 rounded-sm transition-all duration-300 ${
                                filled 
                                    ? index < 3 ? 'bg-hacker-red' 
                                    : index < 7 ? 'bg-hacker-yellow' 
                                    : 'bg-hacker-green'
                                    : 'bg-gray-900'
                            }`}
                        />
                    ))}
                </div>
                <div className="flex justify-between text-[9px]">
                    <span className="text-hacker-red">LOW</span>
                    <span className="text-hacker-yellow">MEDIUM</span>
                    <span className="text-hacker-green">HIGH</span>
                </div>
            </div>

            {/* Data Size */}
            <div className="mb-3">
                <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-hacker-gray">
                        DATA STORAGE
                    </span>
                    <span className="text-[11px] font-mono font-bold text-hacker-purple">
                        {dataSize}
                    </span>
                </div>
                <div className="h-1 rounded overflow-hidden mt-1 bg-black/30">
                    <div 
                        className="h-full rounded transition-all duration-300"
                        style={{ 
                            width: `${Math.min((hackLevel || 5) * 10, 100)}%`,
                            background: `linear-gradient(90deg, ${currentStatus.color}30, ${currentStatus.color})`
                        }}
                    ></div>
                </div>
            </div>

            {/* System Info */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between sm:justify-start gap-4 w-full">
                    <div className="flex items-center gap-1.5">
                        <div 
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: currentStatus.color }}
                        ></div>
                        <span className="text-[10px] font-mono text-hacker-gray">
                            STATUS:
                        </span>
                        <span className="text-[10px] font-mono font-bold text-gray-300">
                            {status}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div 
                            className="w-1.5 h-1.5 rounded-full animate-pulse"
                            style={{ backgroundColor: securityLevelColor }}
                        ></div>
                        <span className="text-[10px] font-mono text-hacker-gray">
                            SECURITY:
                        </span>
                        <span className="text-[10px] font-mono font-bold text-gray-300">
                            {securityLevelText}
                        </span>
                    </div>
                </div>
            </div>

            {/* Terminal Footer */}
            <div className="mt-auto">
                <div className="font-mono text-sm mb-3 text-hacker-green">
                    <span className="mr-1">root@{title.toLowerCase().replace(/\s+/g, '-')}:~$</span>
                    <span className="animate-pulse text-hacker-gray">▋</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <button className="
                        flex-1 px-3 py-2 sm:py-1.5 rounded text-xs sm:text-[11px] 
                        font-mono cursor-pointer transition-all duration-200
                        border border-hacker-green/30 text-hacker-green bg-transparent
                        hover:bg-hacker-green/10 hover:border-hacker-green
                    ">
                        ANALYZE
                    </button>
                    <button className="
                        flex-1 px-3 py-2 sm:py-1.5 rounded text-xs sm:text-[11px] 
                        font-mono cursor-pointer transition-all duration-200
                        border border-hacker-cyan/30 text-hacker-cyan bg-transparent
                        hover:bg-hacker-cyan/10 hover:border-hacker-cyan
                    ">
                        MONITOR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContentCard;