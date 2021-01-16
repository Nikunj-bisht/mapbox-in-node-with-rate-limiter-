

var sendbutton = document.getElementById('sendlink');

sendbutton.addEventListener("click" , (e)=>{

e.preventDefault();

const useremail = document.getElementById('em').value;

if(useremail != ""){

fetch("http://localhost:3000/api/updatepage/sendresetmailurl",{

     method:'post',
     headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
     body:JSON.stringify({mymail:useremail})

})
.then(()=>{

if(response.status == "success"){

    alert("Mail sent successfully");

}

});

}else{
    
    alert("Please mention with correct email");

}

});