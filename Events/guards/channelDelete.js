const Config = require('../../config.json')
const Discord = require('discord.js')
const db = require('quick.db')
const embed = new Discord.MessageEmbed().setColor('2F3136').setFooter('Aello ChannelGuard Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png')

module.exports = async channel => {
    const client = global.client;
    let entry = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(audit => audit.entries.first());
    let yetkili = await channel.guild.members.cache.get(entry.executor.id);
    var channelss = db.fetch(`channelGuard.${channel.guild.id}`)
    if (channelss) {
        await channel.clone({ reason: 'Aello ChannelGuard' })
            .then(async ch => {
                await ch.setPosition(channel.position)
                if (channel.parenteID) await ch.setParent(channel.parenteID)
                if (channel.type == "category") await channel.guild.channels.cache.filter(k => k.parentID == channel.id).forEach(x => x.setParent(ch.id));

                try {
                    await yetkili.kick('Aello ChannelGuard Sy.')
                    client.channels.cache.get(Config.Channels.Log).send(embed.setTitle('Kanal/Kategori Silindi').setDescription(`Silen kişi güvenlik amacıyla sunucudan kicklendi. Kanal eski ayarlarında tekrardan açıldı.
                       
                        __Yetkili:__ ${yetkili}
                        __Silinen Kanal (Adı):__ \`${channel.name}\`
                        __Yeni Açılan Kanal:__ <#${ch.id}>`))
                } catch (error) {
                    client.channels.cache.get(Config.Channels.Log).send(embed.setTitle('Kanal/Kategori Silindi').setDescription(`Kanal eski ayarlarında tekrardan açıldı. __Kanalı silen kişiye müdahale edemiyorum.__
                        
                        __Yetkili:__ ${yetkili}
                        __Silinen Kanal (Adı):__ \`${channel.name}\`
                        __Yeni Açılan Kanal:__ <#${ch.id}>`))
                };
            });
    };
};