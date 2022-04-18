// Thanks to BHPSNGUM for his help.
// Check out his server : https://discord.gg/FdmpusW

var team = ["RED ","BLUE"];
var team2 = ["RED ","BLUE","DRAW"];

var teamsSCORES = [
  [], // team 0
  [], // team 1
];

var score_act = function(game) {
    teamsSCORES.forEach(team => team.splice(0));
    for (let ship of game.ships) {
      if (ship.custom.team === 1 || ship.custom.team == 0) {
        let team = teamsSCORES[ship.custom.team];
        if (team) team.push(ship);
      }
    }
    teamsSCORES.forEach(team => team.sort((a, b) => b.score - a.score).splice(4));
    scoreboard.components = [];
    teamsSCORES.forEach((team, index) => {
      let teamOffsetY = 50 * index;
      team_ = ["RED ","BLUE"];
      scoreboard.components.push({ type: "box",position:[0,teamOffsetY,100,10],fill:colors[index]});
      scoreboard.components.push({ type: "text",position:[0,teamOffsetY,100,10],color:"#CDE",value:`${team_[index]} TEAM`});
      teamOffsetY += 10;
      team.forEach((ship, sIndex) => {
        idk = ship.name.split('');
        idk.splice(12).join('');
        scoreboard.components.push(
          { type: "box",position:[0,teamOffsetY + sIndex * 9.9,100,10], fill: colorsACC[ship.custom.team]},
          { type: "text",position:[30, teamOffsetY + sIndex * 9.9,120,10],value: `${ship.custom.kills}` , color:"#CDE"},
          { type: "text",position:[2.5,teamOffsetY + sIndex * 9.9,80,10],value: `${sIndex+1}. ${idk.join('')}` , color:"#CDE",align:"left"},
        )
      });
    });
    game.setUIComponent(scoreboard);
};
  
  
var scoreboard = {
    id: "scoreboard",
    visible: true,
    components: []
}; 
