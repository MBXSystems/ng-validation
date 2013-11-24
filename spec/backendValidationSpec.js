describe('backendValidation', function(){
    var validator;
    var updateFormValidity;
    var backendAdapterResults = {};
    var response = {};
    var backendAdapter;
    var form = {};

    beforeEach(function(){
        module('ngValidation');
    });

    beforeEach(function(){
        backendAdapter =
          jasmine.createSpy('backendAdapter').andReturn(backendAdapterResults);
    });

    beforeEach(module(function($provide){
        updateFormValidity = jasmine.createSpy('updateFormValidity');
        $provide.value('updateFormValidity', updateFormValidity);
    }));

    beforeEach(inject(function(backendValidation){
        validator = backendValidation(backendAdapter);
    }));

    beforeEach(function(){
        validator(response, form);
    });

    it("calls the backend adapter", function(){
        expect(backendAdapter).toHaveBeenCalledWith(response);
    });

    it("calls updateFormValidity", function(){
        expect(updateFormValidity).toHaveBeenCalledWith(backendAdapterResults);
    });
});
