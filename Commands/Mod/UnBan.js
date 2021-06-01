const Discord = require('discord.js');
const Conf = require('../../config.json');
const db = require('quick.db');
exports.run = async (client, message, args) => {
    let m = await client.users.fetch(args[0])
    if (!message.member.hasPermission('ADMINISTRATOR')) return msg.reply('Bu komutu kullanmak içn yeterli yetkiye sahip değilsin.')
    if (!m) return message.reply('Banı kalkacak kişiyi belirtiniz.').then(m => m.delete({ timeout: 5000 }))
    try {
        await message.guild.members.unban(m.id, { reason: `Yetkili: ${message.author.tag} | Sebep: ${args.slice(1).join(' ') ? args.slice(1).join(' ') : 'Sebep Belirtilmedi'}` }).catch()
        client.channels.cache.get(Conf.Channels.Log).send(new Discord.MessageEmbed().setTitle(`${m.user.tag} adlı kişinin banı kalktı!`).addField('Yasağı kaldıran yetkili:', `${message.author} (${message.author.id})`).setColor('2F3136').setFooter('Aello Jail Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))
        message.channel.send(`${m} kişisinin yasağı kaldırıldı.`)
        await db.add(`otherCV.${m.id}`, 1)

    } catch (error) {
        message.channel.send('Bir hata oluştu.').then(m => m.delete({ timeout: 5000 }))
        console.log(error)

    }
}

exports.conf = {
    aliases: ['yasak-kaldır'],
    permLevel: 0
};

exports.help = {
    name: 'unban',
};