interface EmailPayload {
  to: string
  subject: string
  html: string
}

const resendApiKey = process.env.RESEND_API_KEY
const resendFrom = process.env.RESEND_FROM_EMAIL

export const sendEmail = async ({ to, subject, html }: EmailPayload) => {
  if (!resendApiKey || !resendFrom) {
    throw new Error('Email service not configured')
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: resendFrom,
      to,
      subject,
      html,
    }),
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(`Failed to send email: ${message}`)
  }
}
