import { Client as HubspotClient } from "@hubspot/api-client"
import { serverLog } from "lib/helpers"
import type { NextApiRequest, NextApiResponse } from "next"
import { z, ZodError } from "zod"

const schema = z.object({
  firstname: z.string().nonempty(),
  lastname: z.string().nonempty(),
  email: z.string().email("This is not a valid email."),
  phone: z.string().nonempty(),
})

export type DataResponse = ReturnType<typeof schema.safeParseAsync>

const sanityToken = process.env.SANITY_API_WRITE_TOKEN
const hubspotToken = process.env.HUBSPOT_APP_TOKEN

export default async function createLead(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (!sanityToken) {
    throw new Error("There is no `SANITY_API_WRITE_TOKEN` .env variable")
  }

  if (!hubspotToken) {
    throw new Error("There is no `HUBSPOT_APP_TOKEN` .env variable")
  }

  const body = req.body

  const isContactForm = body.formId === "contact-form"

  if (!isContactForm)
    return res.status(400).json({ error: true, message: "Invalid form ID" })

  try {
    const result = await schema.parseAsync(body)

    const hubspotClient = new HubspotClient({ accessToken: hubspotToken })

    const apiResponse = await hubspotClient.crm.contacts.basicApi.create({
      properties: result,
      associations: [],
    })

    serverLog(apiResponse)
  } catch (e) {
    if (e instanceof ZodError) {
      return res
        .status(400)
        .json({ error: true, issues: e.issues, message: "Error in validation" })
    } else {
      return res.status(400).json({
        error: true,
        issues: e.issues,
        message:
          e.message === "HTTP request failed"
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e),
      })
    }
  }

  res.status(200).json({ message: "Form submitted - Success!" })
}
