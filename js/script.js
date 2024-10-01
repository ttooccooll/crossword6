(function($) {
	$(function() {
		// provide crossword entries in an array of objects like the following example
		// Position refers to the numerical order of an entry. Each position can have 
		// two entries: an across entry and a down entry
		var puzzleData = [
			 	{
					clue: "Many a UFO sighting turn out to be this.",
					answer: "uas",
					position: 1,
					orientation: "across",
					startx: 1,
					starty: 1
				},
			 	{
					clue: "Raden Jacob Salatun, the founder of Indonesia's space institute, described encounters with UFOs during his time in the military while serving at this large, populated island.",
					answer: "java",
					position: 2,
					orientation: "across",
					startx: 5,
					starty: 1
				},
				{
					clue: "As a PSA, this is something that is far more likely to harm you in your sleep than any extraterrestial beings.",
					answer: "osa",
					position: 6,
					orientation: "across",
					startx: 3,
					starty: 2
				},
				{
					clue: "People in the military often times report UFO sightings while conducting _____. Ukrainian soldiers doing this reported one just this year.",
					answer: "recon",
					position: 8,
					orientation: "across",
					startx: 8,
					starty: 2
				},
				{
					clue: "The most famous ruler of this city/state has been accused of being an 'ancient astronaut'.",
					answer: "palenque",
					position: 9,
					orientation: "across",
					startx: 1,
					starty: 3
				},
				{
					clue: "One account of the roswell incident describes the craft having wings like this flying mammal.",
					answer: "bat",
					position: 12,
					orientation: "across",
					startx: 2,
					starty: 4
				},
				{
					clue: "Whether you call them UFOs or UAPs, that middle initial means that they're always this.",
					answer: "aloft",
					position: 13,
					orientation: "across",
					startx: 8,
					starty: 4
				},
				{
					clue: "This physicist is actually more famous for a paradox he theorized about aliens which many think fiction author Cixin has a good explanation for.",
					answer: "enrico",
					position: 14,
					orientation: "across",
					startx: 1,
					starty: 5
				},
				{
					clue: "______ Men explores the possibility that the US government creates UFO folklore in order to distract people from its classified military development.",
					answer: "mirage",
					position: 15,
					orientation: "across",
					startx: 7,
					starty: 6
				},
				{
					clue: "Walker Air Force Base of the midwest",
					answer: "wrightpatt",
					position: 18,
					orientation: "across",
					startx: 3,
					starty: 8
				},
				{
					clue: "Little green men are always being accused of committing this crime.",
					answer: "abduction",
					position: 19,
					orientation: "across",
					startx: 1,
					starty: 10
				},
				{
					clue: "Some have hypothesized that aliens live in this belt in the outer solar system.",
					answer: "kuiper",
					position: 20,
					orientation: "across",
					startx: 1,
					starty: 12
				},
				{
					clue: "The CIA might be looking for aliens using remote viewing, which is another name for this.",
					answer: "esp",
					position: 21,
					orientation: "across",
					startx: 8,
					starty: 12
				},
				{
					clue: "This is the modern term for UFO.",
					answer: "uap",
					position: 1,
					orientation: "down",
					startx: 1,
					starty: 1
				},
				{
					clue: "One theory about interstellar travel involves using a _____ sail.",
					answer: "solar",
					position: 2,
					orientation: "down",
					startx: 3,
					starty: 1
				},
				{
					clue: "In Soviet Poland, ___ Wolski claimed to have had a wild alien encounter.",
					answer: "jan",
					position: 3,
					orientation: "down",
					startx: 5,
					starty: 1
				},
				{
					clue: "This infamous place is technically named Homey Airport.",
					answer: "areafiftyone",
					position: 4,
					orientation: "down",
					startx: 8,
					starty: 1
				},
				{
					clue: "WWII pilots from multiple countries reported encounters with these.",
					answer: "foofighters",
					position: 5,
					orientation: "down",
					startx: 11,
					starty: 1
				},
				{
					clue: "NASA has funded some of these studies, but there are others all over the globe.",
					answer: "seti",
					position: 7,
					orientation: "down",
					startx: 4,
					starty: 2
				},
				{
					clue: "<b>Thematic exception for the week (basically to make the puzzle come together):</b> This man introduced Saul and David.",
					answer: "abner",
					position: 10,
					orientation: "down",
					startx: 2,
					starty: 3
				},
				{
					clue: "This is every alien's favorite figure for a nice fall corn maze.",
					answer: "circle",
					position: 16,
					orientation: "down",
					startx: 5,
					starty: 7
				},
				{
					clue: "Expect the men in _____ after every good alien (or mothman) encounter.",
					answer: "black",
					position: 17,
					orientation: "down",
					startx: 1,
					starty: 8
				},
				{
					clue: "There has been more than one report of a ufo obstructing the use or testing of one of these.",
					answer: "wmd",
					position: 18,
					orientation: "down",
					startx: 3,
					starty: 8
				}
			] 
	
		$('#puzzle-wrapper').crossword(puzzleData);
		
	})
	
})(jQuery)

let toggleState = 0;
let usdPrice = null;
let blockHeight = null;
let satFee = null;

async function fetchPrice() {
	try {
		const response = await fetch('https://mempool.space/api/v1/prices');
		const data = await response.json();
		usdPrice = data.USD.toFixed();
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function fetchBlock() {
	try {
		const response = await fetch('https://blockchain.info/q/getblockcount');
		const data = await response.text();
		blockHeight = parseInt(data).toFixed(0);
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function fetchFee() {
	try {
		const response = await fetch('https://mempool.space/api/v1/fees/recommended');
		const data = await response.json();
		satFee = data.halfHourFee.toFixed();
		console.log(satFee);
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function togglePrice() {
	if (!usdPrice) {
		await fetchPrice();
	}
	if (!blockHeight) {
		await fetchBlock();
	}
	if (!satFee) {
		await fetchFee();
	}

	const button = document.querySelector('.onesat');
	switch (toggleState) {
		case 0:
			button.textContent = `${blockHeight}`;
			break;
		case 1:
			button.textContent = `${satFee} sat/vB`;
			break;
		case 2:
			button.textContent = `$${usdPrice}`;
			break;
		case 3:
			button.textContent = '1sat=1sat';
			break;
	}
	toggleState = (toggleState + 1) % 4;
}