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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createAdmFormSchema = z
  .object({
    name: z
      .string({ message: "Campo obrigatório" })
      .min(4, "Mínimo 4 caracteres"),
    email: z
      .string({ message: "Campo obrigatório" })
      .email("Informe um email válido"),
    password: z
      .string({ message: "Campo obrigatório" })
      .min(8, "Informe a quantidade mínima de 8 caracteres"),
    confirmPassword: z.string({ message: "Campo obrigatório" }).min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não são iguais!",
        path: ["confirmPassword"],
      });
    }
  });

type CreateAdmForm = z.infer<typeof createAdmFormSchema>;

export function CreateAdm() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const form = useForm<CreateAdmForm>({
    resolver: zodResolver(createAdmFormSchema),
  });

  const createAdm = async (data: CreateAdmForm) => {
    try {
      await api.post(`/user/adm`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      queryClient.invalidateQueries({
        queryKey: ["get-users"],
      });

      toast.success("Administrador criado com sucesso");
      setModalOpen(false);
    } catch (error) {
      toast.error("Erro ao criar administrador");
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button size="icon">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-4">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold">
            Criar administrador
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(createAdm)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input id="name" type="text" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Criar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
