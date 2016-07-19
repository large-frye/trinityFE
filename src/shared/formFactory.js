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
            getStates: getStates,
            getPitches: getPitches,
            getAgeOfRoofs: getAgeOfRoofs,
            getRoofHeights: getRoofHeights,
            getLayers: getLayers,
            getConditions: getConditions,
            getPreviousRepairsMade: getPreviousRepairsMade,
            getRoofConditions: getRoofConditions,
            getTypeOfSiding: getTypeOfSiding,
            getRoofingTypes: getRoofingTypes,
            getDirectionalFaces: getDirectionalFaces,
            getLightning: getLightning,
            getFallTreeDamages: getFallTreeDamages,
            getExcessDebrisLocations: getExcessDebrisLocations,
            getStandingWater: getStandingWater,
            getAnamolieDropdownChoices: getAnamolieDropdownChoices,
            getAnamolieDamages: getAnamolieDamages,
            getImproperNailing: getImproperNailing,
            getFlashing: getFlashing,
            getFlashingMissing: getFlashingMissing,
            getAgedWorn: getAgedWorn,
            getVenting: getVenting
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

        function getAgeOfRoofs() {
            return ['Under 5 years', '5-10 years', '10-20 years', 'Over 20 years'];
        }

        function getRoofHeights() {
            return ['1 story', '1.5 stories', '2 stories', '2.5 stories', '3 stories', '4 stories (latch entry)', '5 stories (latch entry)'];
        }

        function getPitches() {
            var pitches = ['Flat'];
            for (var i = 1; i < 13; i++)
                pitches.push(i + '');
            return pitches;
        }

        function getLayers() {
            var layers = ['Flat'];
            for (var i = 1; i < 4; i++)
                layers.push(i + '');
            layers.push('Over 3');
            return layers;
        }

        function getRoofingTypes() {
            return ['Jet', 'Steel', '20-Year 3-Tab', '25-Year 3-Tab', '40-Year 3-Tab', '50-Year 3-Tab', 'Tile', 'T-Lock', 'Wood Shake', '30-Year Laminated', '40-Year Laminated',
            '50-Year Laminated', 'TPO', 'PVC', 'EPDM', 'Modified Bituminous', 'Built-Up Membrane', 'Fiberglass', 'Slate', 'Rolled', 'Terracotta', 'Others', 'Metal'];
        }

        function getTypeOfSiding() {
            return ['Vinyl', 'Brick', 'Stucco', 'Wood Composite', 'Aluminum', 'Cedar Shake', 'Metal Panel'];
        }

        function getConditions() {
            return ['Excellent', 'Good', 'Poor', 'Beyond life expectancy', 'Fair'];
        }

        function getPreviousRepairsMade() {
            return ['Re-Roofed', 'Tarped', 'Tarred', 'Sheathed', 'Caulked', 'Boarded Up'];
        }

        function getRoofConditions() {
            return ['Interior Damage', 'Brittle Test Failure', 'Mechanical Damage', 'High Nailing', 'Nail Extrusions', 'Water Intrusion', 'Vent Pipe Flashing Failure', 'Missing Shingles', 'Lichen Growth', 'Algae Growth',
            'Spatter Present', 'Blistering', 'Slippage', 'Flashing Breach'];
        }

        function getDirectionalFaces() {
            return ['Front', 'Rear', 'Left', 'Right'];
        }

        function getLightning() {
            return ['Antenna', 'Sheathing/Framing', 'Flashing', 'Chimney'];
        }

        function getFallTreeDamages() {
            return ['Roofing Scratched', 'Flashing', 'Holes in Decking', 'Venting', 'Framing', 'Antenna', 'Fascia', 'A/C Unit', 'Gutters', 'Roofing Damaged or Missing', 'Skylights/Windows'];
        }

        function getExcessDebrisLocations() {
            return ['On Decking', 'In Valleys', 'In Drains', 'Around Skylights', 'In Gutters', 'Gabie Ends'];
        }

        function getStandingWater() {
            return ['Improper Drainage', 'Roof Pitched Incorrectly', 'Clogged Drains'];
        }

        function getAnamolieDropdownChoices() {
            return ['N/A', '10%', '25%', '50%', '100%'];
        }

        function getAnamolieDamages() {
            return ['Large Areas of granule release', 'Small areas of granule release', 'Overall widespread areas of early granule release', 'Stress Fractures', 'Craze cracking of asphalt'];
        }

        function getImproperNailing() {
            return ['Over Driven', 'Under Driven', 'Over Nailed', 'High Nailing'];
        }

        function getFlashing() {
            return ['Flashing Missing', 'Crushed', 'Top Nailed', 'Improper Materials', 'Raised/Loose'];
        }

        function getFlashingMissing() {
            return ['Apron', 'Step', 'Valley', 'Chimney'];
        }

        function getAgedWorn() {
            return ['Drying', 'Significant Granule Loss', 'Cupping', 'Splitting Wood', 'Shrinkage', 'Delamination', 'Flashing missing', 'Cracking', 'Shading'];
        }

        function getVenting() {
            return ['Missing', 'Insufficient'];
        }

    }
})();