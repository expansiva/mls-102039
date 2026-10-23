/// <mls fileReference="_102039_/l2/onboarding/web/mobile/page11/organization_people.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/userAccessManagement/page21.md",
    "experience": "memberDirectory"
  },
  "intent": "On a narrow screen (around 390px, still usable from 360px to 430px), let the company owner check how many people still have pending items, search people by name or login e-mail, and open one person to see what is missing and who resolves it.",
  "sections": [
    {
      "id": "accessOverview",
      "priority": "primary",
      "purpose": "Show short indicators at the top for complete and pending access.",
      "organisms": [
        "accessHighlights"
      ]
    },
    {
      "id": "peopleDirectory",
      "priority": "main",
      "purpose": "Show a searchable, stacked list of people with status and missing items that fits a narrow width. Show an empty list differently from an error.",
      "organisms": [
        "peopleList"
      ]
    },
    {
      "id": "personReview",
      "priority": "secondary",
      "purpose": "Open the selected person below or over the list, with their login e-mail, consent situation, missing items and who resolves each one.",
      "organisms": [
        "personPendingDetail"
      ]
    }
  ],
  "organisms": {
    "accessHighlights": {
      "kind": "highlights",
      "text": "See which people have completed their access and which still have something missing.",
      "intents": []
    },
    "peopleList": {
      "kind": "list",
      "text": "Find people in the organization by name or login e-mail, with their access status and what is still missing.",
      "intents": []
    },
    "personPendingDetail": {
      "kind": "detail",
      "text": "Open a person to see their login e-mail, whether consent is required and valid, what is still missing and who resolves each pending item.",
      "intents": [
        {
          "id": "openPrivacyText",
          "kind": "navigate",
          "to": "privacy_text"
        }
      ]
    }
  },
  "molecules": {
    "accessHighlights": [
      {
        "role": "Compact count of complete versus pending access",
        "preferred": "groupviewmetric--ml-metric-big-number",
        "alternative": "groupviewmetric--ml-metric-card"
      }
    ],
    "peopleList": [
      {
        "role": "Search field for name or login e-mail",
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "Narrow people list with status and missing items",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "personPendingDetail": [
      {
        "role": "Person identity with login e-mail and access status",
        "preferred": "groupviewcard--ml-profile-card",
        "alternative": "groupviewcard--ml-vertical-card"
      },
      {
        "role": "Pending items with who resolves each one",
        "preferred": "groupviewtable--ml-responsive-table",
        "alternative": "groupviewtable--ml-data-table-minimal"
      },
      {
        "role": "Notice when consent is no longer valid or access is incomplete",
        "preferred": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
