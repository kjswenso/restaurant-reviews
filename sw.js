/* Referenced:
 * https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
 * and 
 * Udacity Introducing the Service Worker 16 & 17
 */

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
    caches.open('restaurantV1').then(function(cache) {
      return cache.addAll(cachedItems);
    })
  );
});

/* Referenced Udacity Introducing the Service Worker 18 & 19
 * and 
 * https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/
 * to help with the cloned response
 */

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) {
				return response;
			}
			else {
				return fetch(event.request)
				.then(function(response){
					const clonedResponse = response.clone();
					caches.open('restaurantV1').then(function(cache) {
						cache.put(event.request, clonedResponse);
					})
					return response;
				})
				.catch(function(err) {
					console.error(err);
				});
			}
		})
	);
});