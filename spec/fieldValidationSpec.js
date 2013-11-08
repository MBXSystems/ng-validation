describe("Service: fieldValidation", function(){

    var validations;
    var fieldValidator;
    var fieldValidation;
    var validations;

    beforeEach(function(){
        module('ngValidation');
    });

    beforeEach(inject(function(_fieldValidation_){
        fieldValidation = _fieldValidation_;
    }));

    beforeEach(function(){
        validations = jasmine.createSpyObj('validations', ['valid', 'invalid']);
        validations.valid.andReturn(true);
        validations.invalid.andReturn(false);
    });

    describe("multiple validations",function(){
        beforeEach(function(){
            fieldValidator = fieldValidation({valid: [validations.valid, validations.invalid]});
        });

        it("calls the validators", function(){
            var value = {};
            fieldValidator(value);
            expect(validations.valid).toHaveBeenCalledWith(value);
            expect(validations.invalid).toHaveBeenCalledWith(value);
        });

        it("produces correct output", function(){
            var result = fieldValidator(null);
            expect(result).toEqual({ valid: false });
        });
    });

    describe("single validations",function(){
        beforeEach(function(){
            fieldValidator = fieldValidation({valid: validations.valid, invalid: validations.invalid});
        });

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

});
