
var keys = {};
var Players_Playing = [[],[]];
var Waiting_Players = [];
const MaxP = 2;
var echo = function(stuff) {console.log(stuff);}

var Return_Keys_Values = function(value, fromParameter, optionnal) {
    for (let key in keys) {
        if (keys[key][fromParameter] === optionnal) {
            return keys[key][value];
        }
    }
    return null;
};

var Generate_Key = function(New = true, Player_Id, length = 11, team, name) {
    if (New) {
        Object.assign(keys, {
            [Object.keys(keys).length]  : {Id: Player_Id,Ship_Key : [],Team: team, Name: name}
        })
        let alphabet = [
            "a","b","c","d","e","f","g","h","i","j","k","l","n","m","o","p","q","r","s","t","u","v","w","x","y","z",
            1,2,3,4,5,6,7,8,9
        ]
        for (let i = 0; i < length; i++) {
            for (let key in keys) {
                if (keys[key].Id === Player_Id) {
                    var random = Math.floor(Math.random() * 35);
                    var random_2 = Math.floor(Math.random() * 2)
                    Number.isInteger(alphabet[random]) ? keys[key].Ship_Key.push(`${alphabet[random]}`) : (random_2 === 0 ? keys[key].Ship_Key.push(alphabet[random]) : keys[key].Ship_Key.push(alphabet[random].toUpperCase()));
                }
            }
        }
        keys[Object.keys(keys).length-1].Ship_Key = keys[Object.keys(keys).length-1].Ship_Key.join('');
        for (let key in keys) {
            if (keys[key].Ship_Key == keys[Object.keys(keys).length-1].Ship_Key && key != Object.keys(keys).length-1) {
                Generate_Key(New,Player_Id,length);
            }
        }
        return keys[Object.keys(keys).length-1].Ship_Key;
    } else {
        for (let key in keys) {
            if (parseInt(key) === Player_Id) {
                for (let key_ in keys) {
                    if (key_ != 0) {
                        keys[`${key_-1}`] = keys[`${key_}`];
                        delete keys[`${key_}`];
                    }
                }
            }
        }
    }
};

var Simulate_On_Click = function(click, playerId) {
    if (click) {
        let keyIn = false;
        let Key;
        for (let key in keys) if (keys[key].Id == playerId) Key = keys[key].Ship_Key; for (let key_ in Waiting_Players)  if (Waiting_Players[key_] == Key) return;
        for (let key in keys) {
            if (keys[key].Id == playerId) {
                keyIn = true;
                Key = keys[key].Ship_Key;
            }
        }
        if (!keyIn) Key = Generate_Key(true,playerId,11, "test");
        Waiting_Players.push(Key);
    } else if (!click) {
        for (let key in keys) {
            if (keys[key].Id === playerId) {
                for (let Allow_Keys in Waiting_Players) {
                    if (Waiting_Players[Allow_Keys] == keys[key].Ship_Key) {
                        Waiting_Players.splice(Allow_Keys,1);
                    }
                }
            }
        }
    }
}


// Ship Init : 3 ships enters the game
Generate_Key(true,0,11,1, "DSE"); // Team 0
Generate_Key(true,1,11,1, "Glitch"); // Team 1
Generate_Key(true,2,11,0, "Wolfan"); // Team 0

// Generate_Key(New = true, Player_Id, length = 11, team, name);
// Simulate_On_Click(click, playerId);
// 3 Ships choose to wait:
Simulate_On_Click(true,2);
Simulate_On_Click(true,0);
Simulate_On_Click(false,0);
Simulate_On_Click(true,1)

console.log(keys, "\nShips waiting custom IDs: ", Waiting_Players.join(', '));

// If enough players waiting:
var exclude = [];
Waiting_Players.forEach(id => {
    var Name = Return_Keys_Values("Name","Ship_Key",id);
    var ID = Return_Keys_Values("Id","Ship_Key",id);
    var Team = Return_Keys_Values("Team","Ship_Key",id);

    console.log("Waiting ship:\nShip name: ", Name,", Ship ID: ", ID, ", Ship Team: ", Team);

    if (Players_Playing[Team].length < MaxP/2 ) {
        if (!exclude.includes(id)) {
            console.log("Added to team N°",Team );
            Players_Playing[Team].push(id);
            exclude.push(id);
        }
    }
})
exclude.forEach(key => Waiting_Players.splice(Waiting_Players.indexOf(key),1));
exclude = [];

for (let customKey in Players_Playing) {
    let Name = Return_Keys_Values("Name","Ship_Key",Players_Playing[customKey][0]);
    let Team = Return_Keys_Values("Team","Ship_Key",Players_Playing[customKey][0]);
    console.log(
        "Players allowed (IDs) to play:\n",
        Name, '<- Team ', Team, "\n"
    );
}
