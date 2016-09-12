$('#Button1').click(function () {	
    var e = $.Event('keypress');
    e.which = 65; // Character 'A'
    $('item').trigger(e);
    return false;
});