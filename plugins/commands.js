/* Copyright (C) 2022 Sourav KL11.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Raganork MD - Sourav KL11
*/
const {
    commands: commands,
    Module: Module
} = require("../main"), {
    MODE: MODE,
    HANDLERS: HANDLERS
} = require("../config"), {
    FancyRandom: FancyRandom,
    getListFromCommand: getListFromCommand,
    skbuffer: skbuffer
} = require("raganork-bot");
let w = "public" != MODE;
const readMore = String.fromCharCode(8206).repeat(4001);
function getCommands(){
return commands.map(x=>x?.pattern?.toString().match(/(\W*)([A-Za-zğüşıiöç1234567890 ]*)/)[2].trim())
}
function findCommand(command){
let found_command = commands.filter(x=>x?.pattern?.toString().match(/(\W*)([A-Za-zğüşıiöç1234567890 ]*)/)[2].trim() == command)[0]
if (!found_command) return false
return {
    command, ...found_command
}
}
Module({
    pattern: "מידע ?(.*)",
    fromMe: w,
    desc: "נותן מידע על פקודות"
 }, async (n, a) => {
    var e = "";
    if (a[1]) {
        let foundCommand = findCommand(a[1].trim())
        if (!foundCommand) return await n.sendReply("_אין פקודה כזו!_")
        let msgToBeSent_ = `_*פקודה:* ${foundCommand.command}_\n_*תיאור:* ${foundCommand.desc}_\n_*פקודת מנהל:* ${foundCommand.fromMe}_`
        if (foundCommand.use) msgToBeSent_+=`\n_*סוג:* ${foundCommand.use}_`
        if (foundCommand.usage) msgToBeSent_+=`\n_*שימוש:* ${foundCommand.usage}_`
        if (foundCommand.warn) msgToBeSent_+=`\n_*אזהרה:* ${foundCommand.warn}_`
        return await n.sendReply(msgToBeSent_)        
    } else return await n.sendReply("_צריך להזין פקודה, לדוגמה: .מידע insta_")
});    
        Module({
    pattern: "רשימה ?(.*)",
    fromMe: w,
    dontAddCommandList: true
}, async (n, a) => {
    var e = "";
    if (a[1]) {
        let foundCommand = findCommand(a[1].trim())
        if (!foundCommand) return await n.sendReply("_אין פקודה כזו!_")
        let msgToBeSent_ = `_*פקודה:* ${foundCommand.command}_\n_*תיאור:* ${foundCommand.desc}_\n_*פקודת מנהל:* ${foundCommand.fromMe}_`
        if (foundCommand.use) msgToBeSent_+=`\n_*סוג:* ${foundCommand.use}_`
        if (foundCommand.usage) msgToBeSent_+=`\n_*שימוש:* ${foundCommand.usage}_`
        if (foundCommand.warn) msgToBeSent_+=`\n_*אזהרה:* ${foundCommand.warn}_`
        return await n.sendReply(msgToBeSent_)        
    } else {
        commands.map(async n => {
            if (!n.dontAddCommandList && void 0 !== n.pattern) {
                try {
                    var a = n.pattern.toString().match(/(\W*)([A-Za-zğüşıiöç1234567890 ]*)/),
                        t = n.pattern.toString().match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2]
                } catch {
                    a = [n.pattern]
                }
                var r = "";
                r = /\[(\W*)\]/.test(HANDLERS) ? HANDLERS.match(/\[(\W*)\]/)[1][0] : ".", "" == n.desc && "" == !n.usage && "" == n.warn && (e += (a.length >= 3 ? r + t : n.pattern) + "\nExample:: " + n.usage + "\n\n"), "" == !n.desc && "" == n.usage && "" == n.warn && (e += (a.length >= 3 ? r + t : n.pattern) + "\n" + n.desc + " \n\n"), "" == n.desc && "" == n.usage && "" == !n.warn && (e += (a.length >= 3 ? r + t : n.pattern) + "\n" + n.warn + "\n\n"), "" == !n.desc && "" == !n.usage && "" == n.warn && (e += (a.length >= 3 ? r + t : n.pattern) + "\n" + n.desc + " \n" + "Example" + ": " + n.usage + "\n\n"), "" == !n.desc && "" == n.usage && "" == !n.warn && (e += (a.length >= 3 ? r + t : n.pattern) + "\n" + n.desc + " \n" + "Warning" + ": " + n.warn + "\n\n"), "" == n.desc && "" == !n.usage && "" == !n.warn && (e += (a.length >= 3 ? r + t : n.pattern) + "\n" + n.usage + "\n" + "Warning" + ": " + n.warn + "\n\n"), "" == n.desc && "" == n.usage && "" == n.warn && (e += (a.length >= 3 ? r + t : n.pattern) + "\n\n"), "" == !n.desc && "" == !n.usage && "" == !n.warn && (e += (a.length >= 3 ? r + t : n.pattern) + "\n" + n.desc + " \n" + "Example" + ": " + n.usage + "\n" + "Warning" + ": " + n.warn + "\n\n")
            }
        });
        var t = FancyRandom(e);
        await n.sendReply(t)
    }
});
module.exports = {getCommands};