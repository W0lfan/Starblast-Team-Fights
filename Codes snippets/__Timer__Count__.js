var counting = function(game) {
    game.custom.Seconds--;
    if (game.custom.Phase === "Waiting" && game.custom.Game_Running != true) {
      if (game.custom.Seconds === 0 ) {
        game.custom.Seconds = 59;
        for (let ship of game.ships) {
          ship.custom.In_Game = true;
          hide_ships_pannel(ship);
          if (ship.type > 101) ship.set({idle:false, collider: true, crystals: 350, stats:666666,shield:1000,generator:1000});
        }
        game.custom.round++;
        game.custom.Points.push([0,0]);
        components.teamsPoints.components[0].value = game.custom.Points[game.custom.round-1][1];
        components.teamsPoints.components[2].value = game.custom.Points[game.custom.round-1][0];
        game.setUIComponent(components.teamsPoints);
        components.roundsShow.components[0].value = `Rounds: ${game.custom.round}/${game.custom.MaxRounds}`;
        game.setUIComponent(components.roundsShow);
        for (let ship of game.ships) {
          ship.setUIComponent({id:"winRound",visible:false});
          hide_ships_pannel(ship);
          if (ship.type > 101) ship.set({crystals:350,generator:1000, shield:1000, idle:false,stats: 66666666});
        }
        game.custom.Phase = "Map Reducing";
        game.custom.Rounds_Winner.push("");
        game.custom.Game_Running = true;
      }
      components.timer.components[0].value = `GAME STARTING IN ${game.custom.Seconds}s`;
      components.timer.components[1].value = "PREPARE YOURSELF";
    } 
    if (game.custom.Phase == "Map Reducing" && game.custom.Game_Running != false && game.custom.Map_Reducing_Phase < game.custom.Max_Reducing) {
      if (game.custom.Seconds === 0) {
        game.custom.Seconds = 19;
        if (game.custom.Map_Reducing_Phase < game.custom.Max_Reducing) {
          game.setCustomMap(reduce_map(game.custom.Map_Reducing_Phase));
          game.custom.Map_Reducing_Phase++;
        }
      }

      if (game.custom.Map_Reducing_Phase < game.custom.Max_Reducing) {
        components.timer.components[0].value = `MAP REDUCING IN ${game.custom.Seconds}s`;
        components.timer.components[1].value = "AVOID BORDERS";
      } else {
        game.custom.Phase = "Round End";
        game.custom.Seconds = 29;
      }
    } 
    if (game.custom.Phase === "Round End" && game.custom.Game_Running != false) {
      if (game.custom.Seconds === 0) {
        if (game.custom.Points.length >= 1 && (game.custom.Rounds_Winner[game.custom.round-1] != "Red" || game.custom.Rounds_Winner[game.custom.round-1] != "Blue" || game.custom.Rounds_Winner[game.custom.round-1] != "None")) {
          if (game.custom.Points[game.custom.round-1][0] === game.custom.Points[game.custom.round-1][1]) {
            game.custom.Rounds_Winner[game.custom.round-1] = "None";
          } else {
            game.custom.Points[game.custom.round-1].forEach(i => {
              team = ["Red","Blue"]
              if (i >= Math.round(game.custom.MaxPlayers/2) ) {
                game.custom.Rounds_Winner[game.custom.round-1] = team[game.custom.Points[game.custom.round-1].indexOf(i)];
              }
            });
          }
        }
      }
      getRandomArbitrary(0,201) == 2 ? Reduce = "KOROM IS COMING" : Reduce = "MAP FULLY REDUCED!";
      components.timer.components[0].value = Reduce;
      components.timer.components[1].value = `ROUND ENDS IN ${game.custom.Seconds}s`;
    }
  game.setUIComponent(components.timer);
  };
  var secount_count = function(game) {
    if (game.custom.Phase === "Ppl") {
      game.custom.Seconds--;
      if (game.custom.Seconds === 0) {
        for (let i = 0; i < game.custom.MaxPlayers-game.custom.Amount_Of_Players_Per_Team[0]+game.custom.Amount_Of_Players_Per_Team[1];i++) {
          var exclude = [];
          for (let i_ = 0; i_ < game.ships.length; i_++) {
            if (game.ships[i_].custom.waiting === true || game.custom.Amount_Of_Players_Per_Team[game.ships[i_].custom.team] >= game.custom.MaxPlayers) {
              exclude.push(i_);
            }
          }
          var random = generateRandom(0,game.ships.length-1,exclude);
          echo(random, exclude, " <-- Randoms")
          if (game.custom.Amount_Of_Players_Per_Team[game.ships[random].custom.team] < game.custom.MaxPlayers/2) {
            game.ships[random].custom.waiting = true;
          }
        }
        for (let ship of game.ships) {
          If_Player_Can_Play(ship);
        }
        game.custom.Seconds = 19;
        game.custom.Phase = "Waiting";
      }
      components.timer.components[0].position = [0,-20,100,100];
      components.timer.components[1].position = [10,5,80,80];
      components.timer.components[0].value = `TEAM SELECTION IN ${game.custom.Seconds}s`;
      components.timer.components[1].value = "";
      game.setUIComponent(components.timer);
    }
  }

var All_Game_Phases = [
    // "Ppl",
    "Waiting",
    "Map Reducing",
    "Round End"
];
var Fonction_Per_Stage = {
    "Ppl": function(n) { return n*n },
    "Waiting": function(n) { return n*2 },
}
var Change_Phase = function() {
    (All_Game_Phases.indexOf(/*game.custom.*/Phase) != All_Game_Phases.length-1) ? 
        /*game.custom.*/Phase = All_Game_Phases[All_Game_Phases.indexOf(/*game.custom.*/Phase)+1] : 
        /*game.custom.*/Phase = All_Game_Phases[0];
}
var Timer__Count__ = function(/*game*/) {
    /*game.custom.*/Seconds--;
    if (!/*game.custom.*/Game_Running) {

    }
    if (/*game.custom.*/Seconds === 0) Change_Phase();
}
