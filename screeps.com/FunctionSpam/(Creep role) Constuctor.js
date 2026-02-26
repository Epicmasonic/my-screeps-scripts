var creepResource = require('(Creep actions) Resource');
var creepMemory = require('(Creep actions) Memory');

module.exports = {
	run: function(creep) {
		if ((creep.memory.action != "Mine Energy" && creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) || (creep.memory.action == "Mine Energy" && creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0)) {
		// Mine Energy
			creepMemory.changeAction(creep, "Mine Energy", "⛏️⚡", false)
			creepResource.extractEnergy(creep)
		}
		else {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES)
			var badGuys = creep.room.find(FIND_HOSTILE_CREEPS)

			if (targets.length > 0 && badGuys.length == 0) {
				creepMemory.changeAction(creep, "Build", "⚡🏗️", false)
				let closestTarget = creep.pos.findClosestByPath(targets)
				creepResource.buildStructure(creep, closestTarget)
			}
			else {
				var targets = creep.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_TOWER }})
				creepMemory.changeAction(creep, "Fuel Towers", "⚡🏹", false)
				let closestTarget = creep.pos.findClosestByPath(targets)
				creepResource.fuelStructure(creep, closestTarget)
			}
		}
	}
};