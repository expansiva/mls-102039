/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/usecases/inactivateCountry.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "usecase",
  "artifactId": "inactivateCountry",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_2_application/ports/countryRepository.defs.ts",
    "_102039_/l1/onboarding/layer_3_domain/entities/country.defs.ts",
    "_102039_/l4/onboarding/ontology/Country.defs.ts",
    "_102039_/l4/onboarding/rules.defs.ts"
  ],
  "data": {
    "usecaseId": "inactivateCountry",
    "entityId": "Country",
    "operation": "transition",
    "rulesApplied": [
      "onlyActiveCountryOffered",
      "onlyOwnerMaintainsCountries"
    ],
    "effects": [],
    "transitionRef": "inactivateCountry"
  }
} as const;

export default definition;
