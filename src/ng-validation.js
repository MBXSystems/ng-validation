angular.module('ngValidation', []);

angular.module('ngValidation').value('isDefined', function(value){
    return angular.isDefined(value);
});
