import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import QRCode from "qrcode";
import anoLogo from "@/assets/anomaLogo.png";

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
        `https://x.com/anoma`,
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
      <Card className="relative overflow-hidden bg-gradient-card shadow-card rounded-2xl border border-slate-200/60">
        {/* Limited Edition Ribbon */}
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-gradient-primary text-white px-3 py-1 text-xs font-semibold transform rotate-12 shadow-lg rounded">
            LIMITED EDITION
          </div>
        </div>

        <div className="flex">
          {/* Left Side - Dark Section */}
            <div className="w-1/3 bg-gradient-to-br from-slate-900 to-slate-800 p-10 md:p-12 flex flex-col items-center justify-center text-white relative">
            <img 
              src={anoLogo} 
              alt="Xantothemoon Logo" 
              className="w-28 h-28 md:w-32 md:h-32 object-contain mb-4 drop-shadow-xl"
            />
          </div>

          {/* Perforation Divider */}
          <div
            className="hidden md:block absolute inset-y-6"
            style={{ left: "33.333%" }}
          >
            <div className="h-full w-px bg-gradient-to-b from-transparent via-slate-300/70 to-transparent" />
          </div>

          {/* Right Side - White Section */}
          <div className="flex-1 p-8 relative">
            {/* Watermark */}
            <img
              src={anoLogo}
              alt=""
              aria-hidden
              className="pointer-events-none select-none hidden md:block absolute -right-8 -top-8 w-64 h-64 opacity-5"
            />
            {/* Header */}
            <div className="mb-6">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">
                  LIVE ANOMA
                </p>
              <h1 className="text-4xl font-bold text-card-foreground mb-2">
                XANTOTHEMOON
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
            <div className="absolute top-16 right-8 text-right space-y-6 z-10">
              {/* Ticket ID */}
              <div className="bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  TICKET ID
                </p>
                <p className="text-lg font-mono font-bold text-card-foreground">
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

          </div>
        </div>

      </Card>
    </div>
  );
}