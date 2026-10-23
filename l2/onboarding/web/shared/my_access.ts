/// <mls fileReference="_102039_/l2/onboarding/web/shared/my_access.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { My_accessContracts, AccessMember, CountryOption, ConsentState } from '/_102039_/l2/onboarding/web/contracts/my_access.defs.js';

export type { My_accessContracts, AccessMember, CountryOption, PrivacyText, ConsentState } from '/_102039_/l2/onboarding/web/contracts/my_access.defs.js';

type Input<R extends keyof My_accessContracts> = My_accessContracts[R]['input'];
type Output<R extends keyof My_accessContracts> = My_accessContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;

/** Draft of the saveMyAccess command: only what the person types or ticks; id and version come from the loaded member. */
export type SaveMyAccessDraft = {
  details: {
    identification: {
      name: string | null;
      countryCode: string | null;
    };
    person: {
      privacyConsent: {
        consentVersion: string | null;
        consentedAt: string | null;
        channel: string | null;
      };
    };
  };
};

export function emptySaveMyAccessDraft(): SaveMyAccessDraft {
  return {
    details: {
      identification: { name: null, countryCode: null },
      person: { privacyConsent: { consentVersion: null, consentedAt: null, channel: null } },
    },
  };
}

type StateMember =
  | 'member'
  | 'countries'
  | 'consent'
  | 'selectedOrganizationMember'
  | 'saveMyAccessDraft'
  | 'pageStatus'
  | 'getMyAccessStatus'
  | 'getMyAccessError'
  | 'checkCountryConsentStatus'
  | 'checkCountryConsentError'
  | 'saveMyAccessStatus'
  | 'saveMyAccessError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.onboarding.my_access.member': 'member',
  'ui.onboarding.my_access.countries': 'countries',
  'ui.onboarding.my_access.consent': 'consent',
  'ui.onboarding.my_access.selectedOrganizationMember': 'selectedOrganizationMember',
  'ui.onboarding.my_access.saveMyAccessDraft': 'saveMyAccessDraft',
  'ui.onboarding.my_access.pageStatus': 'pageStatus',
  'ui.onboarding.my_access.getMyAccessStatus': 'getMyAccessStatus',
  'ui.onboarding.my_access.getMyAccessError': 'getMyAccessError',
  'ui.onboarding.my_access.checkCountryConsentStatus': 'checkCountryConsentStatus',
  'ui.onboarding.my_access.checkCountryConsentError': 'checkCountryConsentError',
  'ui.onboarding.my_access.saveMyAccessStatus': 'saveMyAccessStatus',
  'ui.onboarding.my_access.saveMyAccessError': 'saveMyAccessError',
  'ui.onboarding.my_access.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);
const DATA_KEYS = [
  'ui.onboarding.my_access.member',
  'ui.onboarding.my_access.countries',
  'ui.onboarding.my_access.consent',
];

export class OnboardingMy_accessShared extends StateLitElement {
  /** state member — the signed-in person's own access record: identity data, read-only login e-mail and the computed access status; source getMyAccess.member; organisms accessStatusSummary, missingDataForm, saveAccessActions */
  @property({ attribute: false }) member: AccessMember | null = null;

  /** state countries — the active countries of the module list, with ISO code, English name and name in the user language; source getMyAccess.countries; organism missingDataForm */
  @property({ attribute: false }) countries: CountryOption[] = [];

  /** state consent — the privacy consent situation (required, valid, and the current privacy text when required) for the saved country or, after checkCountryConsent, for the country chosen on screen; source getMyAccess.consent; organism privacyConsentDetail */
  @property({ attribute: false }) consent: ConsentState | null = null;

  /** state selectedOrganizationMember — the id of the OrganizationMember selected in missingDataForm; source entry.params.organizationMemberId; organisms missingDataForm, privacyConsentDetail; lives in the URL only */
  @property({ attribute: false }) selectedOrganizationMember: string | null = null;

  /** state saveMyAccessDraft — the form draft of saveMyAccess: typed name, chosen country and the explicit privacy acceptance (all null until filled); source saveMyAccess.input; organism missingDataForm */
  @property({ attribute: false }) saveMyAccessDraft: SaveMyAccessDraft = emptySaveMyAccessDraft();

  /** state pageStatus — overall status of the page load: idle, loading, empty (no active countries), success or error; source page */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state getMyAccessStatus — status of the getMyAccess request; source getMyAccess */
  @property({ attribute: false }) getMyAccessStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state getMyAccessError — error of the getMyAccess request, null when none; source getMyAccess */
  @property({ attribute: false }) getMyAccessError: ErrorState = null;

  /** state checkCountryConsentStatus — status of the checkCountryConsent request; source checkCountryConsent */
  @property({ attribute: false }) checkCountryConsentStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state checkCountryConsentError — error of the checkCountryConsent request, null when none; source checkCountryConsent */
  @property({ attribute: false }) checkCountryConsentError: ErrorState = null;

  /** state saveMyAccessStatus — status of the saveMyAccess command; source saveMyAccess */
  @property({ attribute: false }) saveMyAccessStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state saveMyAccessError — error of the saveMyAccess command, null when none; source saveMyAccess */
  @property({ attribute: false }) saveMyAccessError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private pendingConsentCountry: string | null = null;

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.onboarding.my_access.${member}`, value);
    if (member === 'selectedOrganizationMember') {
      try {
        const url = new URL(window.location.href);
        if (value === null || value === undefined || value === '') {
          url.searchParams.delete('organizationMemberId');
        } else {
          url.searchParams.set('organizationMemberId', String(value));
        }
        history.replaceState(history.state, '', `${url.pathname}${url.search}${url.hash}`);
      } catch {
        // URL update is best effort
      }
    }
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  private readonly onPopState = (): void => {
    if (!window.location.pathname.endsWith('/onboarding/my_access')) return;
    this.resetVisit();
    this.applyEntryParams();
    void this.getMyAccess();
  };

  public connectedCallback(): void {
    super.connectedCallback();
    for (const key of DATA_KEYS) {
      const stored = getState(key);
      if (stored !== undefined) this.assignState(key, stored);
    }
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    window.addEventListener('popstate', this.onPopState);
    this.applyEntryParams();
    void this.getMyAccess();
  }

  public disconnectedCallback(): void {
    window.removeEventListener('popstate', this.onPopState);
    unsubscribe([...STATE_KEYS], this);
    super.disconnectedCallback();
  }

  public handleIcaStateChange(key: string, value: any): void {
    if (!(key in STATE_MEMBER_BY_KEY)) {
      super.handleIcaStateChange(key, value);
      return;
    }
    if (value === undefined) return;
    this.assignState(key, value);
    this.requestUpdate();
  }

  /** Resets every transient member (statuses, errors, scene, draft) at the start of a visit. */
  private resetVisit(): void {
    this.pendingConsentCountry = null;
    this.publish('pageStatus', 'idle');
    this.publish('getMyAccessStatus', 'idle');
    this.publish('getMyAccessError', null);
    this.publish('checkCountryConsentStatus', 'idle');
    this.publish('checkCountryConsentError', null);
    this.publish('saveMyAccessStatus', 'idle');
    this.publish('saveMyAccessError', null);
    this.publish('scenary', '');
    this.publish('saveMyAccessDraft', emptySaveMyAccessDraft());
  }

  /** Clears the result of every command so an old success or error never sits next to new input. */
  private resetCommandResults(): void {
    this.publish('saveMyAccessStatus', 'idle');
    this.publish('saveMyAccessError', null);
  }

  private applyEntryParams(): void {
    const raw = new URLSearchParams(window.location.search).get('organizationMemberId');
    this.publish('selectedOrganizationMember', raw !== null && raw !== '' ? raw : null);
  }

  private unexpectedError(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  /** scene — publishes the visible scene of the page; resets the result of any command. */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the whole saveMyAccess form draft (name, country, acceptance); resets the result of the command. */
  public setSaveMyAccessDraft(value: SaveMyAccessDraft): void {
    this.resetCommandResults();
    this.publish('saveMyAccessDraft', value);
  }

  /** draft — sets the typed name in the saveMyAccess draft (only asked when the member name is missing); null or '' clears it. */
  public setMemberName(name: string | null): void {
    this.resetCommandResults();
    const draft = this.saveMyAccessDraft;
    this.publish('saveMyAccessDraft', {
      details: {
        identification: { ...draft.details.identification, name: name !== null && name !== '' ? name : null },
        person: { privacyConsent: { ...draft.details.person.privacyConsent } },
      },
    });
  }

  /** select — chooses the country (ISO code from the active list) in the draft, drops any privacy acceptance already ticked (never auto-accepted) and asks checkCountryConsent for the chosen country; null or '' clears the choice. Other typed data is kept. */
  public chooseCountry(countryCode: string | null): void {
    this.resetCommandResults();
    const draft = this.saveMyAccessDraft;
    const code = countryCode !== null && countryCode !== '' ? countryCode : null;
    this.publish('saveMyAccessDraft', {
      details: {
        identification: { ...draft.details.identification, countryCode: code },
        person: { privacyConsent: { consentVersion: null, consentedAt: null, channel: null } },
      },
    });
    if (code !== null) void this.checkCountryConsent(code);
  }

  /** draft — ticks (true) or unticks (false) the explicit acceptance of the current privacy text shown in consent.privacyText; ticking records its version code, the moment and the channel; it always starts unticked. */
  public acceptPrivacy(accepted: boolean): void {
    this.resetCommandResults();
    const draft = this.saveMyAccessDraft;
    if (!accepted) {
      this.publish('saveMyAccessDraft', {
        details: {
          identification: { ...draft.details.identification },
          person: { privacyConsent: { consentVersion: null, consentedAt: null, channel: null } },
        },
      });
      return;
    }
    const text = this.consent !== null ? this.consent.privacyText : undefined;
    if (!text) {
      this.publish('saveMyAccessError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['consent'] } });
      this.publish('saveMyAccessStatus', 'error');
      return;
    }
    this.publish('saveMyAccessDraft', {
      details: {
        identification: { ...draft.details.identification },
        person: { privacyConsent: { consentVersion: text.versionCode, consentedAt: new Date().toISOString(), channel: 'checkbox' } },
      },
    });
  }

  /** select — selects the OrganizationMember by id (null clears); the id must be the loaded member's id, otherwise client.selectionInvalid is published in getMyAccessError. */
  public selectOrganizationMember(id: string | null): void {
    this.resetCommandResults();
    if (id !== null && this.member !== null && this.member.id !== id) {
      this.publish('getMyAccessError', { code: 'client.selectionInvalid', message: '', details: { id } });
      return;
    }
    this.publish('selectedOrganizationMember', id);
  }

  /** request getMyAccess — loads the signed-in person's access record, the active countries and the consent situation for the saved country in one call; redraws member, countries and consent (replace); no arguments, also the method to reload the page */
  public async getMyAccess(): Promise<void> {
    if (this.getMyAccessStatus === 'loading') return;
    this.publish('getMyAccessStatus', 'loading');
    this.publish('getMyAccessError', null);
    this.publish('pageStatus', 'loading');
    try {
      const input: Input<'onboarding.my_access.getMyAccess'> = {};
      const response = await execBff<Output<'onboarding.my_access.getMyAccess'>>('onboarding.my_access.getMyAccess', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('getMyAccessError', response.error ?? this.unexpectedError(null));
        this.publish('getMyAccessStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const data = response.data;
      this.publish('member', data.member);
      this.publish('countries', data.countries);
      this.publish('consent', data.consent);
      this.publish('getMyAccessStatus', 'success');
      this.publish('pageStatus', data.countries.length === 0 ? 'empty' : 'success');
    } catch (error) {
      this.publish('getMyAccessError', this.unexpectedError(error));
      this.publish('getMyAccessStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request checkCountryConsent — tells, for the country chosen on screen and before saving, whether privacy consent is required and brings the current privacy text; redraws consent (replace); countryCode: two-letter ISO code picked from the active list. Prefer chooseCountry, which also updates the draft. */
  public async checkCountryConsent(countryCode: string): Promise<void> {
    if (countryCode === '') {
      this.publish('checkCountryConsentError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['saveMyAccessDraft'] } });
      this.publish('checkCountryConsentStatus', 'error');
      return;
    }
    if (this.checkCountryConsentStatus === 'loading') {
      this.pendingConsentCountry = countryCode;
      return;
    }
    this.publish('checkCountryConsentStatus', 'loading');
    this.publish('checkCountryConsentError', null);
    try {
      const input: Input<'onboarding.my_access.checkCountryConsent'> = { countryCode };
      const response = await execBff<Output<'onboarding.my_access.checkCountryConsent'>>('onboarding.my_access.checkCountryConsent', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('checkCountryConsentError', response.error ?? this.unexpectedError(null));
        this.publish('checkCountryConsentStatus', 'error');
      } else {
        this.publish('consent', response.data.consent);
        this.publish('checkCountryConsentStatus', 'success');
      }
    } catch (error) {
      this.publish('checkCountryConsentError', this.unexpectedError(error));
      this.publish('checkCountryConsentStatus', 'error');
    }
    const pending = this.pendingConsentCountry;
    this.pendingConsentCountry = null;
    if (pending !== null && pending !== countryCode) {
      await this.checkCountryConsent(pending);
    }
  }

  /** request saveMyAccess — saves the missing name and country from sasaveMyAccessDraft and, when ticked, the explicit privacy acceptance; id and version come from member; redraws member and consent (replace with the returned values, no reload) and empties the draft; does nothing when the draft has nothing to send; no arguments */
  public async saveMyAccess(): Promise<void> {
    if (this.saveMyAccessStatus === 'loading') return;
    const member = this.member;
    if (!member) {
      this.publish('saveMyAccessError', { code: 'client.requiredMissing', message: '', details: { stateKeys: ['member'] } });
      this.publish('saveMyAccessStatus', 'error');
      return;
    }
    const draft = this.saveMyAccessDraft;
    const name = draft.details.identification.name;
    const countryCode = draft.details.identification.countryCode;
    const consentVersion = draft.details.person.privacyConsent.consentVersion;
    const hasName = name !== null && name !== '';
    const hasCountry = countryCode !== null && countryCode !== '';
    const hasConsent = consentVersion !== null && consentVersion !== '';
    if (!hasName && !hasCountry && !hasConsent) return;
    const consentedAt = draft.details.person.privacyConsent.consentedAt;
    const channel = draft.details.person.privacyConsent.channel;
    const input: Input<'onboarding.my_access.saveMyAccess'> = {
      id: member.id,
      version: member.version,
      details: {
        identification: {
          ...(hasName ? { name } : {}),
          ...(hasCountry ? { countryCode } : {}),
        },
        person: {
          privacyConsent: hasConsent
            ? {
                consentVersion,
                consentedAt: consentedAt !== null && consentedAt !== '' ? consentedAt : new Date().toISOString(),
                channel: channel !== null && channel !== '' ? channel : 'checkbox',
              }
            : {},
        },
      },
    };
    this.publish('saveMyAccessStatus', 'loading');
    this.publish('saveMyAccessError', null);
    try {
      const response = await runBlockingUiAction(signal => execBff<Output<'onboarding.my_access.saveMyAccess'>>('onboarding.my_access.saveMyAccess', input, { mode: 'blocking', signal }));
      if (response === undefined) {
        this.publish('saveMyAccessError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('saveMyAccessStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('saveMyAccessError', response.error ?? this.unexpectedError(null));
        this.publish('saveMyAccessStatus', 'error');
        return;
      }
      this.publish('member', response.data.member);
      this.publish('consent', response.data.consent);
      this.publish('saveMyAccessDraft', emptySaveMyAccessDraft());
      this.publish('saveMyAccessStatus', 'success');
    } catch (error) {
      this.publish('saveMyAccessError', this.unexpectedError(error));
      this.publish('saveMyAccessStatus', 'error');
    }
  }
}
