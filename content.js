let colorsSec = document.querySelector(".colors header");
let c = localStorage.getItem("selected-colors");
console.log(c)
let pickedColor=[];
if(c){
    pickedColor = JSON.parse(c);
}else{
    pickedColor = []
}
function showcolors(){

    localStorage.setItem("selected-colors",JSON.stringify(pickedColor))
    
    if(pickedColor.length<=0) colorsSec.style.display="none";
    else colorsSec.style.display="flex";

    let html = pickedColor.map((color,index)=>{
        return `<li data-color='${color}'>
            <span class="color" style='background-color:${color};border:2px solid ${color=='#efefef'?"#ccc":color};'></span>
            <span data-color='${color}'>${color}</span>
        </li>`;
    }).join("");
    document.querySelector(".all-colors").innerHTML = html;
    document.querySelectorAll(".all-colors li").forEach((li)=>{
        li.addEventListener('click',copycolor)
        console.log(li);
    })
    console.log(3333);
}
function copycolor(e) {
    // alert(e.target)
    navigator.clipboard.writeText(e.target.dataset.color);
    e.target.innerHTML = 'COPIED';

    setTimeout(()=>{
        e.target.innerHTML = e.target.dataset.color;
    }, 300);
}
function pickColor(){
    document.querySelector(".picker").style.display = "none";
    setTimeout(async()=>{
        let color = new EyeDropper();
        let {sRGBHex} = await color.open();
        navigator.clipboard.writeText(sRGBHex);
        pickedColor.push(sRGBHex);
        console.log(pickedColor);
        showcolors();
        document.querySelector(".picker").style.display = "block";
    },10)
}
showcolors();

function clearAll(){
    pickedColor = [];
    showcolors();
}

document.querySelector(".color-pick-btn").addEventListener("click",()=>{
    pickColor();
})
colorsSec.querySelector(".clear-all-btn").addEventListener("click",()=>clearAll())