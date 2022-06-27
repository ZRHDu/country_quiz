"use strict";

import { countryEqual } from './h-functions.js';

const elements = {
    answering: {
        answerText: document.getElementById('answer-text'),
        answerButton: document.getElementById('submit-answer')
    },
    directions: document.getElementById('directions'),
    info: {
        capital: document.getElementById('capital'),
        language: document.getElementById('language'),
        border: document.getElementById('border'),
        flag: document.getElementById('flag')
    }, 
    start: document.getElementById('start'),
    choices: document.getElementsByClassName('select'),
    qLocation: {
        current: document.getElementById('current'),
        total: document.getElementById('total'),
    }
};

const forQuiz = {
    type: 'all',
    countries: null,
    current: 0,
}

/* this will set the information section of the page to the current country */

function setInfo() {
    const curCountry = forQuiz.countries[forQuiz.current];
    
    elements.info.capital.innerText = countryEqual(curCountry, curCountry.capital[0]) ? 'Is it\'s own capital' : curCountry.capital;
    elements.info.border.innerText = curCountry.borders;
    elements.info.language.innerText = Object.values(curCountry.languages);
    elements.info.flag.src = curCountry.flags.png;

    elements.qLocation.current.innerText = forQuiz.current;
}

/* This is the setting up of the function for choosing the countries */

function choiceFunction(element) {
    element.target.style.backgroundColor = 'rgb(59, 87, 245)';
    for (let button of elements.choices) {
        if (button !== element.target) {
            button.style.backgroundColor = 'rgb(0, 47, 255)';
        };
    }
    forQuiz.type = element.target.dataset.value;
}

for (let button of elements.choices) {
    button.addEventListener('click', choiceFunction);
}

/* This is setting the function for the first time click for the start button (changing innerText to Restart) */

function toRestart() {
    elements.start.innerText = 'Restart';
    elements.directions.style.display = 'none';
    elements.start.removeEventListener('click', toRestart);
}

elements.start.addEventListener('click', toRestart);

/* This is setting the function for the functional click for the start button */

async function startQuiz() {
    const which = forQuiz.type === 'all' ? 'all' : 'region/' + forQuiz.type;
    const url = 'https://restcountries.com/v3.1/' + which;

    try {
        const response = await fetch(url);

        if (response.ok) {
            const jsonResponse = await response.json();
            const jsonResponseFiltered = jsonResponse.filter(country => country.independent);

            forQuiz.countries = jsonResponseFiltered.sort(() => (Math.random() > .5) ? 1 : -1); 

            elements.qLocation.total.innerText = forQuiz.countries.length;
            
            setInfo();
        } else {
            throw new Error('Request failed!')
        }
    } catch (e) {
        console.log(e);
    }
}

elements.start.addEventListener('click', startQuiz);


