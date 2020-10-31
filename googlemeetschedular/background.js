

console.log("background script working");
// alert(document.readyState);
xp = location.href;
// console.log(xp.includes("meet.google.com/*"));
if (xp.includes("meet.google.com")) {
    setTimeout(joinmeeting, 2000);
}



function joinmeeting() {
    if (document.readyState == "complete") {
        // alert("m in bc");
        try{
        // Mic Button
        window.document.querySelectorAll(".DPvwYc.JnDFsc.dMzo5")[0].click();
        // Webcam Button
        window.document.querySelectorAll(".DPvwYc.JnDFsc.dMzo5")[1].click();
        } catch(err) {
            console.log("EROOR");
        }

        setTimeout(joinmeet, 5500);

    }
}
function joinmeet() {
    // alert("join btn triggered");
    try {
        window.document.querySelector(".NPEfkd").click();
    } catch (error) {
        console.log("ERROR");
    }
    
}


let a = [];


var t = null;
function updater() {
    try{
    chrome.storage.sync.get(['time'], (result) => {
        if (a == null) { a = []; };
        a = JSON.parse(result.time);
        // console.log(a);

    });}
    catch{
        console.log("ERROR");
    }
}
if (t) {
    window.clearTimeout(t);
    t = null;
}
updater();
checker();
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "initialize") {
            // console.log(request.object);
            // let array = request.object;
            chrome.storage.sync.set({ "time": JSON.stringify(request.object) }, () => { });
            if (t) {
                window.clearTimeout(t);
                t = null;
            }
            checker();

        }
    }

);

function checker() {
    // chrome.storage.sync.get(['time'], (result) => {
    //     a = JSON.parse(result.time);
    // });
    updater();
    if (a == null) { a = []; };
    // console.log(a);
    a.forEach((element) => {
        // console.log("checking");
        // console.log(rtndate(), element.start);

        if (element.start == rtndate()) {
            console.log("start ", element.link);
            location.replace(element.link);

        }

        if (element.stop == rtndate()) {
            console.log("stopped");
            leaver();
        }

    });
    t = setTimeout(checker, 60000);

}

function leaver() {
    if (document.querySelector(".gV3Svc>span").nextElementSibling.innerText < 15) {
        console.log("i did it");
        //leave btn
        try{
        window.document.querySelector(".FbBiwc").click();
        } catch {
            console.log("ERROR");
        }

    } else {
        var v = setTimeout(leaver, 10000);
    }
}


// rtndate();
// console.log(JSON.parse(localStorage.getItem("timings")));
function rtndate() {
    var myDate = new Date();
    var hours = myDate.getHours();
    var minutes = myDate.getMinutes();
    if (hours < 10) { hours = "0" + hours };
    if (minutes < 10) { minutes = "0" + minutes; }

    var timetrigger = (hours + ":" + minutes);

    // console.log(timetrigger);
    return timetrigger;
    // var v= setTimeout(rtndate,1000);

} 