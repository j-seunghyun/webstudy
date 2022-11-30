function getData(){
    return new Promise(function(resolve,reject){
        let data = 100;
        resolve(data);
    });
}

getData().then(function(resolvedData){
    console.log(resolvedData);
});