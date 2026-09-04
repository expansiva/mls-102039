/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page21/chamadoHub.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosChamadoHubBase } from '/_102039_/l2/controleChamados/web/shared/chamadoHub.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import type { QryListChamadoOutput, QryListComentarioOutput } from '/_102039_/l2/controleChamados/web/shared/chamadoHub.js';
/// **collab_i18n_start**
// The catalogue of this page. The keys below come from the module plan — do NOT edit their
// text and do NOT inline a string in the template: reference a key, or add your own SHORT
// key here (in EVERY locale) — 'orders.empty': 'No orders yet',
const pageMessage_pt_br = {
'section.collection.title': 'Carteira de chamados',
'organism.qryListChamado.title': 'Listar Chamado',
'intent.qryListChamado.list.title': 'Listar Chamado',
'intent.qryListChamado.list.empty': 'Nenhum registro encontrado',
'intent.qryListChamado.list.column.chamadoId.label': 'Identificador do chamado',
'intent.qryListChamado.list.column.titulo.label': 'Título',
'intent.qryListChamado.list.column.descricao.label': 'Descrição',
'intent.qryListChamado.list.column.status.label': 'Status',
'intent.qryListChamado.list.filter.sortBy.label': 'Sort By',
'intent.qryListChamado.list.filter.sortOrder.label': 'Sort Order',
'section.record.title': 'Contexto do registro',
'organism.qryListComentario.title': 'Listar Comentário',
'intent.qryListComentario.list.title': 'Listar Comentário',
'intent.qryListComentario.list.empty': 'Nenhum registro encontrado',
'intent.qryListComentario.list.column.comentarioId.label': 'Identificador do comentário',
'intent.qryListComentario.list.column.chamadoId.label': 'Identificador do chamado',
'intent.qryListComentario.list.column.atendenteId.label': 'Atendente que registrou',
'intent.qryListComentario.list.column.conteudo.label': 'Comentário',
'scenary.base': 'Listar Chamado',
'triage.headline': 'Chamados que precisam de atenção',
'triage.count': '{count} chamados precisam de atenção',
'triage.none': 'Nada precisa de atenção agora',
'triage.lane.open': 'Chamados em aberto',
'triage.fact': 'Status',
'triage.all': 'Ver todos os chamados',
'triage.comments': 'Comentários recentes',
'triage.noComments': 'Nenhum comentário encontrado',
'triage.loading': 'Carregando informações',
'triage.retry': 'Tentar novamente',
'triage.error': 'Não foi possível carregar esta lista',
'triage.status.open': 'Em aberto',
'triage.status.closed': 'Encerrado',
'triage.status.unknown': 'Não informado',
/* to implement */
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page21--chamado-hub-102039')
export class ControleChamadosDesktopPage21ChamadoHubPage extends ControleChamadosChamadoHubBase {
#msgLang: string | null = null;
#msgCache: PageMessageType = pageFallback;
/** i18n catalog — resolved once per language, refreshed only when the document language changes. */
protected get msg(): PageMessageType {
const lang = (document.documentElement.lang || '').toLowerCase();
if (lang !== this.#msgLang) {
this.#msgLang = lang;
this.#msgCache = pageMessages[this.getMessageKey(pageMessages)] || pageFallback;
}
return this.#msgCache;
}
/** Main render. The scenary host and Scene list are fixed — fill renderScenary<X>(), not this. */
render() {
const msg = this.msg;
return html`
<molecules--ml-scenary-102020 mode="scenary" .value=${this.uiScenary}
@change=${this.handleUiScenaryChange}>
<Scene value="base" title=${msg['scenary.base']}>
${this.renderScenaryBase()}
</Scene>
</molecules--ml-scenary-102020>
`;
}
renderScenaryBase() {
const msg = this.msg;
const chamados: QryListChamadoOutput[] = this.qryListChamadoData;
const comentarios: QryListComentarioOutput[] = this.qryListComentarioData;
const attention = chamados.filter((item: QryListChamadoOutput): boolean => item.status === 'open');
const statusLabel = (status: QryListChamadoOutput['status']): string => {
if (status === 'open') return msg['triage.status.open'];
if (status === 'closed') return msg['triage.status.closed'];
return msg['triage.status.unknown'];
};
const renderChamado = (item: QryListChamadoOutput) => html`
<li class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-[var(--border-subtle,#e2e8f0)] px-4 py-4 last:border-b-0">
<div class="min-w-0">
<p class="truncate font-medium text-[var(--text-strong,#0f172a)]">${item.titulo}</p>
<p class="mt-1 truncate text-sm text-[var(--text-muted,#64748b)]">${item.descricao}</p>
</div>
<div class="text-right">
<p class="tabular-nums text-sm ${item.status === 'open' ? 'text-[var(--status-warning-text,#92400e)]' : 'text-[var(--text-muted,#64748b)]'}">${statusLabel(item.status)}</p>
</div>
</li>
`;
return html`
<section class="space-y-6 bg-[var(--page-bg,#f8fafc)] p-4 text-[var(--text-default,#0f172a)] md:p-6">
<header>
<h1 class="text-xl font-bold text-[var(--text-strong,#0f172a)]">${msg['triage.headline']}</h1>
<p class="mt-1 text-sm text-[var(--text-muted,#64748b)]">${msg['triage.count'].replace('{count}', String(attention.length))}</p>
</header>
${this.qryListChamadoState === 'loading' ? html`
<div class="space-y-3" aria-label=${msg['triage.loading']}>
<div class="h-16 animate-pulse rounded-lg bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
<div class="h-16 animate-pulse rounded-lg bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
</div>
` : this.qryListChamadoState === 'error' ? html`
<div class="rounded-lg border border-[var(--status-error-bg,#fee2e2)] bg-[var(--surface-bg,#ffffff)] p-4">
<p class="text-[var(--status-error-text,#991b1b)]">${msg['triage.error']}</p>
<button class="mt-3 rounded-md bg-[var(--button-secondary-bg,#ffffff)] px-3 py-2 text-[var(--button-secondary-text,#334155)]" @click=${this.handleQryListChamadoClick}>${msg['triage.retry']}</button>
</div>
` : attention.length === 0 ? html`
<p class="rounded-lg bg-[var(--surface-bg,#ffffff)] p-4 text-[var(--text-muted,#64748b)]">${msg['triage.none']}</p>
` : html`
<section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] shadow-[var(--shadow-small,0_1px_2px_rgba(0,0,0,.05))]">
<h2 class="border-b border-[var(--border-subtle,#e2e8f0)] px-4 py-3 text-base font-semibold">${msg['triage.lane.open']}</h2>
<ul>${attention.map(renderChamado)}</ul>
</section>
`}
<div class="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-[var(--border-subtle,#e2e8f0)] py-3 text-sm">
<span class="font-medium tabular-nums">${chamados.length} <span class="font-normal text-[var(--text-muted,#64748b)]">${msg['triage.all']}</span></span>
<span class="font-medium tabular-nums">${comentarios.length} <span class="font-normal text-[var(--text-muted,#64748b)]">${msg['triage.comments']}</span></span>
</div>
${chamados.length > 0 ? html`
<details class="rounded-lg bg-[var(--surface-bg,#ffffff)]">
<summary class="cursor-pointer px-4 py-3 text-sm font-medium text-[var(--link-text,#2563eb)]">${msg['triage.all']}</summary>
<ul class="border-t border-[var(--border-subtle,#e2e8f0)]">${chamados.map(renderChamado)}</ul>
</details>
` : nothing}
</section>
`;
}
}
