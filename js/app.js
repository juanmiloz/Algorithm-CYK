var grammar = {
    productions:prods
}

var prods = {};

$(document).ready(function() {
    
    cambiarVista('grammarInput');

    $('#submitInputW').click(function() {
        var input = $("#inputW").val();
        generarTabla(input);
        cambiarVista('matriz');
    });

    $('#submitInputG').click(function(){
        var input = $('#inputG').val();
        var test = input.split(";");
        console.log(test);
    });
});

function generarTabla(input){
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

function cambiarVista(objetivo){
    $(".view").hide();
    $(".view").each(
        function() {
            if($(this).attr("id") == objetivo){
                $(this).show();
            }
        }
    );
}