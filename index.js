const youtubeApiEndpoint = "https://www.googleapis.com/youtube/v3/search"

// sudo code to help guide me along//

//function getDataFromApi(searchthing, callback)
	//make the query a const object so that we can pass it into json
	// jQuery $.getJSON(the endpoint, query object, and callback)

function getDataFromApi(searchThing, callback) {
	const query = {
		q: `${searchThing} in:name`,
		per_page: 5
	}
	$.getJSON(youtubeApiEndpoint, query, callback);
}

//function render results ();
	//return
	//html that we're going to overlay on the html
	//anchor taggs for hyperlinks of results
	//

function renderResults(result) {
	return `
		<div>
			<h2>
			a class="js-result-name" href="${result.html_url}" target="_blank">${result.name}</a> by <a class="js-user-name" href="${result.owner.html_url}" target="_blank">${result.owner.login}</a></h2>
		</div>
	`;
}

//function display the youtube search data(data) {
	//const for the results, pass results into an array
	// now a js tag so that it'll populate the div}

function displayYoutubeSearchData(data) {
	const results = data.items.map((item, index) => renderResult(item));
	$('js-search-results').html(results);
}

//function handel the submit button () {
	// set up a listner .submit (event => {
		//prevent default
		//const for query target 
		//const make it the value of whateveer we found
		//call the first function and pass in our new const//
		//and pass in the dispay function as an argument
//	})}

function watchSubmit() {
	$('js-search-form').submit(event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		const query = queryTarget.val();
		queryTarget.val("");
		getDataFromApi(query, displayYoutubeSearchData);
	});
}

//call to listen
$(watchSubmit);