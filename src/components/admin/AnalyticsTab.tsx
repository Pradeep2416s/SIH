import { Card } from "@/components/ui/card";
import { AnalyticsCharts } from "@/components/AnalyticsCharts";
import { useState, useEffect, useRef } from "react";
import { subscribeToPath } from "@/firebase";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

type SensorReading = {
  Vin?: number;
  Vout?: number;
  Iin?: number;
  Iout?: number;
};

export const AnalyticsTab = () => {
  const [phaseRData] = useState<Array<{ time: string; Vin_R: number; Vout_R: number }>>([]);
  const [phaseYData] = useState<Array<{ time: string; Vin_Y: number; Vout_Y: number }>>([]);
  const [phaseBData] = useState<Array<{ time: string; Vin_B: number; Vout_B: number }>>([]);
  const [phaseRCurrentData] = useState<Array<{ time: string; Iin_R: number; Iout_R: number }>>([]);
  const [phaseYCurrentData] = useState<Array<{ time: string; Iin_Y: number; Iout_Y: number }>>([]);
  const [phaseBCurrentData] = useState<Array<{ time: string; Iin_B: number; Iout_B: number }>>([]);
  const [line2Data] = useState<Array<{ time: string; Vin_L2: number; Vout_L2: number }>>([]);
  const [line2CurrentData] = useState<Array<{ time: string; Iin_L2: number; Iout_L2: number }>>([]);
  const [line3Data, setLine3Data] = useState<Array<{ time: string; Vin_L3: number; Vout_L3: number }>>([]);
  const [line3CurrentData, setLine3CurrentData] = useState<Array<{ time: string; Iin_L3: number; Iout_L3: number }>>([]);
  const line3Pole1Ref = useRef<SensorReading | null>(null);
  const line3Pole2Ref = useRef<SensorReading | null>(null);

  // Live Line Data 3 from Firebase (street1/pole1 for Vin/Iin, street1/pole2 for Vout/Iout)
  useEffect(() => {
    const unsubPole1 = subscribeToPath("street1/pole1", (val) => {
      line3Pole1Ref.current = val;
    });
    const unsubPole2 = subscribeToPath("street1/pole2", (val) => {
      line3Pole2Ref.current = val;
    });
    return () => {
      unsubPole1();
      unsubPole2();
    };
  }, []);

  // Merge pole1/pole2 readings into chart series every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const pole1 = line3Pole1Ref.current;
      const pole2 = line3Pole2Ref.current;
      if (!pole1 && !pole2) return;

      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", { hour12: false });
      const Vin = pole1?.Vin;
      let Vout = pole2?.Vout;
      const Iin = typeof pole1?.Iin === "number" ? pole1.Iin : undefined;
      let Iout = typeof pole2?.Iout === "number" ? pole2.Iout : undefined;

      // Determine status and apply breakage logic
      if (
        Vin !== undefined &&
        Vout !== undefined &&
        typeof Vin === 'number' &&
        typeof Vout === 'number' &&
        Vin > 170 &&
        Vout < 100
      ) {
        // Status is breakage - set Vout and Iout to 0
        Vout = 0;
        Iout = 0;
      }

      if (Vin !== undefined || Vout !== undefined) {
        setLine3Data((prev) => {
          const updated = [...prev, { time: timeStr, Vin_L3: Vin, Vout_L3: Vout }];
          return updated.length > 60 ? updated.slice(-60) : updated;
        });
      }

      if (Iin !== undefined || Iout !== undefined) {
        // If Vin < 100, set currents to 0
        let displayIin = Iin;
        let displayIout = Iout;
        if (typeof Vin === 'number' && Vin < 100) {
          displayIin = 0;
          displayIout = 0;
        }

        setLine3CurrentData((prev) => {
          const updated = [...prev, { time: timeStr, Iin_L3: displayIin, Iout_L3: displayIout }];
          return updated.length > 60 ? updated.slice(-60) : updated;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Top summary cards removed per request */}

      {/* Phase R - Voltage and Current Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phase R Live Voltage Graph */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Phase R - Live Voltage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={phaseRData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="Vin_R" stroke="#3B82F6" strokeWidth={2} dot={false} name="Vin_R (V)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
              <Line type="monotone" dataKey="Vout_R" stroke="#10B981" strokeWidth={2} dot={false} name="Vout_R (V)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Phase R Live Current Graph */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Phase R - Live Current</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={phaseRCurrentData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="Iin_R" stroke="#FBBF24" strokeWidth={2} dot={false} name="Iin_R (A)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
              <Line type="monotone" dataKey="Iout_R" stroke="#EF4444" strokeWidth={2} dot={false} name="Iout_R (A)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Phase Y - Voltage and Current Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phase Y Live Voltage Graph */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Phase Y - Live Voltage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={phaseYData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="Vin_Y" stroke="#3B82F6" strokeWidth={2} dot={false} name="Vin_Y (V)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
              <Line type="monotone" dataKey="Vout_Y" stroke="#10B981" strokeWidth={2} dot={false} name="Vout_Y (V)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Phase Y Live Current Graph */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Phase Y - Live Current</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={phaseYCurrentData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="Iin_Y" stroke="#FBBF24" strokeWidth={2} dot={false} name="Iin_Y (A)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
              <Line type="monotone" dataKey="Iout_Y" stroke="#EF4444" strokeWidth={2} dot={false} name="Iout_Y (A)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Phase B - Voltage and Current Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phase B Live Voltage Graph */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Phase B - Live Voltage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={phaseBData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="Vin_B" stroke="#3B82F6" strokeWidth={2} dot={false} name="Vin_B (V)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
              <Line type="monotone" dataKey="Vout_B" stroke="#10B981" strokeWidth={2} dot={false} name="Vout_B (V)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Phase B Live Current Graph */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Phase B - Live Current</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={phaseBCurrentData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="Iin_B" stroke="#FBBF24" strokeWidth={2} dot={false} name="Iin_B (A)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
              <Line type="monotone" dataKey="Iout_B" stroke="#EF4444" strokeWidth={2} dot={false} name="Iout_B (A)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Line Data 2 - Voltage and Current */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Line Data 2 - Live Voltage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={line2Data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="Vin_L2" stroke="#3B82F6" strokeWidth={2} dot={false} name="Vin_L2 (V)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
              <Line type="monotone" dataKey="Vout_L2" stroke="#10B981" strokeWidth={2} dot={false} name="Vout_L2 (V)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Line Data 2 - Live Current</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={line2CurrentData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="Iin_L2" stroke="#FBBF24" strokeWidth={2} dot={false} name="Iin_L2 (A)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
              <Line type="monotone" dataKey="Iout_L2" stroke="#EF4444" strokeWidth={2} dot={false} name="Iout_L2 (A)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Line Data 3 - Voltage and Current */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Line Data 3 - Live Voltage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={line3Data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" domain={[0, 300]} ticks={[0,30,60,90,120,150,180,210,240,270,300]} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="Vin_L3" stroke="#3B82F6" strokeWidth={2} dot={false} name="Vin_L3 (V)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
              <Line type="monotone" dataKey="Vout_L3" stroke="#10B981" strokeWidth={2} dot={false} name="Vout_L3 (V)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">Line Data 3 - Live Current</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={line3CurrentData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="Iin_L3" stroke="#FBBF24" strokeWidth={2} dot={false} name="Iin_L3 (A)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
              <Line type="monotone" dataKey="Iout_L3" stroke="#EF4444" strokeWidth={2} dot={false} name="Iout_L3 (A)" isAnimationActive={true} animationDuration={800} animationEasing="ease" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts */}
      <AnalyticsCharts />
    </div>
  );
};
