var betType = "";

function soccerFormat() {

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
        var input = document.getElementById("message").value;
        document.getElementById("maorParagraph").innerHTML = input;
        document.getElementById("submit").disabled = false;


    }
}


function basketballFormat() {

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
            document.getElementById("paragraph").textContent = "לא הכנסת גבולות למשחק כדורסל"

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
            var ab = document.createTextNode(away + " מנצחת בפחות מ" + aLimit);
            y3.appendChild(ab);


            var y4 = document.createElement("LI");
            var tb = document.createTextNode(away + " מנצחת ב " + aLimit + " או יותר");
            y4.appendChild(tb);

            var y5 = document.createElement("LI");
            var tb = document.createTextNode("תהיה הארכה -הימור מסוכן ששוה 3 נקודות");
            y5.appendChild(tb);


            l.append(y);
            l.append(y2);
            l.append(y3);
            l.append(y4);
            l.append(y5);
            document.getElementById("submit").disabled = false;


        }


    }
}

function submit() {
    var ref = new Firebase('https://himur-cfiyati-default-rtdb.firebaseio.com');
    var betRef = ref.child("הימור");


    var home = document.getElementById("home").value;
    var away = document.getElementById("away").value;
    if (betType == "soccer") {
        var x = document.getElementById("gamePart").value;
        var input = document.getElementById("message").value;

        var bet = {
            'הימור כדורגל': {
                'מארחת': home,
                'מתארחת': away,
                'גוף ההימור': x,
                'הפינה של מאור': input
            }
        };


        betRef.set(bet);
        alert("ההימור נכתב בהצלחה")
    } else if (betType == "basketball") {
       
    
    } else {
        alert("בחירה לא מוצלחת")

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


}