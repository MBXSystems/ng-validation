describe("Service: fieldValidation", function(){

    var validations;
    var fieldValidator;

    beforeEach(function(){
        module('ngValidation');
    });

    beforeEach(inject(function(fieldValidation){
        validations = jasmine.createSpyObj('validations', ['valid', 'invalid']);
        validations.valid.andReturn(true);
        validations.invalid.andReturn(false);
        fieldValidator = fieldValidation({valid: validations.valid, invalid: validations.invalid});
    }));

    it("calls the validators", function(){
        var value = {};
        fieldValidator(value);
        expect(validations.valid).toHaveBeenCalledWith(value);
        expect(validations.invalid).toHaveBeenCalledWith(value);
    });

    it("produces correct output", function(){
        var result = fieldValidator(null);
        expect(result).toEqual({ valid: true, invalid: false });
    });

});
