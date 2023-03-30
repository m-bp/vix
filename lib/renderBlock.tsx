import dynamic from "next/dynamic"

const CTABanner = dynamic(() => import("components/CTABanner"))
const CTACardGroup = dynamic(() => import("components/CTACardGroup"))
const CardGroup = dynamic(() => import("components/CardGroup"))
const CheckedList = dynamic(() => import("components/CheckedList"))
const Columns = dynamic(() => import("components/Columns"))
const ContactForm = dynamic(() => import("components/ContactForm"))
const DynamicColumns = dynamic(() => import("components/DynamicColumns"))
const FeatureList = dynamic(() => import("components/FeatureList"))
const Pricing = dynamic(() => import("components/Pricing"))
const PricingTable = dynamic(() => import("components/PricingTable"))
const Spacer = dynamic(() => import("components/Spacer"))
const TextBlock = dynamic(() => import("components/block/TextBlock"))

export default function renderBlock(block, i) {
  const key = block._key || `${block._id}${i}`

  switch (block._type) {
    // case 'hero':
    //   return block.style !== 'image' ? (
    //     <Hero key={key} {...block} />
    //   ) : (
    //     <Hero2 key={key} {...block} />
    //   )

    // case textBlockSchema.name:
    case "textBlock":
      return <TextBlock key={key} {...block} />

    // case spacerSchema.name:
    case "spacer":
      return <Spacer key={key} {...block} />

    // case contactFormSchema.name:
    case "contactForm":
      return <ContactForm key={key} {...block} />

    // case columnsSchema.name:
    case "columns":
      return <Columns key={key} {...block} />

    // case dynamicColumnsSchema.name:
    case "dynamicColumns":
      return <DynamicColumns key={key} {...block} />

    // case checkedListSchema.name:
    case "checkedList":
      return <CheckedList key={key} {...block} />

    // case cardGroupSchema.name:
    case "cardGroup":
      return <CardGroup key={key} {...block} />

    // case ctaCardGroupSchema.name:
    case "ctaCardGroup":
      return <CTACardGroup key={key} {...block} />

    // case featureListSchema.name:
    case "featureList":
      return <FeatureList key={key} {...block} />

    // case ctaBannerSchema.name:
    case "ctaBanner":
      return <CTABanner key={key} {...block} />

    // case pricingSchema.name:
    case "pricing":
      return <Pricing key={key} {...block} />

    // case pricingTableSchema.name:
    case "pricingTable":
      return <PricingTable key={key} {...block} />

    default:
      return `Error! Unknown type: ${block._type}`
  }
}
