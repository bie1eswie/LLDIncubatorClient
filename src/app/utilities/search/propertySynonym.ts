export class PropertySynonym {
    public Parent: string;
    public Child: string; 

    constructor( child: string,parent: string) {
        this.Child = child;
        this.Parent = parent;
    }
}