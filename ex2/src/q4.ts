import { map } from 'ramda';
import { Exp, Program, ProcExp, IfExp, AppExp, PrimOp, DefineExp } from '../imp/L3-ast';
import { Result, makeFailure } from '../shared/result';
import { isBoolExp, isNumExp, isVarRef, isProcExp, isIfExp, isAppExp, isPrimOp, isDefineExp, isProgram, VarDecl } from './L31-ast';

/*
Purpose: Transform L2 AST to Python program string
Signature: l2ToPython(l2AST)
Type: [EXP | Program] => Result<string>
*/
export const l2ToPython = (exp: Exp | Program): Result<string>  => 
    isBoolExp(exp) ? makeOk(valueToString(exp.val)) :
    isNumExp(exp) ? makeOk(valueToString(exp.val)) :
    isVarRef(exp) ? makeOk(exp.var) :
    isPrimOp(exp) ? makeOk(exp.op) :
    isProcExp(exp) ? makeOk(unparseProcExp(exp)) :
    isIfExp(exp) ? `(if ${unparseL31(exp.test)} ${unparseL31(exp.then)} ${unparseL31(exp.alt)})` :
    isAppExp(exp) ? `(${unparseL31(exp.rator)} ${unparseLExps(exp.rands)})` :
    isPrimOp(exp) ? exp.op :
    isDefineExp(exp) ? `(define ${exp.var.var} ${unparseL31(exp.val)})` :
    isProgram(exp) ? `(L31 ${unparseLExps(exp.exps)})` :
    exp;

export const valueToString = (val: Value): string =>
    isNumber(val) ?  val.toString() :
    val === true ? 'True' :
    val === false ? 'False' :
    isPrimOp(val) ? val.op :
    isSymbolSExp(val) ? val.val :
    isEmptySExp(val) ? "'()" :
    isCompoundSExp(val) ? compoundSExpToString(val) :
    val;



export const isNumber = (x: any): x is number => typeof x === "number";
export const makeOk = <T>(value: T): Result<T> =>
    ({ tag: "Ok", value: value });

const unparseProcExp = (pe: ProcExp) : string => {
    return `(lambda ${map((p: VarDecl) => p.var, pe.args).join(", ")} : (${l2ToPython(pe.body[0])}) )`
}

const unprasePrimOp = (prim : PrimOp) : string => {
    if (prim.op === "number?"){
        return (`(lambda x : (type(x) == int or type(x) == float))`)
    }
    if (prim.op === "boolean?"){
        return (`(lambda x : (type(x) == bool))`)
    }
    if (prim.op === "eq?" || prim.op === "="){
        return (` == `)//TODO spaces?
    }
    if (prim.op === "and"){
        return (``)
    }
    if (prim.op === "or"){
        return (``)
    }
    if (prim.op === "not"){
        return (``)
    }

}