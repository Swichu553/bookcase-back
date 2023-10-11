import { AdBookRecord } from '../../record/adBook/adBook.record';


test("sprawdzenie pobrania książki", async () => {
    const book = await AdBookRecord.getOneBook('1');

    console.log(book);

    expect(book).toBeDefined();
    expect(book.id).toBe('1');
    expect(book.title).toBe('Przykładowa książka');
    expect(book.author).toBe('Jan Kowalski')


});


test("pobranie wszystkich książek", async () => {
    const books = await AdBookRecord.getAllBook('');

    console.log(books);

    expect(books[1].id).toBe('2');

});