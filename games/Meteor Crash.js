/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Game
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const meteor = "m"
const background = "b"
score = 0;
scoreText = addText("Points: " + score, { x: 5, y: 0, color: color`3` });
points = 0


setLegend(
  [ player, bitmap`
.......00.......
.......00.......
......0030......
.....003300.....
....0033330.....
....0333330.....
...03000030.....
...030770300....
...030770330....
...033000330....
...033333330....
...000000000....
..00..00...0....
..0...0....00...
..0...0.....0...
..0...0.....0...` ],
  [ meteor, bitmap`
.....00000......
...00CCLLC00....
..0CLLLLLLCC0...
.0CLLCCCLLLCC0..
.0CLLCCCCLCLC0..
0CLCCCLLLLLLCL0.
0CLCLCLCLLLCLL0.
0CLLLCCCLCCCLC0.
0CCLLLLCLCCCLC0.
.0CCCLLCLLLCC0..
.0CCLCCCLLLLL0..
..0CCLLLLCCC0...
...00LCLCC00....
.....00000......
................
................` ],
  [ background, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ],
)

setSolids([])

let level = 0
const levels = [
  map`
......
..m...
......
......
......
......
......
...p..
......`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})
const meteorSpeed = 150;

const stopGame = () => {
  clearInterval(gameLoop);
  clearText();
}
const playerSprite = getFirst(player)
const meteorSprite = getAll(meteor)
const gameHeight = height();
const moveMeteorDown = () => {
  const meteorSprite = getFirst(meteor);
  if (meteorSprite.y == 8) {
    getFirst(meteor).x = getFirst(player).x || getFirst(player).x - 1 || getFirst(player).x + 1
    getFirst(meteor).y = 0
    score += 1
    console.log(score)
    scoreText = addText("Points: " + score, { x: 5, y: 0, color: color`3` });
  } else {
    // Move the meteor sprite down
    meteorSprite.y += 1;
  }
  if (getFirst(meteor).y == getFirst(player).y && getFirst(player).x == getFirst(meteor).x){
    stopGame(); // Stop the game
      addText("Game Over!", { x: 5, y: 4, color: color`3` })
    playerSprite.remove();
    meteorSprite.remove();

  }
}

const gameLoop = setInterval(moveMeteorDown, meteorSpeed);

  getFirst(meteor).y += 1;
  getFirst(player).y -= 1
  onInput("a", () => {
    getFirst(player).x -= 1
  })
  onInput("d", () => {
    getFirst(player).x += 1
  })
