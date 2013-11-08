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

angular.module('ngValidation').value('mergeValidationResults', function(res, res2){
    var result = {};

    var addResult = function(r){
        for(key in r){
            var orig = true;
            if(result.hasOwnProperty(key)){
                orig = result[key];
            }
            result[key] = orig && r[key];
        }
    }

    addResult(res);
    addResult(res2);
    return result;
});

angular.module('ngValidation').value('updateFieldValidity', function(field, validity){
    for(key in validity){
        field.$setValidity(key, validity[key]);
    }
});

angular.module('ngValidation').factory('fieldValidation', ['simpleValidation', 'mergeValidationResults', function(simpleValidation, mergeValidationResults){
    var innerFactory = function(validations){
        var validators = [];
        for(key in validations){
            validators.push(simpleValidation(key, validations[key]));
        }
        return function(value){

            var validationResults = [];
            angular.forEach(validators, function(validator){
                validationResults.push(validator(value));
            });

            var result = {};
            angular.forEach(validationResults, function(validationResult){
                result = mergeValidationResults(result, validationResult);
            });

            return result;
        }
    };
    return innerFactory;
}]);
