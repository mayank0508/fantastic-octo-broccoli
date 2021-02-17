const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 20;

let chooseMaxLife = 100;
let currentMonsterHealth = chooseMaxLife;
let currentPlayerHealth = chooseMaxLife;

adjustHealthBars(chooseMaxLife);

function attackMonster(mode) {
    let attackValue;
    if (mode === 'ATTACK') {
        attackValue = ATTACK_VALUE; 
    } else if (mode === 'STRONG_ATTACK') {
        attackValue = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(mode);
    currentMonsterHealth -= damage;
    const playerdamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerdamage;
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won !');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost !');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('Match Drawn');
    }
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
}   


attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);