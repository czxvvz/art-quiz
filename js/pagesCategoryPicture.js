import { createPictureCategory } from "./mainmenuscripts.js";
import { timerTime } from "./pageSettings.js";
import { resultsOfPictureGame } from "./pageSettings.js";
import { isTimeGameBool } from "./pageSettings.js";
import { audioFile } from "./pageSettings.js";
import { fontMusic } from "./pageSettings.js";

const buttonPictures = document.getElementById("Pictures");
let isFirstBody;
let firstBodyPicture;
let secondBodyPicture;
let timerStop;
let arrayAnswers = [];
let pictureTrueAnswer;
let pictureWrongAnswer;
let image = [];
for(let i = 0; i < 12; i++)
{
    image[i] = [];
    for(let j = 0; j < 4; ++j)
        image[i][j] = new Image();
}

buttonPictures.addEventListener("click", () => {changePageCategoryPicture(true); });
export function changePageCategoryPicture(isMainMenu)
{
    isFirstBody = true;
    firstBodyPicture = createPictureCategory(0);
    secondBodyPicture = createPictureCategory(5);
    let buttons = firstBodyPicture.querySelectorAll("button");
    for(let button of buttons)
    {
        button.classList.add("buttonActive");
    }
    buttons = secondBodyPicture.querySelectorAll("button");
    for(let button of buttons)
    {
        button.classList.add("buttonActive");
    }
    firstBodyPicture.style.float = "right";
    firstBodyPicture.id+="1";
    secondBodyPicture.id+="2";
    firstBodyPicture.querySelector(".buttonListCategoryLeft").style.opacity = 0;
    secondBodyPicture.querySelector(".buttonListCategoryRight").remove();
    firstBodyPicture.querySelector(".buttonListCategoryRight").addEventListener("click", () => 
    {
        if(isFirstBody)
        {
            let buttons = document.querySelectorAll("button");
            for(let button of buttons)
            {
                button.disabled = true;
            }
            document.getElementById("divMainBodyID1").classList.add("goRight");
            isFirstBody = false;
            setTimeout(removeClasses, 2000);
            function removeClasses()
            {
                for(let button of buttons)
                {
                    button.disabled = false;
                }
            }
        }
    })
    secondBodyPicture.querySelector(".buttonListCategoryLeft").addEventListener("click", () => 
    {
        if(!isFirstBody)
        {
            let buttons = document.querySelectorAll("button");
            for(let button of buttons)
            {
                button.disabled = true;
            }
            document.getElementById("divMainBodyID1").classList.add("goLeft");
            isFirstBody = true;
            setTimeout(removeClasses, 2000);
            function removeClasses()
            {
                document.getElementById("divMainBodyID1").classList.remove("goLeft");
                document.getElementById("divMainBodyID1").classList.remove("goRight");
                for(let button of buttons)
                {
                    button.disabled = false;
                }
            }
        }
    })
    if(isMainMenu)
    {
        let buttons = document.querySelectorAll("button");
        for(let button of buttons)
        {
            button.disabled = true;
        }
        let divBody = document.getElementById("divMainBodyID");
        divBody.classList.add("cutOpacity");
        setTimeout(deferredChangePage, 1000, divBody, firstBodyPicture, secondBodyPicture);
        function deferredChangePage(divBody, firstBodyPicture, secondBodyPicture)
        {
            divBody.remove();
            document.body.prepend(firstBodyPicture);
            document.body.append(secondBodyPicture);
        }
    }
    else
    {
        document.getElementById("divMainBodyID").remove();
        document.body.prepend(firstBodyPicture);
        document.body.append(secondBodyPicture);
    }
}

export async function createPageOfGamePicture(number)
{
    --number;
    const res = await fetch('images.json');
    const data = await res.json();
    let namesOfPictures = new Array();
    createArrayOfButtGamePicture(namesOfPictures, data, number);

    if(document.getElementById("divMainBodyID1"))
    document.getElementById("divMainBodyID1").remove();
    if(document.getElementById("divMainBodyID2"))
    document.getElementById("divMainBodyID2").remove();

    const divBody = document.createElement("div");
    divBody.id = "divMainBodyID";
    const headerDivBody = document.createElement("header");
    const mainDivBody = document.createElement("main");
    const buttonEscape = document.createElement("button");
    const timer = document.createElement("h1");
    const question = document.createElement("h4");
    const divContainer = document.createElement("div");
    const divContainerImg1 = document.createElement("div");
    const divContainerImg2 = document.createElement("div");

    divBody.classList.add("divMainBody");
    buttonEscape.classList.add("buttonEscape");
    headerDivBody.classList.add("headerPictureGame");
    mainDivBody.classList.add("mainPictureGame");
    timer.classList.add("timer");
    question.classList.add("questionGamePicture");
    divContainer.classList.add("divForDivTypeOFAnswer");
    divContainerImg1.classList.add("divContainerImg");
    divContainerImg2.classList.add("divContainerImg");

    buttonEscape.addEventListener("click", () => { clearTimeout(timerStop); changePageCategoryPicture(false); })
    for(let i = 0; i < 12; ++i)
    {
        let divTypeOfAnswer = document.createElement("div");
        divTypeOfAnswer.classList.add("divTypeOFAnswer");
        divTypeOfAnswer.id = `divTypeOFAnswer${i}`;
        divContainer.append(divTypeOfAnswer);
        fontMusic.play();
    }

    headerDivBody.append(buttonEscape);
    headerDivBody.append(timer);
    headerDivBody.append(question);
    headerDivBody.append(divContainer);
    for(let i = 0; i < 4; ++i)
    {
        let pictureAnswer = document.createElement("img");
        pictureAnswer.classList.add("imgAnswerPicture");
        pictureAnswer.id = `imgAnswerPicture${i}`;
        pictureAnswer.value = i;
        if(i < 2)
            divContainerImg1.append(pictureAnswer);
        else 
            divContainerImg2.append(pictureAnswer);
    }
    mainDivBody.append(divContainerImg1);
    mainDivBody.append(divContainerImg2);
    divBody.append(headerDivBody);
    divBody.append(mainDivBody);
    document.body.prepend(divBody);
    changeQuestionPicture(data, namesOfPictures, number, 0);
}

function createArrayOfButtGamePicture(namesOfPictures, data, number)
{
    for(let i = 0; i < 12; ++i)
    {
        let authorOfPicture = 120 + 12 * number + i;
        let namesOfPicturesFromQuestions = [`img/${authorOfPicture}.jpg`];
        image[i][0].src = namesOfPicturesFromQuestions[0];
        for(let j = 1; j < 4; ++j)
        {
            let authorOFRandomPicture = Math.floor(Math.random() * 240);
            namesOfPicturesFromQuestions[j] = `img/${authorOFRandomPicture}.jpg`;
            for(let k = 0; k < j; ++k)
            {
                if(namesOfPicturesFromQuestions[j] === namesOfPicturesFromQuestions[k] || 
                    data[authorOfPicture].author === data[authorOFRandomPicture].author)
                    {
                        authorOFRandomPicture = Math.floor(Math.random() * 240);
                        namesOfPicturesFromQuestions[j] = `img/${authorOFRandomPicture}.jpg`;
                        --k;
                    }
            }
            image[i][j].src = namesOfPicturesFromQuestions[j];
        }
        namesOfPictures[i] = namesOfPicturesFromQuestions;
    }
}

function changeQuestionPicture(data, arrayData, number, iteration)
{
    let imagesClass = document.querySelectorAll("img");
    for(let imageClass of imagesClass)
    {
        imageClass.classList.add("imgActiveCategoty");
    }
    fontMusic.pause();
    let question = document.querySelector(".questionGamePicture");
        question.innerHTML = `Какую картину написал ${data[120 + 12 * number + iteration].author}?`;
    if(pictureTrueAnswer && pictureTrueAnswer.classList.contains("pictureAnswerRight"))
        pictureTrueAnswer.classList.remove("pictureAnswerRight");
    if(pictureWrongAnswer && pictureWrongAnswer.classList.contains("pictureAnswerWrong"))
        pictureWrongAnswer.classList.remove("pictureAnswerWrong");
    const timer = document.querySelector(".timer");
    if(iteration < 12)
    {
        let isReallyTrue = true;
        for(let i = 0; i < 4; ++i)
        {
            let pictureAnswer = document.getElementById(`imgAnswerPicture${i}`);
            let randomNum = Math.floor(Math.random() * (4 - i));
            pictureAnswer.style.content = `url(${arrayData[iteration][randomNum]})`;
            arrayData[iteration].splice(randomNum, 1);
            if(randomNum == 0 && isReallyTrue)
                {
                    pictureAnswer.name = "true";
                    pictureTrueAnswer = pictureAnswer;
                    isReallyTrue = false;
                }
            else 
                pictureAnswer.name = "false";
            pictureAnswer.onclick = () => { addAnswerToArrayAnswer(pictureAnswer, arrayData, number, iteration, data) };
        }
        if(isTimeGameBool)
            timerWorkAuthor(timerTime, timer, iteration, number, arrayData, data);
    }
    else if(iteration == 12)
    {
        audioFile.src = "audio/endCategory.mp3";
        audioFile.play();
        addEndMessageOfCategory(number);
    }
}

function addAnswerToArrayAnswer(pictureAnswer, arrayData, number, iteration, data)
{
    let imagesClass = document.querySelectorAll("img");
        for(let imageClass of imagesClass)
        {
            imageClass.classList.remove("imgActiveCategoty");
        }
    let images = document.querySelectorAll(".imgAnswerPicture");
    for( let image of images)
    {
        image.onclick = function() {};
    }
    if(pictureAnswer.name === "false")
    {
        audioFile.src = "audio/wrongAnswer.mp3";
        audioFile.play();
        let divTypeOFAnswer = document.getElementById(`divTypeOFAnswer${iteration}`);
        divTypeOFAnswer.classList.add("divTypeOFAnswerWrong");
        pictureWrongAnswer = pictureAnswer;
        pictureAnswer.classList.add("pictureAnswerWrong");
        pictureTrueAnswer.classList.add("pictureAnswerRight");
        arrayAnswers[iteration] = false;
    }
    else
    {
        audioFile.src = "audio/correctAnswer.mp3";
        audioFile.play();
        let divTypeOFAnswer = document.getElementById(`divTypeOFAnswer${iteration}`);
        divTypeOFAnswer.classList.add("divTypeOFAnswerRight");
        pictureAnswer.classList.add("pictureAnswerRight");
        arrayAnswers[iteration] = true;
    }
    clearTimeout(timerStop);
    setTimeout(addIntMedMessageOfCategory, 1000, arrayData, number, iteration, data);
}

function timerWorkAuthor(time, timer, iteration, number, arrayData, data)
{
    if(time != 0)
    {
        if(time > 10)
            timer.innerHTML = `00:${time - 1}`;
        else
            timer.innerHTML = `00:0${time - 1}`;
        timerStop = setTimeout(timerWorkAuthor, 1000, --time, timer, iteration, number, arrayData, data);
    }
    else
    {
        let imagesClass = document.querySelectorAll("img");
        for(let imageClass of imagesClass)
        {
            imageClass.classList.remove("imgActiveCategoty");
        }
        audioFile.src = "audio/wrongAnswer.mp3";
        audioFile.play();
        arrayAnswers[iteration] = false;
        let divTypeOFAnswer = document.getElementById(`divTypeOFAnswer${iteration}`);
        divTypeOFAnswer.classList.add("divTypeOFAnswerWrong");
        pictureTrueAnswer.classList.add("pictureAnswerRight");
        let images = document.querySelectorAll(".imgAnswerPicture");
        for( let image of images)
        {
            image.onclick = function() {};
        }
        setTimeout(addIntMedMessageOfCategory, 1000, arrayData, number, iteration, data);
    }
}

async function addIntMedMessageOfCategory(arrayData, number, iteration, data)
{
    const divMesOfCategoryBackground = document.createElement("div");
    const divMesOfCategory = document.createElement("div");
    const buttonMesOfCategory = document.createElement("button");
    const imgMesOfCategory = document.createElement("img");
    const authorTextOfCategory = document.createElement("p");
    const nameTextOfCategory = document.createElement("p");
    const ageTextOfCategory = document.createElement("p");

    divMesOfCategoryBackground.classList.add("divMessageOfCategoryBackground");
    divMesOfCategory.classList.add("divMessageOfCategory");
    imgMesOfCategory.classList.add("imgMessageOfCategory");
    imgMesOfCategory.style.content = `url(img/${120 + 12 * number + iteration}.jpg)`;
    authorTextOfCategory.classList.add("textInfMessageOfCategory");
    nameTextOfCategory.classList.add("textInfMessageOfCategory");
    ageTextOfCategory.classList.add("textInfMessageOfCategory");
    authorTextOfCategory.innerHTML = data[120 + 12 * number + iteration].author;
    nameTextOfCategory.innerHTML = data[120 + 12 * number + iteration].name;
    ageTextOfCategory.innerHTML = data[120 + 12 * number + iteration].year;
    buttonMesOfCategory.classList.add("buttonMessageOfCategory");
    buttonMesOfCategory.innerHTML = "Продолжить";
    buttonMesOfCategory.addEventListener("click", () => 
    {
        divMesOfCategoryBackground.remove();
        changeQuestionPicture(data, arrayData, number, ++iteration);
    });

    divMesOfCategory.append(imgMesOfCategory);
    divMesOfCategory.append(authorTextOfCategory);
    divMesOfCategory.append(nameTextOfCategory);
    divMesOfCategory.append(ageTextOfCategory);
    divMesOfCategory.append(buttonMesOfCategory);
    divMesOfCategoryBackground.append(divMesOfCategory);
    document.body.prepend(divMesOfCategoryBackground);
}

function addEndMessageOfCategory(number)
{
    const divEndOfCategoryBackground = document.createElement("div");
    const divEndOfCategory = document.createElement("div");
    const resultOfCategory = document.createElement("h4");
    const buttonEndOfCategory = document.createElement("button");

    let countOfRightAnswers = 0;
    for(let i = 0; i < 12; ++i)
    {
        resultsOfPictureGame[number][i + 1] = arrayAnswers[i];
        if(arrayAnswers[i] == true)
            countOfRightAnswers++;
    }
    resultsOfPictureGame[number][0] = countOfRightAnswers;
    resultOfCategory.classList.add("resultOfCategory");
    divEndOfCategoryBackground.classList.add("divEndOfCategoryBackground");
    divEndOfCategory.classList.add("divEndOfCategory");
    buttonEndOfCategory.classList.add("buttonEndOfCategory");
    buttonEndOfCategory.innerHTML = "Продолжить";
    buttonEndOfCategory.addEventListener("click", () => 
    {
        let buttons = document.querySelectorAll("button");
        for(let button of buttons)
        {
            button.disabled = true;
        }
        divEndOfCategoryBackground.remove();
        let arrayOfDashes = [];
        for(let i = 0; i < 10; ++i)
        {
            let dash = document.createElement("div");
            arrayOfDashes[i] = dash;
            function createDash(dash)
            {
                dash.classList.add("dashDelete");
                dash.style.marginLeft = `${10 * i}vw`;
                document.body.append(dash);
            }
            setTimeout(createDash, 250 * i, dash);
        }
        function deleteAll()
        {
            for(let i = 0; i < 10; ++i)
            arrayOfDashes[i].remove();
            changePageCategoryPicture(false);
            fontMusic.play();
        }
        setTimeout(deleteAll, 2500);
    });

    resultOfCategory.innerHTML = `Вы ответили правильно на ${countOfRightAnswers} `;
    if(countOfRightAnswers == 1)
        resultOfCategory.innerHTML += 'вопрос.';
    else if (countOfRightAnswers > 1 && countOfRightAnswers < 5)
        resultOfCategory.innerHTML += 'вопроса.';
    else
        resultOfCategory.innerHTML += 'вопросов.';
    resultOfCategory.innerHTML += ' Поздравляем!';
    divEndOfCategory.append(resultOfCategory);
    divEndOfCategory.append(buttonEndOfCategory);
    divEndOfCategoryBackground.append(divEndOfCategory);
    document.body.prepend(divEndOfCategoryBackground);
}