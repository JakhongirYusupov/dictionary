const INPUT = document.querySelector('.search-input');
const form = document.querySelector('.form');
const HERO = document.querySelector('.hero');
const AUDIO = document.querySelector('.audio');

const urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
const url = new RegExp(urlRegex, 'i');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    GETDATA(INPUT.value);
})
const GETDATA = async (value) => {
    try {
        HERO.innerHTML = ''
        const DATA = await (await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`)).json();
        let data = DATA[0];
        let title = createElement('h2');
        for (let i of data.phonetics) {
            if (i.text) {
                title.innerText = `${DATA[0].word} -  ${i.text.split('/')[1]}`;
            }
            if (url.test(i.audio)) {
                renderAudio(i.audio);
            }
        }
        HERO.appendChild(title);

        for (let item of data.meanings) {
            for (let j of item.definitions) {
                if (j.definition) {
                    let desc = createElement('p');
                    desc.innerText = j.definition;
                    HERO.appendChild(desc);
                }

                if (j.example) {
                    let strong = createElement('strong');
                    let i = createElement('i');
                    i.innerText = `Example: "${j.example}"`
                    strong.appendChild(i);
                    HERO.appendChild(strong);
                }
            }
        }

    } catch (error) {
    }
}

const createElement = (value) => document.createElement(value);


let audio = null;
const renderAudio = (url) => {
    audio = new Audio(url);
}
AUDIO.addEventListener('click', () => {
    try {
        audio.play();
    } catch (error) {
    }
})