const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const TITLE = 'Battle City';
// FOLDERS
const ROOT_FOLDER = './';
const IMAGE_SRC = `${ROOT_FOLDER}/images`; 
const AUDIO_SRC = `${ROOT_FOLDER}/audio`;
// GAME
const LEVEL_LABEL_COORDINATES_X = 76;
const LEVEL_LABEL_COORDINATES_Y = 136;
const BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.2)';
const ANIMATION_TICKS = 50;
const keyBindings = {
    "up":"ArrowUp",
    "left":"ArrowLeft",
    "down":"ArrowDown",
    "right":"ArrowRight",
    "shoot":" "
}
// TANK
const TANK_WIDTH = 50;
const TANK_HEIGHT = 50;
const TANK_MOVE_SPEED = 9;
const TANK_UP_IMAGE_SRC = `${IMAGE_SRC}/up.png`;
// PUSH_FORCE_IF_HITS_A_BLOCK MUST NOT BE 0; 
// BULLET
const BULLET_UP_IMAGE_SRC = `${IMAGE_SRC}/bullet_up.png`;
let BULLET_WIDTH = 18;
let BULLET_HEIGHT = 18;
const BULLET_SPEED = 20;
// BRICK
const BRICK_WIDTH = 60;
const BRICK_HEIGHT = 60;
const BRICK_IMAGE_SRC = `${IMAGE_SRC}/brick.png`;
const NUMBER_OF_HITS_REQUIRED_TO_BREAK_A_BRICK = 3;
// IRON_BLOCK
const IRON_BLOCK_IMAGE_SRC = `${IMAGE_SRC}/iron_block.png`;
const IRON_BLOCK_WIDTH = 60;
const IRON_BLOCK_HEIGHT = 60;

/*
    SpaceBar:' ',
    Arrows:'Arrow<Arrow name without space with first letter capital>',
*/
// SPECIALS
const POWER_UP_TANK_COMING_CHANCES = 5;
const POWER_UPS = ['freeze','burst','star','life'];
const FREEZE_DURATION = 900;
const POWER_UP_STAY = 800;
const IRONED_DURATION = 700;
/* 
NOTE:
--> POWER_UP_TANK_COMING_CHANCES low number = more chances
--> POWER_UP_TANK_COMING_CHANCES high number = less chance
*/
// ENEMY TANKS
const POINTS_FOR = {
    LEVEL_1_TANK:100,
    LEVEL_2_TANK:200,
    LEVEL_3_TANK:500
};
const TANK_DEFAULT_LIVES = 3;
const ENEMY_SPAWN_TICKS = 200;
const ENEMY_SHOOT_INTERVAL = 60;
const MAXIMUM_ENEMY_TANKS_TO_BE_SPAWNED_IN_A_LEVEL = {
    "0":30,
    "1":30,
};
let MAXIMUM_LEVEL_OF_ENEMY_TANKS = 3;
// DON'T CHANGE THIS //
const TANK_UP_IMAGE = new Image();
const BULLET_UP_IMAGE = new Image();
const BRICK_IMAGE = new Image();
const IRON_BLOCK_IMAGE = new Image();
const GRASS_IMAGE = new Image();
const WATER_IMAGE = new Image();
const BURST = new Image();
const FRONT_POSTER = new Image();
const EAGLE_IMAGE = new Image();
const FREEZE = new Image();
const KILL = new Audio()
const SHOOT = new Audio();
const MOVING = new Audio();
const STOP = new Audio();
const WELCOME = new Audio();
// ADD SOURCE
TANK_UP_IMAGE.src = TANK_UP_IMAGE_SRC;
BULLET_UP_IMAGE.src = BULLET_UP_IMAGE_SRC;
BRICK_IMAGE.src = BRICK_IMAGE_SRC;
IRON_BLOCK_IMAGE.src = IRON_BLOCK_IMAGE_SRC;
GRASS_IMAGE.src = `${IMAGE_SRC}/grass.png`;
WATER_IMAGE.src = `${IMAGE_SRC}/water.png`;
WELCOME.src = `${AUDIO_SRC}/welcome.wav`;
BURST.src = `${IMAGE_SRC}/blast_1.png`;
FRONT_POSTER.src = `${IMAGE_SRC}/frontPoster.png`;
KILL.src = `${AUDIO_SRC}/kill.wav`;
SHOOT.src = `${AUDIO_SRC}/shoot.wav`;
MOVING.src = `${AUDIO_SRC}/moving.wav`;
STOP.src = `${AUDIO_SRC}/stop.wav`;
EAGLE_IMAGE.src = `${IMAGE_SRC}/eagle.png`;
