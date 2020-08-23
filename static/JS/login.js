window.onload = () => {
    if(localStorage.getItem('user')!==null){
        window.location='/home';
    }
}
console.log('loaded');
function submitLoginDet()
{
    var n = document.getElementById('uname').value;
    var m = document.getElementById('pwd').value;
    console.log(n,m);
    
    $.post("/login",{
        username:n,
        password:m,
    },function(data){
        document.body.innerHTML=data;
        console.log(data);
    });
}
