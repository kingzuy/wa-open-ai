const qrcode = require('qrcode-terminal');
const {poto} = require('./poto')
const { Client, LocalAuth } = require('whatsapp-web.js');
const { chat } = require('./chat');
const chalk = require('chalk')

const client = new Client({
    authStrategy: new LocalAuth()
});


client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

client.on('message', async msg => {
    
    
    const teks = msg.body;
    pushname = msg.rawData.notifyName || "No Name"
    let argsLog = (teks.length > 30) ? `${teks.substring(0, 30)}...` : teks
    const groupName = msg.isGroup ? groupMetadata.subject : ''
    
    // console.log(msg)

    if (teks === '!help' || teks.startsWith('!img') || teks.startsWith('!ai')) {

        // console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ +${msg.author.replace('@c.us', '')} ]`))

        if (!msg.author) {
           console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ +${msg.from.replace('@g.us', '').replace('@c.us', '')} ]`))
        } else if (msg.author) {
            console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ +${msg.author.replace('@g.us', '').replace('@c.us', '')} ]`), chalk.blueBright('IN'), chalk.green("GROUP"))
        }

        if (teks === '!help') {
            msg.reply('Slamat datang di ChatBot\ncommand : \n!ai (pertanyaan)\n!img (kata kunci gambar)');
        }
    
        if (teks.startsWith('!img')) {
            await poto(teks, msg);
        }
        if (teks.startsWith('!ai')) {
            await chat(teks, msg);
        }
    
    }

});

client.initialize();