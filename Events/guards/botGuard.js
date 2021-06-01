const Config = require('../../config.json');
const db = require('quick.db')
const Discord = require('discord.js')

module.exports = async member => {
    const client = member.client;
    let entry = await member.guild.fetchAuditLogs({ type: 'BOT_ADD' }).then(audit => audit.entries.first());
    let yetkili = await member.guild.members.cache.get(entry.executor.id);
    const botGuard = db.fetch(`botGuard.${member.guild.id}`)
    if (botGuard) {
        if (member.user.bot) {
            await member.ban({ reason: 'BotGuard Sy.' })
            try {
                await yetkili.kick('BotGuard Sy.')
                client.channels.cache.get(Config.Channels.Log).send(new Discord.MessageEmbed().setTitle('BotGuard').setColor('2F3136').setFooter('Aello Guard Sy.')
                    .setDescription(`__Sunucuya bot sokuldu.
                    Botu banladım, botu sokan kişiyi attım.__
                    
                    **Botu sokan:** ${yetkili}
                    **Bot:** ${member}`));
            } catch (e) {
                client.channels.cache.get(Config.Channels.Log).send(new Discord.MessageEmbed().setTitle('BotGuard').setColor('2F3136').setFooter('Aello Guard Sy.')
                    .setDescription(`__Sunucuya bot sokuldu.
                    Botu banladım, botu sokan kişiyi atmaya yetkim yetersiz.__
                    
                    **Botu sokan:** ${yetkili}
                    **Bot:** ${member}`));
            }

        }
    } else if (!botGuard) {
        if (member.user.bot) {
            await client.channels.cache.get(Config.Channels.Log).send(new Discord.MessageEmbed().setTitle('**__DİKKAT!__**').setColor('2F3136').setFooter('Aello Guard Sy.')
                .setDescription(`**__Sunucuya bot sokuldu ve BotGuard Sistemi aktif değil!__
    
            Botu sokan: ${yetkili}
            Bot: ${member}**`))
        }

    }

}