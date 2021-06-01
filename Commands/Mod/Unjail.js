const Discord = require('discord.js');
const Conf = require('../../config.json');
const db = require('quick.db');
exports.run = async (client, message, args) => {
    let m = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let sebep = args.slice(1).join(' ');

    if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.has(Conf.Authority.JailHammer)) return msg.reply('Bu komutu kullanmak içn yeterli/gerekli yetkiye sahip değilsin.').then(m => m.delete({ timeout: 5000 }))
    if (!m) return message.reply('Jaili kalkacak kişiyi belirtiniz.').then(m => m.delete({ timeout: 5000 }))
    if (m.id === client.user.id) return message.reply('Kendimi jailleyemem')
    if (m.id === message.author.id) return message.reply('Kendini jailleyemezsin.')

    if (!sebep) return message.reply('Bu işlemde sebep belirtmek zorunludur. Lütfen geçerli bir sebep belirtiniz.').then(m => m.delete({ timeout: 5000 }))
    if (!m.roles.cache.size === 2 && !m.roles.cache.has(Conf.Roles.Jail)) return message.reply('Bu kişi zaten Jailde değil.').then(m => m.delete({ timeout: 5000 }))

    message.channel.send('Bu üyenin jailini ne şekilde açmak istiyorsunuz? \n\nEğer sunucuya kayıtsız olarak cezayı kaldırmak istiyorsanız `kayıtsız`; \nSunucuya kayıtlı olarak cezayı kaldırmak istiyorsanız `kayıtlı` olarak cevap veriniz. __20 saniye içerisinde cevap verilmelidir__')
        .then(() => {
            const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id && !m.author.bot && m.author.id !== client.user.id, { max: 1, time: 20500 });

            collector.on('collect', async message => {

                if (message.content === "kayıtlı" || message.content === "kayitli") {

                    await db.add(`otherCV.${m.id}`, 1)
                    message.channel.send("Kullanıcının jaili sunucuya `kayıtlı` olacak şekilde kaldırıldı.")
                    await m.roles.set([Conf.Roles.Member]);
                    client.channels.cache.get(Conf.Channels.Log).send(new Discord.MessageEmbed().setTitle(m.user.tag + ' Kişisinin Jail Cezası Kaldırıldı').addField('Tip:', 'Sunucuya kayıtlı.').addField('Kaldıran Yetkili:', `${message.author} (${message.author.id})`).setColor('2F3136').setFooter('Aello Jail Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'));

                } else if (message.content === "kayıtsız" || message.content === 'kayitsiz') {

                    await db.add(`otherCV.${m.id}`, 1)
                    message.channel.send("Kullanıcının jaili sunucuya `kayıtsız` olacak şekilde kaldırıldı.");
                    await m.roles.set([Conf.Roles.Kayitsiz]);
                    client.channels.cache.get(Conf.Channels.Log).send(new Discord.MessageEmbed().setTitle(m.user.tag + ' Kişisinin Jail Cezası Kaldırıldı').addField('Tip:', 'Sunucuda kayıtsız.').addField('Kaldıran Yetkili:', `${message.author} (${message.author.id})`).setColor('2F3136').setFooter('Aello Jail Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png'));

                }
            })
        })
}

exports.conf = {
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'unjail',
};