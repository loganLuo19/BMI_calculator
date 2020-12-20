var elDataBtn = document.querySelector('.dataBtn');
var data =  JSON.parse(localStorage.getItem('listData')) || [];
var list = document.querySelector('.list');
var removeBtn = document.querySelector('.removeBtn');
var actBtn = document.querySelector('.activeBtn');

updateList(data);

// 將資料建立成物件 存進localStorage 
function addData(){
    var heightData = document.querySelector('.heightClass').value;
    var weightData = document.querySelector('.weightClass').value;
    var bmiData = (weightData /((heightData*heightData)*0.0001)).toFixed(2); //BMI計算 取到小數第二位
    var today = new Date();
    if (heightData<= 0 || weightData <= 0 || isNaN(heightData) ||isNaN(weightData)) {
        alert('請輸入正確數字');
        return;
    }
    //增加BMI計算&level 判定
    var level ='';
    var levelColor='';
    if(bmiData < 16){
        level ='體重不足';
        levelColor = 'purple';
    }else if(16 <= bmiData && bmiData<18.5){
        level ='體重過輕';
        levelColor ='blue';
    }else if(18.5 <= bmiData && bmiData<25){
        level ='體重正常';
        levelColor ='green';
    }else if(25 <= bmiData && bmiData<30){
        level ='體重過重';
        levelColor ='yellow';
    }else if(30 <= bmiData && bmiData<35){
        level ='中度肥胖';
        levelColor ='orange';
    }else if(35 <= bmiData ){
        level ='重度肥胖';
        levelColor ='red';
    }
    var bodyData = {
        category:level,
        color: levelColor,
        bmi:bmiData,
        height:heightData,
        weight:weightData,
        date:(today.getMonth()+1) + "-" + today.getDate() + "-" + today.getFullYear(),
    };
    data.push(bodyData);
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);
    // 動態按鍵
    var levelStr ='';
    for (var i=0; i<data.length; i++){
    levelStr ='<div class="showLevel color_'+data[i].color+'"><a href="index.html">'+data[i].bmi+'<span>BMI</span></a><img src="https://upload.cc/i1/2020/06/24/srBIOj.png" alt=""></div><p class="text_'+data[i].color+'">'+data[i].category+'</p>';
    };
    actBtn.innerHTML =levelStr;
    
}

// 監聽
elDataBtn.addEventListener('click',addData,false);
removeBtn.addEventListener('click',removeAll,false);

// 取出資料 打印出來
function updateList(){
    var str = '';
    
    for (var i=0; i<data.length; i++){        
        str += '<li><ul class="'+data[i].color+'Bar"><li>'+data[i].category+'</li><li><span>BMI</span>'+data[i].bmi+'</li><li><span>weight</span>'+data[i].weight+'kg</li><li><span>height</span>'+data[i].height+'cm</li><li>'+data[i].date+'</li> </ul></li>';
        
    }
    list.innerHTML = str;

}
// 一鍵刪除
function removeAll(e){
    e.preventDefault;
    data = []
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);
}
