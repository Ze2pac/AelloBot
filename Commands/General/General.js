const { DiscordAPIError } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komut Adminlere özeldir.');
  if (args[0] === 'register' || args[0] === 'kayıt' || args[0] === 'kayıtsistemi' || args[0] === 'kayıtsy') {
    const reg = db.get(`regsy.${message.guild.id}`)
    if (!reg) {
      db.set(`regsy.${message.guild.id}`, 'on')
      message.channel.send('Kayıt Sistemi Aktif Edildi!')

    } else if (reg) {
      db.delete(`regsy.${message.guild.id}`)
      message.channel.send('Kayıt Sistemi Devre Dışı Bırakıldı!')

    }
  } else if (args[0] === 'övgü' || args[0] === 'övgü-sistemi') {
    const ovgu = db.get(`ovgusistemi`)
    if (!ovgu) {
      db.set(`ovgusistemi`, 'on')
      message.channel.send('Övgü Sistemi Aktif Edildi!')
    } else if (ovgu) {
      db.delete(`ovgusistemi`)
      message.channel.send('Övgü Sistemi Devre Dışı Bırakıldı!')
    }
  } else if (args[0] === 'tag' || args[0] === 'tag-sistemi') {
    const tag = db.get(`tag.${message.guild.id}`)
    if (!tag) {
      db.set(`tag.${message.guild.id}`, 'on')
      message.channel.send('Tag Sistemi Aktif Edildi!')
    } else if (tag) {
      db.delete(`tag.${message.guild.id}`)
      message.channel.send('Tag Sistemi Devre Dışı Bırakıldı!')
    }
  } else if (args[0] === 'karşılama' || args[0] === 'hg') {
    const hg = db.get(`hosgeldin.${message.guild.id}`)
    if (!hg) {
      db.set(`hosgeldin.${message.guild.id}`, 'on')
      message.channel.send('Karşılama Sistemi Aktif Edildi!')
    } else if (hg) {
      db.delete(`hosgeldin.${message.guild.id}`)
      message.channel.send('Karşılama Sistemi Devre Dışı Bırakıldı!')
    }
  } else if (args[0] === 'davet' || args[0] === 'invite') {
    const hg = db.get(`davet.${message.guild.id}`)
    if (!hg) {
      db.set(`davet.${message.guild.id}`, 'on')
      message.channel.send('Davet Sistemi Aktif Edildi!')
    } else if (hg) {
      db.delete(`davet.${message.guild.id}`)
      message.channel.send('Davet Sistemi Devre Dışı Bırakıldı!')
    }
  } else if (args[0] === 'istatistik' || args[0] === 'stat' || args[0] === 'statistics') {
    const hg = db.get(`statistics.table.${message.guild.id}`)
    if (!hg) {
      db.set(`statistics.table.${message.guild.id}`, 'on')
      message.channel.send('Davet Sistemi Aktif Edildi!')
    } else if (hg) {
      db.delete(`statistics.table.${message.guild.id}`)
      message.channel.send('Davet Sistemi Devre Dışı Bırakıldı!')
    }
  } else {
    var inv = db.get(`davet.${message.guild.id}`)
    var ovgu = db.get(`ovgusistemi`)
    var tag = db.get(`tag.${message.guild.id}`)
    var hg = db.get(`hosgeldin.${message.guild.id}`)
    var stat = db.get(`statistics.table.${message.guild.id}`)

    if (ovgu) ovgu = 'AKTİF!'
    if (!ovgu) ovgu = 'DEVRE DIŞI!'
    if (stat) stat = 'AKTİF!'
    if (!stat) stat = 'DEVRE DIŞI!'
    if (inv) inv = 'AKTİF!'
    if (!inv) inv = 'DEVRE DIŞI!'
    if (tag) tag = 'AKTİF!'
    if (!tag) tag = 'DEVRE DIŞI!'
    if (hg) hg = 'AKTİF!'
    if (!hg) hg = 'DEVRE DIŞI!'

    message.channel.send(new Discord.MessageEmbed().setAuthor('Genel Sistemler').setColor('2F3136').setFooter('Aello Guard Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png').setThumbnail('https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')
      .addField('Kayıt Sistemi', hg, true).addField('Övgü Sistemi', ovgu, true).addField('İstatistik Sistemi', stat, true).addField('Tag Sistemi', tag, true).addField('\u200B', '\u200B', true).addField('Invite Manager', inv, true).addField('\u200B', '\u200B', true)
      .setDescription('`.genel <sistem> / .sistem <sistem>` komutları ile koruma sistemlerini kullanabilirsiniz.'))
  }
}

exports.conf = {
  aliases: ['sistem', 'system'],
  permLevel: 0
};

exports.help = {
  name: 'genel',
};