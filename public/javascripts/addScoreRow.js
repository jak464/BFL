/**
 * Created by jackie on 10/10/16.
 */
/**
 * Created by jackie on 10/3/16.
 */
$(document).ready(function(){
    var i=1;

    var options = $("#contestants > option").clone();

    $("#add_row").click(function(){
        var s = $("<select class='form-control' name='selectName' + i />");
        s.append(options);
        $('#manage'+i).html("<td><select class='form-control' name='selectName' + i>" + s.html() + "</select></td><td><input name='rulePoints"+i+"' type='text' placeholder='5' class='form-control input-md'  /> </td><td><input name='rulePoints"+i+"' type='text' class='form-control input-md'  /> </td>");

        $('#tab_logic').append('<tr id="addr'+(i+1)+'"></tr>');
        i++;
    });
    $("#delete_row").click(function(){
        if(i>1){
            $("#manage"+(i-1)).html('');
            i--;
        }
    });

});