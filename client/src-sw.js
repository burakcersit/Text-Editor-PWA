const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({// url path
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implementing asset caching
registerRoute(//call back request function
  ({ request }) => request.destination === 'image', //callback function
	new CacheFirst({
		cacheName: 'assets', //storage name is here
		plugins: [ //response with these headers to a maximum-age of 30 days
			new CacheableResponsePlugin({
				statuses: [0, 200],// status
			}),
			new ExpirationPlugin({
				maxEntries: 60,// entries for max
				maxAgeSeconds: 30 * 24 * 60 * 60,//entries for sec
			}),
		],
	})
);
