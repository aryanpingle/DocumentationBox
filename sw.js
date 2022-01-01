const print = (...message) => DEBUG?console.log(...message):0
const VERSION_NUMBER = 1.30
const CACHE_NAME = `v${VERSION_NUMBER.toFixed(2)}`
const CACHE_FILES = ["/", "/index.html", "/index.css", "/index.js", "/images/copy.png", "/images/logo.png"]
var DEBUG = true

// Don't forget to run the python file to add to cache

self.addEventListener("install", async event => {
    print("Service Worker Installed")
    // Initialize CURRENT_CACHE
    let cache = await caches.open(CACHE_NAME)
    // Add files to cache
    cache.addAll(CACHE_FILES).then(self.skipWaiting())
})

self.addEventListener("activate", async event => {
    print("Service Worker Activated")
    // Delete obsolete versions
    let cache_names = await caches.keys()
    cache_names.filter(cache_name => cache_name != CACHE_NAME).forEach(cache_name => {
        print(`%cDeleting obsolete cache: ${cache_name}`, "background-color: rgb(255, 128, 128); color: black;")
        caches.delete(cache_name)
    })
})

self.addEventListener("fetch", event => {
    event.respondWith(get_request(event))
})

async function get_request(request_event) {
    let request = request_event.request
    let url = request_event.request

    return fetch(request).catch(err => caches.match(request, {cacheName: CACHE_NAME}))
}