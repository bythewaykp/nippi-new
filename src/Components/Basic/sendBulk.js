const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// MODIFY HERE

const data = [
    { name: "sample1.png", text: "hi" },
    { name: "sample2.png", caption: true },
    { name: "sample3.png" },
];

// MODIFY HERE

module.exports = sendBulk = async (client, msg, MessageMedia, gspread, t) => {
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

    const list = await gspread.getData();

    const items = [];

    let name, num, text;

    const mentions = ["919947109776@c.us"];

    if (t === "i") {
        for (let i of data) {
            items.push({
                content: MessageMedia.fromFilePath(`Files/${i.name}`),
                caption: i.caption ?? false,
                text: i.text,
            });
        }
    }

    for (let i = 1; i < list.length; i++) {
        name = list[i][0];
        num = list[i][1];

        text = `Dear ${name},

This is a sample text message.

https://forms.gle/anRbYQ9UCJZooN3R9

Contact @919947109776 if you have any queries.`;

        try {
            if (items.length == 0) {
                await client.sendMessage(`91${num}@c.us`, text, {
                    mentions,
                });
            } else {
                for (let k of items) {
                    await client.sendMessage(`91${num}@c.us`, k.content, {
                        caption: k.text ?? (k.caption ? text : undefined),
                        mentions,
                    });
                }
            }
        } catch (err) {
            console.log(err);
            //     console.log(`${i}/${list.length - 1} --- ${name} - error`);
            //     // fs.appendFileSync('./Files/b21-err.csv', `${i},${arr[i][0]},${arr[i][1]}\n`)
            // }
        }
    }
};
