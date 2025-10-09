
//题目们
let questions=[['充耳不闻无话讲','打一茶叶名','龙井','碧螺春','佛手','铁观音',0],
	['春香连日去听琴','打一字','项','需','秦','鹏',2],
	['山水相连称第一','打一地名','深圳','广州','佛山','铁观音',2],
	['动物学索引','打一成语','虎头虎脑','目中无人','双龙戏珠','物是人非',1],
	['二人别后又相逢','打一字','友','归','情','笑',0],
	['公孙胜驾云，丁德孙狂奔','打一成语','精神抖擞','龙腾虎跃','无法无天','春暖花开',1],
];
let loadTime=0;
//0a 1b 2c 3d 4未选择
let CHOISE=4;
let FACT=0;
let ACHIEVEMENT=[0,0,0,0,0,0];
let done=false;


//加载页加载
let loadingPress=setInterval(function(){
	if(loadTime>=100){
		clearInterval(loadingPress);
		document.querySelector('#loadPage').style.display='none'
		document.querySelector('#index').style.display='block'
		document.querySelector('#bg1').style.display='none'
		document.querySelector('#bg2').style.display='block'
	}
	console.log('loadTime:'+loadTime)
	document.querySelector('#loadInfo p').innerText='Loading...'+loadTime+'%';
	loadTime++;	
},22);

//首页开始按钮
document.querySelector('#index .Btn').onclick=function(){
	document.querySelector('#index').style.display='none';
	document.querySelector('#rulePage').style.display='block';
	console.log('点击1');
}
//bgm开关
//let bgmBtn=document.getElementById('music');
let bgm= document.querySelector('#music audio')
document.querySelector('#music').onclick=function(){
	if(!bgm.paused){
		bgm.pause();
		 document.querySelector('#music img').style.animationPlayState = "paused";
		 document.querySelector('#music img').style.WebkitAnimationPlayState = "paused"; 
	}else{
		bgm.load();
		bgm.play();
		document.querySelector('#music img').style.animationPlayState = "running";
		document.querySelector('#music img').style.WebkitAnimationPlayState = "running";
	}
}


//规则确认按钮
document.querySelector('#rulePage .Btn').onclick=function(){
	document.querySelector('#rulePage').style.display='none'
	document.querySelector('#lanternRiddlePage').style.display='block'
	console.log('点击2');
}
//打开祝福卡按钮
document.querySelector('#lanternRiddlePage>.Btn').onclick=function(){
	document.querySelector('#lanternRiddlePage>.Btn').style.display='none'
	document.querySelector('#endCard').style.display='block'
}
//返回首页按钮
document.querySelector('#endCard .Btn').onclick=function(){
	document.querySelector('#answerDiv').style.display='none'
	document.querySelector('#endCard').style.display='none'
	document.querySelector('#lanternRiddlePage').style.display='none'
	document.querySelector('#index').style.display='block'
	
	//还原
	CHOISE=4;
 	FACT=0;
 	ACHIEVEMENT=[0,0,0,0,0,0];
	done=false;
	for(let i=0;i<6;i++){
		document.getElementsByClassName('riddleLantern')[i].getElementsByTagName('img')[0].setAttribute('src','img/rLanten.png')
		document.getElementsByClassName('riddleLantern')[i].getElementsByTagName('img')[1].setAttribute('src','img/dycpText.png')
		document.getElementsByClassName('riddleLantern')[i].style.animationPlayState='running'
	}
	
}
//题目回答按钮
document.querySelector('#answerDiv .Btn').onclick=function(){
	if(CHOISE==4){
//		alert('请输入答案')
		document.querySelector('#promptBox').style.animation='0.5s FadeIn'
		document.querySelector('#promptBox p').innerText='请输入答案'
		document.querySelector('#promptBox').style.display='block'
		document.querySelector('#promptBox').style.animation='0.5s FadeOut'
		setTimeout(function(){
			document.querySelector('#promptBox').style.display='none'
		},500)
		//答案选择正确
	}else if(CHOISE==questions[FACT][6]){
		document.querySelector('#answerDiv').style.display='none'
		CHOISE=4;
		document.querySelector('#AText img').setAttribute('src','img/falseRadio.png')
		document.querySelector('#BText img').setAttribute('src','img/falseRadio.png')
		document.querySelector('#CText img').setAttribute('src','img/falseRadio.png')
		document.querySelector('#DText img').setAttribute('src','img/falseRadio.png')
		document.getElementsByClassName('riddleLantern')[FACT].getElementsByTagName('img')[0].setAttribute('src','img/yLanten.png')
		document.getElementsByClassName('riddleLantern')[FACT].getElementsByTagName('img')[1].setAttribute('src','img/ddlText.png')
		document.getElementsByClassName('riddleLantern')[FACT].style.animationPlayState='paused'
//		console.log(document.getElementsByClassName('riddleLantern')[FACT].getElementsByTagName('img')[0].setAttribute('src','img/yLanten.png'))
		ACHIEVEMENT[FACT]=1;
		for(let i=0;i<6;i++){
			if(ACHIEVEMENT[i]==0){
				done=false
				break;
			}else{
				done=true
			}
		}
		if(done){
//			alert('答完了')
			console.log('回答完成')
			document.querySelector('#lanternRiddlePage>.Btn').style.display='block'
		}
//		getElementsByTagName('img')[FACT]
	}else{
//		alert('答案错误，请重新回答')

		document.querySelector('#promptBox').style.animation='0.5s FadeIn'
		document.querySelector('#promptBox p').innerText='答案错误，请重新回答'
		document.querySelector('#promptBox').style.display='block'
		document.querySelector('#promptBox').style.animation='0.5s FadeOut'
		setTimeout(function(){
			document.querySelector('#promptBox').style.display='none'
		},500)
		document.querySelector('#AText img').setAttribute('src','img/falseRadio.png')
		document.querySelector('#BText img').setAttribute('src','img/falseRadio.png')
		document.querySelector('#CText img').setAttribute('src','img/falseRadio.png')
		document.querySelector('#DText img').setAttribute('src','img/falseRadio.png')
	}
}
//代表灯谜的灯笼
for(let i=0;i<6;i++){
	document.getElementsByClassName('riddleLantern')[i].addEventListener('click',function(){
		FACT=i;
		if(ACHIEVEMENT[FACT]==1){
			alert('答过了！')
		}else{
			document.querySelector('#answerDiv').style.display='block'
			console.log('灯谜'+i+'打开了')
			document.querySelector('#questionText').innerText=questions[i][0]
			document.querySelector('#tipText').innerText='('+questions[i][1]+')'
			document.querySelector('#AText span').innerText='A、'+questions[i][2]
			document.querySelector('#BText span').innerText='B、'+questions[i][3]
			document.querySelector('#CText span').innerText='C、'+questions[i][4]
			document.querySelector('#DText span').innerText='D、'+questions[i][5]
		}
	});
}
//选项按钮
document.querySelector('#AText').onclick=function(){
	document.querySelector('#AText img').setAttribute('src','img/trueRadio.png')
	document.querySelector('#BText img').setAttribute('src','img/falseRadio.png')
	document.querySelector('#CText img').setAttribute('src','img/falseRadio.png')
	document.querySelector('#DText img').setAttribute('src','img/falseRadio.png')
	CHOISE=0;
	console.log('选中了A')
}
document.querySelector('#BText').onclick=function(){
	document.querySelector('#AText img').setAttribute('src','img/falseRadio.png')
	document.querySelector('#BText img').setAttribute('src','img/trueRadio.png')
	document.querySelector('#CText img').setAttribute('src','img/falseRadio.png')
	document.querySelector('#DText img').setAttribute('src','img/falseRadio.png')
	CHOISE=1;
	console.log('选中了B')
}
document.querySelector('#CText').onclick=function(){
	document.querySelector('#AText img').setAttribute('src','img/falseRadio.png')
	document.querySelector('#BText img').setAttribute('src','img/falseRadio.png')
	document.querySelector('#CText img').setAttribute('src','img/trueRadio.png')
	document.querySelector('#DText img').setAttribute('src','img/falseRadio.png')
	CHOISE=2;
	console.log('选中了C');
}
document.querySelector('#DText').onclick=function(){
	document.querySelector('#AText img').setAttribute('src','img/falseRadio.png')
	document.querySelector('#BText img').setAttribute('src','img/falseRadio.png')
	document.querySelector('#CText img').setAttribute('src','img/falseRadio.png')
	document.querySelector('#DText img').setAttribute('src','img/trueRadio.png')
	CHOISE=3;
	console.log('选中了D');
}
