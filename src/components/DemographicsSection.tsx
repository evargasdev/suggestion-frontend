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

interface DemographicsSectionProps {
  demographics: DemographicsData;
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
        <p className="text-xs font-semibold uppercase tracking-wider text-purple-700">
          Las mujeres en el trabajo turístico
        </p>
        <h1 className="mt-1 text-xl font-bold text-gray-900">
          Datos generales
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Esta información se utiliza únicamente para analizar resultados
          agregados. No se solicitan datos que te identifiquen.
        </p>
      </div>

      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4">
        <label className="block text-sm font-medium text-gray-800">
          Edad
          <Select
            value={demographics.ageRange}
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
        </label>

        <fieldset>
          <legend className="text-sm font-medium text-gray-800">
            Te identificas como
          </legend>
          <div className="mt-2 space-y-2">
            {genderIdentities.map((identity) => (
              <label
                key={identity}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <Radio
                  name="genderIdentity"
                  value={identity}
                  checked={demographics.genderIdentity === identity}
                  onChange={() =>
                    onChangeDemographics((current) => ({
                      ...current,
                      genderIdentity: identity,
                    }))
                  }
                  className="border-gray-300"
                />
                {identity}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-gray-800">
            ¿Te identificas con alguno de estos grupos? Puedes elegir más de
            uno.
          </legend>
          <div className="mt-2 space-y-2">
            {vulnerableGroupOptions.map((group) => (
              <label
                key={group}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <Checkbox
                  checked={demographics.vulnerableGroups.includes(group)}
                  onChange={() => toggleVulnerableGroup(group)}
                  className="border-gray-300"
                />
                {group}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="block text-sm font-medium text-gray-800">
          Estado de Origen
          <Select
            value={demographics.origin}
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
        </label>

        {demographics.origin === "Extranjera" && (
          <label className="block text-sm font-medium text-gray-800">
            País de origen
            <TextInput
              value={demographics.foreignCountry}
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
          </label>
        )}

        <fieldset>
          <legend className="text-sm font-medium text-gray-800">
            ¿Tienes personas a tu cuidado?
          </legend>
          <div className="mt-2 flex gap-5">
            {[true, false].map((hasCare) => (
              <label
                key={String(hasCare)}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <Radio
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
                  className="border-gray-300"
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
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <Checkbox
                    checked={demographics.careResponsibilitiesDetails.includes(
                      detail,
                    )}
                    onChange={() => toggleCareResponsibility(detail)}
                    className="border-gray-300"
                  />
                  {detail}
                </label>
              ))}
            </div>
          )}
        </fieldset>

        <label className="block text-sm font-medium text-gray-800">
          Tipo de actividad
          <Select
            value={demographics.activityType}
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
        </label>

        <label className="block text-sm font-medium text-gray-800">
          Actividad turística
          <Select
            value={demographics.sector}
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
        </label>

        <label className="block text-sm font-medium text-gray-800">
          Cargo
          <Select
            value={demographics.position}
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
        </label>
      </div>
    </section>
  );
}
