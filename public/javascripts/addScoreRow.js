/**
 * Created by jackie on 10/3/16.
 */
$(document).ready(function(){
    var i=1;

    var options = $("#contestantsSelect > option").clone();
    var options2 = $("#leagueRulesSelect > option").clone();


    $("#add_contestant_row").click(function(){
        var s = $("<select class='form-control' name='contestants" + i + "' />");
        var t = $("<select class='form-control' name='leagueRules" + i + "' />");
        s.append(options);
        t.append(options2);
        $('#manage'+i).html("<td><select class='form-control' name='contestants" + i + "'>" + s.html() + "</select></td><<td><select class='form-control' name='leagueRules" + i + "'>" + t.html() + "</select></td>");

        $('#tab_logic').append('<tr id="manage'+(i+1)+'"></tr>');
        i++;
    });
    $("#delete_contestant_row").click(function(){
        if(i>1){
            $("#manage"+(i-1)).html('');
            i--;
        }
    });

});