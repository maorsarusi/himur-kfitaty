var betType = "";
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
class staticForId {
    static betYearId = -1;
    static betId = -1;
}
var maors = [];

function soccerFormat() {
    staticForId.betId = getId();
    staticForId.betYearId = getYearId();

    var home = document.getElementById("home").value;
    var away = document.getElementById("away").value;
    document.getElementById("gamePartDiv").style.display = "flex";
    document.getElementById("cen_par").style.display = "flex";
    document.getElementById("gamePartDivbasket").style.display = "none";

    document.getElementById("back").disabled = false;


    document.getElementById("basketball").disabled = true;
    if (home == "") {
        document.getElementById("paragraph").style.color = "red";
        document.getElementById("paragraph").textContent = "לא הכנסת קבוצת בית"
        document.getElementById("submit").disabled = true;
        document.getElementById("back").disabled = true;
    } else if (away == "") {
        document.getElementById("paragraph").style.color = "red";
        document.getElementById("paragraph").textContent = "לא הכנסת קבוצת חוץ"
        document.getElementById("submit").disabled = true;
        document.getElementById("back").disabled = true;
    } else {
        betType = "soccer";

        document.getElementById("paragraph").style.color = "black";
        var result = "<span style='color:green'>" + home + "</span>" + " נגד " + "<span style='color:blue'> " + away + " </span>" + ".<br/>";

        document.getElementById("paragraph").innerHTML = result;
        var x = document.getElementById("gamePart").value;

        document.getElementById("paragraph").innerHTML += x;
        document.getElementById("paragraph").innerHTML += ".<br/> <span style='font-weight:bold'> הפינה של מאור </span> <br/>";
        document.getElementById("maorParagraph").innerHTML = maors;
        document.getElementById("submit").disabled = false;


    }
}

function divide() {
    var txt;
    txt = document.getElementById('message').value;
    var text = txt.split(".");
    var str = text.join('.</br>');
    maors = str;
}

function basketballFormat() {
    staticForId.betId = getId();
    staticForId.betYearId = getYearId();

    var home = document.getElementById("home").value;
    var away = document.getElementById("away").value;
    document.getElementById("gamePartDiv").style.display = "none";
    document.getElementById("gamePartDivbasket").style.display = "flex";
    document.getElementById("cen_par").style.display = "flex";

    document.getElementById("soccer").disabled = true;

    document.getElementById("back").disabled = false;


    if (home == "") {
        document.getElementById("paragraph").style.color = "red";
        document.getElementById("paragraph").textContent = "לא הכנסת קבוצת בית"
    } else if (away == "") {
        document.getElementById("paragraph").style.color = "red";
        document.getElementById("paragraph").textContent = "לא הכנסת קבוצת חוץ"
    } else {

        betType = "basketball";
        document.getElementById("paragraph").style.color = "black";
        var result = "<span style='color:green'>" + home + "</span>" + " נגד " + "<span style='color:blue'> " + away + " </span>" + ".<br/>";

        document.getElementById("paragraph").innerHTML = result;

        document.getElementById("paragraph").innerHTML += ".<br/> <span style='font-weight:bold'> הפינה של מאור </span> <br/>";

        var hLimit = document.getElementById("homeLimit").value;
        var aLimit = document.getElementById("awayLimit").value;

        if (hLimit == "" || aLimit == "") {
            document.getElementById("paragraph").style.color = "red";
            document.getElementById("paragraph").textContent = " לא הכנסת גבולות למשחק כדורסל הכנס ולחץ שוב על כדורסל"

        } else if (isNaN(hLimit) || isNaN(aLimit)) {
            document.getElementById("paragraph").style.color = "red";
            document.getElementById("paragraph").textContent = "חייב להכניס מספר לגבולות"

        } else {

            var l = document.getElementById("list");
            l.innerHTML = '';
            var y = document.createElement("LI");
            var t = document.createTextNode(home + " מנצחת ב " + hLimit + " או יותר");
            y.appendChild(t);

            var y2 = document.createElement("LI");
            var aa = document.createTextNode(home + " מנצחת בפחות מ" + hLimit);
            y2.appendChild(aa);


            var y3 = document.createElement("LI");
            var tb = document.createTextNode(away + " מנצחת ב " + aLimit + " או יותר");
            y3.appendChild(tb);

            var y4 = document.createElement("LI");
            var ab = document.createTextNode(away + " מנצחת בפחות מ" + aLimit);
            y4.appendChild(ab);

            var y5 = document.createElement("LI");
            var tb = document.createTextNode("תהיה הארכה:הימור מסוכן ששוה 3 נקודות");
            y5.appendChild(tb);


            l.append(y);
            l.append(y2);
            l.append(y3);
            l.append(y4);
            l.append(y5);
            document.getElementById("submit").disabled = false;

            document.getElementById("maorParagraph").innerHTML = maors;
        }


    }
}

function getId() {
    var jpstring = [];
    var ref = new Firebase("https://himur-kfiaty-archive-default-rtdb.firebaseio.com/");
    ref.on("value", function(snapshot) {
        var data = snapshot.val();
        let jstring = JSON.stringify(data);
        json = JSON.parse(jstring);
        var splitting = json["id"]
        jpstring[0] = splitting;
    });
    var y = jpstring[0]
    return y;
}

function getYearId() {
    var jpstring = [];
    var ref = new Firebase("https://himur-kfiaty-archive-default-rtdb.firebaseio.com/");
    ref.on("value", function(snapshot) {
        var data = snapshot.val();
        let jstring = JSON.stringify(data);
        json = JSON.parse(jstring);
        var splitting = json["year_id"]
        jpstring[0] = splitting;


    });
    var y = jpstring[0]
    return y;
}

function submit() {

    var ref = new Firebase('https://himur-cfiyati-default-rtdb.firebaseio.com');
    var refArchive = new Firebase('https://himur-kfiaty-archive-default-rtdb.firebaseio.com/');

    var today = new Date();
    var current = today;

    var dd = String(today.getDate()).padStart(2, '0');
    if (dd.length == 1) {
        dd = '0' + dd;
    }
    var mm = String(today.getMonth() + 1);
    if (mm.length == 1) {
        mm = '0' + mm;
    }
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    if (hour.length == 1) {
        hour = '0' + hour;
    }
    var mintues = today.getMinutes();
    if (mintues.length == 1) {
        mintues = '0' + mintues;
    }
    var seconds = today.getSeconds();
    if (seconds.length == 1) {
        seconds = '0' + seconds;
    }


    today = dd + '-' + mm + '-' + yyyy + ' ' + hour + ':' + mintues + ':' + seconds;
    var betRef = ref.child("הימור");

    var betRefArcive = refArchive.child(today);
    var refId = refArchive.child("id");
    var refYear = refArchive.child("year_id");

    // var betId = getId();
    // var betYearId = getYearId();

    var time = document.getElementById("appt").value;
    var betTime = document.getElementById("date").value;
    betTime += (" " + time);
    if (Date.parse(betTime) < Date.parse(current)) {
        alert("תאריך המשחק עבר כבר...")
    } else {
        if (time == "") {
            alert("שים לב לא הכנסת שעת משחק, הכנס שוב ולחץ על אישור")
        } else {

            var home = document.getElementById("home").value;
            var away = document.getElementById("away").value;
            if (betType == "soccer") {
                var x = document.getElementById("gamePart").value;

                var bet = {
                    type: 'soccer bet',
                    'home': home,
                    'away': away,
                    'hour': betTime,
                    'body': x,
                    'maor': maors,
                    'perYear': staticForId.betYearId,
                    'totalId': staticForId.betId
                };


                betRef.push(bet);
                betRefArcive.set(bet);

                alert("ההימור נכתב בהצלחה")
            } else if (betType == "basketball") {
                var input = document.getElementById("message").value;
                var x = document.getElementById("list");
                var child = x.children;
                var text = [];
                text.push(child[0].textContent);
                text.push(child[1].textContent);
                text.push(child[2].textContent);
                text.push(child[3].textContent);
                text.push(child[4].textContent);



                var bet = {
                    type: 'basketball bet',
                    'home': home,
                    'away': away,
                    'hour': betTime,
                    'body': text,
                    'maor': maors,
                    'perYear': staticForId.betYearId,
                    'totalId': staticForId.betId
                };



                betRef.push(bet);
                betRefArcive.set(bet);
                alert("ההימור נכתב בהצלחה");



            } else {
                alert("בחירה לא מוצלחת")

            }
            staticForId.betId++;
            refId.set(staticForId.betId);

            staticForId.betYearId++;
            refYear.set(staticForId.betYearId);
        }
    }





}

function goBack() {
    if (betType == "soccer") {
        document.getElementById("basketball").disabled = false;
        document.getElementById("paragraph").innerHTML = ""
    } else {
        document.getElementById("soccer").disabled = false;
        document.getElementById("list").innerHTML = ""
    }
    document.getElementById("submit").disabled = true;
    document.getElementById("back").disabled = true;
    document.getElementById("maorParagraph").innerHTML = "";
    document.getElementById("home").value = "";
    document.getElementById("away").value = "";
    document.getElementById("time").value = "";



}

function removeRecords() {
    var ref = new Firebase('https://himur-cfiyati-default-rtdb.firebaseio.com');
    ref.remove();
    alert("כל הרשומות נמחקו אך אל דאגה, כולן נשמרות במקום אחר");

}