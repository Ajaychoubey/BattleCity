function EnemyTank(x, y){
    this.x = x;
    this.y = y;
    this.image = new Image();;
    this.side = 'down';
    this.relax_duration = 0;
    this.level = Math.floor(Math.random() * MAXIMUM_LEVEL_OF_ENEMY_TANKS+1);
    this.constant_level = this.level;
    this.image.src = `${IMAGE_SRC}/enemy_tank_${this.side}_${this.level}.png`;
    let power_tank = POWER_UP_TANK_COMING_CHANCES;
    if(POWER_UP_TANK_COMING_CHANCES < 5) power_tank = 5
    this.isSpecial = Math.floor(Math.random() * power_tank) == 4 ? true : false;
    this.move = ()=>{
        this.image.src = `${IMAGE_SRC}/enemy_tank_${this.side}_${this.level}.png`;
        if(this.side == 'left') this.x--;
        if(this.side == 'right') this.x++;
        if(this.side == 'up') this.y--
        if(this.side == 'down') this.y++;
    }
    this.shoot = ()=>{
        bullet_x = (this.x+(TANK_WIDTH/2))-(BULLET_WIDTH/2);
        bullet_y = (this.y+(TANK_HEIGHT/2))-(BULLET_HEIGHT/2);
        tank.bullets.push(new Bullet(bullet_x, bullet_y, BULLET_WIDTH, BULLET_HEIGHT, this.side, 'enemy'))
    }
}
function build_enemy_tanks(){
    let [x,y] = enemy_tanks_spawn_points[Math.floor(Math.random()*enemy_tanks_spawn_points.length)];
    enemy_tanks.push(new EnemyTank(x,y))
}
