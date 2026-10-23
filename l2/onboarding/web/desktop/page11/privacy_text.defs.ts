/// <mls fileReference="_102039_/l2/onboarding/web/desktop/page11/privacy_text.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/documentManagement/page21.md",
    "experience": "libraryList"
  },
  "intent": "Let the company owner read the privacy text that is current today, see every version and which one is current, and write and publish a new version. When the new version is published, it becomes the text people must accept.",
  "sections": [
    {
      "id": "currentTextSection",
      "priority": "primary",
      "purpose": "Show the privacy text people accept right now, with its version code and publication date, and show whether it is still the initial provisional text.",
      "organisms": [
        "currentPrivacyText"
      ]
    },
    {
      "id": "newVersionSection",
      "priority": "main",
      "purpose": "Write the changed privacy text as a new version, then create and publish it. Published versions stay unchanged, and people who accepted an earlier version must accept again.",
      "organisms": [
        "newVersionForm",
        "versionActions"
      ]
    },
    {
      "id": "historySection",
      "priority": "secondary",
      "purpose": "Review the history of privacy text versions, with their status and publication date, and see which one is current.",
      "organisms": [
        "privacyVersionList"
      ]
    }
  ],
  "organisms": {
    "currentPrivacyText": {
      "kind": "detail",
      "text": "Read the current privacy text with its version code and publication date. A clear note shows when it is still the provisional starting text that should be replaced.",
      "intents": []
    },
    "privacyVersionList": {
      "kind": "list",
      "text": "See all privacy text versions, both drafts and published versions, with version code, status, publication date and change note. The current one is marked.",
      "intents": []
    },
    "newVersionForm": {
      "kind": "form",
      "text": "Write a new version of the privacy text and, if you want, add a short note that explains what changed from the previous version.",
      "intents": []
    },
    "versionActions": {
      "kind": "actions",
      "text": "Create the new version as a draft, then publish it so it becomes the current one. After publishing, people who accepted an earlier version must accept again.",
      "intents": [
        {
          "id": "createVersion",
          "kind": "submit"
        },
        {
          "id": "publishVersion",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "currentPrivacyText": [
      {
        "role": "currentTextCard",
        "preferred": "groupviewcard--ml-vertical-card",
        "alternative": "groupviewcard--ml-view-card-horizontal"
      }
    ],
    "privacyVersionList": [
      {
        "role": "versionHistoryTable",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-view-table"
      }
    ],
    "newVersionForm": [
      {
        "role": "privacyTextInput",
        "preferred": "groupentertext--ml-multiline-text"
      },
      {
        "role": "changeNoteInput",
        "preferred": "groupentertext--ml-multiline-text",
        "alternative": "groupentertext--ml-enter-text"
      }
    ],
    "versionActions": [
      {
        "role": "createAndPublishButtons",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-split-button"
      },
      {
        "role": "publishConfirmation",
        "preferred": "groupnotifyuser--ml-alert-modal",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      },
      {
        "role": "resultFeedback",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-notify-banner"
      }
    ]
  }
} as const;
