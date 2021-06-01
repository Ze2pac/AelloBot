const { DiscordAPIError } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
const Config = require('../../config.json')
exports.run = async (client, message, args) => {
const embed = new Discord.MessageEmbed().setTitle(`${client.user.username} Komut Bilgileri`).setColor('2F3136').setThumbnail('https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png').setFooter('Developed By Aello', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')
message.channel.send(embed.addField('Genel Komutlar', `
\`${Config.Client.Prefix}general\` / \`${Config.Client.Prefix}sistem\` > Genel sistemler hakkında bilgi verir.
\`${Config.Client.Prefix}guard\` / \`${Config.Client.Prefix}koruma\` / \`${Config.Client.Prefix}ayar\` > Koruma sistemleri hakkında bilgi verir.
\`${Config.Client.Prefix}help\` / \`${Config.Client.Prefix}yardım\` > Komutlar hakkında bilgi verir (bu komut).
\`${Config.Client.Prefix}invites\` / \`${Config.Client.Prefix}davetlerim\` > Kişinin davetleri hakkında bilgi verir.
\`${Config.Client.Prefix}invites bonus\` > Bir üyeye bonus davet ekler. Bu komut adminlere özeldir.`)
.addField('Kayıt Komutları', `
\`${Config.Client.Prefix}erkek\` / \`${Config.Client.Prefix}e\` > Bir üyeyi erkek formatında kayıt eder.
\`${Config.Client.Prefix}kadın\` / \`${Config.Client.Prefix}k\` > Bir üyeyi kadın formatında kayıt eder.
\`${Config.Client.Prefix}kayit\` / \`${Config.Client.Prefix}kayıt\` > Bir üyeyi normal üye formatında kayıt eder.
\`${Config.Client.Prefix}kayıt-info\` / \`${Config.Client.Prefix}kayit-info\` > Bir üyenin kayıt edilme geçmişini görüntüler.`)
.addField('Mod Komutları', `
\`${Config.Client.Prefix}ban\` > Bir üyeyi sunucuda yasaklar.
\`${Config.Client.Prefix}unban\` > Yasaklı bir üyenin yasağını kaldırır.
\`${Config.Client.Prefix}mute\` > Bir üyeyi sunucuda süreli oalrak susturur.
\`${Config.Client.Prefix}unmute\` > Susturulmuş bir üyenin cezasını kaldırır.
\`${Config.Client.Prefix}vmute\` > Bir üyeyi sesli kanallarda süreli susturur.
\`${Config.Client.Prefix}vunmute\` > Sesli kanallarda susturulmuş bir üyenin cezasını kaldırır.
\`${Config.Client.Prefix}jail\` > Bir üyenin tüm rollerini alıp jaile atar.
\`${Config.Client.Prefix}unjail\` > Jaile atılmış bir üyenin cezasını kaldırır.
\`${Config.Client.Prefix}warn\` > Bir üyeyi uyarır (${Config.Client.Prefix}warn yardım).
\`${Config.Client.Prefix}sicil\` > Bir üyenin sicil bilgilerini gösterir.
\`${Config.Client.Prefix}sil / ${Config.Client.Prefix}purge\` > Belirlenen miktarda mesajı kanaldan siler.`))
}

exports.conf = {
  aliases: ['help', 'y'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
};