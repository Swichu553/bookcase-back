import { AdBookRecord } from './adBook.record';

const defBook = {
    isbn: '9999-5151',
    title: "Nowa książka",
    authorId: "1",
    publisher: "",
    publicationDate: new Date(),
    categoriesId: "1",
    rating: "test rating",
    description: "Opis książki, zajebista książka",
};


test("Sprawdzenie dodawania ksiażek", async () => {
    const book = new AdBookRecord(defBook);
    expect(book.title).toBe("Nowa książka");
    await book.insertBook();
});

