angular.module('ngValidation', []);

angular.module('ngValidation').value('isDefined', function(value){
    return angular.isDefined(value);
});

angular.module('ngValidation').value('simpleValidation', function(label, validator){
    return function(value){
        var result = {};
        result[label] = validator(value);
        return result;
    }
});


