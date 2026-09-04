/// <mls fileReference="_102039_/l2/controleChamados/web/shared/registrarComentarioChamado.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type {
  QryLocateChamadoInput,
  QryLocateChamadoOutput,
  CmdRegisterComentarioInput,
  CmdRegisterComentarioOutput,
  QryAtendentePickerInput,
  QryAtendentePickerOutput,
} from '/_102039_/l2/controleChamados/web/contracts/registrarComentarioChamado.js';
import {
  qryLocateChamadoRoute,
  cmdRegisterComentarioRoute,
  qryAtendentePickerRoute,
} from '/_102039_/l2/controleChamados/web/contracts/registrarComentarioChamado.js';
export type {
  QryLocateChamadoInput,
  QryLocateChamadoOutput,
  CmdRegisterComentarioInput,
  CmdRegisterComentarioOutput,
  QryAtendentePickerInput,
  QryAtendentePickerOutput,
} from '/_102039_/l2/controleChamados/web/contracts/registrarComentarioChamado.js';

const SUBSCRIBED_STATE_KEYS: string[] = [
  'ui.registrarComentarioChamado.status',
  'ui.registrarComentarioChamado.scenary',
  'ui.registrarComentarioChamado.action.qryLocateChamado.status',
  'ui.registrarComentarioChamado.data.qryLocateChamado',
  'ui.registrarComentarioChamado.action.cmdRegisterComentario.status',
  'ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId',
  'ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId',
  'ui.registrarComentarioChamado.input.cmdRegisterComentario.conteudo',
  'ui.registrarComentarioChamado.output.cmdRegisterComentario',
  'ui.registrarComentarioChamado.action.cmdRegisterComentario.error',
  'ui.registrarComentarioChamado.action.qryAtendentePicker.status',
  'ui.registrarComentarioChamado.data.qryAtendentePicker',
];

export class ControleChamadosRegistrarComentarioChamadoBase extends CollabLitElement {
  /** state status — pageStatus */
  @property() status: string = '';
  /** state ui.registrarComentarioChamado.scenary — uiScenary, values: base|registerComentario */
  @property() uiScenary: 'base' | 'registerComentario' = 'base';
  /** state qryLocateChamadoState — actionStatus, values: idle|loading|success|error */
  @property() qryLocateChamadoState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state qryLocateChamadoData — queryResult, outputShape: array */
  @property() qryLocateChamadoData: QryLocateChamadoOutput[] = [];
  /** state cmdRegisterComentarioState — actionStatus, values: idle|loading|success|error */
  @property() cmdRegisterComentarioState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state cmdRegisterComentarioAtendenteId — input */
  @property() cmdRegisterComentarioAtendenteId: string = '';
  /** state cmdRegisterComentarioChamadoId — input */
  @property() cmdRegisterComentarioChamadoId: string = '';
  /** state cmdRegisterComentarioConteudo — input */
  @property() cmdRegisterComentarioConteudo: string = '';
  /** state cmdRegisterComentarioOutput — commandOutput */
  @property() cmdRegisterComentarioOutput: CmdRegisterComentarioOutput | null = null;
  /** state cmdRegisterComentarioError — actionError */
  @property() cmdRegisterComentarioError: string = '';
  /** state qryAtendentePickerState — actionStatus, values: idle|loading|success|error */
  @property() qryAtendentePickerState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state qryAtendentePickerData — queryResult, outputShape: array */
  @property() qryAtendentePickerData: QryAtendentePickerOutput[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    this.initStateValue('ui.registrarComentarioChamado.status', '');
    this.initStateValue('ui.registrarComentarioChamado.scenary', 'base');
    this.initStateValue('ui.registrarComentarioChamado.action.qryLocateChamado.status', 'idle');
    this.initStateValue('ui.registrarComentarioChamado.data.qryLocateChamado', []);
    this.initStateValue('ui.registrarComentarioChamado.action.cmdRegisterComentario.status', 'idle');
    this.initStateValue('ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId', '');
    this.initStateValue('ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId', '');
    this.initStateValue('ui.registrarComentarioChamado.input.cmdRegisterComentario.conteudo', '');
    this.initStateValue('ui.registrarComentarioChamado.output.cmdRegisterComentario', null);
    this.initStateValue('ui.registrarComentarioChamado.action.cmdRegisterComentario.error', '');
    this.initStateValue('ui.registrarComentarioChamado.action.qryAtendentePicker.status', 'idle');
    this.initStateValue('ui.registrarComentarioChamado.data.qryAtendentePicker', []);
    this.syncRouteParams();
    this.applyUrlScenary();
    subscribe(SUBSCRIBED_STATE_KEYS, this);
    void this.loadQryLocateChamado();
    void this.loadQryAtendentePicker();
  }

  disconnectedCallback(): void {
    unsubscribe(SUBSCRIBED_STATE_KEYS, this);
    super.disconnectedCallback();
  }

  /** handleIcaStateChange — collabState notify contract; maps state keys onto class fields */
  handleIcaStateChange(key: string, value: unknown): void {
    switch (key) {
      case 'ui.registrarComentarioChamado.status': this.status = (value as string) ?? ''; break;
      case 'ui.registrarComentarioChamado.scenary': this.uiScenary = (value as 'base' | 'registerComentario') ?? 'base'; break;
      case 'ui.registrarComentarioChamado.action.qryLocateChamado.status': this.qryLocateChamadoState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle'; break;
      case 'ui.registrarComentarioChamado.data.qryLocateChamado': this.qryLocateChamadoData = (value as QryLocateChamadoOutput[]) ?? []; break;
      case 'ui.registrarComentarioChamado.action.cmdRegisterComentario.status': this.cmdRegisterComentarioState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle'; break;
      case 'ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId': this.cmdRegisterComentarioAtendenteId = (value as string) ?? ''; break;
      case 'ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId': this.cmdRegisterComentarioChamadoId = (value as string) ?? ''; break;
      case 'ui.registrarComentarioChamado.input.cmdRegisterComentario.conteudo': this.cmdRegisterComentarioConteudo = (value as string) ?? ''; break;
      case 'ui.registrarComentarioChamado.output.cmdRegisterComentario': this.cmdRegisterComentarioOutput = (value as CmdRegisterComentarioOutput | null) ?? null; break;
      case 'ui.registrarComentarioChamado.action.cmdRegisterComentario.error': this.cmdRegisterComentarioError = (value as string) ?? ''; break;
      case 'ui.registrarComentarioChamado.action.qryAtendentePicker.status': this.qryAtendentePickerState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle'; break;
      case 'ui.registrarComentarioChamado.data.qryAtendentePicker': this.qryAtendentePickerData = (value as QryAtendentePickerOutput[]) ?? []; break;
      default: break;
    }
    this.requestUpdate();
  }

  private initStateValue(stateKey: string, defaultValue: unknown): void {
    const existing: unknown = getState(stateKey);
    const value: unknown = existing !== undefined ? existing : defaultValue;
    switch (stateKey) {
      case 'ui.registrarComentarioChamado.status': this.status = (value as string) ?? ''; break;
      case 'ui.registrarComentarioChamado.scenary': this.uiScenary = (value as 'base' | 'registerComentario') ?? 'base'; break;
      case 'ui.registrarComentarioChamado.action.qryLocateChamado.status': this.qryLocateChamadoState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle'; break;
      case 'ui.registrarComentarioChamado.data.qryLocateChamado': this.qryLocateChamadoData = (value as QryLocateChamadoOutput[]) ?? []; break;
      case 'ui.registrarComentarioChamado.action.cmdRegisterComentario.status': this.cmdRegisterComentarioState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle'; break;
      case 'ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId': this.cmdRegisterComentarioAtendenteId = (value as string) ?? ''; break;
      case 'ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId': this.cmdRegisterComentarioChamadoId = (value as string) ?? ''; break;
      case 'ui.registrarComentarioChamado.input.cmdRegisterComentario.conteudo': this.cmdRegisterComentarioConteudo = (value as string) ?? ''; break;
      case 'ui.registrarComentarioChamado.output.cmdRegisterComentario': this.cmdRegisterComentarioOutput = (value as CmdRegisterComentarioOutput | null) ?? null; break;
      case 'ui.registrarComentarioChamado.action.cmdRegisterComentario.error': this.cmdRegisterComentarioError = (value as string) ?? ''; break;
      case 'ui.registrarComentarioChamado.action.qryAtendentePicker.status': this.qryAtendentePickerState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle'; break;
      case 'ui.registrarComentarioChamado.data.qryAtendentePicker': this.qryAtendentePickerData = (value as QryAtendentePickerOutput[]) ?? []; break;
      default: break;
    }
    if (existing === undefined) setState(stateKey, value);
  }

  private syncRouteParams(): void {
    const pathname: string = window.location.pathname;
    const match: RegExpMatchArray | null = pathname.match(
      /^\/controleChamados\/registrarComentarioChamado(?:\/([^/]+))?\/?$/,
    );
    const rawChamadoId: string = match && match[1] ? match[1] : '';
    let chamadoId: string = '';
    if (rawChamadoId) {
      try { chamadoId = decodeURIComponent(rawChamadoId); } catch { chamadoId = rawChamadoId; }
    }
    if (chamadoId && !this.cmdRegisterComentarioChamadoId) {
      this.cmdRegisterComentarioChamadoId = chamadoId;
      setState('ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId', chamadoId);
    }
  }

  /** setter for state ui.registrarComentarioChamado.scenary */
  setUiScenary(value: string): void {
    const allowed: string[] = ['base', 'registerComentario'];
    if (!allowed.includes(value)) {
      console.warn('setUiScenary: unknown value \'' + value + '\'');
      return;
    }
    let next: string = value;
    if (value === 'registerComentario' && (!this.cmdRegisterComentarioAtendenteId || !this.cmdRegisterComentarioChamadoId)) next = 'base';
    this.uiScenary = next as typeof this.uiScenary;
    setState('ui.registrarComentarioChamado.scenary', next);
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
      if (!this.cmdRegisterComentarioAtendenteId) {
        this.cmdRegisterComentarioAtendenteId = rawAtendenteId;
        setState('ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId', rawAtendenteId);
      }
    }
    const rawChamadoId: string = params.get('chamadoId') || '';
    if (rawChamadoId) {
      if (!this.cmdRegisterComentarioChamadoId) {
        this.cmdRegisterComentarioChamadoId = rawChamadoId;
        setState('ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId', rawChamadoId);
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
      if (typeof record.message === 'string' && record.message) return record.message;
      if (typeof record.error === 'string' && record.error) return record.error;
    }
    return fallback;
  }

  /** action qryLocateChamado (query) — route controleChamados.registrarComentarioChamado.qryLocateChamado; inputs: none; writes ui.registrarComentarioChamado.data.qryLocateChamado; status ui.registrarComentarioChamado.action.qryLocateChamado.status */
  async loadQryLocateChamado(): Promise<void> {
    this.syncRouteParams();
    this.qryLocateChamadoState = 'loading'; setState('ui.registrarComentarioChamado.action.qryLocateChamado.status', 'loading');
    const params: QryLocateChamadoInput = {};
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<QryLocateChamadoOutput[]>(qryLocateChamadoRoute, params, options);
    if (response.ok) { const data = response.data ?? []; this.qryLocateChamadoData = data; setState('ui.registrarComentarioChamado.data.qryLocateChamado', data); this.qryLocateChamadoState = 'success'; setState('ui.registrarComentarioChamado.action.qryLocateChamado.status', 'success'); }
    else { this.qryLocateChamadoState = 'error'; setState('ui.registrarComentarioChamado.action.qryLocateChamado.status', 'error'); if (response.error) console.error('qryLocateChamado failed', response.error); }
    this.requestUpdate();
  }
  /** handler for action qryLocateChamado — bind UI events here */
  handleQryLocateChamadoClick(event?: Event): void { if (event) event.preventDefault(); void this.loadQryLocateChamado(); }

  /** action cmdRegisterComentario (command) — route controleChamados.registrarComentarioChamado.cmdRegisterComentario; inputs: atendenteId, chamadoId, conteudo; writes ui.registrarComentarioChamado.output.cmdRegisterComentario; status ui.registrarComentarioChamado.action.cmdRegisterComentario.status; feedback keys action.cmdRegisterComentario.success / action.cmdRegisterComentario.error */
  async cmdRegisterComentario(): Promise<void> {
    this.syncRouteParams();
    if (!this.cmdRegisterComentarioChamadoId || !this.cmdRegisterComentarioAtendenteId) { this.cmdRegisterComentarioState = 'idle'; setState('ui.registrarComentarioChamado.action.cmdRegisterComentario.status', 'idle'); this.requestUpdate(); return; }
    this.cmdRegisterComentarioState = 'loading'; setState('ui.registrarComentarioChamado.action.cmdRegisterComentario.status', 'loading'); this.cmdRegisterComentarioError = ''; setState('ui.registrarComentarioChamado.action.cmdRegisterComentario.error', '');
    const params: CmdRegisterComentarioInput = { atendenteId: this.cmdRegisterComentarioAtendenteId, chamadoId: this.cmdRegisterComentarioChamadoId, conteudo: this.cmdRegisterComentarioConteudo };
    const response = await execBff<CmdRegisterComentarioOutput>(cmdRegisterComentarioRoute, params, { mode: 'blocking' });
    if (!response.ok) { const errMsg = this.readErrorMessage(response.error, 'action.cmdRegisterComentario.error'); this.cmdRegisterComentarioError = errMsg; setState('ui.registrarComentarioChamado.action.cmdRegisterComentario.error', errMsg); this.cmdRegisterComentarioState = 'error'; setState('ui.registrarComentarioChamado.action.cmdRegisterComentario.status', 'error'); this.requestUpdate(); return; }
    const data = response.data ?? null; this.cmdRegisterComentarioOutput = data; setState('ui.registrarComentarioChamado.output.cmdRegisterComentario', data);
    await this.loadQryLocateChamado();
    if (this.qryLocateChamadoState === 'error') { this.cmdRegisterComentarioState = 'error'; setState('ui.registrarComentarioChamado.action.cmdRegisterComentario.status', 'error'); return; }
    await this.loadQryAtendentePicker();
    if (this.qryAtendentePickerState === 'error') { this.cmdRegisterComentarioState = 'error'; setState('ui.registrarComentarioChamado.action.cmdRegisterComentario.status', 'error'); return; }
    this.cmdRegisterComentarioAtendenteId = ''; setState('ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId', '');
    this.cmdRegisterComentarioConteudo = ''; setState('ui.registrarComentarioChamado.input.cmdRegisterComentario.conteudo', '');
    this.setUiScenary('base'); this.cmdRegisterComentarioState = 'success'; setState('ui.registrarComentarioChamado.action.cmdRegisterComentario.status', 'success'); this.requestUpdate();
  }
  /** handler for action cmdRegisterComentario — bind UI events here */
  handleCmdRegisterComentarioClick(event?: Event): void { if (event) event.preventDefault(); void runBlockingUiAction(async (): Promise<void> => { await this.cmdRegisterComentario(); }); }

  /** action qryAtendentePicker (query) — route controleChamados.registrarComentarioChamado.qryAtendentePicker; inputs: none; writes ui.registrarComentarioChamado.data.qryAtendentePicker; status ui.registrarComentarioChamado.action.qryAtendentePicker.status */
  async loadQryAtendentePicker(): Promise<void> {
    this.syncRouteParams(); this.qryAtendentePickerState = 'loading'; setState('ui.registrarComentarioChamado.action.qryAtendentePicker.status', 'loading');
    const params: QryAtendentePickerInput = {};
    const response = await execBff<QryAtendentePickerOutput[]>(qryAtendentePickerRoute, params, { mode: 'silent' });
    if (response.ok) { const data = response.data ?? []; this.qryAtendentePickerData = data; setState('ui.registrarComentarioChamado.data.qryAtendentePicker', data); this.qryAtendentePickerState = 'success'; setState('ui.registrarComentarioChamado.action.qryAtendentePicker.status', 'success'); }
    else { this.qryAtendentePickerState = 'error'; setState('ui.registrarComentarioChamado.action.qryAtendentePicker.status', 'error'); if (response.error) console.error('qryAtendentePicker failed', response.error); }
    this.requestUpdate();
  }
  /** handler for action qryAtendentePicker — bind UI events here */
  handleQryAtendentePickerClick(event?: Event): void { if (event) event.preventDefault(); void this.loadQryAtendentePicker(); }

  /** setter for state ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId */
  setCmdRegisterComentarioAtendenteId(value: string): void { this.cmdRegisterComentarioAtendenteId = value; setState('ui.registrarComentarioChamado.input.cmdRegisterComentario.atendenteId', value); this.requestUpdate(); }
  /** handler for action set.cmdRegisterComentarioAtendenteId — bind UI events here */
  handleCmdRegisterComentarioAtendenteIdChange(event: Event): void { const target = event.target as HTMLInputElement | HTMLSelectElement | null; this.setCmdRegisterComentarioAtendenteId(target && 'value' in target ? String(target.value) : ''); }
  /** setter for state ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId */
  setCmdRegisterComentarioChamadoId(value: string): void { this.cmdRegisterComentarioChamadoId = value; setState('ui.registrarComentarioChamado.input.cmdRegisterComentario.chamadoId', value); this.requestUpdate(); }
  /** handler for action set.cmdRegisterComentarioChamadoId — bind UI events here */
  handleCmdRegisterComentarioChamadoIdChange(event: Event): void { const target = event.target as HTMLInputElement | HTMLSelectElement | null; this.setCmdRegisterComentarioChamadoId(target && 'value' in target ? String(target.value) : ''); }
  /** setter for state ui.registrarComentarioChamado.input.cmdRegisterComentario.conteudo */
  setCmdRegisterComentarioConteudo(value: string): void { this.cmdRegisterComentarioConteudo = value; setState('ui.registrarComentarioChamado.input.cmdRegisterComentario.conteudo', value); this.requestUpdate(); }
  /** handler for action set.cmdRegisterComentarioConteudo — bind UI events here */
  handleCmdRegisterComentarioConteudoChange(event: Event): void { const target = event.target as HTMLInputElement | HTMLSelectElement | null; this.setCmdRegisterComentarioConteudo(target && 'value' in target ? String(target.value) : ''); }
}
