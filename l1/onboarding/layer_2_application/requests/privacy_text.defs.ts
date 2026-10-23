/// <mls fileReference="_102039_/l1/onboarding/layer_2_application/requests/privacy_text.defs.ts" enhancement="_blank"/>

export const definition = {
  "schemaVersion": "2026-09-24-d1-definition-v2",
  "artifactType": "requestService",
  "artifactId": "privacy_text",
  "moduleName": "onboarding",
  "status": "pending",
  "dependencies": [
    "_102039_/l1/onboarding/layer_2_application/usecases/createPrivacyTextVersion.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/usecases/listPrivacyTextVersion.defs.ts",
    "_102039_/l1/onboarding/layer_2_application/usecases/publishPrivacyVersion.defs.ts"
  ],
  "data": {
    "pageId": "privacy_text",
    "requests": [
      {
        "route": "onboarding.privacy_text.getPrivacyTextPage",
        "kind": "qry",
        "uses": [
          "listPrivacyTextVersion"
        ],
        "transaction": "none",
        "output": [
          {
            "kind": "entity",
            "path": "current",
            "entity": "PrivacyTextVersion",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "versionCode",
                "path": "versionCode"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "publishedAt",
                "path": "publishedAt"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "entity",
            "path": "draft",
            "entity": "PrivacyTextVersion",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "versionCode",
                "path": "versionCode"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "publishedAt",
                "path": "publishedAt"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          },
          {
            "kind": "list",
            "path": "versions",
            "entity": "PrivacyTextVersion",
            "items": "",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "versionCode",
                "path": "versionCode"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "publishedAt",
                "path": "publishedAt"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "currentVersionIsLatestPublished",
          "initialProvisionalPrivacyText"
        ],
        "doc": {
          "raw": "Purpose: Loads everything the privacy text page shows when it opens: the current privacy text, the pending draft, if there is one, and the full version history.\nInput: No input. The organization comes from the session of the company owner.\nProcessing: Reads the organization’s privacy text versions, ordered by publication moment, newest first, with drafts at the top. isCurrent is computed, never stored: by currentVersionIsLatestPublished, the current version is the published version with the latest publishedAt. ’current’ is that version. ’draft’ is the most recent version still in draft status. Following initialProvisionalPrivacyText, the initial version 1 keeps isProvisional true so the owner sees it must be replaced. The version history is small, so it is not paged.\nOutput: current: the current published version with its text, version code, publication moment and provisional flag (absent only if nothing is published). draft: the latest draft version, or absent. versions: every version, drafts and published, with code, status, publication moment, change note and the isCurrent flag.",
          "purpose": "Loads everything the privacy text page shows when it opens: the current privacy text, the pending draft, if there is one, and the full version history.",
          "input": "No input. The organization comes from the session of the company owner.",
          "processing": "Reads the organization’s privacy text versions, ordered by publication moment, newest first, with drafts at the top. isCurrent is computed, never stored: by currentVersionIsLatestPublished, the current version is the published version with the latest publishedAt. ’current’ is that version. ’draft’ is the most recent version still in draft status. Following initialProvisionalPrivacyText, the initial version 1 keeps isProvisional true so the owner sees it must be replaced. The version history is small, so it is not paged.",
          "output": "current: the current published version with its text, version code, publication moment and provisional flag (absent only if nothing is published). draft: the latest draft version, or absent. versions: every version, drafts and published, with code, status, publication moment, change note and the isCurrent flag."
        }
      },
      {
        "route": "onboarding.privacy_text.createPrivacyVersion",
        "kind": "cmd",
        "uses": [
          "createPrivacyTextVersion"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "version",
            "entity": "PrivacyTextVersion",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "versionCode",
                "path": "versionCode"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "publishedAt",
                "path": "publishedAt"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "onlyOwnerMaintainsPrivacyText",
          "privacyVersionCodeFromSequence",
          "publishedVersionImmutable"
        ],
        "doc": {
          "raw": "Purpose: Creates a new privacy text version as a draft from the text the owner wrote.\nInput: details.text: the full new privacy details.text (required). details.changeNote: an optional short note on what changed from the previous version.\nProcessing: Refuses callers who are not the company owner (onlyOwnerMaintainsPrivacyText). Gives the new version the next version code from the platform number sequence (privacyVersionCodeFromSequence). Creates it with status draft and isProvisional false, without publishedAt. No published version is touched (publishedVersionImmutable): the change becomes a new version. isCurrent is computed, and it is false for a draft.\nOutput: version: the new draft version with its id, version, issued version code, status draft, text, change note and isCurrent false.",
          "purpose": "Creates a new privacy text version as a draft from the text the owner wrote.",
          "input": "details.text: the full new privacy details.text (required). details.changeNote: an optional short note on what changed from the previous version.",
          "processing": "Refuses callers who are not the company owner (onlyOwnerMaintainsPrivacyText). Gives the new version the next version code from the platform number sequence (privacyVersionCodeFromSequence). Creates it with status draft and isProvisional false, without publishedAt. No published version is touched (publishedVersionImmutable): the change becomes a new version. isCurrent is computed, and it is false for a draft.",
          "output": "version: the new draft version with its id, version, issued version code, status draft, text, change note and isCurrent false."
        }
      },
      {
        "route": "onboarding.privacy_text.publishPrivacyVersion",
        "kind": "cmd",
        "uses": [
          "publishPrivacyVersion"
        ],
        "transaction": "single",
        "output": [
          {
            "kind": "entity",
            "path": "version",
            "entity": "PrivacyTextVersion",
            "fields": [
              {
                "field": "id",
                "path": "id"
              },
              {
                "field": "version",
                "path": "version"
              },
              {
                "field": "versionCode",
                "path": "versionCode"
              },
              {
                "field": "status",
                "path": "status"
              },
              {
                "field": "publishedAt",
                "path": "publishedAt"
              },
              {
                "field": "details",
                "path": "details"
              }
            ]
          }
        ],
        "params": [],
        "rules": [
          "onlyOwnerMaintainsPrivacyText",
          "publishedVersionImmutable",
          "currentVersionIsLatestPublished",
          "newCurrentVersionRequiresReacceptance",
          "reacceptOnNewPrivacyVersion"
        ],
        "doc": {
          "raw": "Purpose: Publishes a draft privacy text version so that it becomes the current privacy text.\nInput: id: the draft version to publish. version: its concurrency version, for the optimistic check.\nProcessing: Refuses callers who are not the company owner (onlyOwnerMaintainsPrivacyText). Refuses a version that is not in draft status or whose version does not match. Runs the publishPrivacyVersion transition from draft to published, and the platform sets publishedAt. From then on the version is frozen (publishedVersionImmutable). Because it is now the latest published version, it becomes current (currentVersionIsLatestPublished). isCurrent is computed, never stored. Earlier acceptances stop being valid for completing access (newCurrentVersionRequiresReacceptance, reacceptOnNewPrivacyVersion). This comes from computing consentValid against the current version code, and no person record is written.\nOutput: version: the published version in its new state, with status published, publishedAt set and isCurrent true.",
          "purpose": "Publishes a draft privacy text version so that it becomes the current privacy text.",
          "input": "id: the draft version to publish. version: its concurrency version, for the optimistic check.",
          "processing": "Refuses callers who are not the company owner (onlyOwnerMaintainsPrivacyText). Refuses a version that is not in draft status or whose version does not match. Runs the publishPrivacyVersion transition from draft to published, and the platform sets publishedAt. From then on the version is frozen (publishedVersionImmutable). Because it is now the latest published version, it becomes current (currentVersionIsLatestPublished). isCurrent is computed, never stored. Earlier acceptances stop being valid for completing access (newCurrentVersionRequiresReacceptance, reacceptOnNewPrivacyVersion). This comes from computing consentValid against the current version code, and no person record is written.",
          "output": "version: the published version in its new state, with status published, publishedAt set and isCurrent true."
        }
      }
    ]
  }
} as const;

export default definition;
