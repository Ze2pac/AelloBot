const Discord = require('discord.js');
const Conf = require('../../config.json');
const db = require('quick.db');
exports.run = async (client, message, args) => {
    let m = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.has(Conf.Authority.WarnHammer)) return msg.reply('Bu komutu kullanmak içn yeterli/gerekli yetkiye sahip değilsin.').then(m => m.delete({ timeout: 5000 }))
    if (m.id === client.user.id) return message.reply('Kendimi uyaramam')
    if (m.id === message.author.id) return message.reply('Kendini uyaramazsın.')
    if (message.member.roles.highest.position <= m.roles.highest.position) return message.reply('Bu kişiyi uyaramazsın.')


    const ceza1 = Conf.Warn.CezaSure1;
    const ceza2 = Conf.Warn.CezaSure2;
    const ceza3 = Conf.Warn.CezaSure3;
    const ceza4 = Conf.Warn.CezaSure4;
    const ceza5 = Conf.Warn.CezaSure5;

    let sebep = args.slice(1).join(' ');

    if (args[0] === 'yardım' || args[0] === 'help') {
        message.channel.send(new Discord.MessageEmbed().setTitle('Warn/Uyarı Komutları').addField(`${Conf.Client.Prefix ? Conf.Client.Prefix : '<prefix>'}warn <kişi>`, 'Belirtilen üyeyi uyarır ve beliri uyarı sayılarına ulaşılırsa cezalandırılır.')
            .addField(`${Conf.Client.Prefix ? Conf.Client.Prefix : '<prefix>'}warn kontrol <kişi / kişi IDsi>   //   ${Conf.Client.Prefix ? Conf.Client.Prefix : '<prefix>'}warn sorgu <kişi / kişi IDsi>`, 'Belirtilen üyenin uyarı bilgilerini görüntüler')
            .addField(`${Conf.Client.Prefix ? Conf.Client.Prefix : '<prefix>'}warn ekle`, 'Bir üyenin aktif uyarı sayısını düzenlersiniz. \n\n __**Örnek:**__ \n\n `warn ekle <kişi> 5` \n\n `warn ekle <kişi> -5` \n\n __NOT:__ Yaptığınız düzenlemeler ilgili üyeye DM üzerinden bildirilecektir.')
            .addField(`${Conf.Client.Prefix ? Conf.Client.Prefix : '<prefix>'}warn sıfırla   //   ${Conf.Client.Prefix ? Conf.Client.Prefix : '<prefix>'}warn sıfırla <kişi>`, 'Eğer sıfırladan sonra üye belirtilirse üyenin aktif uyarı verilerini sıfırlar. Eğer `sıfırla tümü` yazılırsa bütün sunucunun aktif uyarı verileri temizlenir.').setColor('2F3136').setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png').setThumbnail('https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))
    } else if (args[0] === 'kontrol' || args[0] === 'sorgu') {
        if (!m) m = message.member
        let size = db.get(`warnSize.${message.guild.id}.${m.id}`)
        message.channel.send(new Discord.MessageEmbed().addField('Aktif Uyarı Sayısı', `${size ? size : '0'}`).setColor('2F3136').setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png').setThumbnail(m.user.avatarURL({ size: 2048, dynamic: true })))

    } else if (args[0] === 'ekle') {

        if (!m) return message.reply('Lütfen uyarı ekleyeceğiniz üyeyi belirtiniz.\n`warn ekle <kişi> <değer> (sayının başına "-" işareti getirerek uyarı azaltılabilir.)`').then(m => m.delete({ timeout: 7000 }));
        if (!args[2]) return message.reply('Lütfen bir değer giriniz.').then(m => m.delete({ timeout: 3000 }));
        if (isNaN(args[2])) return message.reply('Lütfen geçerli bir değer giriniz. Değer içerisinde rakamdan başka bir karakter olmamalıdır.').then(m => m.delete({ timeout: 6000 }));
        if (args[2] > 10 || args[2] < -10) return message.reply('Değer `-10 ~ 10` arasında olmalıdır.').then(m => m.delete({ timeout: 4000 }));

        {
            await db.add(`warnSize.${m.id}`, args[2])
            message.channel.send(`${m} kişisine \`${args[2]}\` uyarı eklendi.`);
            m.send(new Discord.MessageEmbed().setTitle(`Uyarıları Bilgileriniz Düzenlendi`).addField('Düzenleyen Yetkili:', `<@${message.author.id}> (${message.author.id})`).addField('Eklenen Değer:', args[2]).setColor('2F3136').setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'));
            client.channels.cache.get(Conf.Channels.Log).send(new Discord.MessageEmbed().setTitle(`${m.user.tag} Kişisinin Uyarı Bilgileri Düzenlendi`).addField('Düzenleyen Yetkili:', `<@${message.author.id}> (${message.author.id})`).addField('Eklenen Değer:', args[2]).setColor('2F3136').setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))
        } return

    } else if (args[0] === 'sıfırla') {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komutu kullanmak için `Yönetici` yetkisine sahip olmalısın.').then(m => m.delete({ timeout: 5000 }))
        if (m) {

            let old = await db.get(`warnSize.${m.id}`)
            if (!old) return message.reply('Bu üyenin aktif uyarı verisi bulunmamaktadır.')
            db.delete(`warnSize.${m.id}`)
            message.channel.send(new Discord.MessageEmbed().setTitle('İşlem Başarılı').setDescription(`${m} adlı üyenin uyarı verileri temizlendi. 
        Eski uyarı sayısı: ${old ? old : '0'}`).setColor('2F3136').setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))
            client.channels.cache.get(Conf.Channels.Log).send(new Discord.MessageEmbed().setTitle(`${m.user.tag} Kişisinin Uyarı Bilgileri Sıfırlandı`).addField('Sıfırlayan Yetkili:', `<@${message.author.id}> (${message.author.id})`).addField('Eski Değer:', old).setColor('2F3136').setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))
            m.send(new Discord.MessageEmbed().setTitle(`Uyarıları Bilgileriniz Sıfırlandı`).addField('Sıfırlayan Yetkili:', `<@${message.author.id}> (${message.author.id})`).addField('Eski Değer:', old).setColor('2F3136').setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'));

        } else if (!m && args[1] === 'tümü' || args[1] === 'tüm') {
            if (message.member.id !== message.guild.owner.id) return message.reply('Bu komut yalnızca sunucu kurucusuna özeldir.')
            message.reply('\n__**ÖNEMLİ UYARI!**__ Eğer devam ederseniz uyarıya ait bütün aktif veriler silinecek ve __bu işlem geri alınamaz!__ \nEğer kabul ediyor ve işleme devam etmek istiyorsanız `evet` yazınız. Eğer işlemi durdurmak istiyorsanız `iptal` veya `hayır` yazınız.')
                .then(() => {
                    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000 });
                    collector.on('collect', message => {
                        if (message.content === "evet") {
                            db.delete(`warnSize.${message.guild.id}`)
                            message.channel.send("Bütün veriler başarıyla temizlendi.")
                            client.channels.cache.get(Conf.Channels.Log).send(new Discord.MessageEmbed().setTitle('UYARI VERİLERİ SIFIRLANDI!').addField('Sıfırlayan Yetkili:', `${message.author} (${message.author.id})`).setColor('2F3136').setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'));
                        } else if (message.content === "iptal" || message.content === 'hayır') {
                            message.channel.send("İşlem iptal edilmiştir.");
                        }
                    })
                })
        }
    } else {
        if (!m) return message.reply('Uyarılacak kişiyi belirtiniz.').then(m => m.delete({ timeout: 5000 }))
        if (!sebep) return message.reply('Sebep belirtmek zorunludur. Lütfen geçerli bir sebep belirtiniz.').then(m => m.delete({ timeout: 5000 }))
        db.add(`warnSize.${message.guild.id}.${m.id}`, 1)
        db.add(`warncv.${m.id}`, 1)
        await db.push(`cvWarn.${m.id}`, `Yetkili: <@${message.author.id}>   |   Sebep: \`${sebep}\``)

        let size = db.get(`warnSize.${message.guild.id}.${m.id}`)
        if (size === 2) {
            message.channel.send(new Discord.MessageEmbed().setColor('2F3136').setDescription(`${m} adlı kişi uyarıldı. Kişi uyarı sınırına gelmesi sebebiyle \`${ceza1} dakika\` boyunca susturuldu.`))

            await m.roles.add(Conf.Roles.Mute);
            await m.roles.remove(Conf.Roles.Member);

            setTimeout(async () => {
                await m.roles.add(Conf.Roles.Member);
                await m.roles.remove(Conf.Roles.Mute);
                client.channels.cache.get(Conf.Channels.Log).send(new Discord.MessageEmbed().setColor('2F3136').setDescription(`${m} Kişisinin uyarı sebepli aldığı ceza süresi dolmuştur.`))
            }, ceza1 * 60 * 1000);

        } else if (size === 5) {
            message.channel.send(new Discord.MessageEmbed().setColor('2F3136').setDescription(`${m} adlı kişi uyarıldı. Kişi uyarı sınırına gelmesi sebebiyle \`${ceza2} dakika\` boyunca susturuldu.`))

            await m.roles.add(Conf.Roles.Mute);
            await m.roles.remove(Conf.Roles.Member);

            setTimeout(async () => {
                await m.roles.add(Conf.Roles.Member);
                await m.roles.remove(Conf.Roles.Mute);
                client.channels.cache.get(Conf.Channels.Log).send(new Discord.MessageEmbed().setColor('2F3136').setDescription(`${m} Kişisinin uyarı sebepli aldığı ceza süresi dolmuştur.`).setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))
            }, ceza2 * 60 * 1000);

        } else if (size === 7) {
            message.channel.send(new Discord.MessageEmbed().setColor('2F3136').setDescription(`${m} adlı kişi uyarıldı. Kişi uyarı sınırına gelmesi sebebiyle \`${ceza3} dakika\` boyunca susturuldu.`).setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))

            await m.roles.add(Conf.Roles.Mute);
            await m.roles.remove(Conf.Roles.Member);

            setTimeout(async () => {
                await m.roles.add(Conf.Roles.Member);
                await m.roles.remove(Conf.Roles.Mute);
                client.channels.cache.get(Conf.Channels.Log).send(new Discord.MessageEmbed().setColor('2F3136').setDescription(`${m} Kişisinin uyarı sebepli aldığı ceza süresi dolmuştur.`).setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))
            }, ceza3 * 60 * 1000);

        } else if (size === 10) {
            message.channel.send(new Discord.MessageEmbed().setColor('2F3136').setDescription(`${m} adlı kişi uyarıldı. Kişi uyarı sınırına gelmesi sebebiyle \`${ceza4} dakika\` boyunca susturuldu.`).setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))

            await m.roles.add(Conf.Roles.Mute);
            await m.roles.remove(Conf.Roles.Member);

            setTimeout(async () => {
                await m.roles.add(Conf.Roles.Member);
                await m.roles.remove(Conf.Roles.Mute);
                client.channels.cache.get(Conf.Channels.Log).send(new Discord.MessageEmbed().setColor('2F3136').setDescription(`${m} Kişisinin uyarı sebepli aldığı ceza süresi dolmuştur.`).setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))
            }, ceza4 * 60 * 1000);

        } else if (size >= 11) {
            message.channel.send(new Discord.MessageEmbed().setColor('2F3136').setDescription(`${m} adlı kişi uyarıldı. Kişi uyarı sınırına gelmesi sebebiyle \`${ceza5} dakika\` boyunca susturuldu.`).setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))

            await m.roles.add(Conf.Roles.Mute);
            await m.roles.remove(Conf.Roles.Member);

            setTimeout(async () => {
                await m.roles.add(Conf.Roles.Member);
                await m.roles.remove(Conf.Roles.Mute);
                client.channels.cache.get(Conf.Channels.Log).send(new Discord.MessageEmbed().setColor('2F3136').setDescription(`${m} Kişisinin uyarı sebepli aldığı ceza süresi dolmuştur.`).setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))
            }, ceza5 * 60 * 1000);

        } else {
            message.channel.send(new Discord.MessageEmbed().setColor('2F3136').setDescription(`${m} adlı kişi uyarıldı.`).setFooter('Aello Warn Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'))

        }
    }
}

exports.conf = {
    aliases: ['uyar', 'uyarı'],
    permLevel: 0
};

exports.help = {
    name: 'warn',
};