/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page11/chamadoHub.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosChamadoHubBase } from '/_102039_/l2/controleChamados/web/shared/chamadoHub.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import type {
QryListChamadoOutput,
QryListComentarioOutput,
} from '/_102039_/l2/controleChamados/web/shared/chamadoHub.js';
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
'page.refresh': 'Atualizar dados',
'filter.all': 'Todos',
'sortBy.open': 'Abertos',
'sortBy.closed': 'Fechados',
'sortOrder.asc': 'Crescente',
'sortOrder.desc': 'Decrescente',
'loading': 'Carregando dados…',
'comments.title': 'Atividade recente',
'comments.loading': 'Carregando comentários…',
'comments.empty': 'Nenhum comentário encontrado',
'error.load': 'Não foi possível carregar os dados.',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page11--chamado-hub-102039')
export class ControleChamadosDesktopPage11ChamadoHubPage extends ControleChamadosChamadoHubBase {
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
const chamadoLoading: boolean = this.qryListChamadoState === 'loading';
const comentarioLoading: boolean = this.qryListComentarioState === 'loading';
const statusLabel: Record<string, string> = {
open: msg['sortBy.open'],
closed: msg['sortBy.closed'],
};
return html`
<div class="min-h-full bg-[var(--page-bg,#f8fafc)] text-[var(--text-default,#0f172a)]">
<div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
<header class="flex flex-wrap items-center justify-between gap-4">
<h1 class="text-2xl font-bold text-[var(--text-strong,#0f172a)]">${msg['section.collection.title']}</h1>
<button type="button"
class="rounded-md bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] px-4 py-2"
?disabled=${chamadoLoading || comentarioLoading}
@click=${(event: Event) => { this.handleQryListChamadoClick(event); this.handleQryListComentarioClick(); }}>
${chamadoLoading || comentarioLoading ? msg['loading'] : msg['page.refresh']}
</button>
</header>
<section class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] shadow-sm p-4 space-y-4">
<div class="flex flex-wrap items-end justify-between gap-4">
<div>
<h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['organism.qryListChamado.title']}</h2>
</div>
</div>
${chamadoLoading ? html`<p class="rounded-md bg-[var(--status-info-bg,#dbeafe)] text-[var(--status-info-text,#1e40af)] p-3">${msg['loading']}</p>` : nothing}
${!chamadoLoading && chamados.length === 0 ? html`<p class="text-[var(--text-muted,#64748b)] py-6">${msg['intent.qryListChamado.list.empty']}</p>` : nothing}
${!chamadoLoading && chamados.length > 0 ? html`
<div class="overflow-x-auto">
<table class="w-full text-left text-sm">
<thead class="border-b border-[var(--border-subtle,#e2e8f0)] text-[var(--text-muted,#64748b)]">
<tr>
<th class="px-3 py-2">${msg['intent.qryListChamado.list.column.titulo.label']}</th>
<th class="px-3 py-2">${msg['intent.qryListChamado.list.column.descricao.label']}</th>
<th class="px-3 py-2">${msg['intent.qryListChamado.list.column.status.label']}</th>
</tr>
</thead>
<tbody>
${chamados.map((item: QryListChamadoOutput) => html`
<tr class="border-b border-[var(--border-subtle,#e2e8f0)] last:border-0">
<td class="px-3 py-3 font-medium text-[var(--text-strong,#0f172a)]">${item.titulo}</td>
<td class="px-3 py-3 text-[var(--text-muted,#64748b)]">${item.descricao}</td>
<td class="px-3 py-3">${statusLabel[item.status] ?? item.status}</td>
</tr>
`)}
</tbody>
</table>
</div>
` : nothing}
</section>
<section class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-4">
<h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['comments.title']}</h2>
${comentarioLoading ? html`<p class="rounded-md bg-[var(--status-info-bg,#dbeafe)] text-[var(--status-info-text,#1e40af)] p-3">${msg['comments.loading']}</p>` : nothing}
${!comentarioLoading && comentarios.length === 0 ? html`<p class="text-[var(--text-muted,#64748b)] py-4">${msg['comments.empty']}</p>` : nothing}
${!comentarioLoading && comentarios.length > 0 ? html`
<div class="space-y-3">
${comentarios.map((item: QryListComentarioOutput) => html`
<article class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-3">
<div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--text-muted,#64748b)]">
<span>${msg['intent.qryListComentario.list.column.chamadoId.label']}: ${item.chamadoId}</span>
</div>
</article>
`)}
</div>
` : nothing}
</section>
</div>
</div>
`;
}
}
