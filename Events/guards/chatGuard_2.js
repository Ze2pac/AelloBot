const db = require('quick.db')
const Discord = require('discord.js')
const Config = require('../../config.json')
const ailevi = Config.Word.Ailevi;
const reaküfürler = Config.Word.Swear;
const jailRolu = [Config.Roles.Jail];
const kfrembed = new Discord.MessageEmbed().setColor('2F3136').setTitle('OTO-MOD Uyarı Mesajı!').setFooter('Aello ChatGuard Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png');
const embed = new Discord.MessageEmbed().setColor('2F3136').setTitle('OTO-MOD BİLDİRİSİ').setFooter('Aello ChatGuard Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png');
module.exports = async (oldMessage, newMessage) => {
    if (newMessage && oldMessage) {
        function cezalandir(mId, tip, tip2) {
            let log = client.channels.cache.get(Config.Channels.Log);
            let m = client.guilds.cache.get(Config.General.Server).members.cache.get(mId);
            let c = client.guilds.cache.get(Config.General.Server).members.cache.get(Config.Client.CID);
            if (tip == 'jail') {
                newMessage.delete();
                if (newMessage.member.roles.highest.position >= c.roles.highest.position) return;
                m.roles.set(jailRolu);
                db.add(`jailcv.${m.id}`, 1);

                if (tip2 === 'ailevi') {
                    db.push(`cvJail.${m.id}`, `Yetkili: \`Sistem\`   |   Sebep: \`Düzenlenen Mesajda Değerlere Hakaret\``);
                    m.send(kfrembed.setDescription(`**${newMessage.guild.name} Sunucusunda Jaile Atıldın**
                    __Sebep:__ \`Düzenlenen Mesajda Değerlere Hakaret\`
                    __Yetkili:__ \`Sistem\``));
                    log.send(embed.setDescription(`${m} adlı kişi jaile atıldı.
                    __Sebep:__ \`Düzenlenen Mesajda Değerlere Hakaret\`
                    __Yetkili:__ \`Sistem\``));
                };

                if (tip2 === 'reklam') {
                    db.push(`cvJail.${m.id}`, `Yetkili: \`Sistem\`   |   Sebep: \`Reklam\``);
                    m.send(kfrembed.setDescription(`**${newMessage.guild.name} Sunucusunda Jaile Atıldın**
                    __Sebep:__ \`Düzenlenen Mesajda Reklam\`
                    __Yetkili:__ \`Sistem\``));
                    log.send(embed.setDescription(`${m} adlı kişi jaile atıldı.
                    __Sebep:__ \`Düzenlenen Mesajda Reklam\`
                    __Yetkili:__ \`Sistem\``));
                };
            };

            if (tip == 'delete') {
                newMessage.delete();
                let kfrcontrol = db.get(`swearSize.${newMessage.author.id}`);
                if (kfrcontrol === 1) {
                    m.send(kfrembed.setDescription(`Hey! Küfür etmemelisin! 
                    Küfür seviyen: \`1\`
                    Eğer küfür seviyen \`2\` olursa sunucuda susturulacaksın.`));
                    log.send(embed.setDescription(`${m} adlı kişi bir mesajı küfür/hakaret içerikli olarak düzenledi.
                    Mesaj silindi ve kişi uyarıldı.
                    __Uyarı seviyesi:__ \`1\``));
                } else if (kfrcontrol >= 2) {
                    m.send(kfrembed.setDescription(`Küfür/Hakaret sebebiyle \`5\` dakika boyunca susturuldun.`));
                    m.roles.add(Config.Roles.Mute);
                    log.send(embed.setDescription(`${m} adlı kişi \`5\` dakika boyunca susturuldu.
                    __Sebep:__ \`Düzenlenen Mesajda Küfür/Hakaret\`
                    __Yetkili:__ \`Sistem\``));
                    setTimeout(() => {
                        m.roles.remove(Config.Roles.Mute);
                        db.delete(`swearSize.${newMessage.author.id}`);
                    }, 5 * 60 * 1000);
                };

                if (kfrcontrol >= 2) m.roles.add(Config.Roles.Mute);

            };
        };

        var chat = db.fetch(`chatGuard`);
        if (chat) {
        if (newMessage.channel.id === Config.Channels.PartnerKanali) return;
            if (oldMessage.content != newMessage.content) {
                let content = await newMessage.content.split(' ');
                content.forEach(async kfr => {
                    if (await ailevi.some(a => a === kfr)) cezalandir(newMessage.author.id, 'jail', 'ailevi');
                    if (await reaküfürler.some(a => a === kfr)) {
                        await db.add(`swearSize.${newMessage.author.id}`, 1);
                        cezalandir(newMessage.author.id, 'delete');
                    };
                });
                const reklam = Config.Word.Reklam;
                if (reklam.some(gg => newMessage.content.toLowerCase().includes(gg))) {
                    cezalandir(newMessage.author.id, 'jail', 'reklam')
                };
            };
        };
    };
};