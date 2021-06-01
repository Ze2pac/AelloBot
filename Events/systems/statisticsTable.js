const client = global.client;
const Discord = require('discord.js')
const db = require('quick.db')
const Config = require('../../config.json')
client.on("ready", () => {

    setInterval(async (aello) => {
      if (!db.get(`statistics.table.${Config.General.Server}`)) return;
      let ch = client.guilds.cache.get(Config.General.Server).channels.cache.get(Config.Table.Channel);
      let m = await ch.messages.fetch(Config.Table.MessageId);
      let embed = new Discord.MessageEmbed().setTitle(`${m.guild.name} Güncel İstatistik`).setTimestamp().setFooter('Aello Table Sy.').setColor("2F3136");
      let textChannels = m.guild.channels.cache.filter(m => m.type == "text").size;
      let voiceChannels = m.guild.channels.cache.filter(c => c.type === 'voice');
      let bots = m.guild.members.cache.filter(m => m.user.bot).size;
      let count = 0
      for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
      let banlar = await m.guild.fetchBans().then(bans => bans.size).catch()
      embed.setDescription(`**Toplam Üye: ${m.guild.memberCount}\n\nAktif Üye: ${m.guild.members.cache.filter(uye => uye.presence.status !== "offline").size}\n\nÇevrimdışı Üye: ${m.guild.members.cache.filter(uye => uye.presence.status === "offline").size}**`+ `\n  \n ----------------------------------------------------------------`)
      embed.addField(`1 yıl içinde girenler:`, `${m.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 1000*60*60*24*365).size}`, true)
      embed.addField(`6 ay içinde girenler:`, `${m.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 1000*60*60*24*30*6).size}`, true)
      embed.addField(`1 ay içinde girenler:`, `${m.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 1000*60*60*24*30).size}`, true)
      embed.addField(`1 hafta içinde girenler:`, `${m.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 1000*60*60*24*7).size}`, true)
      embed.addField(`1 gün içinde girenler:`, `${m.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 1000*60*60*24*1).size}`, true)
      embed.addField(`12 saat içinde gelenler:`, `${m.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 1000*60*60*12).size}`, true)
      embed.addField(`5 saat içinde gelenler:`, `${m.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 1000*60*60*5).size}`, true)
      embed.addField(`1 saat içinde gelenler:`, `${m.guild.members.cache.filter(a => (new Date().getTime() - a.joinedTimestamp) < 1000*60*60).size}`, true)
      embed.addField(`Metin Kanalı Sayısı:`, textChannels, true)
      embed.addField(`Ses Kanalı Sayısı:`, voiceChannels.size, true)
      embed.addField(`Bot Sayısı:`, bots, true)
      embed.addField(`Rol Sayısı:`, m.guild.roles.cache.size, true)
      embed.addField(`Seslideki Üye Sayısı:`, count, true)
      embed.addField(`Emoji Sayısı:`, m.guild.emojis.cache.size, true) 
      embed.addField('Banlı Sayısı',  banlar, true)
  
      m.edit(embed);
    }, 20*1000);
  });