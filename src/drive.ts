import { google } from "googleapis"
import { sendGmailNotification } from "./gmail"

export async function transferOwnership(
  authClient: any,
  fileId: string,
  newOwnerEmail: string,
): Promise<void> {
  const drive = google.drive({ version: "v3", auth: authClient })

  try {
    const res1 = await drive.permissions.list({
      fileId,
      supportsAllDrives: true,
      pageSize: 100,
      fields: "*",
    })

    const permission = res1.data.permissions?.find(
      ({ emailAddress }) => emailAddress === newOwnerEmail,
    )

    let permissionId: string | undefined = permission?.id ?? undefined

    if (!permissionId) {
      const {
        data: { id },
      } = await drive.permissions.create({
        fileId: fileId,
        sendNotificationEmail: true,
        supportsAllDrives: true,
        requestBody: {
          role: "writer",
          type: "user",
          emailAddress: newOwnerEmail,
        },
      })
    }

    if (permissionId) {
      const res2 = await drive.permissions.update({
        fileId,
        permissionId,
        supportsAllDrives: true,
        requestBody: {
          role: "writer",
          pendingOwner: true,
        },
      })

      console.log("Permission updated successfully:", res2.data)
      console.log(
        `Ownership transfer initiated for ${newOwnerEmail}. They will receive a notification from Google Drive.`,
      )

      await sendGmailNotification(authClient, newOwnerEmail, fileId)
    } else {
      console.error("Failed to obtain or create permission ID.")
    }
  } catch (error: any) {
    console.error("Error transferring ownership:", error.message)
  }
}
