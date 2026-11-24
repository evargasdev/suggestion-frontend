# Las mujeres en el trabajo turístico — frontend

Aplicación web para responder una encuesta anónima sobre las condiciones
laborales de las mujeres en el sector turístico y consultar resultados por
dimensión. Este frontend está construido con Next.js App Router, React,
TypeScript, Tailwind CSS, Flowbite React y ECharts.

## Requisitos

- Node.js 20.9 o posterior.
- pnpm.
- La [API](../suggestion-backend/README.md) disponible y configurada con una
  base de datos PostgreSQL.

## Configuración

Desde este directorio, instala las dependencias:

```bash
pnpm install
```

Configura la URL base de la API en `.env.local`:

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

La URL debe apuntar al host y puerto donde esté expuesta la API; el prefijo
`/api` se agrega en las solicitudes. Si no se define esta variable, la
aplicación usa `http://localhost:4000`.

Para desarrollo local, inicia primero la API siguiendo las instrucciones de su
[README](../suggestion-backend/README.md). La API requiere una conexión
PostgreSQL y debe tener aplicado el esquema y los datos de catálogo necesarios
para la encuesta.

## Comandos

Iniciar el servidor de desarrollo:

```bash
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000).

Comprobar el código con ESLint:

```bash
pnpm lint
```

Generar la aplicación de producción:

```bash
pnpm build
```

Ejecutar la compilación de producción:

```bash
pnpm start
```

## Páginas principales

| Ruta | Descripción |
| --- | --- |
| `/` | Presentación del proyecto y acceso a la encuesta. |
| `/test` | Captura de datos demográficos y respuestas por dimensión; envía la evaluación a la API. |
| `/results?id=<id>` | Resultados individuales de una evaluación, usando el identificador recibido al enviarla. También acepta `evaluationId` como parámetro. |
| `/dashboard` | Resultados públicos agregados en gráficas de pastel por dimensión. |

El dashboard solicita los conteos de clasificación a
`GET /api/evaluations/dashboard/classifications`, muestra las dimensiones en el
orden de la encuesta y conserva el umbral mínimo de privacidad gestionado por
la API.

## Estructura del código

- `src/app/`: páginas y rutas de Next.js.
- `src/components/`: secciones reutilizables del formulario y elementos
  institucionales.
- `src/hooks/`: carga de la encuesta y envío de evaluaciones.
- `src/lib/api/`: cliente y tipos de la API.
- `src/lib/helpers/`: utilidades de presentación, datos de selectores e
  infografías.
- `public/`: recursos estáticos, como imágenes e infografías.
