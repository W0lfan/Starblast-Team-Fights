
var keys = {};
var Waiting_Players = [];
var Generate_Key = function(New = true, Player_Id, length = 11) {
    if (New) {
        Object.assign(keys, {
            [Object.keys(keys).length]  : {Id: Player_Id,Ship_Key : []}
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
                delete keys[key];
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
        if (!keyIn) Key = Generate_Key(true,playerId,11);
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
Simulate_On_Click(true, 0)
Simulate_On_Click(true, 1)
Simulate_On_Click(true, 2)
Simulate_On_Click(false,1)
Simulate_On_Click(true, 0)

console.log(keys, Waiting_Players)




