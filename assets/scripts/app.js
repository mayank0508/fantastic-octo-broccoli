const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 20;
const HEAL_PLAYER = 5;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_PLAYER_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const entertedvalue = prompt('Maximum life you give to your and the monster', '100');
let battleLog = [];

let chooseMaxLife = parseInt(entertedvalue);
if (isNaN(chooseMaxLife) || chooseMaxLife <= 0) {
    chooseMaxLife = 100;
}

let currentMonsterHealth = chooseMaxLife;
let currentPlayerHealth = chooseMaxLife;
let hasBonusLife = true;

function writetoLOG(ev, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
    };
    if (ev === LOG_EVENT_PLAYER_ATTACK) {
        logEntry.target = 'MONSTER';
        //battleLog.push(logEntry);
    } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: 'MONSTER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
        //battleLog.push(logEntry);
    } else if (ev === LOG_EVENT_PLAYER_MONSTER_ATTACK) {
        logEntry = {
            event: ev,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
        //battleLog.push(logEntry);
    } else if (ev === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: ev,
            value: val,
            target: 'PLAYER',
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
        //battleLog.push(logEntry);
    } else if (ev === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: ev,
            value: val,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    }
    battleLog.push(logEntry);
}

adjustHealthBars(chooseMaxLife);

function reset() {
    let currentMonsterHealth = chooseMaxLife;
    let currentPlayerHealth = chooseMaxLife;
    resetGame(chooseMaxLife); //here we have give resetGame() choosieMax life cause i wanted it to reset ot the chossen max life
}


function endRound() {
    const intialPlayerlife = currentPlayerHealth;
    const playerdamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerdamage;
    writetoLOG(
        LOG_EVENT_PLAYER_MONSTER_ATTACK,
        playerdamage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = intialPlayerlife;
        setPlayerHealth(intialPlayerlife);
        alert('you would be dead but bonus life helped you');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won !');
        writetoLOG(
            LOG_EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
        //reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost !');
        writetoLOG(
            LOG_EVENT_GAME_OVER,
            'MONSTER WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
        //reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('Match Drawn');
        writetoLOG(
            LOG_EVENT_GAME_OVER,
            'FUCKING BORING DRAW',
            currentMonsterHealth,
            currentPlayerHealth
        );
        //reset();
    }

    if (currentMonsterHealth <= 0 || //thid method is for better code readibiltiy
        currentPlayerHealth <= 0) {
        reset();
    }
}

function attackMonster(mode) {
    let attackValue;
    let logEvent;
    if (mode === MODE_ATTACK) {
        attackValue = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    } else if (mode === MODE_STRONG_ATTACK) {
        attackValue = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
    }
    const damage = dealMonsterDamage(attackValue);
    currentMonsterHealth -= damage;
    writetoLOG(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}

function Healhandler() {
    let healValue;
    if (currentPlayerHealth >= chooseMaxLife - HEAL_PLAYER) {
        alert('you cant heal to more than you max health.');
        healValue = chooseMaxLife - currentPlayerHealth
    } else {
        healValue = HEAL_PLAYER;
    }
    increasePlayerHealth(HEAL_PLAYER);
    currentPlayerHealth += healValue;
    writetoLOG(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth,
    );
    endRound();
}

function showLogHandler() {
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', Healhandler);
logBtn.addEventListener('click', showLogHandler);