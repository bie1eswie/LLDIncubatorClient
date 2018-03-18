
import { PropertySynonym } from './propertySynonym';

export class SearchAlgorithm {

    public contacts: any[];
    public query = '';
    public objectList = [];
    public searchText = '';
    public searchProperty = "";
    public Synonyms: PropertySynonym[]

    constructor(query: string, contacts: any[]) {
        this.Synonyms = [];
        this.addSynonyms();
        this.query = query;
        this.contacts = contacts;
    }

    GetSynonyms(parent: string, child: string) {
        const synonym = new PropertySynonym(child, parent);
        this.Synonyms.push(synonym)

    }


    getQueryWords(): string[] {
        let result: string[];
        // split into words
        result = this.query.toLowerCase().split(" ");
        if (result !== null || result.length != 1) {
        }
        return result;
    }

    getPropertiesFromQuery(): string[] {
        let result: string[] = new Array(2);

        let queryWords: string[] = this.getQueryWords();
        this.addSynonyms();
        const propertyList: string[] = Object.keys(this.contacts[0]);
        let i = 0;
        for (let k = 0; k < queryWords.length; k++) {
            const word: string = queryWords[k];
            const wordInProperty: PropertySynonym = this.Synonyms.find(x => x !== null && x.Child == word);

            if (wordInProperty) {
                result.push(wordInProperty.Parent);
                this.searchProperty = wordInProperty.Parent;
                break;
            }else {
                i = k + 1;
                if (i < queryWords.length) {
                    const nextWord: string = queryWords[i]

                    // combine the current word and the next one
                    const combineWithNext: string = word + nextWord;
                    // search for the combination in the property array
                    const combinedWordInProperties: PropertySynonym = this.Synonyms.find(x => x.Child == combineWithNext || x.Parent == combineWithNext);
                    if (combinedWordInProperties) {
                        result.push(combinedWordInProperties.Parent);
                        this.searchProperty = combinedWordInProperties.Parent;
                        break;
                    }
                }
            }
            i++;
        }
        return result;
    }

    onFilterChanged(filter: string): any[] {
        if (this.query !== "") {
            if (this.contacts != null) {
                return this.contacts.filter(item => {
                    return Object.keys(item).some(
                        k => {
                            if (item[k] !== null && item[k] !== undefined && typeof item[k] === 'string' && k.toLowerCase() === this.searchProperty.toLowerCase()) {
                                return item[k].toLowerCase().trim() === filter.toLowerCase().trim();
                            }else if (item[k] !== null && item[k] !== undefined && typeof item[k] == 'string' && this.searchProperty === ""){
                                return item[k].toLowerCase().trim() === filter.toLowerCase().trim();
                            }
                        }
                    );
                });
            }
        }
    }
    filterWordForWord(queryWords: string[]): any[] {
        let result: any[] = [];
        let found = false;
        for (let k = 0; k < queryWords.length; k++) {
            const word: string = queryWords[k];
            const newContacts: any[] = this.onFilterChanged(word);
            if (newContacts.length > 0) {
                result = newContacts;
                found = true;
            }else {
                let currentWordCombination: string = word + ' ';
                for (let j: number = k + 1; j < queryWords.length; j++) {
                    currentWordCombination = currentWordCombination + queryWords[j] + ' ';
                    const currentWordCombinatioNewContacts: any[] = this.onFilterChanged(currentWordCombination);
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
    }

    performSearch(): any[] {
        const properties = this.getPropertiesFromQuery();
        const queryWords = this.query.split(' ');
        let result: any[] = new Array(5);
        result = this.filterWordForWord(queryWords);
        return result;
    }

    addSynonyms() {
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
    }


}
