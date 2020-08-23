window.onload = () => {
                if(localStorage.getItem('user') === null)
                    {
                        window.location = "/login";
                    }
                else
                    {
                        $.post("/vieworder",{
                            user:localStorage.getItem('user')
                        },function(result){
                                                    
                            var res = JSON.parse(result).data;
//                            console.log(res)
                            let populateContainer = document.querySelector("#table-populate");
                            for(var order of res){
                                console.log(order)
                                var template = `<tr>
                                    <td>${order.date}</td>
                                    <td>${order.smNoofbox}</td>
                                    <td>${order.smweight}</td>
                                    <td>${order.bgNoofbox}</td>
                                    <td>${order.bgweight}</td>
                                </tr>`;
                                
                                populateContainer.innerHTML+=template;
                            }
                        });
                        
                    }
                }