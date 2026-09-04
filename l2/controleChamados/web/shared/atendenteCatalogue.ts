/// <mls fileReference="_102039_/l2/controleChamados/web/shared/atendenteCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type {
  QryListAtendenteInput,
  QryListAtendenteOutput,
  CmdCreateAtendenteInput,
  CmdCreateAtendenteOutput,
  CmdUpdateAtendenteInput,
  CmdUpdateAtendenteOutput,
  CmdInactivateAtendenteInput,
  CmdInactivateAtendenteOutput,
  CmdReactivateAtendenteInput,
  CmdReactivateAtendenteOutput,
  QryGetAtendenteInput,
  QryGetAtendenteOutput,
} from '/_102039_/l2/controleChamados/web/contracts/atendenteCatalogue.js';
import {
  qryListAtendenteRoute,
  cmdCreateAtendenteRoute,
  cmdUpdateAtendenteRoute,
  cmdInactivateAtendenteRoute,
  cmdReactivateAtendenteRoute,
  qryGetAtendenteRoute,
} from '/_102039_/l2/controleChamados/web/contracts/atendenteCatalogue.js';

export type {
  QryListAtendenteInput,
  QryListAtendenteOutput,
  CmdCreateAtendenteInput,
  CmdCreateAtendenteOutput,
  CmdUpdateAtendenteInput,
  CmdUpdateAtendenteOutput,
  CmdInactivateAtendenteInput,
  CmdInactivateAtendenteOutput,
  CmdReactivateAtendenteInput,
  CmdReactivateAtendenteOutput,
  QryGetAtendenteInput,
  QryGetAtendenteOutput,
} from '/_102039_/l2/controleChamados/web/contracts/atendenteCatalogue.js';


const SUBSCRIBED_STATE_KEYS: string[] = [
  'ui.atendenteCatalogue.status',
  'ui.atendenteCatalogue.scenary',
  'ui.atendenteCatalogue.action.qryListAtendente.status',
  'ui.atendenteCatalogue.data.qryListAtendente',
  'ui.atendenteCatalogue.action.cmdCreateAtendente.status',
  'ui.atendenteCatalogue.input.cmdCreateAtendente.platformUserId',
  'ui.atendenteCatalogue.output.cmdCreateAtendente',
  'ui.atendenteCatalogue.action.cmdCreateAtendente.error',
  'ui.atendenteCatalogue.action.cmdUpdateAtendente.status',
  'ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId',
  'ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId',
  'ui.atendenteCatalogue.output.cmdUpdateAtendente',
  'ui.atendenteCatalogue.action.cmdUpdateAtendente.error',
  'ui.atendenteCatalogue.action.cmdInactivateAtendente.status',
  'ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId',
  'ui.atendenteCatalogue.output.cmdInactivateAtendente',
  'ui.atendenteCatalogue.action.cmdInactivateAtendente.error',
  'ui.atendenteCatalogue.action.cmdReactivateAtendente.status',
  'ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId',
  'ui.atendenteCatalogue.output.cmdReactivateAtendente',
  'ui.atendenteCatalogue.action.cmdReactivateAtendente.error',
  'ui.atendenteCatalogue.action.qryGetAtendente.status',
  'ui.atendenteCatalogue.input.qryGetAtendente.atendenteId',
  'ui.atendenteCatalogue.data.qryGetAtendente',
];

export class ControleChamadosAtendenteCatalogueBase extends CollabLitElement {
  /** state status — pageStatus */
  @property() status: string = '';
  /** state ui.atendenteCatalogue.scenary — values: base|detail|createAtendente|updateAtendente|inactivateAtendente|reactivateAtendente */
  @property() uiScenary: 'base' | 'detail' | 'createAtendente' | 'updateAtendente' | 'inactivateAtendente' | 'reactivateAtendente' = 'base';
  /** state qryListAtendenteState — actionStatus, values: idle|loading|success|error */
  @property() qryListAtendenteState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state qryListAtendenteData — queryResult, outputShape: array */
  @property() qryListAtendenteData: QryListAtendenteOutput[] = [];
  /** state cmdCreateAtendenteState — actionStatus, values: idle|loading|success|error */
  @property() cmdCreateAtendenteState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state cmdCreateAtendentePlatformUserId — input */
  @property() cmdCreateAtendentePlatformUserId: string = '';
  /** state cmdCreateAtendenteOutput — commandOutput */
  @property() cmdCreateAtendenteOutput: CmdCreateAtendenteOutput | null = null;
  /** state cmdCreateAtendenteError — actionError */
  @property() cmdCreateAtendenteError: string = '';
  /** state cmdUpdateAtendenteState — actionStatus, values: idle|loading|success|error */
  @property() cmdUpdateAtendenteState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state cmdUpdateAtendenteAtendenteId — input */
  @property() cmdUpdateAtendenteAtendenteId: string = '';
  /** state cmdUpdateAtendentePlatformUserId — input */
  @property() cmdUpdateAtendentePlatformUserId: string = '';
  /** state cmdUpdateAtendenteOutput — commandOutput */
  @property() cmdUpdateAtendenteOutput: CmdUpdateAtendenteOutput | null = null;
  /** state cmdUpdateAtendenteError — actionError */
  @property() cmdUpdateAtendenteError: string = '';
  /** state cmdInactivateAtendenteState — actionStatus, values: idle|loading|success|error */
  @property() cmdInactivateAtendenteState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state cmdInactivateAtendenteAtendenteId — input */
  @property() cmdInactivateAtendenteAtendenteId: string = '';
  /** state cmdInactivateAtendenteOutput — commandOutput */
  @property() cmdInactivateAtendenteOutput: CmdInactivateAtendenteOutput | null = null;
  /** state cmdInactivateAtendenteError — actionError */
  @property() cmdInactivateAtendenteError: string = '';
  /** state cmdReactivateAtendenteState — actionStatus, values: idle|loading|success|error */
  @property() cmdReactivateAtendenteState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state cmdReactivateAtendenteAtendenteId — input */
  @property() cmdReactivateAtendenteAtendenteId: string = '';
  /** state cmdReactivateAtendenteOutput — commandOutput */
  @property() cmdReactivateAtendenteOutput: CmdReactivateAtendenteOutput | null = null;
  /** state cmdReactivateAtendenteError — actionError */
  @property() cmdReactivateAtendenteError: string = '';
  /** state qryGetAtendenteState — actionStatus, values: idle|loading|success|error */
  @property() qryGetAtendenteState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state qryGetAtendenteAtendenteId — input */
  @property() qryGetAtendenteAtendenteId: string = '';
  /** state qryGetAtendenteData — queryResult, outputShape: object */
  @property() qryGetAtendenteData: QryGetAtendenteOutput | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.initStateValue('ui.atendenteCatalogue.status', '');
    this.initStateValue('ui.atendenteCatalogue.scenary', 'base');
    this.initStateValue('ui.atendenteCatalogue.action.qryListAtendente.status', 'idle');
    this.initStateValue('ui.atendenteCatalogue.data.qryListAtendente', []);
    this.initStateValue('ui.atendenteCatalogue.action.cmdCreateAtendente.status', 'idle');
    this.initStateValue('ui.atendenteCatalogue.input.cmdCreateAtendente.platformUserId', '');
    this.initStateValue('ui.atendenteCatalogue.output.cmdCreateAtendente', null);
    this.initStateValue('ui.atendenteCatalogue.action.cmdCreateAtendente.error', '');
    this.initStateValue('ui.atendenteCatalogue.action.cmdUpdateAtendente.status', 'idle');
    this.initStateValue('ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId', '');
    this.initStateValue('ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId', '');
    this.initStateValue('ui.atendenteCatalogue.output.cmdUpdateAtendente', null);
    this.initStateValue('ui.atendenteCatalogue.action.cmdUpdateAtendente.error', '');
    this.initStateValue('ui.atendenteCatalogue.action.cmdInactivateAtendente.status', 'idle');
    this.initStateValue('ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId', '');
    this.initStateValue('ui.atendenteCatalogue.output.cmdInactivateAtendente', null);
    this.initStateValue('ui.atendenteCatalogue.action.cmdInactivateAtendente.error', '');
    this.initStateValue('ui.atendenteCatalogue.action.cmdReactivateAtendente.status', 'idle');
    this.initStateValue('ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId', '');
    this.initStateValue('ui.atendenteCatalogue.output.cmdReactivateAtendente', null);
    this.initStateValue('ui.atendenteCatalogue.action.cmdReactivateAtendente.error', '');
    this.initStateValue('ui.atendenteCatalogue.action.qryGetAtendente.status', 'idle');
    this.initStateValue('ui.atendenteCatalogue.input.qryGetAtendente.atendenteId', '');
    this.initStateValue('ui.atendenteCatalogue.data.qryGetAtendente', null);
    this.applyUrlScenary();
    subscribe(SUBSCRIBED_STATE_KEYS, this);
    void this.loadQryListAtendente();
  }

  disconnectedCallback(): void {
    unsubscribe(SUBSCRIBED_STATE_KEYS, this);
    super.disconnectedCallback();
  }

  /** handleIcaStateChange — collabState notify contract; maps state keys onto class fields */
  handleIcaStateChange(key: string, value: unknown): void {
    switch (key) {
      case 'ui.atendenteCatalogue.status':
        this.status = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.scenary':
        this.uiScenary = (value as 'base' | 'detail' | 'createAtendente' | 'updateAtendente' | 'inactivateAtendente' | 'reactivateAtendente') ?? 'base';
        break;
      case 'ui.atendenteCatalogue.action.qryListAtendente.status':
        this.qryListAtendenteState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.atendenteCatalogue.data.qryListAtendente':
        this.qryListAtendenteData = (value as QryListAtendenteOutput[]) ?? [];
        break;
      case 'ui.atendenteCatalogue.action.cmdCreateAtendente.status':
        this.cmdCreateAtendenteState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.atendenteCatalogue.input.cmdCreateAtendente.platformUserId':
        this.cmdCreateAtendentePlatformUserId = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.output.cmdCreateAtendente':
        this.cmdCreateAtendenteOutput = (value as CmdCreateAtendenteOutput | null) ?? null;
        break;
      case 'ui.atendenteCatalogue.action.cmdCreateAtendente.error':
        this.cmdCreateAtendenteError = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.action.cmdUpdateAtendente.status':
        this.cmdUpdateAtendenteState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId':
        this.cmdUpdateAtendenteAtendenteId = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId':
        this.cmdUpdateAtendentePlatformUserId = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.output.cmdUpdateAtendente':
        this.cmdUpdateAtendenteOutput = (value as CmdUpdateAtendenteOutput | null) ?? null;
        break;
      case 'ui.atendenteCatalogue.action.cmdUpdateAtendente.error':
        this.cmdUpdateAtendenteError = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.action.cmdInactivateAtendente.status':
        this.cmdInactivateAtendenteState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId':
        this.cmdInactivateAtendenteAtendenteId = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.output.cmdInactivateAtendente':
        this.cmdInactivateAtendenteOutput = (value as CmdInactivateAtendenteOutput | null) ?? null;
        break;
      case 'ui.atendenteCatalogue.action.cmdInactivateAtendente.error':
        this.cmdInactivateAtendenteError = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.action.cmdReactivateAtendente.status':
        this.cmdReactivateAtendenteState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId':
        this.cmdReactivateAtendenteAtendenteId = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.output.cmdReactivateAtendente':
        this.cmdReactivateAtendenteOutput = (value as CmdReactivateAtendenteOutput | null) ?? null;
        break;
      case 'ui.atendenteCatalogue.action.cmdReactivateAtendente.error':
        this.cmdReactivateAtendenteError = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.action.qryGetAtendente.status':
        this.qryGetAtendenteState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.atendenteCatalogue.input.qryGetAtendente.atendenteId':
        this.qryGetAtendenteAtendenteId = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.data.qryGetAtendente':
        this.qryGetAtendenteData = (value as QryGetAtendenteOutput | null) ?? null;
        break;
      default:
        break;
    }
    this.requestUpdate();
  }

  private initStateValue(stateKey: string, defaultValue: unknown): void {
    const existing: unknown = getState(stateKey);
    const value: unknown = existing !== undefined ? existing : defaultValue;
    switch (stateKey) {
      case 'ui.atendenteCatalogue.status':
        this.status = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.scenary':
        this.uiScenary = (value as 'base' | 'detail' | 'createAtendente' | 'updateAtendente' | 'inactivateAtendente' | 'reactivateAtendente') ?? 'base';
        break;
      case 'ui.atendenteCatalogue.action.qryListAtendente.status':
        this.qryListAtendenteState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.atendenteCatalogue.data.qryListAtendente':
        this.qryListAtendenteData = (value as QryListAtendenteOutput[]) ?? [];
        break;
      case 'ui.atendenteCatalogue.action.cmdCreateAtendente.status':
        this.cmdCreateAtendenteState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.atendenteCatalogue.input.cmdCreateAtendente.platformUserId':
        this.cmdCreateAtendentePlatformUserId = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.output.cmdCreateAtendente':
        this.cmdCreateAtendenteOutput = (value as CmdCreateAtendenteOutput | null) ?? null;
        break;
      case 'ui.atendenteCatalogue.action.cmdCreateAtendente.error':
        this.cmdCreateAtendenteError = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.action.cmdUpdateAtendente.status':
        this.cmdUpdateAtendenteState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId':
        this.cmdUpdateAtendenteAtendenteId = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId':
        this.cmdUpdateAtendentePlatformUserId = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.output.cmdUpdateAtendente':
        this.cmdUpdateAtendenteOutput = (value as CmdUpdateAtendenteOutput | null) ?? null;
        break;
      case 'ui.atendenteCatalogue.action.cmdUpdateAtendente.error':
        this.cmdUpdateAtendenteError = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.action.cmdInactivateAtendente.status':
        this.cmdInactivateAtendenteState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId':
        this.cmdInactivateAtendenteAtendenteId = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.output.cmdInactivateAtendente':
        this.cmdInactivateAtendenteOutput = (value as CmdInactivateAtendenteOutput | null) ?? null;
        break;
      case 'ui.atendenteCatalogue.action.cmdInactivateAtendente.error':
        this.cmdInactivateAtendenteError = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.action.cmdReactivateAtendente.status':
        this.cmdReactivateAtendenteState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId':
        this.cmdReactivateAtendenteAtendenteId = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.output.cmdReactivateAtendente':
        this.cmdReactivateAtendenteOutput = (value as CmdReactivateAtendenteOutput | null) ?? null;
        break;
      case 'ui.atendenteCatalogue.action.cmdReactivateAtendente.error':
        this.cmdReactivateAtendenteError = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.action.qryGetAtendente.status':
        this.qryGetAtendenteState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.atendenteCatalogue.input.qryGetAtendente.atendenteId':
        this.qryGetAtendenteAtendenteId = (value as string) ?? '';
        break;
      case 'ui.atendenteCatalogue.data.qryGetAtendente':
        this.qryGetAtendenteData = (value as QryGetAtendenteOutput | null) ?? null;
        break;
      default:
        break;
    }
    if (existing === undefined) {
      setState(stateKey, value);
    }
  }

  /** setter for state ui.atendenteCatalogue.scenary */
  setUiScenary(value: string): void {
    const allowed: string[] = ['base', 'detail', 'createAtendente', 'updateAtendente', 'inactivateAtendente', 'reactivateAtendente'];
    if (!allowed.includes(value)) {
      console.warn('setUiScenary: unknown value \'' + value + '\'');
      return;
    }
    let next: string = value;
    if (value === 'detail' && (!this.qryGetAtendenteAtendenteId)) next = 'base';
    if (value === 'updateAtendente' && (!this.cmdUpdateAtendenteAtendenteId)) next = 'base';
    if (value === 'inactivateAtendente' && (!this.cmdInactivateAtendenteAtendenteId)) next = 'base';
    if (value === 'reactivateAtendente' && (!this.cmdReactivateAtendenteAtendenteId)) next = 'base';
    this.uiScenary = next as typeof this.uiScenary;
    setState('ui.atendenteCatalogue.scenary', next);
    this.syncScenaryQuery(next);
    this.requestUpdate();
  }

  /** handler for action set.uiScenary — bind UI events here */
  handleUiScenaryChange(event: Event): void {
    const custom = event as CustomEvent<{ value?: unknown }>;
    const fromDetail: string = custom.detail && typeof custom.detail.value === 'string' ? custom.detail.value : '';
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = fromDetail || (target && 'value' in target ? String(target.value) : '');
    this.setUiScenary(value);
  }

  private applyUrlScenary(): void {
    const params = new URLSearchParams(window.location.search);
    const rawAtendenteId: string = params.get('atendenteId') || '';
    if (rawAtendenteId) {
      if (!this.qryGetAtendenteAtendenteId) {
        this.qryGetAtendenteAtendenteId = rawAtendenteId;
        setState('ui.atendenteCatalogue.input.qryGetAtendente.atendenteId', rawAtendenteId);
      }
      if (!this.cmdUpdateAtendenteAtendenteId) {
        this.cmdUpdateAtendenteAtendenteId = rawAtendenteId;
        setState('ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId', rawAtendenteId);
      }
      if (!this.cmdInactivateAtendenteAtendenteId) {
        this.cmdInactivateAtendenteAtendenteId = rawAtendenteId;
        setState('ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId', rawAtendenteId);
      }
      if (!this.cmdReactivateAtendenteAtendenteId) {
        this.cmdReactivateAtendenteAtendenteId = rawAtendenteId;
        setState('ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId', rawAtendenteId);
      }
    }
    const requested: string = params.get('scenary') || 'base';
    this.setUiScenary(requested);
  }

  private syncScenaryQuery(value: string): void {
    const url = new URL(window.location.href);
    if (value === 'base') url.searchParams.delete('scenary');
    else url.searchParams.set('scenary', value);
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  }

  private readErrorMessage(error: unknown, fallback: string): string {
    if (error && typeof error === 'object') {
      const record = error as { message?: unknown; error?: unknown };
      if (typeof record.message === 'string' && record.message) {
        return record.message;
      }
      if (typeof record.error === 'string' && record.error) {
        return record.error;
      }
    }
    return fallback;
  }

  /** action qryListAtendente (query) "Listar Atendente" — route controleChamados.atendenteCatalogue.qryListAtendente; inputs: (none); writes ui.atendenteCatalogue.data.qryListAtendente; status ui.atendenteCatalogue.action.qryListAtendente.status */
  async loadQryListAtendente(): Promise<void> {
    this.qryListAtendenteState = 'loading';
    setState('ui.atendenteCatalogue.action.qryListAtendente.status', 'loading');
    const params: QryListAtendenteInput = {
    };
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<QryListAtendenteOutput[]>(qryListAtendenteRoute, params, options);
    if (response.ok) {
      const data = response.data ?? [];
      this.qryListAtendenteData = data;
      setState('ui.atendenteCatalogue.data.qryListAtendente', data);
      this.qryListAtendenteState = 'success';
      setState('ui.atendenteCatalogue.action.qryListAtendente.status', 'success');
    } else {
      this.qryListAtendenteState = 'error';
      setState('ui.atendenteCatalogue.action.qryListAtendente.status', 'error');
      if (response.error) {
        console.error('qryListAtendente failed', response.error);
      }
    }
    this.requestUpdate();
  }

  /** handler for action qryListAtendente "Listar Atendente" — bind UI events here */
  handleQryListAtendenteClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void this.loadQryListAtendente();
  }

  /** action cmdCreateAtendente (command) "Criar Atendente" — route controleChamados.atendenteCatalogue.cmdCreateAtendente; inputs: platformUserId; writes ui.atendenteCatalogue.output.cmdCreateAtendente; status ui.atendenteCatalogue.action.cmdCreateAtendente.status; feedback keys action.cmdCreateAtendente.success / action.cmdCreateAtendente.error */
  async cmdCreateAtendente(): Promise<void> {
    this.cmdCreateAtendenteState = 'loading';
    setState('ui.atendenteCatalogue.action.cmdCreateAtendente.status', 'loading');
    this.cmdCreateAtendenteError = '';
    setState('ui.atendenteCatalogue.action.cmdCreateAtendente.error', '');
    const params: CmdCreateAtendenteInput = {
      platformUserId: this.cmdCreateAtendentePlatformUserId,
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdCreateAtendenteOutput>(cmdCreateAtendenteRoute, params, options);
    if (!response.ok) {
      const errMsg: string = this.readErrorMessage(response.error, 'action.cmdCreateAtendente.error');
      this.cmdCreateAtendenteError = errMsg;
      setState('ui.atendenteCatalogue.action.cmdCreateAtendente.error', errMsg);
      this.cmdCreateAtendenteState = 'error';
      setState('ui.atendenteCatalogue.action.cmdCreateAtendente.status', 'error');
      this.requestUpdate();
      return;
    }
    const data: CmdCreateAtendenteOutput | null = response.data ?? null;
    this.cmdCreateAtendenteOutput = data;
    setState('ui.atendenteCatalogue.output.cmdCreateAtendente', data);
    try {
      await this.loadQryListAtendente();
      if (this.qryListAtendenteState === 'error') {
        this.cmdCreateAtendenteState = 'error';
        setState('ui.atendenteCatalogue.action.cmdCreateAtendente.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdCreateAtendente refresh failed', refreshError);
      this.cmdCreateAtendenteState = 'error';
      setState('ui.atendenteCatalogue.action.cmdCreateAtendente.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryGetAtendente();
      if (this.qryGetAtendenteState === 'error') {
        this.cmdCreateAtendenteState = 'error';
        setState('ui.atendenteCatalogue.action.cmdCreateAtendente.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdCreateAtendente refresh failed', refreshError);
      this.cmdCreateAtendenteState = 'error';
      setState('ui.atendenteCatalogue.action.cmdCreateAtendente.status', 'error');
      this.requestUpdate();
      return;
    }
    this.cmdCreateAtendentePlatformUserId = '';
    setState('ui.atendenteCatalogue.input.cmdCreateAtendente.platformUserId', '');
    this.setUiScenary('base');
    this.cmdCreateAtendenteState = 'success';
    setState('ui.atendenteCatalogue.action.cmdCreateAtendente.status', 'success');
    this.requestUpdate();
  }

  /** handler for action cmdCreateAtendente "Criar Atendente" — bind UI events here */
  handleCmdCreateAtendenteClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.cmdCreateAtendente();
    });
  }

  /** action cmdUpdateAtendente (command) "Atualizar Atendente" — route controleChamados.atendenteCatalogue.cmdUpdateAtendente; inputs: atendenteId, platformUserId; writes ui.atendenteCatalogue.output.cmdUpdateAtendente; status ui.atendenteCatalogue.action.cmdUpdateAtendente.status; feedback keys action.cmdUpdateAtendente.success / action.cmdUpdateAtendente.error */
  async cmdUpdateAtendente(): Promise<void> {
    if (!this.cmdUpdateAtendenteAtendenteId) {
      this.cmdUpdateAtendenteState = 'idle';
      setState('ui.atendenteCatalogue.action.cmdUpdateAtendente.status', 'idle');
      this.requestUpdate();
      return;
    }
    this.cmdUpdateAtendenteState = 'loading';
    setState('ui.atendenteCatalogue.action.cmdUpdateAtendente.status', 'loading');
    this.cmdUpdateAtendenteError = '';
    setState('ui.atendenteCatalogue.action.cmdUpdateAtendente.error', '');
    const params: CmdUpdateAtendenteInput = {
      atendenteId: this.cmdUpdateAtendenteAtendenteId,
      platformUserId: this.cmdUpdateAtendentePlatformUserId,
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdUpdateAtendenteOutput>(cmdUpdateAtendenteRoute, params, options);
    if (!response.ok) {
      const errMsg: string = this.readErrorMessage(response.error, 'action.cmdUpdateAtendente.error');
      this.cmdUpdateAtendenteError = errMsg;
      setState('ui.atendenteCatalogue.action.cmdUpdateAtendente.error', errMsg);
      this.cmdUpdateAtendenteState = 'error';
      setState('ui.atendenteCatalogue.action.cmdUpdateAtendente.status', 'error');
      this.requestUpdate();
      return;
    }
    const data: CmdUpdateAtendenteOutput | null = response.data ?? null;
    this.cmdUpdateAtendenteOutput = data;
    setState('ui.atendenteCatalogue.output.cmdUpdateAtendente', data);
    try {
      await this.loadQryListAtendente();
      if (this.qryListAtendenteState === 'error') {
        this.cmdUpdateAtendenteState = 'error';
        setState('ui.atendenteCatalogue.action.cmdUpdateAtendente.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdUpdateAtendente refresh failed', refreshError);
      this.cmdUpdateAtendenteState = 'error';
      setState('ui.atendenteCatalogue.action.cmdUpdateAtendente.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryGetAtendente();
      if (this.qryGetAtendenteState === 'error') {
        this.cmdUpdateAtendenteState = 'error';
        setState('ui.atendenteCatalogue.action.cmdUpdateAtendente.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdUpdateAtendente refresh failed', refreshError);
      this.cmdUpdateAtendenteState = 'error';
      setState('ui.atendenteCatalogue.action.cmdUpdateAtendente.status', 'error');
      this.requestUpdate();
      return;
    }
    this.cmdUpdateAtendenteAtendenteId = '';
    setState('ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId', '');
    this.cmdUpdateAtendentePlatformUserId = '';
    setState('ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId', '');
    this.setUiScenary('base');
    this.cmdUpdateAtendenteState = 'success';
    setState('ui.atendenteCatalogue.action.cmdUpdateAtendente.status', 'success');
    this.requestUpdate();
  }

  /** handler for action cmdUpdateAtendente "Atualizar Atendente" — bind UI events here */
  handleCmdUpdateAtendenteClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.cmdUpdateAtendente();
    });
  }

  /** action cmdInactivateAtendente (command) "Desativar Atendente" — route controleChamados.atendenteCatalogue.cmdInactivateAtendente; inputs: atendenteId; writes ui.atendenteCatalogue.output.cmdInactivateAtendente; status ui.atendenteCatalogue.action.cmdInactivateAtendente.status; feedback keys action.cmdInactivateAtendente.success / action.cmdInactivateAtendente.error */
  async cmdInactivateAtendente(): Promise<void> {
    if (!this.cmdInactivateAtendenteAtendenteId) {
      this.cmdInactivateAtendenteState = 'idle';
      setState('ui.atendenteCatalogue.action.cmdInactivateAtendente.status', 'idle');
      this.requestUpdate();
      return;
    }
    this.cmdInactivateAtendenteState = 'loading';
    setState('ui.atendenteCatalogue.action.cmdInactivateAtendente.status', 'loading');
    this.cmdInactivateAtendenteError = '';
    setState('ui.atendenteCatalogue.action.cmdInactivateAtendente.error', '');
    const params: CmdInactivateAtendenteInput = {
      atendenteId: this.cmdInactivateAtendenteAtendenteId,
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdInactivateAtendenteOutput>(cmdInactivateAtendenteRoute, params, options);
    if (!response.ok) {
      const errMsg: string = this.readErrorMessage(response.error, 'action.cmdInactivateAtendente.error');
      this.cmdInactivateAtendenteError = errMsg;
      setState('ui.atendenteCatalogue.action.cmdInactivateAtendente.error', errMsg);
      this.cmdInactivateAtendenteState = 'error';
      setState('ui.atendenteCatalogue.action.cmdInactivateAtendente.status', 'error');
      this.requestUpdate();
      return;
    }
    const data: CmdInactivateAtendenteOutput | null = response.data ?? null;
    this.cmdInactivateAtendenteOutput = data;
    setState('ui.atendenteCatalogue.output.cmdInactivateAtendente', data);
    try {
      await this.loadQryListAtendente();
      if (this.qryListAtendenteState === 'error') {
        this.cmdInactivateAtendenteState = 'error';
        setState('ui.atendenteCatalogue.action.cmdInactivateAtendente.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdInactivateAtendente refresh failed', refreshError);
      this.cmdInactivateAtendenteState = 'error';
      setState('ui.atendenteCatalogue.action.cmdInactivateAtendente.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryGetAtendente();
      if (this.qryGetAtendenteState === 'error') {
        this.cmdInactivateAtendenteState = 'error';
        setState('ui.atendenteCatalogue.action.cmdInactivateAtendente.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdInactivateAtendente refresh failed', refreshError);
      this.cmdInactivateAtendenteState = 'error';
      setState('ui.atendenteCatalogue.action.cmdInactivateAtendente.status', 'error');
      this.requestUpdate();
      return;
    }
    this.cmdInactivateAtendenteAtendenteId = '';
    setState('ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId', '');
    this.setUiScenary('base');
    this.cmdInactivateAtendenteState = 'success';
    setState('ui.atendenteCatalogue.action.cmdInactivateAtendente.status', 'success');
    this.requestUpdate();
  }

  /** handler for action cmdInactivateAtendente "Desativar Atendente" — bind UI events here */
  handleCmdInactivateAtendenteClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.cmdInactivateAtendente();
    });
  }

  /** action cmdReactivateAtendente (command) "Reativar Atendente" — route controleChamados.atendenteCatalogue.cmdReactivateAtendente; inputs: atendenteId; writes ui.atendenteCatalogue.output.cmdReactivateAtendente; status ui.atendenteCatalogue.action.cmdReactivateAtendente.status; feedback keys action.cmdReactivateAtendente.success / action.cmdReactivateAtendente.error */
  async cmdReactivateAtendente(): Promise<void> {
    if (!this.cmdReactivateAtendenteAtendenteId) {
      this.cmdReactivateAtendenteState = 'idle';
      setState('ui.atendenteCatalogue.action.cmdReactivateAtendente.status', 'idle');
      this.requestUpdate();
      return;
    }
    this.cmdReactivateAtendenteState = 'loading';
    setState('ui.atendenteCatalogue.action.cmdReactivateAtendente.status', 'loading');
    this.cmdReactivateAtendenteError = '';
    setState('ui.atendenteCatalogue.action.cmdReactivateAtendente.error', '');
    const params: CmdReactivateAtendenteInput = {
      atendenteId: this.cmdReactivateAtendenteAtendenteId,
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdReactivateAtendenteOutput>(cmdReactivateAtendenteRoute, params, options);
    if (!response.ok) {
      const errMsg: string = this.readErrorMessage(response.error, 'action.cmdReactivateAtendente.error');
      this.cmdReactivateAtendenteError = errMsg;
      setState('ui.atendenteCatalogue.action.cmdReactivateAtendente.error', errMsg);
      this.cmdReactivateAtendenteState = 'error';
      setState('ui.atendenteCatalogue.action.cmdReactivateAtendente.status', 'error');
      this.requestUpdate();
      return;
    }
    const data: CmdReactivateAtendenteOutput | null = response.data ?? null;
    this.cmdReactivateAtendenteOutput = data;
    setState('ui.atendenteCatalogue.output.cmdReactivateAtendente', data);
    try {
      await this.loadQryListAtendente();
      if (this.qryListAtendenteState === 'error') {
        this.cmdReactivateAtendenteState = 'error';
        setState('ui.atendenteCatalogue.action.cmdReactivateAtendente.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdReactivateAtendente refresh failed', refreshError);
      this.cmdReactivateAtendenteState = 'error';
      setState('ui.atendenteCatalogue.action.cmdReactivateAtendente.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryGetAtendente();
      if (this.qryGetAtendenteState === 'error') {
        this.cmdReactivateAtendenteState = 'error';
        setState('ui.atendenteCatalogue.action.cmdReactivateAtendente.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdReactivateAtendente refresh failed', refreshError);
      this.cmdReactivateAtendenteState = 'error';
      setState('ui.atendenteCatalogue.action.cmdReactivateAtendente.status', 'error');
      this.requestUpdate();
      return;
    }
    this.cmdReactivateAtendenteAtendenteId = '';
    setState('ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId', '');
    this.setUiScenary('base');
    this.cmdReactivateAtendenteState = 'success';
    setState('ui.atendenteCatalogue.action.cmdReactivateAtendente.status', 'success');
    this.requestUpdate();
  }

  /** handler for action cmdReactivateAtendente "Reativar Atendente" — bind UI events here */
  handleCmdReactivateAtendenteClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.cmdReactivateAtendente();
    });
  }

  /** action qryGetAtendente (query) "Obter Atendente" — route controleChamados.atendenteCatalogue.qryGetAtendente; inputs: atendenteId; writes ui.atendenteCatalogue.data.qryGetAtendente; status ui.atendenteCatalogue.action.qryGetAtendente.status */
  async loadQryGetAtendente(): Promise<void> {
    if (!this.qryGetAtendenteAtendenteId) {
      this.qryGetAtendenteState = 'idle';
      setState('ui.atendenteCatalogue.action.qryGetAtendente.status', 'idle');
      this.requestUpdate();
      return;
    }
    this.qryGetAtendenteState = 'loading';
    setState('ui.atendenteCatalogue.action.qryGetAtendente.status', 'loading');
    const params: QryGetAtendenteInput = {
      atendenteId: this.qryGetAtendenteAtendenteId,
    };
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<QryGetAtendenteOutput>(qryGetAtendenteRoute, params, options);
    if (response.ok) {
      const data = response.data ?? null;
      this.qryGetAtendenteData = data;
      setState('ui.atendenteCatalogue.data.qryGetAtendente', data);
      this.qryGetAtendenteState = 'success';
      setState('ui.atendenteCatalogue.action.qryGetAtendente.status', 'success');
    } else {
      this.qryGetAtendenteState = 'error';
      setState('ui.atendenteCatalogue.action.qryGetAtendente.status', 'error');
      if (response.error) {
        console.error('qryGetAtendente failed', response.error);
      }
    }
    this.requestUpdate();
  }

  /** handler for action qryGetAtendente "Obter Atendente" — bind UI events here */
  handleQryGetAtendenteClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void this.loadQryGetAtendente();
  }

  /** setter for state ui.atendenteCatalogue.input.cmdCreateAtendente.platformUserId */
  setCmdCreateAtendentePlatformUserId(value: string): void {
    this.cmdCreateAtendentePlatformUserId = value;
    setState('ui.atendenteCatalogue.input.cmdCreateAtendente.platformUserId', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateAtendentePlatformUserId — bind UI events here */
  handleCmdCreateAtendentePlatformUserIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdCreateAtendentePlatformUserId(value);
  }

  /** setter for state ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId */
  setCmdUpdateAtendenteAtendenteId(value: string): void {
    this.cmdUpdateAtendenteAtendenteId = value;
    setState('ui.atendenteCatalogue.input.cmdUpdateAtendente.atendenteId', value);
    const collection =
      (getState('ui.atendenteCatalogue.data.qryListAtendente') as QryListAtendenteOutput[] | null | undefined) ?? this.qryListAtendenteData;
    if (Array.isArray(collection) && collection.length > 0) {
      const item = collection.find(
        (row: QryListAtendenteOutput) => String(row.atendenteId) === String(value),
      );
      if (item) {
        this.cmdUpdateAtendentePlatformUserId = item.platformUserId;
        setState('ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId', item.platformUserId);
      }
    }
    this.requestUpdate();
  }

  /** handler for action set.cmdUpdateAtendenteAtendenteId — bind UI events here */
  handleCmdUpdateAtendenteAtendenteIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdUpdateAtendenteAtendenteId(value);
  }

  /** setter for state ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId */
  setCmdUpdateAtendentePlatformUserId(value: string): void {
    this.cmdUpdateAtendentePlatformUserId = value;
    setState('ui.atendenteCatalogue.input.cmdUpdateAtendente.platformUserId', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdUpdateAtendentePlatformUserId — bind UI events here */
  handleCmdUpdateAtendentePlatformUserIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdUpdateAtendentePlatformUserId(value);
  }

  /** setter for state ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId */
  setCmdInactivateAtendenteAtendenteId(value: string): void {
    this.cmdInactivateAtendenteAtendenteId = value;
    setState('ui.atendenteCatalogue.input.cmdInactivateAtendente.atendenteId', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdInactivateAtendenteAtendenteId — bind UI events here */
  handleCmdInactivateAtendenteAtendenteIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdInactivateAtendenteAtendenteId(value);
  }

  /** setter for state ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId */
  setCmdReactivateAtendenteAtendenteId(value: string): void {
    this.cmdReactivateAtendenteAtendenteId = value;
    setState('ui.atendenteCatalogue.input.cmdReactivateAtendente.atendenteId', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdReactivateAtendenteAtendenteId — bind UI events here */
  handleCmdReactivateAtendenteAtendenteIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdReactivateAtendenteAtendenteId(value);
  }

  /** setter for state ui.atendenteCatalogue.input.qryGetAtendente.atendenteId */
  setQryGetAtendenteAtendenteId(value: string): void {
    this.qryGetAtendenteAtendenteId = value;
    setState('ui.atendenteCatalogue.input.qryGetAtendente.atendenteId', value);
    if (value) this.setUiScenary('detail');
    this.requestUpdate();
  }

  /** handler for action set.qryGetAtendenteAtendenteId — bind UI events here */
  handleQryGetAtendenteAtendenteIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setQryGetAtendenteAtendenteId(value);
  }
}
