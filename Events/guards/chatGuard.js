const Discord = require("discord.js");
const Config = require('../../config.json');
const db = require('quick.db');
const moment = require('moment');
const { Client, Util } = require('discord.js');
const jailRolu = [Config.Roles.Jail];
const kfrembed = new Discord.MessageEmbed().setColor('2F3136').setTitle('OTO-MOD Uyarı Mesajı!').setFooter('Aello ChatGuard Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png');
const embed = new Discord.MessageEmbed().setColor('2F3136').setTitle('OTO-MOD BİLDİRİSİ').setFooter('Aello ChatGuard Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png');
module.exports = async message => {
    function cezalandir(mId, tip, tip2) {
        let log = client.channels.cache.get(Config.Channels.Log);
        let m = client.guilds.cache.get(Config.General.Server).members.cache.get(mId);
        let c = client.guilds.cache.get(Config.General.Server).members.cache.get(Config.Client.CID);
        if (tip == 'jail') {
            message.delete();
            if (message.member.roles.highest.position >= c.roles.highest.position) return;
            m.roles.set(jailRolu);
            db.add(`jailcv.${m.id}`, 1);

            if (tip2 === 'ailevi') {
                db.push(`cvJail.${m.id}`, `Yetkili: \`Sistem\`   |   Sebep: \`Değerlere Hakaret\``);
                m.send(kfrembed.setDescription(`**${message.guild.name} Sunucusunda Jaile Atıldın**
                __Sebep:__ \`Değerlere Hakaret\`
                __Yetkili:__ \`Sistem\``));
                log.send(embed.setDescription(`${m} adlı kişi jaile atıldı.
                __Sebep:__ \`Değerlere Hakaret\`
                __Yetkili:__ \`Sistem\``));
            }

            if (tip2 === 'reklam') {
                ;
                db.push(`cvJail.${m.id}`, `Yetkili: \`Sistem\`   |   Sebep: \`Reklam\``);
                m.send(kfrembed.setDescription(`**${message.guild.name} Sunucusunda Jaile Atıldın**
                __Sebep:__ \`Reklam\`
                __Yetkili:__ \`Sistem\``));
                log.send(embed.setDescription(`${m} adlı kişi jaile atıldı.
                __Sebep:__ \`Reklam\`
                __Yetkili:__ \`Sistem\``));
            }
        }

        if (tip == 'delete') {
            message.delete();
            let kfrcontrol = db.get(`swearSize.${message.author.id}`);
            if (kfrcontrol === 1) {
                m.send(kfrembed.setDescription(`Hey! Küfür etmemelisin! 
                Uyarı seviyen: \`1\`
                Eğer küfür seviyen \`2\` olursa sunucuda susturulacaksın.`));
                log.send(embed.setDescription(`${m} adlı kişi küfür/hakaret içeren bir mesaj gönderdi.
                Mesaj silindi ve kişi uyarıldı.
                __Uyarı seviyesi:__ \`1\``))
            } else if (kfrcontrol >= 2) {
                m.send(kfrembed.setDescription(`Küfür/Hakaret sebebiyle \`5\` dakika boyunca susturuldun.`));
                log.send(embed.setDescription(`${m} adlı kişi küfür/hakaret içeren bir mesaj gönderdi.
                Mesaj silindi ve kişi 5 dakika boyunca susturuldu.
                __Uyarı seviyesi:__ \`2\``))
                m.roles.add(Config.Roles.Mute);
                setTimeout(() => {
                    m.roles.remove(Config.Roles.Mute);
                    db.delete(`swearSize.${message.author.id}`);
                }, 5 * 60 * 1000)
            }

            if (kfrcontrol >= 2) m.roles.add(Config.Roles.Mute);

        }
    }

    var chat = db.fetch(`chatGuard`);
    if (chat) {
        if (!message.channel.guild) return;
        if (message.channel.id === Config.Channels.PartnerKanali) return;
        let mm = message.author;
        const client = message.client;
        const ailevi = Config.Word.Ailevi;
        const reaküfürler = Config.Word.Swear;
        let content = await message.content.split(' ');
        if (message.author.bot) return;
        if (mm.id === message.guild.owner.id || message.member.hasPermission('ADMINISTRATOR')) return;
        if (message.channel.id === Config.Channels.PartnerKanali && mm.roles.cache.has(Config.Roles.Partnerci)) return;

        content.forEach(async kfr => {

            if (await ailevi.some(a => a === kfr)) cezalandir(message.author.id, 'jail', 'ailevi')
            else if (reaküfürler.some(a => a === kfr)) {
                await db.add(`swearSize.${message.author.id}`, 1);
                cezalandir(message.author.id, 'delete')
            };
        });

        const reklam = Config.Word.Reklam;
        if (reklam.some(gg => message.content.toLowerCase().includes(gg))) {
            cezalandir(message.author.id, 'jail', 'reklam')
        };
    };
};