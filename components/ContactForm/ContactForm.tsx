import clsx from "clsx"
import Button from "components/shared/Button"
import { useState } from "react"
import type { ZodError } from "zod"

import s from "./ContactForm.module.scss"

type Props = {}

function ContactForm({}: Props) {
  const [data, setData] = useState<{
    message: string
    error?: boolean
    issues?: ZodError["issues"]
  } | null>()

  const handleSubmit = async event => {
    event.preventDefault()

    setData(null)

    const data = JSON.stringify({
      formId: "contact-form",
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      companyEmail: event.target.companyEmail.value,
      phone: event.target.phone.value,
    })

    const endpoint = "/api/create-lead"

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data,
    }

    const response = await fetch(endpoint, options)

    const result = await response.json()

    setData(result)

    if (!result.error) event.target.reset()
  }

  return (
    <div className="container">
      <div className={clsx(s.wrapper)}>
        <form
          className={s.form}
          method="POST"
          action="/api/create-lead"
          onSubmit={handleSubmit}>
          {data &&
            (data.error ? (
              <div className={s.bad}>
                <p>{data.message}</p>
                <ul>
                  {data.issues?.map((x, i) => (
                    <li key={i}>
                      [{x.path[0]}] {x.message}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className={s.good}>{data.message}</div>
            ))}

          <div className={s.fieldGroup}>
            <input
              className={s.input}
              name="firstName"
              placeholder="First name*"
            />

            <input
              className={s.input}
              name="lastName"
              placeholder="Last name*"
            />
          </div>

          <input
            className={s.input}
            name="companyEmail"
            placeholder="Company email*"
          />

          <div>
            <input
              className={s.input}
              name="password"
              type="password"
              placeholder="Password*"
            />
            <span style={{ paddingLeft: "1rem", fontSize: 12 }}>
              Password must contain 1 small letter, 1 capital letter, 1 number.
            </span>
          </div>

          <input className={s.input} name="phone" placeholder="Phone*" />

          <Button type="submit">Start a free trial</Button>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
export type { Props as ContactFormProps }
