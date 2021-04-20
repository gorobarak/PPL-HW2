import { ClassExp, ProcExp, Exp, isExp, Program, makeProgram } from "./L31-ast";
import { Result, makeFailure, mapResult, makeOk, bind } from "../shared/result";
import { isDefineExp, isIfExp, isProgram, makeDefineExp } from "../imp/L3-ast";
import { is } from "ramda";
import { allT } from "../shared/list";


/*
Purpose: Transform ClassExp to ProcExp
Signature: for2proc(classExp)
Type: ClassExp => ProcExp
*/
export const class2proc = (exp: ClassExp): ProcExp =>
    {

    }

/*
Purpose: Transform L31 AST to L3 AST
Signature: l31ToL3(l31AST)
Type: [Exp | Program] => Result<Exp | Program>
*/
export const L31ToL3 = (exp: Exp | Program): Result <Exp | Program> =>{
    isProgram(exp) ? bind(mapResult(L31ToL3, exp.exps), (exps: (Program|Exp)[]) => allT(isExp,exps) ? makeOk(makeProgram(exps)): 
    makeFailure("not good")) :
    
}
 

export const L31ToL3_notResult = (exp: Exp | Program): Program => {
    return 

}


