import dynamic from "next/dynamic"
import {
  cardGroupSchema,
  checkedListSchema,
  columnsSchema,
  contactFormSchema,
  ctaBannerSchema,
  ctaCardGroupSchema,
  dynamicColumnsSchema,
  featureListSchema,
  pricingSchema,
  pricingTableSchema,
  spacerSchema,
  textBlockSchema,
} from "schemas"

const DynamicColumns = dynamic(
  () => import("components/DynamicColumns/DynamicColumns")
)
const PricingTable = dynamic(
  () => import("components/PricingTable/PricingTable")
)
const Columns = dynamic(() => import("components/Columns/Columns"))
const CheckedList = dynamic(() => import("components/CheckedList/CheckedList"))
const ContactForm = dynamic(() => import("components/ContactForm/ContactForm"))
const Spacer = dynamic(() => import("components/Spacer/Spacer"))
const TextBlock = dynamic(() => import("components/block/TextBlock/TextBlock"))
const CardGroup = dynamic(() => import("components/CardGroup/CardGroup"))
const CTACardGroup = dynamic(
  () => import("components/CTACardGroup/CTACardGroup")
)
const CTABanner = dynamic(() => import("components/CTABanner/CTABanner"))
const FeatureList = dynamic(() => import("components/FeatureList/FeatureList"))
const Pricing = dynamic(() => import("components/Pricing/Pricing"))

export default function renderBlock(block, i) {
  const key = `${block._id}${i}`

  switch (block._type) {
    // case 'hero':
    //   return block.style !== 'image' ? (
    //     <Hero key={key} {...block} />
    //   ) : (
    //     <Hero2 key={key} {...block} />
    //   )

    case textBlockSchema.name:
      return <TextBlock key={key} {...block} />

    case spacerSchema.name:
      return <Spacer key={key} {...block} />

    case contactFormSchema.name:
      return <ContactForm key={key} {...block} />

    case columnsSchema.name:
      return <Columns key={key} {...block} />

    case dynamicColumnsSchema.name:
      return <DynamicColumns key={key} {...block} />

    case checkedListSchema.name:
      return <CheckedList key={key} {...block} />

    case cardGroupSchema.name:
      return <CardGroup key={key} {...block} />

    case ctaCardGroupSchema.name:
      return <CTACardGroup key={key} {...block} />

    case featureListSchema.name:
      return <FeatureList key={key} {...block} />

    case ctaBannerSchema.name:
      return <CTABanner key={key} {...block} />

    case pricingSchema.name:
      return <Pricing key={key} {...block} />

    case pricingTableSchema.name:
      return <PricingTable key={key} {...block} />

    default:
      return `Error! Unknown type: ${block._type}`
  }
}
