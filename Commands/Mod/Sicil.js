const Discord = require('discord.js');
const Conf = require('../../config.json');
const db = require('quick.db');
const embed = new Discord.MessageEmbed().setColor('2F3136').setFooter('Aello CV Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')
exports.run = async (client, message, args) => {
    let m = message.mentions.members.first() || message.guild.members.cache.get(args[1]) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id);
    if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.has(Conf.Authority.JailHammer)) return msg.reply('Bu komutu kullanmak içn yeterli/gerekli yetkiye sahip değilsin.').then(m => m.delete({ timeout: 5000 }))

    if (args[0] === 'ban' || args[0] === 'yasak') {
        if (!m) return message.reply('Sicilini görüntülemek istediğiniz kişiyi belirtiniz.').then(m => m.delete({ timeout: 5000 }))
        let sebepler = db.get(`cvBan.${m.id}`)
        if (sebepler) sebepler = sebepler.map((sebep, index) => `**${index + 1}:**  ${sebep ? sebep : 'Ban bilgisi bulunmamakta.'}`).join('\n')
        if (!sebepler) sebepler = 'Bu kişiye ait ban bilgisi bulunmamaktadır.'
        message.channel.send(embed.setDescription(sebepler).setTitle(`${m.user.tag} Kişisinin Ban Sicili Kaydı`))
    } else if (args[0] === 'voiceMute' || args[0] === 'voice-mute' || args[0] === 'voice' || args[0] === 'sesli' || args[0] === 'sesli-susturma' || args[0] === 'vmute') {
        if (!m) return message.reply('Sicilini görüntülemek istediğiniz kişiyi belirtiniz.').then(m => m.delete({ timeout: 5000 }))
        let sebepler = db.get(`cvVoiceMute.${m.id}`)
        if (sebepler) sebepler = sebepler.map((sebep, index) => `**${index + 1}:**  ${sebep ? sebep : 'Ban bilgisi bulunmamakta.'}`).join('\n')
        if (!sebepler) sebepler = 'Bu kişiye ait ban bilgisi bulunmamaktadır.'
        message.channel.send(embed.setDescription(sebepler).setTitle(`${m.user.tag} Kişisinin Ban Sicili Kaydı`))
    } else if (args[0] === 'mute' || args[0] === 'susturma') {
        if (!m) return message.reply('Sicilini görüntülemek istediğiniz kişiyi belirtiniz.').then(m => m.delete({ timeout: 5000 }))
        let sebepler = db.get(`cvMute.${m.id}`)
        if (sebepler) sebepler = sebepler.map((sebep, index) => `**${index + 1}:**  ${sebep ? sebep : 'Ban bilgisi bulunmamakta.'}`).join('\n')
        if (!sebepler) sebepler = 'Bu kişiye ait ban bilgisi bulunmamaktadır.'
        message.channel.send(embed.setDescription(sebepler).setTitle(`${m.user.tag} Kişisinin Ban Sicili Kaydı`))
    } else if (args[0] === 'jail') {
        if (!m) return message.reply('Sicilini görüntülemek istediğiniz kişiyi belirtiniz.').then(m => m.delete({ timeout: 5000 }))
        let sebepler = db.get(`cvJail.${m.id}`)
        if (sebepler) sebepler = sebepler.map((sebep, index) => `**${index + 1}:**  ${sebep ? sebep : 'Jail bilgisi bulunmamakta.'}`).join('\n')
        if (!sebepler) sebepler = 'Bu kişiye ait jail bilgisi bulunmamaktadır.'
        message.channel.send(embed.setDescription(sebepler).setTitle(`${m.user.tag} Kişisinin Jail Sicili Kaydı`))
    } else if (args[0] === 'warn' || args[0] === 'uyarı') {
        if (!m) return message.reply('Sicilini görüntülemek istediğiniz kişiyi belirtiniz.').then(m => m.delete({ timeout: 5000 }))
        let sebepler = db.get(`cvWarn.${m.id}`)
        if (sebepler) sebepler = sebepler.map((sebep, index) => `**${index + 1}:**  ${sebep ? sebep : 'Uyarı bilgisi bulunmamakta.'}`).join('\n')
        if (!sebepler) sebepler = 'Bu kişiye ait uyarı bilgisi bulunmamaktadır.'
        message.channel.send(embed.setDescription(sebepler).setTitle(`${m.user.tag} Kişisinin Uyarı Sicili Kaydı`))
    } else if (args[0] === 'yardım' || args[0] === 'help') {
        message.channel.send(embed.setThumbnail('https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png').addField(`${Conf.Client.Prefix}sicil <üye / üye id>`, 'Üyenin sicil kayıtlarına ait değerleri görüntüler.')
            .addField(`${Conf.Client.Prefix}sicil ban <üye / üye id`, 'Üyeye ait ban kayıtlarını görüntüler.')
            .addField(`${Conf.Client.Prefix}sicil jail <üye / üye id>`, 'Üyeye ait jail kayıtlarını görüntüler.')
            .addField(`${Conf.Client.Prefix}sicil warn <üye / üye id>`, 'Üyeye ait uyarı kayıtlarını görüntüler.')
            .addField(`${Conf.Client.Prefix}sicil mute <üye / üye id>`, 'Üyeye ait susturma kayıtlarını görüntüler.')
            .addField(`${Conf.Client.Prefix}sicil voice <üye / üye id>`, 'Üyeye ait susturma kayıtlarını görüntüler.'))
    } else {
        message.channel.send(embed.setTitle(`${m.user.tag}`).setThumbnail('https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png').setDescription(`**Ban Sayısı:** \`${db.get(`bancv.${m.id}`) ? db.get(`bancv.${m.id}`) : '0'}\`
    **Jail Sayısı:** \`${db.get(`jailcv.${m.id}`) ? db.get(`jailcv.${m.id}`) : '0'}\` 
    **Uyarı Sayısı:** \`${db.get(`warncv.${m.id}`) ? db.get(`warncv.${m.id}`) : '0'}\`
    **Mute Sayısı:** \`${db.get(`mutecv.${m.id}`) ? db.get(`mutecv.${m.id}`) : '0'}\`
    **Voice Mute Sayısı:** \`${db.get(`voicecv.${m.id}`) ? db.get(`voicecv.${m.id}`) : '0'}\`
    **Diğer Veriler:** \`${db.get(`otherCV.${m.id}`) ? db.get(`otherCV.${m.id}`) : '0'}\`
    
    Diğer veriler, unjail unban gibi verilerdir ve bu verilerin sicili sadece değer olarak tutulur.`))
    }

}
exports.conf = {
    aliases: ['cv'],
    permLevel: 0
};

exports.help = {
    name: 'sicil',
};