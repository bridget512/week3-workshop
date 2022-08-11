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
                    $("#successmsg").removeClass("fail");
                    $("#successmsg").addClass("success");

                    // show the success message
                    $("#successmsg").removeClass("hideMessage");
                    $("#successmsg").addClass("showMessage");
                    // hide the error message
                    $("#errormsg").removeClass("showMessage");
                    $("#errormsg").addClass("hideMessage");
                }
                
                else {
                    $("#errormsg").addClass("fail");
                    $("#errormsg").removeClass("success");

                    // show the error message
                    $("#errormsg").removeClass("hideMessage");
                    $("#errormsg").addClass("showMessage");
                    // hide the success message
                    $("#successmsg").removeClass("showMessage");
                    $("#successmsg").addClass("hideMessage");
                }

            $("#postResultDiv").html(
                "<p>" + 
                    "Post success! <br>" + "Email address: " + user.userEmail + 
                    "</br>" + 
                    "Password: " + user.userPass + 
                    "</br>" + 
                    "Valid user: " + user.valid + 
                "</p>"
            );

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