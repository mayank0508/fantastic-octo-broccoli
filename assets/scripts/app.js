const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 20;
const HEAL_PLAYER = 5;

const entertedvalue = prompt('Maximum life you give to your and the monster', '100');

let chooseMaxLife = parseInt(entertedvalue);
if (isNaN(chooseMaxLife) || chooseMaxLife <=0){
    chooseMaxLife = 100;
}

let currentMonsterHealth = chooseMaxLife;
let currentPlayerHealth = chooseMaxLife;
let hasBonusLife = true;

adjustHealthBars(chooseMaxLife);

function reset() {
    let currentMonsterHealth = chooseMaxLife;
    let currentPlayerHealth = chooseMaxLife;
    resetGame(chooseMaxLife);   //here we have give resetGame() choosieMax life cause i wanted it to reset ot the chossen max life
}


function endRound() {
    const intialPlayerlife = currentPlayerHealth;
    const playerdamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerdamage;

    if (currentPlayerHealth <=0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = intialPlayerlife;
        setPlayerHealth(intialPlayerlife);
        alert('you would be dead but bonus life helped you');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won !');
        //reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost !');
        //reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('Match Drawn');
        //reset();
    }

    if (currentMonsterHealth <= 0||            //thid method is for better code readibiltiy
        currentPlayerHealth <= 0 )
    {
        reset();
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