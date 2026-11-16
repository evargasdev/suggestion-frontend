import { Checkbox, Radio, Select, TextInput } from "flowbite-react";
import React from "react";

export interface DemographicsData {
  ageRange: string;
  genderIdentity: string;
  vulnerableGroups: string[];
  origin: string;
  foreignCountry: string;
  hasCareResponsibilities: boolean;
  careResponsibilitiesDetails: string[];
  activityType: string;
  sector: string;
  position: string;
}

export type DemographicsField =
  | "ageRange"
  | "genderIdentity"
  | "origin"
  | "foreignCountry"
  | "careResponsibilitiesDetails"
  | "activityType"
  | "sector"
  | "position";

export function getMissingDemographicsField(
  demographics: DemographicsData,
): DemographicsField | null {
  if (!demographics.ageRange) return "ageRange";
  if (!demographics.genderIdentity) return "genderIdentity";
  if (!demographics.origin) return "origin";
  if (
    demographics.origin === "Extranjera" &&
    !demographics.foreignCountry.trim()
  ) {
    return "foreignCountry";
  }
  if (
    demographics.hasCareResponsibilities &&
    demographics.careResponsibilitiesDetails.length === 0
  ) {
    return "careResponsibilitiesDetails";
  }
  if (!demographics.activityType) return "activityType";
  if (!demographics.sector) return "sector";
  if (!demographics.position) return "position";
  return null;
}

interface DemographicsSectionProps {
  demographics: DemographicsData;
  invalidField: DemographicsField | null;
  onChangeDemographics: React.Dispatch<React.SetStateAction<DemographicsData>>;
  ageRanges: string[];
  genderIdentities: string[];
  vulnerableGroupOptions: string[];
  mexicanStates: string[];
  careResponsibilityOptions: string[];
  activityTypes: string[];
  sectors: string[];
  positions: string[];
}

export function DemographicsSection({
  demographics,
  invalidField,
  onChangeDemographics,
  ageRanges,
  genderIdentities,
  vulnerableGroupOptions,
  mexicanStates,
  careResponsibilityOptions,
  activityTypes,
  sectors,
  positions,
}: DemographicsSectionProps) {
  const fieldError = (field: DemographicsField, label: string) =>
    invalidField === field ? (
      <span
        id={`demographics-${field}-error`}
        className="mt-1.5 block text-sm font-medium text-danger-700"
        role="alert"
      >
        {label}
      </span>
    ) : null;

  const toggleVulnerableGroup = (group: string) => {
    onChangeDemographics((current) => {
      if (group === "ninguna de las anteriores") {
        return {
          ...current,
          vulnerableGroups: current.vulnerableGroups.includes(group)
            ? []
            : [group],
        };
      }

      const selected = current.vulnerableGroups.filter(
        (value) => value !== "ninguna de las anteriores",
      );
      return {
        ...current,
        vulnerableGroups: selected.includes(group)
          ? selected.filter((value) => value !== group)
          : [...selected, group],
      };
    });
  };

  const toggleCareResponsibility = (detail: string) => {
    onChangeDemographics((current) => {
      const selected = current.careResponsibilitiesDetails.includes(detail)
        ? current.careResponsibilitiesDetails.filter(
            (value) => value !== detail,
          )
        : [...current.careResponsibilitiesDetails, detail];

      return {
        ...current,
        careResponsibilitiesDetails: selected,
        hasCareResponsibilities: selected.length > 0,
      };
    });
  };

  // ... resto del JSX sin cambios

  return (
    <section className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-700">
          Las mujeres en el trabajo turístico
        </p>
        <h1 className="mt-1 text-xl font-bold text-foreground">
          Datos generales
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Esta información se utiliza únicamente para analizar resultados
          agregados. No se solicitan datos que te identifiquen.
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border border-border bg-surface p-4">
        <label className="block text-sm font-medium text-secondary-800">
          Edad
          <Select
            id="demographics-ageRange"
            value={demographics.ageRange}
            aria-describedby={
              invalidField === "ageRange"
                ? "demographics-ageRange-error"
                : undefined
            }
            aria-invalid={invalidField === "ageRange"}
            onChange={(event) =>
              onChangeDemographics((current) => ({
                ...current,
                ageRange: event.target.value,
              }))
            }
            className="mt-1.5 block w-full"
          >
            <option value="">Selecciona un rango de edad</option>
            {ageRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </Select>
          {fieldError("ageRange", "Selecciona un rango de edad.")}
        </label>

        <fieldset>
          <legend className="text-sm font-medium text-secondary-800">
            Te identificas como
          </legend>
          <div className="mt-2 space-y-2">
            {genderIdentities.map((identity) => (
              <label
                key={identity}
                className="flex items-center gap-2 text-sm text-secondary-700"
              >
                <Radio
                    id={
                      identity === genderIdentities[0]
                        ? "demographics-genderIdentity"
                        : undefined
                    }
                    name="genderIdentity"
                    value={identity}
                    checked={demographics.genderIdentity === identity}
                    aria-describedby={
                      invalidField === "genderIdentity"
                        ? "demographics-genderIdentity-error"
                        : undefined
                    }
                    aria-invalid={invalidField === "genderIdentity"}
                    onChange={() =>
                    onChangeDemographics((current) => ({
                      ...current,
                      genderIdentity: identity,
                    }))
                  }
                  className="border-border-2"
                />
                {identity}
              </label>
            ))}
          </div>
          {fieldError("genderIdentity", "Selecciona una opción.")}
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-secondary-800">
            ¿Te identificas con alguno de estos grupos? Puedes elegir más de
            uno.
          </legend>
          <div className="mt-2 space-y-2">
            {vulnerableGroupOptions.map((group) => (
              <label
                key={group}
                className="flex items-center gap-2 text-sm text-secondary-700"
              >
                <Checkbox
                  checked={demographics.vulnerableGroups.includes(group)}
                  onChange={() => toggleVulnerableGroup(group)}
                  className="border-border-2"
                />
                {group}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm font-medium text-secondary-800">
          Estado de Origen
          <Select
            id="demographics-origin"
            value={demographics.origin}
            aria-describedby={
              invalidField === "origin"
                ? "demographics-origin-error"
                : undefined
            }
            aria-invalid={invalidField === "origin"}
            onChange={(event) =>
              onChangeDemographics((current) => ({
                ...current,
                origin: event.target.value,
                foreignCountry: "",
              }))
            }
            className="mt-1.5 block w-full"
          >
            <option value="">Selecciona una entidad federativa</option>
            {mexicanStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
            <option value="Extranjera">Extranjera</option>
          </Select>
          {fieldError("origin", "Selecciona tu estado de origen.")}
        </label>

        {demographics.origin === "Extranjera" && (
          <label className="block text-sm font-medium text-secondary-800">
            País de origen
            <TextInput
              id="demographics-foreignCountry"
              value={demographics.foreignCountry}
              aria-describedby={
                invalidField === "foreignCountry"
                  ? "demographics-foreignCountry-error"
                  : undefined
              }
              aria-invalid={invalidField === "foreignCountry"}
              onChange={(event) =>
                onChangeDemographics((current) => ({
                  ...current,
                  foreignCountry: event.target.value,
                }))
              }
              maxLength={255}
              className="mt-1.5 block w-full"
              placeholder="Escribe el país"
            />
            {fieldError("foreignCountry", "Escribe tu país de origen.")}
          </label>
        )}

        <fieldset>
          <legend className="text-sm font-medium text-secondary-800">
            ¿Tienes personas a tu cuidado?
          </legend>
          <div className="mt-2 flex gap-5">
            {[true, false].map((hasCare) => (
              <label
                key={String(hasCare)}
                className="flex items-center gap-2 text-sm text-secondary-700"
              >
                <Radio
                  id={
                    hasCare
                      ? "demographics-hasCareResponsibilities"
                      : undefined
                  }
                  name="hasCareResponsibilities"
                  checked={demographics.hasCareResponsibilities === hasCare}
                  onChange={() =>
                    onChangeDemographics((current) => ({
                      ...current,
                      hasCareResponsibilities: hasCare,
                      careResponsibilitiesDetails: hasCare
                        ? current.careResponsibilitiesDetails
                        : [],
                    }))
                  }
                  className="border-border-2"
                />
                {hasCare ? "Sí" : "No"}
              </label>
            ))}
          </div>

          {demographics.hasCareResponsibilities && (
            <div className="mt-3 space-y-2">
              {careResponsibilityOptions.map((detail) => (
                <label
                  key={detail}
                  className="flex items-center gap-2 text-sm text-secondary-700"
                >
                  <Checkbox
                    id={
                      detail === careResponsibilityOptions[0]
                        ? "demographics-careResponsibilitiesDetails"
                        : undefined
                    }
                    checked={demographics.careResponsibilitiesDetails.includes(
                      detail,
                    )}
                    aria-describedby={
                      invalidField === "careResponsibilitiesDetails"
                        ? "demographics-careResponsibilitiesDetails-error"
                        : undefined
                    }
                    aria-invalid={
                      invalidField === "careResponsibilitiesDetails"
                    }
                    onChange={() => toggleCareResponsibility(detail)}
                    className="border-border-2"
                  />
                  {detail}
                </label>
              ))}
              {fieldError(
                "careResponsibilitiesDetails",
                "Selecciona al menos una responsabilidad.",
              )}
            </div>
          )}
        </fieldset>

        <label className="block text-sm font-medium text-secondary-800">
          Tipo de actividad
          <Select
            id="demographics-activityType"
            value={demographics.activityType}
            aria-describedby={
              invalidField === "activityType"
                ? "demographics-activityType-error"
                : undefined
            }
            aria-invalid={invalidField === "activityType"}
            onChange={(event) =>
              onChangeDemographics((current) => ({
                ...current,
                activityType: event.target.value,
              }))
            }
            className="mt-1.5 block w-full"
          >
            <option value="">Selecciona el tipo de actividad</option>
            {activityTypes.map((activityType) => (
              <option key={activityType} value={activityType}>
                {activityType}
              </option>
            ))}
          </Select>
          {fieldError("activityType", "Selecciona un tipo de actividad.")}
        </label>

        <label className="block text-sm font-medium text-secondary-800">
          Actividad turística
          <Select
            id="demographics-sector"
            value={demographics.sector}
            aria-describedby={
              invalidField === "sector" ? "demographics-sector-error" : undefined
            }
            aria-invalid={invalidField === "sector"}
            onChange={(event) =>
              onChangeDemographics((current) => ({
                ...current,
                sector: event.target.value,
              }))
            }
            className="mt-1.5 block w-full"
          >
            <option value="">Selecciona la actividad turística</option>
            {sectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </Select>
          {fieldError("sector", "Selecciona una actividad turística.")}
        </label>

        <label className="block text-sm font-medium text-secondary-800">
          Cargo
          <Select
            id="demographics-position"
            value={demographics.position}
            aria-describedby={
              invalidField === "position"
                ? "demographics-position-error"
                : undefined
            }
            aria-invalid={invalidField === "position"}
            onChange={(event) =>
              onChangeDemographics((current) => ({
                ...current,
                position: event.target.value,
              }))
            }
            className="mt-1.5 block w-full"
          >
            <option value="">Selecciona tu cargo</option>
            {positions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </Select>
          {fieldError("position", "Selecciona tu cargo.")}
        </label>
      </div>
    </section>
  );
}
