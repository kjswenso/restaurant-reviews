/* Referenced:
 * https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 * and 
 * Udacity Introducing the Service Worker 16
 */

const cacheName = "restaurantV1"
const cachedItems = [
	'/',
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'css/responsive.css',
	'js/main.js',
	'js/restaurant_info.js',
	'js/dbhelper.js',
	'img/1.jpg',
	'img/2.jpg',
	'img/3.jpg',
	'img/4.jpg',
	'img/5.jpg',
	'img/6.jpg',
	'img/7.jpg',
	'img/8.jpg',
	'img/9.jpg',
	'img/10.jpg',
	'/data/restaurants.json'
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('restaurantv1').then(function(cache) {
      return cache.addAll(cachedItems);
    })
  );
  console.log('cached!');	
});

/*self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll([
        	'/'
        	]);
      })
  );
});*/