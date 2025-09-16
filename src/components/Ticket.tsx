import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import QRCode from "qrcode";
import anoLogo from "@/assets/ano-logo.png";

interface TicketData {
  id: string;
  name: string;
  profileImage?: string;
  date: string;
  gate: number;
  row: number;
  seat: number;
  price: string;
}

interface TicketProps {
  data: TicketData;
}

export function Ticket({ data }: TicketProps) {
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (qrCanvasRef.current) {
      QRCode.toCanvas(
        qrCanvasRef.current,
        `ANO-TICKET-${data.id}`,
        {
          width: 120,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        }
      );
    }
  }, [data.id]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="relative overflow-hidden bg-gradient-card shadow-card">
        {/* Limited Edition Ribbon */}
        <div className="absolute top-0 right-0 z-10">
          <div className="bg-gradient-primary text-white px-4 py-2 text-sm font-semibold transform rotate-45 translate-x-6 translate-y-4 shadow-lg">
            LIMITED EDITION
          </div>
        </div>

        <div className="flex">
          {/* Left Side - Dark Section */}
          <div className="w-1/3 bg-gradient-hero p-8 flex flex-col items-center justify-center text-white">
            <img 
              src={anoLogo} 
              alt="ANO Logo" 
              className="w-20 h-20 object-contain mb-4"
            />
          </div>

          {/* Right Side - White Section */}
          <div className="flex-1 p-8 relative">
            {/* Header */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                LIVE ANO
              </p>
              <h1 className="text-4xl font-bold text-card-foreground mb-2">
                ANO
              </h1>
              <h2 className="text-4xl font-bold text-card-foreground">
                {data.date.toUpperCase()}
              </h2>
            </div>

            {/* Attendee Info */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                {data.profileImage ? (
                  <img 
                    src={data.profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  ATTENDEE
                </p>
                <p className="text-xl font-semibold text-card-foreground">
                  {data.name}
                </p>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="flex gap-4 mb-8">
              <Button
                variant="outline"
                className="bg-muted/20 border-muted text-card-foreground hover:bg-muted/30"
              >
                {data.date.toUpperCase()}
              </Button>
              <Button
                variant="outline"
                className="bg-muted/20 border-muted text-card-foreground hover:bg-muted/30"
              >
                PRICE: {data.price}
              </Button>
            </div>

            {/* Right Side Info */}
            <div className="absolute top-8 right-8 text-right space-y-6">
              {/* Ticket ID */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  TICKET ID
                </p>
                <p className="text-lg font-mono font-semibold text-card-foreground">
                  {data.id}
                </p>
              </div>

              {/* QR Code */}
              <div className="flex justify-end">
                <canvas ref={qrCanvasRef} className="border border-muted rounded" />
              </div>

              {/* Seat Info */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    GATE
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {data.gate.toString().padStart(2, '0')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    ROW
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {data.row.toString().padStart(2, '0')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    SEAT
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {data.seat.toString().padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>

            {/* Perforated Line */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full">
              <div className="border-t border-dashed border-muted/30"></div>
            </div>
          </div>
        </div>

        {/* Bottom Date */}
        <div className="bg-muted/10 px-8 py-4 text-center border-t border-muted/30">
          <p className="text-sm text-muted-foreground">
            See you on {data.date}!
          </p>
        </div>
      </Card>
    </div>
  );
}