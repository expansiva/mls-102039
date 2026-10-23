/// <mls fileReference="_102039_/l2/onboarding/web/desktop/page11/my_access.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { OnboardingMy_accessShared } from '/_102039_/l2/onboarding/web/shared/my_access.js';
import '/_102040_/l2/molecules/groupenterboolean/ml-checkbox-preference.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupexpandcontent/ml-readmore-expand.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-profile-card.js';
import '/_102020_/l2/molecules/ml-scenary.js';
function formatDate(value: string) {
return new Intl.DateTimeFormat(document.documentElement.lang || undefined, {
dateStyle: 'long',
}).format(new Date(value));
}
/// **collab_i18n_start**
const pageMessage_en = {
pageTitle: 'Complete my access',
overviewTitle: 'Your access',
detailsTitle: 'Your details',
reviewTitle: 'Review and save',
back: 'Back',
stepAccount: 'Account status',
stepDetails: 'Your details',
stepReview: 'Review',
opening: 'Complete the remaining details to access the modules available to you.',
yourAccount: 'Your account',
accessComplete: 'Access complete',
accessIncomplete: 'Action needed',
loginEmail: 'Login e-mail',
missingItems: 'What is still missing',
accessReady: 'Your access is complete. You can use the modules available to you.',
actionNeeded: 'Complete the items below. Some items may need to be released by your company owner on the platform.',
continue: 'Continue',
noCountriesTitle: 'Countries are unavailable',
noCountriesMessage: 'There are no active countries available to choose from. Please try again later.',
reload: 'Reload',
loadErrorTitle: 'We could not load your access',
loadErrorMessage: 'Your access details could not be loaded. Try again.',
loadingAccount: 'Loading your access details…',
detailsIntro: 'Add only the details the platform does not already have.',
name: 'Name',
namePlaceholder: 'Enter your name',
nameHelper: 'Required to complete your access.',
country: 'Country',
countryPlaceholder: 'Choose a country',
countryHelper: 'Only active countries are available.',
noCountryOptions: 'No active countries are available.',
privacyTitle: 'Privacy consent',
privacyWaiting: 'Choose a country to check whether privacy consent is required.',
privacyNotRequired: 'No privacy consent is required for this country.',
privacyLoading: 'Checking privacy requirements…',
privacyErrorTitle: 'We could not check privacy requirements',
privacyErrorMessage: 'Choose the country again or try later.',
privacyDocument: 'Current privacy text',
privacyVersion: 'Version',
privacyPublished: 'Published',
privacyProvisional: 'This is a provisional privacy text.',
acceptPrivacy: 'I have read and accept this privacy text.',
acceptPrivacyHelper: 'Acceptance is recorded only when you save your access.',
next: 'Next',
reviewIntro: 'Check the details below before saving. Nothing has been saved yet.',
detailsToSave: 'Details to save',
notProvided: 'Not provided',
consentToSave: 'Privacy acceptance',
accepted: 'Accepted',
notAccepted: 'Not accepted',
saveAccess: 'Save access',
savingAccess: 'Saving your access…',
saveErrorTitle: 'We could not save your access',
saveErrorMessage: 'Review the details and try again.',
saveSuccessTitle: 'Your access was saved',
saveSuccessComplete: 'Your access is complete. You can use the modules available to you.',
saveSuccessPending: 'Your details were saved. Complete any remaining items to finish your access.',
loading: 'Loading',
};
type PageMessageType = typeof pageMessage_en;
const pageMessages: Record<string, PageMessageType> = {
'en': pageMessage_en,
};
/// **collab_i18n_end**
@customElement('onboarding--web--desktop--page11--my_access-102039')
export class OnboardingDesktopPage11My_accessPage extends OnboardingMy_accessShared {
private msg: PageMessageType = pageMessage_en;
private renderRail() {
const steps: Array<{ id: 'overview' | 'details' | 'review'; number: string; label: keyof PageMessageType }> = [
{ id: 'overview', number: '01', label: 'stepAccount' },
{ id: 'details', number: '02', label: 'stepDetails' },
{ id: 'review', number: '03', label: 'stepReview' },
];
return html`
<aside class="w-60 shrink-0 border-r border-[var(--border-subtle,currentColor)] pr-8" aria-label=${this.msg.pageTitle}>
<p class="mb-7 text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</p>
<ol class="space-y-5">
${steps.map((step) => html`
<li class="flex items-center gap-3 text-[var(--text-default,currentColor)]">
<span class="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-default,currentColor)] text-xs font-semibold">${step.number}</span>
<span class="text-sm font-medium">${this.msg[step.label]}</span>
</li>
`)}
</ol>
</aside>
`;
}
private renderStatus() {
const loading = this.pageStatus === 'loading' || this.getMyAccessStatus === 'loading';
const member = this.member;
return html`
<div data-organism-id="accessStatusSummary" class="space-y-5">
<p class="max-w-xl text-base leading-7 text-[var(--text-default,currentColor)]">${this.msg.opening}</p>
${loading ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.loadingAccount}</p>` : html``}
<groupviewcard--ml-profile-card .loading=${loading}>
<CardHeader>
<CardTitle>${member?.details.identification.name || this.msg.yourAccount}</CardTitle>
<CardDescription>${member?.details.onboarding.accessComplete ? this.msg.accessComplete : this.msg.accessIncomplete}</CardDescription>
</CardHeader>
<CardContent>
<dl class="grid grid-cols-[10rem_1fr] gap-x-5 gap-y-3 text-sm">
<dt class="text-[var(--text-muted,currentColor)]">${this.msg.loginEmail}</dt>
<dd class="font-medium text-[var(--text-strong,currentColor)]">${member?.details.onboarding.loginEmail || this.msg.loading}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg.missingItems}</dt>
<dd class="whitespace-pre-line text-[var(--text-default,currentColor)]">${member?.details.onboarding.missingItems || this.msg.notProvided}</dd>
</dl>
</CardContent>
</groupviewcard--ml-profile-card>
${member ? html`
<groupnotifyuser--ml-notify-banner
.type=${member.details.onboarding.accessComplete ? 'success' : 'warning'}
.visible=${true}
.dismissible=${false}
.duration=${0}>
<Message>${member.details.onboarding.accessComplete ? this.msg.accessReady : this.msg.actionNeeded}</Message>
</groupnotifyuser--ml-notify-banner>
` : html``}
${this.getMyAccessError ? html`
<groupnotifyuser--ml-notify-banner .type=${'error'} .visible=${true} .dismissible=${false} .duration=${0}>
<Title>${this.msg.loadErrorTitle}</Title>
<Message>${this.getMyAccessError.message || this.msg.loadErrorMessage}</Message>
<Action><button type="button" class="font-semibold underline" @click=${() => this.getMyAccess()}>${this.msg.reload}</button></Action>
</groupnotifyuser--ml-notify-banner>
` : html``}
</div>
`;
}
private renderDetails() {
const member = this.member;
const draft = this.saveMyAccessDraft;
const nameMissing = !member?.details.identification.name;
const countryMissing = !member?.details.identification.countryCode;
const consentRequired = this.consent?.details.onboarding.consentRequired === true;
const consentValid = this.consent?.details.onboarding.consentValid === true;
const privacyText = this.consent?.privacyText;
const checking = this.checkCountryConsentStatus === 'loading';
return html`
<div class="space-y-7">
<p class="text-base leading-7 text-[var(--text-default,currentColor)]">${this.msg.detailsIntro}</p>
<div class="grid grid-cols-2 gap-8">
<section data-organism-id="missingDataForm" class="space-y-6 rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6">
${nameMissing ? html`
<groupentertext--ml-enter-text
.value=${draft.details.identification.name || ''}
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
@input=${(e: CustomEvent<{ value: string }>) => this.setMemberName(e.detail.value)}>
<Label>${this.msg.name}</Label>
<Helper>${this.msg.nameHelper}</Helper>
</groupentertext--ml-enter-text>
` : html``}
${countryMissing ? html`
<groupselectone--ml-select-one-autocomplete
.value=${draft.details.identification.countryCode}
.error=${''}
.name=${'country'}
.placeholder=${this.msg.countryPlaceholder}
.searchable=${true}
.isEditing=${true}
.disabled=${this.pageStatus === 'empty' || this.saveMyAccessStatus === 'loading'}
.readonly=${false}
.required=${true}
.loading=${this.getMyAccessStatus === 'loading'}
.clearable=${true}
@change=${(e: CustomEvent<{ value: string | null }>) => this.chooseCountry(e.detail.value)}>
<Label>${this.msg.country}</Label>
${this.countries.map((country) => html`<Item value=${country.isoCode}>${country.details.displayName}</Item>`)}
<Empty>${this.msg.noCountryOptions}</Empty>
<Helper>${this.msg.countryHelper}</Helper>
</groupselectone--ml-select-one-autocomplete>
` : html``}
</section>
<section data-organism-id="privacyConsentDetail" class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-6">
${checking ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.privacyLoading}</p>` : html``}
${this.checkCountryConsentError ? html`
<groupnotifyuser--ml-notify-banner .type=${'error'} .visible=${true} .dismissible=${false} .duration=${0}>
<Title>${this.msg.privacyErrorTitle}</Title>
<Message>${this.checkCountryConsentError.message || this.msg.privacyErrorMessage}</Message>
</groupnotifyuser--ml-notify-banner>
` : html``}
${consentRequired && !consentValid && privacyText ? html`
<div class="space-y-5">
<groupexpandcontent--ml-readmore-expand .multiple=${false} .disabled=${false} .loading=${false}>
<Label>${this.msg.privacyTitle}</Label>
<Section title=${this.msg.privacyDocument} expanded>
<div class="space-y-4 pt-3 text-sm leading-6 text-[var(--text-default,currentColor)]">
<dl class="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-2">
<dt class="text-[var(--text-muted,currentColor)]">${this.msg.privacyVersion}</dt>
<dd>${privacyText.versionCode}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg.privacyPublished}</dt>
<dd>${formatDate(privacyText.publishedAt)}</dd>
</dl>
${privacyText.details.isProvisional ? html`<p class="text-[var(--status-warning-text,currentColor)]">${this.msg.privacyProvisional}</p>` : html``}
<p class="whitespace-pre-line">${privacyText.details.text}</p>
</div>
</Section>
</groupexpandcontent--ml-readmore-expand>
<groupenterboolean--ml-checkbox-preference
.value=${draft.details.person.privacyConsent.consentVersion !== null}
.error=${''}
.name=${'privacy-consent'}
.isEditing=${true}
.disabled=${this.saveMyAccessStatus === 'loading'}
@change=${(e: CustomEvent<{ value: boolean }>) => this.acceptPrivacy(e.detail.value)}>
<Label>${this.msg.acceptPrivacy}</Label>
<Helper>${this.msg.acceptPrivacyHelper}</Helper>
</groupenterboolean--ml-checkbox-preference>
</div>
` : consentRequired && !consentValid ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.privacyWaiting}</p>` : this.consent ? html`<p class="text-sm text-[var(--text-default,currentColor)]">${this.msg.privacyNotRequired}</p>` : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.privacyWaiting}</p>`}
</section>
</div>
<div class="flex justify-end">
<grouptriggeraction--ml-button-standard data-variant="primary" .size=${'md'} .type=${'button'} .iconPosition=${'end'} .disabled=${false} .loading=${false} @action=${() => this.setScenario('review')}>
<Label>${this.msg.next}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</div>
`;
}
private renderReview() {
const member = this.member;
const draft = this.saveMyAccessDraft;
const name = draft.details.identification.name || member?.details.identification.name || this.msg.notProvided;
const country = this.countries.find((country) => country.isoCode === draft.details.identification.countryCode)?.details.displayName || member?.details.identification.countryCode || this.msg.notProvided;
const accepted = draft.details.person.privacyConsent.consentVersion !== null;
const saving = this.saveMyAccessStatus === 'loading';
return html`
<div class="space-y-7">
<p class="text-base leading-7 text-[var(--text-default,currentColor)]">${this.msg.reviewIntro}</p>
<section class="max-w-2xl rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6">
<h2 class="mb-5 text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.detailsToSave}</h2>
<dl class="grid grid-cols-[11rem_1fr] gap-x-6 gap-y-4 text-sm">
<dt class="text-[var(--text-muted,currentColor)]">${this.msg.name}</dt><dd class="font-medium text-[var(--text-strong,currentColor)]">${name}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg.country}</dt><dd class="font-medium text-[var(--text-strong,currentColor)]">${country}</dd>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg.consentToSave}</dt><dd class="font-medium text-[var(--text-strong,currentColor)]">${accepted ? this.msg.accepted : this.msg.notAccepted}</dd>
</dl>
</section>
<div data-organism-id="saveAccessActions" class="space-y-4">
${this.saveMyAccessError ? html`
<groupnotifyuser--ml-notify-banner .type=${'error'} .visible=${true} .dismissible=${false} .duration=${0}>
<Title>${this.msg.saveErrorTitle}</Title>
<Message>${this.saveMyAccessError.message || this.msg.saveErrorMessage}</Message>
</groupnotifyuser--ml-notify-banner>
` : html``}
${this.saveMyAccessStatus === 'success' ? html`
<groupnotifyuser--ml-notify-banner .type=${'success'} .visible=${true} .dismissible=${false} .duration=${0}>
<Title>${this.msg.saveSuccessTitle}</Title>
<Message>${member?.details.onboarding.accessComplete ? this.msg.saveSuccessComplete : this.msg.saveSuccessPending}</Message>
</groupnotifyuser--ml-notify-banner>
` : html``}
<grouptriggeraction--ml-button-standard data-variant="primary" .size=${'lg'} .type=${'button'} .iconPosition=${'start'} .disabled=${saving} .loading=${saving} @action=${() => this.saveMyAccess()}>
<Label>${saving ? this.msg.savingAccess : this.msg.saveAccess}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</div>
`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
return html`
<main class="min-h-full bg-[var(--page-bg,transparent)] px-10 py-9 text-[var(--text-default,currentColor)]">
<div class="mx-auto flex max-w-7xl gap-12">
${this.renderRail()}
<div class="min-w-0 flex-1">
${this.pageStatus === 'empty' ? html`
<div class="mb-7 rounded-xl border border-[var(--status-warning-text,currentColor)] bg-[var(--status-warning-bg,transparent)] p-5">
<p class="font-semibold text-[var(--text-strong,currentColor)]">${this.msg.noCountriesTitle}</p>
<p class="mt-1 text-sm">${this.msg.noCountriesMessage}</p>
<button type="button" class="mt-4 text-sm font-semibold text-[var(--link-text,currentColor)] underline focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" @click=${() => this.getMyAccess()}>${this.msg.reload}</button>
</div>
` : html``}
<molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary || 'overview'} backLabel=${this.msg.back}
@change=${(e: CustomEvent<{ value: string }>) => { if (e.target === e.currentTarget) this.setScenario(e.detail.value); }}>
<Scene value="overview" title=${this.msg.overviewTitle}>
${this.renderStatus()}
<div class="mt-7 flex justify-end">
<grouptriggeraction--ml-button-standard data-variant="primary" .size=${'md'} .type=${'button'} .iconPosition=${'end'} .disabled=${this.pageStatus === 'loading'} .loading=${false} @action=${() => this.setScenario('details')}>
<Label>${this.msg.continue}</Label>
</grouptriggeraction--ml-button-standard>
</div>
</Scene>
<Scene value="details" title=${this.msg.detailsTitle} nav="back" backTo="overview">
${this.renderDetails()}
</Scene>
<Scene value="review" title=${this.msg.reviewTitle} nav="back" backTo="details">
${this.renderReview()}
</Scene>
</molecules--ml-scenary-102020>
</div>
</div>
</main>
`;
}
}

