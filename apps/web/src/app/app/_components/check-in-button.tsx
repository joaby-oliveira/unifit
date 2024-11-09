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
  const [result, setResult] = useState("");

  async function checkInDay() {
    try {
      if (!result) {
        toast.error("Leia o QR Code para fazer o check-in");
        return;
      }

      await api.post("/checkin", { result });

      queryClient.invalidateQueries({
        queryKey: ["get-summary"],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function validateQrCode(value: string) {
    console.log(value)
  }

  return (
    <Drawer>
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
        {!result ? (
          <Scanner
            scanDelay={0}
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
          <Button onClick={checkInDay}>Enviar</Button>
          <DrawerClose>
            <Button className="w-full" variant="outline">
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
