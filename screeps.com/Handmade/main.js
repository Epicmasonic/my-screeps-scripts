const harvester = require('role.harvester');
const summon = require('method.spawn');

module.exports.loop = function () {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'Harvest'){
            harvester.think(creep);
        }
    }
    
    for(var name in Game.spawns) {
        var spawn = Game.spawns[name];
        summon.run(spawn);
    }
}