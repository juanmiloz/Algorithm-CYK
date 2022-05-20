import {Grammar} from "./grammar";

$(document).ready(function() {
    var grammar = new Grammar(null);
    
    changeView('grammarInput');

    $('#submitInputW').click(function() {
        var input = $("#inputW").val();
        createTable(input);
        changeView('matriz');
    });

    $('#submitInputG').click(function(){
        var input = $('#inputG').val();
        getProductsValues(input);
        //grammar = new Grammar(prods);
        //console.log(grammar);
    });
});

/**
 * This method allows you to create the html which will form the matrix.
 * @param {String} input Its the String w, which will be checked if it belongs to the current grammar.
 */
function createTable(input){
    var tableSize = input.length;
    console.log(tableSize);
    $('#containerMatriz').html('');

    var table = "<table class='table table-bordered'>";

    for (var i = 0; i <= tableSize; i++){
        table += "<tr>";
        for(var j = 0; j <= tableSize; j++){
            if(j==0 && i == 0){
                table += "<td></td>";
            }else if(i == 0 && j > 0){
                table += "<td>j= "+j+" /<b>"+input.charAt(j-1)+"</b></td>";
            }else if(j == 0 && i > 0){
                table += "<td>i= "+i+" /<b>"+input.charAt(i-1)+"</b></td>";
            }else if(i <= (tableSize-(j-1))){
                table += "<td>CYK</td>";
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

/**
 * This method makes it possible to obtain the productions entered in the 
 * correct structure from the delivered string.
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