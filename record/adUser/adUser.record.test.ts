import { AdUserRecord } from "./adUser.record"
import { AdUserEntity } from "../../types";

// const defUser: AdUserEntity = {
//     id: "",
//     login: "testowy88",
//     pass: "tajneHaslo",
//     passwordHash: "",
//     firstName: "Tester",
//     email: "testowy22@test.pl",
//     booksId: null,
//     role: "user",
//     isActive: false,
// }

// test("sprawdzenie usera", async () => {
//     const user = new AdUserRecord(defUser);
//     expect(user.login).toBe("testowy88");
//     await user.insertUser();
// });


test("sprawdzenie pobierania usera", async () => {
    const user2 = await AdUserRecord.getOneUserId('e9dc8022-ac63-4b59-b66a-acbbdc03a1f2');
    console.log(user2);

    expect(user2.username).toBe('testowy')
})