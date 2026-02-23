module.exports = {
	extractSource: function(creep) {
		source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
		if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
			creep.moveTo(source);
		}
	},
	fuelStructure: function(creep, structure) {
		if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(structure);
		}
	},
	fuelRoom: function(creep) {
		if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
			creep.moveTo(creep.room.controller);
		}
	}
};