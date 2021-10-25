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
                alert("에러가 발생했습니다");
            },
            success:function(data){
                const obj = JSON.parse(data);
                const msgId = document.getElementById("errormsgId");
                const msgDp = document.getElementById("errormsgDp");
                const msgName = document.getElementById("errormsgName");
                if(obj.status == 200){
                    window.location.href = "/main";
                }else if(obj.status ==201){
                    console.log("야");
                    msgName.innerText="이름을 다시 입력해주세요";
                    msgDp.innerText="";
                    msgId.innerText="";
                }else if(obj.status == 202){
                    msgId.innerText = "학번을 다시 입력해주세요";
                    msgName.innerText="";
                    msgDp.innerText="";
                }else if(obj.status ==203){
                    msgDp.innerText="학과를 다시 입력해주세요";
                    msgName.innerText="";
                    msgId.innerText="";
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
                alert("에러가 발생했습니다");
            },
            success:async function(data){
                const obj = JSON.parse(data);
                const msgName = document.getElementById("errormsgName2");
                if(obj.status == 200){
                    window.location.href = "/main";
                }else if(obj.status==201){
                    msgName.innerText = "이름을 다시 입력해 주세요";
                    
                }
            }
        });
    });
});

    
