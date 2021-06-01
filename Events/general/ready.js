const Config = require('../../config.json')
module.exports = (client) => {
    client.user.setActivity(Config.Client.Bot_Aktivite)
    console.log(`
    | Dev By Aello |
    | \`Ael!o#7276  |
    |  READY!      |
    `)
};
