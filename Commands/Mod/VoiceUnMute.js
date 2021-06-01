const Discord = require('discord.js');
const moment = require('moment');
moment.locale('tr');
const ms = require('ms');
const db = require('quick.db');
const vdb = new db.table("temp");
const Config = require('../../config.json');

const embed = new Discord.MessageEmbed().setColor('2F3136').setFooter('Aello Mute Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png');

exports.run = async (client, message, args) => {

    let m = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let r = args.slice(1).join(' ');

    if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.has(Config.Authority.MuteHammer)) return message.reply('Bu komutu kullanmak için yeterli yetkiye sahip değilsin.')
    if (!m) return message.reply('İşlem yapılacak üyeyi belirtiniz.').then(m => m.delete({ timeout: 3000 }));
    if (m.id === message.author.id) return message.reply('Kendi üzerinizde işlem yapamazsınız.').then(m => m.delete({ timeout: 3000 }));
    if (message.author.id !== message.guild.owner.id) { if (message.member.roles.highest.position <= m.roles.highest.position) return message.reply('Bu kişi üzerinde işlem yapmak için yeterli yetkiye sahip değilsin.').then(m => m.delete({ timeout: 3000 })); }
    if (m.id === message.guild.owner.id) return message.reply('Bu kişi üzerinde işlem yapamam.');
    if (!m.voice.channel) return message.reply('Bu üye henüz bir sesli odada değil.');
    if (!m.voice.serverMute) return message.reply('Bu kişi zaten susturulmamış.');
    if (!r) return message.reply('Sebep belirtiniz.').then(m => m.delete({ timeout: 3000 }));

    let log = client.channels.cache.get(Config.Channels.Log);

    {
        let vmute = vdb.get("tempVoiceMute") || [];
        vdb.set("tempVoiceMute", vmute.filter(x => x.id !== m.id));
        await m.voice.setMute(false)
        if (m.roles.cache.has(Config.Roles.VoiceMute)) m.roles.remove(Config.Roles.VoiceMute)
        message.channel.send('Kullanıcı Sesli Odalarda Susturulması Kaldırıldı.')
        log.send(embed.setTitle('Kullanıcı Sesli Odalarda Susturulması Kaldırıldı').setDescription(`Kaldırılan kullanıcı: ${m}
Kaldıran yetkili: ${message.author}
Sebep: \`${r}\``))

    }
}

exports.conf = {
    aliases: ['voiceunmute', 'voice-unmute'],
    permLevel: 0
};

exports.help = {
    name: 'vunmute',
};