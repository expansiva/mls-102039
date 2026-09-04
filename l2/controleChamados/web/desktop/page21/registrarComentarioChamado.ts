/// <mls fileReference="_102039_/l2/controleChamados/web/desktop/page21/registrarComentarioChamado.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ControleChamadosRegistrarComentarioChamadoBase } from '/_102039_/l2/controleChamados/web/shared/registrarComentarioChamado.js';
import '/_102020_/l2/molecules/ml-scenary.js';
import type {
QryLocateChamadoOutput,
QryAtendentePickerOutput,
} from '/_102039_/l2/controleChamados/web/shared/registrarComentarioChamado.js';
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
'wizard.continue': 'Continuar',
'wizard.back': 'Voltar',
'wizard.selectedCall': 'Chamado escolhido',
'wizard.chooseAttendant': 'Escolha o atendente',
'wizard.chooseCall': 'Selecione o chamado para continuar',
'wizard.chooseAttendantHint': 'Selecione quem está registrando o comentário',
'wizard.running': 'Registrando...',
'wizard.required': 'Preencha o comentário para continuar',
'wizard.emptyComment': 'Escreva um comentário antes de registrar',
'wizard.summary': 'Confira os dados antes de concluir',
'wizard.call': 'Chamado',
'wizard.attendant': 'Atendente',
'wizard.comment': 'Comentário',
'wizard.change': 'Alterar',
};
type PageMessageType = typeof pageMessage_pt_br;
const pageMessages: { [key: string]: PageMessageType } = { 'pt-br': pageMessage_pt_br };
/// **collab_i18n_end**
const pageFallback = pageMessages[Object.keys(pageMessages)[0]];
@customElement('controle-chamados--web--desktop--page21--registrar-comentario-chamado-102039')
export class ControleChamadosDesktopPage21RegistrarComentarioChamadoPage extends ControleChamadosRegistrarComentarioChamadoBase {
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
const calls: QryLocateChamadoOutput[] = this.qryLocateChamadoData;
const selected: QryLocateChamadoOutput | undefined = calls.find(
(item: QryLocateChamadoOutput): boolean => item.chamadoId === this.cmdRegisterComentarioChamadoId,
);
const canContinue: boolean = Boolean(this.cmdRegisterComentarioChamadoId && this.cmdRegisterComentarioAtendenteId);
return html`
<section class="mx-auto grid max-w-6xl gap-6 p-6 lg:grid-cols-[1.4fr_1fr]">
<div class="space-y-4">
<div class="flex items-center gap-3" aria-label=${msg['scenary.base']}>
<span class="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]">1</span>
<div class="h-px flex-1 bg-[var(--border-subtle,#e2e8f0)]"></div>
<span class="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-alt-bg,#f8fafc)] text-[var(--text-muted,#64748b)]">2</span>
</div>
<div class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-5 shadow-[var(--shadow-small,0_1px_3px_rgba(0,0,0,0.1))]">
<h2 class="mb-4 text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['organism.qryLocateChamado.title']}</h2>
${this.qryLocateChamadoState === 'loading'
? html`<div class="animate-pulse text-[var(--text-muted,#64748b)]">${msg['intent.qryLocateChamado.list.title']}</div>`
: calls.length === 0
? html`<p class="text-[var(--text-muted,#64748b)]">${msg['intent.qryLocateChamado.list.empty']}</p>`
: html`<div class="space-y-2">
${calls.map((item: QryLocateChamadoOutput) => html`
<button type="button" class="block w-full rounded-lg border p-4 text-left ${item.chamadoId === this.cmdRegisterComentarioChamadoId ? 'border-[var(--selected-border,#2563eb)] bg-[var(--selected-bg,#eff6ff)]' : 'border-[var(--border-subtle,#e2e8f0)]'}" @click=${(): void => this.setCmdRegisterComentarioChamadoId(item.chamadoId)}>
<div class="font-semibold text-[var(--text-strong,#0f172a)]">${item.titulo}</div>
<div class="mt-1 text-sm text-[var(--text-muted,#64748b)]">${item.descricao}</div>
</button>`)}
</div>`}
</div>
</div>
<div class="space-y-4">
<div class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-5">
<h2 class="mb-2 text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['wizard.chooseAttendant']}</h2>
<p class="text-sm text-[var(--text-muted,#64748b)]">${msg['wizard.chooseAttendantHint']}</p>
<select class="mt-3 w-full rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3 text-[var(--text-default,#0f172a)]" .value=${this.cmdRegisterComentarioAtendenteId} @change=${this.handleCmdRegisterComentarioAtendenteIdChange} aria-label=${msg['wizard.chooseAttendant']}>
<option value="">${msg['wizard.chooseAttendantHint']}</option>
${this.qryAtendentePickerState === 'loading'
? nothing
: this.qryAtendentePickerData.length === 0
? nothing
: this.qryAtendentePickerData.map((item: QryAtendentePickerOutput) => html`<option value=${item.atendenteId}>${item.platformUserId}</option>`)}
</select>
</div>
${selected ? html`<div class="rounded-lg bg-[var(--surface-alt-bg,#f8fafc)] p-4 text-sm text-[var(--text-default,#0f172a)]"><span class="font-semibold">${msg['wizard.selectedCall']}:</span> ${selected.titulo}</div>` : nothing}
<button type="button" class="w-full rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-3 font-semibold text-[var(--button-primary-text,#ffffff)] disabled:opacity-50" ?disabled=${!canContinue} title=${!this.cmdRegisterComentarioChamadoId ? msg['wizard.chooseCall'] : !this.cmdRegisterComentarioAtendenteId ? msg['wizard.chooseAttendantHint'] : ''} @click=${(): void => this.setUiScenary('registerComentario')}>${msg['wizard.continue']}</button>
${this.cmdRegisterComentarioState === 'success' ? html`<div class="rounded-md bg-[var(--status-success-bg,#dcfce7)] p-3 text-[var(--status-success-text,#166534)]" role="status">${msg['action.cmdRegisterComentario.success']}</div>` : nothing}
</div>
</section>
`;
}
renderScenaryRegisterComentario() {
const msg = this.msg;
const selected: QryLocateChamadoOutput | undefined = this.qryLocateChamadoData.find(
(item: QryLocateChamadoOutput): boolean => item.chamadoId === this.cmdRegisterComentarioChamadoId,
);
const disabled: boolean = !this.cmdRegisterComentarioChamadoId || !this.cmdRegisterComentarioAtendenteId || !this.cmdRegisterComentarioConteudo.trim() || this.cmdRegisterComentarioState === 'loading';
return html`
<section class="mx-auto max-w-2xl space-y-5 p-6">
<div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]">1</span><div class="h-px flex-1 bg-[var(--border-default,#e2e8f0)]"></div><span class="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)]">2</span></div>
<div class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-6 shadow-[var(--shadow-small,0_1px_3px_rgba(0,0,0,0.1))]">
<h2 class="mb-5 text-lg font-semibold text-[var(--text-strong,#0f172a)]">${msg['wizard.summary']}</h2>
<div class="mb-5 space-y-2 rounded-md bg-[var(--surface-alt-bg,#f8fafc)] p-4 text-sm text-[var(--text-default,#0f172a)]">
<div><span class="font-semibold">${msg['wizard.call']}:</span> ${selected?.titulo ?? this.cmdRegisterComentarioChamadoId}</div>
</div>
<label class="block text-sm font-semibold text-[var(--text-strong,#0f172a)]" for="comentario">${msg['intent.cmdRegisterComentario.form.field.conteudo.label']} <span aria-hidden="true">*</span></label>
<textarea id="comentario" class="mt-2 min-h-32 w-full rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] p-3 text-[var(--text-default,#0f172a)]" .value=${this.cmdRegisterComentarioConteudo} @input=${this.handleCmdRegisterComentarioConteudoChange} aria-required="true"></textarea>
${!this.cmdRegisterComentarioConteudo.trim() && this.cmdRegisterComentarioState !== 'idle' ? html`<p class="mt-1 text-sm text-[var(--status-error-text,#b91c1c)]">${msg['wizard.emptyComment']}</p>` : nothing}
${this.cmdRegisterComentarioError || this.cmdRegisterComentarioState === 'error' ? html`<div class="mt-4 rounded-md bg-[var(--status-error-bg,#fee2e2)] p-3 text-[var(--status-error-text,#b91c1c)]" role="alert">${this.cmdRegisterComentarioError || msg['action.cmdRegisterComentario.error']}</div>` : nothing}
<div class="mt-6 flex justify-between gap-3">
<button type="button" class="rounded-md border border-[var(--button-secondary-border,#cbd5e1)] bg-[var(--button-secondary-bg,#ffffff)] px-4 py-3 text-[var(--button-secondary-text,#334155)]" @click=${(): void => this.setUiScenary('base')}>${msg['wizard.back']}</button>
<button type="button" class="rounded-md bg-[var(--button-primary-bg,#2563eb)] px-4 py-3 font-semibold text-[var(--button-primary-text,#ffffff)] disabled:opacity-50" ?disabled=${disabled} title=${!this.cmdRegisterComentarioChamadoId ? msg['wizard.chooseCall'] : !this.cmdRegisterComentarioAtendenteId ? msg['wizard.chooseAttendantHint'] : !this.cmdRegisterComentarioConteudo.trim() ? msg['wizard.required'] : ''} @click=${this.handleCmdRegisterComentarioClick}>${this.cmdRegisterComentarioState === 'loading' ? msg['wizard.running'] : msg['intent.cmdRegisterComentario.form.action.cmdRegisterComentario']}</button>
</div>
</div>
</section>
`;
}
}
