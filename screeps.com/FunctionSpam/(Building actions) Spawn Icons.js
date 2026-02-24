module.exports = {
	run: function(spawn) {
		let role = spawn.spawning.name.split('_')[0];
		icon = '❓';
		switch (role) {
			case 'Harvest':
				icon = '⛏️';
				break;
			case 'Construct':
				icon = '🛠️';
				break;
		}

		spawn.room.visual.text(
			icon,
			spawn.pos.x, 
			spawn.pos.y + 0.25, 
			{opacity: 0.8});
	}
};