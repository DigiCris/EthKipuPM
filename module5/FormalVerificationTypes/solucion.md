# Guía de ejercicios – Métodos de verificación formal (Versión profesor)

## 1. Ejecución simbólica
Código:
function withdraw(uint amount) public {
    require(amount <= balance[msg.sender], "Saldo insuficiente");
    balance[msg.sender] -= amount;
}

Razonamiento:
La herramienta sustituye `amount` por un símbolo y analiza ambos caminos posibles:
- Si `amount > balance[msg.sender]` → se dispara `require` → error.
- Si `amount ≤ balance[msg.sender]` → ejecución segura.
Condición lógica de seguridad: `amount ≤ balance[msg.sender]`.
✅ Este método busca condiciones precisas que provocan o evitan fallos, sin ejecutar el código.

---

## 2. Interpretación abstracta
Código:
uint x = 0;
for (uint i = 0; i < n; i++) {
    x += i;
}

Razonamiento:
Si `n ∈ [0,100]`, la suma máxima es 0+1+2+...+99 = 4950.
Por lo tanto, `x ∈ [0,4950]`.
Si `x` es `uint8` (rango [0,255]), puede ocurrir overflow.
✅ La interpretación abstracta no prueba valores, sino rangos posibles, detectando errores estructurales.

---

## 3. Comprobación de modelo
Situación:
Contrato con estados Abierto y Cerrado.

Modelo de estados:
- Estado inicial: Abierto.
- Transición 1: `vote()` → solo válido en Abierto.
- Transición 2: `closeVoting()` → cambia a Cerrado.
- Transición 3: `vote()` en Cerrado → prohibido.

Razonamiento:
El model checker analiza todas las posibles secuencias y verifica la propiedad:
“Nunca ocurre que vote() se ejecute después de closeVoting().”
Si no encuentra un camino que viole la propiedad, se considera verificada.
✅ Este método analiza todas las rutas posibles del sistema para asegurar propiedades globales.
