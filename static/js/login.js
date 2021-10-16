$(document).ready(async function(req, res){
    $('#loginBtn').click(async function(){
        $.ajax({
           
            type:'POST',
            url:`/loginProcess`,
            dataType:'text',    

            data: {"department":$('#department').val(),
                "studentId":$('#studentId').val(),
                "userName":$('#userName').val()},
                
            error: function(){
                alert("에러가 발생했습니다");
            },
            success:function(data){
                const obj = JSON.parse(data);
                const msg = document.getElementById("errormsg");
                if(obj.status == 200){
                    console.log("얍");
                    window.location.href = '/main';
                }
            }
        });
    })
})
    

