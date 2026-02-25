const harvestBody = [MOVE,MOVE,WORK,CARRY,MOVE]
const constructBody = [WORK,WORK,CARRY,MOVE]

// Create a build order
var buildOrder = ['Harvest','Construct'];

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

buildOrder.push('Construct');

module.exports = {
	/** @param {Creep} creep **/
	run: function(spawn) {
		// Display the build order
		buildOrderText = 'Planned Build Order: ';
	    for (let i in buildOrder) {
			switch (buildOrder[i]) {
				case 'Harvest':
					buildOrderText += '⛏️';
					break;
				case 'Construct':
					buildOrderText += '🛠️';
					break;
			}
	    }
		spawn.room.visual.text(
			buildOrderText,
			-0.25, 
			3.25, 
			{align: 'left', opacity: 0.8});

		// Display the current energy
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

		// Find what role is up next
		let harvestersMade = _.filter(Game.creeps, (creep) => creep.memory.role == 'Harvest').length;
		let harvestersWanted = 0;
		let constructorsMade = _.filter(Game.creeps, (creep) => creep.memory.role == 'Construct').length;
		let constructorsWanted = 0;

		let upNext = '';
		let loops = 0;
		buildLoop: for (let role of buildOrder) {
			switch (role) {
				case 'Harvest':
					harvestersWanted += 1;
					if (harvestersMade < harvestersWanted) {
						upNext = role;
						break buildLoop;
					}
					break;
				case 'Construct':
					constructorsWanted += 1;
					if (constructorsMade < constructorsWanted) {
						upNext = role;
						break buildLoop;
					}
					break;
				}
			loops++;
		}
		
		// Display what roles are still needed
		upNextText = '';
		switch (buildOrder[loops]) {
			case 'Harvest':
				upNextText += '⛏️';
				break;
			case 'Construct':
				upNextText += '🛠️';
				break;
		}
		if (upNextText == '') {
			upNextText = 'Up Next: None';
		} else {
			upNextText = 'Up Next: ' + upNextText + ' +' + (harvestersWanted - harvestersMade + constructorsWanted - constructorsMade - 1);
		}
				
		spawn.room.visual.text(
			upNextText,
			-0.25, 
			4.25, 
			{align: 'left', opacity: 0.8});

		// Actually spawn the creeps
		if (!spawn.spawning && totalEnergyOwned >= 300) {
			let escape = true;
			let number = 1;
			for (let name in Game.creeps) {
				if (name == upNext + '_' + number) {
					escape = false;
					number++;
				}
				if (escape) {
					break;
				}
			}

			let body = [];
			switch (upNext) {
				case 'Harvest':
					body = harvestBody;
					break;
				case 'Construct':
					body = constructBody;
					break;
			}

			spawn.spawnCreep(body, upNext + '_' + number, {memory: {role: upNext}});
		}
	}
};