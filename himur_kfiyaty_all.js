var currentBet = {};
var basketBallNum = "";
var space = "&nbsp;"
var intervalId = 0;
var breakline = '</br>'
class StaticForFirebase {
    static names = [];
    static passwords = [];
    static ids = [];
    static user = "";
    static currentId = "";
}
var optionBasketball = -1;
var userBets = [];

function getUsers() {
    var select = document.getElementById("username")
    var ref = new Firebase('https://himur-kfiaty-users-default-rtdb.firebaseio.com/');
    ref.on("value", function(snapshot) {
        let name;
        var data = snapshot.val();
        var jstring = JSON.stringify(data);
        json = JSON.parse(jstring);
        for (var i in json["Users"]) {
            name = json["Users"][i]["user"]
            insertIntoSelect(select, name)
        }
    });
}

function fillNames() {

    var ref = new Firebase('https://himur-kfiaty-users-default-rtdb.firebaseio.com/');
    ref.on("value", function(snapshot) {
        let name;
        var data = snapshot.val();
        var jstring = JSON.stringify(data);
        json = JSON.parse(jstring);
        var k = 0;
        if (json != null) {
            for (var i in json["Users"]) {
                name = json["Users"][i]["user"]
                StaticForFirebase.names[k] = name;
                pass = json["Users"][i]["password"]
                StaticForFirebase.passwords[k] = pass;

                k++;
            }
        }

    });
}

function createTimer(date) {
    var countDownDate = new Date(date).getTime();
    clearInterval(intervalId);
    // Update the count down every 1 second
    var x = setInterval(function() {
        intervalId = x;
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;
        document.getElementById("timer").innerHTML = "";
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var time = days + "d " + hours + "h " +
            minutes + "m " + seconds + "s ";
        if (minutes < 10 && days <= 0 && hours <= 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = `  שים לב -זמן המשחק הוא בעוד פחות מעשר דקות ולכן לא ניתן להמר`.bold().fontsize(3).fontcolor("red");
            document.getElementById('submitBets').disabled = true;

        } else {
            document.getElementById("timer").innerHTML = `${time.bold().fontsize(8)}`;
            // document.getElementById("submitBets").style.display = "flex";
            document.getElementById('submitBets').disabled = false;
        }

    }, 1000);
}

function returnBack(table) {
    displayElement(table, "none");
    displayElement("pass", "flex");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";


}

function checkExistUser(user, users) {
    for (var i = 0; i < users.length; i++) {
        if (user == users[i]) {
            return true;
        }

    }
    return false;
}

function addUser() {
    var user = document.getElementById("usernameAdd").value;
    var password = document.getElementById("passwordAdd").value;
    console.log(StaticForFirebase.names)
    if (user == "" || password == "") {
        alert("אחד הערכים חסרים");
    } else {
        if (checkExistUser(user, StaticForFirebase.names)) {
            alert("משתמש  קיים במערכת")


        } else {
            var ref = new Firebase('https://himur-kfiaty-users-default-rtdb.firebaseio.com/');
            var userRef = ref.child("Users");
            userRef.push({ password, user })
            alert(":המשתמש " + user + " נקלט בהצלחה")
        }
    }

}


function confirmBeforeChange() {
    var username = document.getElementById("usernameChange").value;
    var password = document.getElementById("passwordChange").value;
    var flag = false;
    console.log(StaticForFirebase.passwords)
    for (var i = 0; i < StaticForFirebase.passwords.length; i++) {
        if (StaticForFirebase.names[i] == username && StaticForFirebase.passwords[i] == password) {

            flag = true;
        }
    }
    if (!flag) {
        alert("שם המשתמש או הסיסמא אינם נכונים")
    } else {
        document.getElementById("changeUser").style.display = "flex";
        document.getElementById("passwordChange").value = "";
        document.getElementById("usernameChange").disabled = true;
        document.getElementById("confirmBefore").disabled = true;


    }
}

function changeUser() {
    var json = "";
    var ref = new Firebase('https://himur-kfiaty-users-default-rtdb.firebaseio.com/');
    var userRef = ref.child("Users");
    user = {}
    var place = -1;
    var password = document.getElementById("passwordChange").value;
    var username = document.getElementById("usernameChange").value;
    var userDetailes = [];
    ref.on("value", function(snapshot) {
        var data = snapshot.val();
        var jstring = JSON.stringify(data);
        json = JSON.parse(jstring);
        var i = 0;
        for (var k in json["Users"]) {
            userDetailes[i] = k;
            i++;
        }

    });
    if (password == "") {
        document.getElementById("alertNoPassword").innerText = "לא הוכנסה סיסמא";
    } else {
        if (username == "") {
            document.getElementById("alertNoPassword").innerText = "לא הוכנס שם משתמש";
        } else {
            for (var i = 0; i < userDetailes.length; i++) {
                if (json["Users"][userDetailes[i]]["user"] == username) {
                    place = i;
                    break;
                }
            }
            userRef.child(userDetailes[place]).update({ password: document.getElementById("passwordChange").value })
            document.getElementById("alertNoPassword").innerText = "";
            alert("שינוי הסיסמא בוצע בהצלחה");
        }

    }

}

function moveToButton(table, user, pass) {

    displayElement("pass", "none");
    displayElement(table, "flex");

    document.getElementById('usernameChange').disabled = false;
    document.getElementById(user).value = "";
    document.getElementById(pass).value = "";
    document.getElementById('confirmBefore').disabled = false;
    displayElement("changeUser", "none");
    fillNames();

}

function confirmPassword() {

    var user = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var json = "";
    var userDetailes = [];

    var flag = false;
    var ref = new Firebase('https://himur-kfiaty-users-default-rtdb.firebaseio.com/');
    ref.on("value", function(snapshot) {
        var data = snapshot.val();
        var i = 0;

        var jstring = JSON.stringify(data);
        json = JSON.parse(jstring);
        if (json == null) {
            alert("אין משתמשים רשומים במערכת")
        } else {
            for (var k in json["Users"]) {
                userDetailes[i] = json["Users"][k];
                i++;
            }
        }


    });
    for (var i = 0; i < userDetailes.length; i++) {
        if (userDetailes[i]["user"] == user && userDetailes[i]["password"] == password) {
            flag = true;
        }
    }
    if (flag) {
        displayElement("page", "flex");
        displayElement("pass", "none");
        StaticForFirebase.user = user;
        getAlreadyBets();
        createBetsPage(user);
    } else {
        alert("שם המשתמש לא מתאים לסיסמא!!!");
    }
}


function getLimit(str) {
    var matches = str.match(/(\d+)/);
    if (matches) {
        return matches[0];
    }
}

function getListBets(elem) {
    return document.getElementById(elem).innerHTML;
}

function displayElement(elem, situation) {
    document.getElementById(elem).style.display = situation;
}

function basketballOverTimeFormat() {
    basketBallNum = getListBets('five');
    document.getElementById('numForBasketball').value = 0;
    document.getElementById('numForBasketball').disabled = true;
    document.getElementById("alert").textContent = " ההימור שלך בטווח של -" + getListBets('five');
    document.getElementById("alert1").textContent = "";
    optionBasketball = 4;
    document.getElementById('submitBets').disabled = false;

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

function createBetsPage(user) {
    var ref = new Firebase('https://himur-cfiyati-default-rtdb.firebaseio.com');
    ref.on("value", function(snapshot) {

        var data = snapshot.val();
        var json = JSON.stringify(data);
        var t = json.split('},');
        var bets = [];


        for (var i = 0; i < t.length; i++) {
            f = t[i];
            t[i] = f.substr(f.indexOf(":") + 1);
            bets[i] = JSON.stringify(t[i].split(","));
        }


        var select = document.querySelector('select');
        for (var i = 0; i < bets.length; i++) {
            insertIntoSelect(select, i + 1)

        }
    });
    document.getElementById("Welcome").innerHTML += `</br>${user.bold().fontsize(10)}`;
    getBetsDetails()

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
        document.getElementById("alert1").textContent = ` רק אם יוכנס ערך תקף כפתור האישור ייפתח`;

    } else if (val <= 0) {
        document.getElementById("alert").textContent = "אי אפשר להכניס 0 או קטן מ0";
        document.getElementById("alert1").textContent = ` רק אם יוכנס ערך תקף כפתור האישור ייפתח`;
    } else {
        document.getElementById('submitBets').disabled = false;
        document.getElementById("alert").textContent = "";
        document.getElementById("alert1").textContent = "";
        var select = document.getElementById('teamsBasketball');
        var more;
        var less;

        if (select.selectedIndex == 0) {

            more = getListBets('one');
            less = getListBets('two');
            optionBasketball = 0;
        } else {

            more = getListBets('three');
            less = getListBets('four');
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

function basketballTeams() {
    var select = document.getElementById('teamsBasketball');
    document.getElementById('submitBets').disabled = true;
    displayElement('apply', 'flex');

    if (select.value === 'הארכה') {
        basketballOverTimeFormat();
    } else {
        displayElement('numForBasketball', 'flex');
        document.getElementById('numForBasketball').value = "";
        document.getElementById('numForBasketball').disabled = false;
        document.getElementById('alert').textContent = "";


    }
}

function applyBasketBall() {
    alert(basketBallNum)
}

function getBetsDetails() {
    document.getElementById("alert1").textContent = "";
    var ref = new Firebase('https://himur-cfiyati-default-rtdb.firebaseio.com');
    ref.on("value", function(snapshot) {

        var data = snapshot.val();
        var json = JSON.stringify(data);
        var x = JSON.parse(json)
        var bets = []
        var types = [];

        var aways = [];
        var bodies = [];
        var homes = [];
        var hours = [];
        var maors = [];
        var perYears = [];
        var totalIds = [];
        var count = 0;
        for (var i in x["הימור"]) {
            bets[count] = x["הימור"][i]
            aways[count] = bets[count]["away"]
            bodies[count] = bets[count]["body"]
            homes[count] = bets[count]["home"]
            hours[count] = bets[count]["hour"]
            maors[count] = bets[count]["maor"]
            perYears[count] = bets[count]["perYear"]
            totalIds[count] = bets[count]["totalId"]
            types[count] = bets[count]["totalId"]["type"]
            count++;
        }
        document.getElementById("maors").innerHTML = "";
        var select = document.getElementById('gamePart');
        var text
        text = bets[select.selectedIndex];

        currentBet = text;
        if (text["type"] == "soccer bet") {
            document.getElementById('submitBets').disabled = false;
            displayElement("halfTime", "flex");
            displayElement("bets", "none");
            displayElement("alert", "none")

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
            displayElement("apply", "none");

        } else {
            document.getElementById("game").innerHTML = space.repeat(15) + text["home"].bold().fontsize(5) + " VS " + text["away"].bold().fontsize(5);

            displayElement('htlabel', 'none');
            displayElement('gamelabel', 'none');
            displayElement("halfTime", "none");
            displayElement("bets", "flex");
            document.getElementById("one").innerHTML = text["body"][0];
            document.getElementById("two").innerHTML = text["body"][1];
            document.getElementById("three").innerHTML = text["body"][2];
            document.getElementById("four").innerHTML = text["body"][3];
            document.getElementById("five").innerHTML = text["body"][4];
            displayElement("basketballTeamsId", "flex");


            var select = document.getElementById('teamsBasketball');
            for (var i = select.options.length; i >= 0; i--) {
                select.options[i] = null;
            }
            insertIntoSelect(select, currentBet['home']);

            insertIntoSelect(select, currentBet['away']);

            insertIntoSelect(select, 'הארכה');

            select.selectedIndex = 2;
            basketballOverTimeFormat();
        }
        document.getElementById("timer").innerHTML = '';
        createTimer(currentBet['hour']);
        var totalId = currentBet["totalId"];
        var perYear = currentBet["perYear"];
        StaticForFirebase.currentId = totalId;
        document.getElementById("ids").innerHTML = `הימור שנתי/הימור כלל שנתי${breakline}${totalId}/${perYear}`;

        document.getElementById("maors").innerHTML += `</br></br>${space.repeat(0)}#הפינה של מאור</br></br>${currentBet['maor'].fontcolor("brown")}`;
    });

}

function getAlreadyBets() {
    var ref = new Firebase('https://himur-kfiaty-users-bets-default-rtdb.firebaseio.com/');
    ref.on("value", function(snapshot) {
        var data = snapshot.val();
        var json = JSON.stringify(data);
        var js = JSON.parse(json);
        var count = 0;
        if (js != null) {
            for (var i in js[StaticForFirebase.user]) {
                userBets[count] = js[StaticForFirebase.user][i]["id"];
                StaticForFirebase.ids[count] = i;
                count += 1;
            }
        }


    });
}

function confirmBet() {
    var bet = {};
    if (userBets.includes(currentBet["totalId"])) {
        alert("שים לב הימרת כבר את המשחק הזה");

    } else {
        var ref = new Firebase('https://himur-kfiaty-users-bets-default-rtdb.firebaseio.com/');
        var reChild = ref.child(StaticForFirebase.user);

        var betForWrite = ` ההימור שלך הוא `;
        var alert1 = "";
        var winner;


        if (currentBet["type"] == "basketball bet") {
            var bool = bet["bool"] = document.getElementById("numForBasketball").value;
            bet["id"] = currentBet["totalId"];
            bet["type"] = currentBet["type"];
            bet["body"] = currentBet["body"][optionBasketball];
            bet["bool"] = bool;
            bet["winner"] = document.getElementById("teamsBasketball").value;
            betForWrite += ((bet["winner"] == "הארכה" ? "" : bet["winner"]) + bet["body"] + (bet["winner"] == "הארכה" ? "" : ` (${bet["bool"]}) הפרש `));
        } else {

            var homeScore = document.getElementById("my_guess1").value;
            var awayScore = document.getElementById("my_guess0").value;
            winner = homeScore == awayScore ? "תיקו" : (homeScore > awayScore ? currentBet["home"] : currentBet["away"]);
            alert1 = getAlert(homeScore, awayScore, "סיום");
            bet["home"] = currentBet["home"];
            bet["id"] = currentBet["totalId"];
            bet["type"] = currentBet["type"];
            bet["winner"] = winner;
            if (currentBet["body"].includes("+")) {
                var homeScoreht = document.getElementById("my_guess3").value;
                var awayScoreht = document.getElementById("my_guess2").value;
                if (parseFloat(homeScoreht) > parseFloat(homeScore)) {
                    alert1 += 'תוצאת מחצית לקבוצת בית גדולה מתוצאת סיום\r\n'
                }
                if (parseFloat(awayScoreht) > parseFloat(awayScore)) {
                    alert1 += 'תוצאת מחצית לקבוצת חוץ גדולה מתוצאת סיום\r\n'
                }
                var winnerht = homeScoreht == awayScoreht ? "" : (homeScoreht > awayScoreht ? currentBet["home"] : currentBet["away"]);
                alert1 += getAlert(homeScoreht, awayScoreht, "מחצית");
                bet["htresult"] = `${homeScoreht}:${awayScoreht}`;
                betForWrite += `במחצית ${winnerht} ${bet["htresult"]}\r\n`;

            }
            bet["away"] = currentBet["away"];
            bet["result"] = `${homeScore}:${awayScore}`;
            winner = winner != 'תיקו' ? winner : "";
            betForWrite += `סיום ${winner} ${bet["result"]}\r\n`;
        }
        console.log(alert1)
        if (alert1 != "") {
            alert(alert1);
        } else {

            reChild.push(bet);
            alert(betForWrite);
        }
    }


}


function getAlert(home, away, word) {
    var alert1 = home == "" ? ` עבור קבוצת בית לא הכנסת תוצאת ${word}` + "\r\n" : "";
    alert1 += away == "" ? `עבור קבוצת חוץ לא הכנסת תוצאת ${word}` + "\r\n" : "";
    alert1 += isNaN(home) || isNaN(away) ? "חייב להכניס מספר לתוצאה" + "\r\n" : "";
    return alert1;
}

function deleteBet() {
    if (!userBets.includes(StaticForFirebase.currentId)) {
        alert("ההימור לא קיים במערכת")
    } else {
        var ref = new Firebase('https://himur-kfiaty-users-bets-default-rtdb.firebaseio.com/');
        var reChild = ref.child(StaticForFirebase.user);
        var jsp;
        reChild.on("value", function(snapshot) {
            var data = snapshot.val();
            var json = JSON.stringify(data);
            var js = JSON.parse(json);
            jsp = js;

        });
        for (var i in jsp) {
            if (jsp[i]["id"] == StaticForFirebase.currentId) {
                reChild.child(i).remove();
                alert("ההימור נמחק בהצלחה");
                delete userBets[userBets.indexOf(StaticForFirebase.currentId)];
                delete StaticForFirebase.ids[StaticForFirebase.ids.indexOf(i)]
                break;
            }
        }


    }

}