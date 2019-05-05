function Bullet(x, y, width, height, bullet_side=tank.side, state='friendly'){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bullet_side = bullet_side;
    this.bullet_side_image = bullet_side_image;
    this.state = state;
    this.hits = 0;
    this.create = () => {
        ctx.drawImage(this.bullet_side_image, this.x, this.y, this.width, this.height)
    }
    this.update = () => {
        this.create();
        switch (this.bullet_side) {
            case 'left':
                this.x -= BULLET_SPEED;
                break;
            case 'right':
                this.x += BULLET_SPEED;
                break;
            case 'up':
                this.y -= BULLET_SPEED;
                break;
            case 'down':
                this.y += BULLET_SPEED;
                break;
        }
    }
}
