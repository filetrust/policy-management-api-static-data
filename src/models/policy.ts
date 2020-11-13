import { v4 as Guid } from "uuid";

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map(n => Number.parseInt(n))
    .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  const randomEnumValue = enumValues[randomIndex]
  return randomEnumValue;
}

export class Policy {
  static Historic(timestamp: Date): Policy {
    const policy = Policy.Base(timestamp);
    policy.UpdatedBy = "historical.user@users.com";
    policy.PolicyType = PolicyType.Historical;
    return policy;
  }
  
  static Draft(timestamp: Date): Policy {
    const policy = Policy.Base(timestamp);
    policy.UpdatedBy = "draft.editor@users.com";
    policy.PolicyType = PolicyType.Draft;
    return policy;
  }

  static Current(timestamp: Date): Policy {
    const historicalPolicy = Policy.Base(timestamp);
    historicalPolicy.UpdatedBy = "publisher@users.com";
    historicalPolicy.PolicyType = PolicyType.Current;
    historicalPolicy.Published = timestamp.toUTCString();
    return historicalPolicy;
  }

  private static Base(timestamp: Date) {
    return {
      Id: Guid(),
      PolicyType: PolicyType.Historical,
      Published: null,
      LastEdited: timestamp.toUTCString(),
      Created: timestamp.toUTCString(),
      UpdatedBy: "",
      AdaptionPolicy: {
        ContentManagementFlags: {
          ExcelContentManagement: {
            DynamicDataExchange: randomEnum(ContentFlagAction),
            EmbeddedFiles: randomEnum(ContentFlagAction),
            EmbeddedImages: randomEnum(ContentFlagAction),
            ExternalHyperlinks: randomEnum(ContentFlagAction),
            InternalHyperlinks: randomEnum(ContentFlagAction),
            Macros: randomEnum(ContentFlagAction),
            Metadata: randomEnum(ContentFlagAction),
            ReviewComments: randomEnum(ContentFlagAction)
          },
          PdfContentManagement: {
            EmbeddedFiles: randomEnum(ContentFlagAction),
            EmbeddedImages: randomEnum(ContentFlagAction),
            ExternalHyperlinks: randomEnum(ContentFlagAction),
            InternalHyperlinks: randomEnum(ContentFlagAction),
            Metadata: randomEnum(ContentFlagAction),
            Acroform: randomEnum(ContentFlagAction),
            ActionsAll: randomEnum(ContentFlagAction),
            Javascript: randomEnum(ContentFlagAction)
          },
          PowerPointContentManagement: {
            EmbeddedFiles: randomEnum(ContentFlagAction),
            EmbeddedImages: randomEnum(ContentFlagAction),
            ExternalHyperlinks: randomEnum(ContentFlagAction),
            InternalHyperlinks: randomEnum(ContentFlagAction),
            Macros: randomEnum(ContentFlagAction),
            Metadata: randomEnum(ContentFlagAction),
            ReviewComments: randomEnum(ContentFlagAction)

          },
          WordContentManagement: {
            DynamicDataExchange: randomEnum(ContentFlagAction),
            EmbeddedFiles: randomEnum(ContentFlagAction),
            EmbeddedImages: randomEnum(ContentFlagAction),
            ExternalHyperlinks: randomEnum(ContentFlagAction),
            InternalHyperlinks: randomEnum(ContentFlagAction),
            Macros: randomEnum(ContentFlagAction),
            Metadata: randomEnum(ContentFlagAction),
            ReviewComments: randomEnum(ContentFlagAction)
          }
        },
        NcfsActions: {
          GlasswallBlockedFilesAction: randomEnum(NcfsOption),
          UnprocessableFileTypeAction: randomEnum(NcfsOption)
        },
        NcfsRoute: {
            NcfsRoutingUrl: Guid(),
            IsDeleted: Math.random() >= 0.5,
            IsValidated: Math.random() >= 0.5
        },
        ErrorReportTemplate: "Please contact your administrator for more information."
      },
      NcfsPolicy: {
        NcfsDecision: randomEnum(NcfsDecision)
      }
    };
  }
  Id: string;

  PolicyType: PolicyType;
  
  Published: PolicyType;

  LastEdited: string;

  Created: string;
  
  UpdatedBy: string;

  AdaptionPolicy: AdaptionPolicy;

  NcfsPolicy: NcfsPolicy;
}

export class NcfsPolicy {
  NcfsDecision: NcfsDecision
}

export enum NcfsDecision {
  Relay,
  Replace,
  Block
}

export class NcfsActions {
  UnprocessableFileTypeAction: NcfsOption;
  GlasswallBlockedFilesAction: NcfsOption;
}

export enum NcfsOption {
  Relay = 1,
  Block,
  Refer
}

export enum PolicyType {
  Draft,
  Current,
  Historical
}

export class AdaptionPolicy {
  ContentManagementFlags: ContentManagementFlags;
  ErrorReportTemplate: string;
  NcfsRoute: NcfsRoute;
  NcfsActions: NcfsActions;
}

export class ContentManagementFlags {
  PdfContentManagement: PdfContentManagement;
  WordContentManagement: WordContentManagement;
  ExcelContentManagement: ExcelContentManagement;
  PowerPointContentManagement: PowerPointContentManagement;
}

export class ExcelContentManagement {
  DynamicDataExchange: ContentFlagAction;
  EmbeddedFiles: ContentFlagAction;
  EmbeddedImages: ContentFlagAction;
  ExternalHyperlinks: ContentFlagAction;
  InternalHyperlinks: ContentFlagAction;
  Macros: ContentFlagAction;
  Metadata: ContentFlagAction;
  ReviewComments: ContentFlagAction;
}

export class PdfContentManagement {
  Acroform: ContentFlagAction;
  ActionsAll: ContentFlagAction;
  EmbeddedFiles: ContentFlagAction;
  EmbeddedImages: ContentFlagAction;
  ExternalHyperlinks: ContentFlagAction;
  InternalHyperlinks: ContentFlagAction;
  Javascript: ContentFlagAction;
  Metadata: ContentFlagAction;
}

export class PowerPointContentManagement {
  EmbeddedFiles: ContentFlagAction;
  EmbeddedImages: ContentFlagAction;
  ExternalHyperlinks: ContentFlagAction;
  InternalHyperlinks: ContentFlagAction;
  Macros: ContentFlagAction;
  Metadata: ContentFlagAction;
  ReviewComments: ContentFlagAction;
}

export class WordContentManagement {
  DynamicDataExchange: ContentFlagAction;
  EmbeddedFiles: ContentFlagAction;
  EmbeddedImages: ContentFlagAction;
  ExternalHyperlinks: ContentFlagAction;
  InternalHyperlinks: ContentFlagAction;
  Macros: ContentFlagAction;
  Metadata: ContentFlagAction;
  ReviewComments: ContentFlagAction;
}
export enum ContentFlagAction {
  Disallow = 1,
  Sanitise
}

export class NcfsRoute {
  NcfsRoutingUrl: string;

  IsDeleted: boolean;

  IsValidated: boolean;
}