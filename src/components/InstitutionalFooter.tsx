import ProjectCreditsModal from "./ProjectCreditsModal";

export default function InstitutionalFooter() {
  return (
    <footer className="mx-auto mt-10 w-full max-w-6xl border-t border-border-2/60 pt-6 text-center sm:text-left">
      <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
        <div className="flex items-center gap-3">
          <img
            alt="Universidad Autónoma del Estado de Quintana Roo"
            className="h-11 w-auto object-contain"
            src="/images/logo-uqroo.svg"
          />
          <div className="text-left">
            <p className="font-bold text-secondary-800">
              Universidad Autónoma del Estado de Quintana Roo
            </p>
            <p className="text-muted-2">
              Observatorio de Estudios de Género
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 sm:items-end">
          <ProjectCreditsModal
            className="font-semibold text-primary-800 hover:text-primary-900 hover:underline"
            label="Créditos académicos y contacto institucional"
          />
          <p className="text-[11px] text-muted-2">
            © 2026 Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
