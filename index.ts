import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const axios = require('axios')

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
})

client.on('ready', () => {
  console.log('The bot is ready')
})

client.on('messageCreate', async (message) => {
  if (message.content === 'check') {
    let getTransac = async () => {
      let response = await axios.get('https://safe-transaction.gnosis.io/api/v1/analytics/multisig-transactions/by-origin/')
      let transac = response.data
      return transac
    }
    let transacValue = await getTransac()
    console.log(transacValue)
    message.reply({
      content: `Here's your transaction \n ${transacValue[1]}`
    })
  }
})

client.login(process.env.TOKEN)
