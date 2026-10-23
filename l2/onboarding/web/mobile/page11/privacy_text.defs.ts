/// <mls fileReference="_102039_/l2/onboarding/web/mobile/page11/privacy_text.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/documentManagement/page21.md",
    "experience": "libraryList"
  },
  "intent": "On a narrow screen of about 390px, which also works at 360px and 430px, let the company owner read the current privacy text and write and publish a new version in one fluid column. The version history appears further down.",
  "sections": [
    {
      "id": "currentTextSection",
      "priority": "primary",
      "purpose": "Show the current privacy text first, with its version code, publication date and a note if it is still provisional. Long text wraps to fit the width.",
      "organisms": [
        "currentPrivacyText"
      ]
    },
    {
      "id": "newVersionSection",
      "priority": "main",
      "purpose": "Write the new version full width, then create and publish it with clearly labelled, easy-to-tap actions.",
      "organisms": [
        "newVersionForm",
        "versionActions"
      ]
    },
    {
      "id": "historySection",
      "priority": "secondary",
      "purpose": "Show a compact history of versions and which one is current, adapted to the narrow width.",
      "organisms": [
        "privacyVersionList"
      ]
    }
  ],
  "organisms": {
    "currentPrivacyText": {
      "kind": "detail",
      "text": "Read the current privacy text with its version code and publication date. A clear note shows when it is still the provisional starting text.",
      "intents": []
    },
    "privacyVersionList": {
      "kind": "list",
      "text": "See all privacy text versions with version code, status and publication date. The current one is marked.",
      "intents": []
    },
    "newVersionForm": {
      "kind": "form",
      "text": "Write a new version of the privacy text and, if you want, add a short note about what changed.",
      "intents": []
    },
    "versionActions": {
      "kind": "actions",
      "text": "Create the new version, then publish it so it becomes the current one. People who accepted an earlier version must accept again.",
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
        "preferred": "groupviewcard--ml-vertical-card"
      }
    ],
    "privacyVersionList": [
      {
        "role": "versionHistoryTable",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
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
        "preferred": "grouptriggeraction--ml-button-standard",
        "alternative": "grouptriggeraction--ml-button-group"
      },
      {
        "role": "publishConfirmation",
        "preferred": "groupnotifyuser--ml-alert-modal",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      },
      {
        "role": "resultFeedback",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
