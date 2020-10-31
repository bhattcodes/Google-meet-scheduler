
document.querySelector("#addbtn").addEventListener("click",()=>{
    console.log("hello m from xmaster");
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "start", "links" : document.getElementById("startinput").value});
       });
});

document.querySelector("#delbtn").addEventListener("click",()=>{
    console.log("hello m from xmaster");
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "start1"});
       });
});
