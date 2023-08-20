let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

//Declaring the variables and linking them to the ids created earlier
/*Comments are same as those in cpp*/

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//creating an array of objects for weapons
const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  }
];

const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 30,
    health: 300
  }
];

// creating the variable location to use in the update function
// the variable is better an array with an object. Object = unordered_map cross class in cpp
//in object, to declare an array, you should use quotation marks on either sides of the name of the key
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text:
      'You are now at the town square. You can see a function to go to "store".'
  },
  {
    name: "store",
    //justlist: ["a", "b", "c"],
    "button text": [
      "Buy 10 health(10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square"
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You entered the store."
  },
  {
    name: "cave",
    "button text": ["Fight Slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You are now in the cave. Yo can see some monsters."
  },
  {
    name: "fight",
    "button text": ["Fight", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "killmoster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square"
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: "The monster dies. You gain xp and found gold."
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You died."
  },
  {
    name: "wingame",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeated the Dragon. You won the game"
  },
  {
    name: "easteregg",
    "button text": ["2", "8", "Go to town square"],
    "button functions": [pickTwo, pickEight, goTown],
    text:
      "You just found a secret chamber. Select any of the two numbers. Two numbers will be randomly chosen, If one of them matches with the number you picked, you win!"
  }
];

//initializing buttons:
/*syntax:
buttonName.actionName=theFunctionItCalls
*/
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// As the below functions have doing repitative things we can define another function that handles the function calls basd on a parameter location.

function update(location) {
  monsterStats.style.display = "none";
  // button1.innerText = location.justlist[0];//you can acces using point notation if the name is a single word
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  // To insert quotation marks inside quatation marks use \"__\" instead of "__"
  text.innerText = location.text; //location["text"] can also be used
}

function goTown() {
  update(locations[0]);

  //we can just call update function to do the same work
  // button1.innerText="Go to store";
  // button2.innerText="Go to cave";
  // button3.innerText="Fight dragon";
  // button1.onclick = goStore;
  // button2.onclick = goCave;
  // button3.onclick = fightDragon;
  // // To insert quotation marks inside quatation marks use \"__\" instead of "__"
  // text.innerText = "You are now at the town square. Yo can see a function to go to \"store\".";
}

//Declaring functions:
/*Syntax:
function functionName(){
  //Code of the function
}
*/
function goStore() {
  update(locations[1]);

  //update function can be used instead of:
  // console.log("Going to Store.");
  // this function should update the webpage
  // button1.innerText = "Buy 10 health(10 gold)";
  // button2.innerText = "Buy weapon (30 gold)";
  // button3.innerText = "Go to town square";
  // // should also update the functions of the buttons:
  // //Note that the indentation (gap from left edge) is optional.
  // button1.onclick = buyHealth;
  // button2.onclick = buyWeapon;
  // //goTown function sends you back to homepage
  // button3.onclick = goTown;
  // // Updating the body of the website
  // text.innerText = "You entered the store.";
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold = gold - 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You dont't have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      //printing the entire inventory after adding a new weapon
      text.innerText += "In your inventory, you have: " + inventory; // printing array just by name prints all elements separated by commas
    } else {
      text.innerText = "You don't have enough money to buy a weapon";
    }
  } else {
    text.innerText = "You already have the most powerful weapon.";
    button2.innerText = "Sell your weapon for 15 gold";
    button2.onclick = sellWeapon();
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    //declaring variable by same name but this is valid within this if statement
    let currentW = inventory.shift(); //shift function deletes the last or latest weapon and gives to the specified variable
    text.innerText = "You just sold a " + currentW + ".";
    text.innerText +=
      " You still have these in your inventory: " + inventory + ".";
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block"; //.style is used to access the css part of the id
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks. ";
  text.innerText +=
    "You attack it with your " + weapons[currentWeapon].name + ".";
  if (isHit()) {
    health -= hitDamage(monsters[fighting].level);
  }
  monsterHealth -=
    weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      //can also use == to compare but does not cehck if they are of same data type
      winGame();
    } else {
      defeatMonster();
    }
  }

  if (Math.random() < 0.1 && inventory.length !== 1) {
    text.innerText += "Your " + inventory.pop() + " broke.";
    currentWeapon--;
  }
}

function isHit() {
  return Math.random() < 0.2 || health < 20;
}

function hitDamage(level) {
  let hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit;
}

function dodge() {
  text.innerText = "You dodged an attack from " + monsters[fighting].name + ".";
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  let numbers = [];

  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }

  text.innerText = "You picked " + guess + ". The random numbers are:\n";

  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }

  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Right! you won 20 gold.";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! you lose 10 health.";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
