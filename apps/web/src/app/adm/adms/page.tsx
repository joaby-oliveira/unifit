"use client";

import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { UsersList } from "../_components/users-list";
import { CreateAdm } from "../_components/create-adm";

async function getAdms(): Promise<User[]> {
  const { data } = await api.get("/user/adms/get-all");
  return data.data;
}

export default function UsersPage() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["get-users"],
    queryFn: getAdms,
  });

  if (isLoading) {
    return (
      <span className="font-bold text-zinc-400 text-lg">
        Buscando Administradores...
      </span>
    );
  }

  if (isError) {
    return (
      <span className="font-bold text-red-400 text-lg">
        Ocorreu um erro ao buscar os Administradores
      </span>
    );
  }

  const handleUpdate = async () => {
    await refetch();
    toast.success("Lista de administradores atualizada");
  };

  return (
    <main className="h-screen w-screen flex flex-col items-center p-2 gap-3">
      <div className="w-full flex justify-between">
        <span className="text-lg font-bold">Administradores</span>
        <span className="font-bold">Total: {data?.length}</span>
      </div>
      <div className="w-full flex justify-end gap-2">
        <CreateAdm />
        <Button size="icon" onClick={handleUpdate}>
          <RefreshCcw />
        </Button>
      </div>

      <UsersList users={data!}></UsersList>
    </main>
  );
}
