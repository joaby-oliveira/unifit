  import { Button } from "@/components/ui/button";
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import api from "@/lib/api";
  import { useQueryClient } from "@tanstack/react-query";
  import { Trash2 } from "lucide-react";
  import { useState } from "react";
  import { toast } from "sonner";

  export function DeleteUser(props: { user: User }) {
    const { user } = props;
    const queryClient = useQueryClient();
    const [modalOpen, setModalOpen] = useState(false);

    const deleteUser = async () => {
      await api.delete(`/user/${user.id}`);

      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      });

      toast.success("Usuário deletado com sucesso");

      setModalOpen(false);
    };

    return (
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant="outline">
            <Trash2 />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-4">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold">
              Apagar usuário
            </DialogTitle>
            <DialogDescription>
              Deseja realmente apagar o usuário? <br />
              Ele tera que criar uma nova conta para utilizar a plataforma
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="destructive" onClick={deleteUser}>
              Apagar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
