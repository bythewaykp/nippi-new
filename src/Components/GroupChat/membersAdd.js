let delay = (ms) => new Promise((res) => setTimeout(res, ms));

module.exports = addGrp = async (client, msg, t, Gspread) => {
    let chat = await require("../Templates/basicCheckGroupChat")(client, msg);
    // const chat = await msg.getChat()

    // var url = "https://hello-my.sharepoint.com/:w:/r/personal/";
    // var urlRegx = new RegExp(
    //     "(docs.google.com|(http|https))(://[A-Za-z]+-my.sharepoint.com)?",
    //     "i"
    // );
    // console.log(urlRegx.test(url));

    let from = msg.author || msg.from;
    let sender = await client.getContactById(from);

    if (chat) {
        console.log(
            `${t["main"]} called at Group : '${chat.name}' by ${
                sender.name || sender.pushname
            } aka ${sender.number}`
        );
        await msg.react("⚡");

        if (true) {
            let gspread = new Gspread(
                {
                    keyFile: "./src/c.json",
                    url: t,
                }
                // "https://docs.google.com/spreadsheets/d/1cqUBrhoUKcsWuTT8wm6DhZBG1QuMnrO89DoqAvygVgU/edit?usp=sharing"
            );

            let list = await gspread.getData();

            for (let i = 1; i < list.length; i++) {
                let name = list[i][0];
                let phone = list[i][1];

                try {
                    await chat.addParticipants([`91${phone}@c.us`]);
                    console.log(`Sl.No ${i} Added ${name} successfully`);
                } catch (e) {
                    console.log(`error adding ${i}`);
                }
                // console.log(name, phone);
                await delay(2000);
            }
        }

        // if (true) {
        //     console.log("\n --- url found ---\n");

        //     let doc = await gspread(t);
        //     // console.log(t['url']);
        //     let sheet = doc.sheetsByIndex[0];
        //     await sheet.loadCells("A1:C100");

        //     let end = 6;

        //     for (let i = 1; i < end; i++) {
        //         try {
        //             console.log(
        //                 `${sheet.getCell(i, 0).value} aka ${
        //                     sheet.getCell(i, 1).value
        //                 } was added`
        //             );
        //             // await chat.addParticipants([
        //             //     `${sheet.getCell(i, 1).value}@c.us`,
        //             // ]);
        //         } catch (e) {
        //             console.log(
        //                 `${sheet.getCell(i, 0).value} aka ${
        //                     sheet.getCell(i, 1).value
        //                 } error`
        //             );
        //         }
        //     }
        // }
        // else if (t["num"] != undefined) {
        //     let numlist = t["num"].split("\n");
        //     for (let i of numlist) {
        //         try {
        //             await chat.addParticipants([`${i}@c.us`]);
        //         } catch (e) {
        //             console.log(`error adding ${i}`);
        //         }
        //     }
        // }
    }

    // const arr = await csvread('../Files/add.csv')

    // const chat = await msg.getChat();

    // console.log(`${chat.name} triggered!`);

    // const list1=[]
    // var k =""
    // arr.forEach((x,i)=>{
    //     if(i){
    //         k = x[3]
    //         list2.push(`91${k.substring(k.length - 10)}@c.us`)
    //     }
    // })
    // // console.log(list2,chat);

    // try {
    //     await chat.addParticipants(list1);

    // } catch (err) {
    //     console.log(err);
    // }
};
