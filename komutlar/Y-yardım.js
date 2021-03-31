const Discord = require('discord.js')

exports.run = async(client, message, args) => {

let codare = "yardım"

if(!args[0]) {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Vayz Register', client.user.avatarURL())
    .setDescription(`📥**Botun Davet Linki İçin** [TIKLA](https://discord.com/api/oauth2/authorize?client_id=807606989840580629&permissions=8&scope=bot) \n🔶**Destek Sunucusu İçin** [TIKLA](https://discord.gg/CRa8jZQ6VJ)
                     **Kayıt Komutları**
    ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬                 
    v!hg-kanal: Sunucuya Gelen Üyenin Hg Mesajını Atacağı Kanalı Belirler|**Örnek;** v!hg-kanal #hoşgeldin-kanalı
    ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    v!kayıt-log: Sunucuya Gelen Üyenin Kayıtı Yapıldıktan Sonra Logu Atacağı Kanalı Belirler|**Örnek;** v!kayıt-log #kayıt-log
    ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    v!erkek: Sunucuya Gelen Üyenin Adı Yaşı Alındıktan Sonra Verilecek Erkek Rolünü Verir|**Örnek;** v!erkek @kullanıcı İsim Yaş
    ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    v!kız;: Sunucuya Gelen Üyenin Adı Yaşı Alındıktan Sonra Verilecek Kadın Rolünü Verir|**Örnek;** v!kadın @kullanıcı İsim Yaş
    ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    v!erkek-rol: Kayıt Anında Verilecek Erkek Rolünü Ayarlar|**Örnek;** v!erkek-rol @erkek-rolü 
    ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    v!kadın-rol: Kayıt Anında Verilecek Kadın Rolünü Ayarlar|**Örnek;** v!kadın-rol @kadın-rolü
    ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    v!kayıtsız-rol: Kayıt Anında Alıncak Kayıtsız Rolünü Ayarlar|**Örnek;** v!kayıtsız-rol @kayıtsız-rolü
    ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    v!yetkili-rol: Kayıt Anında Kayıt Yapacak Yetkili Rolünü Ayarlar|**Örnek;** v!yetkili-rol @yetkili-rolü
    ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
    `)
    .setImage('https://im7.ezgif.com/tmp/ezgif-7-c917ae4e45b9.gif')
    .setThumbnail(client.user.avatarURL())
    .setColor("BLUE")
    .setFooter('Bu komutu kullanan kullanıcı ' + message.author.tag, message.author.avatarURL())
    message.channel.send(embed)
}

}
exports.conf = {
    aliases: []
}
exports.help = {
    name: "yardım"
}