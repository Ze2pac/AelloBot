const { DiscordAPIError } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

  if (args[0] === 'sıfırla') {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komutu kullanmak için yeterli yetkiye sahip değilsin.')
    if (!member) return message.reply('Bilgisini sıfırlamak istediğiniz kullanıcıyı etiketleyiniz.')
    db.delete(`kayitinfo.${member.id}`)
    db.delete(`kayituyesay.${member.id}`)
    message.reply('Başarılı.')
  } else {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!member) return message.reply('Bilgisini görmek istediğiniz kullanıcıyı etiketleyiniz.')
    let yapan = db.fetch(`kayitinfo.${member.id}`)
    let sayi = db.fetch(`kayituyesay.${member.id}`)
    if (yapan) yapan = yapan.map((yap, index) => `**${index + 1}:** ${yap ? yap : 'Kayıt bilgisi bulunmamakta.'}`)
    try {
      await message.channel.send(new Discord.MessageEmbed().setFooter(message.guild.name, 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')
        .setAuthor(`Toplam Kayıt olma sayısı: ${sayi ? sayi : '0'}`)
        .setDescription(yapan ? yapan : 'Herhangi bir veri bulunamadı.').setColor('BLACK'))
    } catch (error) {
      message.channel.send(yapan, { code: 'xl', split: true }).then(message.reply(member.user.tag + ' kişisinin toplam kayıt olma sayısı: **' + sayi + '**, (Bilgilerin bu formatta gönderilmesinin sebebi: Karakter sayısı yüksek.)'))
    }


  }
}
exports.conf = {
  aliases: ['kayit-info'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt-info',
};