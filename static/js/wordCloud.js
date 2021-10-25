$(document).ready(function()
{

   $("#wordCloud").jQWCloud({
      words: [
         {word: '코로나', weight: 40},
         {word: '생활', weight: 39},
         {word: '문화', weight: 11, color: 'green'},
         {word: 'IT', weight: 27},
         {word: '주거', weight: 36},
         {word: '교육', weight: 39},
         {word: '환경', weight: 12, color: 'green'},
         {word: '안전', weight: 27},
         {word: '경제', weight: 36},
         {word: '언어', weight: 22},
         {word: '시사', weight: 40},
         {word: '테스트', weight: 39},
         {word: '진로', weight: 11, color: 'green'},
         {word: '교통', weight: 27},
         {word: '일상', weight: 36},
         {word: '연애', weight: 39},
         {word: '반려동물', weight: 12, color: 'green'},
         {word: '취미', weight: 27},
         {word: '요리', weight: 80},
         {word: '자동차', weight: 22},
         {word: '인테리어', weight: 22},
         {word: '스타일', weight: 22},
         {word: '건강', weight: 22},
         {word: '다이어트', weight: 22},
         {word: '운동', weight: 22},
         {word: '군대', weight: 22},
         {word: '학교', weight: 10},
         {word: '여행', weight: 22},
         {word: '음식', weight: 22},
         {word: '쇼핑', weight: 26},
         {word: '친목', weight: 22},
         {word: '영화', weight: 36},
         {word: '음악', weight: 22},
         {word: '책', weight: 22},
         {word: '공연', weight: 22},
         {word: '전시', weight: 22},
         {word: '인물', weight: 14},
         {word: '스포츠', weight: 22},
         {word: '게임', weight: 27},
         {word: '코딩', weight: 10},
         {word: '주거', weight: 22},
         {word: '자취', weight: 22},
         {word: '기숙사', weight: 22},
         {word: '알바', weight: 22}
      ],
      // cloud_color: 'yellow',      
      minFont: 20,
      maxFont: 80,
      //fontOffset: 5,
      //cloud_font_family: 'Owned',
      //verticalEnabled: false,
      padding_left: 3,
      // showSpaceDIV: true,
      // spaceDIVColor: 'white',
      word_common_classes: 'WordClass',
      word_mouseOver:function(){
         // $(this).css("line-height","1.5");
      },   
      word_mouseEnter :function(){
         $(this).css("text-decoration","underline");
         $(this).css("color","underline");
         
      },
      word_mouseOut :function(){
         $(this).css("text-decoration","none");
      },
      word_click: function(){          
         location.href = "/hashtag/"+$(this).text();
      },
      beforeCloudRender: function(){
             date1=new Date();
       },
       afterCloudRender: function(){
            var date2=new Date();
            console.log("Cloud Completed in "+(date2.getTime()-date1.getTime()) +" milliseconds");
         }
   });
});
