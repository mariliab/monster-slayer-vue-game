function getRandomValue(min, max) {
  return Math.random() * (max - min) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentRound: 0,
      theWinner: null,
      gameLog: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: "100%" };
      }
      return { width: 100 - this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: "100%" };
      }
      return { width: 100 - this.playerHealth + "%" };
    },
    specialAttackAvailable() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.theWinner = "draw";
      } else if (value <= 0) {
        this.theWinner = "monster";
        this.gameLog.push({
          text: "Monster wins!",
          player: "monster",
        });
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.theWinner = "draw";
      } else if (value <= 0) {
        this.theWinner = "you";
        this.gameLog.push({
          text: "Player wins!",
          player: "player",
        });
      }
    },
  },
  methods: {
    playAgain() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.currentRound = 0;
      this.theWinner = null;
      this.gameLog = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.gameLog.push({
        text: `Player attacks monster with a force of ${Math.floor(
          attackValue
        )}`,
        player: "player",
      });
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.gameLog.push({
        text: `Monster attacks player with a force of ${Math.floor(
          attackValue
        )}`,
        player: "monster",
      });
      this.playerHealth -= attackValue;
    },
    specialAttack() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.gameLog.push({
        text: `Player SPECIAL attacks monster with a force of ${Math.floor(
          attackValue
        )}`,
        player: "player",
      });
      this.monsterHealth -= attackValue;
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      this.gameLog.push({
        text: `Heal player with ${Math.floor(healValue)}`,
        player: "player",
      });
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
    },
    surrender() {
      this.theWinner = "monster";
      this.gameLog.push({
        text: "You surrender, monster wins!",
        player: "monster",
      });
    },
    getClass(logEvent) {
      if (logEvent === "monster") {
        return "monster";
      } else {
        return "player";
      }
    },
  },
});

app.mount("#game");
