import { createAuthorCategory } from "./mainmenuscripts.js";
import { timerTime } from "./pageSettings.js";
import { resultsOfAuthorGame } from "./pageSettings.js";
import { isTimeGameBool } from "./pageSettings.js";
import { audioFile } from "./pageSettings.js";
import { fontMusic } from "./pageSettings.js";

const buttonAuthors = document.getElementById("Authors");
let isFirstBody;
let firstBodyAuthor;
let secondBodyAuthor;
let timerStop;
let arrayAnswers = [];
let buttonTrueAnswer;
let buttonWrongAnswer;

buttonAuthors.addEventListener("click", () => { changePageCategoryAuthor(true); });

export function changePageCategoryAuthor(isMainMenu)
{
    console.log(resultsOfAuthorGame);
    isFirstBody = true;
    firstBodyAuthor = createAuthorCategory(0);
    secondBodyAuthor = createAuthorCategory(5);
    let buttons = firstBodyAuthor.querySelectorAll("button");
    for(let button of buttons)
    {
        button.classList.add("buttonActive");
    }
    buttons = secondBodyAuthor.querySelectorAll("button");
    for(let button of buttons)
    {
        button.classList.add("buttonActive");
    }
    firstBodyAuthor.style.float = "right";
    firstBodyAuthor.id+="1";
    secondBodyAuthor.id+="2";
    firstBodyAuthor.querySelector(".buttonListCategoryLeft").style.opacity = 0;
    secondBodyAuthor.querySelector(".buttonListCategoryRight").remove();
    firstBodyAuthor.querySelector(".buttonListCategoryRight").addEventListener("click", () => 
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
    secondBodyAuthor.querySelector(".buttonListCategoryLeft").addEventListener("click", () => 
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
        setTimeout(deferredChangePage, 1000, divBody, firstBodyAuthor, secondBodyAuthor);
        function deferredChangePage(divBody, firstBodyAuthor, secondBodyAuthor)
        {
            divBody.remove();
            document.body.prepend(firstBodyAuthor);
            document.body.append(secondBodyAuthor);
        }
    }
    else
    {
        document.getElementById("divMainBodyID").remove();
        document.body.prepend(firstBodyAuthor);
        document.body.append(secondBodyAuthor);
    }
}

export async function createPageOfGameAuthor(number)
{
    --number;
    const res = await fetch('images.json');
    const data = await res.json();
    let namesOfButtons = new Array();
    createArrayOfButtGameAuthor(namesOfButtons, data, number);

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
    const divImageQuestion = document.createElement("div");
    const imageQuestion = document.createElement("img");

    divBody.classList.add("divMainBody");
    buttonEscape.classList.add("buttonEscape");
    headerDivBody.classList.add("headerAuthorGame");
    timer.classList.add("timer");
    question.classList.add("questionGameAuthor");
    divContainer.classList.add("divForDivTypeOFAnswer")
    divImageQuestion.classList.add("divImageQuestionAuthor");
    imageQuestion.classList.add("imageQuestionAuthor");

    buttonEscape.addEventListener("click", () => { clearTimeout(timerStop); changePageCategoryAuthor(false); })
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
    divImageQuestion.append(imageQuestion);
    mainDivBody.append(divImageQuestion);
    for(let i = 0; i < 4; ++i)
    {
        let buttonAnswer = document.createElement("button");
        buttonAnswer.classList.add("buttonAnswerAuthor");
        buttonAnswer.id = `buttonAnswerAuthor${i}`;
        buttonAnswer.value = i;
        mainDivBody.append(buttonAnswer);
    }
    divBody.append(headerDivBody);
    divBody.append(mainDivBody);
    document.body.prepend(divBody);
    let buttons = document.querySelectorAll("button");
    for(let button of buttons)
    {
        button.classList.add("buttonActive");
    }
    changeQuestionAuthor(namesOfButtons, number, 0);
}

function createArrayOfButtGameAuthor(namesOfButtons, data, number)
{
    for(let i = 0; i < 12; ++i)
    {
        let namesOfButtonsFromQuestions = [data[12 * number + i].author];
        for(let j = 1; j < 4; ++j)
        {
            namesOfButtonsFromQuestions[j] = data[Math.floor(Math.random() * 240)].author;
            for(let k = 0; k < j; ++k)
            {
                if(namesOfButtonsFromQuestions[j] === namesOfButtonsFromQuestions[k])
                    {
                        namesOfButtonsFromQuestions[j] = data[Math.floor(Math.random() * 240)].author;
                        --k;
                    }
            }
        }
        namesOfButtons[i] = namesOfButtonsFromQuestions;
    }
}

function changeQuestionAuthor(arrayData, number, iteration)
{
    fontMusic.pause();
    if(buttonTrueAnswer && buttonTrueAnswer.classList.contains("buttonAnswerRight"))
        buttonTrueAnswer.classList.remove("buttonAnswerRight");
    if(buttonWrongAnswer && buttonWrongAnswer.classList.contains("buttonAnswerWrong"))
        buttonWrongAnswer.classList.remove("buttonAnswerWrong");
    const timer = document.querySelector(".timer");
    const img = document.querySelector(".imageQuestionAuthor");
    if(iteration < 12)
    {
        let isReallyTrue = true;
        for(let i = 0; i < 4; ++i)
        {
            let buttonAnswer = document.getElementById(`buttonAnswerAuthor${i}`);
            let randomNum = Math.floor(Math.random() * (4 - i));
            buttonAnswer.innerHTML = arrayData[iteration][randomNum];
            arrayData[iteration].splice(randomNum, 1);
            if(randomNum == 0 && isReallyTrue)
                {
                    buttonAnswer.name = "true";
                    buttonTrueAnswer = buttonAnswer;
                    isReallyTrue = false;
                }
            else 
                buttonAnswer.name = "false";

            buttonAnswer.disabled = false;
            buttonAnswer.onclick = () => { addAnswerToArrayAnswer(buttonAnswer, arrayData, number, iteration) };
        }
        img.style.content = `url("img/${12 * number + iteration}.jpg")`;
        if(isTimeGameBool)
            timerWorkAuthor(timerTime, timer, iteration, number, arrayData);
    }
    else if(iteration == 12)
    {
        audioFile.src = "audio/endCategory.mp3";
        audioFile.play();
        addEndMessageOfCategory(number);
    }
}

function addAnswerToArrayAnswer(buttonAnswer, arrayData, number, iteration)
{
    let buttons = document.querySelectorAll(".buttonAnswerAuthor");
    for( let button of buttons)
    {
        button.disabled = true;
    }
    if(buttonAnswer.name === "false")
    {
        audioFile.src = "audio/wrongAnswer.mp3";
        audioFile.play();
        let divTypeOFAnswer = document.getElementById(`divTypeOFAnswer${iteration}`);
        divTypeOFAnswer.classList.add("divTypeOFAnswerWrong");
        buttonWrongAnswer = buttonAnswer;
        buttonAnswer.classList.add("buttonAnswerWrong");
        buttonTrueAnswer.classList.add("buttonAnswerRight");
        arrayAnswers[iteration] = false;
    }
    else
    {
        audioFile.src = "audio/correctAnswer.mp3";
        audioFile.play();
        let divTypeOFAnswer = document.getElementById(`divTypeOFAnswer${iteration}`);
        divTypeOFAnswer.classList.add("divTypeOFAnswerRight");
        buttonAnswer.classList.add("buttonAnswerRight");
        arrayAnswers[iteration] = true;
    }
    clearTimeout(timerStop);
    setTimeout(addIntMedMessageOfCategory, 1000, arrayData, number, iteration);
}

function timerWorkAuthor(time, timer, iteration, number, arrayData)
{
    if(time != 0)
    {
        if(time > 10)
            timer.innerHTML = `00:${time - 1}`;
        else
            timer.innerHTML = `00:0${time - 1}`;
        timerStop = setTimeout(timerWorkAuthor, 1000, --time, timer, iteration, number, arrayData);
    }
    else
    {
        audioFile.src = "audio/wrongAnswer.mp3";
        audioFile.play();
        arrayAnswers[iteration] = false;
        let divTypeOFAnswer = document.getElementById(`divTypeOFAnswer${iteration}`);
        divTypeOFAnswer.classList.add("divTypeOFAnswerWrong");
        buttonTrueAnswer.classList.add("buttonAnswerRight");
        let buttons = document.querySelectorAll(".buttonAnswerAuthor");
        console.log(buttons);
        for( let button of buttons)
        {
            button.disabled = true;
            console.log("xxx");
        }
        setTimeout(addIntMedMessageOfCategory, 1000, arrayData, number, iteration);
    }
}

async function addIntMedMessageOfCategory(arrayData, number, iteration)
{
    const res = await fetch('images.json');
    const data = await res.json();

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
    imgMesOfCategory.style.content = `url(img/${12 * number + iteration}.jpg)`;
    authorTextOfCategory.classList.add("textInfMessageOfCategory");
    nameTextOfCategory.classList.add("textInfMessageOfCategory");
    ageTextOfCategory.classList.add("textInfMessageOfCategory");
    authorTextOfCategory.innerHTML = data[12 * number + iteration].author;
    nameTextOfCategory.innerHTML = data[12 * number + iteration].name;
    ageTextOfCategory.innerHTML = data[12 * number + iteration].year;
    buttonMesOfCategory.classList.add("buttonMessageOfCategory");
    buttonMesOfCategory.innerHTML = "Продолжить";
    buttonMesOfCategory.addEventListener("click", () => 
    {
        divMesOfCategoryBackground.remove();
        changeQuestionAuthor(arrayData, number, ++iteration);
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
        resultsOfAuthorGame[number][i + 1] = arrayAnswers[i];
        if(arrayAnswers[i] == true)
            countOfRightAnswers++;
    }
    resultsOfAuthorGame[number][0] = countOfRightAnswers;
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
            changePageCategoryAuthor(false);
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