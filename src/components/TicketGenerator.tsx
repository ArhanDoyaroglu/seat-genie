import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Upload, User } from "lucide-react";
import { Ticket } from "./Ticket";
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

export function TicketGenerator() {
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState<string>();
  const [generatedTicket, setGeneratedTicket] = useState<TicketData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateRandomSeat = () => ({
    gate: Math.floor(Math.random() * 50) + 1,
    row: Math.floor(Math.random() * 100) + 1,
    seat: Math.floor(Math.random() * 50) + 1,
  });

  const generateTicketId = () => {
    const timestamp = Date.now().toString().slice(-6);
    return `ANO-${timestamp}`;
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!name.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const seat = generateRandomSeat();
    const ticketData: TicketData = {
      id: generateTicketId(),
      name: name.trim(),
      profileImage,
      date: "25 Eylül",
      gate: seat.gate,
      row: seat.row,
      seat: seat.seat,
      price: "1 $XAN",
    };
    
    setGeneratedTicket(ticketData);
    setIsGenerating(false);
  };

  const handleNewTicket = () => {
    setGeneratedTicket(null);
    setName("");
    setProfileImage(undefined);
  };

  if (generatedTicket) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-8">
          <Ticket data={generatedTicket} />
          <div className="text-center">
            <Button
              onClick={handleNewTicket}
              variant="ticket"
              size="lg"
              className="px-8"
            >
              Yeni Bilet Oluştur
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <img 
              src={anoLogo} 
              alt="ANO Logo" 
              className="w-24 h-24 object-contain"
            />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              BİLETİNİ AL
            </h1>
            <p className="text-muted-foreground text-lg">
              25 Eylül için biletini oluştur!
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="p-6 bg-secondary/50 backdrop-blur-sm border-border shadow-card">
          <div className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                İsim
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="İsminizi girin"
                className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Profile Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Profil Fotoğrafı (Opsiyonel)
              </label>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="bg-background/50 border-border text-foreground hover:bg-background/70"
                    asChild
                  >
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Yükle
                    </span>
                  </Button>
                </label>
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={!name.trim() || isGenerating}
              variant="generate"
              size="lg"
              className="w-full"
            >
              {isGenerating ? "Oluşturuluyor..." : "Oluştur"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}