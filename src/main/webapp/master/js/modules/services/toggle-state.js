/**=========================================================
 * Module: toggle-state.js
 * Services to share toggle state functionality
 =========================================================*/

App.service('toggleStateService', function() {

  var storageKeyName  = 'toggleState';

  // Helper object to check for words in a phrase //
  var WordChecker = {
    hasWord: function (phrase, word) {
      return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
    },
    addWord: function (phrase, word) {
      if (!this.hasWord(phrase, word)) {
        return (phrase + (phrase ? ' ' : '') + word);
      }
    },
    removeWord: function (phrase, word) {
      if (this.hasWord(phrase, word)) {
        return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
      }
    }
  };

  // Return service public methods
  return {
    // Add a state to the browser storage to be restored later
    addState: function(classname){
      var data = store.get(storageKeyName);
      
      if(!data)  {
        data = classname;
      }
      else {
        data = WordChecker.addWord(data, classname);
      }

      store.set(storageKeyName, data);
    },

    // Remove a state from the browser storage
    removeState: function(classname){
      var data = store.get(storageKeyName);
      // nothing to remove
      if(!data) return;

      data = WordChecker.removeWord(data, classname);

      store.set(storageKeyName, data);
    },
    
    // Load the state string and restore the classlist
    restoreState: function($elem) {
      var data = store.get(storageKeyName);
      
      // nothing to restore
      if(!data) return;
      $elem.addClass(data);
    }

  };

});