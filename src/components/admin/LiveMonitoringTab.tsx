import { KeralaMap } from "@/components/KeralaMap";
import { Card } from "@/components/ui/card";
import { BadgeCheck, AlertTriangle, Power, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { subscribeToPath } from "@/firebase";
import { useLanguage } from "@/contexts/LanguageContext";



// Pole data with status information
const polesData = {
  "S2-P01": { street: "Street 1", name: "S2-P01", status: "operational", color: "green" },
  "S3-P01": { street: "Street 2", name: "S3-P01", status: "operational", color: "green" },
};

// Map poles to the corresponding line data label (used for message box)
const poleToLine: Record<string, string> = {
  "S2-P01": "Line Data 2",
  "S3-P01": "Line Data 3",
};

export const LiveMonitoringTab = () => {
  const { t } = useLanguage();
  const [selectedPole, setSelectedPole] = useState("S3-P01");
  const currentPole = polesData[selectedPole as keyof typeof polesData];

  // Message box acknowledgement state
  const [acknowledged, setAcknowledged] = useState(false);

  // District selection state
  const [district, setDistrict] = useState<string>("Thiruvananthapuram");

  // Firebase RTDB state for linedata2 and linedata3
  const [line2, setLine2] = useState<any>(null);
  const [line, setLine] = useState<any>(null);
  const [line3, setLine3] = useState<any>(null);
  const [line3Pole2, setLine3Pole2] = useState<any>(null);

  // Subscribe to Firebase RTDB paths
  useEffect(() => {
    const unsub2 = subscribeToPath("street2", (val) => {
      // attach local receive timestamp if not provided by RTDB
      console.log("Firebase street2 data:", val);
      if (val && typeof val === 'object') setLine2({ ...val, timestamp: val.timestamp ?? Date.now() });
      else setLine2({ Vin: val, timestamp: Date.now() });
    });
    const unsub = subscribeToPath("linedata", (val) => {
      if (val && typeof val === 'object') setLine({ ...val, timestamp: val.timestamp ?? Date.now() });
      else setLine({ Vin: val, timestamp: Date.now() });
    });
    const unsub3 = subscribeToPath("street1/pole1", (val) => {
      console.log("Firebase street1/pole1 data:", val);
      if (val && typeof val === 'object') setLine3({ ...val, timestamp: val.timestamp ?? Date.now() });
      else setLine3({ Vin: val, timestamp: Date.now() });
    });
    const unsub3Pole2 = subscribeToPath("street1/pole2", (val) => {
      console.log("Firebase street1/pole2 data:", val);
      if (val && typeof val === 'object') setLine3Pole2({ ...val, timestamp: val.timestamp ?? Date.now() });
      else setLine3Pole2({ Vout: val, timestamp: Date.now() });
    });
    return () => {
      try { unsub2(); } catch (e) {}
      try { unsub(); } catch (e) {}
      try { unsub3(); } catch (e) {}
      try { unsub3Pole2(); } catch (e) {}
    };
  }, []);

  // Normalize values: handle objects and primitives
  const normalizeData = (data: any) => {
    return typeof data === "object" && data !== null ? data : { Vin: data };
  };

  const l2Raw = normalizeData(line2);
  const lRaw = normalizeData(line);
  const l3Raw = normalizeData(line3);
  const l3Pole2Raw = normalizeData(line3Pole2);

  // Merge line3 data from both poles
  const l3MergedRaw = {
    ...l3Raw,
    ...l3Pole2Raw,
    timestamp: l3Raw?.timestamp ?? l3Pole2Raw?.timestamp ?? Date.now(),
  };



  // If Vin is below 100, treat as no mains: zero out all values
  if (
    l3MergedRaw.Vin !== undefined &&
    typeof l3MergedRaw.Vin === 'number' &&
    l3MergedRaw.Vin < 100
  ) {
    l3MergedRaw.Vin = 0;
    l3MergedRaw.Vout = 0;
    l3MergedRaw.Iin = 0;
    l3MergedRaw.Iout = 0;
    l3MergedRaw.status = 'no mains';
  }

  // Set status to "normal" if both Vin and Vout are greater than 170
  if (
    l3MergedRaw.Vin !== undefined &&
    l3MergedRaw.Vout !== undefined &&
    typeof l3MergedRaw.Vin === 'number' &&
    typeof l3MergedRaw.Vout === 'number' &&
    l3MergedRaw.Vin > 170 &&
    l3MergedRaw.Vout > 170
  ) {
    l3MergedRaw.status = 'normal';
  }

  // Set status to "breakage" if Vin > 170 and Vout < 100, and set Vout/Iout to 0
  if (
    l3MergedRaw.Vin !== undefined &&
    l3MergedRaw.Vout !== undefined &&
    typeof l3MergedRaw.Vin === 'number' &&
    typeof l3MergedRaw.Vout === 'number' &&
    l3MergedRaw.Vin > 170 &&
    l3MergedRaw.Vout < 100
  ) {
    l3MergedRaw.status = 'breakage';
    l3MergedRaw.Vout = 0;
    l3MergedRaw.Iout = 0;
  }

  // Set status to "no mains" if both Vin and Vout are less than 100
  if (
    l3MergedRaw.Vin !== undefined &&
    l3MergedRaw.Vout !== undefined &&
    typeof l3MergedRaw.Vin === 'number' &&
    typeof l3MergedRaw.Vout === 'number' &&
    l3MergedRaw.Vin < 100 &&
    l3MergedRaw.Vout < 100
  ) {
    l3MergedRaw.status = 'no mains';
  }



  // Play audio when Line Data 3 status becomes "breakage"
  const [previousLine3Status, setPreviousLine3Status] = useState<string | undefined>(undefined);
  const [warningAudio, setWarningAudio] = useState<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    const currentStatus = l3MergedRaw?.status;
    
    // Check if status just changed to "breakage"
    if (currentStatus === 'breakage' && previousLine3Status !== 'breakage') {
      // Stop any existing audio
      if (warningAudio) {
        warningAudio.pause();
        warningAudio.currentTime = 0;
      }
      
      // Play warning.mp3 from public folder
      const audioElement = new Audio('/warning.mp3');
      audioElement.loop = true; // loop so it keeps playing
      audioElement.play().catch((err) => {
        console.error('Failed to play warning audio:', err);
      });
      
      setWarningAudio(audioElement);
      
      // Stop the audio after 1 minute (60 seconds)
      const timeoutId = setTimeout(() => {
        audioElement.pause();
        audioElement.currentTime = 0;
        setWarningAudio(null);
      }, 60000); // 60000 ms = 1 minute
      
      return () => clearTimeout(timeoutId);
    } else if (currentStatus !== 'breakage' && warningAudio) {
      // If status is no longer breakage, stop the audio
      warningAudio.pause();
      warningAudio.currentTime = 0;
      setWarningAudio(null);
    }
    
    setPreviousLine3Status(currentStatus);
  }, [l3MergedRaw?.status, warningAudio]);

  const display2 = (l2Raw && l2Raw.Vin !== undefined && l2Raw.Vin !== null) ? l2Raw : null;
  const display = (lRaw && lRaw.Vin !== undefined && lRaw.Vin !== null) ? lRaw : null;
  let display3 = (l3MergedRaw && (l3MergedRaw.Vin !== undefined || l3MergedRaw.Vout !== undefined))
    ? l3MergedRaw
    : null;





  // Helper: map Firebase status to color (fault->red, normal/operational->green, no mains->gray/none, breakage->red)
  function getStatusColor(status: string | undefined) {
    if (!status) return "gray";
    const s = status.toLowerCase();
    if (s === "fault" || s === "breakage") return "red";
    if (s === "operational" || s === "normal") return "green";
    if (s === "no mains") return "gray";
    return "gray";
  }

  // Helper: check if status requires blinking animation (breakage)
  function shouldBlink(status: string | undefined) {
    if (!status) return false;
    return status.toLowerCase() === "breakage";
  }

  // Dynamic colors based on Firebase status
  const color2 = getStatusColor(display2?.status);
  const color = getStatusColor(display?.status);

  // Get color class name for pole indicator with animation
  function getColorClass(color: string, shouldBlinkBreakage: boolean = false) {
    const baseClass = (() => {
      switch(color) {
        case "red":
          return "bg-red-400 text-red-400";
        case "green":
          return "bg-green-400 text-green-400";
        default:
          return "bg-gray-400 text-gray-400";
      }
    })();
    
    const animation = shouldBlinkBreakage ? "animate-blink" : "animate-pulse";
    return `${baseClass} ${animation}`;
  }

  // Get status text for pole display
  function getStatusText(status: string | undefined) {
    if (!status) return t('liveMonitoring.unknown');
    const s = status.toLowerCase();
    if (s === 'operational' || s === 'normal') return t('liveMonitoring.operational');
    if (s === 'fault') return t('liveMonitoring.fault');
    if (s === 'breakage') return t('liveMonitoring.breakage');
    if (s === 'no mains') return t('liveMonitoring.noMains');
    return t('liveMonitoring.unknown');
  }

  // Format timestamp (ISO or ms) to local time string
  function formatTimestamp(ts: string | number | undefined) {
    if (!ts) return "—";
    try {
      return new Date(ts).toLocaleTimeString();
    } catch (e) {
      return String(ts);
    }
  }

  // Helper: check if a status means fault or breakage
  const isFaultStatus = (s: string | undefined) => {
    if (!s) return false;
    const t = s.toLowerCase();
    return t === "fault" || t === "breakage";
  };

  // Calculate pole counts
  // One phase = 1 pole, One street = 1 pole
  // Total Poles = (Number of unique streets for selected district/data)
  // Phases are only counted when NO district is selected
  
  // Get unique streets from poles (filtered if district is selected)
  const filteredPoles = district 
    ? Object.entries(polesData).filter(([, pole]) => pole.street.toLowerCase().includes(district.toLowerCase()) || district === "")
    : Object.entries(polesData);
  
  const uniqueStreets = new Set(filteredPoles.map(([, pole]) => pole.street)).size;
  
  // If district is selected, count only streets (minimum 1); otherwise count streets + phases
  const numPhases = district ? 0 : 3; // Phases only counted when no district selected
  const totalPoles = district ? Math.max(1, uniqueStreets) : numPhases + uniqueStreets;
  
  // Count faulty poles (both phases and streets that have faults)
  const poleFaultEntries = Object.entries(polesData).filter(([, pole]) => isFaultStatus(pole.status));
  const faultyCount = poleFaultEntries.length;
  
  // Normal Poles = Total Poles - Faulty Poles
  const normalCount = totalPoles - faultyCount;

  // Build a combined list of active faults from poles, phases and line feeds
  const activeFaults: Array<{ id: string; name: string; source: string; details?: string }> = [];

  // poles
  Object.entries(polesData).forEach(([id, pole]) => {
    if (isFaultStatus(pole.status)) {
      activeFaults.push({ id, name: id, source: "Pole", details: pole.street });
    }
  });

  // phases (from `display` only if Firebase data exists)
  ['R', 'Y', 'B'].forEach((phase) => {
    const pdata = (display && typeof display === 'object') ? (display[phase] ?? null) : null;
    if (pdata && isFaultStatus(pdata.status)) {
      activeFaults.push({ id: `Phase-${phase}`, name: `Phase ${phase}`, source: 'Phase', details: `Status: ${pdata.status}` });
    }
  });

  // line feeds - Line Data 2 (Street 1)
  if (display2 && isFaultStatus(display2?.status)) {
    activeFaults.push({ id: 'LineData2', name: 'Line Data 2 (Street 1)', source: 'Line', details: `Status: ${display2?.status}` });
  }
  
  // line feeds - Line Data 3 (Street 2) - check merged data for breakage/fault
  if (display3 && isFaultStatus(display3?.status)) {
    activeFaults.push({ id: 'LineData3', name: 'Line Data 3 (Street 2)', source: 'Line', details: `Status: ${display3?.status}` });
  }

  const activeFaultCount = activeFaults.length;

  // quick flags for line/pole fault states
  const isFault2 = isFaultStatus(display2?.status);
  const isFault3 = isFaultStatus(display3?.status);
  const isFaultPole = isFaultStatus(currentPole?.status);

  // Reset acknowledgement when fault set changes (new faults should re-show the box)
  useEffect(() => {
    setAcknowledged(false);
  }, [activeFaultCount]);

  return (
    <div className="space-y-8">
      {/* Blink animation overlay for faulted containers */}
      <style>{`
        @keyframes blinkBg { 0%,100% { box-shadow: none; } 50% { box-shadow: inset 0 0 0 1000px rgba(255,182,193,0.6); } }
        .blink-bg { animation: blinkBg 1s linear infinite; }
      `}</style>

      {/* District Selector */}
      <div>
        <Card className="p-4 bg-[#0d1527] border border-gray-600 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="text-white font-medium text-sm">{t('liveMonitoring.district')}</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="bg-gray-700 text-white border border-blue-500 rounded px-3 py-1 text-sm hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">{t('liveMonitoring.select')}</option>
                <option value="Munnar">Munnar</option>
                <option value="Thiruvananthapuram">Thiruvananthapuram</option>
              </select>
            </div>

            {district && (
              <div className="flex items-center gap-2">
                <span className="inline-block w-3 h-3 bg-green-400 rounded-full"></span>
                <p className="text-sm text-gray-300">{district}</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* ───────────────────────────────
          TOP SUMMARY CARDS
      ─────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Poles */}
        <Card className="p-6 bg-[#0e1628] border border-gray-700 rounded-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">{t('liveMonitoring.totalPoles')}</h3>
            <Zap className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-4xl font-bold text-white mt-4">{totalPoles}</p>
        </Card>

        {/* Faulty Poles */}
        <Card className="p-6 bg-[#0e1628] border border-red-700 rounded-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-red-400">{t('liveMonitoring.faultyPoles')}</h3>
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-4xl font-bold text-red-400 mt-4">{faultyCount}</p>
        </Card>

        {/* Normal Poles */}
        <Card className="p-6 bg-[#0e1628] border border-green-700 rounded-xl">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-green-400">{t('liveMonitoring.normalPoles')}</h3>
            <BadgeCheck className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-4xl font-bold text-green-400 mt-4">{normalCount}</p>
        </Card>

      </div>

      {/* Inline Fault Message Box (shows when there are active faults and not acknowledged) */}
      {activeFaultCount > 0 && !acknowledged && (
        <div className="w-full">
          <Card className="p-4 bg-red-50 border border-red-300 rounded-lg border-l-4 border-red-700">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-700 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-red-800 font-semibold">{t('liveMonitoring.activeFaultsTitle')}: {activeFaultCount}</h4>
                  <p className="text-sm text-red-700 mt-1">{t('liveMonitoring.activeFaultsDescription')}</p>
                  <ul className="mt-2 text-sm text-red-800 list-disc list-inside">
                    {activeFaults.map((f) => (
                      <li key={f.id}>
                        <span className="font-medium">{f.name}</span> ({f.source}){f.details ? ` — ${f.details}` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* OK button removed per request; message box is informational only */}
            </div>
          </Card>
        </div>
      )}

      {/* ───────────────────────────────
          PHASE SUMMARY (O / Y / B)
          Shown only when no district is selected
      ─────────────────────────────── */}
      {!district && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['R','Y','B'].map((phase) => {
          // Try to read phase object from `linedata` (display) - only show if data exists
          const pdata = (display && typeof display === 'object') ? (display[phase] ?? null) : null;
          const pdisplay = pdata && pdata.Vin !== undefined && pdata.Vin !== null ? pdata : null;
          
          // Only render if data exists
          if (!pdisplay) return null;
          
          const statusText = pdisplay?.status ?? 'unknown';
          const statusColor = getStatusColor(statusText);
          const pIsFault = isFaultStatus(pdisplay?.status);

          return (
            <Card key={phase} className={`p-4 bg-[#0d1527] border border-gray-700 rounded-lg ${pIsFault ? 'blink-bg' : ''}`}>
              <div className="flex items-center justify-between">
                <h4 className="text-md font-semibold text-white">{t('liveMonitoring.phase')} {phase}</h4>
                <span className={`px-2 py-1 rounded text-sm font-medium ${statusColor === 'red' ? 'text-red-400 bg-red-900/20' : statusColor === 'green' ? 'text-green-400 bg-green-900/20' : 'text-gray-300 bg-gray-900/20'}`}>
                  {statusText}
                </span>
              </div>

              <div className="mt-3 text-white text-sm space-y-1">
                <p>Vin: <span className="text-blue-300">{pdisplay?.Vin ?? '—'} V</span></p>
                <p>Vout: <span className="text-blue-300">{pdisplay?.Vout ?? '—'} V</span></p>
                <p>Iin: <span className="text-blue-300">{pdisplay?.Iin ?? '—'} A</span></p>
                <p>Iout: <span className="text-blue-300">{pdisplay?.Iout ?? '—'} A</span></p>
              </div>

              <p className={`mt-3 font-semibold text-sm ${statusColor === 'red' ? 'text-red-400' : statusColor === 'green' ? 'text-green-400' : 'text-gray-300'}`}>
                {t('liveMonitoring.status')}: {getStatusText(pdisplay?.status)}
              </p>

              <p className="text-sm text-gray-300">{t('liveMonitoring.lastUpdate')}: {formatTimestamp(pdisplay?.timestamp ?? pdisplay?.ts ?? pdisplay?.time)}</p>
            </Card>
          );
        })}
        </div>
      )}

      {/* Two Line Data containers: linedata2 and linedata3. Show based on district selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(district === '' || district === 'Munnar') && (
          <Card className={`p-6 bg-[#0d1527] border border-gray-700 rounded-xl ${isFault2 ? 'blink-bg' : ''}`}>
          <h3 className="text-lg font-semibold text-white mb-4">Line Data 2</h3>
          <p className="text-gray-400 text-sm mb-3">{t('liveMonitoring.realtimeSensorFeed')} 'street2'</p>

          <div className="space-y-1 text-white">
            <p>Vin: <span className="text-blue-300">{display2?.Vin ?? "—"} V</span></p>
            <p>Vout: <span className="text-blue-300">{display2?.Vout ?? "—"} V</span></p>
            <p>Iin: <span className="text-blue-300">{display2?.Iin ?? "—"} A</span></p>
            <p>Iout: <span className="text-blue-300">{display2?.Iout ?? "—"} A</span></p>
          </div>

          <p className={`font-semibold text-sm mt-4 ${getStatusColor(display2?.status) === 'red' ? 'text-red-400' : getStatusColor(display2?.status) === 'green' ? 'text-green-400' : 'text-gray-300'}`}>{t('liveMonitoring.status')}: {getStatusText(display2?.status)}</p>
          <p className="text-sm text-gray-300">{t('liveMonitoring.lastUpdate')}: {formatTimestamp(display2?.timestamp ?? display2?.ts ?? display2?.time)}</p>
        </Card>
        )}

        {(district === '' || district === 'Thiruvananthapuram') && (
        <Card className={`p-6 bg-[#0d1527] border border-gray-700 rounded-xl ${isFault3 ? 'blink-bg' : ''}`}>
          <h3 className="text-lg font-semibold text-white mb-4">Line Data 3</h3>
          <p className="text-gray-400 text-sm mb-3">{t('liveMonitoring.realtimeSensorFeed')} 'linedata3'</p>

          <div className="space-y-1 text-white">
            <p>Vin: <span className="text-blue-300">{display3?.Vin ?? "—"} V</span></p>
            <p>Vout: <span className="text-blue-300">{display3?.Vout ?? "—"} V</span></p>
            <p>Iin: <span className="text-blue-300">{display3?.Iin ?? "—"} A</span></p>
            <p>Iout: <span className="text-blue-300">{display3?.Iout ?? "—"} A</span></p>
          </div>

          <p className={`font-semibold text-sm mt-4 ${getStatusColor(display3?.status) === 'red' ? 'text-red-400' : getStatusColor(display3?.status) === 'green' ? 'text-green-400' : 'text-gray-300'}`}>{t('liveMonitoring.status')}: {getStatusText(display3?.status)}</p>
          <p className="text-sm text-gray-300">{t('liveMonitoring.lastUpdate')}: {formatTimestamp(display3?.timestamp ?? display3?.ts ?? display3?.time)}</p>
        </Card>
        )}
      </div>

      {/* ───────────────────────────────
          NETWORK & POLE DETAILS SECTION
      ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Network Topology */}
        <Card className="p-6 bg-[#0d1527] border border-gray-700 rounded-xl lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-2">{t('liveMonitoring.networkTopology')}</h3>
          <p className="text-gray-400 mb-6">{t('liveMonitoring.streetBranchesNetwork')}</p>

          <div className="w-full bg-[#101a33] rounded-xl p-10 space-y-8">
            {/* Top row: Phase poles - only show if NOT Thiruvananthapuram or Munnar */}
            {!["Thiruvananthapuram", "Munnar"].includes(district) && (
            <div className="flex items-end justify-evenly">
              {/* Phase R Pole */}
              <div 
                className="text-center cursor-pointer transform transition hover:scale-110"
              >
                <div className={`w-2 h-20 rounded-full mx-auto ${getColorClass(getStatusColor((demoDisplay?.R?.status)), shouldBlink((demoDisplay?.R?.status))).split(' ').slice(0, -1).join(' ')} ${getColorClass(getStatusColor((demoDisplay?.R?.status)), shouldBlink((demoDisplay?.R?.status))).split(' ').slice(-1)[0]}`}></div>
                <p className="text-blue-300 mt-2">{t('liveMonitoring.phase')} R</p>
                <p className="text-white font-bold">P-R</p>
                <p className={`${getColorClass(getStatusColor((demoDisplay?.R?.status)), shouldBlink((demoDisplay?.R?.status))).split(' ')[0].replace('bg-', 'text-')} text-sm`}>{getStatusText(demoDisplay?.R?.status)}</p>
              </div>

              {/* Phase Y Pole */}
              <div 
                className="text-center cursor-pointer transform transition hover:scale-110"
              >
                <div className={`w-2 h-20 rounded-full mx-auto ${getColorClass(getStatusColor((demoDisplay?.Y?.status)), shouldBlink((demoDisplay?.Y?.status))).split(' ').slice(0, -1).join(' ')} ${getColorClass(getStatusColor((demoDisplay?.Y?.status)), shouldBlink((demoDisplay?.Y?.status))).split(' ').slice(-1)[0]}`}></div>
                <p className="text-blue-300 mt-2">{t('liveMonitoring.phase')} Y</p>
                <p className="text-white font-bold">P-Y</p>
                <p className={`${getColorClass(getStatusColor((demoDisplay?.Y?.status)), shouldBlink((demoDisplay?.Y?.status))).split(' ')[0].replace('bg-', 'text-')} text-sm`}>{getStatusText(demoDisplay?.Y?.status)}</p>
              </div>

              {/* Phase B Pole */}
              <div 
                className="text-center cursor-pointer transform transition hover:scale-110"
              >
                <div className={`w-2 h-20 rounded-full mx-auto ${getColorClass(getStatusColor((demoDisplay?.B?.status)), shouldBlink((demoDisplay?.B?.status))).split(' ').slice(0, -1).join(' ')} ${getColorClass(getStatusColor((demoDisplay?.B?.status)), shouldBlink((demoDisplay?.B?.status))).split(' ').slice(-1)[0]}`}></div>
                <p className="text-blue-300 mt-2">{t('liveMonitoring.phase')} B</p>
                <p className="text-white font-bold">P-B</p>
                <p className={`${getColorClass(getStatusColor((demoDisplay?.B?.status)), shouldBlink((demoDisplay?.B?.status))).split(' ')[0].replace('bg-', 'text-')} text-sm`}>{getStatusText(demoDisplay?.B?.status)}</p>
              </div>
            </div>
            )}

            {/* Bottom row: Street 1 & Street 2 (map to linedata2 and linedata3) */}
            <div className="flex items-end justify-evenly">
              {/* Street 1 - only show if NOT Thiruvananthapuram */}
              {district !== "Thiruvananthapuram" && (
              <div
                className="text-center cursor-pointer transform transition hover:scale-110"
                onClick={() => setSelectedPole("S2-P01")}
              >
                <div className={`w-2 h-20 rounded-full mx-auto ${getColorClass(getStatusColor(display2?.status), shouldBlink(display2?.status)).split(' ').slice(0, -1).join(' ')} ${getColorClass(getStatusColor(display2?.status), shouldBlink(display2?.status)).split(' ').slice(-1)[0]}`}></div>
                <p className="text-blue-300 mt-2">{t('liveMonitoring.street')} 1</p>
                <p className="text-white font-bold">S1</p>
                <p className={`${getColorClass(getStatusColor(display2?.status), shouldBlink(display2?.status)).split(' ')[0].replace('bg-', 'text-')} text-sm`}>{getStatusText(display2?.status)}</p>
              </div>
              )}

              {/* Street 2 - only show if NOT Munnar */}
              {district !== "Munnar" && (
              <div
                className="text-center cursor-pointer transform transition hover:scale-110"
                onClick={() => setSelectedPole("S3-P01")}
              >
                <div className={`w-2 h-20 rounded-full mx-auto ${getColorClass(getStatusColor(display3?.status), shouldBlink(display3?.status)).split(' ').slice(0, -1).join(' ')} ${getColorClass(getStatusColor(display3?.status), shouldBlink(display3?.status)).split(' ').slice(-1)[0]}`}></div>
                <p className="text-blue-300 mt-2">{t('liveMonitoring.street')} 2</p>
                <p className="text-white font-bold">S2</p>
                <p className={`${getColorClass(getStatusColor(display3?.status), shouldBlink(display3?.status)).split(' ')[0].replace('bg-', 'text-')} text-sm`}>{getStatusText(display3?.status)}</p>
              </div>
              )}
            </div>
          </div>
        </Card>

        {/* Pole Details */}
        <Card className={`p-6 bg-[#0d1527] border border-gray-700 rounded-xl ${isFaultPole || (selectedPole === "S3-P01" && display3?.status === "fault") ? 'blink-bg' : ''}`}>
          <h3 className="text-xl font-bold text-white mb-2">Pole Details</h3>
          <p className="text-gray-400 mb-6">Click on a pole to view details</p>

          <div className="text-center mt-10">
            {selectedPole === "S3-P01" ? (
              <>
                <p className="text-3xl font-bold text-white">Street 2</p>
                <p className="text-gray-400">Line Data 3</p>
                <p 
                  className={`text-lg font-semibold mt-4 ${
                    display3?.status === "normal" || display3?.status === "operational"
                      ? "text-green-700" 
                      : display3?.status === "breakage"
                      ? "text-red-700"
                      : display3?.status === "no mains"
                      ? "text-yellow-600"
                      : "text-gray-400"
                  }`}
                >
                  {display3?.status ? display3.status.charAt(0).toUpperCase() + display3.status.slice(1) : "Unknown"}
                </p>
              </>
            ) : (
              <>
                <p className="text-3xl font-bold text-white">{currentPole.name}</p>
                <p className="text-gray-400">{currentPole.street}, Pole 1</p>
                <p 
                  className={`text-lg font-semibold mt-4 ${
                    currentPole.status === "operational" 
                      ? "text-green-700" 
                      : "text-red-700"
                  }`}
                >
                  {currentPole.status.charAt(0).toUpperCase() + currentPole.status.slice(1)}
                </p>
              </>
            )}
          </div>
        </Card>

      </div>

      {/* Kerala Map Section */}
      <div className="mt-8">
        <Card className="p-6 bg-[#0e1628] border border-gray-700 rounded-xl">
          <h3 className="text-xl font-semibold mb-4 text-white">Kerala District Status Map</h3>
          <KeralaMap />
        </Card>
      </div>

    </div>
  );
};
