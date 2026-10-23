/// <mls fileReference="_102039_/l2/onboarding/web/desktop/page11/privacy_text.ts" enhancement="_102020_/l2/enhancementAura"/>
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { OnboardingPrivacy_textShared } from '/_102039_/l2/onboarding/web/shared/privacy_text.js';
import '/_102040_/l2/molecules/groupentertext/ml-multiline-text.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-alert-modal.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-contextual-feedback.js';
import '/_102040_/l2/molecules/groupnotifyuser/ml-notify-banner.js';
import '/_102040_/l2/molecules/grouptriggeraction/ml-button-group.js';
import '/_102040_/l2/molecules/groupviewcard/ml-vertical-card.js';
import '/_102040_/l2/molecules/groupviewtable/ml-data-table.js';
import '/_102020_/l2/molecules/ml-scenary.js';
/// **collab_i18n_start**
const pageMessage_en = {
pageTitle: 'Privacy text',
libraryTitle: 'Privacy text',
composeTitle: 'Write a new version',
confirmPublishTitle: 'Review publication',
back: 'Back',
currentText: 'Current privacy text',
currentTextDescription: 'This is the text people accept for access today.',
versionCode: 'Version code',
publishedAt: 'Published at',
provisionalText: 'This is the initial provisional text. Replace it with your company privacy text when ready.',
noCurrentText: 'No privacy text has been published yet.',
versionHistory: 'Version history',
status: 'Status',
changeNote: 'Change note',
currentVersion: 'Current version',
yes: 'Yes',
no: 'No',
draft: 'Draft',
published: 'Published',
noDate: 'Not published',
noChangeNote: 'No change note',
noVersions: 'No privacy text versions yet.',
loadingVersions: 'Loading privacy text versions…',
loadErrorTitle: 'Privacy text could not be loaded',
loadError: 'Try loading the privacy text again.',
reload: 'Reload',
writeNewVersion: 'Write a new version',
draftHeading: 'New privacy text',
draftDescription: 'Published versions stay unchanged. Write the replacement as a new draft.',
privacyTextLabel: 'Privacy text',
privacyTextPlaceholder: 'Write the full privacy text that people will read and accept.',
privacyTextHelper: 'This text is required to create a new version.',
changeNoteLabel: 'Change note',
changeNotePlaceholder: 'Briefly explain what changed from the previous version.',
changeNoteHelper: 'Optional. This note appears in version history.',
createDraft: 'Create draft',
creatingDraft: 'Creating draft…',
draftCreatedTitle: 'Draft created',
draftCreated: 'The new privacy text is ready to review and publish.',
createErrorTitle: 'Draft could not be created',
createError: 'Check the privacy text and try again.',
pendingDraftHeading: 'Pending draft',
pendingDraftDescription: 'A draft is waiting to be published. Create no additional version until it is resolved.',
reviewAndPublish: 'Review and publish',
reviewHeading: 'Publish this privacy text?',
publishWarning: 'It will become the current text. People who accepted an earlier version will need to accept this version again before their access is complete.',
publishVersion: 'Publish version',
publishingVersion: 'Publishing version…',
publishErrorTitle: 'Version could not be published',
publishError: 'Try publishing the pending draft again.',
publishedTitle: 'Version published',
publishedMessage: 'This version is now the privacy text people must accept.',
noDraftToPublish: 'There is no pending draft to publish.',
details: 'Details',
privacyTextName: 'privacy-text',
changeNoteName: 'change-note'
};
type PageMessageType = typeof pageMessage_en;
const pageMessages: Record<string, PageMessageType> = { 'en': pageMessage_en };
/// **collab_i18n_end**
function formatDate(value: string | undefined, fallback: string) {
if (!value) return fallback;
return new Intl.DateTimeFormat(document.documentElement.lang || undefined, {
dateStyle: 'medium',
timeStyle: 'short'
}).format(new Date(value));
}
@customElement('onboarding--web--desktop--page11--privacy_text-102039')
export class OnboardingDesktopPage11Privacy_textPage extends OnboardingPrivacy_textShared {
private msg: PageMessageType = pageMessage_en;
render() {
this.msg = pageMessages[this.getMessageKey(pageMessages)];
const draftDetails = this.createPrivacyVersionDraft.details;
const createBusy = this.createPrivacyVersionStatus === 'loading';
const publishBusy = this.publishPrivacyVersionStatus === 'loading';
const loadBusy = this.getPrivacyTextPageStatus === 'loading';
const createError = this.createPrivacyVersionError?.message ?? '';
const publishError = this.publishPrivacyVersionError?.message ?? '';
return html`
<main class="min-h-full bg-[var(--page-bg,transparent)] px-8 py-7 text-[var(--text-default,currentColor)]">
<molecules--ml-scenary-102020 mode="scenary" .value=${this.scenary || 'library'} backLabel=${this.msg.back}
@change=${(e: Event) => { if (e.target === e.currentTarget) this.setScenario((e.target as HTMLElement & { value: string }).value); }}>
<Scene value="library" title=${this.msg.libraryTitle}>
<div class="mx-auto max-w-7xl space-y-7">
${this.getPrivacyTextPageStatus === 'error' ? html`
<groupnotifyuser--ml-notify-banner type="error" .visible=${true} .dismissible=${false}>
<Title>${this.msg.loadErrorTitle}</Title>
<Message>${this.getPrivacyTextPageError?.message ?? this.msg.loadError}</Message>
<Action>
<grouptriggeraction--ml-button-group size="sm" type="button" data-variant="secondary" @action=${() => this.getPrivacyTextPage()}>
<Label>${this.msg.reload}</Label>
</grouptriggeraction--ml-button-group>
</Action>
</groupnotifyuser--ml-notify-banner>
` : ''}
<section data-organism-id="currentPrivacyText" aria-busy=${loadBusy ? 'true' : 'false'}>
<groupviewcard--ml-vertical-card .loading=${loadBusy}>
<CardHeader>
<CardTitle>${this.msg.currentText}</CardTitle>
<CardDescription>${this.msg.currentTextDescription}</CardDescription>
</CardHeader>
<CardContent>
${this.current ? html`
<div class="space-y-5">
<dl class="grid grid-cols-2 gap-x-8 gap-y-3 border-y border-[var(--border-subtle,currentColor)] py-4 text-sm">
<div>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg.versionCode}</dt>
<dd class="mt-1 font-semibold text-[var(--text-strong,currentColor)]">${this.current.versionCode}</dd>
</div>
<div>
<dt class="text-[var(--text-muted,currentColor)]">${this.msg.publishedAt}</dt>
<dd class="mt-1 font-semibold text-[var(--text-strong,currentColor)]">${formatDate(this.current.publishedAt, this.msg.noDate)}</dd>
</div>
</dl>
${this.current.details.isProvisional ? html`
<p class="rounded-md border border-[var(--status-warning-text,currentColor)] bg-[var(--status-warning-bg,transparent)] px-4 py-3 text-sm text-[var(--status-warning-text,currentColor)]">
${this.msg.provisionalText}
</p>
` : ''}
<p class="whitespace-pre-wrap leading-7 text-[var(--text-default,currentColor)]">${this.current.details.text}</p>
</div>
` : html`
<p class="py-5 text-sm text-[var(--text-muted,currentColor)]">${this.msg.noCurrentText}</p>
`}
</CardContent>
<CardFooter>
<div class="flex justify-end">
<grouptriggeraction--ml-button-group size="md" type="button" data-variant="primary" @action=${() => this.setScenario('compose')}>
<Label>${this.msg.writeNewVersion}</Label>
</grouptriggeraction--ml-button-group>
</div>
</CardFooter>
</groupviewcard--ml-vertical-card>
</section>
<section data-organism-id="privacyVersionList" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-5">
<groupviewtable--ml-data-table .value=${''} .selectable=${false} .page=${1} .pageSize=${0} .totalItems=${0} .loading=${loadBusy} .error=${''}>
<TableCaption>${this.msg.versionHistory}</TableCaption>
<TableHeader>
<TableRow>
<TableHead key="version" sortable>${this.msg.versionCode}</TableHead>
<TableHead key="status" sortable>${this.msg.status}</TableHead>
<TableHead key="publishedAt" sortable>${this.msg.publishedAt}</TableHead>
<TableHead key="changeNote">${this.msg.changeNote}</TableHead>
<TableHead key="current">${this.msg.currentVersion}</TableHead>
</TableRow>
</TableHeader>
<TableBody>
${this.versions.map((version) => html`
<TableRow key=${version.id}>
<TableCell>${version.versionCode}</TableCell>
<TableCell>
<span class="inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${version.status === 'published' ? 'bg-[var(--status-success-bg,transparent)] text-[var(--status-success-text,currentColor)]' : 'bg-[var(--status-neutral-bg,transparent)] text-[var(--status-neutral-text,currentColor)]'}">${version.status === 'published' ? this.msg.published : this.msg.draft}</span>
</TableCell>
<TableCell sort-value=${version.publishedAt ?? ''}>${formatDate(version.publishedAt, this.msg.noDate)}</TableCell>
<TableCell>${version.details.changeNote || this.msg.noChangeNote}</TableCell>
<TableCell>${version.details.isCurrent ? this.msg.yes : this.msg.no}</TableCell>
</TableRow>
`)}
</TableBody>
<Empty>${this.msg.noVersions}</Empty>
<Loading>${this.msg.loadingVersions}</Loading>
</groupviewtable--ml-data-table>
</section>
</div>
</Scene>
<Scene value="compose" title=${this.msg.composeTitle} nav="back" backTo="library">
<div class="mx-auto grid max-w-5xl grid-cols-[minmax(0,1fr)_18rem] gap-8">
<section data-organism-id="newVersionForm" class="rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-bg,transparent)] p-6">
${this.draft ? html`
<div class="space-y-3">
<h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.pendingDraftHeading}</h2>
<p class="text-sm leading-6 text-[var(--text-muted,currentColor)]">${this.msg.pendingDraftDescription}</p>
<p class="whitespace-pre-wrap border-t border-[var(--border-subtle,currentColor)] pt-4 text-sm leading-6">${this.draft.details.text}</p>
</div>
` : html`
<div class="space-y-6">
<div>
<h2 class="text-lg font-semibold text-[var(--text-strong,currentColor)]">${this.msg.draftHeading}</h2>
<p class="mt-1 text-sm text-[var(--text-muted,currentColor)]">${this.msg.draftDescription}</p>
</div>
<groupentertext--ml-multiline-text
.value=${draftDetails.text ?? ''}
.name=${this.msg.privacyTextName}
.placeholder=${this.msg.privacyTextPlaceholder}
.rows=${14}
.required=${true}
.loading=${createBusy}
.error=${createError}
@input=${(e: CustomEvent<{ value: string }>) => this.setCreatePrivacyVersionDraft({ details: { ...draftDetails, text: e.detail.value || null } })}
>
<Label>${this.msg.privacyTextLabel}</Label>
<Helper>${this.msg.privacyTextHelper}</Helper>
</groupentertext--ml-multiline-text>
<groupentertext--ml-multiline-text
.value=${draftDetails.changeNote ?? ''}
.name=${this.msg.changeNoteName}
.placeholder=${this.msg.changeNotePlaceholder}
.rows=${3}
.loading=${createBusy}
@input=${(e: CustomEvent<{ value: string }>) => this.setCreatePrivacyVersionDraft({ details: { ...draftDetails, changeNote: e.detail.value || null } })}
>
<Label>${this.msg.changeNoteLabel}</Label>
<Helper>${this.msg.changeNoteHelper}</Helper>
</groupentertext--ml-multiline-text>
</div>
`}
</section>
<aside data-organism-id="versionActions" class="h-fit rounded-lg border border-[var(--border-default,currentColor)] bg-[var(--surface-alt-bg,transparent)] p-5">
${this.createPrivacyVersionStatus === 'success' ? html`
<groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}>
<Title>${this.msg.draftCreatedTitle}</Title>
<Message>${this.msg.draftCreated}</Message>
</groupnotifyuser--ml-contextual-feedback>
` : ''}
${this.createPrivacyVersionStatus === 'error' ? html`
<groupnotifyuser--ml-contextual-feedback type="error" .visible=${true} .dismissible=${false}>
<Title>${this.msg.createErrorTitle}</Title>
<Message>${createError || this.msg.createError}</Message>
</groupnotifyuser--ml-contextual-feedback>
` : ''}
<div class="mt-4">
${this.draft ? html`
<grouptriggeraction--ml-button-group size="md" type="button" data-variant="primary" @action=${() => this.setScenario('confirm-publish')}>
<Label>${this.msg.reviewAndPublish}</Label>
</grouptriggeraction--ml-button-group>
` : html`
<grouptriggeraction--ml-button-group size="md" type="button" data-variant="primary" .disabled=${createBusy} .loading=${createBusy} @action=${() => this.createPrivacyVersion()}>
<Label>${createBusy ? this.msg.creatingDraft : this.msg.createDraft}</Label>
</grouptriggeraction--ml-button-group>
`}
</div>
</aside>
</div>
</Scene>
<Scene value="confirm-publish" title=${this.msg.confirmPublishTitle} nav="back" backTo="compose">
<section data-organism-id="versionActions" class="mx-auto max-w-xl">
${this.publishPrivacyVersionStatus === 'success' ? html`
<groupnotifyuser--ml-contextual-feedback type="success" .visible=${true} .dismissible=${false}>
<Title>${this.msg.publishedTitle}</Title>
<Message>${this.msg.publishedMessage}</Message>
</groupnotifyuser--ml-contextual-feedback>
` : this.draft ? html`
<groupnotifyuser--ml-alert-modal type="warning" .visible=${true} .dismissible=${true} @dismiss=${() => this.setScenario('compose')}>
<Title>${this.msg.reviewHeading}</Title>
<Message>${publishError || this.msg.publishWarning}</Message>
<Action>
<grouptriggeraction--ml-button-group size="md" type="button" data-variant="primary" .loading=${publishBusy} .disabled=${publishBusy} @action=${() => this.publishPrivacyVersion()}>
<Label>${publishBusy ? this.msg.publishingVersion : this.msg.publishVersion}</Label>
</grouptriggeraction--ml-button-group>
</Action>
</groupnotifyuser--ml-alert-modal>
` : html`
<p class="rounded-md border border-[var(--border-subtle,currentColor)] bg-[var(--surface-bg,transparent)] p-5 text-sm text-[var(--text-muted,currentColor)]">${this.msg.noDraftToPublish}</p>
`}
</section>
</Scene>
</molecules--ml-scenary-102020>
</main>
`;
}
}
