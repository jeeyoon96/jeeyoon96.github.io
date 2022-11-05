const dDayDiv = document.querySelector(".dDay");
const dDayForm = document.querySelector(".dDay-form");
const dDayFormDate = document.querySelector('.dDay-form__date');
const dDayFormTitle = document.querySelector('.dDay-form__title');

const today = koreaDate(new Date());
dDayFormDate.value = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`;

const DDAY_KEY = "dDay";
let dDays = [];

function saveDdays(){
    localStorage.setItem(DDAY_KEY, JSON.stringify(dDays));
}

function deleteDdayBox(event){
    const div = event.target.parentElement;
    div.remove();
    dDays = dDays.filter((item) => item.id != parseInt(div.id));
    saveDdays();
}

function paintDday(newDdayObj){
    const div = document.createElement("div");
    const btn = document.createElement("button");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    const span3 = document.createElement("span");
    
    div.id = newDdayObj.id;
    div.classList.add("dDay__box");
    btn.classList.add("dDay__box__delbtn");
    span1.classList.add("dDay__box__date");
    span2.classList.add("dDay__box__count");
    span3.classList.add("dDay__box__title");
    btn.innerText = "❌";
    btn.addEventListener("click", deleteDdayBox);
    
    span1.innerText = newDdayObj.endday;
    span2.innerText = newDdayObj.countday
    span3.innerText = newDdayObj.title;

    div.appendChild(btn);
    div.appendChild(span1);
    div.appendChild(span2);
    div.appendChild(span3);
    dDayDiv.appendChild(div);
}

function koreaDate(date){
    const utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000); // utc 표준시 도출
    const kstGap = 9 * 60 * 60 * 1000; // 한국 kst 기준시간 더하기
    let koreaDate = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
    koreaDate = new Date(koreaDate.setHours(0, 0, 0, 0)); //이전 자정
    return koreaDate
}

function addBtnSubmit(event){
    event.preventDefault();

    const endDate = koreaDate(new Date(dDayFormDate.value));
    const timedelta = endDate - today;
    let countday = Math.floor(timedelta / (1000 * 60 * 60 * 24));
    console.log(countday);
    if (countday > 0){
        countday = countday * -1;
    }
    else if (countday === 0){
        countday = "-Day"
    }
    else{
        countday = "+" + Math.abs(countday);
    }

    const newDdayObj = {
        id : Date.now(),
        endday : dDayFormDate.value,
        countday : `D${countday}`,
        title : dDayFormTitle.value,
    }
    dDays.push(newDdayObj);
    paintDday(newDdayObj);
    saveDdays();
    dDayFormDate.value = "";
    dDayFormTitle.value = "";
}

dDayForm.addEventListener("submit", addBtnSubmit);

const savedDdays = localStorage.getItem(DDAY_KEY);
if (savedDdays !== null){
    const parsedDdays = JSON.parse(savedDdays);
    dDays = parsedDdays;
    parsedDdays.forEach(paintDday);
}


