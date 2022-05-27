class Grammar{
    constructor(productions){
        this.productions = productions;
    }

    //CYK algorithm
    wordBelongs(word){
        var belongs = false;
        var cykMatrix = [];
        this.fillCykMatrix(word, cykMatrix);
        this.initializeCykMatrix(cykMatrix, word);
        this.loopCykMatrix(cykMatrix, word);
        belongs = cykMatrix[0][word.length - 1].includes('S');
        
        var output = {
            belong : belongs,
            matrix : cykMatrix
        }

        return output;
    }

    //Fills the triangle matrix with null values
    fillCykMatrix(word, cykMatrix){
        for (let i = 0; i < word.length; i++) {
            cykMatrix.push([]);
            for (let j = 0; j < word.length.length - i; j++) {
                cykMatrix[i].push([]);
            }
        }
    }

    //Initialize the first column of the matrix
    initializeCykMatrix(cykMatrix, word){
        var firstColumn = 0;
        for (let i = 0; i < word.length; i++) {
            let terminal = word.charAt(i);
            let setPossibleProds = this.getPossibleProds(terminal);
            cykMatrix[i][firstColumn] = setPossibleProds;
        }
    }

    //Gets the set of possible NON terminals that produces a specified production
    getPossibleProds(production){
        var set = [];
        for (var key in this.productions) {
            var currentProds = this.productions[key];
            if(currentProds.includes(production)){
                set.push(key);
            }
        }
        return set;
    }

    //Loops the matrix according to CYK algorithm
    loopCykMatrix(cykMatrix, word){
        for (let j = 1; j < word.length; j++) {
            for (let i = 0; i < word.length - j; i++) {
                for (let k = 0; k < j; k++) {

                    //B and C are lists of non terminal variables
                    var b = cykMatrix[i][k];
                    var c = cykMatrix[i + (k + 1)][j - (k+1)];

                    //Creates the possible combinations of BC
                    var binaryProductions = this.createBinaryProds(b, c);
                    var setPossibleProds = []

                    //For each BC production find if it is produced by the grammar
                    for (var prod in binaryProductions) {
                        var temp = this.getPossibleProds(binaryProductions[prod]);
                        this.addValuesSet(setPossibleProds, temp);
                    }

                    if(cykMatrix[i][j] == undefined){
                        cykMatrix[i][j] = [];
                    }
                    
                    this.addValuesSet(cykMatrix[i][j], setPossibleProds);
                }
            }
            
        }
    }

    //Creates a list of all possible binary productions according to 2 lists
    //In case any list is empty, will return the non empty one
    createBinaryProds(b, c){
        if(b.length > 0 && c.length > 0){
            var binaryProds = [];
            for (let i = 0; i < b.length; i++) {
                for (let j = 0; j < c.length; j++) {
                    let temp = b[i] + c[j];
                    binaryProds.push(temp);
                }
            }
            
            return binaryProds
        }else{
            return (b.length > 0) ? c : b; 
        }
    }

    //Adds a list of new values to a set. If a value already exists it's ignored
    addValuesSet(set, newValues){
        for (var value in newValues) {
            if (!set.includes(newValues[value])) {
                set.push(newValues[value]);
            }
        }
    }

}