// Level maker
const levels = [
    [
        "GS     S        S      SG",
        "G  B  B   B B    B  B   G",
        "G  B  B   BIB    B  B   G",
        "G  B  B   B B    B  B   G",
        "GS B  B          B  B  SG",
        "G  B  B   B B    B  B   G",
        "B                       B",
        "G    BB   B B    BB     G",
        "G         BBB           G",
        "G  B  B   B B    B  B   G",
        "G  B  B          B  B   G",
        "G  B  B   OOO    B  B   G",
        "G         OEO  T        G",
    ],
    [
        "GS     S        S      SG",
        "GGGGBBB   B B    B  B   G",
        "GGGGGBB   BIB    B  B   G",
        "GGGGGGB   B B    B  B   G",
        "GS B  B          B  B  SG",
        "G  B  B   B B    B  B   G",
        "B                       B",
        "G  IIWII        IIWII   G",
        "G  W   W        W   W   G",
        "G  IIGII        IIGII   G",
        "G                       G",
        "G         BBB           G",
        "GII       BEB  T        G",
    ]
] 
function createLevels(level){
    level.forEach((row,y) => {
        let _y = y * BRICK_HEIGHT;
        [...row].forEach((char, x) => {
            let _x = x * BRICK_WIDTH;
            if(char == 'B') bricks.push({hits:0,x:_x, y:_y,width:BRICK_WIDTH,height:BRICK_HEIGHT});
            else if(char == 'O') bricks.push({hits:0, x:_x, y:_y, width:BRICK_WIDTH, height:BRICK_HEIGHT, change:true});
            else if(char == 'T') {
                tank.x = _x;
                tank.y = _y;
                tank_spawn_point.x = _x;
                tank_spawn_point.y = _y;
            }
            else if(char == 'E'){
                eagles.push({x: _x, y: _y, width: BRICK_WIDTH, height: BRICK_HEIGHT})
            }
            else if(char == 'I'){
                iron_blocks.push({hits:0,x:_x,y:_y,width:IRON_BLOCK_WIDTH,height:IRON_BLOCK_WIDTH});
            }
            else if(char == 'S'){
                enemy_tanks_spawn_points.push([_x,_y]); 
            }
            else if(char == 'G'){
                grass.push({x:_x,y:_y,width:BRICK_WIDTH,height:BRICK_HEIGHT});
            }
            else if(char == 'W'){
                water.push({x:_x,y:_y,width:BRICK_WIDTH,height:BRICK_HEIGHT})
            }
            else {
                blank_spaces.push({x: _x, y: _y})
            }
        })
    })
}
function drawLevels(){
    bricks.forEach(brick => {
        ctx.drawImage(BRICK_IMAGE, 0, 0, brick.width, brick.height, brick.x, brick.y, brick.width, brick.height);
    })
    iron_blocks.forEach(iron_block => {
        ctx.drawImage(IRON_BLOCK_IMAGE,iron_block.x,iron_block.y,iron_block.width,iron_block.height);
    })
}