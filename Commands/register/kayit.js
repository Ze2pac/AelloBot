const { DiscordAPIError } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
const moment = require('moment')
const Config = require('../../config.json')
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('MANAGE_ROLES') && !message.member.roles.cache.has(Config.Roles.Kayitli)) return message.reply('Yeterli yetkiye sahip değilsin.');

  let member = message.mentions.members.first();
  if (!member) return message.reply('Lütfen geçerli bir kullanıcı belirtiniz.')
  if (member.roles.cache.has(Config.Roles.Member)) return message.channel.send('Bu kullanıcı zaten kayıtlı.')
  if (args[1]) {
    try {
      await member.setNickname(args.slice(1).join(' '))
    } catch (error) {
      return message.channel.send('Bir hata oluştu, lütfen üyeye verilen adı kontrol ediniz.')
    }

  }
  await member.roles.add(Config.Roles.Member);
  await member.roles.remove(Config.Roles.Kayitsiz);
  db.add(`kayitsay.${message.author.id}`, 1)
  db.add(`kayituyesay.${member.id}`, 1)
  let sayi = db.fetch(`kayitsay.${message.author.id}`)

  db.push(`kayitinfo.${member.id}`, `${member} kişisini kayıt eden: ${message.author}
**Kayıt türü:** __Normal kayıt__ 
**Kayıt edilen isim:** __${args.slice(1).join(' ')}__
**Tarih:** __${moment(Date.now()).format("** HH.mm - DD.MM.YY **")}__`)

  message.channel.send(new Discord.MessageEmbed().setColor('2F3136').setTitle('Kayıt İşlemi Başarılı!').setDescription(`**Kayıt eden yetkili: ${message.author}**\n\n**Kayıt Edilen Üye: ${member}**`)
    .setFooter(`Toplam ${sayi ? sayi : '0'} Kaydı Var.`, 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))

  client.channels.cache.get(Config.Channels.KayitLog).send(new Discord.MessageEmbed().setColor('2F3136').setTitle('Kayıt İşlemi Yapıldı')
    .addField('Kayıt eden yetkili', `${message.author} | ${message.author.tag}`, true)
    .addField('Kayıt edilen üye', `${member} | ${member.user.tag}`, true)
    .setFooter(member.guild.name, 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))
}

exports.conf = {
  aliases: ['kayit'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt',
};