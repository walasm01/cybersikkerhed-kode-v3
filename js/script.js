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

let statement = true;

startBtn.onclick = function() {
    scenario1.classList.remove('hidden');
    startingSlide.classList.add('hidden');

    btns1[0].onclick = function() {
        feedbackSlide.classList.remove('hidden');
        scenario1.classList.add('hidden');
        feedbackText.innerText = 'Beskeden var et forsøg på phishing, og du ignorerede den. :]\n\n Du har dog ikke sikret dig, om MobilePay faktisk skulle bruge dine oplysninger, hvilket er hensynsløst. :[\n\n Det rigtige valg havde været at tjekke om du havde fået nogle krav på oplysninger på MobilePay-appen.';

        continueBtn.onclick = function() {
            feedbackSlide.classList.add('hidden');
            scenario2.classList.remove('hidden');

            btns2[0].onclick = function() {
                scenario2.classList.add('hidden');
                feedbackSlide.classList.remove('hidden');
                feedbackText.innerText = 'Beskeden og linket var begge legitime.\n\n Når beskeden oplyser sporingsnummer og afsender (og afsenderen stemmer overens med, hvem du har bestilt fra), kan du godt regne med, at beskeden er legitim.\n\n Linket har også den rette URL, som fører til PostNords hjemmeside.\n\n Det er godt du er kritisk, men du fik ikke sporet pakken, som du ville. :[';
                statement = false;

                continueBtn.onclick = function() {
                    if (statement) {
                        console.log('spoofy');
                    } else {
                        console.log(':(');
                    };
                };
            };
        };
    };

    btns1[1].onclick = function() {
        feedbackSlide.classList.remove('hidden');
        scenario1.classList.add('hidden');
        feedbackText.innerText = 'Du er gået ind på MobilePay-appen.\n\n Du har ingen notifikationer, der fortæller dig, at du skal angive oplysninger.';
    };

    btns1[2].onclick = function() {
        scenario1.classList.add('hidden');
        scenario3.classList.remove('hidden');
    }
}