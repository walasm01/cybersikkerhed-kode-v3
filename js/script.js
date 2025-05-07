'use strict';

// Henter elementer fra DOM
const startingSlide = document.querySelector('#starting-slide');
const feedbackText = document.querySelector('#feedback-slide p');
const scenarioAll = document.querySelectorAll('.scenario');
const yellowEnding = document.querySelector('#yellow-ending');
const yellowEndingText = document.querySelector('#yellow-ending p');
const greenEnding = document.querySelector('#green-ending');
const greenEndingText = document.querySelector('#green-ending p');
const redEnding = document.querySelector('#red-ending');
const redEndingText = document.querySelector('#red-ending p');

const startBtn = document.querySelector('#start-btn');
const continueBtn = document.querySelector('#continue-btn');
const endingBtn = document.querySelectorAll('.ending-btn');
const btns1 = document.querySelectorAll('#btns1 button');
const btns2 = document.querySelectorAll('#btns2 button');
const btns3 = document.querySelectorAll('#btns3 button');
const btns4 = document.querySelectorAll('#btns4 button');
const btns5 = document.querySelectorAll('#btns5 button');

// Parametre, der kan ændre udfald
let correctRoute = false;
let linkClick = 0;

// Start spillet ----------------------------------------------
startBtn.onclick = () => {
    console.log('Du starter spillet');
    showScenario1();
    startingSlide.classList.add('hidden');
    localStorage.clear();
};


// Knapper for 1. scenarie - MobilePay phishing -----------------

// 1. scenarie - Knap 1 -----------------------------------------
btns1[0].onclick = () => {
    // Hvis du klikker på knap 3 i første scenarie, får du denne feedback
    if (linkClick >= 1) {
        showFeedback();
        feedbackText.innerText = 'Du klikkede på et farligt link. Selvom du ikke har videregivet dine oplysninger, burde du som hovedregel aldrig klikke på uopfordrede links!\n\n MobilePay ville aldrig sende dig en besked med et link for at bekræfte dine oplysninger.\n\n Hvis du kigger på URL\'en, er det også tydeligt, at det ikke er MobilePays hjemmeside.';

        console.log('Du har trykket på et uopfordret link');
        localStorage.setItem('MobilePay efter link klik', 'Ignorer');

    // Hvis du klikker på knap 1 med det samme i første scenarie, får du denne feedback
    } else if (correctRoute === false) {
        showFeedback();
        feedbackText.innerText = 'Beskeden var et forsøg på phishing, og du ignorerede den. :]\n\n Du har dog ikke sikret dig, om MobilePay faktisk skulle bruge dine oplysninger, hvilket er hensynsløst. :[\n\n Det rigtige valg havde været at tjekke om du havde fået nogle krav på oplysninger på MobilePay-appen.';
        
        console.log('Du ignorerer beskeden med det samme');
        localStorage.setItem('MobilePay', 'Ignorer');

    // Hvis du klikker på knap 1 EFTER du har klikket på knap 2 i første scenarie, får du denne feedback
    } else {
        showFeedback();
        feedbackText.innerText = 'Du har sikret dig at MobilePay ikke gjorde krav på oplysninger inde på appen.\n\n MobilePay ville aldrig opkræve oplysninger fra dig via et link på en SMS.\n\n Du kan derfor konkludere, at beskeden var et forsøg på phishing, altså fup.\n\n Godt klaret! :]';

        console.log('Du ignorerer beskeden, efter du har tjekket MobilePay-appen for beskeder');
        localStorage.setItem('MobilePay efter tjek på app', 'Ignorer');
    };

    // Når feedback vises, bruges nedenstående funktion for "fortsæt"-knappen.
    continueBtn.onclick = () => {
        // Hvis du klikkede på knap 3 i første scenarie, så kommer du til 4. scenarie
        if (linkClick >= 1) {
            showScenario4();
            console.log('Du fortsætter til et nyt scenarie');
        // ellers kommer du til 2. scenarie
        } else {
            showScenario2();
            console.log('Du fortsætter til et nyt scenarie');
        };
    };
};

// 1. scenarie - Knap 2 -----------------------------------------
btns1[1].onclick = () => {
    showFeedback();
    feedbackText.innerText = 'Du er gået ind på MobilePay-appen.\n\n Du har ingen notifikationer, der fortæller dig, at du skal angive oplysninger.';
    correctRoute = true; // Da dette er den "rigtige" rute, ændres correctRoute parameteren. Dette har betydning for, hvilken slutning du får.

    console.log('Du tjekker for beskeder på MobilePay-appen');
    localStorage.setItem('MobilePay', 'Tjek MobilePay');

    // Efter du har klikket på knap 2 i første scenarie, får du ovenstående feedback, og "fortsæt"-knappen fører dig tilbage til første scenarie (uden knap 2)
    continueBtn.onclick = () => {
        showScenario1();
        btns1[1].classList.add('hidden');

        console.log('Du har tjekket MobilePay-appen, og du går tilbage til beskeden');
    };
};

// 1. scenarie - Knap 3 -------------------------------------------
btns1[2].onclick = () => {
    // Knap 3 fører dig direkte til scenarie 3.
    showScenario3();
    linkClick++; // Hvor mange links du klikker på, har betydning for hvilken slutning du får

    console.log('Du trykker på linket i beskeden');
    localStorage.setItem('MobilePay', 'Klik link');
};


// Knapper for 2. scenarie - PostNord Legitim ------------------

// 2. scenarie - Knap 1 -----------------------------------------
btns2[0].onclick = () => {
    showFeedback();
    feedbackText.innerText = 'Beskeden og linket var begge legitime.\n\n Når beskeden oplyser sporingsnummer og afsender (og afsenderen stemmer overens med, hvem du har bestilt fra), kan du godt regne med, at beskeden er legitim.\n\n Linket har også den rette URL, som fører til PostNords hjemmeside.\n\n Det er godt du er kritisk, men du fik ikke sporet pakken, som du ville. :[';
    correctRoute = false; // Klikket på knap 1 i andet scenarie, "ødelægger" den "rigtige" rute. Derfor ændres parameteren til false.

    console.log('Du stoler ikke på beskeden, og du ignorerer den');
    localStorage.setItem('PostNord', 'Ignorer');

    // Når ovenstående feedback vises, giver "fortsæt"-knappen dig en bestemt slutning. Hvilken slutning du får afgøres i endings()-funktionen
    continueBtn.onclick = () => {endings()};
};

// 2. scenarie - Knap 2 -------------------------------------------
btns2[1].onclick = () => {
    showFeedback();
    feedbackText.innerText = 'Beskeden og linket var begge legitime.\n\n Når beskeden oplyser sporingsnummer og afsender (og afsenderen stemmer overens med, hvem du har bestilt fra), kan du godt regne med, at beskeden er legitim.\n\n Linket har også den rette URL, som fører til PostNords hjemmeside.\n\n Du trykkede på det legitime link, som førte dig direkte til sporing af din pakke på PostNords hjemmeside. Ville du være 100% sikker, havde det rette valg været at gå på PostNords hjemmeside via din browser og indtaste sporingsnummeret manuelt. Det tager længere tid, men det er mere sikkert, da man aldrig burde trykke  på uopfordrede links.';

    console.log('Du sporer pakken via linket');
    localStorage.setItem('PostNord', 'Klik link');

    // Når ovenstående feedback vises, giver "fortsæt"-knappen dig en bestemt slutning. Hvilken slutning du får afgøres i endings()-funktionen
    continueBtn.onclick = () => {endings()};
};

// 2. scenarie - Knap 3 ----------------------------------------
btns2[2].onclick = () => {
    showFeedback();
    feedbackText.innerText = 'Beskeden og linket var begge legitime.\n\n Når beskeden oplyser sporingsnummer og afsender (og afsenderen stemmer overens med, hvem du har bestilt fra), kan du godt regne med, at beskeden er legitim.\n\n Linket har også den rette URL, som fører til PostNords hjemmeside.\n\n Du valgte, at gå ind på PostNords hjemmeside via din browser og indtaste sporingsnummeret manuelt.\n\n Du valgte den rute, der tog længst tid, men også den mest sikre.\n\n Godt klaret! :]';

    console.log('Du sporer pakken via PostNords hjemmeside');
    localStorage.setItem('PostNord', 'Gå til hjemmeside');

    // Når ovenstående feedback vises, giver "fortsæt"-knappen dig en bestemt slutning. Hvilken slutning du får afgøres i endings()-funktionen
    continueBtn.onclick = () => {endings()};
};


// Knapper for 3. scenarie - Indtast oplysninger ----------------

// 3. scenarie - Knap 1 -----------------------------------------
btns3[0].onclick = () => {
    // Tryk på knap 3 i tredje scenarie, og du føres tilbage til første scenarie (uden knap 1 og 2)
    showScenario1();
    btns1[1].classList.add('hidden');
    btns1[2].classList.add('hidden');

    console.log('Du går ud af linket, tilbage til beskeden');
    localStorage.setItem('Indtast oplysninger', 'Tilbage til beskeden');
};

// 3. scenarie - Knap 2 -----------------------------------------
btns3[1].onclick = () => {
    scenarioAll[2].classList.add('hidden');
    redEnding.classList.remove('hidden');
    redEndingText.innerText = 'Beskeden var ikke sendt fra MobilePay... Beskeden var et forsøg på phishing.\n\n Dine oplysninger er nu blevet stjålet, og du er nu sårbar overfor tyveri af dine penge og identitetstyveri.\n\n Du burde aldrig klikke på uopfordrede links!';

    console.log('Du indtaster de påkrævede oplysninger - GAME OVER');
    localStorage.setItem('Indtast oplysninger', 'Indtast - GAME OVER');

    // Når du trykker på knap 2 i tredje scenarie, får du en "game over"-slutning, som har en "prøv igen"-knap. Denne knap refresher siden, så man kan spille spillet igen.
    endingBtn.forEach(btn => {
        btn.onclick = () => {location.reload()};
    });
};


// Knapper for 4. scenarie - PostNord phishing -------------------

// 4. scenarie - Knap 1 ------------------------------------------
btns4[0].onclick = () => {
    // Hvis du har været på scenarie 5, og du derefter klikker på knap 1 i fjerde scenarie, så får du denne feedback
    if (linkClick >= 2) {
        showFeedback();
        feedbackText.innerText = 'Du klikkede på et farligt link. Selvom du ikke gjorde hvad der stod, burde du som hovedregel aldrig klikke på uopfordrede links!\n\n “phisheren” gav dig en deadline på 12 timer for at gøre dig panisk, hvilket er et af tegnene på, at det er phishing.\n\n Hvis du kigger på URL\'en, er det også tydeligt, at det ikke er PostNords hjemmeside.';

        console.log('Du har trykket på endnu et uopfordret link...');
        localStorage.setItem('PostNord efter link klik', 'Ignorer');

        // Efter du er blevet vist feedback, fører "fortsæt"-knappen dig til en slutning. Hvilken slutning du får, bestemmes i endings()-funktionen
        continueBtn.onclick = () => {endings()};

    // Hvis du klikker på knap 1 i fjerde scenarie med det samme, får du denne feedback
    } else {
        showFeedback();
        feedbackText.innerText = 'Beskeden var endnu et forsøg på at snyde dig, men du lod være med at trykke på linket.\n\n Når du får en besked fra PostNord, og der hverken står ordre/sporingsnummer eller hvem pakken er fra, så er det højst sandsynligt phishing. :]\n\n Hvis du kigger på URL\'en, er det også tydeligt, at det ikke er PostNords hjemmeside.';

        console.log('Du ignorerer beskeden');
        localStorage.setItem('PostNord', 'Ignorer');


        // Efter du er blevet vist feedback, fører "fortsæt"-knappen dig til en slutning. Hvilken slutning du får, bestemmes i endings()-funktionen
        continueBtn.onclick = () => {endings()};
    };
};

// 4. scenarie - Knap 2 ------------------------------------------
btns4[1].onclick = () => {
    // Denne knap fører direkte til femte scenarie
    showScenario5();
    linkClick++;

    console.log('Du trykker på linket i beskeden');
    localStorage.setItem('PostNord', 'Klik link');
};


// Knapper for 5. scenarie - AVG Cleaning -----------------------

// 5. scenarie - Knap 1 ------------------------------------------
btns5[0].onclick = () => {
    // Denne knap fører dig tilbage til fjerde scenarie (uden knap 2)
    showScenario4();
    btns4[1].classList.add('hidden');

    console.log('Du går ud af linket, tilbage til beskeden');
    localStorage.setItem('Advarsel', 'Tilbage til beskeden');
};

// 5. scenarie - Knap 2 --------------------------------------------
btns5[1].onclick = () => {
    scenarioAll[4].classList.add('hidden');
    redEnding.classList.remove('hidden');
    redEndingText.innerText = 'Du har installeret “AVG Cleaning” i håb om, at det ville fjerne malwaren fra din enhed. “AVG Cleaning” var dog selve malwaren...\n\n Dine data og oplysninger er blevet stjålet, og dine filer er blevet krypteret... og du er 2000kr fattigere... (indtil videre)';

    console.log('Du installerer softwaren - GAME OVER');
    localStorage.setItem('Advarsel', 'Installér software - GAME OVER');

    // Når du trykker på knap 2 i femte scenarie, får du en "game over"-slutning, som har en "prøv igen"-knap. Denne knap refresher siden, så man kan spille spillet igen.
    endingBtn.forEach(btn => {
        btn.onclick = () => {location.reload()};
    });
};


// Funktion, der bestemmer hvilken slutning du får, baseret på forskellige parametre.
function endings () {
    
    // Hvis du har trykket på 1 farligt link, får du denne slutning
    if (linkClick == 1) {
        scenarioAll[5].classList.add('hidden');
        yellowEnding.classList.remove('hidden');
        yellowEndingText.innerText = 'Du er blevet udsat for 2 scenarier, hvor du skulle bruge din kritiske sans for at vurdere om beskederne var legitime eller om det var “phishing”, altså fup.\n\n Du fik trykket på ét farligt link, men det andet ignorerede du.\n\n Du har nu forhåbentligt lært at identificere phishing-beskeder, og vigtigst af alt, at du aldrig burde klikke på uopfordrede links.';

        console.log('Du har klikket på 1 ud af 2 farlige links');
        localStorage.setItem('Slutning', 'Du har trykket på 1 ud af 2 farlige links');

        // Denne knap refresher siden, så du kan spille spillet igen
        endingBtn.forEach(btn => {
            btn.onclick = () => {location.reload()};
        });

    // Hvis du har trykket på 2 farlige links, får du denne slutning
    } else if (linkClick >= 2) {
        scenarioAll[5].classList.add('hidden');
        yellowEnding.classList.remove('hidden');
        yellowEndingText.innerText = 'Du er blevet udsat for 2 scenarier, hvor du skulle bruge din kritiske sans for at vurdere om beskederne var legitime eller om det var “phishing”, altså fup.\n\n Du fik trykket på begge af de farlige links. :[\n\n Du har nu forhåbentligt lært at identificere phishing-beskeder, og vigtigst af alt, at du aldrig burde klikke på uopfordrede links.';

        console.log('Du har klikket på 2 ud af 2 farlige links');
        localStorage.setItem('Slutning', 'Du har trykket på 2 ud af 2 farlige links');

        // Denne knap refresher siden, så du kan spille spillet igen
        endingBtn.forEach(btn => {
            btn.onclick = () => {location.reload()};
        });

    // Hvis du ikke har trykket på nogle farlige links OG du har valgt den "rigtige" rute, får du denne slutning
    } else if (correctRoute) {
        scenarioAll[5].classList.add('hidden');
        greenEnding.classList.remove('hidden');
        greenEndingText.innerText = 'Du er blevet udsat for 2 scenarier, hvor du skulle bruge din kritiske sans for at vurdere om beskederne var legitime eller om det var “phishing”, altså fup.\n\n Du har en god kritisk sans, der hjælper dig med at skelne mellem legitime beskeder og phishing.\n\n Godt klaret! :]';

        console.log('Du gjorde det helt rigtige :]');
        localStorage.setItem('Slutning', 'Du har gjort det helt rigtige');

        // Denne knap refresher siden, så du kan spille spillet igen
        endingBtn.forEach(btn => {
            btn.onclick = () => {location.reload()};
        });
    
    // Hvis du ikke har trykket på nogle farlige links, men du har ikke valgt den "rigtige" rute, får du denne slutning
    } else {
        scenarioAll[5].classList.add('hidden');
        yellowEnding.classList.remove('hidden');
        yellowEndingText.innerText = 'Du er blevet udsat for 2 scenarier, hvor du skulle bruge din kritiske sans for at vurdere om beskederne var legitime eller om det var “phishing”, altså fup.\n\n Du trykkede ikke på nogle farlige links, men din kritiske sans kan få dig til at ignorere legitime beskeder. :[\n\n Du har nu forhåbentligt lært at identificere phishing-beskeder, og vigtigst af alt, at du aldrig burde klikke på uopfordrede links.';

        console.log('Din kritiske sans misviste dig');
        localStorage.setItem('Slutning', 'Din kritiske sans misviste dig');

        // Denne knap refresher siden, så du kan spille spillet igen
        endingBtn.forEach(btn => {
            btn.onclick = () => {location.reload()};
        });
    };
};


// Disse funktioner er definerede, så de kan kaldes på for at vise forskellige scenarier og feedback.
function showScenario1 () {
    scenarioAll.forEach(scenario => {
        scenario.classList.add('hidden');
    });
    scenarioAll[0].classList.remove('hidden');
};
function showScenario2 () {
    scenarioAll.forEach(scenario => {
        scenario.classList.add('hidden');
    });
    scenarioAll[1].classList.remove('hidden');
};
function showScenario3 () {
    scenarioAll.forEach(scenario => {
        scenario.classList.add('hidden');
    });
    scenarioAll[2].classList.remove('hidden');
};
function showScenario4 () {
    scenarioAll.forEach(scenario => {
        scenario.classList.add('hidden');
    });
    scenarioAll[3].classList.remove('hidden');
};
function showScenario5 () {
    scenarioAll.forEach(scenario => {
        scenario.classList.add('hidden');
    });
    scenarioAll[4].classList.remove('hidden');
};
function showFeedback () {
    scenarioAll.forEach(scenario => {
        scenario.classList.add('hidden');
    });
    scenarioAll[5].classList.remove('hidden');
};