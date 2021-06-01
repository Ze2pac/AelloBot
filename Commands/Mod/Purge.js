const Discord = require('discord.js')
const Config = require('../../config.json');

const embed = new Discord.MessageEmbed().setTitle('Toplu Mesaj Silindi').setColor('2F3136').setFooter('Aello Purge Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')

exports.run = async (client, message, args) => {
if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Bu komutu kullanmak için yeterli yetkiye sahip değilsin.').then(m => m.delete({timeout: 5000}));
let n = args[0];
if (isNaN(n)) return message.reply('Silinecek mesaj miktarını girin (max: 100)').then(m => m.delete({timeout: 3000}));
if (n > 99 || n <= 0) return message.reply('Tek seferde en fazla `99`, en az `1` mesaj silinebilir.').then(m => m.delete({timeout: 4000}));

await (message.delete());
message.channel.bulkDelete(n)
let log = client.guilds.cache.get(Config.General.Server).channels.cache.get(Config.Channels.Log);
if (log) log.send(embed.setDescription(`
__Silinen miktar:__ **${n}**

__Silen kullanıcı:__ ${message.author}

__Kanal:__ ${message.channel}`))

}

exports.conf = {
    aliases: ['temizle', 'purge', 'clear'],
    permLevel: 0
};

exports.help = {
    name: 'sil',
};