require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const chalk = require('chalk')

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chat = async (teks, msg) => {

     const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${teks.replace("!ai", "")}.`,
        temperature: 0.9,
        max_tokens: 3500,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
    });
    msg.reply(`${response.data.choices[0].text.replace(/^[!,?,.,]/, "").trim()}`)

    let airesponse = (response.data.choices[0].text.replace(/^[!,?,.,]/, "").trim() > 30) ? `${response.data.choices[0].text.replace(/^[!,?,.,]/, "").trim().substring(0, 30)}...` : `${response.data.choices[0].text.replace(/^[!,?,.,]/, "").trim().substring(0, 30)}...`

    console.log(chalk.black(chalk.bgWhite('[ RESPONSE ]')), color(airesponse, 'turquoise'), chalk.magenta('From'), chalk.green("AI"))
}

module.exports = {
    chat
}