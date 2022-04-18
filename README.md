# Starblast Team Fights Mod

# Mod particularities:
• It is a 6v6 utilizing the vanilla T6 ship tree.  
• You start off by joining a team, either red or blue.  
• Each team will pick a T6 at the start, with only 20 seconds to decide.  
• You will then fight with your team vs another in an open arena. The arena will start to shrink after 60 seconds if the fight is not concluded.  
• If you are killed, you cannot respawn during that round and will be taken to a spectate.  
• If your team wins, they will that round and you will be taken back to the ship selection screen to pick again.  
• You can only pick one ship per game. So if you used Scorpion, for example, in your 1st round - It is now locked for the rest of the game.  
• There are a total of 7 rounds in the game, giving you the opportunity to use all but one ship in the T6 tree.  
• The team with the most won rounds will win the game!  

# What's the goal of this mod?
The goal of this mod is to encourage more team fights and strategically based ship choices. You go into the Arena with 5 other people and fight it out until one becomes the winner. With no restrictions such as asteroids, you are free to fight how you please and coordinate with others to achieve victory!

# Modifying game values:  
At the __top of the code__, you will find these lines:
```javascript
Object.assign(game.custom, 
    {
        MaxPlayers : 2,
        MaxRounds : 7,
        Last_Round : 1,
        round : 0,
        Points : [],
        Rounds_Winner : [],
        Phase : "Waiting",
        Map_Reducing_Phase : 3,
        Amount_Of_Players_Per_Team : [0,0],
        Amount_Of_Players_Waiting : [0,0],
        Max_Reducing : 10,
        Ready : false,
        Ship_Missing : 0,
        Seconds : 20,
        Game_Running : false,
        In_Game : false,
        Round_Initialization : false,
        Coordination : [0,0],
        Last_Seconds : 19
    }
);
```

Values you can modify to customize your game are:  
• `MaxPlayers` : Number of players for a round (2 players means a 1vs1 game, 4 players means a 2vs2 game, etc).  
• `MaxRounds` : Maximum amount of rounds.  
• `Max_Reducing` : This number tells how many time you want the arena to shrink.  
• `Seconds` : Number of seconds until the first round start.  
• __Custom ships are not available to be used for the moment__ (U-Series tiers, Nautic tiers, DTM tiers, Alien Intrusion tiers).  

# Credits:
• Naflouille / Naf / Wolfan for the mod code and development.  
• Glitch & Koromgo for the mod idea.  
• Thanks to all the testers, contributors, etc!  

# Mod code:
**No code available for the moment**.  
You might want to join the [Discord Server](https://discord.gg/Q5RTE3GF9Y) of the mod. Stay tuned to news, polls, and soon, codes launch!  
**Some codes, tho:**  
• [Custom key generator](https://github.com/W0lfan/Starblast-Team-Fights/blob/main/Codes%20snippets/Key%20Generator.js)  
• [Game scoreboard code](https://github.com/W0lfan/Starblast-Team-Fights/blob/main/Codes%20snippets/Scoreboard.js)  
• [Code to get ships names](https://github.com/W0lfan/Starblast-Team-Fights/blob/main/Codes%20snippets/Ships_Names.js)  

