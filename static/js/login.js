$(document).ready(async function() {
    $('#loginBtn1').on("click",function(){
        $.ajax({
            type:'POST',
            dataType:'text',  
            url:"/loginProcess",
            data: {"userName":$('input[id=userName1]').val(),
                "studentId":$('input[id=studentId1]').val(),
                "department":$('input[id=department1]').val(),
                "checkValue":$('input[name=who]:checked').val()
            }, 
            error: function(){
                alert("다시 시도해주세요1");
            },
            success:function(data){
                const obj = JSON.parse(data);
                if(obj.status == 200){
                    window.location.href = "/main";
                }else if(obj.status==400){
                    console.log(data);
                    alert("다시 시도해주세요2");
                }
            }
        });
    });
    $('#loginBtn2').on('click',function(){
        $.ajax({
            type:'POST',
            url:"/loginProcess",
            dataType:'text', 
            data: {"userName":$('input[id=userName2]').val(),
                "studentId":"0000000000",
                "department":"외부인",
                "checkValue":$('input[name=who]:checked').val()
            },
                
            error: async function(data){
                alert("다시 시도해주세요3");
            },
            success:async function(data){
                const obj = JSON.parse(data);
                //const msg = document.getElementById("errormsg");
                if(obj.status == 200){
                    window.location.href = "/main";
                }else if(obj.status==400){
                    console.log(data);
                    alert("다시 시도해주세요4");
                }
            }
        });
    });
});

    
