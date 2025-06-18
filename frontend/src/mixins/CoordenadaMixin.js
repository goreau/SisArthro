export default {
    methods: {
      formatarCoordenada(valor) {
        if (typeof valor !== "string") valor = valor.toString();

        // Remove tudo que não for número
        valor = valor.replace(/[^0-9]/g, "");

        // Garante pelo menos 3 dígitos (2 graus + 1 decimal)
        if (valor.length < 3) return "";

        // Pega os dois primeiros como grau e o resto como decimal
        const graus = valor.substring(0, 2);
        const decimais = valor.substring(2);

        const coordenada = `-${graus}.${decimais}`;
        return parseFloat(coordenada).toFixed(6); // força 6 casas decimais
      }
    }
  };