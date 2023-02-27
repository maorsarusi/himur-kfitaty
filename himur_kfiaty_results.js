var breakline = '</br>';
var space = "&nbsp;";
var betsStatic = [];
var currentBet = [];
var optionBasketball = -1;
class StaticForFirebase {
    static names = [];
    static bets = {};
}

function getAlreadyBets() {
    var ref = new Firebase('https://himur-kfiaty-users-bets-default-rtdb.firebaseio.com/');
    ref.on("value", function(snapshot) {
        var data = snapshot.val();
        var json = JSON.stringify(data);
        var js = JSON.parse(json);
        var count = 0;
        if (js != null) {
            for (var i in js) {
                StaticForFirebase.names[count] = i
                StaticForFirebase.bets[i] = js[i]
                count++;
            }
        }
    });
}

function getBetsDetails(...number) {

    var ref = new Firebase('https://himur-cfiyati-default-rtdb.firebaseio.com');
    ref.on("value", function(snapshot) {

        var data = snapshot.val();
        var json = JSON.stringify(data);
        var x = JSON.parse(json);
        var bets = []
        var types = [];
        const date = new Date();
        const today = date.getTime();
        var aways = [];
        var bodies = [];
        var homes = [];
        var hours = [];
        var maors = [];
        var perYears = [];
        var totalIds = [];
        var hour;
        var count = 0;
        var bet;
        for (var i in x["הימור"]) {
            bet = x["הימור"][i]
            hour = bet["hour"];
            var time = new Date(hour).getTime();

            if (time < today) {

                bets[count] = bet;
                hours[count] = hour;
                aways[count] = bets[count]["away"]
                bodies[count] = bets[count]["body"]
                homes[count] = bets[count]["home"]

                maors[count] = bets[count]["maor"]
                perYears[count] = bets[count]["perYear"]
                totalIds[count] = bets[count]["totalId"]
                types[count] = bets[count]["totalId"]["type"]
                betsStatic[count] = i;
                count++;

            }
        }
        document.getElementById("maors").innerHTML = "";
        var select = document.getElementById('gamePart');
        var text;
        if (number.length == 1) {
            for (var i = 0; i < betsStatic.length; i++) {
                insertIntoSelect(select, i + 1)
            }
            getAlreadyBets();
        }

        if (number.length == 0) {
            number = select.selectedIndex
        }
        text = bets[number];
        currentBet = text;
        if (text["type"] == "soccer bet") {
            document.getElementById('submitBets').disabled = false;
            displayElement("halfTime", "flex");

            insertTeams("game", 'home', 'away', text, 0, 1);
            if (text["body"].includes("+")) {
                insertTeams("halfTime", 'home', 'away', text, 2, 3);
                displayElement('htlabel', 'flex');
                displayElement('gamelabel', 'flex');


            } else {
                displayElement('halfTime', 'none');
                displayElement('htlabel', 'none');
            }
            displayElement("basketballTeamsId", "none");

        } else {
            document.getElementById("game").innerHTML = space.repeat(15) + text["home"].bold().fontsize(5) + " VS " + text["away"].bold().fontsize(5);

            displayElement('htlabel', 'none');
            displayElement('gamelabel', 'none');
            displayElement("halfTime", "none");
            displayElement("basketballTeamsId", "flex");


            var select = document.getElementById('teamsBasketball');
            for (var i = select.options.length; i >= 0; i--) {
                select.options[i] = null;
            }
            insertIntoSelect(select, currentBet['home']);

            insertIntoSelect(select, currentBet['away']);

            insertIntoSelect(select, 'הארכה');

            select.selectedIndex = 2;

            document.getElementById("numForBasketball").value = 0;
            document.getElementById("numForBasketball").disabled = true;
        }
        document.getElementById("timer").innerHTML = '';
        var totalId = currentBet["totalId"];
        var perYear = currentBet["perYear"];
        document.getElementById("ids").innerHTML = `הימור שנתי/הימור כלל שנתי${breakline}${totalId}/${perYear}`;

    });
    displayElement('loadBets', 'none');

}

function displayElement(elem, situation) {
    document.getElementById(elem).style.display = situation;
}

function insertTeams(elem, home, away, text, numH, numA) {
    document.getElementById(elem).innerHTML =
        `<input type=\"text\" id=\"my_guess${numA}\" name=\"my_guess${numA}\" placeholder=${text[home]}>
    <input type=\"text\" id=\"my_guess${numH}\" name=\"my_guess${numH}\" placeholder=${text[away]}>`;
}

function insertIntoSelect(select, elem) {
    var option = document.createElement('option');
    var text1 = elem;
    option.text = text1;
    select.add(option);
}

function basketballTeams() {
    if (document.getElementById("teamsBasketball").value == 'הארכה') {
        document.getElementById("numForBasketball").value = 0;
        document.getElementById("numForBasketball").disabled = true;
        document.getElementById("submitBets").disabled = false;
    } else {
        document.getElementById("numForBasketball").disabled = false;
    }
}

function getListBets(elem) {
    return currentBet["body"][elem];
}

function getLimit(str) {
    var matches = str.match(/(\d+)/);
    if (matches) {
        return matches[0];
    }
}

function validateDifference() {
    document.getElementById('submitBets').disabled = true;
    document.getElementById("alert1").textContent = "";
    var val = document.getElementById('numForBasketball').value;
    displayElement("alert", "flex");
    displayElement("alert1", "flex");
    if (isNaN(val) || val == "") {
        document.getElementById("alert").style.color = "red";
        document.getElementById("alert1").style.color = "red";
        document.getElementById("alert").textContent = `לא הכנסת מספר - חייב להכניס מספר`;

    } else if (val <= 0) {
        document.getElementById("alert").textContent = "אי אפשר להכניס 0 או קטן מ0";
    } else {
        document.getElementById('submitBets').disabled = false;
        document.getElementById("alert").textContent = "";
        document.getElementById("alert1").textContent = "";
        var select = document.getElementById('teamsBasketball');
        var more;
        var less;

        if (select.selectedIndex == 0) {

            more = getListBets(0);
            less = getListBets(1);
            optionBasketball = 0;
        } else {

            more = getListBets(2);
            less = getListBets(3);
            optionBasketball = 2;

        }
        var limit = parseInt(getLimit(more));
        if (limit <= val) {
            document.getElementById("alert").style.color = "black";

            document.getElementById("alert").textContent = "  ההימור שלך בטווח של -" + more;
            if (val == 0) {
                val = 1;
            }
            basketBallNum = more;
        } else {
            document.getElementById("alert").style.color = "black";
            document.getElementById("alert").textContent = " ההימור שלך בטווח של -" + less;
            basketBallNum = less;
            optionBasketball += 1;
            if (val == 0) {
                val = 1;
            }
        }
        basketBallNum += "(" + val + " הפרש)"
    }
}



function confirmBet() {

    var result = [];
    result["home"] = currentBet["home"];
    result["away"] = currentBet["away"];
    StaticForFirebase.currentId = currentBet["id"];

    if (currentBet["type"] == "basketball bet") {
        if (document.getElementById("teamsBasketball").value == 'הארכה') {
            result["winner"] = "הארכה";
            result["bool"] = 0;
            result["body"] = currentBet["body"][4];
        } else {
            result["bool"] = document.getElementById("numForBasketball").value;
            result["winner"] = document.getElementById("teamsBasketball").value;
            result["body"] = currentBet["body"][optionBasketball];

        }
    }
    console.log(StaticForFirebase.bets)
}