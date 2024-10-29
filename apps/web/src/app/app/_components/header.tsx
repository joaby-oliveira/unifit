import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { User, Flame, Dumbbell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface User {
  id: number
  email: string
  accessLevel: string
  name: string
  status: string
  ra: string
  cellphoneNumber: string
  profilePicture: any
  createdAt: string
  updatedAt: string
}


async function getUserInfo(token: string): Promise<User> {
  const { data } = await axios.get("http://localhost:3001/user/6", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
}

export function Header() {
  const router = useRouter();
  const { logout, getToken } = useAuthStore();
  const token = getToken();

  function logoutUser() {
    logout();
    router.push("/auth");
  }

  const { data } = useQuery({
    queryKey: ["get-user-info"],
    queryFn: () => getUserInfo(token!),
  });

  return (
    <header className="w-full flex justify-between items-center p-2 bg-primary rounded">
      <Dumbbell />

      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center gap-1 font-bold">
          0
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
            <DropdownMenuLabel>{data?.ra}</DropdownMenuLabel>
            <DropdownMenuItem className="text-red-700" onClick={logoutUser}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
