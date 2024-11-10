"use client";

import { useQRCode } from "next-qrcode";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import api from "@/lib/api";

async function fetchQrCode(
  setSecondsRemaining: Dispatch<SetStateAction<number>>
): Promise<string> {
  const { data } = await api.post("/checkin/qrcode");
  setSecondsRemaining(60);
  return data.token;
}

export default function Page(): JSX.Element {
  const { Canvas } = useQRCode();
  const [secondsRemaining, setSecondsRemaining] = useState(60);

  // Requisição com React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["qrcode-datetime"],
    queryFn: () => fetchQrCode(setSecondsRemaining),
    refetchInterval: 60000,
  });

  // Efeito para atualizar o contador a cada segundo
  useEffect(() => {
    if (secondsRemaining > 0) {
      const timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Limpa o timer ao desmontar
    }
  }, [secondsRemaining]);

  if (isError) {
    return <span>Erro ao buscar o QR code</span>;
  }

  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center gap-4">
      {isLoading ? (
        <span className="font-bold text-zinc-500">
          Buscando um novo QR Code
        </span>
      ) : (
        <>
          <Canvas
            text={data!}
            options={{
              errorCorrectionLevel: "M",
              margin: 3,
              scale: 4,
              width: 200,
            }}
          />
          <span className="font-bold text-zinc-500">
            Próximo QR Code em: {secondsRemaining} segundos
          </span>
        </>
      )}
    </main>
  );
}
