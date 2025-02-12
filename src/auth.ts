import { google } from "googleapis"
import * as fs from "fs/promises"
import * as path from "path"
import { authenticate } from "@google-cloud/local-auth"

const CREDENTIALS_PATH = path.join(process.cwd(), "credentials_desktop.json")
const TOKEN_PATH = path.join(process.cwd(), "token.json")

const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
]

export async function loadSavedCredentialsIfExist(): Promise<any | null> {
  try {
    const content = await fs.readFile(TOKEN_PATH, "utf-8")
    const credentials = JSON.parse(content)
    return google.auth.fromJSON(credentials)
  } catch (err) {
    return null
  }
}

export async function saveCredentials(client: any): Promise<void> {
  try {
    const content = await fs.readFile(CREDENTIALS_PATH, "utf-8")
    const keys = JSON.parse(content)
    const key = keys.installed || keys.web

    const payload = JSON.stringify({
      type: "authorized_user",
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    })

    await fs.writeFile(TOKEN_PATH, payload, "utf-8")
    console.log("Token saved successfully!")
  } catch (err) {
    console.error("Error saving credentials:", err)
    throw err
  }
}

export async function authorize(): Promise<any> {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    console.log("Using saved credentials...")
    return client
  }

  console.log("No saved credentials found. Performing authentication...")
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })

  if (client.credentials) {
    await saveCredentials(client)
  }

  return client
}
