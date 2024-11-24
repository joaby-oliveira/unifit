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
import api from "@/lib/api";
import useAuthStore from "@/stores/auth-store";
import useUserStore from "@/stores/user-store";
import { UserInterface } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { decode, JwtPayload } from "jsonwebtoken";
import { Dumbbell, Flame, Home, Menu, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

async function getStreakUser(userId: number): Promise<any> {
  const { data } = await api.get(`checkin/streak/${userId}`);
  return data;
}

async function getUserInfo(id: number): Promise<UserInterface> {
  const { data } = await api.get(`/user/${id}`);
  return data;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuthStore();
  const { user, setUser } = useUserStore();
  const { typeUser, userId } = useAuthStore();

  const {
    data: dataUser,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery({
    queryKey: ["get-user-info"],
    queryFn: () => getUserInfo(userId!),
  });

  const {
    data: dataStreak,
    isLoading: isLoadingStreak,
    isError: isErrorStreak,
  } = useQuery({
    queryKey: ["get-streak-user", dataUser],
    queryFn: () => getStreakUser(userId!),
  });

  useEffect(() => {
    if (!isLoadingUser && !isErrorUser) {
      setUser(dataUser!);
      console.log(dataUser);
    }
  }, [dataUser]);

  function logoutUser() {
    logout();
    router.push("/auth");
  }

  const navigateCallBack = (href: string) => {
    router.push(href);
    setMenuOpen(false);
  };

  return (
    <header className="w-full flex justify-between items-center p-2 bg-primary rounded">
      <Dumbbell />

      <div className="flex items-center gap-2">
        {typeUser === "USER" && (
          <div className="flex items-center justify-center gap-1 font-bold">
            {!isLoadingStreak && !isErrorStreak ? dataStreak?.data : ""}
            <Flame />
          </div>
        )}

        {typeUser === "ADMIN" && (
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
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuItem className="text-red-700" onClick={logoutUser}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
