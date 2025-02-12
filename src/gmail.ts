import { google } from "googleapis"

export async function sendGmailNotification(auth: any, to: string, fileId: string): Promise<void> {
  const gmail = google.gmail({ version: "v1", auth })

  const subject = "Accept Google Drive Ownership Transfer"
  const messageContent = `Please accept the ownership transfer for the file: https://drive.google.com/file/d/${fileId}/view`

  const emailLines = [
    'From: "Google Drive Transfer" <balanarenmar@gmail.com>',
    `To: ${to}`,
    "Content-Type: text/plain; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${subject}`,
    "",
    messageContent,
  ]

  const email = emailLines.join("\r\n")

  const encodedEmail = Buffer.from(email)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")

  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedEmail,
      },
    })
    console.log("Email notification sent successfully")
  } catch (error: any) {
    console.error("Error sending email notification:", error.message)
  }
}
