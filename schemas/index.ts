import { pageSchema } from "./documents/page"
import { settingsSchema } from "./documents/settings"
import { cardGroupSchema } from "./objects/cardGroup"
import { cardGroupItemSchema } from "./objects/cardGroupItem"
import { checkedListSchema } from "./objects/checkedList"
import { checkedListItemSchema } from "./objects/checkedListItem"
import { columnsSchema } from "./objects/columns"
import { contactFormSchema } from "./objects/contactForm"
import { ctaSchema } from "./objects/cta"
import { ctaBannerSchema } from "./objects/ctaBanner"
import { ctaCardGroupSchema } from "./objects/ctaCardGroup"
import { ctaCardGroupItemSchema } from "./objects/ctaCardGroupItem"
import { customUrlSchema } from "./objects/customUrl"
import { dynamicColumnsSchema } from "./objects/dynamicColumns"
import { featureListSchema } from "./objects/featureList"
import { pricingSchema } from "./objects/pricing"
import { pricingTableSchema } from "./objects/pricingTable"
import { spacerSchema } from "./objects/spacer"
import { textBlockSchema } from "./objects/textBlock"

export * from "./documents/page"
export * from "./documents/settings"
export * from "./objects/cardGroup"
export * from "./objects/cardGroupItem"
export * from "./objects/checkedList"
export * from "./objects/checkedListItem"
export * from "./objects/columns"
export * from "./objects/contactForm"
export * from "./objects/cta"
export * from "./objects/ctaBanner"
export * from "./objects/ctaCardGroup"
export * from "./objects/ctaCardGroupItem"
export * from "./objects/customUrl"
export * from "./objects/dynamicColumns"
export * from "./objects/featureList"
export * from "./objects/hero"
export * from "./objects/pricing"
export * from "./objects/pricingTable"
export * from "./objects/spacer"
export * from "./objects/textBlock"

export const schemas /*: SchemaPluginOptions['types']*/ = [
  pageSchema,
  settingsSchema,

  contactFormSchema,
  cardGroupSchema,
  cardGroupItemSchema,
  checkedListSchema,
  checkedListItemSchema,
  columnsSchema,
  ctaBannerSchema,
  ctaCardGroupSchema,
  ctaCardGroupItemSchema,
  ctaSchema,
  customUrlSchema,
  dynamicColumnsSchema,
  featureListSchema,
  pricingSchema,
  spacerSchema,
  textBlockSchema,
  pricingTableSchema,
]
