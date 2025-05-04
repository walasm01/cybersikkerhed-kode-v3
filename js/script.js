'use strict';

const startBtn = document.querySelector('#start-btn');
const continueBtn = document.querySelector('#continue-btn');
const endingBtn = document.querySelector('#ending-btn');

const startingSlide = document.querySelector('#starting-slide');
const feedbackSlide = document.querySelector('#feedback-slide');
const feedbackText = document.querySelector('#feedback-slide p');

const scenario1 = document.querySelector('#scenario1');
const btns1 = document.querySelectorAll('#btns1 button');
const scenario2 = document.querySelector('#scenario2');
const btns2 = document.querySelectorAll('#btns2 button');
const scenario3 = document.querySelector('#scenario3');
const btns3 = document.querySelectorAll('#btns3 button');
const scenario4 = document.querySelector('#scenario4');
const btns4 = document.querySelectorAll('#btns4 button');

let correctRoute = false;

startBtn.onclick = function() {
    console.log('start spillet');
    scenario1.classList.remove('hidden');
    startingSlide.classList.add('hidden');
};

btns1[0].onclick = function() {
    if (correctRoute === false) {
        showFeedback();
        console.log('Jeg ignorerer beskeden');
        feedbackText.innerText = 'Beskeden var et forsøg på phishing, og du ignorerede den. :]\n\n Du har dog ikke sikret dig, om MobilePay faktisk skulle bruge dine oplysninger, hvilket er hensynsløst. :[\n\n Det rigtige valg havde været at tjekke om du havde fået nogle krav på oplysninger på MobilePay-appen.';
    } else {
        showFeedback();
        console.log('Jeg ignorerer beskeden efter jeg har tjekket MobilePay-appen for beskeder');
        feedbackText.innerText = 'Du har sikret dig at MobilePay ikke gjorde krav på oplysninger inde på appen.\n\n MobilePay ville aldrig opkræve oplysninger fra dig via et link på en SMS.\n\n Du kan derfor konkludere, at beskeden var et forsøg på phishing, altså fup.\n\n Godt klaret! :]'
    };

    continueBtn.onclick = function() {
        showScenario2();
        console.log('fortsæt til 2. scenarie');
    };
};

btns1[1].onclick = function() {
    showFeedback();
    console.log('Jeg tjekker for beskeder på MobilePay-appen');
    feedbackText.innerText = 'Du er gået ind på MobilePay-appen.\n\n Du har ingen notifikationer, der fortæller dig, at du skal angive oplysninger.';
    correctRoute = true;

    continueBtn.onclick = function() {
        showScenario1();
        console.log('Jeg har tjekket MobilePay-appen, og jeg går tilbage til beskeden');
        btns1[1].classList.add('hidden');
    };
};

btns1[2].onclick = function() {
    showScenario3();
};

btns2[0].onclick = function() {
    showFeedback();
    console.log('Jeg stoler ikke på beskeden og ignorerer den');
    feedbackText.innerText = 'Beskeden og linket var begge legitime.\n\n Når beskeden oplyser sporingsnummer og afsender (og afsenderen stemmer overens med, hvem du har bestilt fra), kan du godt regne med, at beskeden er legitim.\n\n Linket har også den rette URL, som fører til PostNords hjemmeside.\n\n Det er godt du er kritisk, men du fik ikke sporet pakken, som du ville. :[';
    correctRoute = false;

    continueBtn.onclick = function() {s2Endings()};
};

btns2[1].onclick = function() {
    showFeedback();
    console.log('Jeg sporer pakken via linket');
    feedbackText.innerText = 'Beskeden og linket var begge legitime.\n\n Når beskeden oplyser sporingsnummer og afsender (og afsenderen stemmer overens med, hvem du har bestilt fra), kan du godt regne med, at beskeden er legitim.\n\n Linket har også den rette URL, som fører til PostNords hjemmeside.\n\n Du trykkede på det legitime link, som førte dig direkte til sporing af din pakke på PostNords hjemmeside. Ville du være 100% sikker, havde det rette valg været at gå på PostNords hjemmeside via din browser og indtaste sporingsnummeret manuelt. Det tager længere tid, men det er mere sikkert, da man aldrig burde trykke  på uopfordrede links.';

    continueBtn.onclick = function() {s2Endings()};
};

btns2[2].onclick = function() {
    showFeedback();
    console.log('Jeg sporer pakken via PostNords hjemmeside');
    feedbackText.innerText = 'Beskeden og linket var begge legitime.\n\n Når beskeden oplyser sporingsnummer og afsender (og afsenderen stemmer overens med, hvem du har bestilt fra), kan du godt regne med, at beskeden er legitim.\n\n Linket har også den rette URL, som fører til PostNords hjemmeside.\n\n Du valgte, at gå ind på PostNords hjemmeside via din browser og indtaste sporingsnummeret manuelt.\n\n Du valgte den rute, der tog længst tid, men også den mest sikre.\n\n Godt klaret! :]';

    continueBtn.onclick = function() {s2Endings()};
};

function s2Endings () {
    if (correctRoute) {
        console.log('Grøn slutning');
    } else {
        console.log('Gul slutning');
    };
};

function showScenario1 () {
    scenario1.classList.remove('hidden');
    scenario2.classList.add('hidden');
    scenario3.classList.add('hidden');
    scenario4.classList.add('hidden');
    feedbackSlide.classList.add('hidden');
};
function showScenario2 () {
    scenario1.classList.add('hidden');
    scenario2.classList.remove('hidden');
    scenario3.classList.add('hidden');
    scenario4.classList.add('hidden');
    feedbackSlide.classList.add('hidden');
};
function showScenario3 () {
    scenario1.classList.add('hidden');
    scenario2.classList.add('hidden');
    scenario3.classList.remove('hidden');
    scenario4.classList.add('hidden');
    feedbackSlide.classList.add('hidden');
};
function showScenario4 () {
    scenario1.classList.add('hidden');
    scenario2.classList.add('hidden');
    scenario3.classList.add('hidden');
    scenario4.classList.remove('hidden');
    feedbackSlide.classList.add('hidden');
};
function showFeedback () {
    scenario1.classList.add('hidden');
    scenario2.classList.add('hidden');
    scenario3.classList.add('hidden');
    scenario4.classList.add('hidden');
    feedbackSlide.classList.remove('hidden');
};