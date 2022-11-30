
class Icon{
    name = "";
    interval = 0;

    constructor(name ="", interval){
        this.name = name;
        this.interval = interval;
    }

    getInterval(){
        return this.interval;
    }

    getName(){
        return this.name;
    }
}

let iconlist = [];
let icondiv = document.getElementById("icondiv");
initIcon();
let stp = 0;
let currentindex =0;

function initIcon(){

    iconlist.push(new Icon("🧡", 1000));
    iconlist.push(new Icon("💛", 2000));
    iconlist.push(new Icon("💚", 3000));

}

//icon이 각 interval에 의해 출력되어야 한다.
function startFunc(){
   startAsync();
}

function printIcon(num){
    return new Promise((resolve)=>{
        let temp = iconlist[num];
        setTimeout(()=>{

            currentindex = num;
            console.log(currentindex);
            resolve(currentindex);
        }, temp.getInterval());
    });
}

async function startAsync(){

    while(true){

        if(currentindex === iconlist.length-1){
            currentindex = 0;
        }

        for(let i = currentindex; i<iconlist.length; i++){

            currentindex = await printIcon(i);

            if(stp === 0) {
                let iconcontainer = document.createElement("div");

                if(icondiv.hasChildNodes()){
                    let tempdiv = icondiv.firstChild;
                    icondiv.insertBefore(iconcontainer,tempdiv);
                }else{
                    icondiv.appendChild(iconcontainer);
                }

                let newiconsp = document.createElement("span");
                newiconsp.innerText = iconlist[i].getName();
                iconcontainer.appendChild(newiconsp);

                let newdatesp = document.createElement("span");
                let start = new Date();
                newdatesp.innerText = start.toString();
                iconcontainer.appendChild(newdatesp);
            }
            else{
                const res = await printIcon(i);
                break;
            }
        }
    }
}

function stopFunc(){

    //2. 종료 div 출력
    let iconcontainer = document.createElement("div");
    if(icondiv.hasChildNodes()){
        let tempdiv = icondiv.firstChild;
        icondiv.insertBefore(iconcontainer,tempdiv);
    }else{
        icondiv.appendChild(iconcontainer);
    }

    let newiconsp = document.createElement("span");
    newiconsp.innerText = "⛔";
    iconcontainer.appendChild(newiconsp);

    let newdatesp = document.createElement("span");
    let start = new Date();
    newdatesp.innerText = start.toString();
    iconcontainer.appendChild(newdatesp);

}

// icon이 iconlist 등에 추가되어야한다.
function insertFunc(){

    let newicon = prompt("enter new icon");
    let interval = prompt("enter interval");
    let icon = new Icon(newicon, interval);
    iconlist.splice(currentindex,0, icon);
}


let start = document.getElementById("start");
start.addEventListener("click", function(){
    document.getElementById("stop").disabled=false;
    document.getElementById("insert").disabled=true;
    stp =0;
    startFunc();
});

let stop = document.getElementById("stop");
stop.addEventListener("click", function(){
    document.getElementById("stop").disabled=true;
    document.getElementById("insert").disabled=false;
    stp = 1;
    stopFunc();
});

let insert = document.getElementById("insert");
insert.addEventListener("click", function(){
    insertFunc();
});