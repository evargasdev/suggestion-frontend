import Link from "next/link";
import { Button, Card } from "flowbite-react";

export default function Home() {
  return (
    <Card className="text-center shadow-xl bg-white/40 backdrop-blur-3xl rounded-3xl mx-5">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-700">
        Las mujeres en el trabajo turístico
      </p>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Conoce tu situación laboral
      </h1>
      <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
        Responde este test anónimo para evaluar las condiciones de tu empleo
        actual en cinco aspectos: laboral, discriminación, violencias, cuidados
        y salud física y mental.
      </p>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-600">
        Tus respuestas se analizan de forma agregada y no se solicitan datos
        personales que permitan identificarte. Al finalizar podrás consultar
        los resultados de tu evaluación y sus clasificaciones por dimensión.
      </p>
      <Button
        as="a"
        href="/test"
        size="lg"
        className="mx-auto mt-6"
      >
        Comenzar el test
      </Button>
      <Link
        href="/dashboard"
        className="mt-5 text-sm font-semibold text-purple-800 underline underline-offset-4 hover:text-purple-950"
      >
        Consultar resultados agregados
      </Link>
    </Card>
  );
}
