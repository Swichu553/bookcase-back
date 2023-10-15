import { AdCategoryRecord } from "./adCategorie.record"

const defCat = {
    name: "Komedia",
    description: "SMieszne książki"
};

test("Sprawdzenie dodawania kategori", async () => {
    const cat = new AdCategoryRecord(defCat);
    expect(cat.name).toBe("Komedia");
    await cat.insertCategorie();
});

