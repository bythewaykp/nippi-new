# GETTING STARTED


### INSTALLING REQUIRED TOOLS

Install the latest stable version of Node.JS from [here](https://nodejs.org/en/download)

#### VERIFYING THE INSTALLATION
Verify the installation of node and npm by running

```bash
node -v
```
and
```bash
npm -v
```

### DOWNLOADING SOURCE CODE

Clone the repo with SSH using
```bash
git clone git@github.com:bythewaykp/nippi-new.git
```

or HTTPS using
```bash
git clone https://github.com/bythewaykp/nippi-new.git
```

or downloading the zip file

### CHANGING WORKING DIRECTORY

cd into the folder by running `cd nippi-new`


### INSTALLING DEPENDENCIES


install npm dependencies by

```bash
pnpm i
```
or
`npm i`
or
`yarn add`

### CONFIGURING GOOGLE SHEETS API ACCESS

Generate a service account from [Coogle Cloud Console](https://console.cloud.google.com/)
> Create a new project and switch to that project
> 
> Go to APIs and Services > Enabled APIs and serives and click ENABLE APIS AND SERVICES
> 
> Search for Google Sheets API and click ENABLE
> 
> Go to APIs and Services > Credentials and click CREATE CREDENTIALS
> 
> Choose service account and enter details to continue
> 
> Copy the contents of generated json file to Creds/creds.json

### SETTING UP FILES AND MEDIA

Copy images, PDFs, videos to Files/
modify [src/Components/Basic/sendBulk.js#5](https://github.com/bythewaykp/nippi-new/blob/926d16e8d767262ff6917f6de7ecd3ffa2ec7cc5/src/Components/Basic/sendBulk.js#L5-L9) to reflect the same

### CHANGE THE BROWSER EXECUTABLE PATH
choose your browser executable path at [src/index.js#20](https://github.com/bythewaykp/nippi-new/blob/926d16e8d767262ff6917f6de7ecd3ffa2ec7cc5/src/index.js#L19-L21)

> eg: for windows it would be `"C:/Program Files/Google/Chrome/Application/chrome.exe"`
>
> for linux it would be `"/usr/bin/google-chrome-stable"`

### RUNNING THE APP IN DEV MODE

Run the app by running

```bash
pnpm dev
```
or
`npm dev`
or
`yarn dev`
