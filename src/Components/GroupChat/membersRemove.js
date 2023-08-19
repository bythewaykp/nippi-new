module.exports = addGrp = async (client, msg) => {
    let chat = await require("../Templates/basicCheckGroupChat")(client, msg);
    // const chat = await msg.getChat()

    let from = msg.author || msg.from;
    let sender = await client.getContactById(from);

    if (chat) {
        console.log(
            `.r called at Group : '${chat.name}' by ${
                sender.name || sender.pushname
            } aka ${sender.number}`
        );
        await msg.react("⚡");

        let mentions = await msg.getMentions();

        let list = {
            names: [],
            ids: [],
            nums: "",
        };

        for (let i of mentions) {
            let id = i.id._serialized;
            let sender = await client.getContactById(id);
            list.nums += `@${sender.number} `;
            list.names.push(sender.name);
            list.ids.push(id);
        }

        try {
            await chat.removeParticipants(list.ids);
            await msg.reply(`removed ${list.nums}`, null, {
                mentions: list.ids,
            });
            console.log(`removed ${list.names.join(", ")}from ${chat.name}`);
        } catch (e) {
            console.log(
                `error occured while removing ${list.names.join(", ")} from ${
                    chat.name
                }`
            );
        }
    }
};
