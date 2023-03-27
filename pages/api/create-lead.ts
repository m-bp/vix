import type { NextApiRequest, NextApiResponse } from "next"
import { z, ZodError } from "zod"

const schema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  companyEmail: z.string().email("This is not a valid email."),
  phone: z.string().nonempty(),
})

export type DataResponse = ReturnType<typeof schema.safeParseAsync>

export default async function createLead(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) {
    throw new Error("There is no `SANITY_API_WRITE_TOKEN` .env variable")
  }

  const body = req.body

  try {
    schema.parse(body)
  } catch (e) {
    if (e instanceof ZodError) {
      return res
        .status(400)
        .json({ error: true, issues: e.issues, message: "Error in validation" })
    }
  }

  // const isContactForm = body.formId === 'contact-form'

  // if (isContactForm) {
  //   const lead = {
  //     _type: 'lead',
  //     name: body.name,
  //     business: body.business,
  //     phone: body.phone,
  //     email: body.email,
  //   }

  //   try {
  //     const _client = createClient({
  //       projectId,
  //       dataset,
  //       apiVersion,
  //       useCdn,
  //       token,
  //     })
  //     const result = await _client.create(lead)
  //   } catch (error) {
  //     console.log(error)
  //     res.status(error.statusCode).json({ error: true, message: error })
  //   }
  // }

  res.status(200).json({ message: "Form submitted - Success!" })
}
