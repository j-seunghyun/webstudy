const fs = require("fs");
const path = require("path");
const readline = require("readline");

const reader = readline.createInterface({
    input:  process.stdin,
    output: process.stdout
});

function readFilePromise(inpath, encoding){
    return new Promise(function(resolve,reject){
        fs.readFile(inpath,encoding,function(err,data){
            if(err){
                reject(err);
                return;
            }
            resolve(data);
        })
    })
}
function outFilePromise(outpath, encoding , content){
    return new Promise(function(resolve,reject){

        fs.writeFile(outpath, content, encoding, function(err){
            if(err){
                reject(err);
                return;
            }
            resolve("success");
        })
    })
}
function multiMatrix(matrixA, matrixB){
    return new Promise((resolve, reject)=> {
        let resultmatrix = [];
        if (matrixA[0].length === matrixB.length) {

            let rowsize = matrixA.length;
            let colsize = matrixB[0].length;
            let commonsize = matrixA[0].length;

            resultmatrix = Array.from(Array(rowsize), ()=> Array(colsize).fill(0));
            for(let i = 0; i<rowsize; i++){
                for(let j =0; j<colsize; j++){
                    let tmp = 0;
                    for(let k = 0; k<commonsize; k++) {

                        tmp += matrixA[i][k]*matrixB[k][j];
                    }
                    resultmatrix[i][j] = tmp;
                }
            }
            resolve(resultmatrix);
        }
        else {
            reject("failed multiply matrix");
        }

    });
}

function readInputPromise(str){
    return new Promise(function(resolve, reject){
        reader.question(str, function(answer){

            reader.pause();
            resolve(answer);
        })
    })
}

function getMatrix(content) {
    let matrix = content.split("\r\n");
    if(matrix[matrix.length-1] === '')
        matrix.pop();

    let results = [];
    for (const i in matrix){
        let row = matrix[i].split(",");
        for(const col in row){
            row[col] = parseInt(row[col]);
        }
        results.push(row);
    }
    return results;
}

async function main(){
    let inFileLeftName = "ex1Left.csv";
    let inFileRightName = "ex1Right.csv";

    console.log(__dirname);

    let fullLeftPath = path.join(__dirname, "in", inFileLeftName);
    let fullRightPath = path.join(__dirname, "in", inFileRightName);

    console.log("Welcome to the matrix product calculator");
    console.log("The following matrices are founded.");

    let contentA = await readFilePromise(fullLeftPath, "utf-8");
    let contentB = await readFilePromise(fullRightPath, "utf-8");

    let leftmatrix = getMatrix(contentA);
    let rightmatrix = getMatrix(contentB);

    console.log("matrixA - (" + leftmatrix.length + " * " +leftmatrix[0].length+")");
    console.log("matrixB - (" + rightmatrix.length + " * "+ rightmatrix[0].length+")");

    let compare1 = await readInputPromise("Now, input the left matrix for product...    :   ");
    let compare2 = await readInputPromise("Now, input the right matrix for product...   :   ");

    let resultmatrix = [];
    console.log("Matrix Production : "+ compare1+" * "+compare2);

    if(compare1 === "matrixA"){
        try{
            resultmatrix =  await multiMatrix(leftmatrix, rightmatrix);
        }catch(error){
            console.log(error);
        }
    }
    else{
        try{
            resultmatrix =  await multiMatrix(rightmatrix, leftmatrix);
        }catch(error){
            console.log(error);
        }
    }


    console.log("calculation done. The size is ("+resultmatrix.length+ " * "+ resultmatrix[0].length+")");
    let outFileName = await readInputPromise("The matrix name for save (without csv extension)...   :   ");
    outFileName = outFileName+".csv";

    let outcontent="";
    for(let i = 0; i<resultmatrix.length; i++){
        for(let j =0; j<resultmatrix[0].length; j++){
            if(j === resultmatrix[0].length -1)
                outcontent += resultmatrix[i][j];
            else
                outcontent += resultmatrix[i][j]+",";
        }
        if(i === resultmatrix.length -1){}
        else
            outcontent = outcontent + "\r\n";
    }

    let outFilePath = path.join(__dirname, "out" , outFileName);
    let outfilesuccess = await outFilePromise(outFilePath,"utf-8",outcontent);
}

main();