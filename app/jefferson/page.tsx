"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JeffersonFloorPlan } from "@/components/jefferson-floor-plan";

export default function JeffersonPage() {
  return (
    <div>
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-semibold mb-2">Jefferson Laboratory</h1>
          <p className="text-muted-foreground">
            Interactive floor plans showing lab locations, offices, and facilities
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <JeffersonFloorPlan />
        
        {/* Additional info about Jefferson */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">About Jefferson Laboratory</h3>
                <p className="text-sm text-muted-foreground">
                  Built in 1884, Jefferson Laboratory was the first university building in America 
                  dedicated entirely to physics research. It houses the main Physics Department 
                  offices and several active research groups.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Getting There</h3>
                <p className="text-sm text-muted-foreground">
                  Located at 17 Oxford Street, accessible from behind the Science Center. These maps
                  should be used as a reference. Its creators are not responsible for any errors or
                  discrepancies between the depiction and reality.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Research Areas</h3>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="text-xs">Ultrafast Optics</Badge>
                  <Badge variant="secondary" className="text-xs">Quantum Materials</Badge>
                  <Badge variant="secondary" className="text-xs">High Energy Theory</Badge>
                  <Badge variant="secondary" className="text-xs">Quantum Gravity</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
