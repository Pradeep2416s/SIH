import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { subscribeToPath } from "@/firebase";

export const ConsumerReports = () => {
  const [pole1, setPole1] = useState<any>(null);
  const [pole2, setPole2] = useState<any>(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignedCrew, setAssignedCrew] = useState<string | null>(null);

  // subscribe to Line Data 3 poles (street1/pole1 and street1/pole2)
  useEffect(() => {
    const unsub1 = subscribeToPath("street1/pole1", (val) => setPole1(val));
    const unsub2 = subscribeToPath("street1/pole2", (val) => setPole2(val));
    return () => {
      try { unsub1(); } catch (e) {}
      try { unsub2(); } catch (e) {}
    };
  }, []);

  const mergedL3 = { ...(pole1 || {}), ...(pole2 || {}) };
  const isBreakage = (() => {
    const Vin = mergedL3?.Vin;
    const Vout = mergedL3?.Vout;
    if (mergedL3?.status && String(mergedL3.status).toLowerCase() === 'breakage') return true;
    if (typeof Vin === 'number' && typeof Vout === 'number') {
      return Vin > 170 && Vout < 100;
    }
    return false;
  })();

  const crew = ["Pradeep","Vikas","Shashank","Likhith","Parul","Aman"];
  // Map crew names to phone numbers
  const crewPhones: Record<string, string> = {
    Pradeep: "+919108086146",
    Vikas: "+919481227807",
    Shashank: "",
    Likhith: "",
    Parul: "",
    Aman: ""
  };

  function handleAssign(name: string) {
    // store assigned crew and close selector
    setAssignedCrew(name);
    setAssignOpen(false);

    // If we have a phone number for the crew, open WhatsApp with a prefille dmessage
    const phone = crewPhones[name];
    if (phone && phone.trim()) {
      try {
        const message = `You have been assigned to Line Data 3 breakage. Please respond.`;
        // Use wa.me link which works on mobile and desktop (if WhatsApp installed)
        const cleaned = phone.replace(/[^0-9]/g, "");
        const url = `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
      } catch (e) {
        // ignore window open failures
        console.error("Failed to open messaging link", e);
      }
    }
  }

  return (
    <Card className="p-6">
      {/* Line Data 3 Breakage / Assign Crew */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold">Line Data 3 — Breakage</h4>
            <p className="text-sm text-muted-foreground">Status: <span className="font-medium">{isBreakage ? 'Breakage' : 'OK'}</span></p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant={isBreakage ? undefined : 'outline'} onClick={() => setAssignOpen((s) => !s)} disabled={!isBreakage}>
              Assign crew
            </Button>
          </div>
        </div>

        {assignOpen && isBreakage && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {crew.map((c) => (
              <div key={c} className="flex items-center justify-between gap-2 bg-gray-800 p-2 rounded">
                <div className="text-sm text-white">{c}</div>
                <Button size="xs" onClick={() => handleAssign(c)}>Assign</Button>
              </div>
            ))}
          </div>
        )}
        {assignedCrew && (
          <div className="mt-4">
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 p-4 rounded-lg shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white text-lg font-bold">
                  {assignedCrew.split(" ").map(n => n[0]).join("").slice(0,2)}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-white/90">Assigned Crew</div>
                  <div className="text-xl font-semibold text-white">{assignedCrew}</div>
                  <div className="text-sm text-white/90">Line Data 3 — dispatched</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setAssignedCrew(null)}>Unassign</Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </Card>
  );
};
