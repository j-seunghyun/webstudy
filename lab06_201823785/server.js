const http = require('http')
const fs = require('fs')
const path = require("path")
const qs = require('querystring');
let count = 0;
let jsonlist = [];

function writeFilePromise(path, data, encoding){
    return new Promise(function(resolve, reject){
        fs.writeFile(path,data, encoding,function(err){
            if(err){
                console.log(err);
                return;
            }
            resolve();
        })
    })
}
function readFilePromise(inputpath, encoding){
    return new Promise(function(resolve,reject){
        fs.readFile(inputpath,encoding,async function(err,data){
            if(err){
                reject(err);
                return;
            }
            let contentA = await writeFilePromise(path.join(__dirname,"buffer.txt"), data, "utf-8");
            resolve(contentA);
        })
    })
}

function readDirPromise(){
    return new Promise(function(resolve,reject){
        fs.readdir(path.join(__dirname, "responses"), "utf-8", async function(err,files){
            let contentA;
            if(err){
                reject(err);
            }
            else{
                for(let file of files){
                    contentA = await readFilePromise(path.join(__dirname, "responses", file), "utf-8");
                }
                resolve(contentA);
            }
        })
    })
}

let app = http.createServer(async function(request, response){

    if(request.url == "/"){
        response.writeHead(200);
        fs.readFile(path.join(__dirname,"survey.html"),"utf-8",function(err, data) {
            if (err) {
                console.log(err);
                return;
            }
            response.end(data);
        });
    }

    //submit_success창
    if(request.url == "/submit_success.html"){

        //사용자가 post 요청 (submit를 눌렀을 때)
        if(request.method === "POST"){
            let body = "";
            request.setEncoding("utf-8");
            request.on("data", function(data){
                body += data;
            });

            request.on("end", function(){

                let post = qs.parse(body);
                post = JSON.stringify(post);
                let filename = "response_" + String(count++) +".json";
                fs.writeFile(path.join(__dirname,"responses" , filename), post, "utf-8", function(err){
                    if(err){
                        console.log(err);
                    }
                });

                response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                fs.readFile(path.join(__dirname,"submit_success.html"),"utf-8",function(err, data) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    response.end(data);
                });
            });
            request.on("error", function(){
                response.writeHead(401);
            });
        }
    }
    //survey_statistics 창
    if(request.url == "/survey_statistics.html"){

        let html;
        await readDirPromise();
        fs.readFile(path.join(__dirname, "buffer.txt"), "utf-8", function (err, data) {
            if (err) {
                response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
                //변환 후 파일 출력
                fs.readFile(path.join(__dirname, "survey_statistics.html"), "utf-8", function (err, data) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    response.end(data);
                });
                return;
            } else {
                let namelist = [];
                let idlist = [];
                let agelist = [];
                let majorlist = [];
                let subjectlist = [];
                jsonlist.push(data);
                for(let item of jsonlist){
                    let js = JSON.parse(item);
                    namelist.push(js.name);
                    idlist.push(js.student_id);
                    agelist.push(js.age);
                    majorlist.push(js.major);
                    subjectlist.push(js.subject);
                }
                let avgid = 0;
                let avgage = 0;
                for(let item of idlist){
                    avgid = avgid + parseInt(item);
                }
                for(let item of agelist){
                    avgage = avgage + parseInt(item);
                }
                avgid = Math.round(avgid/idlist.length);
                avgage = avgage/agelist.length;
                let software =0; let media = 0; let cyber = 0; let industrial =0;
                let web = 0; let operatingsystem =0; let artificial = 0; let engineering = 0; let database =0;

                for(let item of majorlist){
                    switch(item){
                        case "software":
                            software++;
                            break;
                        case "media":
                            media++;
                            break;
                        case "cyber":
                            cyber++;
                            break;
                        case "industrial":
                            industrial++;
                            break;
                        default:
                            break;
                    }
                }
                for(let list of subjectlist){
                    for(let item of list){
                        switch(item){
                            case "web":
                                web++;
                                break;
                            case "operatingsystem":
                                operatingsystem++;
                                break;
                            case "artificial":
                                artificial++;
                                break;
                            case "engineering":
                                engineering++;
                                break;
                            case "database":
                                database++;
                                break;
                            default:
                                break;
                        }
                    }
                }
                html = `<!DOCTYPE html>
<html lang="kor">
<head>
    <meta charset="UTF-8">
    <title>survey_statistics</title>
</head>
<body>
    <h1>통계</h1>
    <div id = "submit_p">
        <h3>제출자</h3>
        <h3>${namelist}</h3>
    </div>
    <div>
        <h3>제출자 평균 학번</h3>
        <h3>${avgid}</h3>
    </div>
    <div>
        <h3>제출자 평균 나이</h3>
        <h3>${avgage}</h3>
    </div>

    <h3>학과 통계</h3>
    <div>
        <table border : 10px>
            <tr>
                <th>학과</th>
                <th>인원</th>
            </tr>
            <tr>
                <td>소프트웨어학과</td>
                <td>${software}</td>
            </tr>
            <tr>
                <td>미디어학과</td>
                <td>${media}</td>
            </tr>
            <tr>
                <td>사이버보안학과</td>
                <td>${cyber}</td>
            </tr>
            <tr>
                <td>산업공학과</td>
                <td>${industrial}</td>
            </tr>
        </table>
    </div>
    <div>
        <h3>과목통계</h3>
    </div>
    <div>
        <table border = 1px>
            <tr>
                <th>과목</th>
                <th>인원</th>
            </tr>
            <tr>
                <td>웹시스템설계</td>
                <td>${web}</td>
            </tr>
            <tr>
                <td>운영체제</td>
                <td>${operatingsystem}</td>
            </tr>
            <tr>
                <td>인공지능</td>
                <td>${artificial}</td>
            </tr>
            <tr>
                <td>소프트웨어공학</td>
                <td>${engineering}</td>
            </tr>
            <tr>
                <td>데이터베이스</td>
                <td>${database}</td>
            </tr>
        </table>
    </div>
    <button onclick = "location.href = 'http://localhost:3000'">
        새로운 설문지 응답
    </button>
</body>
</html>`
            }
            response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            //변환 후 파일 출력
            fs.readFile(path.join(__dirname, "survey_statistics.html"), "utf-8", function (err, data) {
                if (err) {
                    console.log(err);
                    return;
                }
                response.end(html);
            });
        });
    }

});
app.listen(3000, "localhost");