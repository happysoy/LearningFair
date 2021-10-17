///const { off } = require("../../config/mysql");

$(document).ready(function() {
    $(document).on("click",'#loginBtn1 #loginBtn2',function(){
        $.ajax({
            type:'POST',
            url:"/loginProcess",
            dataType:'text',    
    
            data: {"userName":$('input[name=userName]').val(),
                "studentId":$('input[name=studentId]').val(),
                "department":$('input[name=department]').val(),
                "checkValue":$('input[name=who]:checked').val()
            },
                
            error: function(){
                alert("다시 시도해주세요");
            },
            success:function(data){
                const obj = JSON.parse(data);
                //const msg = document.getElementById("errormsg");
                if(obj.status == 200){
                    window.location.href = "/main";
                }else if(obj.status==400){
                    alert("다시 시도해주세요");
                }
            }
        });
    });
});

    
