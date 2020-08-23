function alertError(error){
          if(error.responseText == 'showAlert')
              {
                  alert("User already Exist")
              }
}
              

function registersignup()
{
    var v = document.getElementById('spfn').value;
    var w = document.getElementById('spcn').value;
    var x = document.getElementById('spmob').value;
    var y = document.getElementById('spemail').value;
    var z = document.getElementById('sppwd').value;
    var u = document.getElementById('sprpwd').value;
    console.log(v,w,x,y,z,u);
    

    var minimumchar = 8;
    var passwordexpression =  /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if(z.length<minimumchar)
        {
            console.log('loaded')
            alert('password length short');
        }
    else{
        if(passwordexpression.test(z))
        {
            $.post("/signup",{
                firstname:v,
                companyname:w,
                mobilenumber:x,
                email:y,
                password:z
            }, function(data){
                console.log(data);
                var d = JSON.parse(data);
                if(d.status===200)
                    {
                        window.location = "/login"; 
                    }
          }).catch(function(err){
                alertError(err);
            });
            
        }
    }
}
