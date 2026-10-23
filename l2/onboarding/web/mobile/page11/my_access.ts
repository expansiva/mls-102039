/// <mls fileReference="_102039_/l2/onboarding/web/mobile/page11/my_access.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { OnboardingMy_accessShared } from '/_102039_/l2/onboarding/web/shared/my_access.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import '/_102040_/l2/molecules/groupenterboolean/ml-checkbox-preference.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupexpandcontent/ml-readmore-expand.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-profile-card.js';
function formatDate(value: string): string {
return new Intl.DateTimeFormat(document.documentElement.lang || undefined, {
dateStyle: 'medium',
}).format(new Date(value));
}
/// **collab_i18n_start**
const pageMessage_en = {
pageTitle: 'Complete your access',
pageIntro: 'A few details help us prepare your access.',
back: 'Back',
reviewTitle: 'Review your access',
detailsTitle: 'Your details',
privacyTitle: 'Privacy consent',
summaryTitle: 'Confirm your access',
reviewIntro: 'Check what the platform still needs before you continue.',
loginEmail: 'Login e-mail',
name: 'Name',
country: 'Country',
accessComplete: 'Your access is complete',
accessNeedsDetails: 'More details are needed',
missingItems: 'What is still missing',
completeItHere: 'Complete the items you can here. If an item says the owner must release access, contact your company owner.',
noName: 'Name not yet provided',
required: 'Required',
namePlaceholder: 'Enter your name',
countryPlaceholder: 'Choose your country',
countryHelper: 'Only active countries are available.',
noCountries: 'No active countries are available.',
detailsIntro: 'Only the details missing from your account are requested.',
savedName: 'Name already saved',
savedCountry: 'Country already saved',
privacyIntro: 'Read the current text before making your choice.',
privacyText: 'Current privacy text',
version: 'Version',
published: 'Published',
acceptPrivacy: 'I have read and accept the current privacy text.',
acceptPrivacyHelper: 'Your acceptance is recorded only when you save.',
consentNotRequired: 'Privacy consent is not required for this country.',
consentAlreadyValid: 'Your current privacy consent is valid.',
chooseCountryFirst: 'Choose a country to see whether privacy consent is required.',
consentLoading: 'Checking privacy requirements for this country…',
next: 'Next',
reviewDetails: 'Review details',
reviewPrivacy: 'Review privacy consent',
reviewSummary: 'Review confirmation',
summaryIntro: 'Review your details before saving. Nothing is saved until you confirm.',
notProvided: 'Not provided',
privacyAccepted: 'Current privacy text accepted',
privacyPending: 'Privacy consent still needs your acceptance',
privacyNotNeeded: 'Privacy consent is not required',
editDetails: 'Edit details',
editPrivacy: 'Edit privacy consent',
saveAccess: 'Save my access',
savingAccess: 'Saving your access…',
saveSuccess: 'Your access details were saved.',
saveErrorTitle: 'We could not save your access',
loadErrorTitle: 'We could not load your access',
countryErrorTitle: 'We could not check privacy requirements',
retry: 'Try again',
loading: 'Loading your access…',
noCountriesTitle: 'No countries are available',
noCountriesMessage: 'There are no active countries to choose from. Contact your company owner and try again later.',
preconditionMessage: 'We need your signed-in organization access to open this page. Return to the previous page and try again.',
savedOutcome: 'Current access outcome',
ownerHelp: 'If access is still pending after saving, follow the instructions in the missing items list.',
};
type PageMessageType = typeof pageMessage_en;
const pageMessages: Record<string, PageMessageType> = { 'en': pageMessage_en };
/// **collab_i18n_end**
@customElement('onboarding--web--mobile--page11--my_access-102039')
export class OnboardingMobilePage11My_accessPage extends OnboardingMy_accessShared {
private msg: PageMessageType = pageMessage_en;
private renderStatus() {
const member = this.member;
if (this.pageStatus === 'loading' || this.getMyAccessStatus === 'loading') {
return html`<p class="py-8 text-center text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg.loading}</p>`;
}
if (this.pageStatus === 'error' || this.getMyAccessStatus === 'error') {
const error = this.getMyAccessError;
return html`
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
<Title>${this.msg.loadErrorTitle}</Title>
<Message>${error?.code === 'client.preconditionMissing' ? this.msg.preconditionMessage : error?.message}</Message>
<Action><button type="button" class="min-h-11 text-[var(--link-text,currentColor)] underline" @click=${() => this.getMyAccess()}>${this.msg.retry}</button></Action>
</groupnotifyuser--ml-contextual-feedback>
`;
}
if (!member) {
return html``;
}
return html`
<div data-organism-id="accessStatusSummary" class="space-y-3">
<groupviewcard--ml-profile-card .loading=${false}>
<CardHeader>
<CardTitle>${member.details.identification.name || this.msg.noName}</CardTitle>
<CardDescription>${this.msg.loginEmail}</CardDescription>
</CardHeader>
<CardContent>
<p class="break-words text-sm text-[var(--text-default,currentColor)]">${member.details.onboarding.loginEmail}</p>
</CardContent>
<CardFooter>
<p class="text-sm font-semibold ${member.details.onboarding.accessComplete ? 'text-[var(--status-success-text,currentColor)]' : 'text-[var(--status-warning-text,currentColor)]'}">
${member.details.onboarding.accessComplete ? this.msg.accessComplete : this.msg.accessNeedsDetails}
</p>
</CardFooter>
</groupviewcard--ml-profile-card>
<groupnotifyuser--ml-contextual-feedback type=${member.details.onboarding.accessComplete ? 'success' : 'warning'} .visible=${true} .dismissible=${false}>
<Title>${this.msg.missingItems}</Title>
<Message>${member.details.onboarding.missingItems}</Message>
</groupnotifyuser--ml-contextual-feedback>
</div>
`;
}
private renderDetails() {
const member = this.member;
const nameMissing = !member?.details.identification.name;
const countryMissing = !member?.details.identification.countryCode;
const draft = this.saveMyAccessDraft;
const nextDisabled = (nameMissing && !draft.details.identification.name) || (countryMissing && !draft.details.identification.countryCode);
return html`
<div data-organism-id="missingDataForm" class="space-y-5">
<p class="text-sm leading-6 text-[var(--text-muted,currentColor)]">${this.msg.detailsIntro}</p>
${nameMissing ? html`
<groupentertext--ml-floating-text-input
.value=${draft.details.identification.name ?? ''}
.error=${''}
.name=${'name'}
.placeholder=${this.msg.namePlaceholder}
.maxLength=${null}
.minLength=${null}
.rows=${1}
.autocomplete=${'name'}
.inputType=${'text'}
.isEditing=${true}
.disabled=${this.saveMyAccessStatus === 'loading'}
.readonly=${false}
.required=${true}
.loading=${false}
@input=${(e: CustomEvent<{ value: string }>) => this.setMemberName(e.detail.value || null)}>
<Label>${this.msg.name}</Label>
<Helper>${this.msg.required}</Helper>
</groupentertext--ml-floating-text-input>
` : html`<div class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4"><p class="text-xs font-medium text-[var(--text-muted,currentColor)]">${this.msg.savedName}</p><p class="mt-1 text-sm text-[var(--text-strong,currentColor)]">${member?.details.identification.name}</p></div>`}
${countryMissing ? html`
<groupselectone--ml-select-one-autocomplete
.value=${draft.details.identification.countryCode}
.error=${''}
.name=${'country'}
.placeholder=${this.msg.countryPlaceholder}
.searchable=${true}
.isEditing=${true}
.disabled=${this.checkCountryConsentStatus === 'loading' || this.saveMyAccessStatus === 'loading'}
.readonly=${false}
.required=${true}
.loading=${this.pageStatus === 'loading'}
.clearable=${true}
@change=${(e: CustomEvent<{ value: string | null }>) => this.chooseCountry(e.detail.value)}>
<Label>${this.msg.country}</Label>
<Helper>${this.msg.countryHelper}</Helper>
${this.countries.map((country) => html`<Item value=${country.isoCode}>${country.details.displayName}</Item>`)}
<Empty>${this.msg.noCountries}</Empty>
</groupselectone--ml-select-one-autocomplete>
` : html`<div class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-4"><p class="text-xs font-medium text-[var(--text-muted,currentColor)]">${this.msg.savedCountry}</p><p class="mt-1 text-sm text-[var(--text-strong,currentColor)]">${member?.details.identification.countryCode}</p></div>`}
${this.pageStatus === 'empty' ? html`<groupnotifyuser--ml-contextual-feedback type="warning" .visible=${true} .dismissible=${false}><Title>${this.msg.noCountriesTitle}</Title><Message>${this.msg.noCountriesMessage}</Message></groupnotifyuser--ml-contextual-feedback>` : html``}
<button type="button" class="min-h-11 w-full rounded-lg bg-[var(--button-primary-bg,transparent)] px-4 py-3 font-semibold text-[var(--button-primary-text,currentColor)] disabled:opacity-50" ?disabled=${nextDisabled || this.pageStatus === 'empty'} @click=${() => this.setScenario('privacy')}>${this.msg.next}</button>
</div>
`;
}
private renderPrivacy() {
const consent = this.consent;
const draft = this.saveMyAccessDraft;
const required = consent?.details.onboarding.consentRequired === true;
const valid = consent?.details.onboarding.consentValid === true;
const needsAcceptance = required && !valid;
const nextDisabled = needsAcceptance && !draft.details.person.privacyConsent.consentVersion;
return html`
<div data-organism-id="privacyConsentDetail" class="space-y-5">
<p class="text-sm leading-6 text-[var(--text-muted,currentColor)]">${this.msg.privacyIntro}</p>
${this.checkCountryConsentStatus === 'loading' ? html`<p class="text-sm text-[var(--text-muted,currentColor)]" aria-live="polite">${this.msg.consentLoading}</p>` : html``}
${this.checkCountryConsentStatus === 'error' ? html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}><Title>${this.msg.countryErrorTitle}</Title><Message>${this.checkCountryConsentError?.message}</Message></groupnotifyuser--ml-contextual-feedback>` : html``}
${!consent ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.chooseCountryFirst}</p>` : html``}
${needsAcceptance && consent?.privacyText ? html`
<groupexpandcontent--ml-readmore-expand .multiple=${false} .disabled=${this.saveMyAccessStatus === 'loading'} .loading=${false}>
<Section title=${this.msg.privacyText}>
<div class="space-y-3 px-1 pb-2 text-sm leading-6 text-[var(--text-default,currentColor)]">
<dl class="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-[var(--text-muted,currentColor)]"><dt>${this.msg.version}</dt><dd>${consent.privacyText.versionCode}</dd><dt>${this.msg.published}</dt><dd>${formatDate(consent.privacyText.publishedAt)}</dd></dl>
<p class="whitespace-pre-wrap">${consent.privacyText.details.text}</p>
</div>
</Section>
</groupexpandcontent--ml-readmore-expand>
<groupenterboolean--ml-checkbox-preference .value=${draft.details.person.privacyConsent.consentVersion !== null} .error=${''} .name=${'privacyConsent'} .isEditing=${true} .disabled=${this.saveMyAccessStatus === 'loading'} @change=${(e: CustomEvent<{ value: boolean }>) => this.acceptPrivacy(e.detail.value)}>
<Label>${this.msg.acceptPrivacy}</Label>
<Helper>${this.msg.acceptPrivacyHelper}</Helper>
</groupenterboolean--ml-checkbox-preference>
` : html``}
${required && valid ? html`<groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}><Message>${this.msg.consentAlreadyValid}</Message></groupnotifyuser--ml-contextual-feedback>` : html``}
${consent && !required ? html`<groupnotifyuser--ml-contextual-feedback type="info" .visible=${true} .dismissible=${false}><Message>${this.msg.consentNotRequired}</Message></groupnotifyuser--ml-contextual-feedback>` : html``}
<button type="button" class="min-h-11 w-full rounded-lg bg-[var(--button-primary-bg,transparent)] px-4 py-3 font-semibold text-[var(--button-primary-text,currentColor)] disabled:opacity-50" ?disabled=${nextDisabled || !consent || this.checkCountryConsentStatus === 'loading'} @click=${() => this.setScenario('summary')}>${this.msg.next}</button>
</div>
`;
}
private renderSummary() {
const member = this.member;
const draft = this.saveMyAccessDraft;
const consent = this.consent;
const name = member?.details.identification.name ?? draft.details.identification.name;
const country = member?.details.identification.countryCode ?? draft.details.identification.countryCode;
const required = consent?.details.onboarding.consentRequired === true;
const valid = consent?.details.onboarding.consentValid === true;
const accepted = draft.details.person.privacyConsent.consentVersion !== null;
return html`
<div class="space-y-5">
<p class="text-sm leading-6 text-[var(--text-muted,currentColor)]">${this.msg.summaryIntro}</p>
${this.saveMyAccessStatus === 'success' ? html`<groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}><Title>${this.msg.saveSuccess}</Title><Message>${this.msg.ownerHelp}</Message></groupnotifyuser--ml-contextual-feedback>` : html``}
${this.saveMyAccessStatus === 'error' ? html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}><Title>${this.msg.saveErrorTitle}</Title><Message>${this.saveMyAccessError?.message}</Message></groupnotifyuser--ml-contextual-feedback>` : html``}
<section class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
<div class="flex items-center justify-between gap-3"><p class="font-semibold text-[var(--text-strong,currentColor)]">${this.msg.detailsTitle}</p><button type="button" class="min-h-11 text-sm text-[var(--link-text,currentColor)] underline" @click=${() => this.setScenario('details')}>${this.msg.editDetails}</button></div>
<dl class="mt-3 space-y-3 text-sm"><div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.name}</dt><dd class="text-[var(--text-default,currentColor)]">${name ?? this.msg.notProvided}</dd></div><div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.country}</dt><dd class="text-[var(--text-default,currentColor)]">${country ?? this.msg.notProvided}</dd></div></dl>
</section>
<section class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
<div class="flex items-center justify-between gap-3"><p class="font-semibold text-[var(--text-strong,currentColor)]">${this.msg.privacyTitle}</p>${required && !valid ? html`<button type="button" class="min-h-11 text-sm text-[var(--link-text,currentColor)] underline" @click=${() => this.setScenario('privacy')}>${this.msg.editPrivacy}</button>` : html``}</div>
<p class="mt-3 text-sm text-[var(--text-default,currentColor)]">${!required ? this.msg.privacyNotNeeded : valid || accepted ? this.msg.privacyAccepted : this.msg.privacyPending}</p>
</section>
<div data-organism-id="saveAccessActions">
<grouptriggeraction--ml-button-standard data-variant="primary" data-class="w-full" .size=${'lg'} .type=${'button'} .iconPosition=${'start'} .disabled=${this.saveMyAccessStatus === 'loading'} .loading=${this.saveMyAccessStatus === 'loading'} @action=${() => this.saveMyAccess()}>
<Label>${this.saveMyAccessStatus === 'loading' ? this.msg.savingAccess : this.msg.saveAccess}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</div>
`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`
<main class="min-h-full bg-[var(--page-bg,transparent)] px-4 py-6 text-[var(--text-default,currentColor)]">
<div class="mx-auto max-w-md">
<header class="mb-6"><h1 class="text-2xl font-semibold tracking-tight text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1><p class="mt-2 text-sm leading-6 text-[var(--text-muted,currentColor)]">${this.msg.pageIntro}</p></header>
<ol class="mb-6 grid grid-cols-4 gap-1" aria-label=${this.msg.pageTitle}>
${[this.msg.reviewTitle, this.msg.detailsTitle, this.msg.privacyTitle, this.msg.summaryTitle].map((label, index) => html`<li class="min-w-0"><div class="flex items-center gap-2 text-[var(--text-muted,currentColor)]"><span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--border-default,currentColor)] text-xs">${index + 1}</span><span class="truncate text-xs font-medium">${label}</span></div></li>`)}
</ol>
<molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary || 'review'} backLabel=${this.msg.back}
@change=${(e: Event) => { if (e.target === e.currentTarget) this.setScenario((e.currentTarget as HTMLElement & { value: string }).value); }}>
<Scene value="review" title=${this.msg.reviewTitle}>
<div class="space-y-5"><p class="text-sm leading-6 text-[var(--text-muted,currentColor)]">${this.msg.reviewIntro}</p>${this.renderStatus()}<button type="button" class="min-h-11 w-full rounded-lg bg-[var(--button-primary-bg,transparent)] px-4 py-3 font-semibold text-[var(--button-primary-text,currentColor)]" @click=${() => this.setScenario('details')}>${this.msg.reviewDetails}</button></div>
</Scene>
<Scene value="details" title=${this.msg.detailsTitle} nav="back" backTo="review">${this.renderDetails()}</Scene>
<Scene value="privacy" title=${this.msg.privacyTitle} nav="back" backTo="details">${this.renderPrivacy()}</Scene>
<Scene value="summary" title=${this.msg.summaryTitle} nav="back" backTo="privacy">${this.renderSummary()}</Scene>
</molecules--ml-scenary-102020>
</div>
</main>
`;
}
}
