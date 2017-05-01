angular.module('app.venue', ['app.config'])
    .service('venueFormResource', ['$http', 'config', VenueFormResource])
    .service('venueResource', ['$http', 'config', VenueResource]);
