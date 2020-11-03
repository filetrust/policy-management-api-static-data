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
    policy.PolicyState = PolicyState.Historical;
    return policy;
  }
  
  static Draft(timestamp: Date): Policy {
    const policy = Policy.Base(timestamp);
    policy.UpdatedBy = "draft.editor@users.com";
    policy.PolicyState = PolicyState.Draft;
    return policy;
  }

  static Current(timestamp: Date): Policy {
    const historicalPolicy = Policy.Base(timestamp);
    historicalPolicy.UpdatedBy = "publisher@users.com";
    historicalPolicy.PolicyState = PolicyState.Published;
    return historicalPolicy;
  }

  private static Base(timestamp: Date) {
    return {
      Id: Guid(),
      PolicyState: PolicyState.Historical,
      Timestamp: timestamp.toUTCString(),
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
        }
      },
      NcfsPolicy: {
        Options: {
          GlasswallBlockedFiles: randomEnum(NcfsOption),
          UnProcessableFileTypes: randomEnum(NcfsOption)
        },
        Routes: Array.apply(null, Array(Math.floor(Math.random() * 10))).map(() => {
          return {
            ApiUrl: Guid(),
            IsDeleted: Math.random() >= 0.5,
            IsValidated: Math.random() >= 0.5
          };
        })
      }
    };
  }
  Id: string;

  PolicyState: PolicyState;

  Timestamp: string;

  UpdatedBy: string;

  AdaptionPolicy: AdaptionPolicy;

  NcfsPolicy: NcfsPolicy;
}

export class NcfsPolicy {
  Routes: NcfsRoute[];

  Options: NcfsOptions;
}

export class NcfsOptions {
  UnProcessableFileTypes: NcfsOption;
  GlasswallBlockedFiles: NcfsOption;
}

export enum NcfsOption {
  Relay = 1,
  Block,
  Refer
}

export enum PolicyState {
  Draft,
  Published,
  Historical
}

export class AdaptionPolicy {
  ContentManagementFlags: ContentFlags;
}

export class ContentFlags {
  PdfContentManagement: PdfContentFlags;
  WordContentManagement: WordContentFlags;
  ExcelContentManagement: ExcelContentFlags;
  PowerPointContentManagement: PowerPointContentFlags;
}

export class ExcelContentFlags {
  DynamicDataExchange: ContentFlagAction;
  EmbeddedFiles: ContentFlagAction;
  EmbeddedImages: ContentFlagAction;
  ExternalHyperlinks: ContentFlagAction;
  InternalHyperlinks: ContentFlagAction;
  Macros: ContentFlagAction;
  Metadata: ContentFlagAction;
  ReviewComments: ContentFlagAction;
}

export class PdfContentFlags {
  Acroform: ContentFlagAction;
  ActionsAll: ContentFlagAction;
  EmbeddedFiles: ContentFlagAction;
  EmbeddedImages: ContentFlagAction;
  ExternalHyperlinks: ContentFlagAction;
  InternalHyperlinks: ContentFlagAction;
  Javascript: ContentFlagAction;
  Metadata: ContentFlagAction;
}

export class PowerPointContentFlags {
  EmbeddedFiles: ContentFlagAction;
  EmbeddedImages: ContentFlagAction;
  ExternalHyperlinks: ContentFlagAction;
  InternalHyperlinks: ContentFlagAction;
  Macros: ContentFlagAction;
  Metadata: ContentFlagAction;
  ReviewComments: ContentFlagAction;
}

export class WordContentFlags {
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
  ApiUrl: string;

  IsDeleted: boolean;

  IsValidated: boolean;
}