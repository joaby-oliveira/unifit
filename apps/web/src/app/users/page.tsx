// Lembrar de tipar [Linha 31:35]

"use client";

import { Button } from "@/components/ui/button";
import UsersList from "./_components/users-list";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const router = useRouter();
  const token = ""; // Inserir token pra teste
  
  const [commonMembers, setCommonMembers] = useState([]);
  const [admins, setAdmins] = useState([]);


  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const users = response.data.data;

        if (response.status !== 200) return;

        users.forEach(user => {
          if (user.accessLevel === "member") {
            setCommonMembers(prevCommonMembers => [...prevCommonMembers, user]);
          } else if (user.accessLevel === "admin") {
            setAdmins(prevAdmins => [...prevAdmins, user]); 
          }
        });

      } catch (error) {
        console.log("Ocorreu um erro:", error);
      }
    };
    getUsers();
  }, [token]);

  return (
    <main className="h-screen w-screen flex flex-col items-center p-2">
      <header className="w-full h-10"></header>

      <div className="w-full h-full ">
        <h1 className="font-bold text-xl">Alunos Cadastrados:</h1>
        <UsersList caption="Administradores" users={admins}/>
        <UsersList caption="Alunos" users={commonMembers}/>
        <Button className="w-full">Atualizar</Button>
      </div>
    </main>
  );
}
