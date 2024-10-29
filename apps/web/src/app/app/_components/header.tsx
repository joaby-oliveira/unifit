import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/stores/auth-store";
import useUserStore from "@/stores/user-store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dumbbell, Flame, User } from "lucide-react";
import { useRouter } from "next/navigation";

async function getStreakUser(token: string, userId: number): Promise<any> {
  const { data } = await axios.get(
    `http://localhost:3001/checkin/streak/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
}

export function Header() {
  const router = useRouter();
  const { logout, getToken } = useAuthStore();
  const { user } = useUserStore();
  const token = getToken();

  function logoutUser() {
    logout();
    router.push("/auth");
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-streak-user"],
    queryFn: () => getStreakUser(token!, user!.id),
  });

  return (
    <header className="w-full flex justify-between items-center p-2 bg-primary rounded">
      <Dumbbell />

      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center gap-1 font-bold">
          {!isLoading && !isError ? data?.data : ""}
          <Flame />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.ra}</DropdownMenuLabel>
            <DropdownMenuItem className="text-red-700" onClick={logoutUser}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
