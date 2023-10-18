import { hashPassword, verifyPassword } from './passwordUtils';


const testHashPassword = async (userPassword: string) => {
    const hash = await hashPassword(userPassword);
    console.log(hash);
    return hash;
}

const testVerifyPassword = async (userPassword: string) => {
    const hash = await testHashPassword(userPassword);
    return await verifyPassword(hash, userPassword)
}


test("sprawdzenie hasha", async () => {
    const pass1 = "tajniak25"
    const testPass = await testVerifyPassword('testPass')

    expect(testPass).toBe(true);

})