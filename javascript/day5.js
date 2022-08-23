function fivechance() {
	let chance = 0
	return function () {
		chance += 1
		if (chance <= 5) {
			console.log("Congrats you earn the chance!")
		} else {
			console.log("Sorry you missed the chance")
		}
	}
}

function longerThan(minlength){
	return (elem) =>{
		return (elem.length > minlength)
	}
}