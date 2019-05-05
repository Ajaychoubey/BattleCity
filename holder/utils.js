function AABB(ax,ay,aw,ah,bx,by,bw,bh){
    return ax<bx+bw && ay<by+bh && bx<ax+aw && by<ay+ah;
}
function isTankOutsideCanvas(tank){
    return tank.x < 0 || tank.x+TANK_WIDTH > canvas.width || tank.y < 3 || tank.y+TANK_HEIGHT > canvas.height ;
}
function brick_bash(side,{x, y, width, height},tank){
    return tank.side == side && AABB(x,y,width,height,tank.x,tank.y,TANK_WIDTH,TANK_HEIGHT)
}
function CanMove(side,machine){
    let _ = blocks.filter(block => brick_bash(side,block,machine));
    let _length = _.length;
    return _length == 0 && !isTankOutsideCanvas(machine);
}
function GeneratePowerUp(){
    let blank_space = blank_spaces[Math.floor(Math.random() * blank_spaces.length)];
    let power_up = POWER_UPS[Math.floor(Math.random() * POWER_UPS.length)];
    let image = new Image();
    image.src = `${IMAGE_SRC}/${power_up}.png`;
    power_ups.push({
        x: blank_space.x,
        y: blank_space.y,
        power_up,
        image,
        duration:0
    });
}
function Distance(a,b){
    let x_length = a.x - b.x;
    let y_length = a.y - b.y;
    return Math.sqrt(x_length**2 + y_length**2);
}
function Tester(machine){
    let move = [];
    let test_number = 10;
    let intersecting_blocks_down = blocks.filter(block => AABB(block.x,block.y,block.width,block.height,machine.x,machine.y+test_number,TANK_WIDTH,TANK_HEIGHT))
    let intersecting_blocks_up = blocks.filter(block => AABB(block.x,block.y,block.width,block.height,machine.x,machine.y-test_number,TANK_WIDTH,TANK_HEIGHT))
    let intersecting_blocks_left = blocks.filter(block => AABB(block.x,block.y,block.width,block.height,machine.x-test_number,machine.y,TANK_WIDTH,TANK_HEIGHT))
    let intersecting_blocks_right = blocks.filter(block => AABB(block.x,block.y,block.width,block.height,machine.x+test_number,machine.y,TANK_WIDTH,TANK_HEIGHT))
    
    if(intersecting_blocks_down.length == 0) move.push('down');
    if(intersecting_blocks_up.length == 0) move.push('up');
    if(intersecting_blocks_left.length == 0) move.push('left');
    if(intersecting_blocks_right.length == 0) move.push('right');

    if(isTankOutsideCanvas({
        x:machine.x,
        y:machine.y - test_number,
        side:machine.side
    }) && machine.side == 'up') {
        move = move.filter(m => m !== 'up')
    };

    if(isTankOutsideCanvas({
        x:machine.x,
        y:machine.y + test_number,
        side:machine.side
    }) && machine.side == 'down') move = move.filter(m => m !== 'down');

    if(isTankOutsideCanvas({
        x:machine.x - test_number,
        y:machine.y,
        side:machine.side
    }) && machine.side == 'left') move = move.filter(m => m !== 'left');

    if(isTankOutsideCanvas({
        x:machine.x + test_number,
        y:machine.y,
        side:machine.side
    }) && machine.side == 'right') move = move.filter(m => m !== 'right');
    
    return move;
}
function AI(enemy,is_followed){
    let moves = Tester(enemy);
    let movement = {
        x:0,
        y:0
    }
    let valid_sides = []; 
    moves.forEach(move => {

    })
    return valid_sides;   
}
function EnemyAlgorithm(enemy) {
    let moves = Tester(enemy);
    return moves[Math.floor(Math.random() * moves.length)];
}
function AnimateXaxis({x,y,image,image_width,image_height,sectors}){
    let sector_width = image.width/sectors;
    
};
function Reset(){
    tank_spawned = 0;
    tank.lives = TANK_DEFAULT_LIVES;
    blocks = [];
    bricks = [];
    iron_blocks = [];
    eagles = [];
    grass = [];
    water = [];
    enemy_tanks_spawn_points = [];
    enemy_tanks = [];
    if(levels.length > level_no) createLevels(levels[level_no]);
    blocks = [...bricks,...iron_blocks,...water]
}