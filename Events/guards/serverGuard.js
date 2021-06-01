const db = require('quick.db')
const Config = require('../../config.json')
const Discord = require('discord.js')
module.exports = async (oldGuild, newGuild) => {
    const client = global.client;
    const guard = db.fetch(`guildGuard.${newGuild.id}`)
    if (!guard) return;
    let entry = await newGuild.fetchAuditLogs({ type: 'GUILD_UPDATE' }).then(audit => audit.entries.first());
    let yetkili = await newGuild.members.cache.get(entry.executor.id);
    let oldG = await oldGuild.iconURL({ dynamic: true, size: 2048 })
    if (oldGuild.iconURL({ dynamic: true, size: 2048 }) !== newGuild.iconURL({ dynamic: true, size: 2048 })) {
        //await yetkili.kick('Aello ServerGuard Sy.')
        await newGuild.setIcon(oldG); // DENENECEK
        await client.channels.cache.get(Config.Channels.Log).send(new Discord.MessageEmbed().setTitle('ServerGuard').addField('Sunucunun İkonu Değiştirildi!', `Değiştiren kullanıcı: ${yetkili} \n\n __Sunucunun ikonu eski ikon olarak tekrar ayarlandı.__`))
    }

    if (oldGuild.name !== newGuild.name) {
        if (yetkili.id === client.user.id || yetkili.id === yetkili.guild.owner.id) return;
        await newGuild.setName(oldGuild.name)
        await yetkili.kick('Aello ServerGuard Sy.')
        client.channels.cache.get(Config.Channels.Log).send(new Discord.MessageEmbed().setTitle('ServerGuard').addField('Sunucunun Adı Değiştirildi!', `Değiştiren kullanıcı: ${yetkili} \n Değiştirilen İsim: __${newGuild.name}__  \n\n Sunucunun adı eski adı olarak tekrar ayarlandı.`))
    };
}