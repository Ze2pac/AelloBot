const Config = require('../../config.json')
const client = global.client;
const moment = require('moment');
const Discord = require('discord.js')
const db = require('quick.db')
require('moment-duration-format');
module.exports = async member => {
    const hg = db.get(`hosgeldin.${member.guild.id}`)
    const newMember = db.fetch(`newMemberGuard.${member.guild.id}`)
    if (newMember) {
        var c = new Date().getTime() - member.user.createdAt.getTime()
        const createdAt = moment.duration(c).format("D")
        if (createdAt <= Config.MemberAdd.TehlikeliHesapGun) {//tehlikeli
            if (Config.MemberAdd.TehlikeliHesapRol) {
                await member.roles.set([Config.MemberAdd.TehlikeliHesapRol])
                await client.channels.cache.get(Config.MemberAdd.LogChannel).send(`${member} adlı üye sunucumuza katıldı. \`Hesap Tehlikeli.\` (${createdAt} gün) 
        Bu hesabın rolleri, koruma amacıyla <@&${Config.MemberAdd.TehlikeliHesapRol}> rolü ile sınırlandırıldı.`)
            } else { await client.channels.cache.get(Config.MemberAdd.LogChannel).send(`${member} adlı üye sunucumuza katıldı. \`Hesap Tehlikeli.\` (${createdAt} gün)`) }


        } else if (createdAt > Config.MemberAdd.TehlikeliHesapGun) {//güvenli
            if (Config.MemberAdd.LogChannel) {
                await client.channels.cache.get(Config.MemberAdd.LogChannel).send(`${member} adlı üye sunucumuza katıldı. \`Hesap Güvenilir.\` (${createdAt} gün) `)
            }
            if (Config.MemberAdd.autoRole_1) {
                await member.roles.add(Config.MemberAdd.autoRole_1)
            }
            if (Config.MemberAdd.autoRole_2) {
                await member.roles.add(Config.MemberAdd.autoRole_2)
            }
        }
    }

    if (hg) {



        let rol;
        if (Config.Roles.Kayitli.length === 18) rol = `<@&${Config.Roles.Kayitli}> `
        if (Config.Roles.Kayitli.length !== 18) rol = ''
        member.roles.add(Config.Roles.Kayitsiz)
        client.channels.cache.get(Config.Channels.KayitKanali).send(`${rol}${member}`, new Discord.MessageEmbed().setTitle(`Hoş geldin ${member.user.tag}!`).setDescription(`Seninle beraber \`${member.guild.memberCount}\` kişi olduk!
        Teyit vererek sunucumuza kayıt olabilirsin.`).setColor('2F3136').setFooter('Aello Register Sy.', 'https://media.discordapp.net/attachments/634781972970995714/816007004527001640/AELLO_GNG_1.png').setThumbnail(member.user.avatarURL({ size: 2048, dynamic: true })))


    }
}