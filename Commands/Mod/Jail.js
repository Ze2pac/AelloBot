const Discord = require('discord.js');
const Conf = require('../../config.json');
const db = require('quick.db');
exports.run = async (client, message, args) => {
    let m = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.has(Conf.Authority.JailHammer)) return message.reply('Bu komutu kullanmak içn yeterli/gerekli yetkiye sahip değilsin.').then(m => m.delete({ timeout: 5000 }))
    if (!m) return message.reply('Jaillenecek kişiyi belirtiniz.').then(m => m.delete({ timeout: 5000 }))
    if (message.member.roles.highest.position <= m.roles.highest.position) return message.reply('Bu kişiyi jaile atamazsın.')

    let sebep = args.slice(1).join(' ');
    if (!sebep) return message.reply('Sebep belirtmek zorunludur. Lütfen geçerli bir sebep belirtiniz.').then(m => m.delete({ timeout: 5000 }))
    if (m.roles.cache.size === 2 && m.roles.cache.has(Conf.Roles.Jail)) return message.reply('Bu kişi zaten Jailli.').then(m => m.delete({ timeout: 5000 }))
    try {
        await m.roles.set([Conf.Roles.Jail])
        message.channel.send(`${m} kişisi başarıyla jaillendi.`)
            .then(client.channels.cache.get(Conf.Channels.Log).send(new Discord.MessageEmbed().setTitle(`${m.user.tag} Adlı Kişi Jaile Atıldı!`).addField('Jaile atan yetkili', `${message.author} (\`${message.author.id}\`)`).addField('Sebep', `\`${sebep}\``).setColor('2F3136').setFooter('Aello Jail Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')))
        await db.add(`jailcv.${m.id}`, 1);
        await db.push(`cvJail.${m.id}`, `Yetkili: <@${message.author.id}>   |   Sebep: \`${sebep}\``)
    } catch (error) {
        message.channel.send('Bir hata oluştu.').then(m => m.delete({ timeout: 5000 }))
        console.log(error)
    }

}

exports.conf = {
    aliases: ['hapset'],
    permLevel: 0
};

exports.help = {
    name: 'jail',
};