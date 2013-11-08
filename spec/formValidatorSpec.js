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
            name: jasmine.createSpyObj('name', ['$setValidity']),
            title: jasmine.createSpyObj('title', ['$setValidity'])
        };
        validations = jasmine.createSpyObj('validations', ['valid', 'invalid']);
        form.name.$modelValue = nameValue;
        form.title.$modelValue = titleValue;
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
