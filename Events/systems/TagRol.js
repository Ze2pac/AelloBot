const Config = require('../../config.json');
const Discord = require('discord.js')
const db = require('quick.db')
module.exports = async (oldUser, newUser) => {

    let Tag = Config.Tag.Symbol
    let Tag2 = Config.Tag.Symbol2
    if (oldUser.bot || newUser.bot || (oldUser.username == newUser.username)) return
    let guild = oldUser.client.guilds.cache.get(Config.General.Server);
    var tag = db.fetch(`tag.${guild.id}`)
    if (tag) {
        let member = guild.members.cache.get(newUser.id)
        let taglı = await guild.members.cache.filter(m => !m.bot).filter(member => member.user.username.includes(Tag) || member.user.username.includes(Tag2)).size;

        if (!oldUser.username.includes(Tag && Tag2) && (newUser.username.includes(Tag) || newUser.username.includes(Tag2))) {
            member.roles.add(Config.Tag.Role)
            global.client.channels.cache.get(Config.Tag.Channel).send(new Discord.MessageEmbed().setDescription(`${newUser} tagımızı alarak bize katıldı. <@&${Config.Tag.Role}> Rolü verildi. Tagdaki toplam kişiler: **${taglı}**`).setColor('2F3136')
                .setFooter('Aello Tag Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))

        } else if ((oldUser.username.includes(Tag) || oldUser.username.includes(Tag2)) && !newUser.username.includes(Tag && Tag2)) {
            member.roles.remove(Config.Tag.Role)
            global.client.channels.cache.get(Config.Tag.Channel).send(new Discord.MessageEmbed().setDescription(`${newUser} tagımızı çıkardı. <@&${Config.Tag.Role}> Rolü alındı. Tagdaki toplam kişiler: **${taglı}**`).setColor('2F3136')
                .setFooter('Aello Tag Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))
        }
    }
}