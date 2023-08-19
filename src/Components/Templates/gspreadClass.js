const { google } = require("googleapis");

class Gspread {
    constructor({ keyFile, url }) {
        this.id = url.split("/")[5];
        const auth = new google.auth.GoogleAuth({
            keyFile,
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });

        this.service = google.sheets({ version: "v4", auth });
    }

    async getData() {
        const result = await this.service.spreadsheets.values.get({
            spreadsheetId: this.id,
            range: "Sheet1!A1:C1000",
        });

        return result.data.values;
        // console.log(result.data.values);
    }

    async updateAll() {
        for (let i = 2; i <= 3; i++) {
            let values = [[`g3 ${i}`, `${i}`]];

            try {
                await this.service.spreadsheets.values.update({
                    spreadsheetId: this.id,
                    range: `Sheet1!A${i}:B${i}`,
                    valueInputOption: "USER_ENTERED",
                    resource: { values },
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    async test() {
        // const result = await this.service.spreadsheets.values.get({
        //     spreadsheetId: this.id,
        //     range: "Sheet1!A1:C1000",
        // });
    }
}

module.exports = { Gspread };
