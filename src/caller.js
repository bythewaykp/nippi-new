// import path from "path";
const path = require("path");

module.exports = async (client, msg, MessageMedia) => {
    try {
        let v = String(msg.body).split(" ")[0];
        let t = String(msg.body).split(" ").splice(1).join(" ");

        switch (v) {
            case ".t":
                await require(path.join(
                    __dirname,
                    "./Components/Features/test"
                ))(client, msg, t, MessageMedia);
                break;

            case ".h":
                await require(path.join(__dirname, "./Components/Basic/help"))(
                    client,
                    msg
                );
                break;

            case ".m":
                await require(path.join(
                    __dirname,
                    "./Components/GroupChat/mentionParticipants"
                ))(client, msg, t);
                break;

            // case "@all":
            //     await require(path.join(
            //         __dirname,
            //         "./Components/GroupChat/mentionParticipants"
            //     ))(client, msg, t);
            //     break;

            // case "@admin":
            //     await require(path.join(
            //         __dirname,
            //         "./Components/GroupChat/mentionParticipants"
            //     ))(client, msg, t);
            //     break;

            case ".p":
                await require(path.join(
                    __dirname,
                    "./Components/GroupChat/adminPromote"
                ))(client, msg);
                break;

            case ".d":
                await require(path.join(
                    __dirname,
                    "./Components/GroupChat/adminDemote"
                ))(client, msg);
                break;

            case ".a":
                let { Gspread } = require(path.join(
                    __dirname,
                    "./Components/Templates/gspreadClass"
                ));
                await require("./Components/GroupChat/membersAdd")(
                    client,
                    msg,
                    t,
                    Gspread
                );
                break;

            case ".r":
                await require(path.join(
                    __dirname,
                    "./Components/GroupChat/membersRemove"
                ))(client, msg);
                break;

            case ".y":
                await require(path.join(
                    __dirname,
                    "./Components/Features/ytDownload"
                ))(client, msg, t, MessageMedia);
                break;

            case ".z":
                await require(path.join(
                    __dirname,
                    "./Components/GroupChat/sendGrpMessageMembers"
                ))(client, msg, t);
                break;

            case ".s":
                await require(path.join(
                    __dirname,
                    "./Components/Features/sticker"
                ))(client, msg, t);
                break;

            case ".run":
                await require(path.join(__dirname, "./Components/Basic/reRun"))(
                    client,
                    msg,
                    MessageMedia
                );
                break;
        }

        // case ".e":
        //     await require("./Components/Features/destroy")(client,msg,t);
        //     break;

        // if (vars.all) {
        //     switch (v) {
        //     }

        if (msg.fromMe) {
            //message sent by owner

            switch (v) {
                case ".l":
                    await require(path.join(
                        __dirname,
                        "./Components/Basic/listAllGrps"
                    ))(client, msg, t);
                    break;

                case ".b":
                    await require(path.join(
                        __dirname,
                        "./Components/Basic/sendBulk"
                    ))(client, msg, MessageMedia, t);
                    break;
            }
        }
    } catch (e) {
        console.log(e);
    }
};
