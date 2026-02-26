module.exports = {
	extractSource: function(creep) {
		source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
		if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
			creep.moveTo(source);
		}
	},
	extractEnergy: function(creep) {
		let targets = creep.room.find(FIND_SOURCES_ACTIVE);
		targets.concat(creep.room.find(FIND_RUINS, {
				filter: (ruin) => {
						return ruin.store.getUsedCapacity() > 0;
					}
				}
			)
		);

		let target = creep.pos.findClosestByPath(targets);
		if (target) {
			if (target instanceof Source) {
				if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			} else {
				console.log('That code works! :D');
				if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(target);
				}
			}
		}
	},
	fuelStructure: function(creep, structure) {
		if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(structure);
		}
	},
	buildStructure: function(creep, structure) {
		if (creep.build(structure) == ERR_NOT_IN_RANGE) {
			creep.moveTo(structure);
		}
	},
	fuelRoom: function(creep) {
		if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
			creep.moveTo(creep.room.controller);
		}
	}
};