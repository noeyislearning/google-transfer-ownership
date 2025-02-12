# Google Drive Ownership Transfer App

CLI application automates the process of transferring ownership of Google Drive files. It uses Google APIs to manage file permissions and send email notifications. The app is built with TypeScript and is designed to be modular and easy to configure.

## Features

- Transfer ownership of Google Drive files to another user.
- Send email notifications to the new owner using Gmail API.

## Prerequisites

- Node.js and npm installed on your machine.
- Google Cloud Platform project with Drive and Gmail APIs enabled.
- OAuth 2.0 credentials for a desktop app (`credentials_desktop.json`).

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/google-drive-ownership-transfer.git
   cd google-drive-ownership-transfer
   ```

2. Install Dependencies

    ```bash
    bun i
    ```

3. Configure Environment Variables

    Create a `.env` file in the project root with the following variables:

    ```textfile
    CLIENT_ID=your-client-id
    CLIENT_SECRET=your-client-secret
    REDIRECT_URI=your-redirect-uri
    FILE_ID=your-google-drive-file-id
    CURRENT_OWNER=current-owner-email@example.com
    NEW_OWNER_EMAIL=new-owner-email@example.com
    ```

4. Place OAuth 2.0 Credentials

    Download your OAuth 2.0 credentials JSON file from the Google Cloud Console and save it as `credentials_desktop.json` in the project root.

## Usage

1. Run the Application

    ```bash
    bun dev
    ```

2. Follow the Prompts

    The application will guide you through the authentication process and transfer ownership of the specified Google Drive file.


## License

This project is licensed under the MIT License. See the [LICENSE](/LICENSE) file for details.