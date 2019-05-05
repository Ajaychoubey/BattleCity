function Tank(x, y, number_of_hits_required_to_break_a_brick){
    this.bullets = [];
    this.number_of_hits_required_to_break_a_brick = number_of_hits_required_to_break_a_brick;
    this.x = x;
    this.y = y;
    this.bullet_width = BULLET_WIDTH;
    this.bullet_height = BULLET_HEIGHT;
    this.lives = TANK_DEFAULT_LIVES;
    this.side = 'up'
    this.level = 1;
    this.shoot = () => {
        let num = 7;
        bullet_x = (tank.x+(TANK_WIDTH/2))-(BULLET_WIDTH/2);
        bullet_y = (tank.y+(TANK_HEIGHT/2))-(BULLET_HEIGHT/2);
        this.bullets.push(new Bullet(bullet_x, bullet_y, this.bullet_width, this.bullet_height));
    }
}