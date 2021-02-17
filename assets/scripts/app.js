const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE =14;

let chooseMaxLife = 100;
let currentMonsterHealth = chooseMaxLife;
let currentPlayerHealth = chooseMaxLife;

adjustHealthBars(chooseMaxLife);

function attackHandler() {
    const damage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -= damage;
    const playerdamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerdamage;
    if(currentMonsterHealth <= 0 ){
        alert('You Won !');
    } else if(currentPlayerHealth <= 0){
        alert('You Lost !');
    }
}
 
attackBtn.addEventListener('click', attackHandler);