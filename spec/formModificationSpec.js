describe("Service: updateFieldValidity", function(){

    var field;
    var updateFieldValidity;

    beforeEach(function(){
        module('ngValidation');
    });

    beforeEach(inject(function(_updateFieldValidity_){
        updateFieldValidity = _updateFieldValidity_;
    }));

    beforeEach(function(){
        field = jasmine.createSpyObj('field', ['$setValidity']);
    });

    it("sets validity", function(){
        updateFieldValidity(field, { valid: true, invalid: false });
        expect(field.$setValidity).toHaveBeenCalledWith('valid', true);
        expect(field.$setValidity).toHaveBeenCalledWith('invalid', false);
    });

});
