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
    })

    .constant('INSPECTION_OUTCOMES', {
        'CANCELLED': 1,
        'CANCELLED_WITH_TRIP_CHARGE': 2,
        'RESCHEDULE_WITH_TRIP_CHARGE': 3,
        'RESCHEDULE': 4,
        'ALLSTATE_ALACRITY_LADDER_ASSIST': 5,
        'ALLSTATE_NCT_LADDER_ASSIST': 6,
        'LADDER_ASSIST': 7,
        'LADDER_ASSIST_WITH_REPORT': 8,
        'EXPERT_INSPECTION': 8
    });
    
})();