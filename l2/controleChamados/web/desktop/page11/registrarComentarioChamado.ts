/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page11/registrarComentarioChamado.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosRegistrarComentarioChamadoBase } from '/_102039_/l2/controleChamados/web/shared/registrarComentarioChamado.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
// The catalogue of this page. The keys below come from the module plan — do NOT edit their
// text and do NOT inline a string in the template: reference a key, or add your own SHORT
// key here (in EVERY locale) — 'orders.empty': 'No orders yet',
const pageMessage_pt_br = {
'section.locateChamado.title': 'Chamado selecionado',
'organism.qryLocateChamado.title': 'Localizar o chamado aberto',
'intent.qryLocateChamado.list.title': 'Localizar o chamado aberto',
'intent.qryLocateChamado.list.empty': 'Nenhum registro encontrado',
'intent.qryLocateChamado.list.column.chamadoId.label': 'Chamado',
'intent.qryLocateChamado.list.column.titulo.label': 'Título',
'intent.qryLocateChamado.list.column.descricao.label': 'Descrição',
'intent.qryLocateChamado.list.column.status.label': 'Status',
'section.registerComentario.title': 'Registrar comentário',
'organism.cmdRegisterComentario.title': 'Registrar comentário',
'intent.cmdRegisterComentario.form.title': 'Registrar comentário',
'intent.cmdRegisterComentario.form.action.cmdRegisterComentario': 'Registrar comentário',
'intent.cmdRegisterComentario.form.field.conteudo.label': 'Comentário',
'organism.qryAtendentePicker.title': 'Listar Atendente',
'intent.qryAtendentePicker.list.title': 'Listar Atendente',
'intent.qryAtendentePicker.list.empty': 'Nenhum registro encontrado',
'intent.qryAtendentePicker.list.column.atendenteId.label': 'Atendente que registrou',
'intent.qryAtendentePicker.list.column.platformUserId.label': 'Usuário da plataforma',
'action.cmdRegisterComentario.success': 'Registrar comentário: OK',
'action.cmdRegisterComentario.error': 'Registrar comentário: falhou',
'scenary.base': 'Localizar o chamado aberto',
'scenary.registerComentario': 'Registrar comentário',
'page.title': 'Acompanhamento de chamado',
'field.atendente.choose': 'Selecione o atendente',
'field.chamado.context': 'Chamado em acompanhamento',
'action.refresh': 'Atualizar',
'action.continue': 'Continuar',
'action.cancel': 'Cancelar',
'action.loading': 'Processando…',
'action.requiredSelection': 'Selecione um chamado e um atendente para continuar',
'feedback.empty': 'Nenhum chamado aberto disponível',
'feedback.loading': 'Carregando chamados…',
'feedback.pickerLoading': 'Carregando atendentes…',
'feedback.commentRequired': 'Informe um comentário para registrar',
'status.pending': 'Pendente',
'status.open': 'Aberto',
'status.closed': 'Fechado',
// The copy you invent, with short keys. Only this part repeats per language.
'field.atendente.label': 'Atendente'
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page11--registrar-comentario-chamado-102039')
export class ControleChamadosDesktopPage11RegistrarComentarioChamadoPage extends ControleChamadosRegistrarComentarioChamadoBase {
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
<Scene value="registerComentario" title=${msg['scenary.registerComentario']}>
${this.renderScenaryRegisterComentario()}
</Scene>
</molecules--ml-scenary-102020>
`;
}
renderScenaryBase() {
const msg = this.msg;
const statusLabels: Record<string, string> = {
open: msg['status.open'],
closed: msg['status.closed'],
};
const selectedChamadoId = this.cmdRegisterComentarioChamadoId;
return html`
<div class="min-h-full bg-[var(--page-bg,#ffffff)] text-[var(--text-default,#0f172a)]">
  <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
    <header class="flex items-center justify-between gap-4">
      <h1 class="text-2xl font-bold text-[var(--text-strong,#0f172a)]">${msg['page.title']}</h1>
      <button type="button" class="rounded-md px-4 py-2 bg-[var(--button-secondary-bg,#ffffff)] text-[var(--button-secondary-text,#0f172a)] border border-[var(--button-secondary-border,#cbd5e1)]" @click=${this.handleQryLocateChamadoClick}>${msg['action.refresh']}</button>
    </header>

    ${this.cmdRegisterComentarioState === 'success' ? html`
      <div role="status" class="rounded-md p-4 bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]">${msg['action.cmdRegisterComentario.success']}</div>
    ` : nothing}

    <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] shadow-[var(--shadow-small,0_1px_2px_rgba(0,0,0,0.08))] p-5 space-y-4">
      <div class="flex items-center justify-between gap-4">
        <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['organism.qryLocateChamado.title']}</h2>
        ${this.qryLocateChamadoState === 'loading' ? html`<span class="text-sm text-[var(--text-muted,#64748b)]">${msg['feedback.loading']}</span>` : nothing}
      </div>
      ${this.qryLocateChamadoState === 'loading' ? html`<div class="h-16 animate-pulse rounded-md bg-[var(--surface-alt-bg,#f1f5f9)]"></div>` : this.qryLocateChamadoData.length === 0 ? html`<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['feedback.empty']}</p>` : html`
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead><tr class="border-b border-[var(--border-subtle,#e2e8f0)]">
              <th class="px-3 py-2 font-semibold">${msg['intent.qryLocateChamado.list.column.titulo.label']}</th>
              <th class="px-3 py-2 font-semibold">${msg['intent.qryLocateChamado.list.column.descricao.label']}</th>
              <th class="px-3 py-2 font-semibold">${msg['intent.qryLocateChamado.list.column.status.label']}</th>
            </tr></thead>
            <tbody>
              ${this.qryLocateChamadoData.map((item) => html`
                <tr class="cursor-pointer border-b border-[var(--border-subtle,#e2e8f0)] ${item.chamadoId === selectedChamadoId ? 'bg-[var(--selected-bg,#eef2ff)]' : ''}" aria-selected=${item.chamadoId === selectedChamadoId} @click=${() => { this.setCmdRegisterComentarioChamadoId(item.chamadoId); if (this.cmdRegisterComentarioAtendenteId) this.setUiScenary('registerComentario'); }}>
                  <td class="px-3 py-3 font-medium">${item.titulo}</td>
                  <td class="px-3 py-3">${item.descricao}</td>
                  <td class="px-3 py-3">${statusLabels[item.status] ?? item.status}</td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      `}
    </section>

    <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-5 space-y-4">
      <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['organism.qryAtendentePicker.title']}</h2>
      ${this.qryAtendentePickerState === 'loading' ? html`<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['feedback.pickerLoading']}</p>` : nothing}
      <label class="block space-y-2">
        <span class="text-sm font-medium">${msg['field.atendente.label']}</span>
        <select class="w-full rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-2" .value=${this.cmdRegisterComentarioAtendenteId} @change=${this.handleCmdRegisterComentarioAtendenteIdChange}>
          <option value="">${msg['field.atendente.choose']}</option>
          ${this.qryAtendentePickerData.map((item) => html`<option value=${item.atendenteId}>${item.platformUserId}</option>`)}
        </select>
      </label>
      <button type="button" class="rounded-md px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60" ?disabled=${!this.cmdRegisterComentarioAtendenteId || !this.cmdRegisterComentarioChamadoId} title=${!this.cmdRegisterComentarioAtendenteId || !this.cmdRegisterComentarioChamadoId ? msg['action.requiredSelection'] : ''} @click=${() => this.setUiScenary('registerComentario')}>${msg['action.continue']}</button>
    </section>
  </div>
</div>
`;
}
renderScenaryRegisterComentario() {
const msg = this.msg;
const commandLoading = this.cmdRegisterComentarioState === 'loading';
return html`
<div class="min-h-full bg-[var(--page-bg,#ffffff)] text-[var(--text-default,#0f172a)]">
  <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
    <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] shadow-[var(--shadow-small,0_1px_2px_rgba(0,0,0,0.08))] p-5 space-y-5">
      <h1 class="text-2xl font-bold text-[var(--text-strong,#0f172a)]">${msg['section.registerComentario.title']}</h1>
      <div class="rounded-md bg-[var(--surface-alt-bg,#f1f5f9)] p-3">
        <span class="text-sm text-[var(--text-muted,#64748b)]">${msg['field.chamado.context']}</span>
        <div class="font-medium">${this.cmdRegisterComentarioChamadoId}</div>
      </div>
      <label class="block space-y-2">
        <span class="text-sm font-medium">${msg['intent.cmdRegisterComentario.form.field.conteudo.label']}</span>
        <textarea class="min-h-32 w-full rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3" .value=${this.cmdRegisterComentarioConteudo} @input=${this.handleCmdRegisterComentarioConteudoChange}></textarea>
      </label>
      ${this.cmdRegisterComentarioState === 'error' ? html`<div role="alert" class="rounded-md p-3 bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)]">${this.cmdRegisterComentarioError || msg['action.cmdRegisterComentario.error']}</div>` : nothing}
      <div class="flex flex-wrap gap-3">
        <button type="button" class="rounded-md px-4 py-2 bg-[var(--button-secondary-bg,#ffffff)] text-[var(--button-secondary-text,#0f172a)] border border-[var(--button-secondary-border,#cbd5e1)]" ?disabled=${commandLoading} @click=${() => this.setUiScenary('base')}>${msg['action.cancel']}</button>
        <button type="button" class="rounded-md px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60" ?disabled=${commandLoading || !this.cmdRegisterComentarioChamadoId || !this.cmdRegisterComentarioAtendenteId || !this.cmdRegisterComentarioConteudo.trim()} @click=${this.handleCmdRegisterComentarioClick}>${commandLoading ? msg['action.loading'] : msg['intent.cmdRegisterComentario.form.action.cmdRegisterComentario']}</button>
      </div>
      ${!this.cmdRegisterComentarioConteudo.trim() ? html`<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['feedback.commentRequired']}</p>` : nothing}
    </section>
  </div>
</div>
`;
}
}
