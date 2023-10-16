import { AdCategoryRecord } from "./adCategorie.record"

const defCat = {
    name: "Komedia",
    description: "SMieszne książki"
};

test("Sprawdzenie dodawania kategori", async () => {
    const cat = new AdCategoryRecord(defCat);
    expect(cat.name).toBe("Komedia");
});

test('Pobieranie kategori', async () => {
    const testCat = await AdCategoryRecord.getOneCategorie('dbf092b2-2abe-4e4c-a8fd-371c58e658cd');

    expect(testCat.name).toBe('Komedia');
    expect(testCat.description).toBe('Smieszne książki');

});