;(function () {
    var module = {
        execute: function (lasca) {            
          lasca = lasca || window.lasca;
          
          $(document).ready(function(){ 
                var shuffle, diff, obj = {};
                
                window.module('UTILS');
                
                test('lasca.getLanguage()', function() {
                    equal(lasca.getLanguage('uca_arabic').key, 'uca_arabic');
                });      
                
                test('lasca.getLanguageKeys()', function() {
                    equal(lasca.getLanguageKeys().length, 85);
                });                    
        
                test('lasca.compare()', function() {
                    equal(lasca.getLanguageKeys().length, 85);
                });    
        
                window.module('ARRAY SORTING');
                
                _.each(lasca.getLanguageKeys(), function (key) {
                    lasca.setLanguage(key);    
                    shuffle = lasca.sort(_.shuffle(lasca.language.collation)); // shuffle, sort
                    
                    test('Shuffle and sort letters for ' + key, function() {
                        equal(_.difference(lasca.language.collation, shuffle).length, 0);
                    });                                                         
                }); 
                
                window.module('ARRAY OF OBJECTS SORTING');     
                
                _.each(lasca.getLanguageKeys(), function (key) {
                    lasca.setLanguage(key);  
                    
                    // shuffle, create array of objects
                    shuffle = _.map(_.shuffle(lasca.language.collation), function (item) { return { letter: item }; });                    
                    shuffle = _.pluck(lasca.sort(shuffle, 'letter'), 'letter'); // sort array of objects based on defined key                    
                    test('Shuffle and sort letters for ' + key, function() {
                        equal(_.difference(lasca.language.collation, shuffle).length, 0);
                    });                                                         
                });                 
            });                                     
        }
    }
    
    if (typeof define === 'function')
        define(module);
    else 
        module.execute();            
})();

