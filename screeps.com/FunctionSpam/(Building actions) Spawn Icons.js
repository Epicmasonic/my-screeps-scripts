const harvesterIcon = '⛏️';

module.exports = {
    run: function(spawn) {
        let role = spawn.spawning.name.split('_')[0];
        
        if (role == 'Harvest') {
            spawn.room.visual.text(
                harvesterIcon,
                spawn.pos.x, 
                spawn.pos.y + 0.25, 
                {opacity: 0.8});
        }
	}
};