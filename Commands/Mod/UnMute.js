const db = require('quick.db');
const tdb = new db.table("temp")
const Discord = require('discord.js')
const Config = require('../../config.json');

const embed = new Discord.MessageEmbed().setColor('2F3136').setFooter('Aello Mute Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')

exports.run = async (client, message, args) => {

    let m = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let r = args.slice(1).join(' ')
    let log = client.channels.cache.get(Config.Channels.Log)
    let mutes = tdb.get("tempMute") || [];

    if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.has(Config.Authority.MuteHammer)) return message.reply('Bu komutu kullanmak için yeterli yetkiye sahip değilsin.')
    if (!m) return message.reply('İŞlem yapılacak üye belirtiniz.').then(m => m.delete({ timeout: 3000 }));
    if (m.id === message.author.id) return message.reply('Kendi üzerinizde işlem yapamazsınız.').then(m => m.delete({ timeout: 3000 }));
    if (m.id === message.guild.owner.id) return message.reply('Bu kişi üzerinde işlem yapamam.');
    if (!m.roles.cache.has(Config.Roles.Mute))
        if (!r) return message.reply('Sebep belirtiniz.').then(m => m.delete({ timeout: 3000 }));

    {

        m.roles.remove(Config.Roles.Mute);
        tdb.set("tempMute", mutes.filter(x => x.id !== m.id));
        log.send(embed.setTitle('Kullanıcı Susturulması Elle Kaldırıldı').setDescription(`Kullanıcı: ${m}
Kaldıran yetkili: ${message.author}
Sebep: \`${r}\``))
        m.send(embed.setDescription(`**${message.guild.name} sunucusunda susturmanız kaldırıldı.**`))

    }
}

exports.conf = {
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'unmute',
};