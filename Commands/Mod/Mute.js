const Discord = require('discord.js');
const moment = require('moment');
moment.locale('tr');
const ms = require('ms');
const db = require('quick.db');
const qdb = new db.table('temp');
const Config = require('../../config.json');
const embed = new Discord.MessageEmbed().setColor('2F3136').setFooter('Aello Mute Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')

exports.run = async (client, message, args) => {

    let m = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let r = args.slice(2).join(' ')
    let t = args[1];

    if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.has(Config.Authority.MuteHammer)) return message.reply('Bu komutu kullanmak için yeterli yetkiye sahip değilsin.')
    if (!m) return message.reply('Susturulacak üye belirtiniz.').then(m => m.delete({ timeout: 3000 }));
    if (m.id === message.author.id) return message.reply('Kendi üzerinizde işlem yapamazsınız.').then(m => m.delete({ timeout: 3000 }));
    if (message.author.id !== message.guild.owner.id) { if (message.member.roles.highest.position <= m.roles.highest.position) return message.reply('Bu kişi üzerinde işlem yapmak için yeterli yetkiye sahip değilsin.').then(m => m.delete({ timeout: 3000 })); }
    if (m.id === message.guild.owner.id) return message.reply('Bu kişi üzerinde işlem yapamam.');
    if (!t) return message.reply('Süre belirtiniz.').then(m => m.delete({ timeout: 3000 }));
    if (!ms(args[1])) return message.reply('Geçerli bir süre belirtiniz. `1s = 1 saniye - 1m = 1 dakika - 1d = 1 gün`').then(m => m.delete({ timeout: 5000 }));
    if (!r) return message.reply('Sebep belirtiniz.').then(m => m.delete({ timeout: 3000 }));

    var tarih2 = ms(t)
    var tarih3 = Date.now() + tarih2
    let atılmaay = moment(Date.now() + 10800000).format("MM")
    let atılmagün = moment(Date.now() + 10800000).format("DD")
    let atılmasaat = moment(Date.now() + 10800000).format("HH:mm:ss")
    let bitişay = moment(tarih3).format("MM")
    let bitişgün = moment(tarih3).format("DD")
    let bitişsaat = moment(tarih3).format("HH:mm:ss")
    let muteatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    let mutebitiş = `${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}`
    let log = client.channels.cache.get(Config.Channels.Log)
    let ygunler = t.replace("h", " Saat").replace("m", " Dakika").replace("d", " Gün").replace("s", " Saniye");

    {

        await m.roles.add(Config.Roles.Mute || []).catch;
        qdb.push("tempMute", { id: m.id, bitis: Date.now() + ms(t) });
        db.add(`mutecv.${m.id}`, 1)
        await db.push(`cvMute.${m.id}`, `Yetkili: <@${message.author.id}>   |   Sebep: \`${r}\``)
        if (m.roles.cache.has(Config.Roles.Booster)) { m.roles.set([Config.Roles.Booster, Config.Roles.Mute]) } else { m.roles.set([Config.Roles.Mute]) }
        message.channel.send(`${m} kişisi \`${ygunler}\` boyunca susturuldu.`);
        log.send(embed.setTitle('Kullanıcı Susturuldu').setDescription(`Susturulan kullanıcı: ${m}
Susturan yetkili: ${message.author}
Sebep: \`${r}\`
Süre: \`${ygunler}\`
Ceza bitiş zamanı: \`${mutebitiş}\``))

        m.send(embed.setTitle(`${message.guild.name} Sunucusunda Susturuldun`).setDescription(`Susturulan kullanıcı: ${m}
Susturan yetkili: ${message.author}
Sebep: \`${r}\`
Süre: \`${ygunler}\`
Ceza bitiş zamanı: \`${mutebitiş}\``))

    }
};

exports.conf = {
    aliases: ['sustur'],
    permLevel: 0
};

exports.help = {
    name: 'mute',
};