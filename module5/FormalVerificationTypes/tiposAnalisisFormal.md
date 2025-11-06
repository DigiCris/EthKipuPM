# Guía de ejercicios – Métodos de verificación formal (Versión alumno)

## 1. Ejecución simbólica
Código:
function withdraw(uint amount) public {
    require(amount <= balance[msg.sender], "Saldo insuficiente");
    balance[msg.sender] -= amount;
}

Consigna:
Imaginá que `amount` no tiene un valor concreto (es una variable simbólica).
1. Analizá qué caminos puede seguir el programa.
2. Determiná cuándo se produce un error y cuándo la ejecución es segura.
3. Escribí la condición lógica que debe cumplirse para no fallar.

---

## 2. Interpretación abstracta
Código:
uint x = 0;
for (uint i = 0; i < n; i++) {
    x += i;
}

Consigna:
Sin ejecutar el código, razoná sobre los posibles valores de `x` usando rangos:
1. Si `n` puede estar entre 0 y 100, ¿qué rango de valores puede alcanzar `x`?
2. Si `x` fuera de tipo `uint8`, ¿qué riesgo podría detectarse?
3. Explicá por qué la herramienta de análisis no necesita probar casos concretos.

---

## 3. Comprobación de modelo
Situación:
Un contrato de votación tiene dos estados:
- Abierto → se puede votar.
- Cerrado → ya no se puede votar.

Reglas:
- `vote()` solo se permite si el estado es Abierto.
- `closeVoting()` cambia el estado a Cerrado.

Consigna:
1. Dibujá los dos estados (Abierto, Cerrado) y las posibles transiciones.
2. Analizá si existe alguna secuencia en la que pueda ejecutarse `vote()` después de `closeVoting()`.
3. Indicá cómo la comprobación de modelo permite verificar que eso no sea posible.
