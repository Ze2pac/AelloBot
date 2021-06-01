const iltifatlar = [
  'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
  'Sen; en güzel şiirlerin bile kuramadığı kafiyesin.',
  'O kadar güzelsin ki, manzaralar seni seyretsin.',
  'Seni dünyanın en güzel 8. harikası seçiyorum.',
  'Kendime gelemiyorum, sana gelsem olur mu?',
  'Fazlası zarar olmayan iki şey; biri sen biri kokun.',
  'Böyle basit bir dünyada sen benim için çok özelsin.',
  'Aşk birisinde anlam bulacaksa o da sensin benim için.',
  'Saçlarının bir teli olmak isterdim hep yanında kalmak için.',
  'Seni sevince insan iş güç sahibi oluyor. Şair oluyor mesela.',
  'Nasıl göründüğünü sorma, en güzel benimle görünüyorsun.',
  'Gülüşün; hani yağmur yağarken güneş açar ya onun gibi bir şey.',
  'Sen o kadar güzel gülüyorsun ki. Tüm ağlamalarımı rafa kaldırdım.',
  'Kendimi görebileceğim en güzel ayna bana aşkla bakan gözlerindir.',
  'Dünyadaki en güzel şeyi sana vermek isterdim ama seni sana veremem ki.',
  'Seninle yaşlanmak tek idealim, gözlerine bakarak ömrümü bitirmek ise vasiyetim.',
  'Ve sen sevgili; her sabah uyandığımda düşündüğüm ilk şey, her gece zihnimde canlanan son şeysin.',
  'Gökyüzündeki bütün yıldızları toplasam, bir tek sen etmez fakat bir tek sen olsan tüm yıldızlar yanında sönük kalır.',
  'Yaşanılacak en güzel mevsim sensin.  ',
  'Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.',
  'Kokunu içime çektiğimde nefes aldığımı anlıyorum.',
  'Hayatta aldığım en güzel kararsın.',
  'Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.',
  'Ömrümün en güzel baharı sensin.',
  'Gözlerin gökyüzü kadar uçsuz bucaksız.',
  'Bir mavi düşün içinde sen olan.',
  'Varlığın bir çocuğun gülüşü gibi; öyle güzel öyle masum ki.',
  'Mavi gözlerin, gökyüzü oldu dünyamın.',
  'Huzur kokuyor geçtiğin her yer.',
  'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
  'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
  'Gözlerinle baharı getirdin garip gönlüme.',
  'Seni kelimeler ile anlatmak çok zor. Muhteşem desem yine eksik kalıyor anlamın.',
  'Gülüşün denize kıyısı olan bir şehir gibi.',
  'Mucizelerden bahsediyordum, tam o sırda gözlerin geldi aklıma.',
  'Güneşe gerek yok, gözlerindeki sıcaklık içimi ısıtıyor.',
  'Sana sarılmak gibi bir dünya harikası var.',
  'Benim en güzel zaafım sensin.',
  'Sen bana aitsin. Balık denize, bulut gökyüzüne ait.',
  'Gölgene sığınırım en çaresiz anımda.',
  'Küçük kalbimde kocaman bir yere sahipsin.',
  'Gecenin sabahı beklediği gibi bekliyorum gözlerinin ışıltısını.',
  'Gözlerin diyorum; gecemin karanlığındaki o mavinin, yıldızlardaki ışıltısı..',
  'Denizi mavi gösteren gökyüzüdür ya hani. Beni de mutlu gösteren sensin.',
  'Diğer yanım yok benim.. Sen benim tamamımsın.',
  'Sanki biri göz kapaklarımın içine senin resmini çizmiş..',
  'Telaşımı hoş gör, ıslandığım ilk yağmursun.',
  'Öylesine güzel seviyorum ki seni, öylesine saf öylesine temiz, öylesine derin. Ve “Öylesine” değil..”'
];
const db = require('quick.db')
const Config = require('../../config.json');

var iltifatSayi = 0;
module.exports = message => {
  var ovgu = db.fetch(`ovgusistemi`)

  if (ovgu) {
    if (message.channel.id !== Config.Channels.Ovgu || message.author.bot) return;
    iltifatSayi++
    if (iltifatSayi >= 50) {
      iltifatSayi = 0;
      const random = Math.floor(Math.random() * ((iltifatlar).length - 1) + 1);
      message.reply(`**${(iltifatlar)[random]}**`)
    };
  }
} // Bu kod Serendia Squad sunucusundan alıntıdır.