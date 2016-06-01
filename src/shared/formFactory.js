(function () {
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
            getHailSize: getHailSize,
            getStates: getStates
        };

        return service;

        ////////////////
        function getFraudInput() {
            return ['Intentional Mechanical Damage', 'Center Fractures', 'Damage Walkable Areas Only', 'Torn Asphalt', 'Corner Granule Loss'
                , 'Granules on Face', 'Seasonal Debris', 'Low Heavy Creases', 'No damage in 3ft of Eave', 'Tool Marks', 'Failed Attempts'
                , '80/20 Violation'];
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

        function getStates() {
            return [
                {
                    'name': 'Alabama',
                    'abbreviation': 'AL'
                },
                {
                    'name': 'Alaska',
                    'abbreviation': 'AK'
                },
                {
                    'name': 'American Samoa',
                    'abbreviation': 'AS'
                },
                {
                    'name': 'Arizona',
                    'abbreviation': 'AZ'
                },
                {
                    'name': 'Arkansas',
                    'abbreviation': 'AR'
                },
                {
                    'name': 'California',
                    'abbreviation': 'CA'
                },
                {
                    'name': 'Colorado',
                    'abbreviation': 'CO'
                },
                {
                    'name': 'Connecticut',
                    'abbreviation': 'CT'
                },
                {
                    'name': 'Delaware',
                    'abbreviation': 'DE'
                },
                {
                    'name': 'District Of Columbia',
                    'abbreviation': 'DC'
                },
                {
                    'name': 'Federated States Of Micronesia',
                    'abbreviation': 'FM'
                },
                {
                    'name': 'Florida',
                    'abbreviation': 'FL'
                },
                {
                    'name': 'Georgia',
                    'abbreviation': 'GA'
                },
                {
                    'name': 'Guam',
                    'abbreviation': 'GU'
                },
                {
                    'name': 'Hawaii',
                    'abbreviation': 'HI'
                },
                {
                    'name': 'Idaho',
                    'abbreviation': 'ID'
                },
                {
                    'name': 'Illinois',
                    'abbreviation': 'IL'
                },
                {
                    'name': 'Indiana',
                    'abbreviation': 'IN'
                },
                {
                    'name': 'Iowa',
                    'abbreviation': 'IA'
                },
                {
                    'name': 'Kansas',
                    'abbreviation': 'KS'
                },
                {
                    'name': 'Kentucky',
                    'abbreviation': 'KY'
                },
                {
                    'name': 'Louisiana',
                    'abbreviation': 'LA'
                },
                {
                    'name': 'Maine',
                    'abbreviation': 'ME'
                },
                {
                    'name': 'Marshall Islands',
                    'abbreviation': 'MH'
                },
                {
                    'name': 'Maryland',
                    'abbreviation': 'MD'
                },
                {
                    'name': 'Massachusetts',
                    'abbreviation': 'MA'
                },
                {
                    'name': 'Michigan',
                    'abbreviation': 'MI'
                },
                {
                    'name': 'Minnesota',
                    'abbreviation': 'MN'
                },
                {
                    'name': 'Mississippi',
                    'abbreviation': 'MS'
                },
                {
                    'name': 'Missouri',
                    'abbreviation': 'MO'
                },
                {
                    'name': 'Montana',
                    'abbreviation': 'MT'
                },
                {
                    'name': 'Nebraska',
                    'abbreviation': 'NE'
                },
                {
                    'name': 'Nevada',
                    'abbreviation': 'NV'
                },
                {
                    'name': 'New Hampshire',
                    'abbreviation': 'NH'
                },
                {
                    'name': 'New Jersey',
                    'abbreviation': 'NJ'
                },
                {
                    'name': 'New Mexico',
                    'abbreviation': 'NM'
                },
                {
                    'name': 'New York',
                    'abbreviation': 'NY'
                },
                {
                    'name': 'North Carolina',
                    'abbreviation': 'NC'
                },
                {
                    'name': 'North Dakota',
                    'abbreviation': 'ND'
                },
                {
                    'name': 'Northern Mariana Islands',
                    'abbreviation': 'MP'
                },
                {
                    'name': 'Ohio',
                    'abbreviation': 'OH'
                },
                {
                    'name': 'Oklahoma',
                    'abbreviation': 'OK'
                },
                {
                    'name': 'Oregon',
                    'abbreviation': 'OR'
                },
                {
                    'name': 'Palau',
                    'abbreviation': 'PW'
                },
                {
                    'name': 'Pennsylvania',
                    'abbreviation': 'PA'
                },
                {
                    'name': 'Puerto Rico',
                    'abbreviation': 'PR'
                },
                {
                    'name': 'Rhode Island',
                    'abbreviation': 'RI'
                },
                {
                    'name': 'South Carolina',
                    'abbreviation': 'SC'
                },
                {
                    'name': 'South Dakota',
                    'abbreviation': 'SD'
                },
                {
                    'name': 'Tennessee',
                    'abbreviation': 'TN'
                },
                {
                    'name': 'Texas',
                    'abbreviation': 'TX'
                },
                {
                    'name': 'Utah',
                    'abbreviation': 'UT'
                },
                {
                    'name': 'Vermont',
                    'abbreviation': 'VT'
                },
                {
                    'name': 'Virgin Islands',
                    'abbreviation': 'VI'
                },
                {
                    'name': 'Virginia',
                    'abbreviation': 'VA'
                },
                {
                    'name': 'Washington',
                    'abbreviation': 'WA'
                },
                {
                    'name': 'West Virginia',
                    'abbreviation': 'WV'
                },
                {
                    'name': 'Wisconsin',
                    'abbreviation': 'WI'
                },
                {
                    'name': 'Wyoming',
                    'abbreviation': 'WY'
                }
            ];
        }

    }
})();