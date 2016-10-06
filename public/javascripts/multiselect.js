/**
 * Created by jackie on 10/5/16.
 */
$(document).ready(function() {

    var last_valid_selection = null;

    $('#testbox').change(function(event) {
        if ($(this).val().length > 5) {
            alert('You can only choose 5!');
            $(this).val(last_valid_selection);
        } else {
            last_valid_selection = $(this).val();
        }
    });
});