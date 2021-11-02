$(document).ready(async function() {

    var getCookie = function(name) {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return value? value[2] : null;
    };
    var deleteCookie = function(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    }
    var setCookie = function(name, value, exp) {
        var date = new Date();
        date.setTime(date.getTime() + exp*24*60*60*1000);
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    };
    var is_expend = getCookie("expend");

    if(is_expend ==true){ 
        $(".like").removeClass('old-class').addClass('new-class'); //버튼 눌린 상태
        $('#button1').on("click",function(){
            $(".like").removeClass('new-class').addClass('old-class'); //버튼 안눌린 상태
            setCookie("expend", "false", 1); //쿠키 설정
        })
    }else if (is_expend==false){
        $(".like").removeClass('new-class').addClass('old-class'); //버튼 안눌린 상태
        $('#button1').on("click",function(){
            $(".like").removeClass('old-class').addClass('new-class'); //버튼 눌린 상태
            setCookie("expend", "true", 1); //쿠키 설정
        })
    }   
});
