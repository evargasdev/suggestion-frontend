"use client";

import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";

interface ProjectCreditsModalProps {
  label: string;
  className: string;
}

export default function ProjectCreditsModal({
  label,
  className,
}: ProjectCreditsModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={`${className} cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]`}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        {label}
      </button>
      <Modal
        dismissible
        onClose={() => setIsOpen(false)}
        show={isOpen}
        size="lg"
      >
        <ModalHeader className="border-b border-primary-100">
          <span className="text-lg font-bold text-foreground">
            Créditos del Proyecto
          </span>
        </ModalHeader>

        <ModalBody className="space-y-6">
          <div>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary-700">
              Investigación y Diseño del Instrumento
            </h3>
            <div className="space-y-3">
              <div className="rounded-xl border border-primary-100 bg-primary-50/40 p-3.5">
                <p className="font-semibold text-foreground">
                  Dra. María del Pilar Hernández Limonchi
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  Universidad Autónoma del Estado de Quintana Roo (UQROO)
                </p>
                <a
                  className="mt-1.5 inline-block text-xs font-medium text-primary-700 hover:underline"
                  href="mailto:mp.hernandez.limonchi@uqroo.edu.mx"
                >
                  mp.hernandez.limonchi@uqroo.edu.mx
                </a>
              </div>

              <div className="rounded-xl border border-primary-100 bg-primary-50/40 p-3.5">
                <p className="font-semibold text-foreground">
                  Dra. Alma Ivonne Marín Marín
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  Universidad Autónoma del Estado de Quintana Roo (UQROO)
                </p>
                <a
                  className="mt-1.5 inline-block text-xs font-medium text-primary-700 hover:underline"
                  href="mailto:aimarin@uqroo.edu.mx"
                >
                  aimarin@uqroo.edu.mx
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-primary-700">
              Arquitectura y Desarrollo de Plataforma
            </h3>
            <div className="flex flex-col justify-between gap-3 rounded-xl border border-border bg-surface-2/70 p-3.5 sm:flex-row sm:items-center">
              <div>
                <p className="font-semibold text-foreground">
                  Erick Daniel Vargas Corona
                </p>
                <p className="text-xs text-muted">
                  Ingeniería de Software &amp; Desarrollo Full-Stack
                </p>
              </div>
              <a
                className="inline-flex items-center justify-center rounded-lg border border-primary-200 bg-surface px-3.5 py-2 text-xs font-semibold text-primary-800 shadow-xs transition-colors hover:border-primary-300 hover:bg-primary-50"
                href="https://erickvargas.dev"
                rel="noopener noreferrer"
                target="_blank"
              >
                erickvargas.dev ↗
              </a>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
