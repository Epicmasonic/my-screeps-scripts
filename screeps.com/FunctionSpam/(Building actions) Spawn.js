const harvestBody = [MOVE,MOVE,WORK,CARRY,MOVE]

var buildOrder = ['Harvest'];

for (let spawn in Game.spawns) {
	spawn = Game.spawns[spawn];

	for (let source of spawn.room.find(FIND_SOURCES)) {
		for (let x = source.pos.x - 1; x <= source.pos.x + 1; x++) {
			for (let y = source.pos.y - 1; y <= source.pos.y + 1; y++) {
				if (x == source.pos.x && y == source.pos.y) {
					continue;
				}
				if (spawn.room.getTerrain().get(x, y) != TERRAIN_MASK_WALL) {
					buildOrder.push('Harvest');
				}
			}
		}
	}
}

module.exports = {
	/** @param {Creep} creep **/
	run: function(spawn) {
		/*
	    for (let i in buildOrder) {
			if (buildOrder[i] == 'Harvest') {
				spawn.room.visual.text(
					'⛏️',
					i, 
					2.25, 
					{opacity: 0.8});
				console.log('Harvest ' + i);
			}
	    }
		*/

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
			
			for (let role of buildOrder) {
				switch (role) {
					case 'Harvest':
						harvestersWanted += 1;
						if (harvestersMade < harvestersWanted) {
							let escape = true;
							let number = 1;
							for (let name in Game.creeps) {
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