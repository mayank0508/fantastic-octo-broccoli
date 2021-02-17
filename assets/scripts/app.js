const ATTACK_VALUE = 10;
let chooseMaxLife = 100;
let currentMonsterHealth = chooseMaxLife;
let currentPlayerHealth = chooseMaxLife;

adjustHealthBars(chooseMaxLife);

function attackHandler() {
    const damage = dealMonsterDamage(ATTACK_VALUE);
    currentMonsterHealth -= damage;
}
 
attackBtn.addEventListener('click', attackHandler);