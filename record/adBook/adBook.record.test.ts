import { AdBookRecord } from '../../record/adBook/adBook.record';

const defBook = {
    isbn: '9999-5151',
    title: "Nowa książka",
    author: "Testowy Tester",
    publisher: "",
    publicationDate: new Date(),
    categories: "Komedia",
    rating: "test rating",
    description: "Opis książki, zajebista książka",
};


test("Sprawdzenie dodawania ksiażek", async () => {
    const book = new AdBookRecord(defBook);
    expect(book.title).toBe("Nowa książka");
    await book.insertBook();
});

