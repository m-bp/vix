import { Kumbh_Sans } from "next/font/google"
import { useRouter } from "next/router"

const bodyFont = Kumbh_Sans({
  subsets: ["latin"],
})

const headingFont = bodyFont
// const headingFont = SomeOtherFont({
//   weight: '700',
//   subsets: ['latin'],
// })

export default function GlobalStyles() {
  const router = useRouter()

  if (typeof window !== "undefined" && router.pathname.startsWith("/studio"))
    return null

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${bodyFont.style.fontFamily};
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        h7 {
          font-family: ${headingFont.style.fontFamily};
        }
      `}</style>
    </>
  )
}
