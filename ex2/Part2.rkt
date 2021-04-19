#lang racket
(define lst1 (list 1 2 3))

(define lst2 (list 4 5 6))

;;;;;;;Q1
(define empty?
  (lambda (lst)
    (eq? lst '())
    )
)

(define append_single
  (lambda (lst elem)
    (if (empty? lst)
        (list elem)
        (cons (car lst) (append_single (cdr lst) elem))
        )
    )
)


; Signature: append(lst1 lst2)
; Type: [ List(T1) * List(T2) -> list(T1|T2) ]
; Purpose: concat lst2 to the end of lst1
; Pre-conditions: true
; Tests: (append '(1 2) '(3 4)) ==> '(1 2 3 4)
(define append 
  (lambda(lst1 lst2)
      (if (empty? lst2)
          lst1
          (append (append_single lst1 (car lst2)) (cdr lst2))
          )
  )
)


;;;;; Q2
(define reverse_helper
  (lambda (lst1 lst2)
    (if (empty? lst1)
         lst2
         (reverse_helper (cdr lst1) (cons (car lst1) lst2) ) 
         )
     )
 )


; Signature: reverse(lst)
; Type: [ List(T1) -> list(T1) ]
; Purpose: reverse lst
; Pre-conditions: true
; Tests: (reverse '(1 2 3)) → '(3 2 1)
(define reverse 
  (lambda (lst)
    (reverse_helper lst '() )
  )
)


;;;;;;; Q3
(define append_dup
  (lambda (lst elem count)
    (if (= count 0)
        lst
        (append_dup (append_single lst elem) elem (- count 1)))))

(define dup_helper
  (lambda (original_lst dup out)
    (if (empty? original_lst)
        out
        (dup_helper (cdr original_lst) (append_single (cdr dup) (car dup)) (append_dup out (car original_lst) (car dup)))
        )
    )
  )

; Signature: duplicate-items(lst dup-count)
; Type: [ List(T1) * List(Number) -> list(T1) ]
; Purpose: duplicate each item of lst accordint to the number defined in the same position in dup-count. In case dups-count length is smaller than lst, dup-count is treated as a cyclic list.
; Pre-conditions: true
; Tests: (duplicate-items '(1 2 3) '(1 0))→ '(1 3)
;        (duplicate-items '(1 2 3) '(2 1 0 10 2))→ '(1 1 2)
(define duplicate-items
  (lambda (lst dup-count)
    (dup_helper lst dup-count '())
    )
  )

;;;;;;;;; Q4



;used only for numbers thus we can use '=' operator
(define remove-all
  (lambda (x lst)
    (if (empty? lst)
        lst
        (if (= (car lst) x)
            (remove-all x (cdr lst))
            (cons (car lst) (remove-all x (cdr lst)))))))








; Signature: payment(n coins-lst)
; Type: [ Number * List(Number) -> Number ]
; Purpose: given sum and list of coins, returns the number od possible ways to pay sum with these coins
; Pre-conditions: List(Number) >= 0 (coins have positive value)
; Tests: (payment 10 ‘(5 5 10)) -> 2
;        (payment 5 ‘(1 1 1 2 2 5 10) → 3
(define payment
  (lambda (n coins-lst)
        (if (= n 0)
            1
            (if (< n 0)
                0
                (if (empty? coins-lst)
                    0
                    (+ (payment (- n (car coins-lst)) (cdr coins-lst)) (payment n (remove-all (car coins-lst) coins-lst) ))
                    )
                )
            )
  )
)

;;;;;;;;;;;;;; Q5





; Signature: compose-n(f n)
; Type: [ (T -> T)  * Number -> (T -> T) ]
; Purpose: returns the closure of the n-th self-composition of f 
; Pre-conditions: Number > 0
; Tests: ((compose-n (lambda (x) (* 2 x)) 3) 3) -> 24
(define compose-n
  (lambda(f n)
    (lambda (x) 
        (if (= n 1)
            (f x)
            ((compose-n f (- n 1)) (f x)) 
            )
     )
  )
)
