(function() {
'use strict';

    angular
        .module('trinity.shared.factories.form', [])
        .factory('formFactory', FormFactory);

    FormFactory.$inject = [];
    function FormFactory() {
        var service = {
            getFraudInput: getFraudInput,
            getRoofPeeledBack: getRoofPeeledBack,
            getHailInput: getHailInput,
            getCollateralDamages: getCollateralDamages,
            getMetalDamage: getMetalDamage,
            getHailSize: getHailSize
        };
        
        return service;

        ////////////////
        function getFraudInput() { 
            return ['Intentional Mechanical Damage', 'Center Fractures', 'Damage Walkable Areas Only', 'Torn Asphalt', 'Corner Granule Loss'
            , 'Granules on Face', 'Seasonal Debris', 'Low Heavy Creases', 'No damage in 3ft of Eave', 'Tool Marks', 'Failed Attempts'
            , '80/20 Violation' ];
        }
        
        function getRoofPeeledBack() {
            return ['N/A', '1-10 sq ft', '10-25 sq ft', '25-50 sq ft', '50-75 sq ft', '75-100 sq ft', 'Over 100 sq ft'];
        }
        
        function getHailInput() {
            return ['Intentional Mechanical Damage', 'Agitated Asphalt', 'Crushed/Embedded Granules', 'No damage near eve', 'Ball Pein Hammer'
            , 'No Mat Fracture', 'Inconsistent Across Slope', 'Inconsistent Secondary Indicators'];
        }
        
        function getCollateralDamages() {
            return ['Vehicle', 'Gutters', 'Windows/Doors', 'Downspouts', 'Aluminum Fascia', 'Vinyl Siding', 'Wood Decking', 'Landscaping', 'Screens'
            , 'Fence Material'];
        }
        
        function getMetalDamage() {
            return ['Aluminum Ridge Vent', 'Square Vent', 'Turbines', 'Satellites', 'A/C Units', 'Heat Vent', 'Power Vent', 'Skylights'
            , 'Cap Shingles'];
        }
        
        function getHailSize() {
            return ['1/4" - 1/2"', '1/2" - 3/4"', '3/4" - 1"', '1" - 1 1/4"', '1 1/4"', '1 1/2"', '1 1/2" - 1 3/4"', '1 3/4" - 2"'];
        }
        
    }
})();