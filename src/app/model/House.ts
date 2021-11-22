export class BookModel {
    public _id: any;
    public authors: any[] = []; // <- Initializing
    public categories: any[] = []; // <- Initializing
    public isbn: any;
    public longDescription: any;
    public pageCount: any;
    public thumbnailUrl: any;
    public title: any;
  
    constructor(id, author, category, isbn, longDescription, pageCount, thumbnailUrl, title) {
      this._id = id;
      this.authors.push(author);
      this.categories.push(category);
      this.isbn = isbn;
      this.longDescription = longDescription;
      this.pageCount = pageCount;
      this.thumbnailUrl = thumbnailUrl;
      this.title = title;
    }
  }