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

