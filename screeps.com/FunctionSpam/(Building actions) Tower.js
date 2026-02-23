/*
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
		} else if (goodGuys.length) {
			tower.heal(findWeakest(tower, goodGuys));
		} else if (structures.length) {
			tower.repair(findWeakest(tower, structures));
		} 
	}
};
*/