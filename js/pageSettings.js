import { createSettings } from "./mainmenuscripts.js";
const buttonSettingsMainMenu = document.getElementById("Settings");
buttonSettingsMainMenu.addEventListener("click", changePageSettings);

export let audioFile = document.createElement("audio");
audioFile.preload = "auto";
audioFile.src = "audio/wrongAnswer.mp3";
audioFile.src = "audio/correctAnswer.mp3";
audioFile.src = "audio/endCategory.mp3";
export let fontMusic = document.createElement("audio");
fontMusic.autoplay = "autoplay";
fontMusic.loop = "loop";
fontMusic.volume = 0.1;
fontMusic.src = "audio/fontMusic.mp3";
document.body.append(fontMusic);
document.body.append(audioFile);
export let isTimeGameBool;
export let timerTime;
export let volumeAudio;
export let volumeMusic;
export let resultsOfAuthorGame;
export let resultsOfPictureGame;

export function changePageSettings()
{
    document.body.append(createSettings());
    let buttons = document.querySelectorAll("button");
    for(let button of buttons)
    {
        button.classList.add("buttonActive");
    }
    const labelInputSoundVolume = document.querySelectorAll(".featureOfLabelInput");
    const inputSoundVolume = document.querySelectorAll(".inputSoundVolume");
    const buttonSwitchSound = document.querySelectorAll(".buttonSwitchSound");
    const isTimeGame = document.getElementById("inputTimeGameTime");
    const timeGame = document.querySelector(".inputNumberTimePlay");
    timeGame.value = timerTime - 1;

    let img = new Image();
    img.src = "icons/sOf.svg";
    let image = new Image();
    image.src = "icons/sOn.svg";

    isTimeGame.checked = isTimeGameBool;
    timeGame.disabled = !isTimeGameBool;
    inputSoundVolume[1].value = volumeAudio;
    labelInputSoundVolume[1].innerHTML = `${volumeAudio}`;
    if(volumeAudio == 0)
        buttonSwitchSound[1].classList.add("buttonSwitchSoundOff");

    inputSoundVolume[1].addEventListener("input", () => 
    { 
        labelInputSoundVolume[1].innerHTML = `${inputSoundVolume[1].value}`;
        audioFile.volume = inputSoundVolume[1].value / 100;
        volumeAudio = inputSoundVolume[1].value;
        if(inputSoundVolume[1].value == 0)
            buttonSwitchSound[1].classList.add("buttonSwitchSoundOff");
        else if(buttonSwitchSound[1].classList.contains("buttonSwitchSoundOff"))
            buttonSwitchSound[1].classList.remove("buttonSwitchSoundOff");
    });
    inputSoundVolume[1].addEventListener("change", () => 
    { 
        audioFile.src = "audio/wrongAnswer.mp3";
        audioFile.play();
    });
    buttonSwitchSound[1].addEventListener("click", () => 
    {
        buttonSwitchSound[1].classList.toggle("buttonSwitchSoundOff");
        if(inputSoundVolume[1].value == 0)
        {
            inputSoundVolume[1].value = 100;
            audioFile.volume = 1;
            volumeAudio = 100;
            labelInputSoundVolume[1].innerHTML = "100"; 
            audioFile.src = "audio/wrongAnswer.mp3";
            audioFile.play();
        }
        else
        {
            inputSoundVolume[1].value = 0;
            audioFile.volume = 0;
            volumeAudio = 0;
            labelInputSoundVolume[1].innerHTML = "0"; 
        }
    })

    inputSoundVolume[0].value = volumeMusic;
    labelInputSoundVolume[0].innerHTML = `${volumeMusic}`;
    if(volumeMusic == 0)
        buttonSwitchSound[0].classList.add("buttonSwitchSoundOff");

    inputSoundVolume[0].addEventListener("input", () => 
    { 
        labelInputSoundVolume[0].innerHTML = `${inputSoundVolume[0].value}`;
        fontMusic.volume = inputSoundVolume[0].value / 100;
        volumeMusic = inputSoundVolume[0].value;
        if(inputSoundVolume[0].value == 0)
            buttonSwitchSound[0].classList.add("buttonSwitchSoundOff");
        else if(buttonSwitchSound[0].classList.contains("buttonSwitchSoundOff"))
            buttonSwitchSound[0].classList.remove("buttonSwitchSoundOff");
    });
    buttonSwitchSound[0].addEventListener("click", () => 
    {
        buttonSwitchSound[0].classList.toggle("buttonSwitchSoundOff");
        if(inputSoundVolume[0].value == 0)
        {
            inputSoundVolume[0].value = 100;
            fontMusic.volume = 1;
            volumeMusic = 100;
            labelInputSoundVolume[0].innerHTML = "100"; 
        }
        else
        {
            inputSoundVolume[0].value = 0;
            fontMusic.volume = 0;
            volumeMusic = 0;
            labelInputSoundVolume[0].innerHTML = "0"; 
        }
    })
    
    isTimeGame.addEventListener("change", () => 
    {
        timeGame.disabled = !(isTimeGame.checked); 
        isTimeGameBool = isTimeGame.checked; 
    });

    timeGame.addEventListener("change", () => {
        if(timeGame.value < 5) 
            timeGame.value = 5;
        else if(timeGame.value > 30)
        timeGame.value = 30;
        else 
            timeGame.value = parseInt(`${timeGame.value}`, 10);
        timerTime = parseInt(`${timeGame.value}`, 10) + 1;
     });
}

window.addEventListener("load" , () =>
{
    if(localStorage.getItem("typeGame"))
        if(localStorage.getItem("typeGame") == "true")
            isTimeGameBool = true;
        else 
            isTimeGameBool = false;
    else isTimeGameBool = true;
    if(localStorage.getItem("TimeOfGame"))
        timerTime = localStorage.getItem("TimeOfGame");
    else timerTime = 6;
    if(localStorage.getItem("volumeAudio"))
        volumeAudio = localStorage.getItem("volumeAudio");
    else volumeAudio = 100;
    if(localStorage.getItem("volumeMusic"))
        volumeMusic = localStorage.getItem("volumeMusic");
    else volumeMusic = 100;
    if(localStorage.getItem("ArrayResultsAuthor"))
        resultsOfAuthorGame = (JSON.parse(localStorage.getItem("ArrayResultsAuthor"))).slice();
    else 
    {
        resultsOfAuthorGame = [];
        for( let i = 0; i < 9; ++i)
            resultsOfAuthorGame[i] = [];
    }
    if(localStorage.getItem("ArrayResultsPicture"))
        resultsOfPictureGame = (JSON.parse(localStorage.getItem("ArrayResultsPicture"))).slice();
    else 
    {
        resultsOfPictureGame = [];
        for( let i = 0; i < 9; ++i)
            resultsOfPictureGame[i] = [];
    }
    audioFile.volume = volumeAudio / 100;
    fontMusic.volume = volumeMusic/ 100;
});

window.addEventListener("beforeunload" , () =>
{
    localStorage.clear();
    if(isTimeGameBool != null && isTimeGameBool!= undefined)
        localStorage.setItem("typeGame", isTimeGameBool);
    if(timerTime)
        localStorage.setItem("TimeOfGame", timerTime);
    if(volumeAudio != null && volumeAudio != undefined)
        localStorage.setItem("volumeAudio", volumeAudio);
    if(volumeMusic != null && volumeMusic != undefined)
        localStorage.setItem("volumeMusic", volumeMusic);
    if(resultsOfAuthorGame)
        localStorage.setItem("ArrayResultsAuthor", JSON.stringify(resultsOfAuthorGame));
    if(resultsOfPictureGame)
        localStorage.setItem("ArrayResultsPicture", JSON.stringify(resultsOfPictureGame));
});


export async function createPageOfResults(type, number)
{
    const res = await fetch('images.json');
    const data = await res.json();
    let x;
    if(document.getElementById("divMainBodyID"))
    {
        x = document.getElementById("divMainBodyID");
        document.getElementById("divMainBodyID").remove();
    }
    let divBody = document.createElement("div");
    divBody.id = "divMainBodyID";
    divBody.style.zIndex = 0;
    let headerResults = document.createElement("header");
    let buttonEscape = document.createElement("button");
    let mainResults = document.createElement("main");
    let headerName = document.createElement("h3");

    divBody.classList.add("divMainBody");
    headerResults.classList.add("headerResults");
    headerName.classList.add("headerResultsName");
    mainResults.classList.add("mainResults");
    buttonEscape.classList.add("buttonEscape");
    if(type == 0)
        headerName.innerHTML = `Категории: Авторы(${number})`;
    else 
        headerName.innerHTML = `Категории: Картины(${number})`;
    buttonEscape.addEventListener("click", () => 
    {
        document.getElementById("divMainBodyID").remove(); 
        document.body.append(x); 
    })
    for(let i = 0; i < 12; ++i)
    {
        let imgAnswer = document.createElement("img");
        imgAnswer.classList.add("imgResultsOfGame");
        imgAnswer.style.content = `url(img/${120 * type + 12 * number + i}.jpg)`;
        if(type == 0)
        {
            if(resultsOfAuthorGame[number][i + 1] == false)
                imgAnswer.classList.add("imgResultsOfGameWrong");
        }
        else 
        {
            if(resultsOfPictureGame[number][i + 1] == false)
                imgAnswer.classList.add("imgResultsOfGameWrong");
        }
        imgAnswer.addEventListener("click", () => {informAboutImg(type, number, i, data)});
        mainResults.append(imgAnswer);
    }
    headerResults.append(buttonEscape);
    headerResults.append(headerName);
    divBody.append(headerResults);
    divBody.append(mainResults);
    document.body.append(divBody);
}

function informAboutImg(type, number, i, data)
{
    const divMesOfCategoryBackground = document.createElement("div");
    divMesOfCategoryBackground.style.zIndex = 1;
    const divMesOfCategory = document.createElement("div");
    const buttonMesOfCategory = document.createElement("button");
    const imgMesOfCategory = document.createElement("img");
    const authorTextOfCategory = document.createElement("p");
    const nameTextOfCategory = document.createElement("p");
    const ageTextOfCategory = document.createElement("p");


    divMesOfCategoryBackground.classList.add("divMessageOfCategoryBackground");
    divMesOfCategory.classList.add("divMessageOfCategory");
    imgMesOfCategory.classList.add("imgMessageOfCategory");
    imgMesOfCategory.style.content = `url(img/${120 * type + 12 * number + i}.jpg)`;
    authorTextOfCategory.classList.add("textInfMessageOfCategory");
    nameTextOfCategory.classList.add("textInfMessageOfCategory");
    ageTextOfCategory.classList.add("textInfMessageOfCategory");
    authorTextOfCategory.innerHTML = data[120 * type + 12 * number + i].author;
    nameTextOfCategory.innerHTML = data[120 * type + 12 * number + i].name;
    ageTextOfCategory.innerHTML = data[120 * type + 12 * number + i].year;
    buttonMesOfCategory.classList.add("buttonMessageOfCategory");
    buttonMesOfCategory.innerHTML = "Вернуться";
    buttonMesOfCategory.addEventListener("click", () => 
    {
        divMesOfCategoryBackground.remove();
    });

    divMesOfCategory.append(imgMesOfCategory);
    divMesOfCategory.append(authorTextOfCategory);
    divMesOfCategory.append(nameTextOfCategory);
    divMesOfCategory.append(ageTextOfCategory);
    divMesOfCategory.append(buttonMesOfCategory);
    divMesOfCategoryBackground.append(divMesOfCategory);
    document.body.prepend(divMesOfCategoryBackground);
}