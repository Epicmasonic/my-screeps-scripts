const harvestBody = [MOVE,MOVE,WORK,CARRY,MOVE]

var buildOrder = ['Harvest','Harvest','Harvest','Harvest'];

module.exports = {
	/** @param {Creep} creep **/
	run: function(spawn) {
		totalEnergyOwned = spawn.store[RESOURCE_ENERGY];
		totalEnergyCapacity = spawn.store.getCapacity(RESOURCE_ENERGY);
		for (var name of spawn.room.find(FIND_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_EXTENSION })) {
			totalEnergyOwned += name.store[RESOURCE_ENERGY];
			totalEnergyCapacity += name.store.getCapacity(RESOURCE_ENERGY);
		}

		spawn.room.visual.text(
				totalEnergyOwned + '/' + totalEnergyCapacity,
				spawn.pos.x, 
				spawn.pos.y + 1.25, 
				{opacity: 0.8});

		if (!spawn.spawning && totalEnergyOwned >= 300) {
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