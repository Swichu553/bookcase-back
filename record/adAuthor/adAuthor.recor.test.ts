import { AdAuthorRecord } from './adAuthor.record';

const defAuthor = {
    id: '',
    firstName: "Jan",
    lastName: "Kowalski",
    description: "test asjkbgalkjgbakl;gjbak",
};

test("sprawdzenie dodawania autora", async () => {
    const author = new AdAuthorRecord(defAuthor);
    console.log(author);
    expect(author.lastName).toBe("Kowalski");
    await author.insertAuthor();
});