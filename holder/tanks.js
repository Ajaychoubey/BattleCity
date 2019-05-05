let side_src = '';
let bullet_src = '';
window.addEventListener('keydown',(e) => { 
    side_src = side_src == '' ? side_src = TANK_UP_IMAGE.src : side_src; // By default
    let arrow_key;
    if(e.key.includes('Arrow')){
        isMoving = true;
        arrow_key = (e.key.split('Arrow')[1]).toLowerCase();
        side_src = `${IMAGE_SRC}/${arrow_key}.png`;
        tank.side = arrow_key;
        
    }
    if(Tester(tank).includes(arrow_key)){
        if(e.key == keyBindings.right) {tank.x+=TANK_MOVE_SPEED;}
        if(e.key == keyBindings.left) {tank.x-=TANK_MOVE_SPEED;}
        if(e.key == keyBindings.up) {tank.y-=TANK_MOVE_SPEED;}
        if(e.key == keyBindings.down) {tank.y+=TANK_MOVE_SPEED;}  
    }
    else 
    {
        isMoving = false;
    }
    side = new Image();
    side.src = side_src;
})
window.addEventListener('keyup',(e)=>{
    if(e.key.includes('Arrow')){
        let arrow_key = (e.key.split('Arrow')[1]).toLowerCase();
        bullet_src = `${IMAGE_SRC}/bullet_${arrow_key}.png`;
        bullet_side = arrow_key;
    }
    if(e.key == keyBindings.shoot) {
        try{
            tank.shoot();
            SHOOT.pause();
            SHOOT.play();
        }
        catch {
            
        }
    }
    bullet_side_image = new Image();
    bullet_side_image.src = bullet_src;
})
function drawTank(){
    ctx.drawImage(side,tank.x,tank.y,TANK_WIDTH,TANK_HEIGHT);
}