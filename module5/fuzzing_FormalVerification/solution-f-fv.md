# Guía de razonamiento lógico y verificación – Versión profesor

## Ejercicios con contraejemplo
1. **Afirmación:** “Todo número impar es primo.”  
   ✅ Contraejemplo: 9 es impar pero no es primo (9 = 3×3).  
   → Falsa afirmación.

2. **Afirmación:** “El cuadrado de cualquier número es mayor que el número original.”  
   ✅ Contraejemplo: 1² = 1 (igual, no mayor) o 0.5² = 0.25 (menor).  
   → Falsa afirmación.

---

## Ejercicios con demostración formal
3. **Afirmación:** “Si un número es par, entonces su cuadrado también es par.”  
   🔹 Sea n = 2k, con k ∈ ℤ.  
   n² = (2k)² = 4k² = 2(2k²) ⇒ n² es par.  
   ✅ Afirmación verdadera.

4. **Afirmación:** “La suma de dos números impares es siempre par.”  
   🔹 Sea a = 2m+1, b = 2n+1, con m,n ∈ ℤ.  
   a + b = 2m + 1 + 2n + 1 = 2(m + n + 1).  
   Es múltiplo de 2, por tanto par.  
   ✅ Afirmación verdadera.

---

## Ejercicio con verificación formal (para hallar todos los casos donde no se cumple)
5. **Afirmación:** “Si dos números tienen el mismo cuadrado, entonces son iguales.”  
   🔹 Sea a² = b².  
   Entonces (a - b)(a + b) = 0 ⇒ a = b o a = -b.  
   → Por lo tanto, **la afirmación no es siempre cierta.**  
   Se cumple cuando a = b, pero **falla cuando a = -b**.  
   ✅ Casos en que no se cumple: todos los pares de números opuestos distintos de 0  
   (por ejemplo, 2 y -2, 5 y -5, etc.).

---

## Ejercicios de aplicación a seguridad en smart contracts
6. **Situación (contraejemplo / fuzzing):**  
   Afirmación: “Esta función solo puede ser ejecutada por un `msg.sender` con saldo > 0.”  
   ✅ Método recomendado: **Contraejemplo (testing/fuzzing)**.  
   - Razón: Si la afirmación es falsa, basta un solo caso que la contradiga. Fuzzing y tests automatizados son herramientas prácticas para **generar entradas y escenarios** (callers, contratos intermedios, reentradas, cuentas con tokens no transferibles, balances aparentes por tokens distintos, llamadas por contratos proxy) que podrían permitir la ejecución sin saldo.  
   - Nota práctica: Pedí a los alumnos describir qué condiciones probarían (llamada desde contrato sin balance, ERC-20 con 0 decimals, uso de tokens pendientes, llamadas reentrantes, etc.) y que propongan un test sencillo que demuestre un fallo si lo hay.

7. **Situación (verificación formal — imposibilidad):**  
   Afirmación: “Es imposible que un `msg.sender` sin saldo ejecute la función X.”  
   ✅ Método recomendado: **Verificación formal**.  
   - Razón: Es una afirmación universal de imposibilidad; para validarla hay que demostrar que **en ningún caso** el flujo de ejecución permite la condición (revisando invariantes, require, modifiers, chequeos on-chain, reglas del EVM).  
   - Qué probar: listar y formalizar las precondiciones (p. ej. `require(balance[msg.sender] > 0)`), demostrar que para cualquier estado posible y cualquier entrada externa esas precondiciones no pueden ser falseadas, y verificar que no existen caminos alternativos (llamadas desde contratos, delegación, modificaciones de almacenamiento) que eludan la comprobación. Si se prueba correctamente, la afirmación queda verificada; si no, entonces hay que buscar contraejemplos con testing/fuzzing.
