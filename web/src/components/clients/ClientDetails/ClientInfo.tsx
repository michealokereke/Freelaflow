import { Card } from "@/components/ui/card";
import { ClientDetailsT } from "@/types/clientReqT";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const ClientInfo: React.FC<{ clientInfo: ClientDetailsT }> = ({
  clientInfo,
}) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p>{clientInfo.email ? clientInfo.email : "Nill"}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p>{clientInfo.phone ? clientInfo.phone : "Nill"}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p>{clientInfo.address ? clientInfo.address : "Nill"}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ClientInfo;
