var/*ship.custom.*/waiting = true;

var Enter = function() {
    var FillValues = [
        [   "SPECTATE TIME",
            "#B60C0A",
            "#B60C0A"],
        [   "I WANT TO PLAY",
            "#33C607",
            "#33C607"]
    ];
    JoinWaitingList.components[1].value = FillValues[Number(waiting)][0]; 
    JoinWaitingList.components[0].stroke = FillValues[Number(waiting)][1];
    JoinWaitingList.components[0].fill = FillValues[Number(waiting)][2];
    ship.setUIComponent(JoinWaitingList);
    // ship.setUIComponent(infos);
}
