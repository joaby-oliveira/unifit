import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import api from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type UserStatus = User["status"];

export function UpdateUserStatus(props: { user: User }) {
  const { user } = props;
  const queryClient = useQueryClient();
  const [newStatus, setNewStatus] = useState<UserStatus>(user.status);
  const [modalOpen, setModalOpen] = useState(false);

  const saveUser = async () => {
    await api.put(`/user/${user.id}`, {
      status: newStatus,
    });

    queryClient.invalidateQueries({
      queryKey: ["get-users"],
    });

    toast.success("Usuário atualizado com sucesso");

    setModalOpen(false);
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <Sparkles />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold">
            Alterar Status
          </DialogTitle>
        </DialogHeader>
        <div>
          <Label htmlFor="terms">Selecione o novo status:</Label>
          <Select
            defaultValue={user.status}
            value={newStatus}
            onValueChange={(value) => setNewStatus(value as UserStatus)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="waiting">Lista de espera</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button onClick={saveUser}>Salvar alteração</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
