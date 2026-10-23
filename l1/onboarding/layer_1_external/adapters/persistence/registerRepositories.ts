/// <mls fileReference="_102039_/l1/onboarding/layer_1_external/adapters/persistence/registerRepositories.ts" enhancement="_blank"/>
import { registerRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { createCountryRepository } from '/_102039_/l1/onboarding/layer_1_external/adapters/persistence/countryRepositoryAdapter.js';
import { createPrivacyTextVersionRepository } from '/_102039_/l1/onboarding/layer_1_external/adapters/persistence/privacyTextVersionRepositoryAdapter.js';

export function registerRepositories(): void {
  registerRepository("CountryRepository", ctx => createCountryRepository(ctx));
  registerRepository("PrivacyTextVersionRepository", ctx => createPrivacyTextVersionRepository(ctx));
}

registerRepositories();
