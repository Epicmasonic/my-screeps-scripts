const harvester = require('(Creep role) Harvester');
const constructor = require('(Creep role) Constuctor');

const summon = require('(Building actions) Spawn');
const icon = require('(Building actions) Spawn Icons');

const target = require('(Building actions) Tower');

module.exports.loop = function () {
	if (Game.cpu.bucket >= 10000) {
		Game.cpu.generatePixel();
	}
	
	for (var name in Memory.creeps) {
		if(!Game.creeps[name]) {
			delete Memory.creeps[name];
			console.log('Clearing non-existing creep memory:', name);
		}
	}

	for (var name in Game.creeps) {
		var creep = Game.creeps[name];
		switch (creep.memory.role) {
			case 'Harvest':
				harvester.run(creep);
				break;
			case 'Construct':
				constructor.run(creep);
				break;
		}
	}
	
	for (var name in Game.spawns) {
		var spawn = Game.spawns[name];
		
		new RoomVisual(spawn.room.name).text('Pixel Progress: ' + Game.cpu.bucket / 100 + '%', -0.25, 0.25, {align: 'left'});
		new RoomVisual(spawn.room.name).text('Room Progress: ' + Math.round(spawn.room.controller.progress / spawn.room.controller.progressTotal * 10000) / 100 + '%', -0.25, 1.25, {align: 'left'});
		
		summon.run(spawn);
		
		if (spawn.spawning) {
			icon.run(spawn);
		}
	}
	
	for (var name in Game.rooms) {
		var room = Game.rooms[name];

		var structures = room.find(FIND_STRUCTURES, { filter: (structure) => structure.hits < structure.hitsMax })
		var goodGuys = room.find(FIND_MY_CREEPS)
		var badGuys = room.find(FIND_HOSTILE_CREEPS)
			
		for (var tower of room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_TOWER }})) {
			target.run(tower, structures, goodGuys, badGuys);
		}
	}
}
