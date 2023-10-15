import { AdBookRecord } from './adBook.record';


test("sprawdzenie pobrania książki", async () => {
    const book = await AdBookRecord.getOneBook(`3d0b5c91-119a-4a93-9196-ea8c6d5fe606`);

    console.log(book);

    expect(book).toBeDefined();
    expect(book.id).toBe('3d0b5c91-119a-4a93-9196-ea8c6d5fe606');
    expect(book.title).toBe('Dodawanie nowej książki');
    expect(book.authorId).toBe('Testowy Tester');

});


test("pobranie wszystkich książek", async () => {
    const books = await AdBookRecord.getAllBooks('');

    console.log(books);

    expect(books[0].id).toBe('1');


});

test("pobranie nie istniejącej książki", async () => {
    const book = await AdBookRecord.getOneBook('555');

    expect(book).toBeNull();
})