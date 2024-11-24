import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import { Dumbbell, Flame, Home, Menu, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import api from "@/lib/api";
import Link from "next/link";
import { useState } from "react";

async function getStreakUser(userId: number): Promise<any> {
  const { data } = await api.get(`checkin/streak/${userId}`);
  return data;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();
  const { user } = useUserStore();

  function logoutUser() {
    logout();
    router.push("/auth");
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-streak-user"],
    queryFn: () => getStreakUser(user!.id),
  });

  const navigateCallBack = (href: string) => {
    router.push(href);
    setMenuOpen(false);
  };

  return (
    <header className="w-full flex justify-between items-center p-2 bg-primary rounded">
      <Dumbbell />

      <div className="flex items-center gap-2">
        {user?.role === "USER" ? (
          <div className="flex items-center justify-center gap-1 font-bold">
            {!isLoading && !isError ? data?.data : ""}
            <Flame />
          </div>
        ) : (
          <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
            <DrawerTrigger asChild>
              <Button size="icon" variant="default">
                <Menu />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-3 space-y-3">
              <DrawerHeader>
                <DrawerTitle>Selecione a pagina</DrawerTitle>
              </DrawerHeader>

              <Button onClick={() => navigateCallBack("/adm")}>
                <Home /> Home
              </Button>

              <Button onClick={() => navigateCallBack("/adm/users")}>
                <Users /> Alunos
              </Button>

              <Button onClick={() => navigateCallBack("/adm/adms")}>
                <Users /> Administradores
              </Button>
            </DrawerContent>
          </Drawer>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger>
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
