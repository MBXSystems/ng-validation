describe("Service: simpleValidation", function(){

    var validator;

    beforeEach(function(){
        module('ngValidation');
    });

    describe("injected validator", function(){

        beforeEach(module(function($provide){
            $provide.value('bigValidator', function(x){ return x > 3 });
        }));

        beforeEach(inject(function(simpleValidation){
            validator = simpleValidation('bigEnough', 'bigValidator');
        }));

        describe("passing validation",function(){
            it("returns {fieldName: true}",function(){
                expect(validator(4)).toEqual({
                    bigEnough: true
                })
            })
        });

        describe("passing validation",function(){
            it("returns {fieldName: false}",function(){
                expect(validator(2)).toEqual({
                    bigEnough: false
                });
            });
        });
    });

    describe("function validator", function(){

        beforeEach(inject(function(simpleValidation){
            validator = simpleValidation('bigEnough', function(x){ return x > 3 });
        }));

        describe("passing validation",function(){
            it("returns {fieldName: true}",function(){
                expect(validator(4)).toEqual({
                    bigEnough: true
                })
            })
        });

        describe("passing validation",function(){
            it("returns {fieldName: false}",function(){
                expect(validator(2)).toEqual({
                    bigEnough: false
                });
            });
        });
    });

});
