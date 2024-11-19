import Link from "next/link";
import { Card } from "./_lib/components/Card";
import { env } from "@/lib/env";

export default function LoginPage() {
  const projectUrl = env.NEXT_PUBLIC_PROJECT_URL;

  return (
    <section className="flex h-min w-full items-center flex-col px-4">
      <Card />

      <p className="font-normal text-sm leading-[1.3125rem] text-center text-[#51525C] px-[5%]">
        Área exclusiva para administradores da plataforma.
        <br />
        Para acessar, <Link href={projectUrl}>clique aqui.</Link>
      </p>
    </section>
  );
}
