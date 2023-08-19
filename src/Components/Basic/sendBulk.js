const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const { Gspread } = require("../Templates/gspreadClass");

module.exports = sendBulk = async (client, msg, MessageMedia, t) => {
    let chat = await msg.getChat();
    let from = msg.author || msg.from;
    let sender = await client.getContactById(from);
    console.log(
        `.b called at Group : '${chat.name}' by ${
            sender.name || sender.pushname
        } aka ${sender.number}`
    );

    await msg.react("⚡");

    console.log("\n --- Triggered --- sendBulk \n");

    // const csvread = require("../Templates/csvread");
    // const arr = await csvread("Files/a.csv");

    const pdf = MessageMedia.fromFilePath("Files/sample.pdf");
    const img = MessageMedia.fromFilePath("Files/sample.png");

    const gspread = new Gspread({
        keyFile: "./src/c.json",
        url: "https://docs.google.com/spreadsheets/d/1cqUBrhoUKcsWuTT8wm6DhZBG1QuMnrO89DoqAvygVgU/edit?usp=sharing",
    });

    const list = await gspread.getData();

    let name, num, text;

    const mentions = ["919947109776@c.us"];

    for (let i = 1; i < list.length; i++) {
        name = list[i][0];
        num = list[i][1];

        text = `Dear ${name},
    
This is a sample text message.

https://forms.gle/anRbYQ9UCJZooN3R9
    
Contact @919947109776 if you have any queries.`;

        try {
            if (t === "-i") {
                await client.sendMessage(`91${num}@c.us`, img, {
                    caption: text,
                    mentions,
                });
            } else if (t === "-p") {
                await client.sendMessage(`91${num}@c.us`, pdf, {
                    caption: text,
                    mentions,
                });
            } else {
                await client.sendMessage(text, {
                    mentions,
                });
            }

            console.log(`${i}/${list.length - 1} --- ${name}`);
            // fs.appendFileSync('./Files/b21-succ.csv', `${i},${arr[i][0]},${arr[i][1]}\n`)
        } catch (err) {
            console.log(`${i}/${list.length - 1} --- ${name} - error`);
            // fs.appendFileSync('./Files/b21-err.csv', `${i},${arr[i][0]},${arr[i][1]}\n`)
        }
        // await delay(2000);
    }
};
