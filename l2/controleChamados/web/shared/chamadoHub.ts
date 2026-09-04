/// <mls fileReference="_102039_/l2/controleChamados/web/shared/chamadoHub.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
QryListChamadoInput,
QryListChamadoOutput,
QryListComentarioInput,
QryListComentarioOutput,
} from '/_102039_/l2/controleChamados/web/contracts/chamadoHub.js';
import {
qryListChamadoRoute,
qryListComentarioRoute,
} from '/_102039_/l2/controleChamados/web/contracts/chamadoHub.js';
export type {
QryListChamadoInput,
QryListChamadoOutput,
QryListComentarioInput,
QryListComentarioOutput,
} from '/_102039_/l2/controleChamados/web/contracts/chamadoHub.js';

const SUBSCRIBED_STATE_KEYS: string[] = [
'ui.chamadoHub.status',
'ui.chamadoHub.scenary',
'ui.chamadoHub.action.qryListChamado.status',
'ui.chamadoHub.input.qryListChamado.sortBy',
'ui.chamadoHub.input.qryListChamado.sortOrder',
'ui.chamadoHub.data.qryListChamado',
'ui.chamadoHub.action.qryListComentario.status',
'ui.chamadoHub.data.qryListComentario',
];

export class ControleChamadosChamadoHubBase extends CollabLitElement {
/** state status — pageStatus */
@property() status: string = '';
/** state ui.chamadoHub.scenary — uiScenary, values: base */
@property() uiScenary: 'base' = 'base';
/** state qryListChamadoState — actionStatus, values: idle|loading|success|error */
@property() qryListChamadoState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state qryListChamadoSortBy — input, values: open|closed */
@property() qryListChamadoSortBy: QryListChamadoInput['sortBy'] | '' = '';
/** state qryListChamadoSortOrder — input, values: asc|desc */
@property() qryListChamadoSortOrder: QryListChamadoInput['sortOrder'] | '' = '';
/** state qryListChamadoData — queryResult, outputShape: array */
@property() qryListChamadoData: QryListChamadoOutput[] = [];
/** state qryListComentarioState — actionStatus, values: idle|loading|success|error */
@property() qryListComentarioState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
/** state qryListComentarioData — queryResult, outputShape: array */
@property() qryListComentarioData: QryListComentarioOutput[] = [];

/** lifecycle connectedCallback — initializes shared state, subscribes to state changes, and runs initial loads */
connectedCallback(): void {
super.connectedCallback();
this.initStateValue('ui.chamadoHub.status', '');
this.initStateValue('ui.chamadoHub.scenary', 'base');
this.initStateValue('ui.chamadoHub.action.qryListChamado.status', 'idle');
this.initStateValue('ui.chamadoHub.input.qryListChamado.sortBy', '');
this.initStateValue('ui.chamadoHub.input.qryListChamado.sortOrder', '');
this.initStateValue('ui.chamadoHub.data.qryListChamado', []);
this.initStateValue('ui.chamadoHub.action.qryListComentario.status', 'idle');
this.initStateValue('ui.chamadoHub.data.qryListComentario', []);
this.applyUrlScenary();
subscribe(SUBSCRIBED_STATE_KEYS, this);
void this.loadQryListChamado();
void this.loadQryListComentario();
}
/** lifecycle disconnectedCallback — unsubscribes this component from shared state */
disconnectedCallback(): void {
unsubscribe(SUBSCRIBED_STATE_KEYS, this);
super.disconnectedCallback();
}
/** handleIcaStateChange — collabState notify contract; maps state keys onto class fields */
handleIcaStateChange(key: string, value: unknown): void {
switch (key) {
case 'ui.chamadoHub.status':
this.status = (value as string) ?? '';
break;
case 'ui.chamadoHub.scenary':
this.uiScenary = (value as 'base') ?? 'base';
break;
case 'ui.chamadoHub.action.qryListChamado.status':
this.qryListChamadoState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
break;
case 'ui.chamadoHub.input.qryListChamado.sortBy':
this.qryListChamadoSortBy = (value as QryListChamadoInput['sortBy'] | '') ?? '';
break;
case 'ui.chamadoHub.input.qryListChamado.sortOrder':
this.qryListChamadoSortOrder = (value as QryListChamadoInput['sortOrder'] | '') ?? '';
break;
case 'ui.chamadoHub.data.qryListChamado':
this.qryListChamadoData = (value as QryListChamadoOutput[]) ?? [];
break;
case 'ui.chamadoHub.action.qryListComentario.status':
this.qryListComentarioState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
break;
case 'ui.chamadoHub.data.qryListComentario':
this.qryListComentarioData = (value as QryListComentarioOutput[]) ?? [];
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
case 'ui.chamadoHub.status':
this.status = (value as string) ?? '';
break;
case 'ui.chamadoHub.scenary':
this.uiScenary = (value as 'base') ?? 'base';
break;
case 'ui.chamadoHub.action.qryListChamado.status':
this.qryListChamadoState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
break;
case 'ui.chamadoHub.input.qryListChamado.sortBy':
this.qryListChamadoSortBy = (value as QryListChamadoInput['sortBy'] | '') ?? '';
break;
case 'ui.chamadoHub.input.qryListChamado.sortOrder':
this.qryListChamadoSortOrder = (value as QryListChamadoInput['sortOrder'] | '') ?? '';
break;
case 'ui.chamadoHub.data.qryListChamado':
this.qryListChamadoData = (value as QryListChamadoOutput[]) ?? [];
break;
case 'ui.chamadoHub.action.qryListComentario.status':
this.qryListComentarioState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
break;
case 'ui.chamadoHub.data.qryListComentario':
this.qryListComentarioData = (value as QryListComentarioOutput[]) ?? [];
break;
default:
break;
}
if (existing === undefined) {
setState(stateKey, value);
}
}

  /** setter for state ui.chamadoHub.scenary */
  setUiScenary(value: string): void {
    const allowed: string[] = ['base'];
    if (!allowed.includes(value)) {
      console.warn('setUiScenary: unknown value \'' + value + '\'');
      return;
    }
    let next: string = value;
    this.uiScenary = next as typeof this.uiScenary;
    setState('ui.chamadoHub.scenary', next);
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
    const requested: string = params.get('scenary') || 'base';
    this.setUiScenary(requested);
  }

  private syncScenaryQuery(value: string): void {
    const url = new URL(window.location.href);
    if (value === 'base') url.searchParams.delete('scenary');
    else url.searchParams.set('scenary', value);
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  }

/** action qryListChamado (query) — route controleChamados.chamadoHub.qryListChamado; inputs: sortBy, sortOrder; writes ui.chamadoHub.data.qryListChamado; status ui.chamadoHub.action.qryListChamado.status */
async loadQryListChamado(): Promise<void> {
this.qryListChamadoState = 'loading';
setState('ui.chamadoHub.action.qryListChamado.status', 'loading');
const params: QryListChamadoInput = {};
if (this.qryListChamadoSortBy) params.sortBy = this.qryListChamadoSortBy;
if (this.qryListChamadoSortOrder) params.sortOrder = this.qryListChamadoSortOrder;
const options: BffClientOptions = { mode: 'silent' };
const response = await execBff<QryListChamadoOutput[]>(qryListChamadoRoute, params, options);
if (response.ok) {
const data = response.data ?? [];
this.qryListChamadoData = data;
setState('ui.chamadoHub.data.qryListChamado', data);
this.qryListChamadoState = 'success';
setState('ui.chamadoHub.action.qryListChamado.status', 'success');
} else {
this.qryListChamadoState = 'error';
setState('ui.chamadoHub.action.qryListChamado.status', 'error');
if (response.error) console.error('qryListChamado failed', response.error);
}
this.requestUpdate();
}
/** handler for action qryListChamado — bind UI events here */
handleQryListChamadoClick(event?: Event): void {
if (event) event.preventDefault();
void this.loadQryListChamado();
}
/** action qryListComentario (query) — route controleChamados.chamadoHub.qryListComentario; inputs: none; writes ui.chamadoHub.data.qryListComentario; status ui.chamadoHub.action.qryListComentario.status */
async loadQryListComentario(): Promise<void> {
this.qryListComentarioState = 'loading';
setState('ui.chamadoHub.action.qryListComentario.status', 'loading');
const params: QryListComentarioInput = {};
const options: BffClientOptions = { mode: 'silent' };
const response = await execBff<QryListComentarioOutput[]>(qryListComentarioRoute, params, options);
if (response.ok) {
const data = response.data ?? [];
this.qryListComentarioData = data;
setState('ui.chamadoHub.data.qryListComentario', data);
this.qryListComentarioState = 'success';
setState('ui.chamadoHub.action.qryListComentario.status', 'success');
} else {
this.qryListComentarioState = 'error';
setState('ui.chamadoHub.action.qryListComentario.status', 'error');
if (response.error) console.error('qryListComentario failed', response.error);
}
this.requestUpdate();
}
/** handler for action qryListComentario — bind UI events here */
handleQryListComentarioClick(event?: Event): void {
if (event) event.preventDefault();
void this.loadQryListComentario();
}
/** setter for state ui.chamadoHub.input.qryListChamado.sortBy */
setQryListChamadoSortBy(value: string): void {
this.qryListChamadoSortBy = value as QryListChamadoInput['sortBy'] | '';
setState('ui.chamadoHub.input.qryListChamado.sortBy', value);
this.requestUpdate();
}
/** handler for action set.qryListChamadoSortBy — bind UI events here */
handleQryListChamadoSortByChange(event: Event): void {
const target = event.target as HTMLInputElement | HTMLSelectElement | null;
const value: string = target && 'value' in target ? String(target.value) : '';
this.setQryListChamadoSortBy(value);
}
/** setter for state ui.chamadoHub.input.qryListChamado.sortOrder */
setQryListChamadoSortOrder(value: string): void {
this.qryListChamadoSortOrder = value as QryListChamadoInput['sortOrder'] | '';
setState('ui.chamadoHub.input.qryListChamado.sortOrder', value);
this.requestUpdate();
}
/** handler for action set.qryListChamadoSortOrder — bind UI events here */
handleQryListChamadoSortOrderChange(event: Event): void {
const target = event.target as HTMLInputElement | HTMLSelectElement | null;
const value: string = target && 'value' in target ? String(target.value) : '';
this.setQryListChamadoSortOrder(value);
}
}
