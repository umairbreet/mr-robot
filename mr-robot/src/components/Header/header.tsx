import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [typingText, setTypingText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const fullText = "MR_ROBO_TERMINAL";

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Typing animation for logo
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

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'About', path: '/about', icon: '👤' },
    { name: 'Contact', path: '/contact', icon: '📧' },
    { name: 'Admin', path: '/admin', icon: '🔐' }
  ];

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <header className="w-full bg-black border-b-2 border-green-400 relative overflow-hidden">
      {/* Terminal Dots */}
      <div className="absolute top-2.5 left-4 flex gap-1.5 z-1001">
        <span className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_5px_#ff5f56]"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_5px_#ffbd2e]"></span>
        <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_5px_#27ca3f]"></span>
      </div>

      {/* Scan Line Effect */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-header-scan z-1002 pointer-events-none"></div>

      {/* Main Header */}
      <div className="sticky top-0 z-1000 bg-gradient-to-b from-black to-gray-900 text-green-400 font-mono shadow-[0_0_30px_rgba(0,255,0,0.1)] before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-green-500/5 before:to-transparent before:bg-[size:2px_2px] before:bg-repeat before:pointer-events-none before:z-[-1]">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center max-w-7xl mx-auto px-4 py-3 min-h-[70px] relative">
          
          {/* Logo Section - Left aligned */}
          <div className="flex items-center gap-3 justify-self-start bg-black/70 p-3 border border-green-400/30 rounded-none relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-green-400 before:to-transparent before:animate-logo-scan">
            <div className="w-10 h-10 bg-gradient-to-br from-black to-gray-900 border-2 border-green-400 rounded-lg flex items-center justify-center relative overflow-hidden after:absolute after:-top-0.5 after:-left-0.5 after:-right-0.5 after:-bottom-0.5 after:bg-gradient-to-br after:from-transparent after:via-green-400/20 after:to-transparent after:animate-logo-rotate">
              <span className="text-2xl drop-shadow-[0_0_5px_#00ff00] animate-logo-float">🤖</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-green-400 drop-shadow-[0_0_10px_#00ff00] tracking-wider font-mono whitespace-nowrap">
                {typingText}
                <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} animate-cursor-blink`}>█</span>
              </span>
              <div className="text-gray-400 text-xs uppercase tracking-[2px] mt-0.5">
                SECURITY_SYSTEMS
              </div>
            </div>
          </div>
          
          {/* Desktop Navigation - Center aligned */}
          <nav className="hidden md:flex items-center gap-6 justify-self-center bg-black/70 p-3 border border-green-400/30 rounded-none relative">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-4 py-2 rounded-none text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 no-underline font-mono
                  ${isActive(item.path) 
                    ? 'bg-gradient-to-r from-transparent via-green-400/10 to-transparent border border-green-400/50 -translate-y-0.5 shadow-[0_5px_15px_rgba(0,255,0,0.2)]' 
                    : 'bg-transparent border border-transparent'
                  }
                `}
                aria-current={isActive(item.path) ? 'page' : undefined}
              >
                <span className="text-base">{item.icon}</span>
                <span className={`transition-colors duration-300 ${
                  isActive(item.path) 
                    ? 'text-green-400 drop-shadow-[0_0_10px_#00ff00]' 
                    : 'text-gray-400 hover:text-white'
                }`}>
                  {item.name}
                </span>
                {isActive(item.path) && (
                  <>
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#00ff00]"></span>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient(circle,rgba(0,255,0,0.1),transparent_70%) rounded pointer-events-none"></span>
                  </>
                )}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent transition-transform duration-300 origin-center
                  ${isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                `}></span>
              </Link>
            ))}
          </nav>
          
          {/* System Status - Right aligned (Desktop) */}
          <div className="hidden md:flex flex-col gap-2 justify-self-end bg-black/70 p-3 border border-green-400/30 rounded-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-connection-blink shadow-[0_0_5px_#27ca3f]"></span>
              <span className="text-green-500 text-xs uppercase tracking-wider">SYSTEM_ONLINE</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              <span>🕒</span>
              <span className="font-mono font-bold">{currentTime}</span>
            </div>
          </div>
          
          {/* Mobile Menu Button - Right aligned */}
          <button
            className="md:hidden p-2 bg-transparent border border-green-400/50 cursor-pointer justify-self-end flex items-center gap-2 transition-all duration-300 hover:bg-green-400/10 hover:shadow-[0_0_10px_rgba(0,255,0,0.3)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg 
                className="w-6 h-6 stroke-green-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </div>
            <span className="text-green-400 font-mono text-sm font-bold uppercase tracking-wider">MENU</span>
          </button>
        </div>
        
        {/* Mobile Navigation - Terminal Style */}
        {isMobileMenuOpen && (
          <div className="w-full bg-black border-t-2 border-green-400 p-0 animate-slide-down">
            <div className="bg-gray-900 border border-green-400 m-4 shadow-[0_0_20px_rgba(0,255,0,0.1)]">
              <div className="bg-gray-900 px-4 py-3 border-b border-green-400 flex items-center gap-3">
                <div className="flex gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                </div>
                <div className="text-green-400 text-sm font-bold uppercase tracking-wider">
                  NAVIGATION_MENU
                </div>
              </div>
              <nav className="flex flex-col gap-2 p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-4 rounded-none text-base font-medium transition-all duration-200 no-underline flex items-center justify-between relative overflow-hidden
                      ${isActive(item.path) 
                        ? 'bg-gradient-to-r from-green-400/10 to-transparent border-l-4 border-l-green-400 text-green-400' 
                        : 'text-gray-400 border-l-4 border-l-transparent hover:text-white hover:bg-green-400/5 hover:border-l-green-400/30'
                      }
                    `}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    <div className="flex items-center">
                      <span className="text-xl mr-4 w-6 text-center">{item.icon}</span>
                      <span className="font-mono font-bold uppercase tracking-wider">
                        {item.name}
                      </span>
                    </div>
                    {isActive(item.path) && (
                      <>
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-4 animate-pulse shadow-[0_0_5px_#00ff00]"></span>
                        <span className="absolute top-0 left-0 right-0 bottom-0 bg-radial-gradient(circle_at_left,rgba(0,255,0,0.1),transparent_50%) pointer-events-none"></span>
                      </>
                    )}
                    <span className="text-green-400 font-bold text-xl">→</span>
                  </Link>
                ))}
              </nav>
              <div className="bg-gray-900 px-4 py-3 border-t border-green-400 flex items-center gap-2 font-mono">
                <span className="text-fuchsia-500 font-bold">$</span>
                <span className="text-cyan-400">select_menu_option</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;