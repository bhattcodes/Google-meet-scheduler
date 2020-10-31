console.log("working popups js")
show();

function gohome(){
    location.replace("home.html");
};
function goschd(){
    location.replace("schedule.html");
};
function gosettings(){
    location.replace("settings.html");
}
document.querySelector(".home").addEventListener("click",gohome);
document.querySelector(".schedule").addEventListener("click",goschd);
document.querySelector(".settings").addEventListener("click",gosettings);

try {
    if(localStorage.getItem("autojoin")=='true'){
   document.querySelector("#dabox").checked =true;}
   else{
    document.querySelector("#dabox").checked =false;
   }
}catch{
    console.log("ERROR");
}

function checktoogle() {
    var checkbox = document.getElementById("dabox");
    //   alert(checkbox.checked);
    if (checkbox.checked==true) {
        localStorage.setItem("autojoin", 'true');
    } else {
        localStorage.setItem("autojoin", 'false');
    }
}
try{
document.querySelector("#addbtn").addEventListener("click", () => {
    // document.querySelector("#updbtn").disabled = false;

    let obj = JSON.parse(localStorage.getItem("timings"));
    if (obj == null) { obj = []; }
    console.log(document.getElementById("startinput").value);
    obj.push({
        "start": document.getElementById("startinput").value,
        "stop": document.getElementById("endinput").value,
        "link": document.getElementById("linkinput").value
    })
    localStorage.setItem("timings", JSON.stringify(obj));
    // show();
    document.getElementById("startinput").value=null;
    document.getElementById("endinput").value=null;
    document.getElementById("linkinput").value= "";
})}catch{
    console.log("ERROR");
}
try{
document.querySelector("#delbtn").addEventListener("click", () => {
    document.querySelector("#updbtn").disabled = false;
    var xyz = localStorage.getItem("timings");
    a = JSON.parse(xyz);
    a.pop();
    localStorage.setItem("timings", JSON.stringify(a));
    show();
})
}catch{
    console.log("ERROR");
}
try{
document.querySelector("#updbtn").addEventListener("click", () => {
    document.querySelector("#updbtn").disabled = true;
    let obj = JSON.parse(localStorage.getItem("timings"));
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, { "message": "initialize", "object": obj });
    });
})}catch{
    console.log("ERROR");
}


function show() {
    // console.log(location.href)
    if(location.href.includes("schedule.html")){

     let obj = localStorage.getItem("timings");

    if (obj != null) {
        obj = JSON.parse(obj);
    }
    else {
        obj = [];
    }

    let html = "";
    obj.forEach(function (element, index) {
        html += `
        <tr>
        <td>${element.start}</td>
        <td>${element.stop}</td>
        <td>${element.link}</td>
        </tr>`;

    })
    if(html==""){ html=`<h2> Goto Home To add schedule</h2>`;
    document.querySelector(".tableheading").style.visibility = "hidden";
}
    document.getElementById("schdtable").innerHTML = html;
}

}