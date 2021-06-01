const Discord = require('discord.js');
const client = global.client = new Discord.Client();
const Config = require("./config.json");
const AsciiTable = require('ascii-table');
const fs = require("fs");
require('./eventHandler.js')(client);
var table = new AsciiTable('Aello Command Table');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdirSync('./Commands').forEach(dir => { // Bu Handler Codare'den alıntıdır.
  const commandFiles = fs.readdirSync(`./Commands/${dir}/`).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const komutcuklar = require(`./Commands/${dir}/${file}`);
    table.setHeading("Command", 'Status', "Aliases")
    if (komutcuklar.help.name) {
      client.commands.set(komutcuklar.help.name, komutcuklar);
      table.addRow(komutcuklar.help.name, "Başarılı!", komutcuklar.conf.aliases)
    } else {
      table.addRow(komutcuklar.help.name, "Başarısız!")
      continue;
    }
    komutcuklar.conf.aliases.forEach(alias => {
      client.aliases.set(alias, komutcuklar.help.name);
    });
    console.log(table.toString())
  }
})
client.login(Config.Client.token);