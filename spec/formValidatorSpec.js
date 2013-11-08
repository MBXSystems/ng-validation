describe("Service: formValidator", function(){

    var validations;
    var validator;
    var form;
    var nameValue = {};
    var titleValue = {};

    beforeEach(function(){
        module('ngValidation');
    });

    beforeEach(inject(function(formValidator){

        form = {
            name: jasmine.createSpyObj('name', ['$setValidity', '$modelValue']),
            title: jasmine.createSpyObj('title', ['$setValidity', '$modelValue'])
        };
        validations = jasmine.createSpyObj('validations', ['valid', 'invalid']);
        form.name.$modelValue.andReturn(nameValue);
        form.title.$modelValue.andReturn(titleValue);
        validations.valid.andReturn(true);
        validations.invalid.andReturn(false);
        validator = formValidator({name: { valid: validations.valid
                                         , invalid: validations.invalid
                                         },
                                   title: {invalid: validations.invalid}});
    }));

    it("runs the validations",function(){
        validator(form);
        expect(validations.valid).toHaveBeenCalledWith(nameValue);
        expect(validations.invalid).toHaveBeenCalledWith(nameValue);
        expect(validations.invalid).toHaveBeenCalledWith(titleValue);
    });

    it("modifies the form", function(){
        validator(form);
        expect(form.name.$setValidity).toHaveBeenCalledWith('valid', true);
        expect(form.name.$setValidity).toHaveBeenCalledWith('invalid', false);
        expect(form.title.$setValidity).toHaveBeenCalledWith('invalid', false);
    });


});
