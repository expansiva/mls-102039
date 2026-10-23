/// <mls fileReference="_102039_/l2/onboarding/web/shared/company_setup.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Company_setupContracts, Company, CompanyIdentification, CountryOption, Address } from '/_102039_/l2/onboarding/web/contracts/company_setup.defs.js';

export type { Company_setupContracts, CompanyIdentification, CompanyBase, CompanyLegal, CompanyOnboarding, CompanyDetails, Company, CountryDetails, CountryOption, ContactSummary, Address, GeoPoint } from '/_102039_/l2/onboarding/web/contracts/company_setup.defs.js';

type Input<R extends keyof Company_setupContracts> = Company_setupContracts[R]['input'];
type Output<R extends keyof Company_setupContracts> = Company_setupContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;

type DocType = NonNullable<CompanyIdentification['docType']>;

/** Draft of the saveCompany command: only the company data the owner types (id and version come from the loaded company). Every leaf is null until typed. */
export type SaveCompanyDraft = {
  details: {
    identification: {
      name: string | null;
      docType: DocType | null;
      docId: string | null;
      countryCode: string | null;
    };
    company: {
      legalName: string | null;
    };
    base: {
      addresses: Address[] | null;
    };
  };
  /** The company contact channel; both leaves go together. */
  companyContact: {
    contactType: 'Phone' | 'Email' | null;
    value: string | null;
  };
};

export function emptySaveCompanyDraft(): SaveCompanyDraft {
  return {
    details: {
      identification: { name: null, docType: null, docId: null, countryCode: null },
      company: { legalName: null },
      base: { addresses: null },
    },
    companyContact: { contactType: null, value: null },
  };
}

type StateMember =
  | 'company'
  | 'countries'
  | 'saveCompanyDraft'
  | 'pageStatus'
  | 'getCompanySetupStatus'
  | 'getCompanySetupError'
  | 'saveCompanyStatus'
  | 'saveCompanyError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.onboarding.company_setup.company': 'company',
  'ui.onboarding.company_setup.countries': 'countries',
  'ui.onboarding.company_setup.saveCompanyDraft': 'saveCompanyDraft',
  'ui.onboarding.company_setup.pageStatus': 'pageStatus',
  'ui.onboarding.company_setup.getCompanySetupStatus': 'getCompanySetupStatus',
  'ui.onboarding.company_setup.getCompanySetupError': 'getCompanySetupError',
  'ui.onboarding.company_setup.saveCompanyStatus': 'saveCompanyStatus',
  'ui.onboarding.company_setup.saveCompanyError': 'saveCompanyError',
  'ui.onboarding.company_setup.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

export class OnboardingCompany_setupShared extends StateLitElement {
  /** state company — the organization company of the signed-in login with its data and its computed preparation status; source getCompanySetup.company; organisms companyDataForm, companyReadiness, saveCompanyActions, studioGuidance */
  @property({ attribute: false }) company: Company | null = null;

  /** state countries — the list of active countries the owner may choose as company country; source getCompanySetup.countries; organism companyDataForm */
  @property({ attribute: false }) countries: CountryOption[] = [];

  /** state saveCompanyDraft — draft of the company data the owner types (name, legal name, document type and number, country, addresses); source saveCompany.input; organism companyDataForm; the docId entry param prefills it */
  @property({ attribute: false }) saveCompanyDraft: SaveCompanyDraft = emptySaveCompanyDraft();

  /** state pageStatus — overall status of the page: idle, loading, empty, success or error */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state getCompanySetupStatus — status of the getCompanySetup request */
  @property({ attribute: false }) getCompanySetupStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state getCompanySetupError — error of the getCompanySetup request, null when none */
  @property({ attribute: false }) getCompanySetupError: ErrorState = null;

  /** state saveCompanyStatus — status of the saveCompany command */
  @property({ attribute: false }) saveCompanyStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state saveCompanyError — error of the saveCompany command, null when none (an authority error code differs from a validation one) */
  @property({ attribute: false }) saveCompanyError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private readonly popstateHandler = (): void => {
    if (window.location.pathname.endsWith('/onboarding/company_setup')) {
      this.resetVisit();
      this.applyEntryParams();
      void this.getCompanySetup();
    }
  };

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.onboarding.company_setup.${member}`, value);
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    const company = getState('ui.onboarding.company_setup.company');
    if (company !== undefined) this.assignState('ui.onboarding.company_setup.company', company);
    const countries = getState('ui.onboarding.company_setup.countries');
    if (countries !== undefined) this.assignState('ui.onboarding.company_setup.countries', countries);
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    window.addEventListener('popstate', this.popstateHandler);
    this.applyEntryParams();
    void this.getCompanySetup();
  }

  public disconnectedCallback(): void {
    window.removeEventListener('popstate', this.popstateHandler);
    unsubscribe([...STATE_KEYS], this);
    super.disconnectedCallback();
  }

  public handleIcaStateChange(key: string, value: any): void {
    if (!STATE_MEMBER_BY_KEY[key]) {
      super.handleIcaStateChange(key, value);
      return;
    }
    if (value === undefined) return;
    this.assignState(key, value);
    this.requestUpdate();
  }

  /** Publishes the initial value of every transient member: a new visit never shows an old error, scene or half-filled form. */
  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('getCompanySetupStatus', 'idle');
    this.publish('getCompanySetupError', null);
    this.publish('saveCompanyStatus', 'idle');
    this.publish('saveCompanyError', null);
    this.publish('saveCompanyDraft', emptySaveCompanyDraft());
    this.publish('scenary', '');
  }

  /** Clears the result of every command so an old success or error never sits next to new input. */
  private resetCommandResults(): void {
    this.publish('saveCompanyStatus', 'idle');
    this.publish('saveCompanyError', null);
  }

  /** Reads the docId entry param (URL wins over localStorage) and prefills the document number of the form draft. */
  private applyEntryParams(): void {
    let docId = new URLSearchParams(window.location.search).get('docId');
    if (docId === null) {
      try {
        docId = localStorage.getItem('onboarding.company_setup.docId');
      } catch {
        docId = null;
      }
    }
    if (docId !== null && docId !== '') {
      const draft = emptySaveCompanyDraft();
      draft.details.identification.docId = docId;
      this.publish('saveCompanyDraft', draft);
    }
  }

  /** scene — publishes the visible scene of the page; clears the result of the commands */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the saveCompany form draft (name, legal name, document type and number, country code, addresses); clears the result of the command. Send a new object. */
  public setSaveCompanyDraft(value: SaveCompanyDraft): void {
    this.resetCommandResults();
    this.publish('saveCompanyDraft', value);
  }

  /** request getCompanySetup — loads the company of the signed-in login with its computed preparation status and the active countries; redraws company and countries (replace); no arguments. Also the method to reload the page. */
  public async getCompanySetup(): Promise<void> {
    if (this.getCompanySetupStatus === 'loading') return;
    this.publish('getCompanySetupStatus', 'loading');
    this.publish('getCompanySetupError', null);
    this.publish('pageStatus', 'loading');
    try {
      const response = await execBff<Output<'onboarding.company_setup.getCompanySetup'>>(
        'onboarding.company_setup.getCompanySetup',
        {} as Input<'onboarding.company_setup.getCompanySetup'>,
        { mode: 'silent' },
      );
      if (!response.ok || !response.data) {
        this.publish('getCompanySetupError', response.error);
        this.publish('getCompanySetupStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const output = response.data;
      this.publish('company', output.company);
      this.publish('countries', output.countries);
      this.publish('getCompanySetupStatus', 'success');
      this.publish('pageStatus', output.countries.length === 0 && !output.company ? 'empty' : 'success');
    } catch (error) {
      const name = error instanceof Error ? error.name : 'unknown';
      this.publish('getCompanySetupError', { code: 'client.unexpected', message: '', details: { name } });
      this.publish('getCompanySetupStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request saveCompany — saves the missing company data typed in the draft through the platform update, with the loaded company id and version; redraws company with the returned record (replace, new version, recomputed missingData and isPrepared) and empties the draft; no arguments, fill the draft with setSaveCompanyDraft first. */
  public async saveCompany(): Promise<void> {
    const company = this.company;
    if (!company) {
      this.publish('saveCompanyError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['company'] } });
      this.publish('saveCompanyStatus', 'error');
      return;
    }
    const draft = this.saveCompanyDraft.details;
    const identification: Input<'onboarding.company_setup.saveCompany'>['details']['identification'] = {
      ...(draft.identification.name !== null && draft.identification.name !== '' ? { name: draft.identification.name } : {}),
      ...(draft.identification.docType !== null ? { docType: draft.identification.docType } : {}),
      ...(draft.identification.docId !== null && draft.identification.docId !== '' ? { docId: draft.identification.docId } : {}),
      ...(draft.identification.countryCode !== null && draft.identification.countryCode !== '' ? { countryCode: draft.identification.countryCode } : {}),
    };
    const legal: Input<'onboarding.company_setup.saveCompany'>['details']['company'] = {
      ...(draft.company.legalName !== null && draft.company.legalName !== '' ? { legalName: draft.company.legalName } : {}),
    };
    const base: Input<'onboarding.company_setup.saveCompany'>['details']['base'] = {
      ...(draft.base.addresses !== null && draft.base.addresses.length > 0 ? { addresses: draft.base.addresses } : {}),
    };
    const sentContact = this.saveCompanyDraft.companyContact;
    const contactType = sentContact.contactType ?? company.companyContact?.contactType ?? null;
    const contactValue = sentContact.value !== null && sentContact.value.trim() !== '' ? sentContact.value.trim() : null;
    const companyContact = contactType !== null && contactValue !== null ? { contactType, value: contactValue } : undefined;
    const hasData = Object.keys(identification).length > 0 || Object.keys(legal).length > 0 || Object.keys(base).length > 0 || companyContact !== undefined;
    if (!hasData) return;
    const input: Input<'onboarding.company_setup.saveCompany'> = {
      id: company.id,
      version: company.version,
      details: { identification, company: legal, base },
      ...(companyContact !== undefined ? { companyContact } : {}),
    };
    this.publish('saveCompanyStatus', 'loading');
    this.publish('saveCompanyError', null);
    try {
      const response = await runBlockingUiAction(signal =>
        execBff<Output<'onboarding.company_setup.saveCompany'>>('onboarding.company_setup.saveCompany', input, { mode: 'blocking', signal }),
      );
      if (response === undefined) {
        this.publish('saveCompanyError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('saveCompanyStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('saveCompanyError', response.error);
        this.publish('saveCompanyStatus', 'error');
        return;
      }
      this.publish('company', response.data.company);
      this.publish('saveCompanyDraft', emptySaveCompanyDraft());
      this.publish('saveCompanyStatus', 'success');
    } catch (error) {
      const name = error instanceof Error ? error.name : 'unknown';
      this.publish('saveCompanyError', { code: 'client.unexpected', message: '', details: { name } });
      this.publish('saveCompanyStatus', 'error');
    }
  }
}
