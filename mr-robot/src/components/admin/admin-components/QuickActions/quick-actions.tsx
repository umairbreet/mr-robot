import React from 'react';

interface ActionItem {
    label: string;
    desc: string;
    color: string;
    icon: string;
    action: () => void;
}

interface QuickActionsProps {
    actions: ActionItem[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
    // Map color strings to Tailwind classes
    const getColorClasses = (color: string) => {
        const colorMap: { [key: string]: string } = {
            '#10b981': 'green-500',
            '#06b6d4': 'cyan-500',
            '#ef4444': 'red-500',
            '#f59e0b': 'yellow-500',
            '#8b5cf6': 'purple-500',
        };
        
        return colorMap[color] || 'gray-500';
    };

    return (
        <div className="
            relative bg-black/30 backdrop-blur-sm border border-gray-700 
            rounded-xl p-6 overflow-hidden
            before:content-[''] before:absolute before:inset-0
            before:bg-gradient-to-br before:from-transparent before:via-green-500/5 before:to-transparent
            before:pointer-events-none
            group
        ">
            {/* Animated Background Pattern */}
            <div className="
                absolute inset-0 opacity-10
                bg-[linear-gradient(45deg,transparent_48%,rgba(0,255,0,0.1)_50%,transparent_52%)]
                bg-[size:20px_20px] animate-[scan_15s_linear_infinite]
            "></div>
            
            {/* Header */}
            <div className="relative mb-8 pb-4 border-b border-gray-700/50">
                <div className="flex items-center gap-3 mb-2">
                    <div className="
                        relative w-6 h-6 rounded-full bg-green-500/20
                        flex items-center justify-center
                    ">
                        <div className="
                            w-3 h-3 rounded-full bg-green-500 
                            animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]
                        "></div>
                        <div className="
                            absolute inset-0 rounded-full bg-green-500/30
                            animate-[pulse_2s_ease-in-out_infinite]
                        "></div>
                    </div>
                    <h2 className="
                        text-xl font-bold font-mono text-green-500
                        tracking-wider uppercase
                        bg-gradient-to-r from-green-500 to-cyan-500 bg-clip-text text-transparent
                    ">
                        QUICK_ACTIONS
                    </h2>
                </div>
                <p className="
                    text-sm font-mono text-gray-500 ml-9
                    relative pl-3 before:content-['//'] before:absolute before:left-0
                    before:text-gray-700
                ">
                    System management shortcuts
                </p>
                
                {/* Header Decoration */}
                <div className="
                    absolute -bottom-px left-0 right-0 h-px
                    bg-gradient-to-r from-transparent via-green-500 to-transparent
                    opacity-30
                "></div>
            </div>
            
            {/* Actions Grid */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {actions.map((action, index) => {
                    const colorClass = getColorClasses(action.color);
                    
                    return (
                        <button
                            key={index}
                            onClick={action.action}
                            className={`
                                group/action relative bg-black/40 backdrop-blur-sm
                                border border-gray-700 rounded-xl p-5
                                transition-all duration-500 ease-out
                                hover:scale-[1.02] hover:shadow-2xl
                                overflow-hidden
                                before:content-[''] before:absolute before:inset-0
                                before:bg-gradient-to-br before:from-transparent before:via-${colorClass}/5 before:to-transparent
                                before:opacity-0 before:transition-opacity before:duration-500
                                hover:before:opacity-100
                                after:content-[''] after:absolute after:inset-0
                                after:bg-gradient-to-r after:from-transparent after:via-${colorClass}/10 after:to-transparent
                                after:translate-x-[-100%] after:transition-transform after:duration-700
                                hover:after:translate-x-[100%]
                            `}
                        >
                            {/* Corner Accents */}
                            <div className={`
                                absolute top-0 left-0 w-3 h-3 
                                border-t border-l border-${colorClass}/50 rounded-tl
                                opacity-0 group-hover/action:opacity-100
                                transition-opacity duration-300
                            `}></div>
                            <div className={`
                                absolute top-0 right-0 w-3 h-3 
                                border-t border-r border-${colorClass}/50 rounded-tr
                                opacity-0 group-hover/action:opacity-100
                                transition-opacity duration-300
                            `}></div>
                            <div className={`
                                absolute bottom-0 left-0 w-3 h-3 
                                border-b border-l border-${colorClass}/50 rounded-bl
                                opacity-0 group-hover/action:opacity-100
                                transition-opacity duration-300
                            `}></div>
                            <div className={`
                                absolute bottom-0 right-0 w-3 h-3 
                                border-b border-r border-${colorClass}/50 rounded-br
                                opacity-0 group-hover/action:opacity-100
                                transition-opacity duration-300
                            `}></div>
                            
                            {/* Action Content */}
                            <div className="relative z-10 flex items-start gap-4">
                                {/* Icon Container */}
                                <div className="relative flex-shrink-0">
                                    <div className={`
                                        relative w-12 h-12 rounded-xl
                                        bg-gradient-to-br from-black/50 to-${colorClass}/20
                                        border border-${colorClass}/30
                                        flex items-center justify-center
                                        group-hover/action:scale-110
                                        transition-transform duration-500
                                    `}>
                                        {/* Icon Glow */}
                                        <div className={`
                                            absolute inset-0 rounded-xl
                                            bg-${colorClass}/20 blur-md
                                            opacity-0 group-hover/action:opacity-100
                                            transition-opacity duration-500
                                        `}></div>
                                        
                                        {/* Icon Symbol */}
                                        <span className={`
                                            text-2xl relative z-10
                                            group-hover/action:scale-125
                                            transition-transform duration-300
                                        `}>
                                            {action.icon}
                                        </span>
                                        
                                        {/* Pulsing Ring */}
                                        <div className={`
                                            absolute -inset-2 rounded-2xl border-2 border-${colorClass}/30
                                            animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]
                                        `}></div>
                                    </div>
                                </div>
                                
                                {/* Text Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className={`
                                        text-lg font-bold font-mono mb-1
                                        text-${colorClass}
                                        group-hover/action:text-white
                                        transition-colors duration-300
                                    `}>
                                        {action.label}
                                    </h3>
                                    <p className="
                                        text-sm text-gray-400 font-mono leading-relaxed
                                        group-hover/action:text-gray-300
                                        transition-colors duration-300
                                    ">
                                        {action.desc}
                                    </p>
                                </div>
                                
                                {/* Arrow Indicator */}
                                <div className="
                                    flex-shrink-0 opacity-0 -translate-x-2
                                    group-hover/action:opacity-100 group-hover/action:translate-x-0
                                    transition-all duration-500 ease-out
                                ">
                                    <div className={`
                                        w-8 h-8 rounded-full
                                        bg-gradient-to-br from-${colorClass}/20 to-${colorClass}/10
                                        border border-${colorClass}/30
                                        flex items-center justify-center
                                    `}>
                                        <span className={`
                                            text-xl font-bold text-${colorClass}
                                            group-hover/action:translate-x-1
                                            transition-transform duration-300
                                        `}>
                                            →
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Bottom Border Glow */}
                            <div className={`
                                absolute bottom-0 left-1/4 right-1/4 h-px
                                bg-gradient-to-r from-transparent via-${colorClass} to-transparent
                                opacity-0 group-hover/action:opacity-50
                                transition-opacity duration-500
                            `}></div>
                            
                            {/* Action Number */}
                            <div className={`
                                absolute -top-2 -right-2 w-6 h-6 rounded-full
                                bg-gradient-to-br from-${colorClass} to-${colorClass}/70
                                flex items-center justify-center
                                opacity-0 group-hover/action:opacity-100
                                transition-opacity duration-500
                            `}>
                                <span className="text-xs font-bold font-mono text-black">
                                    {index + 1}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
            
            {/* Footer */}
            <div className="
                relative mt-8 pt-4 border-t border-gray-700/30
                flex items-center justify-between
            ">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <div className="
                            w-1.5 h-1.5 rounded-full bg-green-500 
                            animate-[pulse_2s_ease-in-out_infinite]
                        "></div>
                        <div className="
                            w-1.5 h-1.5 rounded-full bg-cyan-500 
                            animate-[pulse_2s_ease-in-out_infinite_0.2s]
                        "></div>
                        <div className="
                            w-1.5 h-1.5 rounded-full bg-purple-500 
                            animate-[pulse_2s_ease-in-out_infinite_0.4s]
                        "></div>
                    </div>
                    <span className="text-xs font-mono text-gray-500">
                        <span className="text-gray-400">ACTIONS:</span> {actions.length} Available
                    </span>
                </div>
                
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-gray-500">
                        <span className="text-gray-400">TIPS:</span> Click any action to execute
                    </span>
                    <div className="
                        w-2 h-2 rounded-full bg-green-500 
                        animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.5)]
                    "></div>
                </div>
            </div>
            
            {/* Glow Effects */}
            <div className="
                absolute -inset-4 bg-gradient-to-r from-green-500/5 via-cyan-500/5 to-purple-500/5
                blur-3xl opacity-20 pointer-events-none -z-10
            "></div>
        </div>
    );
};

export default QuickActions;