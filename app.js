const http = require("http");
const url = require("url");
const uniqid = require("uniqid");

let mereni = new Array();
function main(req, res) {
    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});
    let q = url.parse(req.url, true);
    let obj = {};
    if (q.pathname == "/start") {
        let m = {};
        m.tmStart = new Date().getTime(); //zjisteni casu startu
        let newId = uniqid();
        console.log(newId);
        mereni[newId] = m;

        obj.id = newId;
        obj.status = "Started";
        res.end(JSON.stringify(obj));
    } else if (q.pathname == "/stop") {
        let tmStop = new Date().getTime(); //zjisteni casu ukonceni mereni
        let id = q.query.id;
        console.log(id);
        let m = mereni[id];
        if (!m) {
            obj.status = "id not found";
            res.end(JSON.stringify(obj));
        }
        obj.status = "Stopped";
        obj.durSec = ((tmStop - m.tmStart)/1000).toFixed(1);
        res.end(JSON.stringify(obj));
    } else {
        obj.status = "API not exists";
        res.end(JSON.stringify(obj));
    }
}

http.createServer(main).listen(8080);