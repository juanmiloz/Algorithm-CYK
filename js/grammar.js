export class Grammar{
    constructor(productions){
        this.productions = productions;
    }

    //CYK algorithm
    wordBelongs(word){
        var belongs = true;
        var cykMatrix = [];
        fillCykMatrix(word, cykMatrix);
        initializeCykMatrix(cykMatrix, word);
        loopCykMatrix(cykMatrix, word);
        return belongs
    }

    //Fills the triangle matrix with null values
    fillCykMatrix(word, cykMatrix){
        for (let i = 0; i < word.length; i++) {
            cykMatrix.push([]);
            for (let j = 0; j < word.length.length - i; j++) {
                cykMatrix[i].push(null);
            }
        }
    }

    //Initialize the first column of the matrix
    initializeCykMatrix(cykMatrix, word){
        var firstColumn = 1;
        for (let i = 0; i < word.length; i++) {
            let terminal = word.charAt(i);
            let setPossibleProds = getPossibleProds(terminal);
            cykMatrix[i][firstColumn] =setPossibleProds;
        }
    }

    //Gets the set of possible NON terminals that produces a specified terminal
    getPossibleProds(terminal){
        var set = [];
        for (var key in prods) {
            var currentProds = prods[key];
            if(currentProds.includes(terminal)){
                set.push(key);
            }
        }

        return set;
    }

    loopCykMatrix(cykMatrix, word){
        for (let j = 1; j < word.length; j++) {
            for (let i = 0; i < word.length - j + 1; i++) {
                const element = array[i];
                
            }
            
        }
    }

}