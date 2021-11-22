import { changePageCategoryAuthor } from "./pagesCategoryAuthor.js";
import { changePageCategoryPicture } from "./pagesCategoryPicture.js";
import { createPageOfGameAuthor } from "./pagesCategoryAuthor.js";
import { changePageSettings, resultsOfAuthorGame } from "./pageSettings.js";
import { createPageOfResults } from "./pageSettings.js";
import { resultsOfPictureGame } from "./pageSettings.js";
import { createPageOfGamePicture } from "./pagesCategoryPicture.js";
import { fontMusic } from "./pageSettings.js";

const img = document.querySelector('.imageMainMenu');
let imageAdd = new Image();
imageAdd.src = `img/${Math.floor(Math.random() * 240)}.jpg`;
imageAdd.addEventListener("load", () => { img.style.content = `url(${imageAdd.src})`;});
img.addEventListener('click', () => 
{ 
    let image = new Image();
    image.src = `img/${Math.floor(Math.random() * 240)}.jpg`;
    image.addEventListener('load', () => { img.style.content = `url(${image.src})`; }); 
    
})

export function createAuthorCategory(number)
{
    fontMusic.play();
    let image = new Image();
    image.src = `fonts/font_author.jpg`;
    let divBody = document.createElement("div");
    divBody.id = "divMainBodyID";
    let headerCategory = document.createElement("header");
    let buttonEscape = document.createElement("button");
    let nameHeaderCategory = document.createElement("p");
    let mainCategories = document.createElement("main");
    let buttonLeft = document.createElement("button");
    let buttonRight = document.createElement("button");

    for(let i = number; i < number + 5; ++i)
    {
        let buttonCategory = document.createElement('button');
        buttonCategory.value = i + 1;
        let numberButtonCategory = document.createElement("h3");
        buttonCategory.classList.add("buttonCategory");
        buttonCategory.classList.add("buttonCategoryImageAuthor");
        let resultsOfCategory = document.createElement("label");
        resultsOfCategory.classList.add("resultsOfCategory");
        numberButtonCategory.classList.add("numberButtonCategory");
        if(i == 9)
            numberButtonCategory.innerText = `${i + 1}`;
        else
            numberButtonCategory.innerText = `0${i + 1}`;
        if(resultsOfAuthorGame[i] && resultsOfAuthorGame[i][0] && Number.isInteger(resultsOfAuthorGame[i][0]))
        {
            resultsOfCategory.innerHTML = `${resultsOfAuthorGame[i][0]}/12`;
            function test()
            {
                createPageOfResults(0, number); 
                event.stopPropagation(); 
            }
            resultsOfCategory.addEventListener("click", test);
            numberButtonCategory.classList.add("numberButtonCategoryPlayed");
        }
        else
            resultsOfCategory.classList.add("resultsOfCategoryAbcent");
        buttonCategory.addEventListener("click", () => { createPageOfGameAuthor(buttonCategory.value) ;});
        buttonCategory.append(resultsOfCategory);
        buttonCategory.append(numberButtonCategory);
        mainCategories.append(buttonCategory);
    }

    divBody.classList.add("divMainBody");
    headerCategory.classList.add("headerCategory");
    nameHeaderCategory.classList.add("nameCategoryAuthor");
    buttonEscape.classList.add("buttonEscape");
    buttonLeft.classList.add("buttonListCategoryLeft");
    buttonRight.classList.add("buttonListCategoryRight");

    buttonEscape.addEventListener("click", buttonEscapeClick);

    headerCategory.append(buttonEscape);
    headerCategory.append(nameHeaderCategory);
    mainCategories.append(buttonLeft);
    mainCategories.append(buttonRight);
    divBody.append(headerCategory);
    divBody.append(mainCategories);
    return divBody;

}

export function createPictureCategory(number)
{
    fontMusic.play();
    let image = new Image();
    image.src = `fonts/font_picture.jpg`;
    let divBody = document.createElement("div");
    divBody.id = "divMainBodyID";
    let headerCategory = document.createElement("header");
    let buttonEscape = document.createElement("button");
    let nameHeaderCategory = document.createElement("p");
    let mainCategories = document.createElement("main");
    let buttonLeft = document.createElement("button");
    let buttonRight = document.createElement("button");

    for(let i = number; i < number + 5; ++i)
    {
        let buttonCategory = document.createElement('button');
        buttonCategory.value = i + 1;
        let numberButtonCategory = document.createElement("h3");
        buttonCategory.classList.add("buttonCategory");
        buttonCategory.classList.add("buttonCategoryImagePicture");
        let resultsOfCategory = document.createElement("label");
        resultsOfCategory.classList.add("resultsOfCategory");
        numberButtonCategory.classList.add("numberButtonCategory");
        if(i == 9)
            numberButtonCategory.innerText = `${i + 1}`;
        else
            numberButtonCategory.innerText = `0${i + 1}`;
        if(resultsOfPictureGame[i] && resultsOfPictureGame[i][0] && Number.isInteger(resultsOfPictureGame[i][0]))
        {
            resultsOfCategory.innerHTML = `${resultsOfPictureGame[i][0]}/12`;
            function test()
            {
                createPageOfResults(0, number); 
                event.stopPropagation(); 
            }
            resultsOfCategory.addEventListener("click", test);
            numberButtonCategory.classList.add("numberButtonCategoryPlayed");
        }
        else
            resultsOfCategory.classList.add("resultsOfCategoryAbcent");
        buttonCategory.addEventListener("click", () => { createPageOfGamePicture(buttonCategory.value) ;});
        buttonCategory.append(resultsOfCategory);
        buttonCategory.append(numberButtonCategory);
        mainCategories.append(buttonCategory);
    }

    divBody.classList.add("divMainBody");
    headerCategory.classList.add("headerCategory");
    nameHeaderCategory.classList.add("nameCategoryPicture");
    buttonEscape.classList.add("buttonEscape");
    buttonLeft.classList.add("buttonListCategoryLeft");
    buttonRight.classList.add("buttonListCategoryRight");

    buttonEscape.addEventListener("click", buttonEscapeClick);

    headerCategory.append(buttonEscape);
    headerCategory.append(nameHeaderCategory);
    mainCategories.append(buttonLeft);
    mainCategories.append(buttonRight);
    divBody.append(headerCategory);
    divBody.append(mainCategories);
    return divBody;
}

export function createSettings()
{
    fontMusic.play();
    if(document.getElementById("divMainBodyID"))
        document.getElementById("divMainBodyID").remove();
    let divBody = document.createElement("div");
    divBody.id = "divMainBodyID";

    let headerCategory = document.createElement("header");
    let buttonEscape = document.createElement("button");
    let nameHeaderCategory = document.createElement("p");
    let mainCategories = document.createElement("main");

    let buttonSwitchSound = document.createElement("button");
    let inputSoundVolume = document.createElement("input");
    inputSoundVolume.type = "range";
    inputSoundVolume.min = "0";
    inputSoundVolume.max = "100";
    inputSoundVolume.step = "1";
    let labebForinputSoundVolume = document.createElement("p");
    let buttonSwitchSound1 = document.createElement("button");
    let inputSoundVolume1 = document.createElement("input");
    inputSoundVolume1.type = "range";
    inputSoundVolume1.min = "0";
    inputSoundVolume1.max = "100";
    inputSoundVolume1.step = "1";
    let labebForinputSoundVolume1 = document.createElement("p");
    let labelSwitchGameTime = document.createElement("label");
    let inputSwitchGameTime = document.createElement("input");
    inputSwitchGameTime.type = "checkbox";
    inputSwitchGameTime.id = "inputTimeGameTime";
    let spanSwitchGameTime = document.createElement("span");
    let inputTimeGameTime = document.createElement("input");
    inputTimeGameTime.type = "number";
    inputTimeGameTime.min = "5";
    inputTimeGameTime.max = "30";
    inputTimeGameTime.value = 5;

    divBody.classList.add("divMainBody");
    headerCategory.classList.add("headerSettings");
    nameHeaderCategory.classList.add("nameCategorySettings");
    buttonEscape.classList.add("buttonEscape");
    buttonEscape.addEventListener("click", buttonEscapeClick);
    buttonSwitchSound.classList.add("buttonSwitchSound");
    inputSoundVolume.classList.add("inputSoundVolume");
    labebForinputSoundVolume.classList.add("featureOfLabelInput");
    buttonSwitchSound1.classList.add("buttonSwitchSound");
    inputSoundVolume1.classList.add("inputSoundVolume");
    labebForinputSoundVolume1.classList.add("featureOfLabelInput");
    labelSwitchGameTime.classList.add("switch");
    spanSwitchGameTime.classList.add("slider");
    inputTimeGameTime.classList.add("inputNumberTimePlay");

    let nameOfSettings;
    let arrayOfDivSettings = [];
    for(let i = 0; i < 3; ++i)
    {
        arrayOfDivSettings[i] = document.createElement("div");
        nameOfSettings = document.createElement("p");
        if( i == 0)
            nameOfSettings.innerHTML = "Громкость музыки:";
        else if( i == 1)
            nameOfSettings.innerHTML = "Громкость эффектов:";
        else if(i == 2)
            nameOfSettings.innerHTML = "Игра со временем:";
        arrayOfDivSettings[i].classList.add("divOfSettings");
        nameOfSettings.classList.add("featureOfDivSettings");
        arrayOfDivSettings[i].append(nameOfSettings);
    }

    labelSwitchGameTime.append(inputSwitchGameTime);
    labelSwitchGameTime.append(spanSwitchGameTime);
    arrayOfDivSettings[0].append(buttonSwitchSound1);
    arrayOfDivSettings[0].append(inputSoundVolume1);
    arrayOfDivSettings[0].append(labebForinputSoundVolume1);
    arrayOfDivSettings[1].append(buttonSwitchSound);
    arrayOfDivSettings[1].append(inputSoundVolume);
    arrayOfDivSettings[1].append(labebForinputSoundVolume);
    arrayOfDivSettings[2].append(labelSwitchGameTime);
    arrayOfDivSettings[2].append(inputTimeGameTime);
    headerCategory.append(buttonEscape);
    headerCategory.append(nameHeaderCategory);
    mainCategories.append(arrayOfDivSettings[0]);
    mainCategories.append(arrayOfDivSettings[1]);
    mainCategories.append(arrayOfDivSettings[2]);
    divBody.append(headerCategory);
    divBody.append(mainCategories);
    return divBody;
}

export function buttonEscapeClick()
{
    if(document.getElementById("divMainBodyID"))
    document.getElementById("divMainBodyID").remove();
    if(document.getElementById("divMainBodyID1"))
    document.getElementById("divMainBodyID1").remove();
    if(document.getElementById("divMainBodyID2"))
    document.getElementById("divMainBodyID2").remove();

    let divBody = document.createElement("div");
    const headerMainMenu = document.createElement("header");
    const nameHeaderMainMenu = document.createElement("h3");
    const mainMenu = document.createElement("main");
    const divButtonAuthors = document.createElement("div");
    const divButtonPictures = document.createElement("div");
    const divButtonSettings = document.createElement("div");
    const divImageMainMenu = document.createElement("div");
    const imageMainMenu = document.createElement("img");
    const buttonAuthorsMainMenu = document.createElement("button");
    const nameButtonAuthorsMainMenu = document.createElement("h3");
    const buttonPicturesMainMenu = document.createElement("button");
    const nameButtonPicturesMainMenu = document.createElement("h3");
    const buttonSettingsMainMenu = document.createElement("button");
    const nameButtonSettingsMainMenu = document.createElement("h3"); 

    let image = new Image();
    image.src = `img/${Math.floor(Math.random() * 240)}.jpg`;
    image.addEventListener("load", () => { imageMainMenu.style.content = `url(${image.src})`;});


    divBody.classList.add("divMainBody");
    divBody.id = "divMainBodyID";
    headerMainMenu.classList.add("headerMainMenuName");
    nameHeaderMainMenu.classList.add("textMainMenuName");
    divButtonAuthors.classList.add("divButtMainMenu");
    divButtonPictures.classList.add("divButtMainMenu");
    divButtonSettings.classList.add("divButtMainMenu");
    divImageMainMenu.classList.add("divImgMainMenu");
    imageMainMenu.classList.add("imageMainMenu");
    buttonAuthorsMainMenu.classList.add("buttonMainMenu");
    buttonAuthorsMainMenu.id = "Authors";
    nameButtonAuthorsMainMenu.classList.add("BMMName");
    nameButtonAuthorsMainMenu.id = "AuthorsH3";
    buttonPicturesMainMenu.classList.add("buttonMainMenu");
    buttonPicturesMainMenu.id = "Pictures";
    nameButtonPicturesMainMenu.classList.add("BMMName");
    nameButtonPicturesMainMenu.id = "PicturesH3";
    buttonSettingsMainMenu.classList.add("buttonMainMenu");
    buttonSettingsMainMenu.id = "Settings";
    nameButtonSettingsMainMenu.classList.add("BMMName");
    nameButtonSettingsMainMenu.id = "SettingsH3";

    buttonAuthorsMainMenu.addEventListener("click", () => { changePageCategoryAuthor(true); });
    buttonPicturesMainMenu.addEventListener("click", () => { changePageCategoryPicture(true); });
    buttonSettingsMainMenu.addEventListener("click", changePageSettings);
    imageMainMenu.addEventListener('click', () => 
    { 
        let image = new Image();
        image.src = `img/${Math.floor(Math.random() * 240)}.jpg`;
        image.addEventListener('load', () => { imageMainMenu.style.content = `url(${image.src})`; }); 
    });

    buttonAuthorsMainMenu.append(nameButtonAuthorsMainMenu);
    buttonPicturesMainMenu.append(nameButtonPicturesMainMenu);
    buttonSettingsMainMenu.append(nameButtonSettingsMainMenu);
    divButtonAuthors.append(buttonAuthorsMainMenu);
    divButtonPictures.append(buttonPicturesMainMenu);
    divButtonSettings.append(buttonSettingsMainMenu);
    divImageMainMenu.append(imageMainMenu);
    headerMainMenu.append(nameHeaderMainMenu);
    mainMenu.append(divButtonAuthors);
    mainMenu.append(divButtonPictures);
    mainMenu.append(divButtonSettings);
    mainMenu.append(divImageMainMenu);
    divBody.append(headerMainMenu);
    divBody.append(mainMenu);
    document.body.prepend(divBody);
    let buttons = document.querySelectorAll("button");
    for(let button of buttons)
    {
        button.classList.add("buttonActive");
    }
}