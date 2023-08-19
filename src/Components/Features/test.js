const fs = require("fs");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

module.exports = async (client, msg, MessageMedia, t) => {
    // console.log(msg.from);

    const text = `Dear,
    
This is a sample text message.

https://forms.gle/anRbYQ9UCJZooN3R9
    
Contact @919947109776 if you have any queries.`;

    const data = {
        img: [
            { name: "sample1.png", caption: true },
            { name: "sample2.png" },
            // { name: "sample3.png" },
        ],
        pdf: [{ name: "sample1.pdf", caption: true }, { name: "sample2.pdf" }],
    };
    // if (data.img) {
    //     for (let i of data.img) {
    //         // console.log(i.name);
    //         let img = MessageMedia.fromFilePath(`Files/${i.name}`);

    //         await client.sendMessage(`917012774787@c.us`, img, {
    //             caption: i.caption && text,
    //             mentions: ["919947109776@c.us"],
    //         });
    //         // await delay(2000);
    //     }
    // }
    if (data.pdf) {
        for (let i of data.pdf) {
            // console.log(i.name);
            let img = MessageMedia.fromFilePath(`Files/${i.name}`);

            await client.sendMessage(`919947109776@c.us`, img, {
                caption: i.caption ? text : false,
                mentions: ["919947109776@c.us"],
            });
            // await delay(2000);
        }
    }
};
