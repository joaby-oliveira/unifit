import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { toast } from "sonner";

export function CheckInButton() {
  const queryClient = useQueryClient();
  const [checkinId, setCheckinId] = useState<number>();
  const [checkinValid, setCheckinValid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function validateQrCode(value: string) {
    try {
      const { data } = await api.post(
        "/checkin/confirm",
        {},
        {
          params: {
            encodedQrCode: value,
            checkInId: checkinId,
          },
        }
      );

      const checkinIsValid = data.data;

      if (!checkinIsValid) {
        toast.error("Erro ao validar o QrCode, tente novamente!", { dismissible: true, position: "top-center" });
        return;
      }

      setCheckinValid(checkinIsValid);

      queryClient.invalidateQueries({
        queryKey: ["get-summary"],
      });

      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function initCheckIn() {
    setIsOpen((state) => !state);
    
    if (!isOpen) {
      const checkin = await api.post("/checkin");
      setCheckinId(checkin.data.data.id);
    }
  }

  return (
    <Drawer open={isOpen} onOpenChange={initCheckIn}>
      <DrawerTrigger asChild>
        <Button className="w-full" size="lg">
          Fazer check-in
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Leia o QrCode</DrawerTitle>
          <DrawerDescription>Para completar o seu check-in</DrawerDescription>
        </DrawerHeader>

        {!checkinValid ? (
          <Scanner
            allowMultiple={true}
            scanDelay={2000}
            onError={() => toast.error("Erro ao ler o QRCode")}
            onScan={(result) => validateQrCode(result[0].rawValue)}
          />
        ) : (
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <Check className="size-11 text-emerald-600" />
            <span className="text-lg font-bold">
              Check-in autorizado, bom treino!
            </span>
          </div>
        )}

        <DrawerFooter>
          <DrawerClose>
            <Button className="w-full" variant="destructive">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
