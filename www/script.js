$(document).ready(function() {
    console.log('jQuery Ready');
    
    $("#loginForm").submit(function(event) {
        event.preventDefault();
        ajaxPost();
    });

    function ajaxPost(){
        var formData ={
            userEmail: $("#userEmail").val(), 
            userPass:  $("#userPass").val()
        }
        $.ajax({
            type: "POST", contentType: "application/json",
            url: window.location + "api/login", 
            data: JSON.stringify(formData), 
            dataType: 'json',
            success : function(user) {

                if (user.valid == true) {
                    $("errormsg").addClass("hideMessage");
                    $("#loginForm").removeClass("fail");
                    $("#loginForm").addClass("success");

                    console.log('User Details Match Found');
                }
                
                else {
                    $("#loginForm").addClass("fail");
                    $("#loginForm").removeClass("success");

                    $("#errormsg").removeClass("hideMessage");
                    $("#errormsg").addClass("showMessage");
                    console.log('User Details Match NOT Found');
                }

            $("#postResultDiv").html("<p>" + "Post success! <br>" + "Email address: " + user.userEmail + "</br>" + "Password: " + user.userPass + "</br>" + "Valid user: " + user.valid + "</p>");

            },  
            error: function(e){
                // alert("Error!");
                console.log("ERROR: ", e);
            }
        });

      resetData();

    } // ajaxPost()

    function resetData(){
        $("#userEmail").val("");
        $("#userPass").val("");
    } 
    
});