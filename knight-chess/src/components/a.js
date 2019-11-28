    function module() {
        aMaps = [];
        aPoint = oBox.getElementsByTagName('div');//此时已经有div加入到oBox中        
        for (var i = 0; i < iRow; i++) {
            aMaps[i] = [];
            for (var j = 0; j < iCol; j++) {
                aMaps[i][j] = aPoint[i * iCol + j];
            }
        }
    }