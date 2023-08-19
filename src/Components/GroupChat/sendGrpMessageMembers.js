const delay = (ms) => new Promise((res) => setTimeout(res, ms));

module.exports = async (client, msg, t) => {
    let chat = await msg.getChat();

    const from = msg.author || msg.from;

    let sender = await client.getContactById(from);

    const mentions = ["919947109776@c.us"];

    if (chat.isGroup) {
        let isadmin = await require("../Templates/adminCheck");

        if (isadmin(from, chat)) {
            //is admin

            await msg.react("⚡");

            if (msg.hasQuotedMsg) {
                let og = await msg.getQuotedMessage();

                const text = `${og.body}

_~ forwarded from group : *${chat.name}* by @${sender.number}_`;

                for (let p of chat.participants) {
                    let individualChat = await client.getChatById(
                        p.id._serialized
                    );

                    if ((await individualChat.getContact()).isMe) {
                        continue;
                    }
                    console.log(
                        `${(await individualChat.getContact()).name} : ${
                            individualChat.name
                        }`
                    );

                    if (og.hasMedia) {
                        //has media
                        let k = await og.downloadMedia();
                        await client.sendMessage(p.id._serialized, k, {
                            caption: text,
                            mentions,
                        });
                    } else {
                        //quoted message has no media
                        console.log("no media");
                        await client.sendMessage(p.id._serialized, text, {
                            mentions,
                        });
                    }
                }
            }
        } else {
            //not admin
            await msg.reply("not admin vro");
        }
    }
};
