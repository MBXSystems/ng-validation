describe("Service: formValidation", function(){

    var validations;
    var formValidator;

    beforeEach(function(){
        module('ngValidation');
    });

    beforeEach(inject(function(formValidation){
        validations = jasmine.createSpyObj('validations', ['valid', 'invalid']);
        validations.valid.andReturn(true);
        validations.invalid.andReturn(false);
        formValidator = formValidation({name: { valid: validations.valid
                                              , invalid: validations.invalid
                                              },
                                        title: {invalid: validations.invalid}});
    }));

    it("calls the validators", function(){
        var form = {
            name: {},
            title: {}
        };
        formValidator(form);
        expect(validations.valid).toHaveBeenCalledWith(form.name);
        expect(validations.invalid).toHaveBeenCalledWith(form.name);

        expect(validations.invalid).toHaveBeenCalledWith(form.title);
    });

    it("produces correct output", function(){
        var form = {
            name: {},
            title: {}
        };
        var results = formValidator(form);
        expect(results).toEqual({
            name: {
                valid: true,
                invalid: false
            },
            title: {
                invalid: false
            }
        });
    });

});
