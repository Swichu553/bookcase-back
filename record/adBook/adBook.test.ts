import { AdBookRecord } from '../../record/adBook/adBook.record';

console.log

test("sprawdzenie pobrania książki", async () => {
    const book = await AdBookRecord.getOneBook('1');

    console.log(book);

    expect(book).toBeDefined();
    expect(book.id).toBe('1');
    expect(book.title).toBe('Przykładowa książka');
    expect(book.author).toBe('Jan Kowalski')


});


