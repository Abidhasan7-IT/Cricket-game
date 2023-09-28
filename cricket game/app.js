
function qs(elm) {
    return document.querySelector(elm);
}
function qsA(elm) {
    return document.querySelectorAll(elm);
}

for (let i = 0; i < qsA(".control button").length; i++) {
    qsA(".control button")[i].onclick = function () {
        gameBrainFun(this.getAttribute('data-id'))
    }
}

var run, wicket, ball, extra, gameplay, innings = [];

// let TotalBall;
// const BallNum= document.querySelector('input').value;
// const BallButton= document.getElementById('over');
// BallButton.addEventListener('click',func) ;
// function func(){
//     TotalBall=BallNum;
// }


function initGame() {
    run = 0;
    wicket = 0;
    ball = 20;
    extra = 0;
    gameplay = true;
}
initGame();

function gameUpdate(n) {

    qs(".screen").innerHTML = n;
    qs(".score").innerHTML = run;
    qs(".wicket").innerHTML = wicket;
    qs(".ball").innerHTML = ball;

}

function wicketUpdate() {
    wicket++;
}
function ballUpdate() {
    ball--;
}
function extraUpdate(n) {
    extra += n;
}
function runUpdate(n) {
    run += n;
}



function gameBrainFun(n) {
    if (gameplay) {
        var p1_sel_num = Number(n);
        var selValidArray = [0, 1, 2, 3, 4, 5, 6]
        selValidArray.sort(() => .5 - Math.random())
        var com_sel_num = selValidArray[Math.floor(Math.random() * selValidArray.length)];

        var wicketType = ["Run Out", "Bold Out", "Catch Out", "LBW"];

        if (p1_sel_num == com_sel_num) {
            var wicketRandSel = wicketType[Math.floor(Math.random() * wicketType.length)]
            gameUpdate(wicketRandSel);
            wicketUpdate();
            ballUpdate()
        }
        else {
            var bonus = Math.random() > 0.5 ? true : false;
            if (bonus) {
                bonusFunc(p1_sel_num);
            } else {
                if (p1_sel_num == 0) {
                    gameUpdate("Dot Boll");
                    wicketUpdate()
                    ballUpdate();
                } else {
                    gameUpdate(p1_sel_num);
                    wicketUpdate()
                    ballUpdate(p1_sel_num);
                }
            }

        }

        if (wicket == 5 || ball == 0) {
            gameplay = false;
            var obj = {
                run: run, wicket: wicket, extra: extra, ball: 20 - ball
            }
            gameOver(obj);
        }
    
    }

}


// 2



function bonusFunc(n) {
    var p1_sel_num = n;
    var bonusType = ["NB", "WD", "LB", "B"];
    var bonusRandSel = bonusType[Math.floor(Math.random() * bonusType.length)]

    if (bonusRandSel == "NB") {
        if (p1_sel_num == 0) {
            runUpdate(1);
            extraUpdate(1)
            gameUpdate("No Ball");
        } else {
            extraUpdate(p1_sel_num + 1);
            runUpdate(p1_sel_num + 1);
            gameUpdate("NB+" + p1_sel_num);
        }

    }
    else if (bonusRandSel == "WD") {
        if (p1_sel_num == 6 || p1_sel_num == 0) {
            extraUpdate(1);
            runUpdate(1);
            gameUpdate("WD");
        } else {
            extraUpdate(p1_sel_num + 1);
            runUpdate(p1_sel_num + 1);
            gameUpdate("WD+" + p1_sel_num);
        }
    }

    else if (bonusRandSel == "LB") {
        ballUpdate();
        if (p1_sel_num == 6 || p1_sel_num == 0) {
            runUpdate(1);
            extraUpdate(1);
            gameUpdate("Leg Bye");
        } else {
            extraUpdate(p1_sel_num + 1);
            runUpdate(p1_sel_num + 1);
            gameUpdate("LB+" + p1_sel_num);
        }

    }

    else if (bonusRandSel == "B") {
        ballUpdate();
        if (p1_sel_num == 6 || p1_sel_num == 0) {
            runUpdate(1);
            gameUpdate("Bye");
            extraUpdate(1);
        } else {
            extraUpdate(p1_sel_num + 1);
            runUpdate(p1_sel_num + 1);
            gameUpdate("B+" + p1_sel_num);
        }

    }

}

qs(".nextBtnContainer").onclick = () => {
    qs(".innings_container").style.display = "none";

    if (innings.length == 2) {
        if (innings[0].run > innings[1].run) {
            qs(".winTextContainer h2").innerHTML = "Team A win The Mathch 😎!";
            qs(".play").style.display = "block";
        }
        else if (innings[0].run < innings[1].run) {
            qs(".winTextContainer h2").innerHTML = "Team B win The Mathch 😊!";
            qs(".play").style.display = "block";

        }
        else {
            qs(".winTextContainer h2").innerHTML = "The Mathch Tied !";
            qs(".play").style.display = "block";
        }
        qs(".winTextContainer").style.display = "block";

    }
    else {
        initGame();
        gameUpdate("")
    }   
}
function abid(){
    location.reload();
}

function gameOver(obj) {
    innings.push(obj);
    qs(".res_run").innerHTML = obj.run;
    qs(".res_wicket").innerHTML = obj.wicket;
    qs(".res_ball").innerHTML = obj.ball;
    qs(".res_extra").innerHTML = obj.extra;

    if (innings.length == 2) {
        qs(".inningsName").innerHTML = "Team B Innings: ";

    } else {
        qs(".inningsName").innerHTML = "Team A Innings: ";

    }
    qs(".innings_container").style.display = "block";

}



