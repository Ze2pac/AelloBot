const { DiscordAPIError } = require('discord.js')
const Discord = require('discord.js')
const db = require('quick.db')
const embed = new Discord.MessageEmbed().setFooter('Aello Invite Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png').setColor('2F3136')
exports.run = async (client, message, args) => {
    var inv = db.get(`davet.${message.guild.id}`)
    if (!inv) return message.reply('Davet sistemi devre dışıdır.')
    if (args[0] === 'bonus' || args[0] === 'ekle') {
        if (!message.member.hasPermission('ADMINISTRATOR')) return;
        let m = message.mentions.members.first() || message.guild.members.cache.get(args[1])
        let sayi = args[2]
        if (!m) return message.reply('Bu işlem için bir kullanıcı belirtiniz.').then(m => m.delete({timeout: 5000}))
        if (!sayi) return message.reply('Eklenecek miktarı belirtiniz.').then(m => m.delete({timeout: 5000}))
        if (isNaN(sayi)) return message.reply('Geçerli bir sayı belirtiniz.').then(m => m.delete({timeout: 5000}))
        await db.add(`invites.bonus.${m.id}`, sayi);
        await db.add(`invites.top.${m.id}`, sayi);
        message.channel.send(`${m} kişisine ${sayi} bonus davet eklendi.`)
    } else {
    let m;
    if (message.mentions.users.first()) m = message.mentions.users.first()
    else if (!message.mentions.users.first()) m = message.author;
    if (message.mentions.members.first()) mt = message.mentions.members.first().user.tag
    else if (!message.mentions.users.first()) mt = client.users.cache.get(message.author.id).tag

    let regular = db.get(`invites.regular.${m.id}`);
    let daily = db.get(`invites.daily.${m.id}`)
    if (daily) daily = daily.filter(a => (new Date().getTime() - a) < 24 * 60 * 60 * 1000).length;
    let fake = db.get(`invites.fake.${m.id}`);
    let bonus = db.get(`invites.bonus.${m.id}`);
    let top = db.get(`invites.top.${m.id}`);
    let cikan = db.get(`invites.active.${m.id}`)
    if (!cikan) cikan = 0
    let aktif = (top - cikan)
    message.channel.send(embed.setTitle(`${mt} Kişisinin Davet Bilgileri`)
        .setDescription(`Toplam **${top ? top : '0'}** (Aktif: **${aktif ? aktif : '0'}**) davete sahip! (**${regular ? regular : '0'}** gerçek, **${fake ? fake : '0'}** fake, **${daily ? daily : '0'}** günlük, **${bonus ? bonus : '0'}** bonus)`));
    }
}
exports.conf = {
    aliases: ['davetlerim', 'info', 'davet', 'invite'],
    permLevel: 0
};

exports.help = {
    name: 'invites',
};