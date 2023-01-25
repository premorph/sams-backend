import { compare, hash } from "bcryptjs";
const SaltOrRounds=10
/**
 *  encrypt the texplain of the request and return a new hash text
 * @param textPlain string
 */
export function encrypt(textPlain:string):Promise<string>{
return hash(textPlain,SaltOrRounds)
}
/**
* check the password at the request and the password saved in the BD 
 * @param textPlain string
 * @param textHash  string
 */
export function Compare(textPlain:string,textHash:string):Promise<boolean>{
    return compare(textPlain,textHash)
}