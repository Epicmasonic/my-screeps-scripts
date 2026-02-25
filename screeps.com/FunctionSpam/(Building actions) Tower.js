const wallMaxHits = 150000;

function findWeakest(tower, targets) {
	let highScore = 0;
	let weakestTargets = [];

	for (var target of targets) {
		let maxHits = target.hitsMax;
		if (target.structureType == STRUCTURE_WALL) {
			maxHits = Math.min(maxHits, wallMaxHits);
		}

		let score = maxHits - target.hits;

		if (score > highScore) {
			highScore = score;
			weakestTargets = [];
		}
		if (score == highScore) {
			weakestTargets.push(target);
		}
	}
	
	return tower.pos.findClosestByRange(weakestTargets);
}

module.exports = {
	run: function(tower, structures, goodGuys, badGuys) {
		if (badGuys.length) {
			tower.attack(tower.pos.findClosestByRange(badGuys));
			return;
		}

		needHealing = false;
		for (var goodGuy of goodGuys) {
			if (goodGuy.hits < goodGuy.hitsMax) {
				needHealing = true;
				break;
			}
		}
		if (needHealing) {
			tower.heal(findWeakest(tower, goodGuys));
			return;
		}

		needHealing = false;
		for (var structure of structures) {
			let maxHits = structure.hitsMax;
			if (structure.structureType == STRUCTURE_WALL) {
				maxHits = Math.min(maxHits, wallMaxHits);
			}

			if (structure.hits < maxHits) {
				needHealing = true;
				break;
			}
		}

		if (needHealing) {
			tower.repair(findWeakest(tower, structures));
		}
	}
};