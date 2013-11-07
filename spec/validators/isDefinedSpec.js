describe("Service: isDefined", function(){

    var isDefined = null;
    var testValue = {
        goodValue: 3
    };

    beforeEach(function(){
        module('ngValidation');
    });

    beforeEach(inject(function(_isDefined_){
        isDefined = _isDefined_;
    }));

    describe("isDefined(undefined)",function(){
        it("is falsy", function(){
            expect(isDefined(testValue.badValue)).toBeFalsy();
        });
    });

    describe("isDefined(defined)",function(){
        it("is truthy", function(){
            expect(isDefined(testValue.goodValue)).toBeTruthy();
        });
    });
});
