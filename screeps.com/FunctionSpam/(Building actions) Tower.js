function findWeakest(tower, targets) {
	let highScore = 0;
	let weakestTargets = [];

	for (var target of targets) {
		let score = target.hitsMax - target.hits;

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
			if (structure.hits < structure.hitsMax) {
				needHealing = true;
				break;
			}
		}

		if (needHealing) {
			tower.repair(findWeakest(tower, structures));
		}
	}
};