/// <mls fileReference="_102039_/l2/onboarding/web/shared/privacy_text.ts" enhancement="_102020_/l2/enhancementAura"/>
import { property } from 'lit/decorators.js';
import { StateLitElement } from '/_102029_/l2/stateLitElement.js';
import { execBff } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type { Privacy_textContracts, PrivacyTextVersionDetails, PrivacyTextVersionRecord } from '/_102039_/l2/onboarding/web/contracts/privacy_text.defs.js';

export type { Privacy_textContracts, PrivacyTextVersionDetails, PrivacyTextVersionRecord } from '/_102039_/l2/onboarding/web/contracts/privacy_text.defs.js';

type Input<R extends keyof Privacy_textContracts> = Privacy_textContracts[R]['input'];
type Output<R extends keyof Privacy_textContracts> = Privacy_textContracts[R]['output'];

export type ErrorState = { code: string; message: string; details?: unknown } | null;

/** Draft of the new privacy text version the owner is writing; every leaf is null until typed. */
export type CreatePrivacyVersionDraft = {
  details: {
    text: string | null;
    changeNote: string | null;
  };
};

function emptyCreatePrivacyVersionDraft(): CreatePrivacyVersionDraft {
  return { details: { text: null, changeNote: null } };
}

type StateMember =
  | 'current'
  | 'versions'
  | 'draft'
  | 'createPrivacyVersionDraft'
  | 'pageStatus'
  | 'getPrivacyTextPageStatus'
  | 'getPrivacyTextPageError'
  | 'createPrivacyVersionStatus'
  | 'createPrivacyVersionError'
  | 'publishPrivacyVersionStatus'
  | 'publishPrivacyVersionError'
  | 'scenary';

const STATE_MEMBER_BY_KEY: Record<string, StateMember> = {
  'ui.onboarding.privacy_text.current': 'current',
  'ui.onboarding.privacy_text.versions': 'versions',
  'ui.onboarding.privacy_text.draft': 'draft',
  'ui.onboarding.privacy_text.createPrivacyVersionDraft': 'createPrivacyVersionDraft',
  'ui.onboarding.privacy_text.pageStatus': 'pageStatus',
  'ui.onboarding.privacy_text.getPrivacyTextPageStatus': 'getPrivacyTextPageStatus',
  'ui.onboarding.privacy_text.getPrivacyTextPageError': 'getPrivacyTextPageError',
  'ui.onboarding.privacy_text.createPrivacyVersionStatus': 'createPrivacyVersionStatus',
  'ui.onboarding.privacy_text.createPrivacyVersionError': 'createPrivacyVersionError',
  'ui.onboarding.privacy_text.publishPrivacyVersionStatus': 'publishPrivacyVersionStatus',
  'ui.onboarding.privacy_text.publishPrivacyVersionError': 'publishPrivacyVersionError',
  'ui.onboarding.privacy_text.scenary': 'scenary',
};
const STATE_KEYS = Object.keys(STATE_MEMBER_BY_KEY);

export class OnboardingPrivacy_textShared extends StateLitElement {
  /** state current — the current published privacy text version with its code, publication moment, text and provisional flag; null when nothing is published; source getPrivacyTextPage.current; organism currentPrivacyText */
  @property({ attribute: false }) current: PrivacyTextVersionRecord | null = null;

  /** state versions — the full history of privacy text versions, drafts first then published, with code, status, publication moment, change note and isCurrent flag; source getPrivacyTextPage.versions; organism privacyVersionList */
  @property({ attribute: false }) versions: PrivacyTextVersionRecord[] = [];

  /** state draft — the latest pending draft version of the privacy text, null when there is none; this is the version publishPrivacyVersion publishes; source getPrivacyTextPage.draft; organism versionActions */
  @property({ attribute: false }) draft: PrivacyTextVersionRecord | null = null;

  /** state createPrivacyVersionDraft — form draft of the new version (details.text required, details.changeNote optional); source createPrivacyVersion.input; organism newVersionForm */
  @property({ attribute: false }) createPrivacyVersionDraft: CreatePrivacyVersionDraft = emptyCreatePrivacyVersionDraft();

  /** state pageStatus — overall state of the page: idle, loading, empty (nothing loaded), success or error */
  @property({ attribute: false }) pageStatus: 'idle' | 'loading' | 'empty' | 'success' | 'error' = 'idle';

  /** state getPrivacyTextPageStatus — status of the initial load request */
  @property({ attribute: false }) getPrivacyTextPageStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state getPrivacyTextPageError — error of the initial load request, null when none */
  @property({ attribute: false }) getPrivacyTextPageError: ErrorState = null;

  /** state createPrivacyVersionStatus — status of the create-draft command */
  @property({ attribute: false }) createPrivacyVersionStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state createPrivacyVersionError — error of the create-draft command, null when none */
  @property({ attribute: false }) createPrivacyVersionError: ErrorState = null;

  /** state publishPrivacyVersionStatus — status of the publish command */
  @property({ attribute: false }) publishPrivacyVersionStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state publishPrivacyVersionError — error of the publish command, null when none */
  @property({ attribute: false }) publishPrivacyVersionError: ErrorState = null;

  /** state scenary — the visible scene of the page; '' until the page shows its first scene */
  @property({ attribute: false }) scenary = '';

  private publish<M extends StateMember>(member: M, value: this[M]): void {
    (this as unknown as Record<string, unknown>)[member] = value;
    setState(`ui.onboarding.privacy_text.${member}`, value);
  }

  private assignState(key: string, value: unknown): void {
    const member = STATE_MEMBER_BY_KEY[key];
    if (member) (this as unknown as Record<string, unknown>)[member] = value;
  }

  private onPopState = (): void => {
    if (window.location.pathname.endsWith('/onboarding/privacy_text')) {
      this.startVisit();
    }
  };

  public connectedCallback(): void {
    super.connectedCallback();
    const current = getState('ui.onboarding.privacy_text.current');
    if (current !== undefined) this.assignState('ui.onboarding.privacy_text.current', current);
    const versions = getState('ui.onboarding.privacy_text.versions');
    if (versions !== undefined) this.assignState('ui.onboarding.privacy_text.versions', versions);
    const draft = getState('ui.onboarding.privacy_text.draft');
    if (draft !== undefined) this.assignState('ui.onboarding.privacy_text.draft', draft);
    this.resetVisit();
    subscribe([...STATE_KEYS], this);
    window.addEventListener('popstate', this.onPopState);
    void this.getPrivacyTextPage();
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

  private startVisit(): void {
    this.resetVisit();
    void this.getPrivacyTextPage();
  }

  /** Transient members go back to their initial value on every entry. */
  private resetVisit(): void {
    this.publish('pageStatus', 'idle');
    this.publish('getPrivacyTextPageStatus', 'idle');
    this.publish('getPrivacyTextPageError', null);
    this.publish('createPrivacyVersionStatus', 'idle');
    this.publish('createPrivacyVersionError', null);
    this.publish('publishPrivacyVersionStatus', 'idle');
    this.publish('publishPrivacyVersionError', null);
    this.publish('createPrivacyVersionDraft', emptyCreatePrivacyVersionDraft());
    this.publish('scenary', '');
  }

  private resetCommandResults(): void {
    this.publish('createPrivacyVersionStatus', 'idle');
    this.publish('createPrivacyVersionError', null);
    this.publish('publishPrivacyVersionStatus', 'idle');
    this.publish('publishPrivacyVersionError', null);
  }

  /** setScenario — publishes the visible scene of the page (state scenary); clears old command results */
  public setScenario(value: string): void {
    this.resetCommandResults();
    this.publish('scenary', value);
  }

  /** draft — replaces the whole form draft of the new version (details.text required, details.changeNote optional); clears old command results */
  public setCreatePrivacyVersionDraft(value: CreatePrivacyVersionDraft): void {
    this.resetCommandResults();
    this.publish('createPrivacyVersionDraft', value);
  }

  private unexpectedError(error: unknown): ErrorState {
    const name = error instanceof Error ? error.name : 'unknown';
    return { code: 'client.unexpected', message: '', details: { name } };
  }

  /** Inserts or updates a version by id in the history; a new row goes first (drafts at the top). */
  private upsertVersion(rows: PrivacyTextVersionRecord[], version: PrivacyTextVersionRecord): PrivacyTextVersionRecord[] {
    const exists = rows.some(row => row.id === version.id);
    if (exists) return rows.map(row => (row.id === version.id ? version : row));
    return [version, ...rows];
  }

  /** request getPrivacyTextPage — loads the current privacy text, the pending draft and the full version history; redraws current, draft and versions (replace). No arguments; also the method to reload the page data. */
  public async getPrivacyTextPage(): Promise<void> {
    if (this.getPrivacyTextPageStatus === 'loading') return;
    this.publish('getPrivacyTextPageStatus', 'loading');
    this.publish('getPrivacyTextPageError', null);
    this.publish('pageStatus', 'loading');
    try {
      const input: Input<'onboarding.privacy_text.getPrivacyTextPage'> = {};
      const response = await execBff<Output<'onboarding.privacy_text.getPrivacyTextPage'>>('onboarding.privacy_text.getPrivacyTextPage', input, { mode: 'silent' });
      if (!response.ok || !response.data) {
        this.publish('getPrivacyTextPageError', response.error ?? this.unexpectedError(null));
        this.publish('getPrivacyTextPageStatus', 'error');
        this.publish('pageStatus', 'error');
        return;
      }
      const data = response.data;
      const current = data.current ?? null;
      const draft = data.draft ?? null;
      this.publish('current', current);
      this.publish('draft', draft);
      this.publish('versions', [...data.versions]);
      this.publish('getPrivacyTextPageStatus', 'success');
      const isEmpty = current === null && draft === null && data.versions.length === 0;
      this.publish('pageStatus', isEmpty ? 'empty' : 'success');
    } catch (error) {
      this.publish('getPrivacyTextPageError', this.unexpectedError(error));
      this.publish('getPrivacyTextPageStatus', 'error');
      this.publish('pageStatus', 'error');
    }
  }

  /** request createPrivacyVersion — creates a new privacy text version as a draft from the form draft (createPrivacyVersionDraft); redraws draft (replace with the new draft), versions (upsert by id, new row first) and clears the form draft; no arguments; a missing text publishes client.requiredMissing */
  public async createPrivacyVersion(): Promise<void> {
    if (this.createPrivacyVersionStatus === 'loading') return;
    const form = this.createPrivacyVersionDraft;
    const text = form.details.text;
    if (text === null || text.trim() === '') {
      this.publish('createPrivacyVersionError', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: ['createPrivacyVersionDraft.details.text'] },
      });
      this.publish('createPrivacyVersionStatus', 'error');
      return;
    }
    const changeNote = form.details.changeNote;
    const input: Input<'onboarding.privacy_text.createPrivacyVersion'> = {
      details: {
        text,
        ...(changeNote !== null && changeNote !== '' ? { changeNote } : {}),
      },
    };
    this.publish('createPrivacyVersionStatus', 'loading');
    this.publish('createPrivacyVersionError', null);
    try {
      const response = await runBlockingUiAction(signal =>
        execBff<Output<'onboarding.privacy_text.createPrivacyVersion'>>('onboarding.privacy_text.createPrivacyVersion', input, { mode: 'blocking', signal }),
      );
      if (response === undefined) {
        this.publish('createPrivacyVersionError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('createPrivacyVersionStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('createPrivacyVersionError', response.error ?? this.unexpectedError(null));
        this.publish('createPrivacyVersionStatus', 'error');
        return;
      }
      const version = response.data.version;
      this.publish('draft', version);
      this.publish('versions', this.upsertVersion(this.versions, version));
      this.publish('createPrivacyVersionDraft', emptyCreatePrivacyVersionDraft());
      this.publish('createPrivacyVersionStatus', 'success');
    } catch (error) {
      this.publish('createPrivacyVersionError', this.unexpectedError(error));
      this.publish('createPrivacyVersionStatus', 'error');
    }
  }

  /** request publishPrivacyVersion — publishes the pending draft (state draft, with its concurrency version) so it becomes the current privacy text; redraws current (replace with the published version), draft (cleared) and versions (upsert by id); no arguments; with no draft it publishes client.requiredMissing */
  public async publishPrivacyVersion(): Promise<void> {
    if (this.publishPrivacyVersionStatus === 'loading') return;
    const pending = this.draft;
    if (pending === null) {
      this.publish('publishPrivacyVersionError', {
        code: 'client.requiredMissing',
        message: '',
        details: { stateKeys: ['draft'] },
      });
      this.publish('publishPrivacyVersionStatus', 'error');
      return;
    }
    const input: Input<'onboarding.privacy_text.publishPrivacyVersion'> = {
      id: pending.id,
      version: pending.version,
    };
    this.publish('publishPrivacyVersionStatus', 'loading');
    this.publish('publishPrivacyVersionError', null);
    try {
      const response = await runBlockingUiAction(signal =>
        execBff<Output<'onboarding.privacy_text.publishPrivacyVersion'>>('onboarding.privacy_text.publishPrivacyVersion', input, { mode: 'blocking', signal }),
      );
      if (response === undefined) {
        this.publish('publishPrivacyVersionError', { code: 'client.unexpected', message: '', details: { name: 'aborted' } });
        this.publish('publishPrivacyVersionStatus', 'error');
        return;
      }
      if (!response.ok || !response.data) {
        this.publish('publishPrivacyVersionError', response.error ?? this.unexpectedError(null));
        this.publish('publishPrivacyVersionStatus', 'error');
        return;
      }
      const version = response.data.version;
      this.publish('current', version);
      this.publish('draft', null);
      this.publish('versions', this.upsertVersion(this.versions, version));
      this.publish('publishPrivacyVersionStatus', 'success');
    } catch (error) {
      this.publish('publishPrivacyVersionError', this.unexpectedError(error));
      this.publish('publishPrivacyVersionStatus', 'error');
    }
  }
}
