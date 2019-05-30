canvas.width = 1500;
canvas.height = 792;
createLevels(levels[level_no]);
let blocks = [...bricks,...iron_blocks,...water,...eagles];
let ticks_for_shoot = 0;
// WELCOME.play();
function loop(){
    // ctx.drawImage(FRONT_POSTER, 0, 0,500,500);
    // ctx.drawImage(TANK_UP_IMAGE, LEVEL_LABEL_COORDINATES_X, LEVEL_LABEL_COORDINATES_Y,10,10);
    if(!isStarted){
    if(isFrozen) freeze_timing++;
    if((freeze_timing %= FREEZE_DURATION) == 0){
        isFrozen = false;
    }
    if(isMoving){
        MOVING.play();
        STOP.pause();
    }
    else{
        MOVING.pause();
        STOP.play();
    }
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    animation_ticks++;
    if((animation_ticks %= ANIMATION_TICKS) == 0){
        tank.animateTick++;
    }
    if(tank.animateTick > NUMBER_OF_HITS_REQUIRED_TO_BREAK_A_BRICK){
        tank.animateTick = 0;
    }
    drawLevels();
    drawTank();
    water.forEach(w => {
        ctx.drawImage(WATER_IMAGE,w.x,w.y,w.width,w.height)
    })
    ticks++;
    ticks_for_shoot++;
    if ((ticks % ENEMY_SPAWN_TICKS) == 0 && tank_spawned < MAXIMUM_ENEMY_TANKS_TO_BE_SPAWNED_IN_A_LEVEL[level_no+""]) {
        build_enemy_tanks()
        // console.log()
        tank_spawned++;
    };
    eagles.forEach(eagle => {
        ctx.drawImage(EAGLE_IMAGE, eagle.x, eagle.y, eagle.width, eagle.height)
    })
    if(tank_spawned >= MAXIMUM_ENEMY_TANKS_TO_BE_SPAWNED_IN_A_LEVEL[level_no+""] && enemy_tanks.length == 0){
        level_no++;
        Reset();
    }
    tank.bullets.forEach((bullet,index) => {   
        bullet.update()  
        if(bullet.x > canvas.width || bullet.x < 0 || bullet.y > canvas.height || bullet.y < 0) {
            tank.bullets.splice(index,1);
        }   
        enemy_bullets = [];
        friendly_bullets = [];
        if(bullet.x > canvas.width || bullet.x < 0) bullets.splice(index,1);
        if(bullet.y > canvas.height || bullet.y < 0) bullets.splice(index,1);
        bricks.forEach((brick, index2)=>{
            if (AABB(bullet.x, bullet.y, bullet.width, bullet.height, brick.x, brick.y, 
                brick.width, brick.height)) {
                brick.hits++;
                if(bullet.bullet_side == 'up') {
                    brick.height -= BRICK_HEIGHT/tank.number_of_hits_required_to_break_a_brick
                };
                if(bullet.bullet_side == 'left') {
                    brick.width -= BRICK_HEIGHT/tank.number_of_hits_required_to_break_a_brick
                };
                if(bullet.bullet_side == 'right') {
                    brick.width -= BRICK_HEIGHT/tank.number_of_hits_required_to_break_a_brick
                    brick.x += BRICK_WIDTH/tank.number_of_hits_required_to_break_a_brick;
                };
                if(bullet.bullet_side == 'down') {

                    brick.height -= BRICK_HEIGHT/tank.number_of_hits_required_to_break_a_brick
                    brick.y += BRICK_HEIGHT/tank.number_of_hits_required_to_break_a_brick;
                };
                // bursters.push({x:brick.x,y:brick.y});
                if(brick.width == 0 || brick.height == 0){
                    blocks.splice(index2,1);
                    bricks.splice(index2,1)
                };
                tank.bullets.splice(index,1)
            }
            eagles.forEach((eagle,index) => {
                if(AABB(eagle.x, eagle.y, eagle.width, eagle.height, bullet.x, bullet.y, bullet.width, bullet.height)){
                    eagles.splice(index, 1);
                    Reset();
                    level_no = 0;
                }
            })
            iron_blocks.forEach((iron_block,index2) => {
                if(AABB(iron_block.x,iron_block.y,iron_block.width,iron_block.height,
                    bullet.x,bullet.y,bullet.width,bullet.height)){
                        tank.bullets.splice(index,1)
                }
            })
        })
        if(bullet.state == 'enemy'){
            enemy_bullets.push({bullet,index,width:bullet.width,height:bullet.height})
            if(AABB(tank.x,tank.y,TANK_WIDTH,TANK_HEIGHT,bullet.x,bullet.y,bullet.width,bullet.height)){
                tank.x = tank_spawn_point.x;
                tank.y = tank_spawn_point.y;
                bullets.splice(index,1)
                KILL.play();
                tank.lives--;
                if(tank.lives <= 0){
                    level_no = 0;
                    Reset();
                }
            }
        }
        if(bullet.state == 'friendly'){
            friendly_bullets.push({bullet,index,width:bullet.width,height:bullet.height})
        }
    });
    power_ups.forEach((power_up,index) => {
        power_up.duration++;
        ctx.drawImage(power_up.image, power_up.x, power_up.y, BRICK_WIDTH, BRICK_HEIGHT);
        if(!(power_up.duration > POWER_UP_STAY)){
        if(AABB(power_up.x,power_up.y,BRICK_WIDTH,BRICK_HEIGHT,tank.x,tank.y,TANK_WIDTH,TANK_HEIGHT)){
            
            if(power_up.power_up == 'star' && tank.number_of_hits_required_to_break_a_brick >= 3)
            {
                tank.number_of_hits_required_to_break_a_brick = 2;
                tank.bullet_width += 5;
                tank.bullet_height += 5;
            }
            if(power_up.power_up == 'burst') {
                enemy_tanks = [];
            }
            if(power_up.power_up == 'freeze') {
                isFrozen = true;
                freeze_timing = 0;
            }
            if(power_up.power_up == 'life') {
                tank.lives++;
            }
            if(power_up.power_up == 'ironify')
            {
                isIroned = true;
            }
            power_ups.splice(index, 1);
        }
        }
        else {
            power_ups.splice(index, 1);
        }
    })
    enemy_tanks.forEach((enemy_tank,index) => {
        if(!isFrozen) !Tester(enemy_tank).includes(enemy_tank.side) ? enemy_tank.side = EnemyAlgorithm(enemy_tank) : enemy_tank;
        ctx.drawImage(enemy_tank.image,enemy_tank.x,enemy_tank.y,TANK_WIDTH,TANK_HEIGHT)
        if((enemy_tank.relax_duration %= ENEMY_SHOOT_INTERVAL) == 0){
            if(!isFrozen) if(enemy_tanks.length!=0) enemy_tank.shoot();
        }
        enemy_tank.relax_duration+=0.5;
        if(!isFrozen) enemy_tank.move();
        tank.bullets.forEach((bullet,index2) => {
            if(bullet.state == 'friendly'){
                if(AABB(bullet.x,bullet.y,bullet.width,bullet.height,enemy_tank.x,enemy_tank.y,TANK_WIDTH,TANK_HEIGHT)){
                    enemy_tank.level--;
                    if(enemy_tank.level <= 0) {
                        enemy_tanks.splice(index,1)
                        if(enemy_tank.isSpecial) GeneratePowerUp();
                        stats[`level_${enemy_tank.constant_level}_enemy_tanks_killed`]++;
                        for(const i in stats){
                            if(i !== 'points')
                            stats['points'] += stats[i]*POINTS_FOR[`LEVEL_${enemy_tank.constant_level}_TANK`]
                        }
                    };
                    tank.bullets.splice(index2,1);
                    bursters.push({x: enemy_tank.x, y: enemy_tank.y, width: enemy_tank.width, height: enemy_tank.height});
                    
                    KILL.play();
                }
            }
        })
    })
    friendly_bullets.forEach(fbullet => {
        enemy_bullets.forEach(ebullet => {
            if(AABB(fbullet.bullet.x, fbullet.bullet.y,fbullet.bullet.width,fbullet.bullet.height,
                ebullet.x,ebullet.y,ebullet.width,ebullet.height)){
                    friendly_bullets.splice(fbullet.index,1)
                    enemy_bullets.splice(ebullet.index,1)
                }
        })
    })
    if(bursters.length >= 1) {
        ctx.drawImage(BURST, bursters[0].x, bursters[0].y, bursters[0].width, bursters[0].height);
        // console.log('Hello');
    }
    grass.forEach(g => {
        ctx.drawImage(GRASS_IMAGE,g.x,g.y,g.width,g.height);
    })
    }
    requestAnimationFrame(loop)
}
// let game = setInterval(() => {
// }, enemy_tanks.length != 0 ? ENEMY_SHOOT_INTERVAL/enemy_tanks.length : ENEMY_SHOOT_INTERVAL);
setInterval(()=>{
    if(!isFrozen)
    enemy_tanks.forEach(enemy_tank => {
        enemy_tank.side = EnemyAlgorithm(enemy_tank);
    })
},5000)
loop();
