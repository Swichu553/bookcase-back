import { AdAuthorRecord } from './adAuthor.record';


test("sprawdzenie pobrania książki", async () => {
    const author = await AdAuthorRecord.getOneAuthor('1');

    console.log(author);

    expect(author).toBeDefined();
    expect(author.lastName).toBe('Testowy');
    expect(author.firstName).toBe('Tester');
});
