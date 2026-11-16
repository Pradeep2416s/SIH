console.log("🔑 ENV Key:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

// Kerala district coordinates (approximate)
const districts = [
  { name: "Thiruvananthapuram", faults: 3, region: "south", lat: 8.5241, lng: 76.9366 },
  { name: "Kollam", faults: 2, region: "south", lat: 8.8932, lng: 76.6141 },
  { name: "Pathanamthitta", faults: 1, region: "south", lat: 9.2640, lng: 76.7872 },
  { name: "Alappuzha", faults: 2, region: "central", lat: 9.4981, lng: 76.3388 },
  { name: "Kottayam", faults: 1, region: "central", lat: 9.5916, lng: 76.5222 },
  { name: "Idukki", faults: 4, region: "central", lat: 9.9189, lng: 76.9535 },
  { name: "Ernakulam", faults: 5, region: "central", lat: 10.1520, lng: 76.3922 },
  { name: "Thrissur", faults: 3, region: "central", lat: 10.5276, lng: 76.2144 },
  { name: "Palakkad", faults: 2, region: "central", lat: 10.7867, lng: 76.6548 },
  { name: "Malappuram", faults: 3, region: "north", lat: 11.0510, lng: 76.0711 },
  { name: "Kozhikode", faults: 4, region: "north", lat: 11.2588, lng: 75.7804 },
  { name: "Wayanad", faults: 1, region: "north", lat: 11.6854, lng: 76.1320 },
  { name: "Kannur", faults: 2, region: "north", lat: 11.8745, lng: 75.3704 },
  { name: "Kasaragod", faults: 1, region: "north", lat: 12.4996, lng: 74.9850 },
];

// Map risk levels to marker colors
const getRiskColor = (faults: number) => {
  if (faults >= 4) return "red";
  if (faults >= 3) return "yellow";
  if (faults >= 2) return "blue";
  return "green";
};

export const KeralaMap = () => {
  console.log("Google API Key Loaded:", import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const selected = districts.find(d => d.name === selectedDistrict);

  const VITE_GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <div>Loading map…</div>;
  }

  return (
    <div className="space-y-6">
      {/* Google Map */}
      <div className="relative rounded-lg overflow-hidden min-h-[600px]">
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "600px",
          }}
          center={{ lat: 10.1632, lng: 76.6413 }} // Kerala center
          zoom={7}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          {/* District Markers */}
          {districts.map((d) => (
            <Marker
              key={d.name}
              position={{ lat: d.lat, lng: d.lng }}
              label={{
                text: d.name[0], // First letter
                color: "black",
                fontSize: "14px",
                fontWeight: "bold",
              }}
              icon={{
                path: window.google?.maps?.SymbolPath.CIRCLE,
                fillColor: getRiskColor(d.faults),
                fillOpacity: 1,
                strokeWeight: 1,
                scale: 10,
              }}
              onClick={() => setSelectedDistrict(d.name)}
            />
          ))}
        </GoogleMap>
      </div>

      {/* Selected District Details */}
      {selected && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <h4 className="font-semibold mb-2">{selected.name} District</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Active Faults</p>
              <p className="text-2xl font-bold">{selected.faults}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Region</p>
              <p className="text-lg font-medium capitalize">{selected.region}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <Badge
                className="text-white"
                style={{ backgroundColor: getRiskColor(selected.faults) }}
              >
                {selected.faults >= 4
                  ? "Critical"
                  : selected.faults >= 3
                  ? "High"
                  : selected.faults >= 2
                  ? "Medium"
                  : "Low"}
              </Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Response Time</p>
              <p className="text-lg font-medium">2.5h avg</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
