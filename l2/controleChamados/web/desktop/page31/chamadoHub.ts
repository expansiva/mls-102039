/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page31/chamadoHub.ts" enhancement="_102020_/l2/enhancementAura"/>

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
// The copy you invent, with short keys. Only this part repeats per language.
'stat.chamados': 'Chamados acompanhados',
'stat.comentarios': 'Comentários registrados',
'section.chamados.title': 'Chamados recentes',
'section.comentarios.title': 'Atividade de comentários',
'section.refresh': 'Atualizar dados',
'state.loading': 'Carregando dados',
'state.error': 'Não foi possível carregar esta seção',
'state.retry': 'Tentar novamente',
'state.empty': 'Nenhum item disponível no momento',
'item.withoutTitle': 'Chamado sem título',
'item.withoutDescription': 'Sem descrição informada',
'item.withoutComment': 'Comentário sem conteúdo',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page31--chamado-hub-102039')
export class ControleChamadosDesktopPage31ChamadoHubPage extends ControleChamadosChamadoHubBase {
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
const visibleChamados: QryListChamadoOutput[] = chamados.slice(0, 5);
const visibleComentarios: QryListComentarioOutput[] = comentarios.slice(0, 5);
const chamadosLoading = this.qryListChamadoState === 'loading';
const comentariosLoading = this.qryListComentarioState === 'loading';
const chamadoError = this.qryListChamadoState === 'error';
const comentarioError = this.qryListComentarioState === 'error';
const titleOfChamado = (item: QryListChamadoOutput): string => item.titulo || msg['item.withoutTitle'];
const descriptionOfChamado = (item: QryListChamadoOutput): string => item.descricao || msg['item.withoutDescription'];
const commentOf = (item: QryListComentarioOutput): string => item.conteudo || msg['item.withoutComment'];
return html`
<section class="min-h-full bg-[var(--page-bg,#f8fafc)] p-6 text-[var(--text-default,#0f172a)]">
<div class="mx-auto max-w-7xl space-y-6">
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
<article class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-5 shadow-sm">
<div class="text-4xl font-bold tabular-nums text-[var(--text-strong,#0f172a)]">${chamadosLoading ? '—' : chamados.length}</div>
<div class="mt-2 text-sm text-[var(--text-muted,#64748b)]">${msg['stat.chamados']}</div>
</article>
<article class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-5 shadow-sm">
<div class="text-4xl font-bold tabular-nums text-[var(--text-strong,#0f172a)]">${comentariosLoading ? '—' : comentarios.length}</div>
<div class="mt-2 text-sm text-[var(--text-muted,#64748b)]">${msg['stat.comentarios']}</div>
</article>
</div>
<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
<section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-5 shadow-sm">
<div class="mb-4 flex items-center justify-between gap-4">
<h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['section.chamados.title']}</h2>
<button class="rounded-md bg-[var(--button-secondary-bg,#ffffff)] px-3 py-2 text-sm text-[var(--button-secondary-text,#334155)] ring-1 ring-[var(--button-secondary-border,#cbd5e1)]" @click=${this.handleQryListChamadoClick}>${msg['section.refresh']}</button>
</div>
${chamadosLoading ? html`<div class="rounded-md bg-[var(--surface-alt-bg,#f1f5f9)] p-4 text-sm text-[var(--text-muted,#64748b)]" role="status">${msg['state.loading']}</div>` : nothing}
${chamadoError ? html`<div class="space-y-3 rounded-md bg-[var(--status-error-bg,#fee2e2)] p-4 text-sm text-[var(--status-error-text,#991b1b)]" role="alert"><div>${msg['state.error']}</div><button class="rounded-md bg-[var(--button-secondary-bg,#ffffff)] px-3 py-2 text-[var(--button-secondary-text,#334155)] ring-1 ring-[var(--button-secondary-border,#cbd5e1)]" @click=${this.handleQryListChamadoClick}>${msg['state.retry']}</button></div>` : nothing}
${!chamadosLoading && !chamadoError && visibleChamados.length === 0 ? html`<p class="rounded-md bg-[var(--surface-alt-bg,#f1f5f9)] p-4 text-sm text-[var(--text-muted,#64748b)]">${msg['state.empty']}</p>` : nothing}
${!chamadosLoading && !chamadoError && visibleChamados.length > 0 ? html`<div class="space-y-3">${visibleChamados.map((item: QryListChamadoOutput) => html`<article class="rounded-md border border-[var(--border-subtle,#e2e8f0)] p-4 ${item.status && item.status !== 'closed' ? 'border-l-4 border-l-[var(--status-warning-text,#92400e)]' : ''}"><h3 class="font-medium text-[var(--text-strong,#0f172a)]">${titleOfChamado(item)}</h3><p class="mt-1 text-sm text-[var(--text-muted,#64748b)]">${descriptionOfChamado(item)}</p></article>`)}</div>` : nothing}
</section>
<section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-5 shadow-sm">
<div class="mb-4 flex items-center justify-between gap-4"><h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['section.comentarios.title']}</h2><button class="rounded-md bg-[var(--button-secondary-bg,#ffffff)] px-3 py-2 text-sm text-[var(--button-secondary-text,#334155)] ring-1 ring-[var(--button-secondary-border,#cbd5e1)]" @click=${this.handleQryListComentarioClick}>${msg['section.refresh']}</button></div>
${comentariosLoading ? html`<div class="rounded-md bg-[var(--surface-alt-bg,#f1f5f9)] p-4 text-sm text-[var(--text-muted,#64748b)]" role="status">${msg['state.loading']}</div>` : nothing}
${comentarioError ? html`<div class="space-y-3 rounded-md bg-[var(--status-error-bg,#fee2e2)] p-4 text-sm text-[var(--status-error-text,#991b1b)]" role="alert"><div>${msg['state.error']}</div><button class="rounded-md bg-[var(--button-secondary-bg,#ffffff)] px-3 py-2 text-[var(--button-secondary-text,#334155)] ring-1 ring-[var(--button-secondary-border,#cbd5e1)]" @click=${this.handleQryListComentarioClick}>${msg['state.retry']}</button></div>` : nothing}
${!comentariosLoading && !comentarioError && visibleComentarios.length === 0 ? html`<p class="rounded-md bg-[var(--surface-alt-bg,#f1f5f9)] p-4 text-sm text-[var(--text-muted,#64748b)]">${msg['state.empty']}</p>` : nothing}
${!comentariosLoading && !comentarioError && visibleComentarios.length > 0 ? html`<div class="space-y-3">${visibleComentarios.map((item: QryListComentarioOutput) => html`<article class="rounded-md border border-[var(--border-subtle,#e2e8f0)] p-4"><p class="text-sm text-[var(--text-default,#0f172a)]">${commentOf(item)}</p></article>`)}</div>` : nothing}
</section>
</div>
</div>
</section>
`;
}
}
