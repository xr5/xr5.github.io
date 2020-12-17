var jsonData = null;
var pageIndex = 1;

//加载json数据
$("#pageIndex").on("click",function(e){
	var text = prompt();
	if(text == null){
		return;
	}
	if(text == 0){
		// 测试，加载本地数据
		jsonData = testDataJson;
		pageIndex = 1;
		parsingData();
		return;
	}
	if(text == "a"){
		// 模式a
		text = prompt();
		jsonData = $.ajax({url:text + ".json",async:false}).responseText;
//		jsonData = testDataTxt;
		var tempArr = [];
		var arr = jsonData.split(/\n/);
		for(var i=0;i<arr.length;i++){
			var arri = arr[i];
			var arriArr = arri.split(",");
			var obj = {"downUrl":Base64.encode(arriArr[1]),"resourcesName":Base64.encode(arriArr[0])};
			tempArr.push(obj);
		}
		jsonData = [tempArr];
		pageIndex = 1;
		parsingData();
		return;
	}
	try {
		jsonData = $.ajax({url:text + ".json",async:false}).responseText;
//		jsonData = testDataTxt;
		try{
			jsonData = JSON.parse(jsonData);
		} catch(err) {
			// 正则模式
			var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-|:)+)/g;
			// var reg= /(https?|http):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
			// var reg= /(https?|http):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+\.(mp4|m3u8|avi|rmvb)/gi;
			var arr = jsonData.match(reg);
			var tempArr = [];
			for(var i=0;i<arr.length;i++){
				var obj = {"downUrl":Base64.encode(arr[i])};
				tempArr.push(obj);
			}
			jsonData = [tempArr];
			pageIndex = 1;
			parsingData();
			return;
		}
		pageIndex = 1;
		parsingData();
	} catch(err) {
		alert("json加载失败" + err);
	}
});

//解析数据
function parsingData(){
	if(jsonData == null){
		alert("无数据");
		return;
	}
	var currentPageIndexJsonData = jsonData[pageIndex-1];
	var html = "";
	for (var i = 0; i < currentPageIndexJsonData.length; i++) {
		var currentPageIndexInfo = currentPageIndexJsonData[i];
		html += "<div>";
		if(currentPageIndexInfo.noImagesList != null){
			for(var j=0;j<currentPageIndexInfo.noImagesList.length;j++){
				var currentPageIndexImg = currentPageIndexInfo.noImagesList[j];
				html += "<img src='"+window.atob(currentPageIndexImg.imagesUrl)+"' alt='11'>";
			}
		}else{
			html += "<img src='https://noo.gitee.io/%E9%BB%98%E8%AE%A4%E5%9B%BE%E7%89%87.svg' alt='11'>";
		}
		html += "</div><div class='title'><a";
		if(currentPageIndexInfo.browseStatus == '1'){
			html += " style='color: red;'";
		}
		html += " url='"+currentPageIndexInfo.downUrl+"'>";
		if(currentPageIndexInfo.resourcesName != null){
			html += Base64.decode(currentPageIndexInfo.resourcesName);
		}else{
			html += Base64.decode(currentPageIndexInfo.downUrl);
		}
		html += "</a></div>";
	}
	$("#main").html(html);
	$("#pageIndex").html(pageIndex);
	$(document).scrollTop(0);
}

//分页事件
$("h4").on("click","a",function(e){
	if(jsonData == null){
		alert("无数据");
		return;
	}
	var val = $(e.target).html();
	if(val == '-&gt;'){
		if(pageIndex >= jsonData.length){
			alert("无数据");
		}else{
			pageIndex++;
			parsingData();
		}
	}else{
		if(pageIndex == '1'){
			alert("无数据");
		}else{
			pageIndex--;
			parsingData();
		}
	}
});

// 点击详情事件
$("#main").on("click",".title",function(e){
	$("video").attr("src",window.atob($(e.target).attr("url")));
	$(".body").toggle();
	$(".pop").toggle();
});

// 缩略模式
$("#abbreviatedOpen").on("click",function(e){
	$("#main").toggleClass("abbreviatedOpen");
});

// 小按钮功能
$(".suspension").on("click",function(){
	$(".body").toggle();
	$(".pop").toggle();
	$("video").attr("src","");
});



/**
 * 公共方法
 */
let Base64 = {
    encode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    },
    decode(str) {
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
};

var testDataTxt = "86测试,http://117.169.72.135:8080/PLTV/88888888/224/3221225618/index.m3u8\r\n"+"85天天,http://ott.fj.chinamobile.com/PLTV/88888888/224/3221225931/index.m3u8";

var testDataJson = [
    [
        {
            "createTime":1594263714808,
            "downUrl":"aHR0cHM6Ly93d3cudzNzY2hvb2wuY29tLmNuL2kvbW92aWUub2dn",
            "groupId":1,
            "noImagesList":[
                {
                    "createTime":1594263714808,
                    "imagesId":202,
                    "imagesUrl":"aHR0cHM6Ly9ub28uZ2l0ZWUuaW8vMS5wbmc=",
                    "resourcesId":227
                },
                {
                    "createTime":1594263714808,
                    "imagesId":203,
                    "imagesUrl":"aHR0cHM6Ly9ub28uZ2l0ZWUuaW8vMS5wbmc=",
                    "resourcesId":227
                },
                {
                    "createTime":1594263714808,
                    "imagesId":204,
                    "imagesUrl":"aHR0cHM6Ly9ub28uZ2l0ZWUuaW8vMS5wbmc=",
                    "resourcesId":227
                }
            ],
            "resourcesId":227,
            "resourcesName":"bGF5ZXLmmK/kuIDmrL7ov5HlubTmnaXlpIflj5fpnZLnnZDnmoR3ZWLlvLnlsYLnu4Tku7bvvIzlpbnlhbflpIflhajmlrnkvY3nmoTop6PlhrPmlrnmoYjvvIzoh7Tlipvkuo7mnI3liqHlkITmsLTlubPmrrXnmoTlvIDlj5HkurrlkZjvvIzmgqjnmoTpobXpnaLkvJrovbvmnb7lnLDmi6XmnInkuLDlr4zlj4vlpb3nmoTmk43kvZzkvZPpqozjgII=",
            "resourcesTime":"2020-07-01"
        },
        {
            "createTime":1594263714808,
            "downUrl":"aHR0cHM6Ly93d3cucnVub29iLmNvbS90cnkvZGVtb19zb3VyY2UvbW92X2JiYi5tcDQ=",
            "groupId":1,
            "noImagesList":[
                {
                    "createTime":1594263714808,
                    "imagesId":202,
                    "imagesUrl":"aHR0cHM6Ly9ub28uZ2l0ZWUuaW8vMS5wbmc=",
                    "resourcesId":228
                },
                {
                    "createTime":1594263714808,
                    "imagesId":203,
                    "imagesUrl":"aHR0cHM6Ly9ub28uZ2l0ZWUuaW8vMS5wbmc=",
                    "resourcesId":228
                },
                {
                    "createTime":1594263714808,
                    "imagesId":204,
                    "imagesUrl":"aHR0cHM6Ly9ub28uZ2l0ZWUuaW8vMS5wbmc=",
                    "resourcesId":228
                }
            ],
            "resourcesId":228,
            "browseStatus":1,
            "resourcesName":"bGF5ZXLmmK/kuIDmrL7ov5HlubTmnaXlpIflj5fpnZLnnZDnmoR3ZWLlvLnlsYLnu4Tku7bvvIzlpbnlhbflpIflhajmlrnkvY3nmoTop6PlhrPmlrnmoYjvvIzoh7Tlipvkuo7mnI3liqHlkITmsLTlubPmrrXnmoTlvIDlj5HkurrlkZjvvIzmgqjnmoTpobXpnaLkvJrovbvmnb7lnLDmi6XmnInkuLDlr4zlj4vlpb3nmoTmk43kvZzkvZPpqozjgII=",
            "resourcesTime":"2020-07-01"
        }
    ]
];