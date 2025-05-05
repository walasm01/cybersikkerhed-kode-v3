'use strict';

// Henter elementer fra DOM
const startingSlide = document.querySelector('#starting-slide');
const feedbackSlide = document.querySelector('#feedback-slide');
const feedbackText = document.querySelector('#feedback-slide p');

const yellowEnding = document.querySelector('#yellow-ending');
const yellowEndingText = document.querySelector('#yellow-ending p');
const greenEnding = document.querySelector('#green-ending');
const greenEndingText = document.querySelector('#green-ending p');
const redEnding = document.querySelector('#red-ending');
const redEndingText = document.querySelector('#red-ending p');

const startBtn = document.querySelector('#start-btn');
const continueBtn = document.querySelector('#continue-btn');
const endingBtn = document.querySelectorAll('.ending-btn');

const scenario1 = document.querySelector('#scenario1');
const btns1 = document.querySelectorAll('#btns1 button');
const scenario2 = document.querySelector('#scenario2');
const btns2 = document.querySelectorAll('#btns2 button');
const scenario3 = document.querySelector('#scenario3');
const btns3 = document.querySelectorAll('#btns3 button');
const scenario4 = document.querySelector('#scenario4');
const btns4 = document.querySelectorAll('#btns4 button');
const scenario5 = document.querySelector('#scenario5');
const btns5 = document.querySelectorAll('#btns5 button');

// Parametre, der kan ændre udfald
let correctRoute = false;
let linkClick = 0;




// Start spillet ----------------------------------------------
startBtn.onclick = function() {
    console.log('Du starter spillet');
    scenario1.classList.remove('hidden');
    startingSlide.classList.add('hidden');
};




// Knapper for 1. scenarie - MobilePay phishing -----------------

// 1. scenarie - Knap 1 -----------------------------------------
btns1[0].onclick = function() {

    // Hvis du klikker på knap 3 i første scenarie, får du denne feedback
    if (linkClick >= 1) {
        showFeedback();
        console.log('Du har trykket på et uopfordret link');
        feedbackText.innerText = 'Du klikkede på et farligt link. Selvom du ikke har videregivet dine oplysninger, burde du som hovedregel aldrig klikke på uopfordrede links!\n\n MobilePay ville aldrig sende dig en besked med et link for at bekræfte dine oplysninger.\n\n Hvis du kigger på URL\'en, er det også tydeligt, at det ikke er MobilePays hjemmeside.';

    // Hvis du klikker på knap 1 med det samme i første scenarie, får du denne feedback
    } else if (correctRoute === false) {
        showFeedback();
        console.log('Du ignorerer beskeden med det samme');
        feedbackText.innerText = 'Beskeden var et forsøg på phishing, og du ignorerede den. :]\n\n Du har dog ikke sikret dig, om MobilePay faktisk skulle bruge dine oplysninger, hvilket er hensynsløst. :[\n\n Det rigtige valg havde været at tjekke om du havde fået nogle krav på oplysninger på MobilePay-appen.';

    // Hvis du klikker på knap 1 EFTER du har klikket på knap 2 i første scenarie, får du denne feedback
    } else {
        showFeedback();
        console.log('Du ignorerer beskeden, efter du har tjekket MobilePay-appen for beskeder');
        feedbackText.innerText = 'Du har sikret dig at MobilePay ikke gjorde krav på oplysninger inde på appen.\n\n MobilePay ville aldrig opkræve oplysninger fra dig via et link på en SMS.\n\n Du kan derfor konkludere, at beskeden var et forsøg på phishing, altså fup.\n\n Godt klaret! :]'
    };

    // Når feedback vises, bruges nedenstående funktion for "fortsæt"-knappen.
    continueBtn.onclick = function() {

        // Hvis du klikkede på knap 3 i første scenarie, så kommer du til 4. scenarie
        if (linkClick >= 1) {
            showScenario4();
            console.log('Du fortsætter til et nyt scenarie');
        
        // ellers kommer du til 2. scenarie
        } else {
            showScenario2();
            console.log('Du fortsætter til et nyt scenarie');
        }
    };
};

// 1. scenarie - Knap 2 -----------------------------------------
btns1[1].onclick = function() {
    showFeedback();
    console.log('Du tjekker for beskeder på MobilePay-appen');
    feedbackText.innerText = 'Du er gået ind på MobilePay-appen.\n\n Du har ingen notifikationer, der fortæller dig, at du skal angive oplysninger.';
    correctRoute = true; // Da dette er den "rigtige" rute, ændres correctRoute parameteren. Dette har betydning for, hvilken slutning du får

    // Efter du har klikket på knap 2 i første scenarie, får du ovenstående feedback, og "fortsæt"-knappen fører dig tilbage til første scenarie (uden knap 2)
    continueBtn.onclick = function() {
        showScenario1();
        console.log('Du har tjekket MobilePay-appen, og du går tilbage til beskeden');
        btns1[1].classList.add('hidden');
    };
};

// 1. scenarie - Knap 3 -------------------------------------------
btns1[2].onclick = function() {
    // Knap 3 fører dig direkte til scenarie 3.
    showScenario3();
    console.log('Du trykker på linket i beskeden');
    linkClick++; // Hvor mange links du klikker på, har betydning for hvilken slutning du får
};




// Knapper for 2. scenarie - PostNord Legitim ------------------

// 2. scenarie - Knap 1 -----------------------------------------
btns2[0].onclick = function() {
    showFeedback();
    console.log('Du stoler ikke på beskeden, og du ignorerer den');
    feedbackText.innerText = 'Beskeden og linket var begge legitime.\n\n Når beskeden oplyser sporingsnummer og afsender (og afsenderen stemmer overens med, hvem du har bestilt fra), kan du godt regne med, at beskeden er legitim.\n\n Linket har også den rette URL, som fører til PostNords hjemmeside.\n\n Det er godt du er kritisk, men du fik ikke sporet pakken, som du ville. :[';
    correctRoute = false; // Klikket på knap 1 i andet scenarie, "ødelægger" den "rigtige" rute. Derfor ændres parameteren til false.

    // Når ovenstående feedback vises, giver "fortsæt"-knappen dig en bestemt slutning. Hvilken slutning du får afgøres i endings()-funktionen
    continueBtn.onclick = function() {endings()};
};

// 2. scenarie - Knap 2 -------------------------------------------
btns2[1].onclick = function() {
    showFeedback();
    console.log('Du sporer pakken via linket');
    feedbackText.innerText = 'Beskeden og linket var begge legitime.\n\n Når beskeden oplyser sporingsnummer og afsender (og afsenderen stemmer overens med, hvem du har bestilt fra), kan du godt regne med, at beskeden er legitim.\n\n Linket har også den rette URL, som fører til PostNords hjemmeside.\n\n Du trykkede på det legitime link, som førte dig direkte til sporing af din pakke på PostNords hjemmeside. Ville du være 100% sikker, havde det rette valg været at gå på PostNords hjemmeside via din browser og indtaste sporingsnummeret manuelt. Det tager længere tid, men det er mere sikkert, da man aldrig burde trykke  på uopfordrede links.';

    // Når ovenstående feedback vises, giver "fortsæt"-knappen dig en bestemt slutning. Hvilken slutning du får afgøres i endings()-funktionen
    continueBtn.onclick = function() {endings()};
};

// 2. scenarie - Knap 3 ----------------------------------------
btns2[2].onclick = function() {
    showFeedback();
    console.log('Du sporer pakken via PostNords hjemmeside');
    feedbackText.innerText = 'Beskeden og linket var begge legitime.\n\n Når beskeden oplyser sporingsnummer og afsender (og afsenderen stemmer overens med, hvem du har bestilt fra), kan du godt regne med, at beskeden er legitim.\n\n Linket har også den rette URL, som fører til PostNords hjemmeside.\n\n Du valgte, at gå ind på PostNords hjemmeside via din browser og indtaste sporingsnummeret manuelt.\n\n Du valgte den rute, der tog længst tid, men også den mest sikre.\n\n Godt klaret! :]';

    // Når ovenstående feedback vises, giver "fortsæt"-knappen dig en bestemt slutning. Hvilken slutning du får afgøres i endings()-funktionen
    continueBtn.onclick = function() {endings()};
};




// Knapper for 3. scenarie - Indtast oplysninger ----------------

// 3. scenarie - Knap 1 -----------------------------------------
btns3[0].onclick = function() {
    // Tryk på knap 3 i tredje scenarie, og du føres tilbage til første scenarie (uden knap 1 og 2)
    showScenario1();
    console.log('Du går ud af linket, tilbage til beskeden');
    btns1[1].classList.add('hidden');
    btns1[2].classList.add('hidden');
};

// 3. scenarie - Knap 2 -----------------------------------------
btns3[1].onclick = function() {
    console.log('Du indtaster de påkrævede oplysninger - GAME OVER');
    scenario3.classList.add('hidden');
    redEnding.classList.remove('hidden');
    redEndingText.innerText = 'Beskeden var ikke sendt fra MobilePay... Beskeden var et forsøg på phishing.\n\n Dine oplysninger er nu blevet stjålet, og du er nu sårbar overfor tyveri af dine penge og identitetstyveri.\n\n Du burde aldrig klikke på uopfordrede links!';

    // Når du trykker på knap 2 i tredje scenarie, får du en "game over"-slutning, som har en "prøv igen"-knap. Denne knap refresher siden, så man kan spille spillet igen.
    endingBtn.forEach(btn => {
        btn.onclick = function() {location.reload()};
    });
};




// Knapper for 4. scenarie - PostNord phishing -------------------

// 4. scenarie - Knap 1 ------------------------------------------
btns4[0].onclick = function() {

    // Hvis du har været på scenarie 5, og du derefter klikker på knap 1 i fjerde scenarie, så får du denne feedback
    if (linkClick >= 2) {
        showFeedback();
        console.log('Du har trykket på endnu et uopfordret link...')
        feedbackText.innerText = 'Du klikkede på et farligt link. Selvom du ikke gjorde hvad der stod, burde du som hovedregel aldrig klikke på uopfordrede links!\n\n “phisheren” gav dig en deadline på 12 timer for at gøre dig panisk, hvilket er et af tegnene på, at det er phishing.\n\n Hvis du kigger på URL\'en, er det også tydeligt, at det ikke er PostNords hjemmeside.';

        // Efter du er blevet vist feedback, fører "fortsæt"-knappen dig til en slutning. Hvilken slutning du får, bestemmes i endings()-funktionen
        continueBtn.onclick = function() {endings()};

    // Hvis du klikker på knap 1 i fjerde scenarie med det samme, får du denne feedback
    } else {
        showFeedback();
        console.log('Du ignorerer beskeden')
        feedbackText.innerText = 'Beskeden var endnu et forsøg på at snyde dig, men du lod være med at trykke på linket.\n\n Når du får en besked fra PostNord, og der hverken står ordre/sporingsnummer eller hvem pakken er fra, så er det højst sandsynligt phishing. :]\n\n Hvis du kigger på URL\'en, er det også tydeligt, at det ikke er PostNords hjemmeside.'

        // Efter du er blevet vist feedback, fører "fortsæt"-knappen dig til en slutning. Hvilken slutning du får, bestemmes i endings()-funktionen
        continueBtn.onclick = function() {endings()};
    };
};

// 4. scenarie - Knap 2 ------------------------------------------
btns4[1].onclick = function() {
    // Denne knap fører direkte til femte scenarie
    showScenario5();
    console.log('Du trykker på linket i beskeden');
    linkClick++;
};




// Knapper for 5. scenarie - AVG Cleaning -----------------------

// 5. scenarie - Knap 1 ------------------------------------------
btns5[0].onclick = function() {
    // Denne knap fører dig tilbage til fjerde scenarie (uden knap 2)
    showScenario4();
    console.log('Du går ud af linket, tilbage til beskeden');
    btns4[1].classList.add('hidden');
};

// 5. scenarie - Knap 2 --------------------------------------------
btns5[1].onclick = function() {
    console.log('Du installerer softwaren - GAME OVER');
    scenario5.classList.add('hidden');
    redEnding.classList.remove('hidden');
    redEndingText.innerText = 'Du har installeret “AVG Cleaning” i håb om, at det ville fjerne malwaren fra din enhed. “AVG Cleaning” var dog selve malwaren...\n\n Dine data og oplysninger er blevet stjålet, og dine filer er blevet krypteret... og du er 2000kr fattigere... (indtil videre)';

    // Når du trykker på knap 2 i femte scenarie, får du en "game over"-slutning, som har en "prøv igen"-knap. Denne knap refresher siden, så man kan spille spillet igen.
    endingBtn.forEach(btn => {
        btn.onclick = function() {location.reload()};
    });
};




// Funktion, der bestemmer hvilken slutning du får, baseret på forskellige parametre.
function endings () {
    
    // Hvis du har trykket på 1 farligt link, får du denne slutning
    if (linkClick == 1) {
        console.log('Du har klikket på 1 ud af 2 farlige links');
        feedbackSlide.classList.add('hidden');
        yellowEnding.classList.remove('hidden');
        yellowEndingText.innerText = 'Du er blevet udsat for 2 scenarier, hvor du skulle bruge din kritiske sans for at vurdere om beskederne var legitime eller om det var “phishing”, altså fup.\n\n Du fik trykket på ét farligt link, men det andet ignorerede du.\n\n Du har nu forhåbentligt lært at identificere phishing-beskeder, og vigtigst af alt, at du aldrig burde klikke på uopfordrede links.';

        // Denne knap refresher siden, så du kan spille spillet igen
        endingBtn.forEach(btn => {
            btn.onclick = function() {location.reload()};
        });

    // Hvis du har trykket på 2 farlige links, får du denne slutning
    } else if (linkClick >= 2) {
        console.log('Du har klikket på 2 ud af 2 farlige links');
        feedbackSlide.classList.add('hidden');
        yellowEnding.classList.remove('hidden');
        yellowEndingText.innerText = 'Du er blevet udsat for 2 scenarier, hvor du skulle bruge din kritiske sans for at vurdere om beskederne var legitime eller om det var “phishing”, altså fup.\n\n Du fik trykket på begge af de farlige links. :[\n\n Du har nu forhåbentligt lært at identificere phishing-beskeder, og vigtigst af alt, at du aldrig burde klikke på uopfordrede links.';

        // Denne knap refresher siden, så du kan spille spillet igen
        endingBtn.forEach(btn => {
            btn.onclick = function() {location.reload()};
        });

    // Hvis du ikke har trykket på nogle farlige links OG du har valgt den "rigtige" rute, får du denne slutning
    } else if (correctRoute) {
        console.log('Du gjorde det helt rigtige :]');
        feedbackSlide.classList.add('hidden');
        greenEnding.classList.remove('hidden');
        greenEndingText.innerText = 'Du er blevet udsat for 2 scenarier, hvor du skulle bruge din kritiske sans for at vurdere om beskederne var legitime eller om det var “phishing”, altså fup.\n\n Du har en god kritisk sans, der hjælper dig med at skelne mellem legitime beskeder og phishing.\n\n Godt klaret! :]';

        // Denne knap refresher siden, så du kan spille spillet igen
        endingBtn.forEach(btn => {
            btn.onclick = function() {location.reload()};
        });
    
    // Hvis du ikke har trykket på nogle farlige links, men du har ikke valgt den "rigtige" rute, får du denne slutning
    } else {
        console.log('Din kritiske sans misviste dig');
        feedbackSlide.classList.add('hidden');
        yellowEnding.classList.remove('hidden');
        yellowEndingText.innerText = 'Du er blevet udsat for 2 scenarier, hvor du skulle bruge din kritiske sans for at vurdere om beskederne var legitime eller om det var “phishing”, altså fup.\n\n Du trykkede ikke på nogle farlige links, men din kritiske sans kan få dig til at ignorere legitime beskeder. :[\n\n Du har nu forhåbentligt lært at identificere phishing-beskeder, og vigtigst af alt, at du aldrig burde klikke på uopfordrede links.';

        // Denne knap refresher siden, så du kan spille spillet igen
        endingBtn.forEach(btn => {
            btn.onclick = function() {location.reload()};
        });
    };
};




// Disse funktioner er definerede, så de kan kaldes på for at vise forskellige scenarier og feedback.
function showScenario1 () {
    scenario1.classList.remove('hidden');
    scenario2.classList.add('hidden');
    scenario3.classList.add('hidden');
    scenario4.classList.add('hidden');
    scenario5.classList.add('hidden');
    feedbackSlide.classList.add('hidden');
};
function showScenario2 () {
    scenario1.classList.add('hidden');
    scenario2.classList.remove('hidden');
    scenario3.classList.add('hidden');
    scenario4.classList.add('hidden');
    scenario5.classList.add('hidden');
    feedbackSlide.classList.add('hidden');
};
function showScenario3 () {
    scenario1.classList.add('hidden');
    scenario2.classList.add('hidden');
    scenario3.classList.remove('hidden');
    scenario4.classList.add('hidden');
    scenario5.classList.add('hidden');
    feedbackSlide.classList.add('hidden');
};
function showScenario4 () {
    scenario1.classList.add('hidden');
    scenario2.classList.add('hidden');
    scenario3.classList.add('hidden');
    scenario4.classList.remove('hidden');
    scenario5.classList.add('hidden');
    feedbackSlide.classList.add('hidden');
};
function showScenario5 () {
    scenario1.classList.add('hidden');
    scenario2.classList.add('hidden');
    scenario3.classList.add('hidden');
    scenario4.classList.add('hidden');
    scenario5.classList.remove('hidden');
    feedbackSlide.classList.add('hidden');
};
function showFeedback () {
    scenario1.classList.add('hidden');
    scenario2.classList.add('hidden');
    scenario3.classList.add('hidden');
    scenario4.classList.add('hidden');
    scenario5.classList.add('hidden');
    feedbackSlide.classList.remove('hidden');
};