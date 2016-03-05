(function() {
    angular.module("trinity.workOrders.filters", [])

        .filter("upperCaseChar", function () {
            return function (string, index) {
                if (index < string.length) {
                    return string.substr(0, index) + string[index].toUpperCase() + string.substr(index + 1, string.length);
                }
                return string;
            }
        })
})()