import { AdBookRecord } from '../../record/adBook/adBook.record';


test("sprawdzenie pobrania książki", async () => {
    const book = await AdBookRecord.getOneBook('1');

    expect(book).toBeDefined();
    expect(book.isbn).toBe('1');
    expect(book.title).toBe('Przykładowa książka');


});


