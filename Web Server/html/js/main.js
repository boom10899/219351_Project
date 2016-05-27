function senddata() { 
    var str = formatString($('#paragraph').val());
    var jsondata = JSON.stringify({ "data": str });
    console.log(jsondata);
    $.ajax({
        type: "POST",
        url: "http://54.169.207.22:3000",
        data: jsondata,
        contentType: 'application/json',
        cache: false,
        beforeSend: function(xhr) {
            animateWait();
        },
        success: function(reply) {
            if (reply != "failed") {
                renderResult(reply);
            }
            else {
                alert(reply);
            } 
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
        },
    });
}

function formatString(str) {
    str = str.trim();
    str = str.replace("\t", "");
    // str = str.replace(/[.!?][ ]+/g, "\n");
    var strings = str.match(/((Jr\.|Mr\.|Ms\.|Mrs\.|Dr\.|(\.\w+)+|\.\w\.|[0-9]*\.[0-9]+)*[^.!?]+?)+[.!?]+/gmi );
    if (strings != null) {
        str = strings.join("\n");
    }
    // str = str.replace(/\[.!?]$/, "");
    return str;
}

function animateWait() {
    $('#submitbtn').html('Searching <i class=\"fa fa-spinner fa-pulse fa-fw\"></i>');
    $('#submitbtn').attr("disabled", true);
}

function renderResult(json) {
    json = JSON.parse(json);
    $('#results-wrapper').removeAttr("hidden");
    $('#results').html('<tr><th>String</th><th>Document\'s name</th></tr>');
    for (var i in json.results) {
        var result = json.results[i];
        var divText =
            "<td class=\"col-sm-7\">"+result.line+"</td>";
        var name = result.name+"";
        var divName =
            "<td class=\"col-sm-5\">"+
            "<a href=\"https://www.google.co.th/search?q="+
            encodeURI(name)+
            "\" target=\"_blank\">"+
            name+
            "</a>"+
            "</td>";
        $('#results').append("<tr>"+divText+"\n"+divName+"</tr>");
    }    

    $('#submitbtn').html('Submit');
    $('#submitbtn').attr("disabled", false);
}
