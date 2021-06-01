const client = global.client;
const Discord = require('discord.js')
const db = require('quick.db')
const Config = require('../../config.json')
const invites = {}
const wait = require('util').promisify(setTimeout);
client.on('ready', () => {
  wait(1000);
  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', async member => {
  var inv = db.get(`davet.${member.guild.id}`)
  if (!inv) return; 
  member.guild.fetchInvites().then(async guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.cache.get(invite.inviter.id);

    db.set(`invites.inviter.${member.id}`, { id: inviter.id, inviter: inviter.tag })
    db.push(`invited.members.${inviter.id}`, `<@${member.id}>`)
    if ((Date.now() - member.user.createdTimestamp) < 7 * 24 * 60 * 60 * 1000) {
      db.add(`invites.fake.${inviter.id}`, 1);
      db.add(`invites.top.${inviter.id}`, 1);
      db.push(`invites.daily.${inviter.id}`, new Date().getTime());
    } else if ((Date.now() - member.user.createdTimestamp) > 7 * 24 * 60 * 60 * 1000) {
      db.add(`invites.regular.${inviter.id}`, 1);
      db.add(`invites.top.${inviter.id}`, 1);
      db.push(`invites.daily.${inviter.id}`, new Date().getTime());
    }
    let top = await db.get(`invites.top.${inviter.id}`);
    Aello = (`**<@${member.user.id}>** Adlı Kişi Sunucuya Katıldı. Davet Eden Kişi **${inviter.tag}**  (**${top}** Adet Daveti Var)`)
    client.guilds.cache.get('731109039295168612').channels.cache.get('820229511526088715').send(Aello)

    let cikan = await db.get(`invites.active.${inviter.id}`)
    let d = db.get(`invites.inviter.${member.id}`)
    let dd = d.id
    if (!cikan) cikan = 0;
    let aktif = (top - cikan);
    let r1 = client.guilds.cache.get(Config.General.Server).roles.cache.find(r => r.id === Config.Invite.rol_1)
    let r2 = client.guilds.cache.get(Config.General.Server).roles.cache.find(r => r.id === Config.Invite.rol_2)
    let r3 = client.guilds.cache.get(Config.General.Server).roles.cache.find(r => r.id === Config.Invite.rol_3)
    let r4 = client.guilds.cache.get(Config.General.Server).roles.cache.find(r => r.id === Config.Invite.rol_4)
    let r5 = client.guilds.cache.get(Config.General.Server).roles.cache.find(r => r.id === Config.Invite.rol_5)
    let m = client.guilds.cache.get(Config.General.Server).members.cache.find(m => m.id === dd)
    if (Config.Invite.rol_1_sayi <= aktif && r1) m.roles.add(Config.Invite.rol_1)
    if (Config.Invite.rol_2_sayi <= aktif && r2) m.roles.add(r2)
    if (Config.Invite.rol_3_sayi <= aktif && r3) m.roles.add(r3)
    if (Config.Invite.rol_4_sayi <= aktif && r4) m.roles.add(r4)
    if (Config.Invite.rol_5_sayi <= aktif && r5) m.roles.add(r5)
  });
});

client.on('guildMemberRemove', async member => {
  var inv = db.get(`davet.${member.guild.id}`)
  if (!inv) return; 
  let inviter = db.get(`invites.inviter.${member.id}`)
  if (inviter) {
    i = inviter.id;
    inviter = inviter.inviter;
    db.add(`invites.active.${i}`, 1)
  }
  let top = db.get(`invites.top.${inviter.id}`);
  let cikan = db.get(`invites.active.${inviter.id}`)
  let aktif = (top - cikan)
  let d = db.get(`invites.inviter.${member.id}`)
  let dd = d.id
  let m = client.guilds.cache.get(Config.General.Server).members.cache.find(m => m.id === dd)
  let r1 = client.guilds.cache.get(Config.General.Server).roles.cache.find(r => r.id === Config.Invite.rol_1)
  let r2 = client.guilds.cache.get(Config.General.Server).roles.cache.find(r => r.id === Config.Invite.rol_2)
  let r3 = client.guilds.cache.get(Config.General.Server).roles.cache.find(r => r.id === Config.Invite.rol_3)
  let r4 = client.guilds.cache.get(Config.General.Server).roles.cache.find(r => r.id === Config.Invite.rol_4)
  let r5 = client.guilds.cache.get(Config.General.Server).roles.cache.find(r => r.id === Config.Invite.rol_5)
  if (Config.Invite.rol_1_sayi > aktif) m.roles.remove(Config.Invite.rol_1)
  if (Config.Invite.rol_2_sayi > aktif && r2) m.roles.remove(r2)
  if (Config.Invite.rol_3_sayi > aktif && r3) m.roles.remove(r3)
  if (Config.Invite.rol_4_sayi > aktif && r4) m.roles.remove(r4)
  if (Config.Invite.rol_5_sayi > aktif && r5) m.roles.remove(r5)

  Aello = (`**<@${member.user.id}>** Adlı Kişi Sunucudan Ayrıldı. Davet Eden Kişi: \`${inviter ? inviter : 'Davetçi bulunamadı'}\``)
  client.guilds.cache.get('731109039295168612').channels.cache.get('820229511526088715').send(Aello)
});