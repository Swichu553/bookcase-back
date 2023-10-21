import { AdAuthorRecord } from './adAuthor.record';


test("porbranie autopra po id", async () => {
    const author = await AdAuthorRecord.getOneAuthor('1',)

    console.log(author);

    expect(author).toBeDefined();
    expect(author.lastName).toBe('Testowy');
    expect(author.firstName).toBe('Tester');
});

test("porbranie autopra po nazwisku", async () => {
    const author = await AdAuthorRecord.getOneAuthor("Kowalski", false)

    console.log(author);

    expect(author).toBeDefined();
    expect(author.lastName).toBe('Kowalski');
    expect(author.firstName).toBe('Jan');
});
