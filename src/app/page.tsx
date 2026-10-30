import { Button, Card } from "flowbite-react";

export default function Home() {
  return (
    <Card className="text-center shadow-xl bg-white/40 backdrop-blur-3xl rounded-3xl mx-5">
      <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-700">
        Tu opinión nos ayuda
      </p>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        ¡Hola!
      </h1>
      <p className="mx-auto max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg">
        Este test está diseñado por XX con el fin de evaluar la situación
        laboral de las mujeres en el área turística de Playa del Carmen, no
        recopilamos ningún tipo de información personal, etc, etc, salu2, ponle
        que hayan unos 4 5 parrafos pero va a depender del sispotiico
      </p>
      <p className="text-xs mb-8 text-gray-400">
        Puedes consultar nuestro aviso de privacidad{" "}
        <a href="https://erickvargas.dev/" target="_blank">
          aquí
        </a>
      </p>
      <Button
        as="a"
        href="/test"
        rel="noopener noreferrer"
        size="lg"
        className="mx-auto"
      >
        Comenzar test
      </Button>
    </Card>
  );
}
