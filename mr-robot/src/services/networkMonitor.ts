// src/services/networkMonitor.ts

export interface NetworkInfo {
  type: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown';
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g' | 'unknown';
  downlink: number; // Mbps
  rtt: number; // ms
  saveData: boolean;
  connectionStrength: number; // 0-100
  downloadSpeed: number; // Bytes per second
  uploadSpeed: number; // Bytes per second
  networkName: string;
  ipAddress: string;
  latency: number; // ms
  packetLoss: number; // percentage
}

interface SpeedTestResult {
  download: number; // Mbps
  upload: number; // Mbps
  latency: number; // ms
  jitter: number; // ms
  packetLoss: number; // percentage
}

class NetworkMonitor {
  private downloadSamples: number[] = [];
  private uploadSamples: number[] = [];
  private lastBytesReceived: number = 0;
  private lastBytesSent: number = 0;
  private lastCheckTime: number = Date.now();
  private speedTestRunning: boolean = false;
  private callbacks: ((info: NetworkInfo) => void)[] = [];
  private currentInfo: NetworkInfo;

  constructor() {
    this.currentInfo = this.getDefaultNetworkInfo();
    this.startMonitoring();
  }

  private getDefaultNetworkInfo(): NetworkInfo {
    return {
      type: 'unknown',
      effectiveType: 'unknown',
      downlink: 10,
      rtt: 50,
      saveData: false,
      connectionStrength: 85,
      downloadSpeed: 0,
      uploadSpeed: 0,
      networkName: 'Unknown Network',
      ipAddress: '192.168.1.1',
      latency: 30,
      packetLoss: 0
    };
  }

  private calculateConnectionStrength(downlink: number, rtt: number, packetLoss: number): number {
    // Calculate score based on multiple factors
    const downlinkScore = Math.min((downlink / 100) * 100, 100); // Max 100 Mbps
    const rttScore = Math.max(0, 100 - (rtt / 100)); // Lower RTT is better
    const packetLossScore = Math.max(0, 100 - (packetLoss * 100)); // Lower packet loss is better
    
    // Weighted average
    return Math.round((downlinkScore * 0.5) + (rttScore * 0.3) + (packetLossScore * 0.2));
  }

  private getNetworkName(type: string): string {
    const networkNames: Record<string, string> = {
      'wifi': 'Wi-Fi',
      'cellular': 'Mobile Data',
      'ethernet': 'Ethernet',
      'bluetooth': 'Bluetooth',
      'wimax': 'WiMAX',
      'unknown': 'Unknown Network'
    };
    return networkNames[type] || 'Other Network';
  }

  private async getIPAddress(): Promise<string> {
    try {
      // Method 1: Use WebRTC to get local IP
      const localIP = await this.getLocalIP();
      if (localIP) return localIP;

      // Method 2: Use a simple STUN server
      const stunIP = await this.getIPFromSTUN();
      if (stunIP) return stunIP;

      // Method 3: Fallback to public IP via API
      const publicIP = await this.getPublicIP();
      return publicIP;
    } catch (error) {
      return '127.0.0.1';
    }
  }

  private getLocalIP(): Promise<string> {
    return new Promise((resolve) => {
      const RTCPeerConnection = (window as any).RTCPeerConnection || 
                                (window as any).mozRTCPeerConnection || 
                                (window as any).webkitRTCPeerConnection;
      
      if (!RTCPeerConnection) {
        resolve('');
        return;
      }

      const pc = new RTCPeerConnection({ iceServers: [] });
      pc.createDataChannel('');
      pc.createOffer()
        .then(pc.setLocalDescription.bind(pc))
        .catch(() => resolve(''));
      
      pc.onicecandidate = (ice: any) => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
          resolve('');
          return;
        }
        
        const candidate = ice.candidate.candidate;
        const regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
        const match = candidate.match(regex);
        
        if (match) {
          resolve(match[1]);
        } else {
          resolve('');
        }
        
        pc.close();
      };
    });
  }

  private getIPFromSTUN(): Promise<string> {
    return new Promise((resolve) => {
      const RTCPeerConnection = (window as any).RTCPeerConnection;
      
      if (!RTCPeerConnection) {
        resolve('');
        return;
      }

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });
      
      pc.createDataChannel('');
      pc.createOffer()
        .then(pc.setLocalDescription.bind(pc))
        .catch(() => resolve(''));
      
      pc.onicecandidate = (ice: any) => {
        if (!ice || !ice.candidate || !ice.candidate.candidate) {
          resolve('');
          return;
        }
        
        const candidate = ice.candidate.candidate;
        const regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
        const match = candidate.match(regex);
        
        if (match) {
          resolve(match[1]);
        } else {
          resolve('');
        }
        
        pc.close();
      };
    });
  }

  private async getPublicIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json', {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.ip;
      }
    } catch (error) {
      // Try fallback service
      try {
        const response = await fetch('https://api64.ipify.org?format=json');
        if (response.ok) {
          const data = await response.json();
          return data.ip;
        }
      } catch (error) {
        // Last fallback
        return '127.0.0.1';
      }
    }
    return '127.0.0.1';
  }

  private async measureLatency(): Promise<number> {
    const startTime = performance.now();
    
    try {
      // Try to ping Google's DNS
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      await fetch('https://8.8.8.8', {
        method: 'HEAD',
        mode: 'no-cors',
        signal: controller.signal,
        cache: 'no-store'
      });
      
      clearTimeout(timeoutId);
      const latency = performance.now() - startTime;
      return Math.round(latency);
    } catch (error) {
      // Try fallback to Google.com
      try {
        const start = performance.now();
        await fetch('https://www.google.com/favicon.ico', {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-store'
        });
        return Math.round(performance.now() - start);
      } catch (error) {
        return 100; // Default latency
      }
    }
  }

  private async runSpeedTest(): Promise<SpeedTestResult> {
    if (this.speedTestRunning) {
      return {
        download: this.currentInfo.downlink,
        upload: this.currentInfo.uploadSpeed / 125000, // Convert bytes to Mbps
        latency: this.currentInfo.latency,
        jitter: 5,
        packetLoss: this.currentInfo.packetLoss
      };
    }

    this.speedTestRunning = true;
    
    try {
      // Download speed test
      const downloadSpeed = await this.testDownloadSpeed();
      
      // Upload speed test
      const uploadSpeed = await this.testUploadSpeed();
      
      // Latency test
      const latency = await this.measureLatency();
      
      // Jitter test (simple implementation)
      const jitter = await this.measureJitter();
      
      // Packet loss simulation (in real implementation would need server-side)
      const packetLoss = await this.estimatePacketLoss();
      
      this.speedTestRunning = false;
      
      return {
        download: downloadSpeed,
        upload: uploadSpeed,
        latency,
        jitter,
        packetLoss
      };
    } catch (error) {
      this.speedTestRunning = false;
      return {
        download: 10,
        upload: 2,
        latency: 50,
        jitter: 10,
        packetLoss: 1
      };
    }
  }

  private async testDownloadSpeed(): Promise<number> {
    const testImage = 'https://source.unsplash.com/random/2000x2000';
    const fileSizeInBytes = 2 * 1024 * 1024; // 2MB test file
    
    return new Promise((resolve) => {
      const startTime = performance.now();
      const xhr = new XMLHttpRequest();
      
      xhr.open('GET', `${testImage}?cache=${Date.now()}`, true);
      xhr.responseType = 'blob';
      
      xhr.onload = () => {
        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000; // Convert to seconds
        const bitsLoaded = fileSizeInBytes * 8;
        const speedMbps = (bitsLoaded / duration) / 1000000;
        resolve(Math.min(speedMbps, 1000)); // Cap at 1000 Mbps
      };
      
      xhr.onerror = () => resolve(10); // Default speed
      xhr.send();
      
      // Timeout after 10 seconds
      setTimeout(() => {
        xhr.abort();
        resolve(10);
      }, 10000);
    });
  }

  private async testUploadSpeed(): Promise<number> {
    return new Promise((resolve) => {
      const blobSize = 1 * 1024 * 1024; // 1MB test data
      const blob = new Blob([new ArrayBuffer(blobSize)], { type: 'application/octet-stream' });
      const startTime = performance.now();
      
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://httpbin.org/post', true);
      
      xhr.onload = () => {
        const endTime = performance.now();
        const duration = (endTime - startTime) / 1000;
        const bitsSent = blobSize * 8;
        const speedMbps = (bitsSent / duration) / 1000000;
        resolve(Math.min(speedMbps, 100)); // Cap at 100 Mbps
      };
      
      xhr.onerror = () => resolve(2); // Default upload speed
      xhr.send(blob);
      
      // Timeout after 10 seconds
      setTimeout(() => {
        xhr.abort();
        resolve(2);
      }, 10000);
    });
  }

  private async measureJitter(): Promise<number> {
    const latencies: number[] = [];
    
    // Measure latency 5 times
    for (let i = 0; i < 5; i++) {
      const latency = await this.measureLatency();
      latencies.push(latency);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Calculate jitter (average variation between consecutive measurements)
    let totalDiff = 0;
    for (let i = 1; i < latencies.length; i++) {
      totalDiff += Math.abs(latencies[i] - latencies[i - 1]);
    }
    
    return Math.round(totalDiff / (latencies.length - 1));
  }

  private async estimatePacketLoss(): Promise<number> {
    // In a real implementation, this would require server-side support
    // For now, we'll simulate based on network conditions
    if (this.currentInfo.effectiveType === 'slow-2g') return 10;
    if (this.currentInfo.effectiveType === '2g') return 5;
    if (this.currentInfo.effectiveType === '3g') return 2;
    return 1; // Default for 4G/WiFi
  }

  private monitorTraffic(): void {
    if ('performance' in window) {
      const now = Date.now();
      const timeDiff = (now - this.lastCheckTime) / 1000; // Convert to seconds
      
      if (timeDiff > 0) {
        const entries = performance.getEntriesByType('resource');
        let totalReceived = 0;
        let totalSent = 0;
        
        entries.forEach(entry => {
          const resource = entry as PerformanceResourceTiming;
          if (resource.transferSize) totalReceived += resource.transferSize;
          if (resource.encodedBodySize) totalSent += resource.encodedBodySize;
        });
        
        const bytesReceived = totalReceived - this.lastBytesReceived;
        const bytesSent = totalSent - this.lastBytesSent;
        
        const downloadSpeed = bytesReceived / timeDiff;
        const uploadSpeed = bytesSent / timeDiff;
        
        this.downloadSamples.push(downloadSpeed);
        this.uploadSamples.push(uploadSpeed);
        
        // Keep only last 10 samples
        if (this.downloadSamples.length > 10) this.downloadSamples.shift();
        if (this.uploadSamples.length > 10) this.uploadSamples.shift();
        
        this.lastBytesReceived = totalReceived;
        this.lastBytesSent = totalSent;
        this.lastCheckTime = now;
        
        // Calculate average speeds
        const avgDownload = this.downloadSamples.length > 0
          ? this.downloadSamples.reduce((a, b) => a + b, 0) / this.downloadSamples.length
          : 0;
        
        const avgUpload = this.uploadSamples.length > 0
          ? this.uploadSamples.reduce((a, b) => a + b, 0) / this.uploadSamples.length
          : 0;
        
        this.currentInfo = {
          ...this.currentInfo,
          downloadSpeed: avgDownload,
          uploadSpeed: avgUpload
        };
        
        this.notifyCallbacks();
      }
    }
  }

  private async updateNetworkInfo(): Promise<void> {
    try {
      // Get connection info from browser API
      let connection: any = null;
      if ('connection' in navigator) {
        connection = (navigator as any).connection;
      }
      
      // Get IP address
      const ipAddress = await this.getIPAddress();
      
      // Run speed test periodically (every 30 seconds)
      const shouldRunSpeedTest = Date.now() % 30000 < 1000; // Run about every 30 seconds
      let speedTestResult: SpeedTestResult | null = null;
      
      if (shouldRunSpeedTest) {
        speedTestResult = await this.runSpeedTest();
      }
      
      // Update network info
      this.currentInfo = {
        type: connection?.type || 'unknown',
        effectiveType: connection?.effectiveType || 'unknown',
        downlink: speedTestResult?.download || connection?.downlink || 10,
        rtt: speedTestResult?.latency || connection?.rtt || 50,
        saveData: connection?.saveData || false,
        connectionStrength: this.calculateConnectionStrength(
          speedTestResult?.download || connection?.downlink || 10,
          speedTestResult?.latency || connection?.rtt || 50,
          speedTestResult?.packetLoss || 0
        ),
        downloadSpeed: this.currentInfo.downloadSpeed,
        uploadSpeed: this.currentInfo.uploadSpeed,
        networkName: this.getNetworkName(connection?.type || 'unknown'),
        ipAddress,
        latency: speedTestResult?.latency || this.currentInfo.latency,
        packetLoss: speedTestResult?.packetLoss || this.currentInfo.packetLoss
      };
      
      this.notifyCallbacks();
    } catch (error) {
      console.warn('Network monitoring error:', error);
    }
  }

  private notifyCallbacks(): void {
    this.callbacks.forEach(callback => callback(this.currentInfo));
  }

  private startMonitoring(): void {
    // Monitor traffic every 2 seconds
    setInterval(() => this.monitorTraffic(), 2000);
    
    // Update network info every 5 seconds
    setInterval(() => this.updateNetworkInfo(), 5000);
    
    // Listen for connection changes
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection) {
        connection.addEventListener('change', () => this.updateNetworkInfo());
      }
    }
    
    // Initial update
    this.updateNetworkInfo();
  }

  public getCurrentInfo(): NetworkInfo {
    return { ...this.currentInfo };
  }

  public subscribe(callback: (info: NetworkInfo) => void): () => void {
    this.callbacks.push(callback);
    callback(this.currentInfo); // Send current info immediately
    
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  public async forceSpeedTest(): Promise<SpeedTestResult> {
    return this.runSpeedTest();
  }
}

// Export singleton instance
export const networkMonitor = new NetworkMonitor();