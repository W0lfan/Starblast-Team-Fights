
var keys = {};
var Players_Playing = [[],[]];
var Waiting_Players = [];
const Max = 2;

var Return_Keys_Values = function(value, fromParameter, optionnal) {
    for (let key in keys) {
        if (keys[key][fromParameter] === optionnal) {
            return keys[key][value];
        }
    }
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

var Waiting_Filter = function(id) {
    let Key = Return_Keys_Values("Ship_Key","Id",id);
    let Team = Return_Keys_Values("Team","Id",id);
    if (Players_Playing[Team].length < Max/2 && !Players_Playing[Team].join('').includes(Key)) {
        //console.log('Allowed ship!\nShip with custom key "',Key,'" allowed to play on team ', Team);
        Players_Playing[Team].push(Key);
        Waiting_Players.splice(Waiting_Players.indexOf(Key),1);
    }
};
// Ship Init : 3 ships enters the game
Generate_Key(true,0,11,0, "DSE"); // Team 0
Generate_Key(true,1,11,1, "Glitch"); // Team 1
Generate_Key(true,2,11,0, "Wolfan"); // Team 0
// 3 Ships choose to wait:
Simulate_On_Click(true,1);
Simulate_On_Click(true,0);
Simulate_On_Click(true,2);

console.log(keys, "Ships waiting custom IDs: ", Waiting_Players.join(', '));
var echo = function(stuff) {console.log(stuff);}
// If enough players waiting:
Waiting_Players.forEach(id => {
    console.log(Return_Keys_Values("Name","Ship_Key",id))
})
//if (Waiting_Players.length >= Max) {
    Waiting_Players.forEach(key => {
        let ID = Return_Keys_Values("Id","Ship_Key",key);
        let Team = Return_Keys_Values("Team","Ship_Key",key);
        let Name = Return_Keys_Values("Name","Ship_Key",key);
        echo(Name)
        if (Players_Playing[Team].length < Max/2 ) {
            Waiting_Filter(ID);
        }
    })
//}
for (let customKey in Players_Playing) {
    let Name = Return_Keys_Values("Name","Ship_Key",Players_Playing[customKey][0]);
    let Team = Return_Keys_Values("Team","Ship_Key",Players_Playing[customKey][0]);
    console.log(
        "Players allowed (IDs) to play:\n",
        Name, '<- Team ', Team, "\n"
    )
}





