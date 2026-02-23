/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('method.spawn');
 * mod.thing == 'a thing'; // true
 */

let number = 1;
let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'Harvest');
const maxHarvesters = 3;

var summon = {
    /** @param {Creep} creep **/
    run: function(spawn) {
        if (!spawn.Spawning && spawn.store[RESOURCE_ENERGY] >= 200 && harvesters.length < maxHarvesters) {
            let escape;
            while (true) {
                escape = true;
                for (var name in Game.creeps) {
                    if (name == 'Harvest' + number) {
                        escape = false;
                        number++;
                    }
                }
                if (escape) {
                    break;
                }
            }
            
            spawn.spawnCreep([MOVE,WORK,CARRY,MOVE], 'Harvest' + number, {memory: {role: 'Harvest'}});
            console.log(spawn.name + ": I'm spawning a Harvester (Harvest" + number + ")");
        }
	}
};

module.exports = summon;