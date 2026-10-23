/// <mls fileReference="_102039_/l2/onboarding/web/desktop/page11/countries.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "Keep the module country list correct. Find a country by ISO code or name, see whether it is active, add or correct it, and inactivate or reactivate it so the access and company screens offer the right countries.",
  "sections": [
    {
      "id": "countryBrowse",
      "priority": "primary",
      "purpose": "Search the whole country list, active or inactive. Each country shows its ISO code, its name in your language and its status, so you can pick the one to work on.",
      "organisms": [
        "countryList"
      ]
    },
    {
      "id": "countryEditing",
      "priority": "main",
      "purpose": "Add a new country, or correct the ISO code or English name of the selected country.",
      "organisms": [
        "countryForm"
      ]
    },
    {
      "id": "countryStatusActions",
      "priority": "secondary",
      "purpose": "Change whether the selected country is offered for selection.",
      "organisms": [
        "countryActions"
      ]
    }
  ],
  "organisms": {
    "countryList": {
      "kind": "list",
      "text": "Find countries by ISO code or name. Names are shown in your language, and each country is marked active or inactive.",
      "intents": []
    },
    "countryForm": {
      "kind": "form",
      "text": "Add a new country with its two-letter ISO code and English name, or edit an existing one. Each ISO code can be used only once.",
      "intents": [
        {
          "id": "addCountry",
          "kind": "submit"
        },
        {
          "id": "saveCountryChanges",
          "kind": "submit"
        }
      ]
    },
    "countryActions": {
      "kind": "actions",
      "text": "Inactivate a country so it is no longer offered on the access and company screens, or reactivate it so it is offered again. People and companies that already use the country keep it.",
      "intents": [
        {
          "id": "inactivateCountry",
          "kind": "submit"
        },
        {
          "id": "reactivateCountry",
          "kind": "submit"
        }
      ]
    }
  },
  "molecules": {
    "countryList": [
      {
        "role": "search countries by code or name",
        "preferred": "groupsearchcontent--ml-search-filters",
        "alternative": "groupsearchcontent--ml-search-bar"
      },
      {
        "role": "country list with code, name and status",
        "preferred": "groupviewtable--ml-data-table",
        "alternative": "groupviewtable--ml-side-detail-table"
      }
    ],
    "countryForm": [
      {
        "role": "ISO code and English name inputs",
        "preferred": "groupentertext--ml-enter-text",
        "alternative": "groupentertext--ml-floating-text-input"
      },
      {
        "role": "save the country",
        "preferred": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "validation feedback such as a duplicate ISO code",
        "preferred": "groupnotifyuser--ml-contextual-feedback",
        "alternative": "groupnotifyuser--ml-toast-notification"
      }
    ],
    "countryActions": [
      {
        "role": "inactivate or reactivate the selected country",
        "preferred": "grouptriggeraction--ml-button-group",
        "alternative": "grouptriggeraction--ml-kebab-action-trigger"
      },
      {
        "role": "confirm the status change",
        "preferred": "groupnotifyuser--ml-toast-notification",
        "alternative": "groupnotifyuser--ml-contextual-feedback"
      }
    ]
  }
} as const;
