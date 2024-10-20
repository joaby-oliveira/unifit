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

export function Header() {
  const router = useRouter();
  const { logout } = useAuthStore();

  function logoutUser() {
    logout();
    router.push("/auth");
  }

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
            <DropdownMenuLabel>Nome do usuário</DropdownMenuLabel>
            <DropdownMenuItem className="text-red-700" onClick={logoutUser}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
