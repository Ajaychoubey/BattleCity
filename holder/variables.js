let side = TANK_UP_IMAGE;
let tank = new Tank(0, 0, NUMBER_OF_HITS_REQUIRED_TO_BREAK_A_BRICK);
let bullets = [];
let enemy_tanks_spawn_points = []
let ticks = 0;
let iron_blocks = [];
let bricks = [];
let friendly_bullets = [];
let enemy_bullets = [];
let ironify_ticks = 0;
let special_bricks = [];
let isIroned = false;
let stats = {
    level_3_enemy_tanks_killed:0,
    level_2_enemy_tanks_killed:0,
    level_1_enemy_tanks_killed:0,
    points:0
}
let bullet_side_image = BULLET_UP_IMAGE;
let eagles = [];
let tank_spawned = '';
let bullet_side = '';
let isMoving = false;
let isStarted = false;
let isFrozen = false;
let freeze_timing = 0;
let level_no = 0;
let bursters = [];
let grass = [];
let water = [];
let blank_spaces = [];
let animation_ticks = 0;
let power_ups = [];
let tank_spawn_point = {x:0,y:0};
let enemy_tanks = [];