/* Copyright (C) 2022 Sourav KL11.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Raganork MD - Sourav KL11
*/
const fancy = require('./misc/fancy');
require('../main').Module({
     pattern: 'fancy ?(.*)',
     fromMe: require('../config').MODE == 'private',
     use: 'פרודוקטיביות',
     desc: '(אנגלית) יוצר גופני טקסט מיוחדים'
 }, (async (message, match) => {
     if (!match[1] && !message.reply_message.message) return await message.sendReply('השב לטקסט או הקלד טקסט אחרי פקודה עם קוד הפונט \n_דוגמה: .fancy 10 Hello_\n                      .fancy Hello world\n                      .fancy <reply> 13\n\n'+String.fromCharCode(8206).repeat(4001)+fancy.list('Text here',fancy));
    const id = match[1].match(/\d/g)?.join('')
     try {
        if (id === undefined && !message.reply_message){
            return await message.sendReply(fancy.list(match[1],fancy));
        }
        return await message.sendReply(fancy.apply(fancy[parseInt(id)-1],message.reply_message.text || match[1].replace(id,'')))    
    } catch {
        return await message.sendReply('_No such style :(_')
     }
 }))
