const Discord = require('discord.js');
const Conf = require('../../config.json');
const db = require('quick.db');
exports.run = async (client, message, args) => {
  let m = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!message.member.hasPermission('BAN_MEMBERS') && !message.member.roles.cache.has(Conf.Authority.BanHammer)) return message.reply('Bu komutu kullanmak içn yeterli yetkiye sahip değilsin.')
  if (!m) return message.reply('Banlanacak kişiyi etiketleyiniz.').then(m => m.delete({ timeout: 5000 }))
  if (m.id === client.user.id) return message.reply('Kendimi yasaklayamam')
  if (m.id === message.author.id) return message.reply('Kendini yasaklayamazsın.')
  if (message.member.roles.highest.position <= m.roles.highest.position) return message.reply('Bu kişiyi yasaklayamazsın.')
  try {
    await m.ban({ reason: `Banlayan Yetkili: ${message.author.tag} | Sebep: ${args.slice(1).join(' ') ? args.slice(1).join(' ') : 'SEBEP BELİRTİLMEDİ'}` })
      .then(message.channel.send(new Discord.MessageEmbed().setColor('2F3136').setDescription(`${m} adlı kişi banlandı.`)))
    client.channels.cache.get(Conf.Channels.Log).send(new Discord.MessageEmbed().setTitle(`${m.user.tag} adlı kişi banlandı!`).addField('Banlayan Yetkili', `${message.author} (${message.author.id})`).addField('Ban Sebebi:', args.slice(1).join(' ') ? args.slice(1).join(' ') : 'SEBEP BELİRTİLMEDİ'))

    db.add(`bancv.${m.id}`, 1);
    await db.push(`cvBan.${m.id}`, `Yetkili: <@${message.author.id}>   |   Sebep: \`${args.slice(1).join(' ') ? args.slice(1).join(' ') : 'Sebep Belirtilmedi.'}\``)
  } catch (error) {
    message.reply('Bir hata oluştu.')
    console.log(error)
  }
}
exports.conf = {
  aliases: ['yasakla', 'yasak'],
  permLevel: 0
};

exports.help = {
  name: 'ban',
};
