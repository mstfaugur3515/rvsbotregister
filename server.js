const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const ms = require('ms');
const fetch = require('node-fetch')

const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`${props.help.name} Komutu Yüklendi.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
client.login(process.env.token);


client.on("guildMemberAdd", async member => {
    let kanal = await db.fetch(`hgkanal_${member.guild.id}`) 
    if(!kanal || !kanal) return
    let sonuç = kanal - member.guild.memberCount
     let user = client.users.cache.get(member.id);
  let yetkilirole = db.fetch(`yetkilirole_${member.guild.id}`)
  require("moment-duration-format");
    let kurulus = new Date().getTime() - user.createdAt.getTime();  
    var kontrol;
if (kurulus < 1296000000) kontrol = '**Şüpheli**'
if (kurulus > 1296000000) kontrol = '**Güvenli**'
  moment.locale("tr");
  const embed = new Discord.MessageEmbed()
    .setTitle(member.guild.name + ` Sunucusuna Hoş Geldin!`)
    .setDescription(`${member} **Bizde Yeni Bir Roket İnmesini Bekliyorduk**
  \nSenin İnişin İle Birlikte \`${member.guild.memberCount}\` Kişiyiz!
  \nİçeri Girmek İçin **Ses Odalarına** Ses Vermeniz Yeterli.
  \nSunucumuzda Kaydının Yapılması İçin <@&${yetkilirole}> Bu Role Sahip Yetkililere Ulaşabilirsin.
  \nHesap Durumu ${moment(member.user.createdAt).format("**DD MMMM YYYY dddd (hh<:mm:723226315972673658>ss)**") } - ${kontrol}`)
  client.channels.cache.get(kanal).send(`<@&${yetkilirole}>`)
  client.channels.cache.get(kanal).send(embed)
  return
    })
