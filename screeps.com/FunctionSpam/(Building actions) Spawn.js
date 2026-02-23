const maxHarvesters = 4;

module.exports = {
	/** @param {Creep} creep **/
	run: function(spawn) {
		let number = 1;
		let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'Harvest');

		/*
		console.log();
		console.log(harvesters);
		console.log(harvesters.length);
		console.log(!spawn.Spawning);
		console.log(spawn.store[RESOURCE_ENERGY] >= 300);
		console.log(harvesters.length < maxHarvesters);
		console.log(!spawn.Spawning && spawn.store[RESOURCE_ENERGY] >= 300 && harvesters.length < maxHarvesters);
		*/
		
		if (!spawn.spawning && spawn.store[RESOURCE_ENERGY] >= 300 && harvesters.length < maxHarvesters) {
			let escape;
			while (true) {
				escape = true;
				for (var name in Game.creeps) {
					if (name == 'Harvest_' + number) {
						escape = false;
						number++;
					}
				}
				if (escape) {
					break;
				}
			}
			
			spawn.spawnCreep([MOVE,MOVE,WORK,CARRY,MOVE], 'Harvest_' + number, {memory: {role: 'Harvest'}});
		}
	}
};