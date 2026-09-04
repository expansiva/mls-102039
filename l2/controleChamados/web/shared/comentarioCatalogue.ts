/// <mls fileReference="_102039_/l2/controleChamados/web/shared/comentarioCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type {
  QryListComentarioInput,
  QryListComentarioOutput,
  CmdCreateComentarioInput,
  CmdCreateComentarioOutput,
  CmdUpdateComentarioInput,
  CmdUpdateComentarioOutput,
  CmdDeleteComentarioInput,
  CmdDeleteComentarioOutput,
  QryGetComentarioInput,
  QryGetComentarioOutput,
  QryChamadoPickerInput,
  QryChamadoPickerOutput,
  QryAtendentePickerInput,
  QryAtendentePickerOutput,
} from '/_102039_/l2/controleChamados/web/contracts/comentarioCatalogue.js';
import {
  qryListComentarioRoute,
  cmdCreateComentarioRoute,
  cmdUpdateComentarioRoute,
  cmdDeleteComentarioRoute,
  qryGetComentarioRoute,
  qryChamadoPickerRoute,
  qryAtendentePickerRoute,
} from '/_102039_/l2/controleChamados/web/contracts/comentarioCatalogue.js';

export type {
  QryListComentarioInput,
  QryListComentarioOutput,
  CmdCreateComentarioInput,
  CmdCreateComentarioOutput,
  CmdUpdateComentarioInput,
  CmdUpdateComentarioOutput,
  CmdDeleteComentarioInput,
  CmdDeleteComentarioOutput,
  QryGetComentarioInput,
  QryGetComentarioOutput,
  QryChamadoPickerInput,
  QryChamadoPickerOutput,
  QryAtendentePickerInput,
  QryAtendentePickerOutput,
} from '/_102039_/l2/controleChamados/web/contracts/comentarioCatalogue.js';


const SUBSCRIBED_STATE_KEYS: string[] = [
  'ui.comentarioCatalogue.status',
  'ui.comentarioCatalogue.scenary',
  'ui.comentarioCatalogue.action.qryListComentario.status',
  'ui.comentarioCatalogue.data.qryListComentario',
  'ui.comentarioCatalogue.action.cmdCreateComentario.status',
  'ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId',
  'ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId',
  'ui.comentarioCatalogue.input.cmdCreateComentario.conteudo',
  'ui.comentarioCatalogue.output.cmdCreateComentario',
  'ui.comentarioCatalogue.action.cmdCreateComentario.error',
  'ui.comentarioCatalogue.action.cmdUpdateComentario.status',
  'ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId',
  'ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId',
  'ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId',
  'ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo',
  'ui.comentarioCatalogue.output.cmdUpdateComentario',
  'ui.comentarioCatalogue.action.cmdUpdateComentario.error',
  'ui.comentarioCatalogue.action.cmdDeleteComentario.status',
  'ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId',
  'ui.comentarioCatalogue.output.cmdDeleteComentario',
  'ui.comentarioCatalogue.action.cmdDeleteComentario.error',
  'ui.comentarioCatalogue.action.qryGetComentario.status',
  'ui.comentarioCatalogue.input.qryGetComentario.comentarioId',
  'ui.comentarioCatalogue.data.qryGetComentario',
  'ui.comentarioCatalogue.action.qryChamadoPicker.status',
  'ui.comentarioCatalogue.input.qryChamadoPicker.sortBy',
  'ui.comentarioCatalogue.input.qryChamadoPicker.sortOrder',
  'ui.comentarioCatalogue.data.qryChamadoPicker',
  'ui.comentarioCatalogue.action.qryAtendentePicker.status',
  'ui.comentarioCatalogue.data.qryAtendentePicker',
];

export class ControleChamadosComentarioCatalogueBase extends CollabLitElement {
  /** state status — pageStatus */
  @property() status: string = '';
  /** state ui.comentarioCatalogue.scenary — values: base|detail|createComentario|updateComentario */
  @property() uiScenary: 'base' | 'detail' | 'createComentario' | 'updateComentario' = 'base';
  /** state qryListComentarioState — actionStatus, values: idle|loading|success|error */
  @property() qryListComentarioState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state qryListComentarioData — queryResult, outputShape: array */
  @property() qryListComentarioData: QryListComentarioOutput[] = [];
  /** state cmdCreateComentarioState — actionStatus, values: idle|loading|success|error */
  @property() cmdCreateComentarioState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state cmdCreateComentarioChamadoId — input */
  @property() cmdCreateComentarioChamadoId: string = '';
  /** state cmdCreateComentarioAtendenteId — input */
  @property() cmdCreateComentarioAtendenteId: string = '';
  /** state cmdCreateComentarioConteudo — input */
  @property() cmdCreateComentarioConteudo: string = '';
  /** state cmdCreateComentarioOutput — commandOutput */
  @property() cmdCreateComentarioOutput: CmdCreateComentarioOutput | null = null;
  /** state cmdCreateComentarioError — actionError */
  @property() cmdCreateComentarioError: string = '';
  /** state cmdUpdateComentarioState — actionStatus, values: idle|loading|success|error */
  @property() cmdUpdateComentarioState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state cmdUpdateComentarioComentarioId — input */
  @property() cmdUpdateComentarioComentarioId: string = '';
  /** state cmdUpdateComentarioChamadoId — input */
  @property() cmdUpdateComentarioChamadoId: string = '';
  /** state cmdUpdateComentarioAtendenteId — input */
  @property() cmdUpdateComentarioAtendenteId: string = '';
  /** state cmdUpdateComentarioConteudo — input */
  @property() cmdUpdateComentarioConteudo: string = '';
  /** state cmdUpdateComentarioOutput — commandOutput */
  @property() cmdUpdateComentarioOutput: CmdUpdateComentarioOutput | null = null;
  /** state cmdUpdateComentarioError — actionError */
  @property() cmdUpdateComentarioError: string = '';
  /** state cmdDeleteComentarioState — actionStatus, values: idle|loading|success|error */
  @property() cmdDeleteComentarioState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state cmdDeleteComentarioComentarioId — input */
  @property() cmdDeleteComentarioComentarioId: string = '';
  /** state cmdDeleteComentarioOutput — commandOutput */
  @property() cmdDeleteComentarioOutput: CmdDeleteComentarioOutput | null = null;
  /** state cmdDeleteComentarioError — actionError */
  @property() cmdDeleteComentarioError: string = '';
  /** state qryGetComentarioState — actionStatus, values: idle|loading|success|error */
  @property() qryGetComentarioState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state qryGetComentarioComentarioId — input */
  @property() qryGetComentarioComentarioId: string = '';
  /** state qryGetComentarioData — queryResult, outputShape: object */
  @property() qryGetComentarioData: QryGetComentarioOutput | null = null;
  /** state qryChamadoPickerState — actionStatus, values: idle|loading|success|error */
  @property() qryChamadoPickerState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state qryChamadoPickerSortBy — input, values: open|closed */
  @property() qryChamadoPickerSortBy: string = '';
  /** state qryChamadoPickerSortOrder — input, values: asc|desc */
  @property() qryChamadoPickerSortOrder: string = '';
  /** state qryChamadoPickerData — queryResult, outputShape: array */
  @property() qryChamadoPickerData: QryChamadoPickerOutput[] = [];
  /** state qryAtendentePickerState — actionStatus, values: idle|loading|success|error */
  @property() qryAtendentePickerState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state qryAtendentePickerData — queryResult, outputShape: array */
  @property() qryAtendentePickerData: QryAtendentePickerOutput[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    this.initStateValue('ui.comentarioCatalogue.status', '');
    this.initStateValue('ui.comentarioCatalogue.scenary', 'base');
    this.initStateValue('ui.comentarioCatalogue.action.qryListComentario.status', 'idle');
    this.initStateValue('ui.comentarioCatalogue.data.qryListComentario', []);
    this.initStateValue('ui.comentarioCatalogue.action.cmdCreateComentario.status', 'idle');
    this.initStateValue('ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId', '');
    this.initStateValue('ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId', '');
    this.initStateValue('ui.comentarioCatalogue.input.cmdCreateComentario.conteudo', '');
    this.initStateValue('ui.comentarioCatalogue.output.cmdCreateComentario', null);
    this.initStateValue('ui.comentarioCatalogue.action.cmdCreateComentario.error', '');
    this.initStateValue('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'idle');
    this.initStateValue('ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId', '');
    this.initStateValue('ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId', '');
    this.initStateValue('ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId', '');
    this.initStateValue('ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo', '');
    this.initStateValue('ui.comentarioCatalogue.output.cmdUpdateComentario', null);
    this.initStateValue('ui.comentarioCatalogue.action.cmdUpdateComentario.error', '');
    this.initStateValue('ui.comentarioCatalogue.action.cmdDeleteComentario.status', 'idle');
    this.initStateValue('ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId', '');
    this.initStateValue('ui.comentarioCatalogue.output.cmdDeleteComentario', null);
    this.initStateValue('ui.comentarioCatalogue.action.cmdDeleteComentario.error', '');
    this.initStateValue('ui.comentarioCatalogue.action.qryGetComentario.status', 'idle');
    this.initStateValue('ui.comentarioCatalogue.input.qryGetComentario.comentarioId', '');
    this.initStateValue('ui.comentarioCatalogue.data.qryGetComentario', null);
    this.initStateValue('ui.comentarioCatalogue.action.qryChamadoPicker.status', 'idle');
    this.initStateValue('ui.comentarioCatalogue.input.qryChamadoPicker.sortBy', '');
    this.initStateValue('ui.comentarioCatalogue.input.qryChamadoPicker.sortOrder', '');
    this.initStateValue('ui.comentarioCatalogue.data.qryChamadoPicker', []);
    this.initStateValue('ui.comentarioCatalogue.action.qryAtendentePicker.status', 'idle');
    this.initStateValue('ui.comentarioCatalogue.data.qryAtendentePicker', []);
    this.applyUrlScenary();
    subscribe(SUBSCRIBED_STATE_KEYS, this);
    void this.loadQryListComentario();
    void this.loadQryChamadoPicker();
    void this.loadQryAtendentePicker();
  }

  disconnectedCallback(): void {
    unsubscribe(SUBSCRIBED_STATE_KEYS, this);
    super.disconnectedCallback();
  }

  /** handleIcaStateChange — collabState notify contract; maps state keys onto class fields */
  handleIcaStateChange(key: string, value: unknown): void {
    switch (key) {
      case 'ui.comentarioCatalogue.status':
        this.status = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.scenary':
        this.uiScenary = (value as 'base' | 'detail' | 'createComentario' | 'updateComentario') ?? 'base';
        break;
      case 'ui.comentarioCatalogue.action.qryListComentario.status':
        this.qryListComentarioState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.comentarioCatalogue.data.qryListComentario':
        this.qryListComentarioData = (value as QryListComentarioOutput[]) ?? [];
        break;
      case 'ui.comentarioCatalogue.action.cmdCreateComentario.status':
        this.cmdCreateComentarioState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId':
        this.cmdCreateComentarioChamadoId = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId':
        this.cmdCreateComentarioAtendenteId = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.input.cmdCreateComentario.conteudo':
        this.cmdCreateComentarioConteudo = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.output.cmdCreateComentario':
        this.cmdCreateComentarioOutput = (value as CmdCreateComentarioOutput | null) ?? null;
        break;
      case 'ui.comentarioCatalogue.action.cmdCreateComentario.error':
        this.cmdCreateComentarioError = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.action.cmdUpdateComentario.status':
        this.cmdUpdateComentarioState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId':
        this.cmdUpdateComentarioComentarioId = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId':
        this.cmdUpdateComentarioChamadoId = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId':
        this.cmdUpdateComentarioAtendenteId = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo':
        this.cmdUpdateComentarioConteudo = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.output.cmdUpdateComentario':
        this.cmdUpdateComentarioOutput = (value as CmdUpdateComentarioOutput | null) ?? null;
        break;
      case 'ui.comentarioCatalogue.action.cmdUpdateComentario.error':
        this.cmdUpdateComentarioError = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.action.cmdDeleteComentario.status':
        this.cmdDeleteComentarioState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId':
        this.cmdDeleteComentarioComentarioId = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.output.cmdDeleteComentario':
        this.cmdDeleteComentarioOutput = (value as CmdDeleteComentarioOutput | null) ?? null;
        break;
      case 'ui.comentarioCatalogue.action.cmdDeleteComentario.error':
        this.cmdDeleteComentarioError = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.action.qryGetComentario.status':
        this.qryGetComentarioState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.comentarioCatalogue.input.qryGetComentario.comentarioId':
        this.qryGetComentarioComentarioId = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.data.qryGetComentario':
        this.qryGetComentarioData = (value as QryGetComentarioOutput | null) ?? null;
        break;
      case 'ui.comentarioCatalogue.action.qryChamadoPicker.status':
        this.qryChamadoPickerState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.comentarioCatalogue.input.qryChamadoPicker.sortBy':
        this.qryChamadoPickerSortBy = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.input.qryChamadoPicker.sortOrder':
        this.qryChamadoPickerSortOrder = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.data.qryChamadoPicker':
        this.qryChamadoPickerData = (value as QryChamadoPickerOutput[]) ?? [];
        break;
      case 'ui.comentarioCatalogue.action.qryAtendentePicker.status':
        this.qryAtendentePickerState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.comentarioCatalogue.data.qryAtendentePicker':
        this.qryAtendentePickerData = (value as QryAtendentePickerOutput[]) ?? [];
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
      case 'ui.comentarioCatalogue.status':
        this.status = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.scenary':
        this.uiScenary = (value as 'base' | 'detail' | 'createComentario' | 'updateComentario') ?? 'base';
        break;
      case 'ui.comentarioCatalogue.action.qryListComentario.status':
        this.qryListComentarioState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.comentarioCatalogue.data.qryListComentario':
        this.qryListComentarioData = (value as QryListComentarioOutput[]) ?? [];
        break;
      case 'ui.comentarioCatalogue.action.cmdCreateComentario.status':
        this.cmdCreateComentarioState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId':
        this.cmdCreateComentarioChamadoId = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId':
        this.cmdCreateComentarioAtendenteId = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.input.cmdCreateComentario.conteudo':
        this.cmdCreateComentarioConteudo = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.output.cmdCreateComentario':
        this.cmdCreateComentarioOutput = (value as CmdCreateComentarioOutput | null) ?? null;
        break;
      case 'ui.comentarioCatalogue.action.cmdCreateComentario.error':
        this.cmdCreateComentarioError = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.action.cmdUpdateComentario.status':
        this.cmdUpdateComentarioState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId':
        this.cmdUpdateComentarioComentarioId = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId':
        this.cmdUpdateComentarioChamadoId = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId':
        this.cmdUpdateComentarioAtendenteId = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo':
        this.cmdUpdateComentarioConteudo = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.output.cmdUpdateComentario':
        this.cmdUpdateComentarioOutput = (value as CmdUpdateComentarioOutput | null) ?? null;
        break;
      case 'ui.comentarioCatalogue.action.cmdUpdateComentario.error':
        this.cmdUpdateComentarioError = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.action.cmdDeleteComentario.status':
        this.cmdDeleteComentarioState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId':
        this.cmdDeleteComentarioComentarioId = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.output.cmdDeleteComentario':
        this.cmdDeleteComentarioOutput = (value as CmdDeleteComentarioOutput | null) ?? null;
        break;
      case 'ui.comentarioCatalogue.action.cmdDeleteComentario.error':
        this.cmdDeleteComentarioError = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.action.qryGetComentario.status':
        this.qryGetComentarioState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.comentarioCatalogue.input.qryGetComentario.comentarioId':
        this.qryGetComentarioComentarioId = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.data.qryGetComentario':
        this.qryGetComentarioData = (value as QryGetComentarioOutput | null) ?? null;
        break;
      case 'ui.comentarioCatalogue.action.qryChamadoPicker.status':
        this.qryChamadoPickerState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.comentarioCatalogue.input.qryChamadoPicker.sortBy':
        this.qryChamadoPickerSortBy = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.input.qryChamadoPicker.sortOrder':
        this.qryChamadoPickerSortOrder = (value as string) ?? '';
        break;
      case 'ui.comentarioCatalogue.data.qryChamadoPicker':
        this.qryChamadoPickerData = (value as QryChamadoPickerOutput[]) ?? [];
        break;
      case 'ui.comentarioCatalogue.action.qryAtendentePicker.status':
        this.qryAtendentePickerState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.comentarioCatalogue.data.qryAtendentePicker':
        this.qryAtendentePickerData = (value as QryAtendentePickerOutput[]) ?? [];
        break;
      default:
        break;
    }
    if (existing === undefined) {
      setState(stateKey, value);
    }
  }

  /** setter for state ui.comentarioCatalogue.scenary */
  setUiScenary(value: string): void {
    const allowed: string[] = ['base', 'detail', 'createComentario', 'updateComentario'];
    if (!allowed.includes(value)) {
      console.warn('setUiScenary: unknown value \'' + value + '\'');
      return;
    }
    let next: string = value;
    if (value === 'detail' && (!this.qryGetComentarioComentarioId)) next = 'base';
    if (value === 'createComentario' && (!this.cmdCreateComentarioChamadoId || !this.cmdCreateComentarioAtendenteId)) next = 'base';
    if (value === 'updateComentario' && (!this.cmdUpdateComentarioComentarioId || !this.cmdUpdateComentarioChamadoId || !this.cmdUpdateComentarioAtendenteId)) next = 'base';
    this.uiScenary = next as typeof this.uiScenary;
    setState('ui.comentarioCatalogue.scenary', next);
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
    const rawComentarioId: string = params.get('comentarioId') || '';
    if (rawComentarioId) {
      if (!this.qryGetComentarioComentarioId) {
        this.qryGetComentarioComentarioId = rawComentarioId;
        setState('ui.comentarioCatalogue.input.qryGetComentario.comentarioId', rawComentarioId);
      }
      if (!this.cmdUpdateComentarioComentarioId) {
        this.cmdUpdateComentarioComentarioId = rawComentarioId;
        setState('ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId', rawComentarioId);
      }
    }
    const rawChamadoId: string = params.get('chamadoId') || '';
    if (rawChamadoId) {
      if (!this.cmdCreateComentarioChamadoId) {
        this.cmdCreateComentarioChamadoId = rawChamadoId;
        setState('ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId', rawChamadoId);
      }
      if (!this.cmdUpdateComentarioChamadoId) {
        this.cmdUpdateComentarioChamadoId = rawChamadoId;
        setState('ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId', rawChamadoId);
      }
    }
    const rawAtendenteId: string = params.get('atendenteId') || '';
    if (rawAtendenteId) {
      if (!this.cmdCreateComentarioAtendenteId) {
        this.cmdCreateComentarioAtendenteId = rawAtendenteId;
        setState('ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId', rawAtendenteId);
      }
      if (!this.cmdUpdateComentarioAtendenteId) {
        this.cmdUpdateComentarioAtendenteId = rawAtendenteId;
        setState('ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId', rawAtendenteId);
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

  /** action qryListComentario (query) "Listar Comentário" — route controleChamados.comentarioCatalogue.qryListComentario; inputs: (none); writes ui.comentarioCatalogue.data.qryListComentario; status ui.comentarioCatalogue.action.qryListComentario.status */
  async loadQryListComentario(): Promise<void> {
    this.qryListComentarioState = 'loading';
    setState('ui.comentarioCatalogue.action.qryListComentario.status', 'loading');
    const params: QryListComentarioInput = {
    };
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<QryListComentarioOutput[]>(qryListComentarioRoute, params, options);
    if (response.ok) {
      const data = response.data ?? [];
      this.qryListComentarioData = data;
      setState('ui.comentarioCatalogue.data.qryListComentario', data);
      this.qryListComentarioState = 'success';
      setState('ui.comentarioCatalogue.action.qryListComentario.status', 'success');
    } else {
      this.qryListComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.qryListComentario.status', 'error');
      if (response.error) {
        console.error('qryListComentario failed', response.error);
      }
    }
    this.requestUpdate();
  }

  /** handler for action qryListComentario "Listar Comentário" — bind UI events here */
  handleQryListComentarioClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void this.loadQryListComentario();
  }

  /** action cmdCreateComentario (command) "Criar Comentário" — route controleChamados.comentarioCatalogue.cmdCreateComentario; inputs: chamadoId, atendenteId, conteudo; writes ui.comentarioCatalogue.output.cmdCreateComentario; status ui.comentarioCatalogue.action.cmdCreateComentario.status; feedback keys action.cmdCreateComentario.success / action.cmdCreateComentario.error */
  async cmdCreateComentario(): Promise<void> {
    if (!this.cmdCreateComentarioChamadoId) {
      this.cmdCreateComentarioState = 'idle';
      setState('ui.comentarioCatalogue.action.cmdCreateComentario.status', 'idle');
      this.requestUpdate();
      return;
    }
    if (!this.cmdCreateComentarioAtendenteId) {
      this.cmdCreateComentarioState = 'idle';
      setState('ui.comentarioCatalogue.action.cmdCreateComentario.status', 'idle');
      this.requestUpdate();
      return;
    }
    this.cmdCreateComentarioState = 'loading';
    setState('ui.comentarioCatalogue.action.cmdCreateComentario.status', 'loading');
    this.cmdCreateComentarioError = '';
    setState('ui.comentarioCatalogue.action.cmdCreateComentario.error', '');
    const params: CmdCreateComentarioInput = {
      chamadoId: this.cmdCreateComentarioChamadoId,
      atendenteId: this.cmdCreateComentarioAtendenteId,
      conteudo: this.cmdCreateComentarioConteudo,
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdCreateComentarioOutput>(cmdCreateComentarioRoute, params, options);
    if (!response.ok) {
      const errMsg: string = this.readErrorMessage(response.error, 'action.cmdCreateComentario.error');
      this.cmdCreateComentarioError = errMsg;
      setState('ui.comentarioCatalogue.action.cmdCreateComentario.error', errMsg);
      this.cmdCreateComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdCreateComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    const data: CmdCreateComentarioOutput | null = response.data ?? null;
    this.cmdCreateComentarioOutput = data;
    setState('ui.comentarioCatalogue.output.cmdCreateComentario', data);
    try {
      await this.loadQryListComentario();
      if (this.qryListComentarioState === 'error') {
        this.cmdCreateComentarioState = 'error';
        setState('ui.comentarioCatalogue.action.cmdCreateComentario.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdCreateComentario refresh failed', refreshError);
      this.cmdCreateComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdCreateComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryGetComentario();
      if (this.qryGetComentarioState === 'error') {
        this.cmdCreateComentarioState = 'error';
        setState('ui.comentarioCatalogue.action.cmdCreateComentario.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdCreateComentario refresh failed', refreshError);
      this.cmdCreateComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdCreateComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryChamadoPicker();
      if (this.qryChamadoPickerState === 'error') {
        this.cmdCreateComentarioState = 'error';
        setState('ui.comentarioCatalogue.action.cmdCreateComentario.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdCreateComentario refresh failed', refreshError);
      this.cmdCreateComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdCreateComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryAtendentePicker();
      if (this.qryAtendentePickerState === 'error') {
        this.cmdCreateComentarioState = 'error';
        setState('ui.comentarioCatalogue.action.cmdCreateComentario.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdCreateComentario refresh failed', refreshError);
      this.cmdCreateComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdCreateComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    this.cmdCreateComentarioChamadoId = '';
    setState('ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId', '');
    this.cmdCreateComentarioAtendenteId = '';
    setState('ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId', '');
    this.cmdCreateComentarioConteudo = '';
    setState('ui.comentarioCatalogue.input.cmdCreateComentario.conteudo', '');
    this.setUiScenary('base');
    this.cmdCreateComentarioState = 'success';
    setState('ui.comentarioCatalogue.action.cmdCreateComentario.status', 'success');
    this.requestUpdate();
  }

  /** handler for action cmdCreateComentario "Criar Comentário" — bind UI events here */
  handleCmdCreateComentarioClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.cmdCreateComentario();
    });
  }

  /** action cmdUpdateComentario (command) "Atualizar Comentário" — route controleChamados.comentarioCatalogue.cmdUpdateComentario; inputs: comentarioId, chamadoId, atendenteId, conteudo; writes ui.comentarioCatalogue.output.cmdUpdateComentario; status ui.comentarioCatalogue.action.cmdUpdateComentario.status; feedback keys action.cmdUpdateComentario.success / action.cmdUpdateComentario.error */
  async cmdUpdateComentario(): Promise<void> {
    if (!this.cmdUpdateComentarioComentarioId) {
      this.cmdUpdateComentarioState = 'idle';
      setState('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'idle');
      this.requestUpdate();
      return;
    }
    if (!this.cmdUpdateComentarioChamadoId) {
      this.cmdUpdateComentarioState = 'idle';
      setState('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'idle');
      this.requestUpdate();
      return;
    }
    if (!this.cmdUpdateComentarioAtendenteId) {
      this.cmdUpdateComentarioState = 'idle';
      setState('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'idle');
      this.requestUpdate();
      return;
    }
    this.cmdUpdateComentarioState = 'loading';
    setState('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'loading');
    this.cmdUpdateComentarioError = '';
    setState('ui.comentarioCatalogue.action.cmdUpdateComentario.error', '');
    const params: CmdUpdateComentarioInput = {
      comentarioId: this.cmdUpdateComentarioComentarioId,
      chamadoId: this.cmdUpdateComentarioChamadoId,
      atendenteId: this.cmdUpdateComentarioAtendenteId,
      conteudo: this.cmdUpdateComentarioConteudo,
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdUpdateComentarioOutput>(cmdUpdateComentarioRoute, params, options);
    if (!response.ok) {
      const errMsg: string = this.readErrorMessage(response.error, 'action.cmdUpdateComentario.error');
      this.cmdUpdateComentarioError = errMsg;
      setState('ui.comentarioCatalogue.action.cmdUpdateComentario.error', errMsg);
      this.cmdUpdateComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    const data: CmdUpdateComentarioOutput | null = response.data ?? null;
    this.cmdUpdateComentarioOutput = data;
    setState('ui.comentarioCatalogue.output.cmdUpdateComentario', data);
    try {
      await this.loadQryListComentario();
      if (this.qryListComentarioState === 'error') {
        this.cmdUpdateComentarioState = 'error';
        setState('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdUpdateComentario refresh failed', refreshError);
      this.cmdUpdateComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryGetComentario();
      if (this.qryGetComentarioState === 'error') {
        this.cmdUpdateComentarioState = 'error';
        setState('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdUpdateComentario refresh failed', refreshError);
      this.cmdUpdateComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryChamadoPicker();
      if (this.qryChamadoPickerState === 'error') {
        this.cmdUpdateComentarioState = 'error';
        setState('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdUpdateComentario refresh failed', refreshError);
      this.cmdUpdateComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryAtendentePicker();
      if (this.qryAtendentePickerState === 'error') {
        this.cmdUpdateComentarioState = 'error';
        setState('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdUpdateComentario refresh failed', refreshError);
      this.cmdUpdateComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    this.cmdUpdateComentarioComentarioId = '';
    setState('ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId', '');
    this.cmdUpdateComentarioChamadoId = '';
    setState('ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId', '');
    this.cmdUpdateComentarioAtendenteId = '';
    setState('ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId', '');
    this.cmdUpdateComentarioConteudo = '';
    setState('ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo', '');
    this.setUiScenary('base');
    this.cmdUpdateComentarioState = 'success';
    setState('ui.comentarioCatalogue.action.cmdUpdateComentario.status', 'success');
    this.requestUpdate();
  }

  /** handler for action cmdUpdateComentario "Atualizar Comentário" — bind UI events here */
  handleCmdUpdateComentarioClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.cmdUpdateComentario();
    });
  }

  /** action cmdDeleteComentario (command) "Excluir Comentário" — route controleChamados.comentarioCatalogue.cmdDeleteComentario; inputs: comentarioId; writes ui.comentarioCatalogue.output.cmdDeleteComentario; status ui.comentarioCatalogue.action.cmdDeleteComentario.status; feedback keys action.cmdDeleteComentario.success / action.cmdDeleteComentario.error */
  async cmdDeleteComentario(): Promise<void> {
    if (!this.cmdDeleteComentarioComentarioId) {
      this.cmdDeleteComentarioState = 'idle';
      setState('ui.comentarioCatalogue.action.cmdDeleteComentario.status', 'idle');
      this.requestUpdate();
      return;
    }
    this.cmdDeleteComentarioState = 'loading';
    setState('ui.comentarioCatalogue.action.cmdDeleteComentario.status', 'loading');
    this.cmdDeleteComentarioError = '';
    setState('ui.comentarioCatalogue.action.cmdDeleteComentario.error', '');
    const params: CmdDeleteComentarioInput = {
      comentarioId: this.cmdDeleteComentarioComentarioId,
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdDeleteComentarioOutput>(cmdDeleteComentarioRoute, params, options);
    if (!response.ok) {
      const errMsg: string = this.readErrorMessage(response.error, 'action.cmdDeleteComentario.error');
      this.cmdDeleteComentarioError = errMsg;
      setState('ui.comentarioCatalogue.action.cmdDeleteComentario.error', errMsg);
      this.cmdDeleteComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdDeleteComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    const data: CmdDeleteComentarioOutput | null = response.data ?? null;
    this.cmdDeleteComentarioOutput = data;
    setState('ui.comentarioCatalogue.output.cmdDeleteComentario', data);
    try {
      await this.loadQryListComentario();
      if (this.qryListComentarioState === 'error') {
        this.cmdDeleteComentarioState = 'error';
        setState('ui.comentarioCatalogue.action.cmdDeleteComentario.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdDeleteComentario refresh failed', refreshError);
      this.cmdDeleteComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdDeleteComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryGetComentario();
      if (this.qryGetComentarioState === 'error') {
        this.cmdDeleteComentarioState = 'error';
        setState('ui.comentarioCatalogue.action.cmdDeleteComentario.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdDeleteComentario refresh failed', refreshError);
      this.cmdDeleteComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdDeleteComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryChamadoPicker();
      if (this.qryChamadoPickerState === 'error') {
        this.cmdDeleteComentarioState = 'error';
        setState('ui.comentarioCatalogue.action.cmdDeleteComentario.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdDeleteComentario refresh failed', refreshError);
      this.cmdDeleteComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdDeleteComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    try {
      await this.loadQryAtendentePicker();
      if (this.qryAtendentePickerState === 'error') {
        this.cmdDeleteComentarioState = 'error';
        setState('ui.comentarioCatalogue.action.cmdDeleteComentario.status', 'error');
        this.requestUpdate();
        return;
      }
    } catch (refreshError: unknown) {
      console.error('cmdDeleteComentario refresh failed', refreshError);
      this.cmdDeleteComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.cmdDeleteComentario.status', 'error');
      this.requestUpdate();
      return;
    }
    this.cmdDeleteComentarioComentarioId = '';
    setState('ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId', '');
    this.setUiScenary('base');
    this.cmdDeleteComentarioState = 'success';
    setState('ui.comentarioCatalogue.action.cmdDeleteComentario.status', 'success');
    this.requestUpdate();
  }

  /** handler for action cmdDeleteComentario "Excluir Comentário" — bind UI events here */
  handleCmdDeleteComentarioClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.cmdDeleteComentario();
    });
  }

  /** action qryGetComentario (query) "Obter Comentário" — route controleChamados.comentarioCatalogue.qryGetComentario; inputs: comentarioId; writes ui.comentarioCatalogue.data.qryGetComentario; status ui.comentarioCatalogue.action.qryGetComentario.status */
  async loadQryGetComentario(): Promise<void> {
    if (!this.qryGetComentarioComentarioId) {
      this.qryGetComentarioState = 'idle';
      setState('ui.comentarioCatalogue.action.qryGetComentario.status', 'idle');
      this.requestUpdate();
      return;
    }
    this.qryGetComentarioState = 'loading';
    setState('ui.comentarioCatalogue.action.qryGetComentario.status', 'loading');
    const params: QryGetComentarioInput = {
      comentarioId: this.qryGetComentarioComentarioId,
    };
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<QryGetComentarioOutput>(qryGetComentarioRoute, params, options);
    if (response.ok) {
      const data = response.data ?? null;
      this.qryGetComentarioData = data;
      setState('ui.comentarioCatalogue.data.qryGetComentario', data);
      this.qryGetComentarioState = 'success';
      setState('ui.comentarioCatalogue.action.qryGetComentario.status', 'success');
    } else {
      this.qryGetComentarioState = 'error';
      setState('ui.comentarioCatalogue.action.qryGetComentario.status', 'error');
      if (response.error) {
        console.error('qryGetComentario failed', response.error);
      }
    }
    this.requestUpdate();
  }

  /** handler for action qryGetComentario "Obter Comentário" — bind UI events here */
  handleQryGetComentarioClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void this.loadQryGetComentario();
  }

  /** action qryChamadoPicker (query) "Listar Chamado" — route controleChamados.comentarioCatalogue.qryChamadoPicker; inputs: sortBy, sortOrder; writes ui.comentarioCatalogue.data.qryChamadoPicker; status ui.comentarioCatalogue.action.qryChamadoPicker.status */
  async loadQryChamadoPicker(): Promise<void> {
    this.qryChamadoPickerState = 'loading';
    setState('ui.comentarioCatalogue.action.qryChamadoPicker.status', 'loading');
    const params: QryChamadoPickerInput = {
    };
    if (this.qryChamadoPickerSortBy) {
      params.sortBy = this.qryChamadoPickerSortBy as QryChamadoPickerInput['sortBy'];
    }
    if (this.qryChamadoPickerSortOrder) {
      params.sortOrder = this.qryChamadoPickerSortOrder as QryChamadoPickerInput['sortOrder'];
    }
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<QryChamadoPickerOutput[]>(qryChamadoPickerRoute, params, options);
    if (response.ok) {
      const data = response.data ?? [];
      this.qryChamadoPickerData = data;
      setState('ui.comentarioCatalogue.data.qryChamadoPicker', data);
      this.qryChamadoPickerState = 'success';
      setState('ui.comentarioCatalogue.action.qryChamadoPicker.status', 'success');
    } else {
      this.qryChamadoPickerState = 'error';
      setState('ui.comentarioCatalogue.action.qryChamadoPicker.status', 'error');
      if (response.error) {
        console.error('qryChamadoPicker failed', response.error);
      }
    }
    this.requestUpdate();
  }

  /** handler for action qryChamadoPicker "Listar Chamado" — bind UI events here */
  handleQryChamadoPickerClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void this.loadQryChamadoPicker();
  }

  /** action qryAtendentePicker (query) "Listar Atendente" — route controleChamados.comentarioCatalogue.qryAtendentePicker; inputs: (none); writes ui.comentarioCatalogue.data.qryAtendentePicker; status ui.comentarioCatalogue.action.qryAtendentePicker.status */
  async loadQryAtendentePicker(): Promise<void> {
    this.qryAtendentePickerState = 'loading';
    setState('ui.comentarioCatalogue.action.qryAtendentePicker.status', 'loading');
    const params: QryAtendentePickerInput = {
    };
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<QryAtendentePickerOutput[]>(qryAtendentePickerRoute, params, options);
    if (response.ok) {
      const data = response.data ?? [];
      this.qryAtendentePickerData = data;
      setState('ui.comentarioCatalogue.data.qryAtendentePicker', data);
      this.qryAtendentePickerState = 'success';
      setState('ui.comentarioCatalogue.action.qryAtendentePicker.status', 'success');
    } else {
      this.qryAtendentePickerState = 'error';
      setState('ui.comentarioCatalogue.action.qryAtendentePicker.status', 'error');
      if (response.error) {
        console.error('qryAtendentePicker failed', response.error);
      }
    }
    this.requestUpdate();
  }

  /** handler for action qryAtendentePicker "Listar Atendente" — bind UI events here */
  handleQryAtendentePickerClick(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    void this.loadQryAtendentePicker();
  }

  /** setter for state ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId */
  setCmdCreateComentarioChamadoId(value: string): void {
    this.cmdCreateComentarioChamadoId = value;
    setState('ui.comentarioCatalogue.input.cmdCreateComentario.chamadoId', value);
    const collection =
      (getState('ui.comentarioCatalogue.data.qryListComentario') as QryListComentarioOutput[] | null | undefined) ?? this.qryListComentarioData;
    if (Array.isArray(collection) && collection.length > 0) {
      const item = collection.find(
        (row: QryListComentarioOutput) => String(row.chamadoId) === String(value),
      );
      if (item) {
        this.cmdCreateComentarioConteudo = item.conteudo;
        setState('ui.comentarioCatalogue.input.cmdCreateComentario.conteudo', item.conteudo);
      }
    }
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateComentarioChamadoId — bind UI events here */
  handleCmdCreateComentarioChamadoIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdCreateComentarioChamadoId(value);
  }

  /** setter for state ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId */
  setCmdCreateComentarioAtendenteId(value: string): void {
    this.cmdCreateComentarioAtendenteId = value;
    setState('ui.comentarioCatalogue.input.cmdCreateComentario.atendenteId', value);
    const collection =
      (getState('ui.comentarioCatalogue.data.qryListComentario') as QryListComentarioOutput[] | null | undefined) ?? this.qryListComentarioData;
    if (Array.isArray(collection) && collection.length > 0) {
      const item = collection.find(
        (row: QryListComentarioOutput) => String(row.atendenteId) === String(value),
      );
      if (item) {
        this.cmdCreateComentarioConteudo = item.conteudo;
        setState('ui.comentarioCatalogue.input.cmdCreateComentario.conteudo', item.conteudo);
      }
    }
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateComentarioAtendenteId — bind UI events here */
  handleCmdCreateComentarioAtendenteIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdCreateComentarioAtendenteId(value);
  }

  /** setter for state ui.comentarioCatalogue.input.cmdCreateComentario.conteudo */
  setCmdCreateComentarioConteudo(value: string): void {
    this.cmdCreateComentarioConteudo = value;
    setState('ui.comentarioCatalogue.input.cmdCreateComentario.conteudo', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateComentarioConteudo — bind UI events here */
  handleCmdCreateComentarioConteudoChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdCreateComentarioConteudo(value);
  }

  /** setter for state ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId */
  setCmdUpdateComentarioComentarioId(value: string): void {
    this.cmdUpdateComentarioComentarioId = value;
    setState('ui.comentarioCatalogue.input.cmdUpdateComentario.comentarioId', value);
    const collection =
      (getState('ui.comentarioCatalogue.data.qryListComentario') as QryListComentarioOutput[] | null | undefined) ?? this.qryListComentarioData;
    if (Array.isArray(collection) && collection.length > 0) {
      const item = collection.find(
        (row: QryListComentarioOutput) => String(row.comentarioId) === String(value),
      );
      if (item) {
        this.cmdUpdateComentarioConteudo = item.conteudo;
        setState('ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo', item.conteudo);
      }
    }
    this.requestUpdate();
  }

  /** handler for action set.cmdUpdateComentarioComentarioId — bind UI events here */
  handleCmdUpdateComentarioComentarioIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdUpdateComentarioComentarioId(value);
  }

  /** setter for state ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId */
  setCmdUpdateComentarioChamadoId(value: string): void {
    this.cmdUpdateComentarioChamadoId = value;
    setState('ui.comentarioCatalogue.input.cmdUpdateComentario.chamadoId', value);
    const collection =
      (getState('ui.comentarioCatalogue.data.qryListComentario') as QryListComentarioOutput[] | null | undefined) ?? this.qryListComentarioData;
    if (Array.isArray(collection) && collection.length > 0) {
      const item = collection.find(
        (row: QryListComentarioOutput) => String(row.chamadoId) === String(value),
      );
      if (item) {
        this.cmdUpdateComentarioConteudo = item.conteudo;
        setState('ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo', item.conteudo);
      }
    }
    this.requestUpdate();
  }

  /** handler for action set.cmdUpdateComentarioChamadoId — bind UI events here */
  handleCmdUpdateComentarioChamadoIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdUpdateComentarioChamadoId(value);
  }

  /** setter for state ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId */
  setCmdUpdateComentarioAtendenteId(value: string): void {
    this.cmdUpdateComentarioAtendenteId = value;
    setState('ui.comentarioCatalogue.input.cmdUpdateComentario.atendenteId', value);
    const collection =
      (getState('ui.comentarioCatalogue.data.qryListComentario') as QryListComentarioOutput[] | null | undefined) ?? this.qryListComentarioData;
    if (Array.isArray(collection) && collection.length > 0) {
      const item = collection.find(
        (row: QryListComentarioOutput) => String(row.atendenteId) === String(value),
      );
      if (item) {
        this.cmdUpdateComentarioConteudo = item.conteudo;
        setState('ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo', item.conteudo);
      }
    }
    this.requestUpdate();
  }

  /** handler for action set.cmdUpdateComentarioAtendenteId — bind UI events here */
  handleCmdUpdateComentarioAtendenteIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdUpdateComentarioAtendenteId(value);
  }

  /** setter for state ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo */
  setCmdUpdateComentarioConteudo(value: string): void {
    this.cmdUpdateComentarioConteudo = value;
    setState('ui.comentarioCatalogue.input.cmdUpdateComentario.conteudo', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdUpdateComentarioConteudo — bind UI events here */
  handleCmdUpdateComentarioConteudoChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdUpdateComentarioConteudo(value);
  }

  /** setter for state ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId */
  setCmdDeleteComentarioComentarioId(value: string): void {
    this.cmdDeleteComentarioComentarioId = value;
    setState('ui.comentarioCatalogue.input.cmdDeleteComentario.comentarioId', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdDeleteComentarioComentarioId — bind UI events here */
  handleCmdDeleteComentarioComentarioIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setCmdDeleteComentarioComentarioId(value);
  }

  /** setter for state ui.comentarioCatalogue.input.qryGetComentario.comentarioId */
  setQryGetComentarioComentarioId(value: string): void {
    this.qryGetComentarioComentarioId = value;
    setState('ui.comentarioCatalogue.input.qryGetComentario.comentarioId', value);
    if (value) this.setUiScenary('detail');
    this.requestUpdate();
  }

  /** handler for action set.qryGetComentarioComentarioId — bind UI events here */
  handleQryGetComentarioComentarioIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setQryGetComentarioComentarioId(value);
  }

  /** setter for state ui.comentarioCatalogue.input.qryChamadoPicker.sortBy */
  setQryChamadoPickerSortBy(value: string): void {
    this.qryChamadoPickerSortBy = value;
    setState('ui.comentarioCatalogue.input.qryChamadoPicker.sortBy', value);
    this.requestUpdate();
  }

  /** handler for action set.qryChamadoPickerSortBy — bind UI events here */
  handleQryChamadoPickerSortByChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setQryChamadoPickerSortBy(value);
  }

  /** setter for state ui.comentarioCatalogue.input.qryChamadoPicker.sortOrder */
  setQryChamadoPickerSortOrder(value: string): void {
    this.qryChamadoPickerSortOrder = value;
    setState('ui.comentarioCatalogue.input.qryChamadoPicker.sortOrder', value);
    this.requestUpdate();
  }

  /** handler for action set.qryChamadoPickerSortOrder — bind UI events here */
  handleQryChamadoPickerSortOrderChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value: string = target && 'value' in target ? String(target.value) : '';
    this.setQryChamadoPickerSortOrder(value);
  }
}
