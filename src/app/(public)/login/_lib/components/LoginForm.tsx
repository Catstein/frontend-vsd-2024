"use client";

import { MessageToast } from "@/components/MessageToast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useToken } from "@/contexts/useToken";
import { login } from "@/services/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const loginForm = z.object({
  email: z
    .string({ message: "Campo obrigatório" })
    .min(1, "Campo obrigatório")
    .email("Formato de e-mail inválido"),
  password: z
    .string({ message: "Campo obrigatório" })
    .min(8, "Campo obrigatório")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Senha deve conter ao menos 8 caracteres incluindo 1 número, 1 letra maiúscula e um símbolo"
    ),
});

export function LoginForm() {
  type LoginForm = z.infer<typeof loginForm>;

  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useToken();

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginForm),
  });

  function onSubmit(data: LoginForm) {
    setIsLoading(true);
    login({
      payload: {
        email: data.email,
        password: data.password,
      },
      config: {},
    })
      .then((res) => {
        console.log("res", res);
        toast((e) => (
          <MessageToast
            closeToast={e.closeToast}
            type="success"
            title="Login efetuado"
            text="Sucesso ao realizar login"
          />
        ));

        setToken(res.token);
      })
      .catch(() => {
        toast((e) => (
          <MessageToast
            closeToast={e.closeToast}
            type="error"
            title="Credenciais incorretas"
            text="E-mail ou senha incorretos, verifique os campos e tente novamente."
          />
        ));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input
          title="Email"
          name="email"
          placeholder="Digite seu e-mail"
          control={control}
        />

        <Input
          title="Senha"
          name="password"
          placeholder="Digite sua senha"
          control={control}
          type="password"
        />
      </div>

      <Button type="submit" disabled={isLoading === true}>
        Entrar
      </Button>
    </form>
  );
}
