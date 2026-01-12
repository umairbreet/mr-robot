// src/components/Footer/Footer.tsx
import { useState, useEffect } from 'react';
import { networkMonitor } from '../../services/networkMonitor';
import type { NetworkInfo } from '../../services/networkMonitor';

const Footer: React.FC = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [uptime, setUptime] = useState('00:00:00');
    const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
      type: 'unknown',
      effectiveType: 'unknown',
      downlink: 100,
      rtt: 50,
      saveData: false,
      connectionStrength: 85,
      downloadSpeed: 0,
      uploadSpeed: 0,
      networkName: 'Unknown Network',
      ipAddress: '192.168.1.1',
      latency: 30,
      packetLoss: 0
    });
    
    const [lastSpeedTest, setLastSpeedTest] = useState<string>('');

    // Format bytes to human readable speed
    const formatSpeed = (bytesPerSecond: number): string => {
      if (bytesPerSecond < 1024) {
        return `${bytesPerSecond.toFixed(0)} B/s`;
      } else if (bytesPerSecond < 1024 * 1024) {
        return `${(bytesPerSecond / 1024).toFixed(1)} KB/s`;
      } else if (bytesPerSecond < 1024 * 1024 * 1024) {
        return `${(bytesPerSecond / (1024 * 1024)).toFixed(1)} MB/s`;
      } else {
        return `${(bytesPerSecond / (1024 * 1024 * 1024)).toFixed(1)} GB/s`;
      }
    };

    // Format Mbps
    const formatMbps = (mbps: number): string => {
      return `${mbps.toFixed(1)} Mbps`;
    };

    // Get connection type icon
    const getConnectionIcon = (type: string): string => {
      const icons: Record<string, string> = {
        'wifi': '📶',
        'cellular': '📱',
        'ethernet': '🔌',
        'bluetooth': '🔵',
        'wimax': '📡',
        'unknown': '🌐'
      };
      return icons[type] || '🌐';
    };

    // Get connection color based on strength
    const getConnectionColor = (strength: number): string => {
      if (strength >= 80) return 'text-green-500';
      if (strength >= 60) return 'text-yellow-500';
      if (strength >= 40) return 'text-orange-500';
      return 'text-red-500';
    };

    // Get bar color based on strength
    const getBarColor = (strength: number): string => {
      if (strength >= 80) return 'from-green-500 to-green-400';
      if (strength >= 60) return 'from-yellow-500 to-yellow-400';
      if (strength >= 40) return 'from-orange-500 to-orange-400';
      return 'from-red-500 to-red-400';
    };

    // Get signal strength text
    const getSignalStrengthText = (strength: number): string => {
      if (strength >= 80) return 'EXCELLENT';
      if (strength >= 60) return 'GOOD';
      if (strength >= 40) return 'FAIR';
      return 'POOR';
    };

    // Update current time with AM/PM based on locale
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            setCurrentTime(timeString);
        };

        updateTime();
        const timeInterval = setInterval(updateTime, 1000);

        // Simulate uptime counter
        const startTime = Date.now();
        const updateUptime = () => {
            const elapsed = Date.now() - startTime;
            const hours = Math.floor(elapsed / 3600000);
            const minutes = Math.floor((elapsed % 3600000) / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            setUptime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        };

        updateUptime();
        const uptimeInterval = setInterval(updateUptime, 1000);

        return () => {
            clearInterval(timeInterval);
            clearInterval(uptimeInterval);
        };
    }, []);

    // Subscribe to network monitor
    useEffect(() => {
        const unsubscribe = networkMonitor.subscribe((info) => {
            setNetworkInfo(info);
        });

        return unsubscribe;
    }, []);

    // Handle manual speed test
    const handleSpeedTest = async () => {
        setLastSpeedTest('Testing...');
        const result = await networkMonitor.forceSpeedTest();
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit'
        });
        setLastSpeedTest(`${timeString}: ${result.download.toFixed(1)}Mbps ↓ / ${result.upload.toFixed(1)}Mbps ↑`);
    };

    return (
        <footer className="relative bg-black text-green-400 font-mono mt-auto border-t-2 border-green-400 overflow-hidden">
            {/* Scan Line */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-footer-scan z-30 pointer-events-none"></div>

            {/* Matrix Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent bg-[size:2px_2px] bg-repeat z-10 pointer-events-none"></div>

            {/* Terminal Container */}
            <div className="relative bg-gray-900/95 border border-green-400 m-4 shadow-[0_0_30px_rgba(0,255,0,0.1)] z-20 overflow-hidden before:absolute before:inset-0 before:border before:border-transparent before:bg-gradient-to-br before:from-transparent before:via-green-400/10 before:to-transparent before:animate-border-glow before:pointer-events-none before:z-10">
                
                {/* Terminal Header */}
                <div className="bg-gray-900 px-4 py-3 border-b border-green-400 flex items-center gap-3">
                    <div className="flex gap-2">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                    <div className="text-gray-400 text-sm">system@mr-robot:~$ status --footer --network-live</div>
                </div>

                {/* Terminal Content */}
                <div className="p-8">
                    {/* System Stats */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in-up [animation-delay:100ms]">
                        {/* Left Column - Time & Uptime */}
                        <div className="p-6 bg-black/50 border border-green-400/20">
                            <div className="flex items-center gap-4 py-3 border-b border-green-400/10">
                                <span className="text-cyan-400 font-bold uppercase tracking-wider text-sm min-w-[120px]">SYSTEM_TIME:</span>
                                <span className="text-white font-bold font-mono text-lg">{currentTime}</span>
                            </div>
                            <div className="flex items-center gap-4 py-3">
                                <span className="text-cyan-400 font-bold uppercase tracking-wider text-sm min-w-[120px]">UPTIME:</span>
                                <span className="text-white font-bold font-mono text-lg">{uptime}</span>
                            </div>
                        </div>

                        {/* Right Column - Network Info */}
                        <div className="p-6 bg-black/50 border border-green-400/20">
                            <div className="space-y-4">
                                {/* Network Header */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{getConnectionIcon(networkInfo.type)}</span>
                                        <div>
                                            <div className="text-cyan-400 font-bold uppercase tracking-wider text-xs">
                                                {networkInfo.networkName.toUpperCase()}
                                            </div>
                                            <div className="text-white font-mono text-sm">
                                                {networkInfo.ipAddress}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`text-right ${getConnectionColor(networkInfo.connectionStrength)}`}>
                                        <div className="text-xs font-bold uppercase tracking-wider">
                                            CONNECTION
                                        </div>
                                        <div className="font-mono text-lg font-bold">
                                            {networkInfo.connectionStrength}%
                                        </div>
                                    </div>
                                </div>

                                {/* Connection Strength Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-400">SIGNAL STRENGTH</span>
                                        <span className={getConnectionColor(networkInfo.connectionStrength)}>
                                            {getSignalStrengthText(networkInfo.connectionStrength)}
                                        </span>
                                    </div>
                                    <div className="h-2 bg-green-400/10 rounded-none overflow-hidden relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-green-400/10 after:to-transparent after:animate-scan">
                                        <div 
                                            className={`absolute top-0 left-0 h-full bg-gradient-to-r transition-all duration-1000 ease-in-out
                                                ${getBarColor(networkInfo.connectionStrength)} 
                                                shadow-[0_0_10px_rgba(39,202,63,0.5)] after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent after:animate-shimmer`}
                                            style={{ width: `${networkInfo.connectionStrength}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Speed Meters */}
                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-green-400/10">
                                    <div className="text-center">
                                        <div className="text-cyan-400 font-bold uppercase tracking-wider text-xs mb-2">
                                            DOWNLOAD
                                        </div>
                                        <div className="text-white font-mono text-xl font-bold mb-1">
                                            {formatSpeed(networkInfo.downloadSpeed)}
                                        </div>
                                        <div className="text-gray-400 text-xs">
                                            {formatMbps(networkInfo.downlink)}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-cyan-400 font-bold uppercase tracking-wider text-xs mb-2">
                                            UPLOAD
                                        </div>
                                        <div className="text-white font-mono text-xl font-bold mb-1">
                                            {formatSpeed(networkInfo.uploadSpeed)}
                                        </div>
                                        <div className="text-gray-400 text-xs">
                                            Latency: {networkInfo.latency}ms
                                        </div>
                                    </div>
                                </div>

                                {/* Network Details */}
                                <div className="pt-4 border-t border-green-400/10">
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <span className="text-gray-400">TYPE:</span>
                                            <span className="text-white font-mono ml-2">{networkInfo.type.toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">EFFECTIVE:</span>
                                            <span className="text-white font-mono ml-2">{networkInfo.effectiveType.toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">PACKET LOSS:</span>
                                            <span className="text-white font-mono ml-2">{networkInfo.packetLoss.toFixed(1)}%</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-400">SAVE DATA:</span>
                                            <span className={`font-mono ml-2 ${networkInfo.saveData ? 'text-red-400' : 'text-green-400'}`}>
                                                {networkInfo.saveData ? 'ENABLED' : 'DISABLED'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Speed Test Button */}
                                    <div className="mt-3 flex items-center justify-between">
                                        <button
                                            onClick={handleSpeedTest}
                                            className="px-3 py-1.5 text-xs bg-green-400/10 border border-green-400/30 text-green-400 hover:bg-green-400/20 hover:border-green-400/50 transition-all duration-200 font-mono uppercase tracking-wider"
                                        >
                                            RUN SPEED TEST
                                        </button>
                                        {lastSpeedTest && (
                                            <span className="text-gray-400 text-xs font-mono">
                                                Last: {lastSpeedTest}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="mb-8 animate-fade-in-up [animation-delay:200ms]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-black/50 border border-green-400/20">
                            {[
                                { icon: '🔐', text: 'PRIVACY_POLICY', href: '/privacy' },
                                { icon: '📜', text: 'TERMS_OF_SERVICE', href: '/terms' },
                                { icon: '🛡️', text: 'SECURITY_POLICY', href: '/security' },
                                { icon: '🐛', text: 'BUG_BOUNTY', href: '/bug-bounty' }
                            ].map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="flex items-center gap-3 p-4 text-gray-400 no-underline transition-all duration-300 border border-transparent bg-black/30 hover:text-green-400 hover:border-green-400/30 hover:bg-green-400/5 hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,255,0,0.1)] group"
                                >
                                    <span className="text-xl group-hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">{link.icon}</span>
                                    <span className="font-bold uppercase tracking-wider text-sm drop-shadow-[0_0_10px_rgba(0,255,0,0.3)] group-hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">
                                        {link.text}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mb-8 p-6 bg-black/50 border border-green-400/20 animate-fade-in-up [animation-delay:300ms]">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-2 border-b border-green-400/10 last:border-b-0">
                            <span className="text-cyan-400 font-bold uppercase tracking-wider text-sm min-w-[150px]">ENCRYPTED_EMAIL:</span>
                            <span className="text-white font-mono break-all drop-shadow-[0_0_10px_rgba(0,255,0,0.3)]">contact@mr-robot.encrypted</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-2 border-b border-green-400/10 last:border-b-0">
                            <span className="text-cyan-400 font-bold uppercase tracking-wider text-sm min-w-[150px]">PGP_FINGERPRINT:</span>
                            <span className="text-white font-mono break-all drop-shadow-[0_0_10px_rgba(0,255,0,0.3)]">0xFA1E5EC7BEEFCA5E</span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-2">
                            <span className="text-cyan-400 font-bold uppercase tracking-wider text-sm min-w-[150px]">ONION_SITE:</span>
                            <span className="text-white font-mono break-all drop-shadow-[0_0_10px_rgba(0,255,0,0.3)]">mrrobot3j2j2j2.onion</span>
                        </div>
                    </div>

                    {/* Encryption Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-6 bg-black/50 border border-green-400/20 animate-fade-in-up [animation-delay:400ms]">
                        {[
                            { label: 'ENCRYPTION:', value: 'AES-256_ACTIVE', active: true },
                            { label: 'SSL/TLS:', value: 'TLS_1.3_SECURE', active: true },
                            { label: 'FIREWALL:', value: 'STATE_FULL_INSPECTION', active: true }
                        ].map((status, index) => (
                            <div key={index} className="flex items-center gap-3 py-2">
                                <span className="text-gray-400 font-bold uppercase tracking-wider text-sm min-w-[80px]">
                                    {status.label}
                                </span>
                                <span className="flex items-center gap-2 text-green-500 font-bold text-sm">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-blink shadow-[0_0_5px_#27ca3f]"></span>
                                    {status.value}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Copyright & Warning */}
                    <div className="p-6 bg-black/70 border border-green-400/30 mt-8 animate-fade-in-up [animation-delay:500ms]">
                        <div className="flex items-center gap-3 p-4 mb-4 bg-yellow-500/10 border border-yellow-500/30 border-l-4 border-l-yellow-500">
                            <span className="text-xl text-yellow-500">⚠️</span>
                            <span className="text-yellow-500 font-bold text-sm uppercase tracking-wider">
                                WARNING: This system is protected. Unauthorized access is prohibited.
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
                            <div className="flex items-center gap-3 flex-1">
                                <span className="text-green-400 text-xl">©</span>
                                <span className="text-white font-bold uppercase tracking-wider text-sm drop-shadow-[0_0_10px_rgba(0,255,0,0.3)]">
                                    2026 MR_ROBOT_SECURITY_SYSTEMS. ALL_RIGHTS_RESERVED.
                                </span>
                            </div>
                            <span className="text-cyan-400 font-mono font-bold px-3 py-1.5 bg-cyan-400/10 border border-cyan-400/30">
                                v4.2.1
                            </span>
                        </div>
                    </div>
                </div>

                {/* Terminal Footer */}
                <div className="bg-gray-900 px-4 py-3 border-t border-green-400 flex items-center gap-2">
                    <span className="text-fuchsia-500 font-bold">$</span>
                    <span className="text-cyan-400">network_monitor --live --speed-test-ready</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;