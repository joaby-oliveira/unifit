"use client";

import { Button } from "@/components/ui/button";
import UsersList from "./_components/users-list";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/auth-store";

interface User {
  prop: string;  
  accessLevel: string;
}

export default function UsersPage() {
  const { getToken } = useAuthStore();
  const router = useRouter();
  const token = getToken();
  const [commonMembers, setCommonMembers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const users: User[] = response.data.data;

        if (response.status !== 200) return;

        users.forEach((user) => {
          if (user.accessLevel === "member") {
            setCommonMembers((prevCommonMembers) => [
              ...prevCommonMembers,
              user,
            ]);
          } else if (user.accessLevel === "admin") {
            setAdmins((prevAdmins) => [...prevAdmins, user]);
          }
        });
      } catch (error) {
        console.log("Ocorreu um erro:", error);
      }
    };
    getUsers();
  }, [token]);

  const handleUpdate = () => {
    router.refresh();
    toast.error("Lista de usuários atualizada");
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center p-2">
      <header className="w-full h-10"></header>

      <div className="w-full h-full ">
        <h1 className="font-bold text-xl">Lista de usuários</h1>
        {admins.length !== 0 ? (
          <UsersList caption="Administradores" users={admins} />
        ) : null}
        {commonMembers.length !== 0 ? (
          <UsersList caption="Alunos" users={commonMembers} />
        ) : null}
        <Button className="w-full" onClick={handleUpdate}>
          Atualizar
        </Button>
      </div>
    </main>
  );
}
