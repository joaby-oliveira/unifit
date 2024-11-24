"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { UsersList } from "./_components/users-list";
import { useState } from "react";

type UserStatus = User["status"];

async function getUsers(filter: UserStatus): Promise<User[]> {
  const { data } = await api.get(`/user/${filter}`);
  return data.data;
}

export default function UsersPage() {
  const [typeUsers, setTypeUser] = useState<UserStatus>("active");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["get-users", typeUsers],
    queryFn: () => getUsers(typeUsers),
  });

  if (isLoading) {
    return (
      <span className="font-bold text-zinc-400 text-lg">
        Buscando usuários...
      </span>
    );
  }

  if (isError) {
    return (
      <span className="font-bold text-red-400 text-lg">
        Ocorreu um erro ao buscar os usuários
      </span>
    );
  }

  const handleUpdate = async () => {
    await refetch();
    toast.success("Lista de usuários atualizada");
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center p-2 gap-3">
      <div className="w-full flex justify-between">
        <span className="text-lg font-bold">Alunos</span>
        <span className="font-bold">Total: {data?.length}</span>
      </div>
      <div className="w-full flex justify-end gap-2">
        <Select value={typeUsers} onValueChange={(value) => setTypeUser(value as UserStatus)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um tipo de aluno" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
              <SelectItem value="waiting">Lista de espera</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button size="icon" onClick={handleUpdate}>
          <RefreshCcw />
        </Button>
      </div>
      <UsersList users={data!}></UsersList>
    </main>
  );
}
