const dev = "919947109776";

module.exports = async (client, msg) => {
    let text = `_Hey I'm @${client.info.wid.user}, a friend to make your social life easier._

_The set of available commands are :_

*.h* : _help, the bravest thing to do is ask for help._

*.m* : _mention participants in a group_

*.s <authorname> <packname>* : _send the quoted/ sent media as sticker_

*.p @<name1>* : _promote mentioned member(s) as admin(s)_ (quotedMessage supported)

*.d @<name1>* : _demote mentioned member(s) as admin(s)_ (quotedMessage supported)

*.a <googlesheetsurl>* : _add participants to the group (Columns name and number [with countrycode])_

*.r @<user1>* : remove mentioned user(s) from the group

_Feel free to contact my dev @${dev}_
`;

    await msg.react("⚡");

    let chat = await msg.getChat();
    let from = msg.author || msg.from;
    let sender = await client.getContactById(from);

    let mentions = [`${dev}@c.us`, client.info.wid._serialized];

    if (chat.isGroup) {
        console.log(
            `.h called at Group : '${chat.name}' by ${
                sender.name || sender.pushname
            } aka ${sender.number}`
        );
    } else {
        console.log(
            `.h called by ${sender.name || sender.pushname} aka ${
                sender.number
            }`
        );
    }
    if (msg.hasQuotedMsg) {
        let og = await msg.getQuotedMessage();
        await og.reply(text);
    } else {
        await msg.reply(text, null, { mentions });
    }
};
