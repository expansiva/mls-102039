/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/adapters/persistence/registerRepositories.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "repositoryRegistration",
  "artifactId": "registerRepositories",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_1_external/adapters/persistence/countryRepositoryAdapter.defs.ts",
    "_102039_/l1/onboarding/layer_1_external/adapters/persistence/privacyTextVersionRepositoryAdapter.defs.ts"
  ],
  "data": {
    "registrationId": "registerRepositories",
    "adapters": [
      {
        "portId": "CountryRepository",
        "adapterArtifactId": "CountryRepository"
      },
      {
        "portId": "PrivacyTextVersionRepository",
        "adapterArtifactId": "PrivacyTextVersionRepository"
      }
    ]
  }
} as const;

export default definition;
