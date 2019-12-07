
function getRounds(points, current) {
    var u = null;
    var l = null;
    var d = null;
    var r = null;   
    var rounds = [];
    // up
    if (current.row - 1 >= 0) {
        u = points[current.row - 1][current.col];
        rounds.push(u);
    }
    // left
    if (current.col - 1 >= 0) {
        l = points[current.row][current.col - 1];
        rounds.push(l);
    }
    // down
    if (current.row + 1 < points.length) {
        d = points[current.row + 1][current.col];
        rounds.push(d);
    }
    // right
    if (current.col + 1 < points[0].length) {
        r = points[current.row][current.col + 1];
        rounds.push(r);
    }
    return rounds;
}

function inList(list, current) {
    for (var i = 0, len = list.length; i < len; i++) {
        if ((current.row === list[i].row && current.col === list[i].col) || (current === list[i]))
            return true;
    }
    return false;
}

export function findway(s_x,s_y,e_x,e_y) {
    var points = []
    for (let i = 0; i <= 7; i++) {
        points.push([])
        for (let j = 0; j <= 7; j++) {
            points[i].push({
                F: 0,
                G: 0,
                H: 0,
                row: i,
                col: j,
                P: null
            })
        }
    }
    var start = {
        F: 0,
        G: 0,
        H: 0,
        row: s_x,
        col: s_y,
        P: null
    }
    var end = {
        F: 0,
        G: 0,
        H: 0,
        row: e_x,
        col: e_y,
        P: null
    }
    var opens = [];  
    var closes = [];  
    var cur = null;  
    var bFind = true;  
    // F=G+H
    start.F = 0;
    start.G = 0;
    start.H = 0;

    closes.push(start);
    cur = start;

    if (Math.abs(start.row - end.row) + Math.abs(start.col - end.col) === 1) {
        end.P = start;
        closes.push(end);
        bFind = false;
    }

    while (cur && bFind) {
        if (!inList(closes, cur))
            closes.push(cur);
        var rounds = getRounds(points, cur);
        for (var i = 0; i < rounds.length; i++) {
            if (rounds[i].val === 1 || inList(closes, rounds[i]) || inList(opens, rounds[i]))
                continue;
            else if (!inList(opens, rounds[i]) && rounds[i].val != 1) {
                rounds[i].G = cur.G + 1;
                rounds[i].H = Math.abs(rounds[i].col - end.col) + Math.abs(rounds[i].row - end.row);
                rounds[i].F = rounds[i].G + rounds[i].H;
                rounds[i].P = cur;           
                opens.push(rounds[i]);
            }
        }

        if (!opens.length) {
            cur = null;
            opens = [];
            closes = [];
            break;
        }
       
        opens.sort(function (a, b) {
            return a.F - b.F;
        });
       
        var oMinF = opens[0];
        var aMinF = []; 
       
        for (var i = 0; i < opens.length; i++) {
            if (opens[i].F === oMinF.F)
                aMinF.push(opens[i]);
        }
       
        if (aMinF.length > 1) {
           
            for (var i = 0; i < aMinF.length; i++) {
                aMinF[i].D = Math.abs(aMinF[i].row - cur.row) + Math.abs(aMinF[i].col - cur.col);
            }
            aMinF.sort(function (a, b) {
                return a.D - b.D;
            });
            oMinF = aMinF[0];
        }
     
        cur = oMinF;
        if (!inList(closes, cur))
            closes.push(cur);
        for (var i = 0; i < opens.length; i++) {
            if (opens[i]===cur) {
                opens.splice(i, 1);
                break;
            }
        }
        if (cur.H === 1) {
            end.P = cur;
            closes.push(end);
            cur = null;
        }
    }
    if (closes.length) {
        var dotCur = closes[closes.length - 1];
        var path = [];  
        var i = 0;
        while (dotCur) {
            path.unshift([dotCur.row,dotCur.col]);  
            dotCur = dotCur.P
            if (!dotCur.P) {
                dotCur = null;
            }
        }
        return path;
    }
    else {
        return false;
    }
}
