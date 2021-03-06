var prods = {};
var grammar;

$(document).ready(function() {
    changeView('menu');

    $('#initializeBtn').click(function() {
        changeView('grammarInput');
    })

    $('#submitInputW').click(function() {
        var input = $("#inputW").val();
        var output = grammar.wordBelongs(input);
        //console.log(output);
        if(output.belong){
            changeResult("trueBelong");
        }else{
            changeResult("falseBelong");
        }
        console.log(output.matrix);
        createTable(input,output.matrix);
        changeView('matriz');
    });

    $('#submitInputG').click(function(){
        var input = $('#inputG').val();
        getProductsValues(input);
        //console.log(prods);
        grammar = new Grammar(prods);
        //console.log(grammar);
        changeView('stringInput');
    });

    $('#changeResultView').click(function(){
        changeView('resultView');
    });

    $('#returnMenu').click(function(){
        grammar = null;
        changeView('menu');
    });

    $('#returnInputW').click(function(){
        changeView('stringInput');
    });
});

/**
 * This method allows you to create the html which will form the matrix.
 * @param {String} input Its the String w, which will be checked if it belongs to the current grammar.
 */
function createTable(input, matriz){
    var tableSize = input.length;
    console.log(tableSize);
    $('#containerMatriz').html('');

    var table = "<table class='table table-dark'>";

    for (var i = 0; i <= tableSize; i++){
        table += "<tr>";
        for(var j = 0; j <= tableSize; j++){
            if(j==0 && i == 0){
                table += "<td></td>";
            }else if(i == 0 && j > 0){
                table += "<td>j= "+j+" /<b> "+input.charAt(j-1)+"</b></td>";
            }else if(j == 0 && i > 0){
                table += "<td>i= "+i+" /<b>"+input.charAt(i-1)+"</b></td>";
            }else if(i <= (tableSize-(j-1))){
                table += "<td>{"+ matriz[i-1][j-1]+"}</td>";
            }
        }
        table += "</tr>"
    }
    table += "</table>";
    console.log(table);
    $('#containerMatriz').html(table);
}

/**
 * This method allows you to change the currently displayed screen.
 * @param {String} objetivo Contains the name of the screen to which you want to change to. 
 */
function changeView(objetivo){
    $(".view").hide();
    $(".view").each(
        function() {
            if($(this).attr("id") == objetivo){
                $(this).show();
            }
        }
    );
}

function changeResult(objetivo){
    $(".answer").hide();
    $(".answer").each(
        function() {
            if($(this).attr("id") == objetivo){
                $(this).show();
            }
        }
    );
}

/**
 * This method makes it possible to obtain the productions entered in the 
 * correct structure from the delivered string.
 * S:AB|BC,A:BA|a,B:CC|b,C:AB|a
 * @param {String} input its a grammar in a string
 */
function getProductsValues(input){
    var listProductions = input.split(",");
    for(let i = 0; i < listProductions.length; i++){
        let tempList = listProductions[i].split(":");
        let nonTerminal = tempList[0];
        let productionsNonTerminal = tempList[1].split("|");
        
        prods[nonTerminal] = productionsNonTerminal;
    }
}