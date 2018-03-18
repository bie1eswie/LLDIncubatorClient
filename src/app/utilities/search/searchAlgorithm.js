System.register(["./propertySynonym"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var propertySynonym_1, SearchAlgorithm;
    return {
        setters: [
            function (propertySynonym_1_1) {
                propertySynonym_1 = propertySynonym_1_1;
            }
        ],
        execute: function () {
            SearchAlgorithm = (function () {
                function SearchAlgorithm(query, contacts) {
                    this.query = '';
                    this.objectList = [];
                    this.searchText = '';
                    this.searchProperty = "";
                    this.Synonyms = [];
                    this.addSynonyms();
                    this.query = query;
                    this.contacts = contacts;
                }
                SearchAlgorithm.prototype.GetSynonyms = function (parent, child) {
                    debugger;
                    var synonym = new propertySynonym_1.PropertySynonym(child, parent);
                    this.Synonyms.push(synonym);
                };
                SearchAlgorithm.prototype.getQueryWords = function () {
                    var result;
                    //split into words
                    result = this.query.toLowerCase().split(" ");
                    if (result !== null || result.length != 1) {
                    }
                    return result;
                };
                SearchAlgorithm.prototype.getPropertiesFromQuery = function () {
                    var result = new Array(2);
                    var queryWords = this.getQueryWords();
                    this.addSynonyms();
                    var propertyList = Object.keys(this.contacts[0]);
                    var i = 0;
                    debugger;
                    var _loop_1 = function (k) {
                        var word = queryWords[k];
                        debugger;
                        var wordInProperty = this_1.Synonyms.find(function (x) { return x !== null && x.Child == word; });
                        if (wordInProperty) {
                            result.push(wordInProperty.Parent);
                            this_1.searchProperty = wordInProperty.Parent;
                            return "break";
                        }
                        else {
                            i = k + 1;
                            if (i < queryWords.length) {
                                var nextWord = queryWords[i];
                                //combine the current word and the next one
                                var combineWithNext_1 = word + nextWord;
                                //search for the combination in the property array
                                var combinedWordInProperties = this_1.Synonyms.find(function (x) { return x.Child == combineWithNext_1 || x.Parent == combineWithNext_1; });
                                if (combinedWordInProperties) {
                                    result.push(combinedWordInProperties.Parent);
                                    this_1.searchProperty = combinedWordInProperties.Parent;
                                    return "break";
                                }
                            }
                        }
                        i++;
                    };
                    var this_1 = this;
                    for (var k = 0; k < queryWords.length; k++) {
                        var state_1 = _loop_1(k);
                        if (state_1 === "break")
                            break;
                    }
                    return result;
                };
                SearchAlgorithm.prototype.onFilterChanged = function (filter) {
                    var _this = this;
                    debugger;
                    if (this.query !== "") {
                        if (this.contacts != null) {
                            return this.contacts.filter(function (item) {
                                return Object.keys(item).some(function (k) {
                                    if (item[k] != null && item[k] != undefined && typeof item[k] == 'string' && k.toLowerCase() == _this.searchProperty.toLowerCase()) {
                                        return item[k].toLowerCase().trim() == filter.toLowerCase().trim();
                                    }
                                    else if (item[k] != null && item[k] != undefined && typeof item[k] == 'string' && _this.searchProperty == "")
                                        return item[k].toLowerCase().trim() == filter.toLowerCase().trim();
                                });
                            });
                        }
                    }
                };
                SearchAlgorithm.prototype.filterWordForWord = function (queryWords) {
                    var result = [];
                    var found = false;
                    for (var k = 0; k < queryWords.length; k++) {
                        var word = queryWords[k];
                        var newContacts = this.onFilterChanged(word);
                        if (newContacts.length > 0) {
                            result = newContacts;
                            found = true;
                        }
                        else {
                            var currentWordCombination = word + " ";
                            for (var j = k + 1; j < queryWords.length; j++) {
                                currentWordCombination = currentWordCombination + queryWords[j] + " ";
                                var currentWordCombinatioNewContacts = this.onFilterChanged(currentWordCombination);
                                if (currentWordCombinatioNewContacts.length > 0) {
                                    result = currentWordCombinatioNewContacts;
                                    found = true;
                                    break;
                                }
                            }
                        }
                        if (found) {
                            break;
                        }
                    }
                    return result;
                };
                SearchAlgorithm.prototype.performSearch = function () {
                    var properties = this.getPropertiesFromQuery();
                    var queryWords = this.query.split(" ");
                    var result = new Array(5);
                    result = this.filterWordForWord(queryWords);
                    return result;
                };
                SearchAlgorithm.prototype.addSynonyms = function () {
                    this.GetSynonyms("firstname", "name");
                    this.GetSynonyms("firstname", "firstname");
                    this.GetSynonyms("firstname", "named");
                    this.GetSynonyms("lastname", "surname");
                    this.GetSynonyms("lastname", "surname");
                    this.GetSynonyms("firstname", "first name");
                    this.GetSynonyms("lastname", "last name");
                    this.GetSynonyms("companyname", "works");
                    this.GetSynonyms("companyname", "company name");
                    this.GetSynonyms("companyname", "employee");
                    this.GetSynonyms("companyname", "employees");
                    this.GetSynonyms("companyname", "consultants");
                    this.GetSynonyms("companyname", "consultant");
                    this.GetSynonyms("companyname", "employed");
                    this.GetSynonyms("companyname", "companyname");
                };
                return SearchAlgorithm;
            }());
            exports_1("SearchAlgorithm", SearchAlgorithm);
        }
    };
});
//# sourceMappingURL=searchAlgorithm.js.map