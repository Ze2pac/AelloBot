const Discord = require('discord.js')
const Config = require('../../config.json')
const db = require('quick.db')
const embed = new Discord.MessageEmbed().setTitle('OTO-MOD UYARI').setColor('2F3136').setFooter('Aello NickGuard Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')
const embed2 = new Discord.MessageEmbed().setTitle('OTO-MOD UYARI').setColor('2F3136').setFooter('Aello NickGuard Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')
module.exports = async (oldMember, newMember) => {

    const client = newMember.client;
    var oldNick = oldMember.displayName;
    var newNick = newMember.displayName;
    let entry = await newMember.guild.fetchAuditLogs({ type: 'MEMBER_UPDATE' }).then(audit => audit.entries.first());
    let yetkili = await newMember.guild.members.cache.get(entry.executor.id);
    function cezalandir(mId, type) {
        let m = client.guilds.cache.get(Config.General.Server).members.cache.get(mId);
        let log = client.guilds.cache.get(Config.General.Server).channels.cache.get(Config.Channels.Log);
        let c = client.guilds.cache.get(Config.General.Server).members.cache.get(Config.Client.CID);
        if (type === 'warn') {
            if (m.roles.highest.position >= c.roles.highest.position || yetkili.id === yetkili.guild.owner.id) return;
            if (yetkili && Config.Word.Swear.some(a => !newNick.includes(a)) && yetkili.id !== m.id) {
                db.add(`nick.yetkili.${yetkili.id}`, 1)
                let yVeri = db.get(`nick.yetkili.${yetkili.id}`)
                if (yVeri >= 3) {
                    yetkili.guild.owner.send(new Discord.MessageEmbed().setTitle('OTO-MOD UYARI').setColor('2F3136').setFooter('Aello NickGuard Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')
                        .setDescription(`**${yetkili.guild.name}** adlı sunucunuzun yetkilisi olan \`${yetkili.user.tag}\` kişisi toplamda 3 kere üyelerin nickini sakıncalı bir nick olarak ayarlamıştır.`))
                    db.delete(`nick.yetkili.${yetkili.id}`)
                    yetkili.send(embed2.setDescription(`Bir kullanıcının adını sürekli sakıncalı olarak ayarladığınız için sunucu kurucusuna bildirildiniz.`))
                }
                m.setNickname(oldNick)
                yetkili.send(embed.setDescription(`Adını değiştirmeye çalıştığınız \`${oldMember.user.tag}\` kişisinin eski adında herhangi bir küfür tespit edilemedi.\nFakat koymuş olduğunuz \`${newNick}\` adında küfür tespit edildiği için kişinin adı eski haline çevrildi.`))
            } else {
                db.add(`nick.member.${m.id}`, 1);
                let mVeri = db.get(`nick.member.${m.id}`)
                if (mVeri >= 3) {
                    m.guild.owner.send(new Discord.MessageEmbed().setTitle('OTO-MOD UYARI').setColor('2F3136').setFooter('Aello NickGuard Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')
                        .setDescription(`**${yetkili.guild.name}** adlı sunucunuzun üyesi olan \`${m.user.tag}\` sunucu içerisinde nickini 3 kere küfürlü bir nick olarak düzenledi.`))
                    db.delete(`nick.member.${m.id}`)
                }
                m.setNickname('Adını Düzelt!')
                m.send(embed.setDescription(`${m.guild.name} sunucusunda küfür yasaktır.
                Sunucu içerisinde adınız \`'Adını Düzelt!'\` olarak düzenlendi. 
                Yasaklı nick kullanımına devam etmeniz halinde kurucuya direkt olarak bildirilecek.`));
                log.send(new Discord.MessageEmbed().setTitle('OTO-MOD UYARI').setColor('2F3136').setFooter('Aello NickGuard Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')
                    .setDescription(`${m} adlı üye sunucu içerisinde yasaklı nick kullandı. Üyenin nicki 'Adını Düzelt!' olarak ayarlandı.
                
                > Sakıncalı nick: \`${newNick}\``)
                )
            }
        }

        if (type === 'reklam') {
            m.roles.set([Config.Roles.Jail])
            m.setNickname('Adını Düzelt!')
            db.add(`jailcv.${m.id}`, 1);
            db.push(`cvJail.${m.id}`, `Yetkili: \`Sistem\`   |   Sebep: \`Sunucu Nickinde Reklam\``);
            m.send(`\`\`\`${m.guild.name} sunucusunda reklamlı nick kullanımı sebebiyle jaile atıldın.\nYasaklı Nick: ${newNick}\`\`\``);
            log.send(new Discord.MessageEmbed().setTitle('OTO-MOD UYARI').setColor('2F3136').setFooter('Aello NickGuard Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')
                .setDescription(`${m} adlı kullanıcı jaile atıldı

            > Sebep: \`Reklam içeren nick.\`
            > Yetkili: \`Sistem\`
            > Sakıncalı nick: \`${newNick}\``))
        }

        if (type === 'ailevi') {
            m.roles.set([Config.Roles.Jail])
            m.setNickname('Adını Düzelt!')
            db.add(`jailcv.${m.id}`, 1);
            db.push(`cvJail.${m.id}`, `Yetkili: \`Sistem\`   |   Sebep: \`Sunucu Nickinde Değerlere Hakaret\``);
            m.send(`\`\`\`${m.guild.name} sunucusunda değerlere hakaret içeren nick kullanımı sebebiyle jaile atıldın.\nYasaklı Nick: ${newNick}\`\`\``);
            log.send(new Discord.MessageEmbed().setTitle('OTO-MOD UYARI').setColor('2F3136').setFooter('Aello NickGuard Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')
                .setDescription(`${m} adlı kullanıcı jaile atıldı

                > Sebep: \`Değerlere hakaret içeren nick.\`
                > Yetkili: \`Sistem\`
                > Sakıncalı nick: \`${newNick}\``))
        }
    }

    const Swear = Config.Word.Swear;
    const Reklam = Config.Word.Reklam;
    const Ailevi = Config.Word.Ailevi;

    if (oldMember.displayName !== newMember.displayName) {
        var nick = db.fetch(`nickGuard.${message.guild.id}`);
        if (!nick) return;
        if (Swear.some(a => newMember.displayName.includes(a))) cezalandir(newMember.id, 'warn')
        if (Ailevi.some(a => newMember.displayName.includes(a))) cezalandir(newMember.id, 'ailevi')
        if (Reklam.some(r => newMember.displayName.includes(r))) cezalandir(newMember.id, 'reklam')
    }
}