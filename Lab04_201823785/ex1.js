function countdown(){

    console.log("Countdown:");
    let i;
    for(i = 5; i>=0; i--){
        (function(){
            setTimeout(function(){
                console.log(i===0 ? "GO!" : i);
            }, (5-i)*1000);
        })();
    }
}
countdown();