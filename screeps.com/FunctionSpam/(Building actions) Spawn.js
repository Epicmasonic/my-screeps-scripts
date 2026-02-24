const harvestBody = [MOVE,MOVE,WORK,CARRY,MOVE]

var buildOrder = ['Harvest','Harvest','Harvest','Harvest'];

module.exports = {
	/** @param {Creep} creep **/
	run: function(spawn) {
		if (!spawn.spawning && spawn.store[RESOURCE_ENERGY] >= 300) {
			let harvestersMade = _.filter(Game.creeps, (creep) => creep.memory.role == 'Harvest').length;
			let harvestersWanted = 0;
			
			for (var role of buildOrder) {
				switch (role) {
					case 'Harvest':
						harvestersWanted += 1;
						if (harvestersMade < harvestersWanted) {
							let escape = true;
							let number = 1;
							for (var name in Game.creeps) {
								if (name == 'Harvest_' + number) {
									escape = false;
									number++;
								}
								if (escape) {
									break;
								}
							}

							spawn.spawnCreep(harvestBody, 'Harvest_' + number, {memory: {role: role}});
							return;
						}
					}
			}
		}
	}
};