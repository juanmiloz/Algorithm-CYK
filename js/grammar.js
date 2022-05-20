class Grammar{
    constructor(productions){
        this.productions = productions;
    }

    //CYK algorithm
    wordBelongs(word){
        var belongs = true;
        var cykMatrix = [];
        fillCykMatrix(word, cykMatrix);
        initializeCykMatrix(cykMatrix, word);

        return belongs
    }

    fillCykMatrix(word, cykMatrix){
        for (let i = 0; i < word.length; i++) {
            cykMatrix.push([]);
            for (let j = 0; j < word.length.length - i; j++) {
                cykMatrix[i].push(null);
            }
        }
    }

    initializeCykMatrix(cykMatrix, word){
        var firstColumn = 1;
        for (let i = 0; i < word.length; i++) {
            let terminal = word.charAt(i);
            let setPossibleProds = getPossibleProds(terminal);
            cykMatrix[i][firstColumn] =setPossibleProds;
        }
    }

    getPossibleProds(terminal){}
}