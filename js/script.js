// Define click button action
$('#form-search button').on('click', function (e) {
  // disabled default button function
  e.preventDefault()

  // save input search value in a 'beerBrand' variable
  var beerBrand = $('#form-search input').val()

  // save URL value in a 'urlSearchBeers' variable. Add variable 'beerBrand' for made dynamic URL
  var urlSearchBeers = 'https://quiet-inlet-67115.herokuapp.com/api/search/all?q=' + beerBrand
  // console.log(urlSearchBeers)

  // AJAX call to dynamic URL
  $.ajax({
    url: urlSearchBeers
  })

  // Function 'aBeers' get me an array of objects from 'urlSearchBeers'
  .then(function (aBeers) {
	  // console.log(aBeers)

	  // With map() get new array from 'urlSearchBeers' info and save in 'beerSelected' variable
	  var beerSelected = aBeers.map(function (oBeer) {
	  // console.log('beer name > 'oBeer.name + '|| beer id > ' oBeer.id)

	  	// Get the name of beers selected from new array. Put it between a tag 'option' with id value for the next step
	  	 return '<option value="' + oBeer.id + '">' + oBeer.name + '</option>'
	  })
	  // console.log(beerSelected)

    // Add the beer's selected with tag 'option' using 'html()' method in a 'select#brandSelect'. Previously we join al the 'options' in a string using 'join()' method
    $('#brandSelect').html(beerSelected.join(''))
  })
})

// with 'on change' detect if 'select#brandSelect' has changed
$('#brandSelect').on('change', function () {
  // The current value has been changed from 'select#brandSelect' is declared in the variable 'subBrandId'
  var subBrandId = $(this).val()
  // console.log(subBrandId)

  // The current value of 'select#brandSelect' is added to URL of new API URL
  var urlSubBrandId = 'https://quiet-inlet-67115.herokuapp.com/api/beer/' + subBrandId
  // console.log(urlSubBrandId)

  // call this URL with AJAX
  $.ajax({
    url: urlSubBrandId
  })

  // Get data from API URL pass like parameter on the next function
  .then(function (oSubBeer) {
  	 // console.log(oSubBeer)

  	 // create a empty container to keep the specific data from API URL
  	 var subBeerContent = ''

  	 // Data name has declared in a 'titleBeerSelected' variable between h1 tag
  	 var titleBeerSelected = '<h1>' + oSubBeer.name + '</h1>'

  	 // Data description has declared in a 'descriptionBeerSelected' variable between h3 tag
  	 var descriptionBeerSelected = '<h3>' + oSubBeer.style.description + '</h3>'
  	 // Data picture has declared in a 'imgBeerSelected' variable between img tag
  	 var imgBeerSelected = '<img src="' + oSubBeer.labels.medium + '" />'

  	// Fill up the empty container 'subBeerContent' with the variable data
    subBeerContent += titleBeerSelected
    subBeerContent += descriptionBeerSelected
    subBeerContent += imgBeerSelected

    // Previously we've created a empty div with id '#infoBeerSelected' in our html file and it has been modificated with method html() and fill up with our variable 'subBeerContent' with title,description and url image data
  	$('#infoBeerSelected').html(subBeerContent)
  })
})
