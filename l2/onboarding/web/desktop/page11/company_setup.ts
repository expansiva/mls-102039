/// <mls fileReference="_102039_/l2/onboarding/web/desktop/page11/company_setup.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { OnboardingCompany_setupShared, emptySaveCompanyDraft } from '/_102039_/l2/onboarding/web/shared/company_setup.js';
import type { Address, SaveCompanyDraft } from '/_102039_/l2/onboarding/web/shared/company_setup.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-view-card-horizontal.js';
/// **collab_i18n_start**
const pageMessage_en = {
pageTitle: 'Company setup',
loadingTitle: 'Loading company setup',
loadingMessage: 'Getting your company information ready.',
unavailableTitle: 'Company setup is unavailable',
unavailableMessage: 'Company setup needs your organization context before it can load.',
retry: 'Try again',
moduleHome: 'Go to module home',
readinessTitle: 'Preparation status',
preparedTitle: 'Your company is prepared',
preparedMessage: 'All required company information is saved. You can create your first module in Studio.',
needsInfoTitle: 'A few details are still needed',
needsInfoMessage: 'Complete the missing information below to prepare your company.',
missingData: 'Still needed',
readinessLoading: 'Checking preparation status',
companyName: 'Company name',
legalName: 'Legal name',
companyCountry: 'Company country',
documentType: 'Document type',
documentNumber: 'Document number',
identityTitle: 'Company identity',
registrationTitle: 'Registration',
addressTitle: 'Company address',
addressLine: 'Address line',
addressLinePlaceholder: 'Street address, building and suite',
addressLine2: 'Address line 2',
addressLine2Placeholder: 'Floor, suite or other detail',
addressLine3: 'Address line 3',
city: 'City',
stateOrProvince: 'State or province',
postalCode: 'Postal code',
addressCountry: 'Address country',
addressType: 'Address type',
primaryAddress: 'Primary address',
residential: 'Residential',
commercial: 'Commercial',
billing: 'Billing',
delivery: 'Delivery',
other: 'Other',
selectCountry: 'Select a country',
selectDocumentType: 'Select a document type',
ein: 'EIN',
cnpj: 'CNPJ',
vat: 'VAT',
nationalId: 'National ID',
documentOther: 'Other',
requiredHint: 'Required',
existingInformation: 'Already saved',
contacts: 'Contacts',
noContacts: 'No contact is available yet.',
saveCompany: 'Save company information',
savingCompany: 'Saving company information',
savedTitle: 'Company information saved',
savedMessage: 'Your preparation status has been updated.',
saveErrorTitle: 'Could not save company information',
saveErrorFallback: 'Review the information and try again.',
guidanceTitle: 'Continue in Studio',
guidanceMessage: 'Your company is ready. Create your first module in Studio to continue setting up your workspace.',
openStudio: 'Create your first module',
companyNamePlaceholder: 'Enter company name',
legalNamePlaceholder: 'Enter legal name',
documentNumberPlaceholder: 'Enter document number',
cityPlaceholder: 'Enter city',
statePlaceholder: 'Enter state or province',
postalCodePlaceholder: 'Enter postal code',
addressLine3Placeholder: 'Enter additional address detail',
contactTitle: 'Company contact',
contactType: 'Contact type',
selectContactType: 'Select the contact type',
contactPhone: 'Phone',
contactEmail: 'E-mail',
contactValue: 'Contact',
contactValuePlaceholder: 'Enter the phone or e-mail'
};
type PageMessageType = typeof pageMessage_en;
const pageMessages: Record<string, PageMessageType> = { 'en': pageMessage_en };
/// **collab_i18n_end**
function blankAddress(): Address {
return { type: 'Commercial', line1: '', countryCode: '', isPrimary: true };
}
function currentAddress(draft: SaveCompanyDraft): Address {
return draft.details.base.addresses?.[0] ?? blankAddress();
}
function replaceAddress(draft: SaveCompanyDraft, address: Address): SaveCompanyDraft {
return {
...draft,
details: {
...draft.details,
base: { ...draft.details.base, addresses: [address] }
}
};
}
@customElement('onboarding--web--desktop--page11--company_setup-102039')
export class OnboardingDesktopPage11Company_setupPage extends OnboardingCompany_setupShared {
private msg: PageMessageType = pageMessage_en;
renderReadiness() {
const prepared = this.company?.details.onboarding.isPrepared === true;
const loading = this.getCompanySetupStatus === 'loading';
return html`
<section data-organism-id="companyReadiness" class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6 shadow-sm">
<h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.readinessTitle}</h2>
<div class="mt-4">
<groupnotifyuser--ml-notify-banner
.type=${prepared ? 'success' : 'warning'}
.visible=${this.company !== null && !loading}
.dismissible=${false}
.duration=${0}>
<Title>${prepared ? this.msg.preparedTitle : this.msg.needsInfoTitle}</Title>
<Message>${prepared ? this.msg.preparedMessage : this.msg.needsInfoMessage}</Message>
</groupnotifyuser--ml-notify-banner>
</div>
${loading ? html`
<div class="mt-4" aria-busy="true">
<p class="mb-2 text-sm text-[var(--text-muted,currentColor)]">${this.msg.readinessLoading}</p>
<groupshowprogress--ml-segmented-progress .value=${null} size="sm" .label=${this.msg.readinessLoading}></groupshowprogress--ml-segmented-progress>
</div>
` : ''}
${this.company !== null && !prepared ? html`
<div class="mt-5 border-t border-[var(--border-subtle,currentColor)] pt-4">
<p class="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg.missingData}</p>
<p class="mt-1 text-sm text-[var(--text-default,currentColor)]">${this.company.details.onboarding.missingData}</p>
</div>
` : ''}
</section>
`;
}
renderExistingInformation() {
const company = this.company;
if (company === null) return '';
const details = company.details;
const address = details.base.addresses?.[0];
return html`
<aside class="rounded-xl border border-[var(--border-subtle,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-5" aria-label=${this.msg.existingInformation}>
<h2 class="text-sm font-semibold text-[var(--text-strong,currentColor)]">${this.msg.existingInformation}</h2>
<dl class="mt-4 space-y-3 text-sm">
${details.identification.name ? html`<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.companyName}</dt><dd class="mt-0.5 text-[var(--text-default,currentColor)]">${details.identification.name}</dd></div>` : ''}
${details.company.legalName ? html`<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.legalName}</dt><dd class="mt-0.5 text-[var(--text-default,currentColor)]">${details.company.legalName}</dd></div>` : ''}
${details.identification.docId ? html`<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.documentNumber}</dt><dd class="mt-0.5 text-[var(--text-default,currentColor)]">${details.identification.docId}</dd></div>` : ''}
${address?.formatted ? html`<div><dt class="text-[var(--text-muted,currentColor)]">${this.msg.addressTitle}</dt><dd class="mt-0.5 text-[var(--text-default,currentColor)]">${address.formatted}</dd></div>` : ''}
</dl>
<div class="mt-5 border-t border-[var(--border-subtle,currentColor)] pt-4">
<p class="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted,currentColor)]">${this.msg.contacts}</p>
${details.base.contacts && details.base.contacts.length > 0 ? html`<ul class="mt-2 space-y-1 text-sm text-[var(--text-default,currentColor)]">${details.base.contacts.map((contact) => html`<li>${contact.title}</li>`)}</ul>` : html`<p class="mt-2 text-sm text-[var(--text-muted,currentColor)]">${this.msg.noContacts}</p>`}
</div>
</aside>
`;
}
renderForm() {
const draft = this.saveCompanyDraft ?? emptySaveCompanyDraft();
const company = this.company;
const identification = company?.details.identification;
const legal = company?.details.company;
const savedAddress = company?.details.base.addresses?.[0];
const address = currentAddress(draft);
const busy = this.saveCompanyStatus === 'loading';
return html`
<section data-organism-id="companyDataForm" class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-7 shadow-sm">
<div class="grid grid-cols-[minmax(0,1fr)_17rem] gap-8">
<div class="min-w-0 space-y-8">
<section>
<h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.identityTitle}</h2>
<div class="mt-5 grid grid-cols-2 gap-5">
${!identification?.name ? html`<groupentertext--ml-enter-text .value=${draft.details.identification.name ?? ''} .name=${'company-name'} .placeholder=${this.msg.companyNamePlaceholder} .required=${true} .disabled=${busy} @input=${(e: CustomEvent<{ value: string }>) => this.setSaveCompanyDraft({ ...draft, details: { ...draft.details, identification: { ...draft.details.identification, name: e.detail.value || null } } })}><Label>${this.msg.companyName}</Label><Helper>${this.msg.requiredHint}</Helper></groupentertext--ml-enter-text>` : ''}
${!legal?.legalName ? html`<groupentertext--ml-enter-text .value=${draft.details.company.legalName ?? ''} .name=${'legal-name'} .placeholder=${this.msg.legalNamePlaceholder} .required=${true} .disabled=${busy} @input=${(e: CustomEvent<{ value: string }>) => this.setSaveCompanyDraft({ ...draft, details: { ...draft.details, company: { ...draft.details.company, legalName: e.detail.value || null } } })}><Label>${this.msg.legalName}</Label><Helper>${this.msg.requiredHint}</Helper></groupentertext--ml-enter-text>` : ''}
${!identification?.countryCode ? html`<groupselectone--ml-select-one-autocomplete .value=${draft.details.identification.countryCode} .name=${'company-country'} .placeholder=${this.msg.selectCountry} .searchable=${true} .clearable=${true} .required=${true} .disabled=${busy} .loading=${this.getCompanySetupStatus === 'loading'} @change=${(e: CustomEvent<{ value: string | null }>) => this.setSaveCompanyDraft({ ...draft, details: { ...draft.details, identification: { ...draft.details.identification, countryCode: e.detail.value } } })}><Label>${this.msg.companyCountry}</Label>${this.countries.map((country) => html`<Item value=${country.isoCode}>${country.details.displayName}</Item>`)}</groupselectone--ml-select-one-autocomplete>` : ''}
</div>
</section>
<section>
<h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.registrationTitle}</h2>
<div class="mt-5 grid grid-cols-2 gap-5">
${!identification?.docType ? html`<groupselectone--ml-select .value=${draft.details.identification.docType} .name=${'document-type'} .placeholder=${this.msg.selectDocumentType} .required=${true} .disabled=${busy} @change=${(e: CustomEvent<{ value: string | null }>) => this.setSaveCompanyDraft({ ...draft, details: { ...draft.details, identification: { ...draft.details.identification, docType: e.detail.value as SaveCompanyDraft['details']['identification']['docType'] } } })}><Label>${this.msg.documentType}</Label><Item value="EIN">${this.msg.ein}</Item><Item value="CNPJ">${this.msg.cnpj}</Item><Item value="VAT">${this.msg.vat}</Item><Item value="NationalId">${this.msg.nationalId}</Item><Item value="Other">${this.msg.documentOther}</Item></groupselectone--ml-select>` : ''}
${!identification?.docId ? html`<groupentertext--ml-enter-text .value=${draft.details.identification.docId ?? ''} .name=${'document-number'} .placeholder=${this.msg.documentNumberPlaceholder} .required=${true} .disabled=${busy} @input=${(e: CustomEvent<{ value: string }>) => this.setSaveCompanyDraft({ ...draft, details: { ...draft.details, identification: { ...draft.details.identification, docId: e.detail.value || null } } })}><Label>${this.msg.documentNumber}</Label><Helper>${this.msg.requiredHint}</Helper></groupentertext--ml-enter-text>` : ''}
</div>
</section>
${!savedAddress ? html`<section>
<h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.addressTitle}</h2>
<div class="mt-5 space-y-5">
<groupentertext--ml-multiline-text .value=${address.line1} .name=${'address-line'} .placeholder=${this.msg.addressLinePlaceholder} .rows=${2} .required=${true} .disabled=${busy} @input=${(e: CustomEvent<{ value: string }>) => this.setSaveCompanyDraft(replaceAddress(draft, { ...address, line1: e.detail.value }))}><Label>${this.msg.addressLine}</Label><Helper>${this.msg.requiredHint}</Helper></groupentertext--ml-multiline-text>
<div class="grid grid-cols-2 gap-5"><groupentertext--ml-enter-text .value=${address.line2 ?? ''} .name=${'address-line-2'} .placeholder=${this.msg.addressLine2Placeholder} .disabled=${busy} @input=${(e: CustomEvent<{ value: string }>) => this.setSaveCompanyDraft(replaceAddress(draft, { ...address, line2: e.detail.value || undefined }))}><Label>${this.msg.addressLine2}</Label></groupentertext--ml-enter-text><groupentertext--ml-enter-text .value=${address.line3 ?? ''} .name=${'address-line-3'} .placeholder=${this.msg.addressLine3Placeholder} .disabled=${busy} @input=${(e: CustomEvent<{ value: string }>) => this.setSaveCompanyDraft(replaceAddress(draft, { ...address, line3: e.detail.value || undefined }))}><Label>${this.msg.addressLine3}</Label></groupentertext--ml-enter-text></div>
<div class="grid grid-cols-3 gap-5"><groupentertext--ml-enter-text .value=${address.city ?? ''} .name=${'city'} .placeholder=${this.msg.cityPlaceholder} .disabled=${busy} @input=${(e: CustomEvent<{ value: string }>) => this.setSaveCompanyDraft(replaceAddress(draft, { ...address, city: e.detail.value || undefined }))}><Label>${this.msg.city}</Label></groupentertext--ml-enter-text><groupentertext--ml-enter-text .value=${address.stateOrProvince ?? ''} .name=${'state'} .placeholder=${this.msg.statePlaceholder} .disabled=${busy} @input=${(e: CustomEvent<{ value: string }>) => this.setSaveCompanyDraft(replaceAddress(draft, { ...address, stateOrProvince: e.detail.value || undefined }))}><Label>${this.msg.stateOrProvince}</Label></groupentertext--ml-enter-text><groupentertext--ml-enter-text .value=${address.postalCode ?? ''} .name=${'postal-code'} .placeholder=${this.msg.postalCodePlaceholder} .disabled=${busy} @input=${(e: CustomEvent<{ value: string }>) => this.setSaveCompanyDraft(replaceAddress(draft, { ...address, postalCode: e.detail.value || undefined }))}><Label>${this.msg.postalCode}</Label></groupentertext--ml-enter-text></div>
<div class="grid grid-cols-2 gap-5"><groupselectone--ml-select-one-autocomplete .value=${address.countryCode || null} .name=${'address-country'} .placeholder=${this.msg.selectCountry} .searchable=${true} .required=${true} .disabled=${busy} @change=${(e: CustomEvent<{ value: string | null }>) => this.setSaveCompanyDraft(replaceAddress(draft, { ...address, countryCode: e.detail.value ?? '' }))}><Label>${this.msg.addressCountry}</Label>${this.countries.map((country) => html`<Item value=${country.isoCode}>${country.details.displayName}</Item>`)}</groupselectone--ml-select-one-autocomplete><label class="block text-sm font-medium text-[var(--text-default,currentColor)]">${this.msg.addressType}<select class="mt-2 block w-full rounded-md border border-[var(--border-default,currentColor)] bg-[var(--input-bg,transparent)] px-3 py-2 text-[var(--text-default,currentColor)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]" .value=${address.type} ?disabled=${busy} @change=${(e: Event) => this.setSaveCompanyDraft(replaceAddress(draft, { ...address, type: (e.target as HTMLSelectElement).value as Address['type'] }))}><option value="Residential">${this.msg.residential}</option><option value="Commercial">${this.msg.commercial}</option><option value="Billing">${this.msg.billing}</option><option value="Delivery">${this.msg.delivery}</option><option value="Other">${this.msg.other}</option></select></label></div>
<label class="flex items-center gap-3 text-sm text-[var(--text-default,currentColor)]"><input type="checkbox" .checked=${address.isPrimary} ?disabled=${busy} @change=${(e: Event) => this.setSaveCompanyDraft(replaceAddress(draft, { ...address, isPrimary: (e.target as HTMLInputElement).checked }))}>${this.msg.primaryAddress}</label>
</div>
</section>` : ''}
<section>
<h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.contactTitle}</h2>
<div class="mt-5 grid grid-cols-2 gap-5">
<groupselectone--ml-select .value=${draft.companyContact.contactType ?? company?.companyContact?.contactType ?? null} .name=${'contact-type'} .placeholder=${this.msg.selectContactType} .required=${true} .disabled=${busy} @change=${(e: CustomEvent<{ value: string | null }>) => { if (e.target !== e.currentTarget) return; this.setSaveCompanyDraft({ ...draft, companyContact: { ...draft.companyContact, contactType: e.detail.value === 'Phone' || e.detail.value === 'Email' ? e.detail.value : null } }); }}><Label>${this.msg.contactType}</Label><Item value="Phone">${this.msg.contactPhone}</Item><Item value="Email">${this.msg.contactEmail}</Item></groupselectone--ml-select>
<groupentertext--ml-enter-text .value=${draft.companyContact.value ?? company?.companyContact?.value ?? ''} .name=${'contact-value'} .placeholder=${this.msg.contactValuePlaceholder} .required=${true} .disabled=${busy} @input=${(e: CustomEvent<{ value: string }>) => { if (typeof e.detail?.value !== 'string') return; this.setSaveCompanyDraft({ ...draft, companyContact: { ...draft.companyContact, value: e.detail.value } }); }}><Label>${this.msg.contactValue}</Label></groupentertext--ml-enter-text>
</div>
</section>
</div>
${this.renderExistingInformation()}
</div>
</section>
`;
}
renderActions() {
const saving = this.saveCompanyStatus === 'loading';
const error = this.saveCompanyError;
return html`
<section data-organism-id="saveCompanyActions" class="mt-6 border-t border-[var(--border-subtle,currentColor)] pt-6">
${error ? html`<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}><Title>${this.msg.saveErrorTitle}</Title><Message>${error.message || this.msg.saveErrorFallback}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}
${this.saveCompanyStatus === 'success' ? html`<groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}><Title>${this.msg.savedTitle}</Title><Message>${this.msg.savedMessage}</Message></groupnotifyuser--ml-contextual-feedback>` : ''}
<div class="mt-5"><grouptriggeraction--ml-button-standard data-variant="primary" size="md" type="button" .loading=${saving} .disabled=${saving} @action=${() => this.saveCompany()}><Label>${saving ? this.msg.savingCompany : this.msg.saveCompany}</Label></grouptriggeraction--ml-button-standard></div>
</section>
`;
}
renderGuidance() {
if (this.company?.details.onboarding.isPrepared !== true) return '';
return html`
<section data-organism-id="studioGuidance" class="mt-8">
<groupviewcard--ml-view-card-horizontal>
<CardHeader><CardTitle>${this.msg.guidanceTitle}</CardTitle><CardDescription>${this.msg.guidanceMessage}</CardDescription></CardHeader>
<CardAction><a href="/studio" class="font-medium text-[var(--link-text,currentColor)] underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring,currentColor)]">${this.msg.openStudio}</a></CardAction>
</groupviewcard--ml-view-card-horizontal>
</section>
`;
}
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const openingError = this.getCompanySetupError;
if (openingError?.code === 'client.preconditionMissing') {
return html`<main class="min-h-full bg-[var(--page-bg,transparent)] p-10"><div class="mx-auto max-w-2xl rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-8"><h1 class="text-xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.unavailableTitle}</h1><p class="mt-3 text-[var(--text-default,currentColor)]">${this.msg.unavailableMessage}</p><div class="mt-6 flex gap-4"><grouptriggeraction--ml-button-standard data-variant="secondary" size="md" type="button" @action=${() => this.getCompanySetup()}><Label>${this.msg.retry}</Label></grouptriggeraction--ml-button-standard><a href="/" class="self-center text-sm font-medium text-[var(--link-text,currentColor)] underline">${this.msg.moduleHome}</a></div></div></main>`;
}
if (this.getCompanySetupStatus === 'loading' && this.company === null) {
return html`<main class="min-h-full bg-[var(--page-bg,transparent)] p-10"><div class="mx-auto max-w-4xl" aria-busy="true"><h1 class="text-2xl font-semibold text-[var(--text-strong,currentColor)]">${this.msg.loadingTitle}</h1><p class="mt-2 text-[var(--text-muted,currentColor)]">${this.msg.loadingMessage}</p><div class="mt-6"><groupshowprogress--ml-segmented-progress .value=${null} size="md" .label=${this.msg.loadingMessage}></groupshowprogress--ml-segmented-progress></div></div></main>`;
}
return html`<main class="min-h-full bg-[var(--page-bg,transparent)] px-10 py-9"><div class="mx-auto max-w-6xl"><header class="mb-7"><h1 class="text-2xl font-semibold tracking-tight text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1></header>${this.renderReadiness()}<div class="mt-7">${this.renderForm()}${this.renderActions()}${this.renderGuidance()}</div></div></main>`;
}
}
