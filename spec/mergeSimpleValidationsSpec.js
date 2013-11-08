describe("Service: simpleValidation", function(){

    var mergeResults;
    beforeEach(function(){
        module('ngValidation');
    });

    beforeEach(inject(function(mergeValidationResults){
        mergeResults = mergeValidationResults(
            { one: true
            , two:  true
            , three: false
            , four: false
            , five: true
            , six: false
            },
            { one: true
            , two:  false
            , three: true
            , four: false
            }
        );
    }));

    it("merges them conservatively",function(){
        expect(mergeResults).toEqual({ one: true
                                     , two:  false
                                     , three: false
                                     , four: false
                                     , five: true
                                     , six: false
                                     }
        );
    });

});
