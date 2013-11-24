angular.module('ngValidation', []);

angular.module('ngValidation').value('isDefined', function(value){
    return angular.isDefined(value);
});

angular.module('ngValidation').factory('simpleValidation', ['$injector', function($injector){
    return function(label, validator){
        var resolvedValidator;
        if(angular.isString(validator)){
            resolvedValidator = $injector.get(validator);
        } else {
            resolvedValidator = validator;
        }
        return function(value){
            var result = {};
            result[label] = resolvedValidator(value);
            return result;
        }
    }
}]);

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

angular.module('ngValidation').factory('updateFormValidity', ['updateFieldValidity', function(updateFieldValidity){
    return function(form, validity){
        for(key in validity){
            updateFieldValidity(form[key], validity[key]);
        }
    }
}]);

angular.module('ngValidation').factory('fieldValidation', ['simpleValidation', 'mergeValidationResults', function(simpleValidation, mergeValidationResults){
    var innerFactory = function(validations){
        var validators = [];


        for(key in validations){
            var currentValidators = validations[key];
            if(angular.isArray(currentValidators)) {
                angular.forEach(currentValidators, function(currentValidator){
                    validators.push(simpleValidation(key, currentValidator));
                });
            } else {
                validators.push(simpleValidation(key, currentValidators));
            }
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

angular.module('ngValidation').factory('formValidation', ['fieldValidation', function(fieldValidation){
    var innerFactory = function(validations){
        var validators = {};
        for(key in validations){
            validators[key] = fieldValidation(validations[key]);
        }
        return function(form){
            var result = {};
            for(key in validators){
                var field = form[key];
                result[key] = validators[key](field);
            }
            return result;
        }
    };
    return innerFactory;
}]);

angular.module('ngValidation').factory('formValidator', ['formValidation', 'updateFormValidity', function(formValidation, updateFormValidity){
    return function(validations){
        return function(form){
            var formValues = {};
            for(key in validations){
                formValues[key] = form[key].$modelValue
            }
            var formValidator = formValidation(validations);
            var validationResults = formValidator(formValues);
            updateFormValidity(form, validationResults);
        }
    }
}]);

angular.module('ngValidation').factory('backendValidation', function(updateFormValidity){
    return function(backendAdapter){
        return function(response, form){
            var errorObject = backendAdapter(response);
            updateFormValidity(form, errorObject);
        }
    };
});

angular.module('ngValidation').value('railsBackendAdapter', function(results){
    var adapterResults = {};
    for(key in results){
        var errorMessages = results[key];
        adapterResults[key] = {};

        adapterResults[key].inclusion =
          errorMessages.indexOf('is not included in the list') == -1
    }
    return adapterResults;
});
