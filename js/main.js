const url = "https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json";
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

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        
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
        document.body.appendChild(test);
        
    })