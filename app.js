var myApp = angular.module("myApp",['ngRoute','ngAnimate'])


myApp.config(function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'view/booklist.html',
		controller:'BookListCtrl'
	}).when('/books',{
		templateUrl:'view/booklist.html',
		controller:'BookListCtrl'
	}).when('/kart',{
		templateUrl:'view/kartlist.html',
		controller:'KartListCtrl'
	}).otherwise({
		redirectTo:'/books'
	})
})


myApp.factory("bookService",function(){
	var books = [{
		imgUrl: "adultery.jpeg",
		name: "Adultery",
		price: 205,
		rating: 4,
		binding: "Paperback",
		publisher: "Random House India",
		releaseDate: "12-08-2014",
		addToKart:false,
		details: "Linda, in her thirties, begins to question the routine and predictability of her days. In everybodys eyes, she has a perfect life-happy marriage, children and a career. Yet what she feels is an eno... View More"
	},
	{
		imgUrl: "geronimo.jpeg",
		name: "Geronimo Stilton Spacemice#2 : You're Mine, Captain!",
		price: 168,
		rating: 5,
		addToKart:false,
		binding: "Paperback",
		publisher: "Scholastic",
		releaseDate: "01-07-2014",
		details: "Geronimo Stilton meets outer space in this cosmically fun spin-off series!Meet Geronimo StiltonixHe is a spacemouse - the Geronimo Stilton of a parallel universe! He is captain of the spaceship Mou... View More"
	},
	{
		imgUrl: "life-or-death.jpeg",
		name: "Life or Death",
		price: 339,
		rating: 4,
		addToKart:false,
		binding: "Paperback",
		publisher: "Hachette India",
		releaseDate: "01-04-2014",
		details: "Why would a man escape from prison the day before he's due to be released? Audie Palmer has spent a decade in prison for an armed robbery in which four people died, including two of his gang. Five... View More"
	},
	{
		imgUrl: "playing.jpeg",
		name: "Playing It My Way : My Autobiography",
		price: 599,
		rating: 5,
		addToKart:false,
		binding: "Hardcover",
		publisher: "Hodder & Stoughton",
		releaseDate: "01-08-2014",
		details: "I knew that if I agreed to write my story, I would have to be completely honest, as thats the way I have always played the game and that would mean talking about a number of things I have not addr... View More"
	},
	{
		imgUrl: "the-fault.jpeg",
		name: "The Fault in Our Stars",
		price: 227,
		addToKart:false,
		rating: 4.5,
		binding: "Paperback",
		publisher: "Penguin Books Ltd",
		releaseDate: "25-01-2013",
		details: "Despite the tumor-shrinking medical miracle that has bought her a few years, Hazel has never been anything but terminal, her final chapter inscribed upon diagnosis. But when a gorgeous plot twist n... View More"
	},
	{
		imgUrl: "wings-of-fire.jpeg",
		name: "Wings of Fire: An Autobiography",
		price: 124,
		rating: 5,
		addToKart:false,
		binding: "Paperback",
		publisher: "Universities Press",
		releaseDate: "25-08-2000",
		details: "Wings of Fire traces the life and times of India's former president A.P.J. Abdul Kalam. It gives a glimpse of his childhood as well as his growth as India's Missile Man. Summary of the Book Wings... View More"
	}];

	var kart = [];


	var service = {
		pushToKart: function pushToKart(book){
			var id = kart.indexOf(book);
			var book_index = books.indexOf(book);
			if(id == -1)
			{
				book.addToKart = true
				books[book_index].addToKart = true
				kart.push(book);
			}
		},
	
		pushToBook:function pushToBook(book){
			books.push(book);
		},
	
	
		getBooks:function getBooks(){
			return books;
		},
	
		getKart:function getKart(){
			return kart;
		},

		removeFromKart : function removeFromKart(book){
			var book_index = books.indexOf(book);
			var kart_index = kart.indexOf(book);
			book.addToKart = false
			books[book_index].addToKart = false
			kart.splice(kart_index,1);
		}
	}

	
	return service;
});

myApp.controller("HeaderCtrl", function($scope,$location) {
	
	$scope.appDetails = {
		title: "BooKart",
		tagline: "We have 1 million books for you"
	};

	$scope.nav = {}
	$scope.nav.isActive= function(path){
		if(path == $location.path()){
			return true;
		}

		return false;
	}


});

myApp.controller("BookListCtrl", function($scope, bookService) {
	$scope.books = bookService.getBooks();
	$scope.booksToDisplay = $scope.books;
	$scope.query = "";


	$scope.filter = function(){
		$scope.booksToDisplay = $scope.books.filter(x=> x.name.includes($scope.query))
	}
	
	$scope.addToKart = function(book) {
		bookService.pushToKart(book);
		var index = $scope.books.indexOf(book)
		$scope.books[index].addToKart = true
		console.log("add to kart: ", book);
	}

	$scope.removeFromKart = function(book){
		bookService.removeFromKart(book)
		var index = $scope.books.indexOf(book)
		$scope.books[index].addToKart = false
	}
});


myApp.controller("KartListCtrl",function($scope,bookService){
	$scope.kart = bookService.getKart();


	$scope.buy = function(book){
		bookService.removeFromKart(book)
		// var index = $scope.kart.indexOf(book)
		// $scope.kart.splice(index,1)
	}
})