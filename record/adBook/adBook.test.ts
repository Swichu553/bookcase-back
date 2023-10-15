import { AdBookRecord } from './adBook.record';


test("sprawdzenie pobrania książki", async () => {
    const book = await AdBookRecord.getOneBook(`1`);

    console.log(book);

    expect(book).toBeDefined();
    expect(book.id).toBe('1');
    expect(book.title).toBe('Testowa książka');

});


test("pobranie wszystkich książek", async () => {
    const books = await AdBookRecord.getAllBooks('Testowa książka');

    console.log(books);

    expect(books[0].id).toBe('1');


});

test("pobranie nie istniejącej książki", async () => {
    const book = await AdBookRecord.getOneBook('555');

    expect(book).toBeNull();
})