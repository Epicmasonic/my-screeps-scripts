var creepResource = require('(Creep actions) Resource');
var creepMemory = require('(Creep actions) Memory');

module.exports = {
	run: function(creep) {
		if ((creep.memory.action != "Mine Energy" && creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) || (creep.memory.action == "Mine Energy" && creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0)) {
		// Mine Energy
			creepMemory.changeAction(creep, "Mine Energy", "⛏️⚡", false)
			creepResource.extractSource(creep)
		}
		else {
			var targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
				    	return (structure.structureType == STRUCTURE_EXTENSION ||
						structure.structureType == STRUCTURE_SPAWN) &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
					}
				}
			)

			if (targets.length > 0) {
				creepMemory.changeAction(creep, "Fuel Spawn", "⚡🏠", false)
				let closestTarget = creep.pos.findClosestByPath(targets)
				creepResource.fuelStructure(creep, closestTarget)
			}
			else {
				creepMemory.changeAction(creep, "Fuel Room", "⚡🧠", false)
				creepResource.fuelRoom(creep)
			}
		}
	}
};