const guard = (guard) => require(`./Events/guards/${guard}`)
const general = (general) => require(`./Events/general/${general}`)
const system = (sy) => require(`./Events/systems/${sy}`)
const control = (ct) => require(`./Events/control/${ct}`)
module.exports = client => {
    client.on('message', general('message'));
    client.on("ready", () => general("ready")(client));


    client.on('message', system('ovgusy'));
    client.on('userUpdate', system('TagRol'));
    client.on('guildMemberAdd', system('memberAdd'));



    client.on('message', guard('chatGuard'));
    client.on('messageUpdate', guard('chatGuard_2'));

    client.on('guildMemberUpdate', guard('nickGuard'));
    client.on('guildMemberAdd', guard('botGuard'));
    client.on('guildUpdate', guard('serverGuard'));
    client.on('channelDelete', guard('channelDelete'));

    client.on('ready', control('check'))
}
const InviteManager = require('./Events/inviteManager/inviteManager.js')
const Statistics  = require('./Events/systems/statisticsTable.js')