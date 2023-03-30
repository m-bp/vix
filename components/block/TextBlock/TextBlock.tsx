import { PortableText } from "@portabletext/react"
import clsx from "clsx"
import Heading from "components/Heading"
import Typography from "components/Typography"
import { s as schema } from "sanity-typed-schema-builder"
import { textBlockType } from "schemas"

import s2 from "./PostBody.module.scss"
import s from "./TextBlock.module.scss"

type Props = schema.infer<typeof textBlockType> & {}

function TextBlock({ content, align }: Props) {
  return (
    <div className="container">
      <div className={clsx(s2.portableText, s.wrapper)}>
        <div className={clsx(s2.portableText, s.text, s[align])}>
          <PortableText
            value={content}
            components={{
              block: {
                h1: ({ children }) => <Heading variant={1}>{children}</Heading>,
                h2: ({ children }) => <Heading variant={2}>{children}</Heading>,
                h3: ({ children }) => <Heading variant={3}>{children}</Heading>,
                h4: ({ children }) => <Heading variant={4}>{children}</Heading>,
                h5: ({ children }) => <Heading variant={5}>{children}</Heading>,
                h6: ({ children }) => <Heading variant={6}>{children}</Heading>,
                small: ({ children }) => (
                  <Typography variant="small" component="small">
                    {children}
                  </Typography>
                ),
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default TextBlock
export type { Props as TextBlockProps }
