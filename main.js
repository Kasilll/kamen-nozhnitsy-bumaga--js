const dataGame = {
	value: {
		player: 0,
		bot: 0
	},
	state: {
		win: 0,
		over: 0
	}
}

initGame('body');
levelStart();

function levelGame() {
    console.log('2 level')
    const gameContent = createEl("div", ["game-content"]);
	const gameAction = createEl("div", ["game-action"]);
	const gameActionBot = createEl("div", ["game-action-bot"]);
	const gameActionBotList = createEl("div", ["game-action-bot-list"]);
	const gameBlock1 = createEl("div", ["game-block"]);
    gameBlock1.classList.add('expectation');
    console.log(gameBlock1)
	gameActionBot.append(gameActionBotList);
	gameActionBotList.append(gameBlock1);
	gameAction.append( gameActionBot );
	gameContent.append( gameAction );

	const gameActionCenter = createEl("div", ["game-action-center"]);
	const spanCenter = document.createElement("span");
	spanCenter.innerHTML = "vs";
	gameActionCenter.append( spanCenter );
	gameAction.append( gameActionCenter );

	const gameActionPlayer = createEl( "div", ["game-action-player"] );
    const gameBlock = createEl("div", ["game-block"]);
    gameBlock.classList.add('expectation');
	gameActionPlayer.append( gameBlock );
	gameAction.append( gameActionPlayer );

    const gameInput = createEl("div", ["game-buttons"]);
    gameContent.append(gameInput);
    const btnB1 = createBtn(['btn'],"",'b1',selectPlayerKamen);
    const btnB2 = createBtn(['btn'],"",'b2',selectPlayerBumaga);
    const btnB3 = createBtn(['btn'],"",'b3',selectPlayerNozhnitsy);
    gameInput.append(btnB1);
    gameInput.append(btnB2);
    gameInput.append(btnB3);
    
    function selectPlayerBumaga() {
        selectClassForValue('bumaga',gameBlock,['expretion','nozhnitsy','kamen']);
        dataGame.value.player = 2;
        selectBot()
        resultGame()
        setTimeout(handlerLevelGameOver,500);
        
    }

    function selectPlayerKamen() {
        selectClassForValue('kamen',gameBlock,['expretion','nozhnitsy','bumaga']);
        dataGame.value.player = 1;
        selectBot()
        resultGame()
        setTimeout(handlerLevelGameOver,500);
    }

    function selectPlayerNozhnitsy() {
        selectClassForValue('nozhnitsy',gameBlock,['expretion','bumaga','kamen']);
        dataGame.value.player = 3;
        selectBot()
        resultGame()
        setTimeout(handlerLevelGameOver,500);
    }
    
    function selectBot() {
        let randomValue = randomInteger(1,3);
        dataGame.value.bot = randomValue;
        if(randomValue == 1) {
            selectClassForValue('kamen',gameBlock1,['expretion','nozhnitsy','bumaga'])
        }
        else if(randomValue == 2) {
            selectClassForValue('bumaga',gameBlock1,['expretion','nozhnitsy','kamen'])
        }
        else {
            selectClassForValue('nozhnitsy',gameBlock1,['expretion','bumaga','kamen'])
        }
    }
    
    function selectClassForValue(classAdd,sel,...classRemove) {
        sel.classList.remove(classRemove[0][0]);
        sel.classList.remove(classRemove[0][1]);
        sel.classList.remove(classRemove[0][2]);
        sel.classList.add(classAdd);
        return sel;
    }

	document.querySelector("#game").append(gameContent);
}
// функция делающая проверку кто победил
function resultGame () {
    if(dataGame.value.bot == 1 && dataGame.value.player == 3 || 
       dataGame.value.bot == 2 && dataGame.value.player == 1 ||
       dataGame.value.bot == 3 && dataGame.value.player == 2) {
            dataGame.state.over +=1;
    }
    else if (dataGame.value.bot == dataGame.value.player) {

    }
    else {
           dataGame.state.win +=1;
    }
}
//функция старта первого уровня
function initGame(parent) {
	const gameContainer = document.createElement("div");
	gameContainer.id = "game";
	document.querySelector(parent).append( gameContainer );
}

function levelStart() {
	document.querySelector("#game").append(createBtn("btn", "Старт","btnStartGame",handlerStartGame));
}
//функция удоляющая первый уровень и стартующая второй
function handlerStartGame() {
    levelClear();	
    levelGame();
}
//функция показывающая результат
function levelGameOver() {
    const container = createEl('div',['container']);
    const statistics = createEl('h1','');
    statistics.id = 'statistics';
    statistics.innerHTML = 'Статистика'
    container.append(statistics);
    const state = createEl('div',['state'])
    container.append(state);
    state.innerHTML = `<div class="win">
                            <div class="text">Побед : <span class="countWin">${dataGame.state.win}</span></div>
                        </div>
                        <div class="over">
                            <div class="text">Поражений : <span class="countOver">${dataGame.state.over}</span></div>
                        </div>`;
    
    const btnExit = createBtn(['btn'],'','exit',handlerStartGame);
    container.append(btnExit);
    document.querySelector("#game").append(container);
}
//функция стирающая предыдущий level и запускающая функцию, котрая показывает результат
function handlerLevelGameOver() {
    levelClear();
    levelGameOver();
}
//support fuction...
function createEl(el, classList) {
	const element = document.createElement(el);
	element.classList.add(...classList);
	return element;
}

function createBtn(classBtn, contentBtn, idBtn , handler) {
	const btn = document.createElement("button");
    btn.id = idBtn;
    btn.classList.add(...classBtn);
	btn.innerHTML = contentBtn;
	btn.addEventListener("click", handler);
	return btn;
}

function levelClear() {
	document.querySelector("#game").innerHTML = "";
}

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}


  

