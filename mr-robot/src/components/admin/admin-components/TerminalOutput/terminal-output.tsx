import React from 'react';

interface TerminalMessage {
    text: string;
    color: string;
}

interface TerminalOutputProps {
    title?: string;
    messages: TerminalMessage[];
    loading?: boolean;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ 
    title = "terminal", 
    messages, 
    loading = false 
}) => {
    // Map color strings to Tailwind classes
    const getColorClass = (color: string) => {
        const colorMap: { [key: string]: string } = {
            '#10b981': 'text-green-500',
            '#06b6d4': 'text-cyan-500',
            '#ef4444': 'text-red-500',
            '#f59e0b': 'text-yellow-500',
            '#8b5cf6': 'text-purple-500',
            '#d1d5db': 'text-gray-300',
            '#6b7280': 'text-gray-500',
        };
        
        return colorMap[color] || 'text-gray-300';
    };

    return (
        <div className="
            relative bg-black/40 backdrop-blur-sm border border-gray-700 
            rounded-xl overflow-hidden font-mono
            group/terminal
            before:content-[''] before:absolute before:inset-0
            before:bg-gradient-to-br before:from-transparent before:via-green-500/5 before:to-transparent
            before:pointer-events-none
            animate-[glitch-subtle_5s_ease-in-out_infinite]
        ">
            {/* CRT Scanline Effect */}
            <div className="
                absolute inset-0 opacity-10 pointer-events-none
                bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,0,0.1)_50%)]
                bg-[size:100%_4px] animate-[scan_8s_linear_infinite]
                z-10
            "></div>
            
            {/* Vignette Effect */}
            <div className="
                absolute inset-0 pointer-events-none
                bg-radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_70%)
                z-10
            "></div>
            
            {/* Terminal Header */}
            <div className="
                relative flex items-center gap-3 px-4 py-3
                bg-gradient-to-r from-gray-900/80 to-black/80
                border-b border-gray-700/50 backdrop-blur-sm
                z-20
            ">
                {/* Terminal Dots */}
                <div className="flex items-center gap-1.5">
                    <div className="
                        w-3 h-3 rounded-full bg-red-500
                        group-hover/terminal:animate-pulse
                        transition-all duration-300
                    "></div>
                    <div className="
                        w-3 h-3 rounded-full bg-yellow-500
                        group-hover/terminal:animate-pulse
                        group-hover/terminal:animation-delay-100
                        transition-all duration-300
                    "></div>
                    <div className="
                        w-3 h-3 rounded-full bg-green-500
                        group-hover/terminal:animate-pulse
                        group-hover/terminal:animation-delay-200
                        transition-all duration-300
                    "></div>
                </div>
                
                {/* Terminal Title */}
                <span className="
                    text-sm text-gray-400 tracking-wider
                    flex items-center gap-1
                ">
                    <span className="text-green-500">terminal</span>
                    <span className="text-gray-600">://</span>
                    <span className="text-cyan-500">{title}</span>
                </span>
                
                {/* Connection Status */}
                <div className="ml-auto flex items-center gap-2">
                    <div className="
                        w-2 h-2 rounded-full bg-green-500
                        animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]
                    "></div>
                    <span className="text-xs text-gray-500">
                        <span className="text-green-500 font-bold">CONNECTED</span>
                    </span>
                </div>
                
                {/* Header Glow Line */}
                <div className="
                    absolute bottom-0 left-0 right-0 h-px
                    bg-gradient-to-r from-transparent via-green-500/30 to-transparent
                "></div>
            </div>
            
            {/* Terminal Content */}
            <div className="relative p-4 md:p-5 z-20">
                {/* Initial Command Line */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="
                        text-green-500 font-bold text-sm
                        bg-black/30 px-2 py-1 rounded
                        animate-[glow_2s_ease-in-out_infinite]
                    ">
                        $
                    </span>
                    <span className="text-gray-300 text-sm">
                        system_status --all --verbose
                    </span>
                </div>
                
                {/* Terminal Output */}
                <div className="ml-4 space-y-2">
                    {messages.map((message, index) => (
                        <div 
                            key={index}
                            className={`
                                flex items-start gap-2 text-sm leading-relaxed
                                animate-[typewriter_0.5s_ease-out_forwards]
                                opacity-0
                                ${getColorClass(message.color)}
                            `}
                            style={{ 
                                animationDelay: `${index * 100}ms`,
                                animationFillMode: 'forwards'
                            }}
                        >
                            {/* Line Number */}
                            <span className="
                                text-gray-600 text-xs w-6 flex-shrink-0
                                font-mono select-none
                            ">
                                [{String(index + 1).padStart(2, '0')}]
                            </span>
                            
                            {/* Message Content */}
                            <span className="flex-1">
                                {message.text}
                            </span>
                            
                            {/* Timestamp */}
                            <span className="
                                text-gray-600 text-xs flex-shrink-0
                                font-mono ml-2 opacity-0 group-hover/terminal:opacity-100
                                transition-opacity duration-300
                            ">
                                {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                        </div>
                    ))}
                    
                    {/* Loading Animation */}
                    {loading && (
                        <div className="
                            flex items-center gap-2 text-yellow-500 text-sm
                            animate-[pulse_1.5s_ease-in-out_infinite]
                        ">
                            <span className="
                                w-2 h-2 rounded-full bg-yellow-500
                                animate-[bounce_1s_ease-in-out_infinite]
                            "></span>
                            <span className="
                                w-2 h-2 rounded-full bg-yellow-500
                                animate-[bounce_1s_ease-in-out_infinite_0.2s]
                            "></span>
                            <span className="
                                w-2 h-2 rounded-full bg-yellow-500
                                animate-[bounce_1s_ease-in-out_infinite_0.4s]
                            "></span>
                            <span className="ml-2">Processing system data...</span>
                        </div>
                    )}
                    
                    {/* Input Prompt */}
                    <div className="
                        flex items-center gap-2 mt-4 pt-3 border-t border-gray-700/30
                        group-hover/terminal:border-green-500/30
                        transition-colors duration-300
                    ">
                        <div className="relative">
                            <span className="
                                text-green-500 font-bold text-sm
                                bg-black/30 px-2 py-1 rounded
                                group-hover/terminal:shadow-[0_0_10px_rgba(16,185,129,0.3)]
                                transition-shadow duration-300
                            ">
                                root@system:~$
                            </span>
                            {/* Prompt Glow */}
                            <div className="
                                absolute inset-0 rounded bg-green-500/20 blur-sm
                                opacity-0 group-hover/terminal:opacity-100
                                transition-opacity duration-300
                            "></div>
                        </div>
                        
                        {/* Cursor */}
                        <div className="relative">
                            <span className="
                                text-gray-300 text-sm font-bold
                                animate-[blink_1s_step-end_infinite]
                            ">
                                ▋
                            </span>
                            {/* Cursor Glow */}
                            <div className="
                                absolute inset-0 text-green-500/50 blur-sm
                                animate-[blink_1s_step-end_infinite]
                                opacity-50
                            ">
                                ▋
                            </div>
                        </div>
                        
                        {/* Fake Input Text (appears on hover) */}
                        <span className="
                            text-gray-500 text-sm opacity-0
                            group-hover/terminal:opacity-100 group-hover/terminal:text-gray-400
                            transition-all duration-500
                            truncate
                        ">
                            Type 'help' for commands, 'clear' to reset
                        </span>
                    </div>
                </div>
                
                {/* Terminal Footer */}
                <div className="
                    mt-6 pt-3 border-t border-gray-700/30
                    flex items-center justify-between text-xs text-gray-500
                ">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <div className="
                                w-1.5 h-1.5 rounded-full bg-green-500
                                animate-[pulse_2s_ease-in-out_infinite]
                            "></div>
                            <span>LINES: {messages.length}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="
                                w-1.5 h-1.5 rounded-full bg-cyan-500
                                animate-[pulse_2s_ease-in-out_infinite_0.3s]
                            "></div>
                            <span>MEM: 84%</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <span>READY</span>
                        <div className="
                            w-1.5 h-1.5 rounded-full bg-green-500
                            animate-pulse
                        "></div>
                    </div>
                </div>
            </div>
            
            {/* Terminal Corner Accents */}
            <div className="
                absolute top-0 left-0 w-4 h-4 
                border-t-2 border-l-2 border-green-500/50 rounded-tl
                opacity-30 group-hover/terminal:opacity-70
                transition-opacity duration-500
            "></div>
            <div className="
                absolute top-0 right-0 w-4 h-4 
                border-t-2 border-r-2 border-green-500/50 rounded-tr
                opacity-30 group-hover/terminal:opacity-70
                transition-opacity duration-500
            "></div>
            <div className="
                absolute bottom-0 left-0 w-4 h-4 
                border-b-2 border-l-2 border-green-500/50 rounded-bl
                opacity-30 group-hover/terminal:opacity-70
                transition-opacity duration-500
            "></div>
            <div className="
                absolute bottom-0 right-0 w-4 h-4 
                border-b-2 border-r-2 border-green-500/50 rounded-br
                opacity-30 group-hover/terminal:opacity-70
                transition-opacity duration-500
            "></div>
            
            {/* Matrix-like Code Rain (Subtle Background) */}
            <div className="
                absolute inset-0 opacity-5 pointer-events-none
                bg-[linear-gradient(transparent_95%,rgba(0,255,0,0.1)_100%)]
                bg-[size:100%_20px]
                animate-[matrix-rain_20s_linear_infinite]
            "></div>
            
            {/* Add custom animations */}
            <style>{`
                @keyframes typewriter {
                    from {
                        opacity: 0;
                        transform: translateY(5px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                
                @keyframes scan {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 0% 100%; }
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
                
                @keyframes glow {
                    0%, 100% { text-shadow: 0 0 5px currentColor; }
                    50% { text-shadow: 0 0 15px currentColor, 0 0 20px currentColor; }
                }
                
                @keyframes matrix-rain {
                    0% { background-position: 0% 0%; }
                    100% { background-position: 0% 100%; }
                }
                
                @keyframes glitch-subtle {
                    0%, 100% { transform: translateX(0); }
                    95% { transform: translateX(0); }
                    96% { transform: translateX(-1px); }
                    97% { transform: translateX(1px); }
                    98% { transform: translateX(-1px); }
                    99% { transform: translateX(1px); }
                }
            `}</style>
        </div>
    );
};

export default TerminalOutput;