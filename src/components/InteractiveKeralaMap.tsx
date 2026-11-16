/**
 * InteractiveKeralaMap Component
 * 
 * An interactive map of Kerala with real-time fault/incident visualization.
 * 
 * Features:
 * - Google Maps embed centered on Kerala
 * - Color-coded fault markers with 4 severity levels:
 *   • Critical (red) - with pulsing animation
 *   • High (orange)
 *   • Medium (yellow)
 *   • Low (green)
 * - Interactive markers with hover tooltips
 * - Click to select and view detailed fault information
 * - Fixed legend panel showing severity color meanings
 * - Statistics bar with real-time fault counts
 * - Smooth animations and transitions
 * 
 * Usage:
 * ```tsx
 * import { InteractiveKeralaMap } from '@/components/InteractiveKeralaMap';
 * 
 * <InteractiveKeralaMap />
 * ```
 * 
 * Mock Data Structure:
 * Each fault location includes:
 * - id: Unique identifier
 * - name: Location name
 * - district: Kerala district name
 * - severity: 'critical' | 'high' | 'medium' | 'low'
 * - lat/lng: GPS coordinates
 * - xPercent/yPercent: Position on map overlay (0-100%)
 * - description: Fault description
 * - timestamp: Time since reported
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface FaultLocation {
  id: string;
  name: string;
  district: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  lat: number;
  lng: number;
  xPercent: number;
  yPercent: number;
  description: string;
  timestamp: string;
}

const mockFaultData: FaultLocation[] = [
  // Northern Kerala
  { id: '1', name: 'Kasaragod Substation', district: 'Kasaragod', severity: 'critical', lat: 12.4996, lng: 74.9869, xPercent: 72, yPercent: 8, description: 'Transformer overload', timestamp: '2 mins ago' },
  { id: '2', name: 'Kannur City', district: 'Kannur', severity: 'high', lat: 11.8745, lng: 75.3704, xPercent: 68, yPercent: 15, description: 'Phase imbalance detected', timestamp: '15 mins ago' },
  { id: '3', name: 'Thalassery', district: 'Kannur', severity: 'medium', lat: 11.7480, lng: 75.4908, xPercent: 65, yPercent: 18, description: 'Voltage fluctuation', timestamp: '1 hour ago' },
  
  // Central Kerala
  { id: '4', name: 'Kozhikode Medical College', district: 'Kozhikode', severity: 'critical', lat: 11.2588, lng: 75.7804, xPercent: 58, yPercent: 25, description: 'Power outage - Critical facility', timestamp: '5 mins ago' },
  { id: '5', name: 'Malappuram Junction', district: 'Malappuram', severity: 'low', lat: 11.0510, lng: 76.0711, xPercent: 52, yPercent: 30, description: 'Routine maintenance', timestamp: '3 hours ago' },
  { id: '6', name: 'Thrissur Round', district: 'Thrissur', severity: 'high', lat: 10.5276, lng: 76.2144, xPercent: 45, yPercent: 42, description: 'Underground cable fault', timestamp: '20 mins ago' },
  { id: '7', name: 'Palakkad Fort Area', district: 'Palakkad', severity: 'medium', lat: 10.7867, lng: 76.6548, xPercent: 38, yPercent: 35, description: 'Load shedding active', timestamp: '45 mins ago' },
  
  // Ernakulam Region
  { id: '8', name: 'Kochi Metro Station', district: 'Ernakulam', severity: 'critical', lat: 9.9312, lng: 76.2673, xPercent: 42, yPercent: 55, description: 'Substation fire alert', timestamp: '1 min ago' },
  { id: '9', name: 'Edappally Junction', district: 'Ernakulam', severity: 'high', lat: 10.0259, lng: 76.3078, xPercent: 40, yPercent: 52, description: 'High temperature detected', timestamp: '10 mins ago' },
  { id: '10', name: 'Aluva Industrial Area', district: 'Ernakulam', severity: 'medium', lat: 10.1080, lng: 76.3522, xPercent: 38, yPercent: 48, description: 'Circuit breaker tripped', timestamp: '2 hours ago' },
  
  // Central-South
  { id: '11', name: 'Idukki Dam Area', district: 'Idukki', severity: 'low', lat: 9.8386, lng: 77.0016, xPercent: 25, yPercent: 58, description: 'Normal operations', timestamp: '5 hours ago' },
  { id: '12', name: 'Kottayam KSEB Office', district: 'Kottayam', severity: 'medium', lat: 9.5916, lng: 76.5222, xPercent: 35, yPercent: 65, description: 'Meter reading anomaly', timestamp: '1.5 hours ago' },
  
  // Southern Kerala
  { id: '13', name: 'Alappuzha Beach Road', district: 'Alappuzha', severity: 'high', lat: 9.4981, lng: 76.3388, xPercent: 48, yPercent: 68, description: 'Saltwater corrosion issue', timestamp: '30 mins ago' },
  { id: '14', name: 'Kollam FACT Area', district: 'Kollam', severity: 'critical', lat: 8.8932, lng: 76.6141, xPercent: 50, yPercent: 78, description: 'Industrial zone blackout', timestamp: '8 mins ago' },
  { id: '15', name: 'Thiruvananthapuram Airport', district: 'Thiruvananthapuram', severity: 'low', lat: 8.4821, lng: 76.9199, xPercent: 42, yPercent: 88, description: 'Backup generator active', timestamp: '4 hours ago' },
  { id: '16', name: 'Kovalam Beach Area', district: 'Thiruvananthapuram', severity: 'medium', lat: 8.4004, lng: 76.9786, xPercent: 38, yPercent: 92, description: 'Tourist zone overload', timestamp: '50 mins ago' },
  { id: '17', name: 'Attingal Junction', district: 'Thiruvananthapuram', severity: 'low', lat: 8.6960, lng: 76.8157, xPercent: 52, yPercent: 85, description: 'Scheduled maintenance', timestamp: '6 hours ago' },
  
  // Additional locations
  { id: '18', name: 'Wayanad Safari Park', district: 'Wayanad', severity: 'low', lat: 11.6854, lng: 76.1320, xPercent: 32, yPercent: 20, description: 'Remote monitoring active', timestamp: '7 hours ago' },
  { id: '19', name: 'Pathanamthitta Town', district: 'Pathanamthitta', severity: 'medium', lat: 9.2648, lng: 76.7870, xPercent: 45, yPercent: 72, description: 'Transformer humming', timestamp: '1 hour ago' },
  { id: '20', name: 'Perinthalmanna', district: 'Malappuram', severity: 'high', lat: 10.9833, lng: 76.2278, xPercent: 48, yPercent: 32, description: 'Overload condition', timestamp: '25 mins ago' },
];

const severityConfig = {
  critical: {
    color: 'bg-red-500',
    borderColor: 'border-red-500',
    textColor: 'text-red-500',
    label: 'Critical',
    icon: AlertTriangle,
    badgeVariant: 'destructive' as const,
  },
  high: {
    color: 'bg-orange-500',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-500',
    label: 'High',
    icon: AlertCircle,
    badgeVariant: 'default' as const,
  },
  medium: {
    color: 'bg-yellow-500',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-500',
    label: 'Medium',
    icon: AlertCircle,
    badgeVariant: 'secondary' as const,
  },
  low: {
    color: 'bg-green-500',
    borderColor: 'border-green-500',
    textColor: 'text-green-500',
    label: 'Low',
    icon: Info,
    badgeVariant: 'outline' as const,
  },
};

export const InteractiveKeralaMap = () => {
  const [hoveredFault, setHoveredFault] = useState<string | null>(null);
  const [selectedFault, setSelectedFault] = useState<string | null>(null);

  const handleMarkerClick = (faultId: string) => {
    setSelectedFault(faultId === selectedFault ? null : faultId);
  };

  const selectedFaultData = mockFaultData.find(f => f.id === selectedFault);

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[600px] rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
        {/* Google Maps Embed */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4025726.6756234174!2d74.85826!3d10.8505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0812ffd49cf55b%3A0x64bd90fbed387c99!2sKerala!5e0!3m2!1sen!2sin!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0"
        />

        {/* Overlay container for markers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full">
            {mockFaultData.map((fault) => {
              const config = severityConfig[fault.severity];
              const isHovered = hoveredFault === fault.id;
              const isSelected = selectedFault === fault.id;

              return (
                <div
                  key={fault.id}
                  className="absolute pointer-events-auto"
                  style={{
                    left: `${fault.xPercent}%`,
                    top: `${fault.yPercent}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() => setHoveredFault(fault.id)}
                  onMouseLeave={() => setHoveredFault(null)}
                  onClick={() => handleMarkerClick(fault.id)}
                >
                  {/* Marker Dot */}
                  <div className="relative">
                    {/* Pulsing rings for critical faults */}
                    {fault.severity === 'critical' && (
                      <>
                        <div 
                          className={`absolute ${config.color} rounded-full`} 
                          style={{ 
                            width: '24px', 
                            height: '24px', 
                            left: '-6px', 
                            top: '-6px',
                            animation: 'pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                          }} 
                        />
                        <div 
                          className={`absolute ${config.color} rounded-full`} 
                          style={{ 
                            width: '24px', 
                            height: '24px', 
                            left: '-6px', 
                            top: '-6px',
                            animation: 'pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                            animationDelay: '0.5s'
                          }} 
                        />
                      </>
                    )}
                    
                    {/* Main marker dot */}
                    <div
                      className={`
                        w-3 h-3 rounded-full ${config.color} border-2 border-white shadow-lg cursor-pointer
                        transition-all duration-200 relative z-10
                        ${isHovered || isSelected ? 'scale-150 ring-4 ring-white/50' : 'scale-100'}
                        ${isSelected ? 'ring-4 ring-blue-400' : ''}
                      `}
                    />

                    {/* Tooltip */}
                    {(isHovered || isSelected) && (
                      <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <Card className="p-3 bg-gray-800 border-gray-700 shadow-xl min-w-[200px]">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <MapPin className={`w-4 h-4 ${config.textColor}`} />
                                <span className="font-semibold text-white text-sm">{fault.name}</span>
                              </div>
                              <Badge variant={config.badgeVariant} className="text-xs">
                                {config.label}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-400 space-y-1">
                              <p><span className="text-gray-500">District:</span> {fault.district}</p>
                              <p><span className="text-gray-500">Issue:</span> {fault.description}</p>
                              <p><span className="text-gray-500">Time:</span> {fault.timestamp}</p>
                            </div>
                          </div>
                          {/* Tooltip arrow */}
                          <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-px">
                            <div className="border-8 border-transparent border-t-gray-800" />
                          </div>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 z-10 pointer-events-auto">
          <Card className="p-4 bg-gray-800/95 border-gray-700 backdrop-blur-sm shadow-xl">
            <h4 className="font-semibold text-white mb-3 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Fault Severity Levels
            </h4>
            <div className="space-y-2">
              {Object.entries(severityConfig).map(([key, config]) => {
                const Icon = config.icon;
                const count = mockFaultData.filter(f => f.severity === key).length;
                return (
                  <div key={key} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${config.color} border border-white ${key === 'critical' ? 'animate-pulse' : ''}`} />
                      <span className="text-gray-300">{config.label}</span>
                    </div>
                    <span className="text-gray-400 font-mono">({count})</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-400">
                Total Incidents: <span className="font-bold text-white">{mockFaultData.length}</span>
              </p>
            </div>
          </Card>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-auto">
          <Card className="p-3 bg-gray-800/95 border-gray-700 backdrop-blur-sm shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-red-500 text-2xl font-bold">{mockFaultData.filter(f => f.severity === 'critical').length}</p>
                <p className="text-xs text-gray-400">Critical</p>
              </div>
              <div>
                <p className="text-orange-500 text-2xl font-bold">{mockFaultData.filter(f => f.severity === 'high').length}</p>
                <p className="text-xs text-gray-400">High Priority</p>
              </div>
              <div>
                <p className="text-yellow-500 text-2xl font-bold">{mockFaultData.filter(f => f.severity === 'medium').length}</p>
                <p className="text-xs text-gray-400">Medium</p>
              </div>
              <div>
                <p className="text-green-500 text-2xl font-bold">{mockFaultData.filter(f => f.severity === 'low').length}</p>
                <p className="text-xs text-gray-400">Low Priority</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Selected Fault Details */}
      {selectedFaultData && (
        <Card className="p-4 bg-gray-800 border-gray-700 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className={`w-5 h-5 ${severityConfig[selectedFaultData.severity].textColor}`} />
                <h3 className="font-bold text-white text-lg">{selectedFaultData.name}</h3>
                <Badge variant={severityConfig[selectedFaultData.severity].badgeVariant}>
                  {severityConfig[selectedFaultData.severity].label}
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">District</p>
                  <p className="text-white font-medium">{selectedFaultData.district}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Location</p>
                  <p className="text-white font-medium">{selectedFaultData.lat.toFixed(4)}, {selectedFaultData.lng.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Issue Description</p>
                  <p className="text-white font-medium">{selectedFaultData.description}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Reported</p>
                  <p className="text-white font-medium">{selectedFaultData.timestamp}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedFault(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </Card>
      )}
    </div>
  );
};
