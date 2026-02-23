var creepResource = require('(Creep actions) Resource');
var creepMemory = require('(Creep actions) Memory');

module.exports = {
    run: function(creep) {
	    if ((creep.memory.action != "Mine Energy" && creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) || (creep.memory.action == "Mine Energy" && creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0)) {
            // Mine Energy
            creepMemory.changeAction(creep, "Mine Energy", "⛏️⚡", false)
            creepResource.extractSource(creep)
        }
        else if (Game.spawns['Spawn1'].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            creepMemory.changeAction(creep, "Fuel Spawn", "⚡🏠", false)
            creepResource.fuelStructure(creep, Game.spawns['Spawn1'])
        }
        else {
            creepMemory.changeAction(creep, "Fuel Room", "⚡🧠", false)
            creepResource.fuelRoom(creep)
        }
	}
};