/**
 * Created by jackie on 10/3/16.
 */
$(document).ready(function(){
    var i=1;
    $("#add_row").click(function(){
        $('#addr'+i).html("<td><input name='ruleName"+i+"' type='text' placeholder='Fight With Another Contestant' class='form-control' /></td><td><input name='rulePoints"+i+"' type='text' placeholder='5' class='form-control input-md'  /> </td>");

        $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
        i++;
    });
    $("#delete_row").click(function(){
        if(i>1){
            $("#addr"+(i-1)).html('');
            i--;
        }
    });

});