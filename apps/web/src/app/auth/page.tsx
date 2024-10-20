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
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

const authFormSchema = z.object({
  email: z
    .string({ message: "Campo obrigatório" })
    .email("Informe um email válido"),
  password: z
    .string({ message: "Campo obrigatório" })
    .min(8, "Informe a quantidade minima de caracteres"),
});

type LoginForm = z.infer<typeof authFormSchema>;

export default function AuthPage() {
  const router = useRouter();

  const form = useForm<LoginForm>({
    resolver: zodResolver(authFormSchema),
  });

  async function onSubmit(values: LoginForm) {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/user/auth",
        values
      );

      localStorage.setItem("accessToken", data.data.access_token);

      router.push("/app");

      toast(data.message);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  }

  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Preencha seu email e senha para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="unifit@example.com"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel asChild>
                      <div className="flex items-center">
                        <Label htmlFor="password">Senha</Label>
                        <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm underline text-black"
                        >
                          Esqueceu sua senha?
                        </Link>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="malhar@123"
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
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={form.handleSubmit(onSubmit)} className="w-full">
            Entrar
          </Button>
          <Link
            href="/sign-up"
            className="w-full text-center inline-block text-sm underline text-black"
          >
            Não possui conta? clique aqui!
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
