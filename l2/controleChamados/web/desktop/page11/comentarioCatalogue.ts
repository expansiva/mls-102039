/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page11/comentarioCatalogue.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosComentarioCatalogueBase } from '/_102039_/l2/controleChamados/web/shared/comentarioCatalogue.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import type {
QryListComentarioOutput,
QryGetComentarioOutput,
QryChamadoPickerOutput,
QryAtendentePickerOutput,
} from '/_102039_/l2/controleChamados/web/shared/comentarioCatalogue.js';
/// **collab_i18n_start**
const pageMessage_pt_br = {
'section.recordList.title': 'Localizar Comentário',
'organism.qryListComentario.title': 'Listar Comentário',
'intent.qryListComentario.list.title': 'Listar Comentário',
'intent.qryListComentario.list.empty': 'Nenhum registro encontrado',
'intent.qryListComentario.list.column.comentarioId.label': 'Identificador do comentário',
'intent.qryListComentario.list.column.chamadoId.label': 'Chamado',
'intent.qryListComentario.list.column.atendenteId.label': 'Atendente que registrou',
'intent.qryListComentario.list.column.conteudo.label': 'Comentário',
'organism.qryGetComentario.title': 'Obter Comentário',
'intent.qryGetComentario.list.title': 'Obter Comentário',
'intent.qryGetComentario.list.empty': 'Nenhum registro encontrado',
'intent.qryGetComentario.list.column.comentarioId.label': 'Identificador do comentário',
'intent.qryGetComentario.list.column.chamadoId.label': 'Chamado',
'intent.qryGetComentario.list.column.atendenteId.label': 'Atendente que registrou',
'intent.qryGetComentario.list.column.conteudo.label': 'Comentário',
'organism.cmdDeleteComentario.title': 'Excluir Comentário',
'intent.cmdDeleteComentario.form.title': 'Excluir Comentário',
'intent.cmdDeleteComentario.form.action.cmdDeleteComentario': 'Excluir Comentário',
'section.recordForm.title': 'Criar ou corrigir Comentário',
'organism.cmdCreateComentario.title': 'Criar Comentário',
'intent.cmdCreateComentario.form.title': 'Criar Comentário',
'intent.cmdCreateComentario.form.action.cmdCreateComentario': 'Criar Comentário',
'intent.cmdCreateComentario.form.field.conteudo.label': 'Comentário',
'organism.qryChamadoPicker.title': 'Listar Chamado',
'intent.qryChamadoPicker.list.title': 'Listar Chamado',
'intent.qryChamadoPicker.list.empty': 'Nenhum registro encontrado',
'intent.qryChamadoPicker.list.column.chamadoId.label': 'Chamado',
'intent.qryChamadoPicker.list.column.titulo.label': 'Título',
'intent.qryChamadoPicker.list.column.descricao.label': 'Descrição',
'intent.qryChamadoPicker.list.column.status.label': 'Status',
'intent.qryChamadoPicker.list.filter.sortBy.label': 'Sort By',
'intent.qryChamadoPicker.list.filter.sortOrder.label': 'Sort Order',
'organism.qryAtendentePicker.title': 'Listar Atendente',
'intent.qryAtendentePicker.list.title': 'Listar Atendente',
'intent.qryAtendentePicker.list.empty': 'Nenhum registro encontrado',
'intent.qryAtendentePicker.list.column.atendenteId.label': 'Atendente que registrou',
'intent.qryAtendentePicker.list.column.platformUserId.label': 'Usuário da plataforma',
'organism.cmdUpdateComentario.title': 'Atualizar Comentário',
'intent.cmdUpdateComentario.form.title': 'Atualizar Comentário',
'intent.cmdUpdateComentario.form.action.cmdUpdateComentario': 'Atualizar Comentário',
'intent.cmdUpdateComentario.form.field.conteudo.label': 'Comentário',
'action.cmdCreateComentario.success': 'Criar Comentário: OK',
'action.cmdCreateComentario.error': 'Criar Comentário: falhou',
'action.cmdUpdateComentario.success': 'Atualizar Comentário: OK',
'action.cmdUpdateComentario.error': 'Atualizar Comentário: falhou',
'action.cmdDeleteComentario.success': 'Excluir Comentário: OK',
'action.cmdDeleteComentario.error': 'Excluir Comentário: falhou',
'section.comentarioWorkbench.title': 'Comentários',
'section.comentarioCreation.title': 'Novo comentário',
'section.comentarioWorkspace.title': 'Comentários',
'scenary.base': 'Listar Comentário',
'scenary.detail': 'Obter Comentário',
'scenary.createComentario': 'Criar Comentário',
'scenary.updateComentario': 'Atualizar Comentário',
'scenary.back': 'Voltar',
'page.new': 'Novo comentário',
'page.refresh': 'Atualizar lista',
'page.selectChamado': 'Selecione o chamado',
'page.selectAtendente': 'Selecione o atendente',
'page.openCreate': 'Continuar para cadastro',
'page.openDetail': 'Ver detalhes',
'page.edit': 'Corrigir comentário',
'page.delete': 'Excluir comentário',
'page.cancel': 'Cancelar',
'page.save': 'Salvar',
'page.loading': 'Carregando…',
'page.selected': 'Selecionado',
'page.noSelection': 'Selecione um comentário para continuar',
'page.deleteConfirm': 'Confirme a exclusão do comentário selecionado.',
'page.requiredSelection': 'Selecione o chamado e o atendente antes de continuar.',
'page.status.open': 'Aberto',
'page.status.closed': 'Fechado',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page11--comentario-catalogue-102039')
export class ControleChamadosDesktopPage11ComentarioCataloguePage extends ControleChamadosComentarioCatalogueBase {
#msgLang: string | null = null;
#msgCache: PageMessageType = pageFallback;
protected get msg(): PageMessageType {
const lang = (document.documentElement.lang || '').toLowerCase();
if (lang !== this.#msgLang) {
this.#msgLang = lang;
this.#msgCache = pageMessages[this.getMessageKey(pageMessages)] || pageFallback;
}
return this.#msgCache;
}
render() {
const msg = this.msg;
return html`
<molecules--ml-scenary-102020 mode="scenary" .value=${this.uiScenary}
@change=${this.handleUiScenaryChange} backLabel=${msg['scenary.back']}>
<Scene value="base" title=${msg['scenary.base']}>${this.renderScenaryBase()}</Scene>
<Scene value="detail" title=${msg['scenary.detail']} nav="back">${this.renderScenaryDetail()}</Scene>
<Scene value="createComentario" title=${msg['scenary.createComentario']}>${this.renderScenaryCreateComentario()}</Scene>
<Scene value="updateComentario" title=${msg['scenary.updateComentario']}>${this.renderScenaryUpdateComentario()}</Scene>
</molecules--ml-scenary-102020>`;
}
renderScenaryBase() {
const msg = this.msg;
const comments = this.qryListComentarioData;
const chamados = this.qryChamadoPickerData;
const atendentes = this.qryAtendentePickerData;
const statusLabel: Record<string, string> = { open: msg['page.status.open'], closed: msg['page.status.closed'] };
return html`
<div class="min-h-full bg-[var(--page-bg,#ffffff)] text-[var(--text-default,#0f172a)]">
<div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
<header class="flex items-center justify-between gap-4"><h1 class="text-2xl font-bold">${msg['section.comentarioWorkbench.title']}</h1>
<div class="flex gap-2"><button class="rounded px-3 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]" @click=${() => { if (this.cmdCreateComentarioChamadoId && this.cmdCreateComentarioAtendenteId) this.setUiScenary('createComentario'); }}>${msg['page.new']}</button>
<button class="rounded px-3 py-2 bg-[var(--button-secondary-bg,#ffffff)] text-[var(--button-secondary-text,#0f172a)] border border-[var(--button-secondary-border,#cbd5e1)]" @click=${this.handleQryListComentarioClick}>${msg['page.refresh']}</button></div></header>
${this.cmdCreateComentarioState === 'success' ? html`<p class="rounded p-3 bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]">${msg['action.cmdCreateComentario.success']}</p>` : nothing}
${this.cmdUpdateComentarioState === 'success' ? html`<p class="rounded p-3 bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]">${msg['action.cmdUpdateComentario.success']}</p>` : nothing}
${this.cmdDeleteComentarioState === 'success' ? html`<p class="rounded p-3 bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]">${msg['action.cmdDeleteComentario.success']}</p>` : nothing}
<section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-3"><h2 class="text-lg font-semibold">${msg['section.recordList.title']}</h2>
${this.qryListComentarioState === 'loading' ? html`<p>${msg['page.loading']}</p>` : comments.length === 0 ? html`<p class="text-[var(--text-muted,#64748b)]">${msg['intent.qryListComentario.list.empty']}</p>` : html`<div class="overflow-x-auto"><table class="w-full text-left"><thead><tr><th>${msg['intent.qryListComentario.list.column.chamadoId.label']}</th><th>${msg['intent.qryListComentario.list.column.atendenteId.label']}</th><th>${msg['intent.qryListComentario.list.column.conteudo.label']}</th></tr></thead><tbody>${comments.map((item: QryListComentarioOutput) => html`<tr class="border-t border-[var(--border-subtle,#e2e8f0)] cursor-pointer ${item.comentarioId === this.qryGetComentarioComentarioId || item.comentarioId === this.cmdUpdateComentarioComentarioId || item.comentarioId === this.cmdDeleteComentarioComentarioId ? 'bg-[var(--selected-bg,#eff6ff)]' : ''}" @click=${() => { const id = String(item.comentarioId); this.setQryGetComentarioComentarioId(id); this.setCmdUpdateComentarioComentarioId(id); this.setCmdDeleteComentarioComentarioId(id); void this.loadQryGetComentario(); }}><td>${String(item.chamadoId)}</td><td>${String(item.atendenteId)}</td><td>${item.conteudo}</td></tr>`)}</tbody></table></div>`}</section>
<section class="grid md:grid-cols-2 gap-4"><div class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-3"><h2>${msg['organism.qryChamadoPicker.title']}</h2>${chamados.length === 0 ? html`<p>${msg['intent.qryChamadoPicker.list.empty']}</p>` : html`<div class="space-y-2">${chamados.map((item: QryChamadoPickerOutput) => html`<button class="block w-full rounded border border-[var(--border-subtle,#e2e8f0)] p-2 text-left" @click=${() => { this.setCmdCreateComentarioChamadoId(String(item.chamadoId)); this.setCmdUpdateComentarioChamadoId(String(item.chamadoId)); }}><strong>${item.titulo}</strong><span class="block text-sm text-[var(--text-muted,#64748b)]">${item.descricao} · ${statusLabel[String(item.status)] ?? String(item.status)}</span></button>`)}</div>`}</div>
<div class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-3"><h2>${msg['organism.qryAtendentePicker.title']}</h2>${atendentes.length === 0 ? html`<p>${msg['intent.qryAtendentePicker.list.empty']}</p>` : html`<div class="space-y-2">${atendentes.map((item: QryAtendentePickerOutput) => html`<button class="block w-full rounded border border-[var(--border-subtle,#e2e8f0)] p-2 text-left" @click=${() => { this.setCmdCreateComentarioAtendenteId(String(item.atendenteId)); this.setCmdUpdateComentarioAtendenteId(String(item.atendenteId)); }}>${String(item.atendenteId)} · ${String(item.platformUserId)}</button>`)}</div>`}</div></section>
<p class="text-sm text-[var(--text-muted,#64748b)]">${this.cmdCreateComentarioChamadoId && this.cmdCreateComentarioAtendenteId ? msg['page.selected'] : msg['page.requiredSelection']}</p>
</div></div>`;
}
renderScenaryDetail() {
const msg = this.msg;
const item: QryGetComentarioOutput | null = this.qryGetComentarioData;
return html`<div class="max-w-3xl mx-auto p-6"><section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-3">${this.qryGetComentarioState === 'loading' ? html`<p>${msg['page.loading']}</p>` : item === null ? html`<p>${msg['intent.qryGetComentario.list.empty']}</p>` : html`<dl class="space-y-2"><div><dt class="font-semibold">${msg['intent.qryGetComentario.list.column.comentarioId.label']}</dt><dd>${String(item.comentarioId)}</dd></div><div><dt class="font-semibold">${msg['intent.qryGetComentario.list.column.chamadoId.label']}</dt><dd>${String(item.chamadoId)}</dd></div><div><dt class="font-semibold">${msg['intent.qryGetComentario.list.column.atendenteId.label']}</dt><dd>${String(item.atendenteId)}</dd></div><div><dt class="font-semibold">${msg['intent.qryGetComentario.list.column.conteudo.label']}</dt><dd>${item.conteudo}</dd></div></dl><div class="flex gap-2"><button class="rounded px-3 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]" @click=${() => this.setUiScenary('updateComentario')}>${msg['page.edit']}</button><button class="rounded px-3 py-2 bg-[var(--button-danger-bg,#dc2626)] text-[var(--button-danger-text,#ffffff)]" ?disabled=${!this.cmdDeleteComentarioComentarioId} title=${!this.cmdDeleteComentarioComentarioId ? msg['page.requiredSelection'] : nothing} @click=${this.handleCmdDeleteComentarioClick}>${msg['page.delete']}</button></div>${this.cmdDeleteComentarioState === 'error' ? html`<p class="bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] p-3">${this.cmdDeleteComentarioError || msg['action.cmdDeleteComentario.error']}</p>` : nothing}`}</section></div>`;
}
renderScenaryCreateComentario() {
const msg = this.msg;
return html`<div class="max-w-3xl mx-auto p-6"><section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4"><h2>${msg['section.comentarioCreation.title']}</h2><p class="text-sm">${msg['page.selected']}: ${this.cmdCreateComentarioChamadoId} · ${this.cmdCreateComentarioAtendenteId}</p><label class="block"><span class="block font-semibold">${msg['intent.cmdCreateComentario.form.field.conteudo.label']}</span><textarea class="w-full rounded border p-2" .value=${this.cmdCreateComentarioConteudo} @input=${this.handleCmdCreateComentarioConteudoChange}></textarea></label><div class="flex gap-2"><button class="rounded px-3 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]" ?disabled=${this.cmdCreateComentarioState === 'loading' || !this.cmdCreateComentarioChamadoId || !this.cmdCreateComentarioAtendenteId} title=${!this.cmdCreateComentarioChamadoId || !this.cmdCreateComentarioAtendenteId ? msg['page.requiredSelection'] : nothing} @click=${this.handleCmdCreateComentarioClick}>${this.cmdCreateComentarioState === 'loading' ? msg['page.loading'] : msg['page.save']}</button><button class="rounded px-3 py-2 border border-[var(--button-secondary-border,#cbd5e1)]" @click=${() => this.setUiScenary('base')}>${msg['page.cancel']}</button></div>${this.cmdCreateComentarioState === 'error' ? html`<p class="bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] p-3">${this.cmdCreateComentarioError || msg['action.cmdCreateComentario.error']}</p>` : nothing}</section></div>`;
}
renderScenaryUpdateComentario() {
const msg = this.msg;
return html`<div class="max-w-3xl mx-auto p-6"><section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4"><h2>${msg['intent.cmdUpdateComentario.form.title']}</h2><p class="text-sm">${msg['intent.qryGetComentario.list.column.comentarioId.label']}: ${this.cmdUpdateComentarioComentarioId}</p><label class="block"><span class="block font-semibold">${msg['intent.cmdUpdateComentario.form.field.conteudo.label']}</span><textarea class="w-full rounded border p-2" .value=${this.cmdUpdateComentarioConteudo} @input=${this.handleCmdUpdateComentarioConteudoChange}></textarea></label><div class="flex gap-2"><button class="rounded px-3 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]" ?disabled=${this.cmdUpdateComentarioState === 'loading' || !this.cmdUpdateComentarioComentarioId || !this.cmdUpdateComentarioChamadoId || !this.cmdUpdateComentarioAtendenteId} title=${!this.cmdUpdateComentarioComentarioId || !this.cmdUpdateComentarioChamadoId || !this.cmdUpdateComentarioAtendenteId ? msg['page.requiredSelection'] : nothing} @click=${this.handleCmdUpdateComentarioClick}>${this.cmdUpdateComentarioState === 'loading' ? msg['page.loading'] : msg['page.save']}</button><button class="rounded px-3 py-2 border border-[var(--button-secondary-border,#cbd5e1)]" @click=${() => this.setUiScenary('detail')}>${msg['page.cancel']}</button></div>${this.cmdUpdateComentarioState === 'error' ? html`<p class="bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] p-3">${this.cmdUpdateComentarioError || msg['action.cmdUpdateComentario.error']}</p>` : nothing}</section></div>`;
}
}
