/// <mls fileReference="_102039_/l2/onboarding/web/mobile/page11/countries.defs.ts" enhancement="_blank"/>

export const definition = {
  "template": {
    "category": "_102020_/l4/collabux/templates/masterDataManagement/page21.md",
    "experience": "compactCrudTable"
  },
  "intent": "On a narrow screen, around 390px wide and still usable from 360px to 430px, find a country and then add, correct, inactivate or reactivate it. This keeps the country list offered on other screens correct.",
  "sections": [
    {
      "id": "countryBrowse",
      "priority": "primary",
      "purpose": "Search countries by code or name in a compact list that fits the screen width. Each country shows its name in your language and whether it is active.",
      "organisms": [
        "countryList"
      ]
    },
    {
      "id": "countryEditing",
      "priority": "main",
      "purpose": "Add or correct a country's ISO code and English name, one field below the other.",
      "organisms": [
        "countryForm"
      ]
    },
    {
      "id": "countryStatusActions",
      "priority": "secondary",
      "purpose": "Inactivate or reactivate the selected country with buttons that are easy to tap.",
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
        "preferred": "groupsearchcontent--ml-search-bar",
        "alternative": "groupsearchcontent--ml-search-filters"
      },
      {
        "role": "compact country list for narrow screens",
        "preferred": "groupviewtable--ml-responsive-data-table",
        "alternative": "groupviewtable--ml-responsive-table"
      }
    ],
    "countryForm": [
      {
        "role": "ISO code and English name inputs",
        "preferred": "groupentertext--ml-floating-text-input",
        "alternative": "groupentertext--ml-enter-text"
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
        "preferred": "grouptriggeraction--ml-kebab-action-trigger",
        "alternative": "grouptriggeraction--ml-button-standard"
      },
      {
        "role": "confirm the status change",
        "preferred": "groupnotifyuser--ml-toast-notification"
      }
    ]
  }
} as const;
