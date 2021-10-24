$(document).ready(function()
{
	$("#wordCloud").jQWCloud({
		words: [
				{word: '코로나', weight: 40},
				{word: '학습', weight: 39},
				{word: '공연', weight: 11, color: 'green'},
				{word: '자취', weight: 27},
				{word: '정보제공', weight: 36},
				{word: '지도', weight: 39},
				{word: '분리수거', weight: 12, color: 'green'},
				{word: '음식', weight: 27},
				{word: '화장품', weight: 36},
				{word: '소비기한', weight: 22},
				{word: '정보제공', weight: 40},
				{word: '환경', weight: 39},
				{word: '추천', weight: 11, color: 'green'},
				{word: '운동', weight: 27},
				{word: '알바', weight: 36},
				{word: '패션', weight: 39},
				{word: '일정', weight: 12, color: 'green'},
				{word: '음악', weight: 27},
				{word: '건강', weight: 80},
				{word: '커뮤니티', weight: 22},
				{word: '학교생활', weight: 22},
				{word: '선물', weight: 22}
				       		        
		],
		// cloud_color: 'yellow',		
		minFont: 10,
		maxFont: 70,
		// fontOffset: 5,
		// cloud_font_family: 'Owned',
		// verticalEnabled: false,
		padding_left: 1,
		// showSpaceDIV: true,
		//spaceDIVColor: 'white',
		word_common_classes: 'WordClass',
		word_mouseEnter :function(){
			$(this).css("text-decoration","underline");
		},
		word_mouseOut :function(){
			$(this).css("text-decoration","none");	
		},
		word_click: function(){
			location.href="hashtag.html"
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
