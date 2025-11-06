# Guía de razonamiento lógico y verificación – Versión alumno

## Ejercicios con contraejemplo - fuzzing
1. **Afirmación:** “Todo número impar es primo.”  
   → Buscá un ejemplo que muestre que esta afirmación no siempre es cierta.

2. **Afirmación:** “El cuadrado de cualquier número es mayor que el número original.”  
   → Encontrá un número para el cual esto no se cumpla.

---

## Ejercicios con verificación formal
3. **Afirmación:** “Si un número es par, entonces su cuadrado también es par.”  
   → Representá el número par como 2·k y demostrátelo paso a paso.

4. **Afirmación:** “La suma de dos números impares es siempre par.”  
   → Representá los números como 2a+1 y 2b+1 y comprobá el resultado.

---

## Ejercicio con verificación formal (para hallar todos los casos donde no se cumple)
5. **Afirmación:** “Si dos números tienen el mismo cuadrado, entonces son iguales.”  
   → Verificá algebraicamente si esto es siempre cierto.  
   Si no lo es, **determiná todos los casos en los que no se cumple.**

---


## Ejercicios de aplicación a seguridad en smart contracts
6. **Situación (contraejemplo / fuzzing):**  
   Un desarrollador afirma:  
   > “Esta función solo puede ser ejecutada por un `msg.sender` con saldo > 0.”  
   → Indicá si abordarías la afirmación buscando un **contraejemplo** (p. ej. usando *fuzzing* o tests automatizados) o con verificación formal.  
   Explicá por qué y qué técnica práctica usarías para intentar encontrar un fallo.

7. **Situación (verificación formal — imposibilidad):**  
   En otro contrato se afirma:  
   > “Es imposible que un `msg.sender` sin saldo ejecute la función X.”  
   → Indicá si usarías **verificación formal** o contraejemplo, y explicá por qué.  
   Si proponés verificación formal, describí brevemente qué probarías (qué invariantes o precondiciones revisarías).


---

## Conclusión del alumno
8. **Afirmación:** “¿Para que sirve Fuzzing y para que sirve verificación formal?”  