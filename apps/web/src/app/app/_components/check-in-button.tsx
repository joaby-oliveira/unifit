import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

export function CheckInButton() {
  const queryClient = useQueryClient();

  async function checkInDay() {
    try {
      await api.post("/checkin");

      queryClient.invalidateQueries({
        queryKey: ["get-summary"],
      });
    } catch (error) {
      console.log("Erro ao fazer check-in:", error);
    }
  }

  return (
    <Button onClick={checkInDay} className="w-full" size="lg">
      Fazer check-in
    </Button>
  );
}
