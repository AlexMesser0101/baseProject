export default class Author {
    constructor(name, title) {
        this.name = name;
        this.title = title;
    }
    toString(){
        return JSON.stringify({
            title: this.title,
            name: this.name
        })
    }
    output(){
        return this.title + " " + this.name;
    }
}