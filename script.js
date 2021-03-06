//[STEP 0]: Make sure our document is A-OK
$(document).ready(function () {
    //what kind of interface we want at the start 
    const APIKEY = "61fcfb383f215f310a37be8f";
    getContacts();
    let currentUser="";
    let currentEmail="";
    console.log(currentUser);
    
    $("#update-contact-container").hide();
    $("#add-update-msg").hide();
    $("#login-fail-msg").hide();
    
  
    //[STEP 1]: Create our submit form listener
    $("#contact-submit").on("click", function (e) {
      //prevent default action of the button 
      e.preventDefault();
      
  
      //[STEP 2]: let's retrieve form data
      //for now we assume all information is valid
      //you are to do your own data validation
      let userName = $("#username").val();
      let passWord = $("#password").val();
      let eMAIL = $('#email').val();
  
      //[STEP 3]: get form values when user clicks on send
      //Adapted from restdb api
      let jsondata = {
        "username": userName,
        "password": passWord,
        "email": eMAIL
      };
  
      //[STEP 4]: Create our AJAX settings. Take note of API key
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://hypeaholic-dde8.restdb.io/rest/username",
        "method": "POST", //[cher] we will use post to send info
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": JSON.stringify(jsondata),
        "beforeSend": function(){
          //@TODO use loading bar instead
          //disable our button or show loading bar
          $("#contact-submit").prop( "disabled", true);
          //clear our form using the form id and triggering it's reset feature
          $("#add-contact-form").trigger("reset");
          console.log(jsondata);
        }
      }
  
      //[STEP 5]: Send our ajax request over to the DB and print response of the RESTDB storage to console.
      $.ajax(settings).done(function (response) {
        console.log(userName);
        console.log(eMAIL);
        console.log(response);
        
        $("#contact-submit").prop( "disabled", false);
        
        //@TODO update frontend UI 
        $("#add-update-msg").show();
  
        //update our table 
        getContacts();
      });
    });//end click 
  
  
    //[STEP] 6
    //let's create a function to allow you to retrieve all the information in your contacts
    //by default we only retrieve 10 results
    function getContacts(limit = 10, all = true) {
  
      //[STEP 7]: Create our AJAX settings
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://hypeaholic-dde8.restdb.io/rest/username",
        "method": "GET", //[cher] we will use GET to retrieve info
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
      }
  
      //[STEP 8]: Make our AJAX calls
      //Once we get the response, we modify our table content by creating the content internally. We run a loop to continously add on data
      //RESTDb/NoSql always adds in a unique id for each data, we tap on it to have our data and place it into our links 
  
      $.ajax(settings).done(function (response) {
        
        let content = "";
  
        for (var i = 0; i < response.length && i < limit; i++) {
          //console.log(response[i]);
          //[METHOD 1]
          //let's run our loop and slowly append content
          //we can use the normal string append += method
          /*
          content += "<tr><td>" + response[i].name + "</td>" +
            "<td>" + response[i].email + "</td>" +
            "<td>" + response[i].message + "</td>
            "<td>Del</td><td>Update</td</tr>";
          */
  
          //[METHOD 2]
          //using our template literal method using backticks
          //take note that we can't use += for template literal strings
          //we use ${content} because -> content += content 
          //we want to add on previous content at the same time
          content = `${content}
          <tr id='${response[i]._id}'>
          <td>${response[i].userName}</td>
          <td>${response[i].password}</td>
          <td>${response[i].eMAIL}</td>
          <td><a href='#' class='delete' data-id='${response[i]._id}'>Del</a></td><td><a href='#update-contact-container' class='update' 
  
          data-id='${response[i]._id}' data-msg='${response[i].message}' data-name='${response[i].name}' data-email='${response[i].email}
  
          '>Update</a></td></tr>`;
  
        }
  
        //[STEP 9]: Update our HTML content
        //let's dump the content into our table body
        //$("#contact-list tbody").html(content);
  
        //$("#total-contacts").html(response.length);
      });
  
  
    }

    //Login Authentication
    $("#login-submit").on("click", function (e) {
      //prevent default action of the button 
      e.preventDefault();
      getUser();
      //[STEP 2]: let's retrieve form data
      //for now we assume all information is valid
      //you are to do your own data validation
      var tempUser = $("#username").val();
      var tempPass = $("#password").val();
     

    
    //[STEP] 6
    //let's create a function to allow you to retrieve all the information in your contacts
    //by default we only retrieve 10 results
    function getUser(limit = 10, all = true) {
      //[STEP 7]: Create our AJAX settings
      let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://hypeaholic-dde8.restdb.io/rest/username",
        "method": "GET", //[cher] we will use GET to retrieve info
        "headers": {
          "content-type": "application/json",
          "x-apikey": APIKEY,
          "cache-control": "no-cache"
        },
      }
      //[STEP 8]: Make our AJAX calls
      $.ajax(settings).done(function (response) {
        for (var i = 0; i < response.length && i < limit; i++){
          if (tempUser == response[i].username && tempPass == response[i].password) {
            currentUser = response[i].username;
            currentEmail = response[i].email;
            localStorage.setItem('username', currentUser);
            localStorage.setItem('email', currentEmail);
            console.log(currentUser);
            console.log(i)
            console.log(response.length)
            //$("#add-update-msg").show().fadeOut(200);
            window.location.href = 'home.html';
            break;
            
          }
          if (response.length == i)
          {
            if (tempUser != response[i].username || tempPass != response[i].password){
              window.alert("Login Failed! Either your username or Password is wrong. Please try again.");
            }
          }
          
        }
        
        
    })
    
  };

  
  

  

  })
  /*
  $("#").on("click", function (e) {
    //prevent default action of the button 
    e.preventDefault();

    //[STEP 2]: let's retrieve form data
    //for now we assume all information is valid
    //you are to do your own data validation
    let item = $("#BapeShark").val();

    //Create our AJAX settings
    var jsondata = {"item": item};
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://hypeaholic-dde8.restdb.io/rest/username/620cbea58d779a0100037d6e",
      "method": "PUT",
      "headers": {
      "content-type": "application/json",
      "x-apikey": APIKEY,
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(jsondata)
  }

$.ajax(settings).done(function (response) {
  console.log(item);
  console.log(response);
  console.log("item added to cart");
});
  });
  */
  
  
  
  //end click

  /*
  $("#accountPage").on("click", function (e) {
    //prevent default action of the button 
    e.preventDefault();
    getUserInfo();

  //To retrieve data and show on account page
 
})
*/

})

function getUserInfo(){
  var temp  = localStorage.getItem('username');
  var temp2 = localStorage.getItem('email')
  console.log(temp);
  document.getElementById("userInfo").innerHTML = "Username: " + temp;
  document.getElementById("usersEmail").innerHTML = "Email: " + temp2;
};

function boughT(){
  window.alert("Purchase Succesful!")
  window.location.href = 'index.html';
}


/*
function getUserInfo(){
  console.log(realcurrentuser)
  
}
*/


