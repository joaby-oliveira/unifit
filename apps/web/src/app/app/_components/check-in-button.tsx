import { Button } from "@/components/ui/button";
import useAuthStore from "@/stores/auth-store";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function CheckInButton() {
  const { getToken } = useAuthStore();
  const queryClient = useQueryClient();

  async function checkInDay() {
    const token = getToken();

    try {
      await axios.post(
        "http://localhost:3001/checkin",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
