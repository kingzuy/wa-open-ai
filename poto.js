require('dotenv').config();
const { MessageMedia } = require('whatsapp-web.js');
const { Configuration, OpenAIApi } = require("openai");
const chalk = require('chalk');

// Menambahkan pengecekan apakah ada input color atau tidak
const color = (text, color) => {
  return !color ? chalk.green(text) : chalk.keyword(color)(text);
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const poto = async (teks, msg) => {

    const user = msg.author || msg.from;

    const response = await openai.createImage({
        prompt: teks.replace("!img", ""),
        n: 1,
        size: "1024x1024",
    });

    const { data } = response.data;

    const imageUrl = data[0].url;
    
    if (imageUrl) msg.reply("Mohon di tunggu!");

    const media = await MessageMedia.fromUrl(imageUrl);
   
    msg.reply(media);

    console.log(chalk.black(chalk.bgWhite('[ RESPONSE ]')), color('Gambar telah di kirim', 'turquoise'), chalk.magenta('TO'), chalk.yellow(`[ +${user.replace('@g.us', '').replace('@c.us', '')} ]`));
}

module.exports = {
  poto
}
