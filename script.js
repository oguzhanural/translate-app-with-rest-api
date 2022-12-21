'use strict';

const fromLanguage = document.querySelector("#from-lang");
const toLanguage = document.querySelector("#to-lang");
const buttonTranslate = document.getElementById("btnTranslate");
const fromText = document.querySelector("#from-text");
const toText = document.querySelector("#to-text");
const exchangeIcon = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons");

for(let language in languages){
    //console.log(`${language} ${languages[language]}`);
    let option = `<option value = "${language}">${languages[language]}</option>`;
    fromLanguage.insertAdjacentHTML("beforeend", option);
    toLanguage.insertAdjacentHTML("beforeend", option);

    fromLanguage.value = "tr-TR";
    toLanguage.value = "en-GB";
}

buttonTranslate.addEventListener("click", ()=> {
    let text = fromText.value;
    //console.log(text);
    let fromLang = fromLanguage.value;
    let toLang = toLanguage.value;
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLang}|${toLang}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            toText.value = data.responseData.translatedText;
        })
});

exchangeIcon.addEventListener("click", () => {
    //console.log("basıldı");
    let text = fromText.value;
    fromText.value = toText.value;
    toText.value = text;

    let lang = fromLanguage.value;
    fromLanguage.value = toLanguage.value;
    toLanguage.value = lang;

    buttonTranslate.click();

});

for (let icon of icons) {
   //console.log(icon);

icon.addEventListener("click", (element) => {
    //console.log(element);
    // tıklanan elementin targeti hangi ikona tıklandığını gösterir.
    if (element.target.classList.contains("fa-copy")) {
        // kullanıcı copy ikonuna tıklamıştır.
        //console.log("copy");
        if (element.target.id === "from") {
            // console.log("sol tarafta ki copy ikonu");
            navigator.clipboard.writeText(fromText.value);        
        }else {
            // console.log("sağ taraftaki copy ikonu");
            navigator.clipboard.writeText(toText.value);     
        }
        //https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
    }else{
        let utterance;
        if (element.target.id === "to") {
            //console.log("sağ tarafta ki volume ikonu");
            utterance = new SpeechSynthesisUtterance(toText.value);
            utterance.lang = toLanguage.value;
        }else {
            //console.log("sol taraftaki volume ikonu");
            utterance = new SpeechSynthesisUtterance(fromText.value);
            utterance.lang = fromLanguage.value;
        }
        speechSynthesis.speak(utterance);
    }
   });
    
}