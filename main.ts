import * as dotenv from "dotenv"
import { authorize } from "./src/auth"
import { transferOwnership } from "./src/drive"

dotenv.config()

;(async () => {
  const authClient = await authorize()

  const fileId = process.env.FILE_ID || ""
  const newOwnerEmail = process.env.NEW_OWNER_EMAIL || ""

  if (!fileId || !newOwnerEmail) {
    console.error("FILE_ID and NEW_OWNER_EMAIL must be set in the environment variables.")
    return
  }

  await transferOwnership(authClient, fileId, newOwnerEmail)
})()
