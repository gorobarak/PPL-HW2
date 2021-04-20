import { ClassExp, ProcExp, Exp, isExp, Program, makeProgram, makeVarDecl, Binding, makeIfExp, makePrimOp, makeAppExp } from "./L31-ast";
import { Result, makeFailure, mapResult, makeOk, bind } from "../shared/result";
import { IfExp, isDefineExp, isIfExp, isProgram, makeDefineExp, makeNumExp, makeProcExp, makeVarRef } from "../imp/L3-ast";
import { is, concat } from "ramda";
import { allT, first, second, isEmpty } from "../shared/list";
import { isArray } from "../shared/type-predicates";


/*
Purpose: Transform ClassExp to ProcExp
Signature: for2proc(classExp)
Type: ClassExp => ProcExp
*/
export const class2proc = (exp: ClassExp): ProcExp =>{
    const first_mtd = (exp.methods)[0];
    const variable = first_mtd.var
    const body = first_mtd.val
    const firstIfExp  = makeIfExp( makeAppExp(makePrimOp("eq?"),[makeVarRef("msg"),makeVarRef( concat("'", variable.var) )]), body, makeNumExp(7) );
    return makeProcExp(exp.fields, [makeProcExp([makeVarDecl('msg')],[makeNestedIfExp(exp.methods)])] )
}


export const makeNestedIfExp = (methods: Binding[], ifexp: IfExp) : IfExp =>{
    if(isEmpty(methods)){
        return ifexp
    }
    return ifexp
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


