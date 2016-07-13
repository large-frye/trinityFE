(function() {
    'use strict';

    angular.module('trinity.shared.constants', [])
    
    .constant('FORM', {
        'SAVE_LENGTH': 1000 // ms
    })
    
    .constant('RESOURCE_TYPES', {
        'RESOURCE': 'resource',
        'TRAINING_MATERIAL': 'trainingMaterial',
        'TRAINING_VIDEO': 'trainingVideo',
        'OTHER': 'other'
    });
    
})();