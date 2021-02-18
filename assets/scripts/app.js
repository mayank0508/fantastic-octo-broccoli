const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 20;
const HEAL_PLAYER = 5;

let chooseMaxLife = 100;
let currentMonsterHealth = chooseMaxLife;
let currentPlayerHealth = chooseMaxLife;
let hasBonusLife = true;

adjustHealthBars(chooseMaxLife);

function endRound() {
    const intialPlayerlife = currentPlayerHealth;
    const playerdamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerdamage;

    if (currentPlayerHealth <=0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = intialPlayerlife;
        setPlayerHealth(increasePlayerHealth);
        alert('you would be dead but bonus life helped you');
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won !');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost !');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('Match Drawn');
    }
}

function attackMonster(mode) {
    let attackValue;
    if (mode === 'ATTACK') {
        attackValue = ATTACK_VALUE;
    } else if (mode === 'STRONG_ATTACK') {
        attackValue = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(attackValue);
    currentMonsterHealth -= damage;
    endRound();
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
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
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', Healhandler);