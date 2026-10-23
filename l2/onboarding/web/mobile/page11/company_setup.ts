/// <mls fileReference="_102039_/l2/onboarding/web/mobile/page11/company_setup.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import {
  OnboardingCompany_setupShared,
  emptySaveCompanyDraft,
  type Address,
  type CompanyIdentification,
  type SaveCompanyDraft,
} from '/_102039_/l2/onboarding/web/shared/company_setup.js';
import '/_102040_/l2/molecules/groupentertext/ml-floating-text-input.js';
import '/_102040_/l2/molecules/groupentertext/ml-address-field.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-toast-notification.js';
import '/_102040_/l2/molecules/groupselectone/ml-select.js';
import '/_102040_/l2/molecules/groupentertext/ml-enter-text.js';
import '/_102040_/l2/molecules/groupselectone/ml-select-one-autocomplete.js';
import '/_102040_/l2/molecules/groupshowprogress/ml-segmented-progress.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-standard.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';

type DocumentType = NonNullable<CompanyIdentification['docType']>;
type AddressField = 'postalCode' | 'street' | 'number' | 'complement' | 'neighborhood' | 'city' | 'stateCode';

/** line1 carries "street, number", as the desktop shows it; the molecule edits the two parts apart. */
function streetAndNumber(line1: string | undefined): { street: string; number: string } {
  const value = line1 ?? '';
  const at = value.lastIndexOf(', ');
  return at < 0 ? { street: value, number: '' } : { street: value.slice(0, at), number: value.slice(at + 2) };
}

function joinStreet(street: string, number: string): string {
  return number ? `${street}, ${number}` : street;
}

function updatedAddress(
  draft: SaveCompanyDraft,
  savedAddresses: Address[] | undefined,
  savedCountryCode: string | undefined,
  field: AddressField,
  value: string,
): Address[] {
  const addresses = draft.details.base.addresses ?? savedAddresses;
  const first = addresses?.[0] ?? {
    type: 'Commercial' as const,
    line1: '',
    countryCode: draft.details.identification.countryCode ?? savedCountryCode ?? '',
    isPrimary: true,
  };
  const changed: Address = {
    ...first,
    ...(field === 'street' ? { line1: joinStreet(value, streetAndNumber(first.line1).number) } : {}),
    ...(field === 'number' ? { line1: joinStreet(streetAndNumber(first.line1).street, value) } : {}),
    ...(field === 'complement' ? { line2: value } : {}),
    ...(field === 'neighborhood' ? { line3: value } : {}),
    ...(field === 'city' ? { city: value } : {}),
    ...(field === 'stateCode' ? { stateOrProvince: value } : {}),
    ...(field === 'postalCode' ? { postalCode: value } : {}),
  };
  return [changed, ...(addresses?.slice(1) ?? [])];
}

/// **collab_i18n_start**
const pageMessage_en = {
  pageTitle: 'Company setup',
  loadingTitle: 'Loading company details',
  loadingMessage: 'Your company preparation details are being loaded.',
  loadErrorTitle: 'Company details could not be loaded',
  loadErrorMessage: 'Try loading the company details again.',
  preconditionTitle: 'Company details are unavailable',
  preconditionMessage: 'Open this screen from your company onboarding to prepare the company.',
  reload: 'Load company details',
  noCompanyTitle: 'No company is available',
  noCompanyMessage: 'There is no company available to prepare for this login.',
  prepared: 'Prepared',
  needsDetails: 'Needs details',
  preparedTitle: 'Your company is prepared',
  preparedMessage: 'Your required company data has been saved. You can continue in Studio.',
  readinessTitle: 'Company preparation',
  missingData: 'Still needed',
  preparationLoading: 'Checking company preparation',
  identityTitle: 'Company identity',
  companyName: 'Company name',
  companyNamePlaceholder: 'Enter the company name',
  legalName: 'Legal name',
  legalNamePlaceholder: 'Enter the registered legal name',
  documentType: 'Document type',
  documentTypePlaceholder: 'Choose a document type',
  documentNumber: 'Document number',
  documentNumberPlaceholder: 'Enter the document number',
  companyCountry: 'Company country',
  companyCountryPlaceholder: 'Choose a country',
  noCountries: 'No active countries are available',
  addressTitle: 'Registered address',
  addressHelper: 'Enter the company’s registered address.',
  addressType: 'Address type',
  addressTypePlaceholder: 'Choose an address type',
  addressTypeCommercial: 'Commercial',
  addressTypeResidential: 'Residential',
  addressTypeBilling: 'Billing',
  addressTypeDelivery: 'Delivery',
  addressTypeOther: 'Other',
  contactsTitle: 'Existing contacts',
  noContacts: 'No contact is available yet.',
  saveCompany: 'Save company',
  savingCompany: 'Saving company',
  saveErrorTitle: 'Company details could not be saved',
  saveErrorMessage: 'Review the required details and try saving again.',
  tryAgain: 'Try again',
  saveSuccessTitle: 'Company details saved',
  saveSuccessMessage: 'Your company preparation status has been updated.',
  studioTitle: 'Continue in Studio',
  studioDescription: 'Create your first module in Studio now that your company is prepared.',
  studioBody: 'Studio is ready for you in the main navigation.',
  documentEIN: 'EIN',
  documentCNPJ: 'CNPJ',
  documentVAT: 'VAT',
  documentNationalId: 'National ID',
  documentOther: 'Other',
  contactType: 'Contact type',
  selectContactType: 'Select the contact type',
  contactPhone: 'Phone',
  contactEmail: 'E-mail',
  contactValue: 'Contact',
  contactValuePlaceholder: 'Enter the phone or e-mail',
};
type PageMessageType = typeof pageMessage_en;
const pageMessages: Record<string, PageMessageType> = { 'en': pageMessage_en };
/// **collab_i18n_end**

const DOCUMENT_KEY: Record<DocumentType, keyof PageMessageType> = {
  EIN: 'documentEIN',
  CNPJ: 'documentCNPJ',
  VAT: 'documentVAT',
  NationalId: 'documentNationalId',
  Other: 'documentOther',
};

@customElement('onboarding--web--mobile--page11--company_setup-102039')
export class OnboardingMobilePage11Company_setupPage extends OnboardingCompany_setupShared {
  private msg: PageMessageType = pageMessage_en;

  renderReadiness() {
    const prepared = this.company?.details.onboarding.isPrepared === true;
    const loading = this.getCompanySetupStatus === 'loading';
    return html`
      <section data-organism-id="companyReadiness" class="space-y-3">
        <div class="flex items-center justify-between gap-3">
          <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.readinessTitle}</h2>
          <span class="shrink-0 rounded-full px-3 py-1 text-sm font-medium ${prepared ? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]' : 'bg-[var(--status-warning-bg,transparent)] text-[var(--status-warning-text,currentColor)]'}">
            ${prepared ? this.msg.prepared : this.msg.needsDetails}
          </span>
        </div>
        <groupnotifyuser--ml-notify-banner
          type=${prepared ? 'success' : 'warning'}
          .visible=${this.company !== null}
          .dismissible=${false}
          .duration=${0}>
          <Title>${prepared ? this.msg.preparedTitle : this.msg.missingData}</Title>
          <Message>${prepared ? this.msg.preparedMessage : (this.company?.details.onboarding.missingData ?? '')}</Message>
        </groupnotifyuser--ml-notify-banner>
        ${loading ? html`
          <groupshowprogress--ml-segmented-progress
            .value=${null}
            size="sm"
            .label=${this.msg.preparationLoading}
            .showValue=${false}>
          </groupshowprogress--ml-segmented-progress>
        ` : ''}
      </section>
    `;
  }

  renderCompanyForm() {
    const draft = this.saveCompanyDraft ?? emptySaveCompanyDraft();
    const saved = this.company;
    const address = draft.details.base.addresses?.[0] ?? saved?.details.base.addresses?.[0];
    const busy = this.getCompanySetupStatus === 'loading' || this.saveCompanyStatus === 'loading';
    return html`
      <section data-organism-id="companyDataForm" class="space-y-7" aria-busy=${busy}>
        <div class="space-y-4">
          <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.identityTitle}</h2>
          <groupentertext--ml-floating-text-input
            .value=${draft.details.identification.name ?? saved?.details.identification.name ?? ''}
            .name=${this.msg.companyName}
            .placeholder=${this.msg.companyNamePlaceholder}
            .required=${true}
            .disabled=${busy}
            .loading=${this.getCompanySetupStatus === 'loading'}
            @input=${(e: CustomEvent<{ value: string }>) => this.setSaveCompanyDraft({
              ...draft,
              details: { ...draft.details, identification: { ...draft.details.identification, name: e.detail.value || null } },
            })}>
            <Label>${this.msg.companyName}</Label>
          </groupentertext--ml-floating-text-input>
          <groupentertext--ml-floating-text-input
            .value=${draft.details.company.legalName ?? saved?.details.company.legalName ?? ''}
            .name=${this.msg.legalName}
            .placeholder=${this.msg.legalNamePlaceholder}
            .required=${true}
            .disabled=${busy}
            @input=${(e: CustomEvent<{ value: string }>) => this.setSaveCompanyDraft({
              ...draft,
              details: { ...draft.details, company: { ...draft.details.company, legalName: e.detail.value || null } },
            })}>
            <Label>${this.msg.legalName}</Label>
          </groupentertext--ml-floating-text-input>
          <groupselectone--ml-select
            .value=${draft.details.identification.docType ?? saved?.details.identification.docType ?? null}
            .name=${this.msg.documentType}
            .placeholder=${this.msg.documentTypePlaceholder}
            .required=${true}
            .disabled=${busy}
            @change=${(e: CustomEvent<{ value: string | null }>) => this.setSaveCompanyDraft({
              ...draft,
              details: { ...draft.details, identification: { ...draft.details.identification, docType: e.detail.value as DocumentType | null } },
            })}>
            <Label>${this.msg.documentType}</Label>
            ${(['EIN', 'CNPJ', 'VAT', 'NationalId', 'Other'] as DocumentType[]).map((type) => html`<Item value=${type}>${this.msg[DOCUMENT_KEY[type]]}</Item>`)}
          </groupselectone--ml-select>
          <groupentertext--ml-floating-text-input
            .value=${draft.details.identification.docId ?? saved?.details.identification.docId ?? ''}
            .name=${this.msg.documentNumber}
            .placeholder=${this.msg.documentNumberPlaceholder}
            .required=${true}
            .disabled=${busy}
            @input=${(e: CustomEvent<{ value: string }>) => this.setSaveCompanyDraft({
              ...draft,
              details: { ...draft.details, identification: { ...draft.details.identification, docId: e.detail.value || null } },
            })}>
            <Label>${this.msg.documentNumber}</Label>
          </groupentertext--ml-floating-text-input>
          <groupselectone--ml-select-one-autocomplete
            .value=${draft.details.identification.countryCode ?? saved?.details.identification.countryCode ?? null}
            .name=${this.msg.companyCountry}
            .placeholder=${this.msg.companyCountryPlaceholder}
            .searchable=${true}
            .clearable=${true}
            .required=${true}
            .disabled=${busy}
            .loading=${this.getCompanySetupStatus === 'loading'}
            @change=${(e: CustomEvent<{ value: string | null }>) => this.setSaveCompanyDraft({
              ...draft,
              details: { ...draft.details, identification: { ...draft.details.identification, countryCode: e.detail.value } },
            })}>
            <Label>${this.msg.companyCountry}</Label>
            ${this.countries.map((country) => html`<Item value=${country.isoCode}>${country.details.displayName}</Item>`)}
            <Empty>${this.msg.noCountries}</Empty>
          </groupselectone--ml-select-one-autocomplete>
        </div>
        <div class="space-y-4 border-t border-[var(--border-subtle,currentColor)] pt-6">
          <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.addressTitle}</h2>
          <p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.addressHelper}</p>
          <groupselectone--ml-select
            .value=${address?.type ?? null}
            .name=${this.msg.addressType}
            .placeholder=${this.msg.addressTypePlaceholder}
            .required=${true}
            .disabled=${busy}
            @change=${(e: CustomEvent<{ value: string | null }>) => this.setSaveCompanyDraft({
              ...draft,
              details: {
                ...draft.details,
                base: {
                  ...draft.details.base,
                  addresses: updatedAddress(draft, saved?.details.base.addresses, saved?.details.identification.countryCode, 'street', address?.line1 ?? '').map((item, index) => index === 0 ? { ...item, type: (e.detail.value ?? 'Commercial') as Address['type'] } : item),
                },
              },
            })}>
            <Label>${this.msg.addressType}</Label>
            <Item value="Commercial">${this.msg.addressTypeCommercial}</Item>
            <Item value="Residential">${this.msg.addressTypeResidential}</Item>
            <Item value="Billing">${this.msg.addressTypeBilling}</Item>
            <Item value="Delivery">${this.msg.addressTypeDelivery}</Item>
            <Item value="Other">${this.msg.addressTypeOther}</Item>
          </groupselectone--ml-select>
          <groupentertext--ml-address-field
            .postalCode=${address?.postalCode ?? ''}
            .street=${streetAndNumber(address?.line1).street}
            .number=${streetAndNumber(address?.line1).number}
            .complement=${address?.line2 ?? ''}
            .neighborhood=${address?.line3 ?? ''}
            .city=${address?.city ?? ''}
            .stateCode=${address?.stateOrProvince ?? ''}
            .name=${this.msg.addressTitle}
            .streetRequired=${true}
            .disabled=${busy}
            @input=${(e: CustomEvent<{ field: AddressField; value: string }>) => this.setSaveCompanyDraft({
              ...draft,
              details: {
                ...draft.details,
                base: { ...draft.details.base, addresses: updatedAddress(draft, saved?.details.base.addresses, saved?.details.identification.countryCode, e.detail.field, e.detail.value) },
              },
            })}>
          </groupentertext--ml-address-field>
        </div>
        <div class="space-y-2 border-t border-[var(--border-subtle,currentColor)] pt-6">
          <h2 class="text-base font-semibold text-[var(--text-strong,currentColor)]">${this.msg.contactsTitle}</h2>
          ${saved?.details.base.contacts?.length ? html`
            <ul class="space-y-2 text-sm text-[var(--text-default,currentColor)]">
              ${saved.details.base.contacts.map((contact) => html`<li class="rounded-lg bg-[var(--surface-alt-bg,transparent)] px-3 py-2">${contact.title}</li>`)}
            </ul>
          ` : html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.msg.noContacts}</p>`}
          <groupselectone--ml-select
            .value=${draft.companyContact.contactType ?? saved?.companyContact?.contactType ?? null}
            .name=${'contact-type'}
            .placeholder=${this.msg.selectContactType}
            .required=${true}
            .disabled=${busy}
            @change=${(e: CustomEvent<{ value: string | null }>) => { if (e.target !== e.currentTarget) return; this.setSaveCompanyDraft({ ...draft, companyContact: { ...draft.companyContact, contactType: e.detail.value === 'Phone' || e.detail.value === 'Email' ? e.detail.value : null } }); }}>
            <Label>${this.msg.contactType}</Label>
            <Item value="Phone">${this.msg.contactPhone}</Item>
            <Item value="Email">${this.msg.contactEmail}</Item>
          </groupselectone--ml-select>
          <groupentertext--ml-enter-text
            .value=${draft.companyContact.value ?? saved?.companyContact?.value ?? ''}
            .name=${'contact-value'}
            .placeholder=${this.msg.contactValuePlaceholder}
            .required=${true}
            .disabled=${busy}
            @input=${(e: CustomEvent<{ value: string }>) => { if (typeof e.detail?.value !== 'string') return; this.setSaveCompanyDraft({ ...draft, companyContact: { ...draft.companyContact, value: e.detail.value } }); }}>
            <Label>${this.msg.contactValue}</Label>
          </groupentertext--ml-enter-text>
        </div>
      </section>
    `;
  }

  renderActions() {
    const busy = this.saveCompanyStatus === 'loading';
    return html`
      <section data-organism-id="saveCompanyActions" class="space-y-3 pb-8">
        <groupnotifyuser--ml-contextual-feedback type="error" .visible=${this.saveCompanyStatus === 'error'} .dismissible=${false} .duration=${0}>
          <Title>${this.msg.saveErrorTitle}</Title>
          <Message>${this.msg.saveErrorMessage}</Message>
          <Action><button type="button" @click=${() => this.saveCompany()}>${this.msg.tryAgain}</button></Action>
        </groupnotifyuser--ml-contextual-feedback>
        <groupnotifyuser--ml-toast-notification type="success" .visible=${this.saveCompanyStatus === 'success'} .dismissible=${false} .duration=${4000} position="bottom">
          <Title>${this.msg.saveSuccessTitle}</Title>
          <Message>${this.msg.saveSuccessMessage}</Message>
        </groupnotifyuser--ml-toast-notification>
        <grouptriggeraction--ml-button-standard data-variant="primary" size="lg" type="button" data-class="w-full" .disabled=${this.getCompanySetupStatus === 'loading'} .loading=${busy} @action=${() => this.saveCompany()}>
          <Label>${busy ? this.msg.savingCompany : this.msg.saveCompany}</Label>
        </grouptriggeraction--ml-button-standard>
      </section>
    `;
  }

  renderGuidance() {
    return html`
      <section data-organism-id="studioGuidance">
        ${this.company?.details.onboarding.isPrepared ? html`
          <groupviewcard--ml-vertical-card>
            <CardHeader>
              <CardTitle>${this.msg.studioTitle}</CardTitle>
              <CardDescription>${this.msg.studioDescription}</CardDescription>
            </CardHeader>
            <CardContent><p class="text-sm text-[var(--text-default,currentColor)]">${this.msg.studioBody}</p></CardContent>
          </groupviewcard--ml-vertical-card>
        ` : ''}
      </section>
    `;
  }

  render() {
    this.msg = pageMessages[this.getMessageKey(pageMessages)];
    const loadError = this.getCompanySetupStatus === 'error';
    const missingPrecondition = this.getCompanySetupError?.code === 'client.preconditionMissing';
    return html`
      <main class="min-h-full bg-[var(--page-bg,transparent)] px-4 py-6">
        <div class="mx-auto max-w-md space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold tracking-tight text-[var(--text-strong,currentColor)]">${this.msg.pageTitle}</h1>
            ${this.company?.details.identification.name ? html`<p class="text-sm text-[var(--text-muted,currentColor)]">${this.company.details.identification.name}</p>` : ''}
          </header>
          ${this.getCompanySetupStatus === 'loading' && this.company === null ? html`
            <section class="rounded-xl bg-[var(--surface-bg,transparent)] p-4">
              <h2 class="font-medium text-[var(--text-strong,currentColor)]">${this.msg.loadingTitle}</h2>
              <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.loadingMessage}</p>
            </section>
          ` : ''}
          ${loadError ? html`
            <groupnotifyuser--ml-notify-banner type="error" .visible=${true} .dismissible=${false} .duration=${0}>
              <Title>${missingPrecondition ? this.msg.preconditionTitle : this.msg.loadErrorTitle}</Title>
              <Message>${missingPrecondition ? this.msg.preconditionMessage : this.msg.loadErrorMessage}</Message>
              <Action><button type="button" @click=${() => this.getCompanySetup()}>${this.msg.reload}</button></Action>
            </groupnotifyuser--ml-notify-banner>
          ` : ''}
          ${this.pageStatus === 'empty' ? html`
            <section class="rounded-xl border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-4">
              <h2 class="font-medium text-[var(--text-strong,currentColor)]">${this.msg.noCompanyTitle}</h2>
              <p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.noCompanyMessage}</p>
            </section>
          ` : ''}
          ${this.company !== null ? html`
            ${this.renderReadiness()}
            ${this.renderCompanyForm()}
            ${this.renderActions()}
            ${this.renderGuidance()}
          ` : ''}
        </div>
      </main>
    `;
  }
}
