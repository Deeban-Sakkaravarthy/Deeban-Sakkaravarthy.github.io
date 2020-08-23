window.onload = () => {
    if(localStorage.getItem('user') === null)
        {
            window.location = "/login";
        }
}
function placeorder()
{
    var w = document.getElementById('smallbird').value;
    var x = document.getElementById('smallweight').value;
    var y = document.getElementById('bigbird').value;
    var z = document.getElementById('bigweight').value;
    console.log(w,x,y,z);
    $.post("/placeorder",{
        smNoofbox:w,
        smweight:x,
        bgNoofbox:y,
        bgweight:z,
        user:localStorage.getItem('user')
    });
    alert("Order Placed")
}
function goback()
{
    window.location = "/home"; 
}