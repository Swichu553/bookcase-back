import { AdBookRecord } from './adBook.record';


test("sprawdzenie pobrania książki po id", async () => {
    const book = await AdBookRecord.getOneBook(`1`);

    console.log(book);

    expect(book).toBeDefined();
    expect(book.id).toBe('1');
    expect(book.title).toBe('Testowa książka');

});

test("sprawdzenie pobrania książki po tytule", async () => {
    const book = await AdBookRecord.getOneBook(`Nowa książka`, false);

    console.log(book);

    expect(book).toBeDefined();
    expect(book.id).toBe('1d582374-25e1-4744-bb51-bcedd2eb0745');
    expect(book.title).toBe('Nowa książka');

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