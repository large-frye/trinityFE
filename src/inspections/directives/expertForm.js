(function () {
    'use strict';

    angular
        .module('trinity.inspections.directives.expertForm', [])
        .directive('expertForm', ExpertForm);

    ExpertForm.$inject = ['FormService', '$log', 'formFactory'];
    function ExpertForm(FormService, $log) {
        var directive = {
            bindToController: true,
            controller: ControllerController,
            controllerAs: 'vm',
            link: link,
            restrict: 'E',
            templateUrl: 'src/partials/inspections/expert-form.html',
            scope: {
                form: '=',
                outcomeType: '='
            }
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }
    /* @ngInject */
    function ControllerController(FormService, $log, formFactory) {
        var vm = this;
        vm.pitches = formFactory.getPitches();
        vm.roofHeights = formFactory.getRoofHeights();
        vm.ageOfRoofs = formFactory.getAgeOfRoofs();
        vm.layers = formFactory.getLayers();
        vm.roofingTypes = formFactory.getRoofingTypes();
        vm.sidingTypes = formFactory.getTypeOfSiding();
        vm.conditions = formFactory.getConditions();
        vm.previousRepairs = formFactory.getPreviousRepairsMade();
        vm.roofConditions = formFactory.getRoofConditions();
        vm.directionalFaces = formFactory.getDirectionalFaces();
        vm.windFraudInput = formFactory.getFraudInput();
        vm.windRoofPeeledBack = formFactory.getRoofPeeledBack();
        vm.hailInput = formFactory.getHailInput();
        vm.hailSize = formFactory.getHailSize();
        vm.metalDamage = formFactory.getMetalDamage();
        vm.collateralDamages = formFactory.getCollateralDamages();
        vm.lightning = formFactory.getLightning();
        vm.fallTreeDamages = formFactory.getFallTreeDamages();
        vm.excessDebrisLocations = formFactory.getExcessDebrisLocations();
        vm.standingWater = formFactory.getStandingWater();
        vm.anamolieDropdownChoices = formFactory.getAnamolieDropdownChoices();
        vm.anamolieDamages = formFactory.getAnamolieDamages();
        vm.improperNailing = formFactory.getImproperNailing();
        vm.flashing = formFactory.getFlashing();
        vm.flashingMissing = formFactory.getFlashingMissing();
        vm.agedWorn = formFactory.getAgedWorn();
        vm.venting = formFactory.getVenting();
    }
})();