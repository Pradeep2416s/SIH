import { Card } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle2, Phone, Zap } from "lucide-react";

export const SafetyInfoTab = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="p-6 bg-destructive/10 border-destructive/20">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-destructive flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-destructive mb-2">Emergency Contact Numbers</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Emergency Helpline</p>
                <p className="text-3xl font-bold text-destructive">1912</p>
                <p className="text-xs text-muted-foreground">24/7 Helpline</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Fire & Rescue</p>
                <p className="text-3xl font-bold text-destructive">101</p>
                <p className="text-xs text-muted-foreground">Emergency Services</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Police</p>
                <p className="text-3xl font-bold text-destructive">100</p>
                <p className="text-xs text-muted-foreground">Local Police</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <h3 className="text-lg font-bold">Emergency Procedures</h3>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <span className="text-destructive font-bold">1.</span>
              <span>Never touch fallen or damaged power lines - stay at least 10 meters away</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive font-bold">2.</span>
              <span>Keep away from water near electrical equipment or exposed wires</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive font-bold">3.</span>
              <span>Call emergency services (1912) immediately when you spot electrical hazards</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive font-bold">4.</span>
              <span>Evacuate the area if you smell gas or see sparks</span>
            </li>
            <li className="flex gap-2">
              <span className="text-destructive font-bold">5.</span>
              <span>Do not attempt repairs yourself - wait for qualified personnel</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-success" />
            </div>
            <h3 className="text-lg font-bold">Prevention Tips</h3>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
              <span>Schedule regular electrical system maintenance and inspections</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
              <span>Install proper voltage stabilizers for sensitive equipment</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
              <span>Avoid overloading electrical circuits and power strips</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
              <span>Install circuit breakers and ELCB (Earth Leakage Circuit Breaker)</span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
              <span>Keep electrical appliances away from water sources</span>
            </li>
          </ul>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-warning" />
          </div>
          <h3 className="text-lg font-bold">Common Electrical Hazards</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2">⚡ Exposed Wiring</h4>
            <p className="text-sm text-muted-foreground">
              Damaged or exposed electrical wiring can cause shocks and fires. Report immediately.
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2">💧 Water Contact</h4>
            <p className="text-sm text-muted-foreground">
              Water near electrical equipment or outlets creates serious electrocution risk.
            </p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <h4 className="font-semibold mb-2">⚠️ Overloading</h4>
            <p className="text-sm text-muted-foreground">
              Too many devices on one circuit can cause overheating and fire hazards.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-info/10 border-info/20">
        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 text-info flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-bold mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              If you have questions about electrical safety or need to report a non-emergency issue, 
              use our consumer portal to report a non-emergency issue.
            </p>
            <p className="text-sm">
              <span className="font-medium">Customer Care:</span> 1800-425-7181 (Toll Free)
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
