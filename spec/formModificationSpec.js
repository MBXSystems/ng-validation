describe("Service: updateFormValidity", function(){

    var updateFieldValidity;
    var updateFormValidity;

    beforeEach(function(){
        module('ngValidation');
    });

    beforeEach(inject(function(_updateFormValidity_){
        updateFormValidity = _updateFormValidity_;
    }));

    it("sets form validity", function(){
        var form = {
            name: jasmine.createSpyObj('name', ['$setValidity']),
            title: jasmine.createSpyObj('title', ['$setValidity'])
        };


        var titleValidity = { present: true
                            , magic: false
                            }

        updateFormValidity(form, {
            name: { present: true
                  , magic: false
                  },
            title: { present: false
                   , magic: false
                   }
        });

        expect(form.name.$setValidity).toHaveBeenCalledWith('present', true);
        expect(form.name.$setValidity).toHaveBeenCalledWith('magic', false);
        expect(form.title.$setValidity).toHaveBeenCalledWith('present', false);
        expect(form.title.$setValidity).toHaveBeenCalledWith('magic', false);
    });

});
