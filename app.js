const canvas=document.getElementById("jsCanvas");
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const INITIAL_COLOR="#2c2c2c";
const CANVAS_SIZE=700;
const saveBtn=document.getElementById("jsSave");

let painting=false;
let filling=false;

canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.strokeStyle=INITIAL_COLOR;//선색
ctx.fillStyle=INITIAL_COLOR;//채우기색
ctx.lineWidth=2.5;

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);//없으면 시작점만 빼고 다 그림
    }else{
        
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting=true;
}

function onMouseUp(){
    
}

function onMouseLeave(){
    
}

function handleColorClick(event){
    //console.log(event.target.style);
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function handleRightClick(event){
    event.preventDefault();//이거 하면 우클릭해도 아무 일도 안 일어나서 저장 불가
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleRightClick);
}

//Array.from은 Object를 Array로 바꿈
Array.from(colors).forEach(color=>color.addEventListener("click",handleColorClick)
);

function handleCanvasClick(){
    if(filling){
    ctx.fillRect(0,0,canvas.width,canvas.height);//앞의 0두개는 x,y좌표인데 
    //윈도우상 좌표가아닌 offset을 뜻함
}

}

function handleRangeChange(event){
    //console.log(event);
    ctx.lineWidth=event.target.value;
}

function handleModeClick(){
    if(filling===true){
        filling=false;
        mode.innerText="Fill";
    }else{
        filling=true;
        mode.innerText="Paint";
        
    }

}

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(mode){
    mode.addEventListener("click",handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}

function handleSaveClick(){
    const image=canvas.toDataURL("image/png");
    //console.log(image);
    const link=document.createElement("a");
    link.href=image;
    link.download="PaintJS[Export]";
    console.log(link);
    link.click();
}