const zekrUrl = "https://raw.githubusercontent.com/nawafalqari/azkar-api/56df51279ab6eb86dc2f6202c7de26c8948331c1/azkar.json";
const surahUrl = "http://api.alquran.cloud/v1/surah/67" // سورة الملك

const douaaName = {
    MorningZekr: "أذكار الصباح",
    EveningZekr: "أذكار المساء",
    // Anbiaa : "أدعية الأنبياء",
    // Quran : "أدعية قرآنية",
    // AfterWakingUpZekr : "أذكار الاستيقاظ",
    // BeforeSleepingZekr : "أذكار النوم",
    // AfterPrayingZekr : "أذكار بعد السلام من الصلاة المفروضة",
    // Tsabeeh : "تسابيح",
}


//HTML Elements
const azkarElsabahBTN = document.querySelector("#azkarElsabahBTN");
const azkarElmasaaBTN = document.querySelector("#azkarElmasaaBTN");
const elmolkBTN = document.querySelector("#elmolkBTN");

const Azkar = document.querySelector(".Azkar");

const azkarElsabah = document.querySelector(".azkarElsabah");
const azkarElsabahZekr = document.querySelector(".azkarElsabah p");
const azkarElsabahNextZekr = document.querySelector(".azkarElsabah button");

const azkarElmasaa = document.querySelector(".azkarElmasaa");
const azkarElmasaaZekr = document.querySelector(".azkarElmasaa p");
const azkarElmasaaNextZekr = document.querySelector(".azkarElmasaa button");

const elmolk = document.querySelector(".elmolk");
const elmolkpages = document.querySelector(".elmolk p");
const elmolkNext = document.querySelector("#next-page");
const elmolkPre = document.querySelector("#pre-page");


//Arrayes
let MorningZekr = [];
let EveningZekr = [];
let zekrCounter = 0;


let Ayatelmolk1_10 = [];
let Ayatelmolk11_20 = [];
let Ayatelmolk21_30 = [];
let pageCounter = 1;


//Methods
async function getMorningZekr() {
    try {
        const response = await fetch(zekrUrl);
        if (response.status !== 200) throw new Error(`bad request ${response.statusText}`);

        const data = await response.json();
        MorningZekr = data[douaaName.MorningZekr];
        MorningZekr = MorningZekr.slice(1);

    } catch (error) {
        console.warn(error);
    }
}

async function getEveningZekr() {
    try {
        const response = await fetch(zekrUrl);
        if (response.status !== 200) throw new Error(`bad request ${response.statusText}`);

        const data = await response.json();
        EveningZekr = data[douaaName.EveningZekr];

    } catch (error) {
        console.warn(error);
    }
}

async function getAyatElmolk() {
    console.log("getAyatElmolk called");
    
    try {
        const response = await fetch(surahUrl);
        if (response.status !== 200) throw new Error(`bad request ${response.statusText}`);

        const data = await response.json();
        const elmolkAyat = data.data.ayahs;
        elmolkAyat[0].text = elmolkAyat[0].text.replace("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ", "");
        Ayatelmolk1_10 = elmolkAyat.slice(0, 10);
        Ayatelmolk11_20 = elmolkAyat.slice(10, 20);
        Ayatelmolk21_30 = elmolkAyat.slice(20, 30);

    } catch (error) {
        console.warn(error);
    }
}

function displayAlmolkpage(ayat){
    let page = "";
    ayat.forEach(ayah => {
        page += ` ${ayah.text} (${ayah.numberInSurah})`;
    });
    elmolkpages.textContent = page;
}


//EventListeners

// اذكار الصباح
azkarElsabahBTN.addEventListener("click", async (event) => {
    event.stopPropagation();

    if (MorningZekr.length == 0) await getMorningZekr();

    azkarElsabahZekr.textContent = MorningZekr[0].content
    zekrCounter = 0;

    Azkar.classList.remove("d-none");
    azkarElsabah.classList.remove("d-none");
    azkarElmasaa.classList.add("d-none");
    elmolk.classList.add("d-none");
});

azkarElsabahNextZekr.addEventListener("click", event => {
    event.stopPropagation()

    zekrCounter++;
    if (zekrCounter < MorningZekr.length) {
        azkarElsabahZekr.textContent = MorningZekr[zekrCounter].content
    }
    else {
        Azkar.classList.add("d-none");
        azkarElsabah.classList.add("d-none");
    }
});


// اذكار المساء
azkarElmasaaBTN.addEventListener("click", async (event) => {
    event.stopPropagation();

    if (EveningZekr.length == 0) await getEveningZekr();

    azkarElmasaaZekr.textContent = EveningZekr[0].content
    zekrCounter = 0;

    Azkar.classList.remove("d-none");
    azkarElsabah.classList.add("d-none");
    azkarElmasaa.classList.remove("d-none");
    elmolk.classList.add("d-none");
});
azkarElmasaaNextZekr.addEventListener("click", event => {
    event.stopPropagation()

    zekrCounter++;
    if (zekrCounter < EveningZekr.length) {
        azkarElmasaaZekr.textContent = EveningZekr[zekrCounter].content
    }
    else {
        Azkar.classList.add("d-none");
        azkarElmasaa.classList.add("d-none");
    }
});


// سورة الملك

elmolkBTN.addEventListener("click", async (event) => {
    event.stopPropagation();

    if (Ayatelmolk1_10.length == 0) await getAyatElmolk();

    displayAlmolkpage(Ayatelmolk1_10)
    pageCounter = 1;

    Azkar.classList.remove("d-none");
    azkarElsabah.classList.add("d-none");
    azkarElmasaa.classList.add("d-none");
    elmolk.classList.remove("d-none");
});

elmolkNext.addEventListener("click" ,event =>{
    event.stopPropagation()

    elmolkPre.classList.remove("d-none")

    if(pageCounter <= 3){
        pageCounter++;
        if(pageCounter == 2) displayAlmolkpage(Ayatelmolk11_20);
        else {
            displayAlmolkpage(Ayatelmolk21_30);
            elmolkNext.classList.add("d-none");
        }
    }
});
elmolkPre.addEventListener("click" ,event =>{
    event.stopPropagation()
    
    elmolkNext.classList.remove("d-none")

    if(pageCounter >= 1){
        pageCounter--;
        if(pageCounter == 2) displayAlmolkpage(Ayatelmolk11_20);
        else {
            displayAlmolkpage(Ayatelmolk21_30);
            elmolkPre.classList.add("d-none");
        }
    }
});