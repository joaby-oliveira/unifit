"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const singUpFormSchema = z
  .object({
    name: z.string({ message: "Campo obrigatório" }).min(4),
    ra: z.coerce.number({ message: "Campo obrigatório" }).min(1),
    email: z
      .string({ message: "Campo obrigatório" })
      .email("Informe um email válido"),
    password: z
      .string({ message: "Campo obrigatório" })
      .min(8, "Informe a quantidade minima de caracteres"),
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

type SingUpForm = z.infer<typeof singUpFormSchema>;

export default function AuthPage() {
  const form = useForm<SingUpForm>({
    resolver: zodResolver(singUpFormSchema),
  });

  async function onSubmit(values: SingUpForm) {
    await fetch("http://localhost:3001/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...values }),
    });
  }

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Cadastrar</CardTitle>
          <CardDescription>
            Preencha os dados para criar uma conta!
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form className="space-y-4">
              <div className="flex gap-4">
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
                  name="ra"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>RA</FormLabel>
                      <FormControl>
                        <Input id="ra" type="number" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                      <Input
                        id="password"
                        type="password"
                        required
                        {...field}
                      />
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
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={form.handleSubmit(onSubmit)} className="w-full">
            Criar conta
          </Button>
          <Link
            href="/auth"
            className="w-full text-center inline-block text-sm underline text-black"
          >
            Já possui conta? clique aqui!
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
