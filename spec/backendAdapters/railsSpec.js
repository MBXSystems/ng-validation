describe("Service: railsBackendAdapter", function(){

    var railsBackendAdapter = null;

    beforeEach(function(){
        module('ngValidation');
    });

    beforeEach(inject(function(_railsBackendAdapter_){
        railsBackendAdapter = _railsBackendAdapter_;
    }));

    describe("inclusion errors", function(){
        it("parses out a false result", function(){
            var result = { fieldName: ['is not included in the list'] };
            var adapterResult = railsBackendAdapter(result);
            expect(adapterResult.fieldName.inclusion).toBeFalsy();
        });

        it("parses out a true result", function(){
            var result = { fieldName: [] };
            var adapterResult = railsBackendAdapter(result);
            expect(adapterResult.fieldName.inclusion).toBeTruthy();
        });

    });

});
