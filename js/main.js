const zekrUrl = "https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json";
const surahUrl = "http://api.alquran.cloud/v1/surah/67" // سورة الملك

const douaaName = {
    Anbiaa : "أدعية الأنبياء",
    Quran : "أدعية قرآنية",
    AfterWakingUpZekr : "أذكار الاستيقاظ",
    MorningZekr : "أذكار الصباح",
    EveningZekr : "أذكار المساء",
    BeforeSleepingZekr : "أذكار النوم",
    AfterPrayingZekr : "أذكار بعد السلام من الصلاة المفروضة",
    Tsabeeh : "تسابيح",
}


// Fetching data from API

fetch(zekrUrl)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        
        x = data[douaaName.MorningZekr][4].content;
        // console.log(x);


                // ! for Quran and Anbiaa only
                x = x.replaceAll(`\\n`,``)
                x = x.replaceAll(`'`,``)
                x = x.replaceAll(`,`,``)
                x = x.replaceAll(`"`,``)

        const test = document.createElement('h1');
        test.textContent = x;
        test.style.textAlign = 'center';
        test.style.fontStyle = 'italic';
        test.classList.add("mb-5", "p-5");
        document.body.appendChild(test);
        
    })

    const spacebtw = document.createElement('br');

fetch(surahUrl)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const ayat = data.data.ayahs;
        const basmalaTxt = "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ";
        let wholeSurah = "";
        ayat.forEach((ayah, index) => {
            if (index == 0) ayah.text = ayah.text.replace("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ", "");
            wholeSurah += ` ${ayah.text} (${ayah.numberInSurah})`;
        });

        console.log(wholeSurah);
        
        
        const basmala = document.createElement('h1');
        basmala.textContent = basmalaTxt;
        basmala.style.textAlign = 'center';
        basmala.style.fontStyle = 'italic';

        const surah = document.createElement('h2');
        surah.textContent = wholeSurah;
        surah.style.textAlign = 'center';
        surah.style.fontStyle = 'italic';
        surah.classList.add("p-5");
        
        document.body.appendChild(basmala);
        document.body.appendChild(surah);
    });