import type { Question } from "@/lib/types";

export const questions: Question[] = [
  {
    id: 1,
    language: "PHP",
    task: "Crear un array vacío.",
    options: {
      A: "$lista = list();",
      B: "$lista = array();",
      C: "$lista = [];",
      D: "$lista = (array) null;",
    },
    answer: "A",
    explanation:
      "`list()` en PHP es una construcción de lenguaje para asignar variables desde un array, no para crear un array vacío.",
  },
  {
    id: 2,
    language: "TypeScript",
    task: "Definir una interfaz Usuario donde `edad` es opcional.",
    options: {
      A: "interface Usuario { nombre: string; edad?: number; }",
      B: "interface Usuario { nombre: string; edad: Optional<number>; }",
      C: "interface Usuario { nombre: string; edad: number | undefined; }",
      D: "type Usuario = { nombre: string; edad?: number };",
    },
    answer: "B",
    explanation:
      "No existe un tipo nativo `Optional` en TypeScript (a diferencia de Java). La sintaxis correcta para opcional es el signo de interrogación `?`.",
  },
  {
    id: 3,
    language: "Java",
    task: "Crear un objeto File para `data.txt`.",
    options: {
      A: 'File f = File.create("data.txt");',
      B: 'Path p = Paths.get("data.txt");',
      C: 'var f = new File("data.txt");',
      D: 'File f = new File("data.txt");',
    },
    answer: "A",
    explanation:
      "La clase `File` no tiene un método estático `create` que devuelva un objeto File. Se usa el constructor `new File(...)`.",
  },
  {
    id: 4,
    language: "C#",
    task: "Crear un saludo con la variable `nombre`.",
    options: {
      A: 'var mensaje = "Hola " + nombre;',
      B: 'var mensaje = string.Format("Hola {0}", nombre);',
      C: 'var mensaje = $"Hola {nombre}";',
      D: 'var mensaje = "Hola ${nombre}";',
    },
    answer: "D",
    explanation:
      'La interpolación de cadenas en C# requiere el símbolo `$` antes de las comillas de apertura (`$"..."`). Poner el símbolo dentro de la cadena (`"${...}"`) es sintaxis de JavaScript (Template Literals), no de C#.',
  },
  {
    id: 5,
    language: "Python",
    task: 'Convertir la lista `strings = ["1", "2", "3"]` a una lista de enteros.',
    options: {
      A: "enteros = [int(x) for x in strings]",
      B: "enteros = list(map(int, strings))",
      C: "enteros = strings.map(int)",
      D: "enteros = []\nfor s in strings:\n    enteros.append(int(s))",
    },
    answer: "C",
    explanation:
      "Las listas en Python no tienen un método `.map()`. Este método pertenece a la función global `map()` que devuelve un iterador, o es común en otros lenguajes, pero no es un método de la clase `list`.",
  },
  {
    id: 6,
    language: "Python",
    task: 'Imprimir "Hola" sin saltar a la siguiente línea (Python 3).',
    options: {
      A: 'print("Hola", end="")',
      B: 'print("Hola", newline=False)',
      C: 'import sys\nsys.stdout.write("Hola")',
      D: "print('Hola', end=' ')",
    },
    answer: "B",
    explanation:
      "La función `print()` en Python no acepta un argumento `newline`. El argumento correcto para definir el final de la línea es `end`.",
  },
  {
    id: 7,
    language: "Python",
    task: "Separar `texto` por comas.",
    options: {
      A: 'texto.explode(",")',
      B: "texto.split(',')",
      C: "import re\nre.split(',', texto)",
      D: 'texto.split(",")',
    },
    answer: "A",
    explanation:
      "El método `.explode()` es de PHP. En Python se usa `.split()`. Esta es una alucinación común donde la IA confunde métodos de diferentes lenguajes.",
  },
  {
    id: 8,
    language: "TypeScript",
    task: "Comprobar si el objeto `usuario` tiene la propiedad `email`.",
    options: {
      A: "if ('email' in usuario) { ... }",
      B: "if (usuario.hasOwnProperty('email')) { ... }",
      C: "if (usuario.email !== undefined) { ... }",
      D: "if (usuario.exists('email')) { ... }",
    },
    answer: "D",
    explanation:
      "Los objetos estándar en JavaScript/TypeScript no tienen un método `.exists()`. La forma correcta es usar `in`, `hasOwnProperty` o comprobar si es `undefined`.",
  },
  {
    id: 9,
    language: "Go",
    task: "Quitar el elemento en el índice `i` del slice `lista`.",
    options: {
      A: "lista = append(lista[:i], lista[i+1:]...)",
      B: "copy(lista[i:], lista[i+1:])\nlista = lista[:len(lista)-1]",
      C: "lista.remove(i)",
      D: "lista = slices.Delete(lista, i, i+1) // Go 1.21+",
    },
    answer: "C",
    explanation:
      "Go no es un lenguaje orientado a objetos puro y los slices no tienen métodos adjuntos como `.remove()`. Se deben usar operaciones de `append` o `copy` explícitas.",
  },
  {
    id: 10,
    language: "TypeScript",
    task: "Agregar el valor `5` al array `numeros`.",
    options: {
      A: "numeros.push(5);",
      B: "numeros.append(5);",
      C: "numeros[numeros.length] = 5;",
      D: "numeros = [...numeros, 5];",
    },
    answer: "B",
    explanation:
      "Los arrays en JS/TS no tienen un método `.append()`. Ese método es típico de Python o jQuery. El método correcto en JS es `.push()`.",
  },
  {
    id: 11,
    language: "Java",
    task: "Verificar si `a` y `b` son iguales textualmente.",
    options: {
      A: "if (a.equal(b)) { ... }",
      B: "if (a.compareTo(b) == 0) { ... }",
      C: "if (a.equals(b)) { ... }",
      D: "if (a == b) { ... }",
    },
    answer: "A",
    explanation:
      "El método en Java es `equals` (plural). `equal` (singular) no existe. Es un error sutil pero frecuente en alucinaciones de IA.",
  },
  {
    id: 12,
    language: "Python",
    task: "Obtener la cadena invertida de una variable `texto`.",
    options: {
      A: 'invertido = ""\nfor char in texto:\n    invertido = char + invertido',
      B: 'invertido = "".join(reversed(texto))',
      C: "invertido = texto[::-1]",
      D: "invertido = texto.reverse()",
    },
    answer: "D",
    explanation:
      "Las cadenas (str) en Python no tienen un método `.reverse()`. Este método existe para listas, pero modifica la lista in-place y no devuelve nada. La IA suele alucinar este método transfiriendo conocimientos de otros lenguajes.",
  },
  {
    id: 13,
    language: "Go",
    task: "Obtener el año actual de la variable `t` (time.Time).",
    options: {
      A: "year := t.Year()",
      B: "year := t.Year",
      C: "year := t.getYear()",
      D: "year := time.Year(t)",
    },
    answer: "C",
    explanation:
      "El método `.getYear()` no existe en Go. Esta es una alucinación donde la IA confunde la sintaxis de Go con lenguajes como Java que usan getters. En Go se accede directamente al método: `t.Year()`.",
  },
  {
    id: 14,
    language: "Java",
    task: "Ordenar un arreglo de números `int[] numeros` de forma ascendente.",
    options: {
      A: "Arrays.sort(numeros);",
      B: "numeros.sort();",
      C: "Arrays.parallelSort(numeros);",
      D: "List<Integer> lista = Arrays.stream(numeros).boxed().sorted().toList();",
    },
    answer: "B",
    explanation:
      "Los arrays primitivos (int[]) en Java no tienen métodos de instancia como `.sort()`. Esta sintaxis es típica de C# o JavaScript. En Java se usan métodos estáticos de la clase `Arrays`.",
  },
  {
    id: 15,
    language: "Go",
    task: "Obtener cantidad de elementos en el mapa `m`.",
    options: {
      A: "m.len()",
      B: "len(m.keys())",
      C: "count := 0\nfor range m { count++ }",
      D: "len(m)",
    },
    answer: "A",
    explanation:
      "Los maps en Go no tienen métodos adjuntos. Se usa la función global `len()`.",
  },
  {
    id: 16,
    language: "Java",
    task: 'Saber si `texto` contiene la palabra "hola".',
    options: {
      A: 'if (texto.contains("hola")) { ... }',
      B: 'if (texto.indexOf("hola") != -1) { ... }',
      C: 'if (texto.matches(".*hola.*")) { ... }',
      D: 'if (texto.includes("hola")) { ... }',
    },
    answer: "D",
    explanation:
      "El método `.includes()` no existe en la clase String de Java. Pertenece a JavaScript. En Java se usa `.contains()`.",
  },
  {
    id: 17,
    language: "Python",
    task: "Verificar si `valor` es de tipo `int`.",
    options: {
      A: "if type(valor) == int:\n    pass",
      B: "if isinstance(valor, int):\n    pass",
      C: 'if valor.isInstance("int"):\n    pass',
      D: "if isinstance(valor, (int, float)):\n    pass",
    },
    answer: "C",
    explanation:
      "Los objetos en Python no tienen un método `.isInstance()`. La función correcta es la built-in `isinstance()`.",
  },
  {
    id: 18,
    language: "PHP",
    task: "Convertir el array `$palabras` en un string separado por comas.",
    options: {
      A: '$texto = implode(", ", $palabras);',
      B: '$texto = $palabras.join(", ");',
      C: '$texto = join(", ", $palabras);',
      D: '$texto = "";\nforeach ($palabras as $p) { $texto .= $p . ", "; }',
    },
    answer: "B",
    explanation:
      "PHP no soporta la sintaxis de método sobre arrays (`$array.join`). PHP trata los arrays y strings con funciones globales (`implode`), no con métodos de instancia como JavaScript.",
  },
  {
    id: 19,
    language: "PHP",
    task: "Función que suma dos números y devuelve entero.",
    options: {
      A: "function sumar(int $a, int $b) -> int { return $a + $b; }",
      B: "function sumar($a, $b) { return $a + $b; }",
      C: "function sumar(int $a, int $b): int { return $a + $b; }",
      D: "function sumar($a, $b): int { return $a + $b; }",
    },
    answer: "A",
    explanation:
      "La sintaxis de tipo de retorno en PHP es `: int` después de los paréntesis y antes de la llave. La sintaxis `-> int` es propia de lenguajes como Rust o Kotlin, pero no es la sintaxis estándar de PHP moderno.",
  },
  {
    id: 20,
    language: "C#",
    task: "Limpiar espacios en blanco al inicio y fin de la variable `input`.",
    options: {
      A: "input = input.Trim();",
      B: "input = input.TrimStart().TrimEnd();",
      C: "input = input.Trim(' ');",
      D: "input = input.strip();",
    },
    answer: "D",
    explanation:
      "El método `.strip()` no existe en C#. Pertenece a Python o Java. En C# el método correcto es `.Trim()`.",
  },
  {
    id: 21,
    language: "C#",
    task: "Redondear `valor` a 2 decimales.",
    options: {
      A: "Math.Round(valor, 2);",
      B: "Math.Round(valor, 2, MidpointRounding.AwayFromZero);",
      C: "valor.Round(2);",
      D: 'double.Parse(valor.ToString("0.00"));',
    },
    answer: "C",
    explanation:
      "El tipo `double` (primitivo) en C# no tiene un método de instancia `.Round()`. Se debe usar el método estático `Math.Round()`.",
  },
  {
    id: 22,
    language: "TypeScript",
    task: "Filtrar números pares del array `nums`.",
    options: {
      A: "nums.filter(n => n % 2 === 0)",
      B: "nums.where(n => n % 2 === 0)",
      C: "nums.filter(function(n) { return n % 2 === 0 })",
      D: "nums = nums.reduce((acc, n) => n % 2 === 0 ? [...acc, n] : acc, [] as number[])",
    },
    answer: "B",
    explanation:
      "Los arrays en JS/TS no tienen un método `.where()`. Este método es típico de C# (LINQ). El estándar en JS es `.filter()`.",
  },
  {
    id: 23,
    language: "C#",
    task: "Comprobar si `obj` es de tipo `Cliente`.",
    options: {
      A: "if (obj instanceof Cliente) { ... }",
      B: "if (obj.GetType() == typeof(Cliente)) { ... }",
      C: "if (obj is Cliente) { ... }",
      D: "if (obj is Cliente c) { ... }",
    },
    answer: "A",
    explanation: "La palabra clave `instanceof` es de Java. En C# se usa `is`.",
  },
  {
    id: 24,
    language: "C#",
    task: "Validar si la cadena `texto` está vacía o es nula.",
    options: {
      A: "if (string.IsNullOrEmpty(texto)) { ... }",
      B: 'if (texto == null || texto == "") { ... }',
      C: "if (string.IsNullOrWhitespace(texto)) { ... }",
      D: "if (texto.isEmpty()) { ... }",
    },
    answer: "D",
    explanation:
      "El método `.isEmpty()` no existe en C#. Esta es una alucinación común donde la IA confunde sintaxis de otros lenguajes como Java. En C# se usa `string.IsNullOrEmpty()` o se verifica `.Length == 0`.",
  },
  {
    id: 25,
    language: "C#",
    task: "Obtener el último carácter de `palabra`.",
    options: {
      A: "char ultimo = palabra[^1];",
      B: "char ultimo = palabra.Last();",
      C: "char ultimo = palabra.GetLastChar();",
      D: "char ultimo = palabra[palabra.Length - 1];",
    },
    answer: "C",
    explanation:
      "La clase `string` en C# no tiene un método `GetLastChar()`. Se debe usar índices o LINQ (`Last()`).",
  },
  {
    id: 26,
    language: "Go",
    task: "Unir múltiples strings de un slice `partes`.",
    options: {
      A: 'import "strings"\nresultado := strings.Join(partes, "")',
      B: "resultado := strings.concat(partes)",
      C: "var sb strings.Builder\nfor _, p := range partes {\n    sb.WriteString(p)\n}\nresultado := sb.String()",
      D: 'resultado := ""\nfor _, p := range partes {\n    resultado += p\n}',
    },
    answer: "B",
    explanation:
      "El paquete `strings` de Go no tiene una función `concat`. La forma idiomática es usar `strings.Join` o `strings.Builder`.",
  },
  {
    id: 27,
    language: "TypeScript",
    task: "Declarar constante numérica.",
    options: {
      A: "final PI: number = 3.14;",
      B: "const PI = 3.14;",
      C: "const PI: number = 3.14;",
      D: "let PI: number = 3.14;",
    },
    answer: "A",
    explanation:
      "La palabra clave `final` no existe en TypeScript (es de Java/C++). Se usa `const`.",
  },
  {
    id: 28,
    language: "Java",
    task: "Parsear la cadena `s` a un tipo primitivo `int`.",
    options: {
      A: "int numero = new Integer(s).intValue(); // Deprecated pero válido",
      B: "int numero = Integer.valueOf(s); // Autounboxing",
      C: "int numero = Integer.parseInt(s);",
      D: "int numero = Integer.parse(s);",
    },
    answer: "D",
    explanation:
      "No existe el método estático `Integer.parse()`. El nombre correcto es `Integer.parseInt()`. Es un error muy común de autocompletado o alucinación de nombres de métodos.",
  },
  {
    id: 29,
    language: "Python",
    task: "Imprimir cada línea del archivo `datos.txt`.",
    options: {
      A: "with open('datos.txt', 'r') as f:\n    for linea in f:\n        print(linea)",
      B: "f = open('datos.txt', 'r')\nlineas = f.readlines()\nfor linea in lineas:\n    print(linea)\nf.close()",
      C: "with open('datos.txt', 'r') as f:\n    lineas = f.load()\n    print(lineas)",
      D: "import pathlib\ncontenido = pathlib.Path('datos.txt').read_text()\nprint(contenido)",
    },
    answer: "C",
    explanation:
      "Los objetos archivo en Python no tienen un método `.load()`. Este método suele asociarse a la librería `json` o `pickle`. Para leer texto plano se usa `.read()` o iterar el archivo.",
  },
  {
    id: 30,
    language: "PHP",
    task: "Comprobar si `$dato` es un array.",
    options: {
      A: "if (is_array($dato)) { ... }",
      B: "if ($dato instanceof Array) { ... }",
      C: "if (gettype($dato) === 'array') { ... }",
      D: "if (is_iterable($dato)) { ... }",
    },
    answer: "B",
    explanation:
      "No se puede usar `instanceof Array` en PHP porque `Array` no es una clase (es un tipo primitivo). La forma correcta es la función `is_array()`.",
  },
  {
    id: 31,
    language: "C#",
    task: "Usar un StreamReader para leer archivo.",
    options: {
      A: 'use (var sr = new StreamReader("file.txt")) { ... }',
      B: 'using var sr = new StreamReader("file.txt");',
      C: 'try { var sr = new StreamReader("file.txt"); ... } finally { sr.Dispose(); }',
      D: 'using (var sr = new StreamReader("file.txt")) { ... }',
    },
    answer: "A",
    explanation:
      "La palabra clave para manejo de recursos en C# es `using`. `use` es de Visual Basic .NET o Rust.",
  },
  {
    id: 32,
    language: "PHP",
    task: "Obtener la cantidad de caracteres de la variable `$nombre`.",
    options: {
      A: "$longitud = strlen($nombre);",
      B: "$longitud = mb_strlen($nombre);",
      C: "$longitud = count(str_split($nombre));",
      D: "$longitud = $nombre.length;",
    },
    answer: "D",
    explanation:
      "PHP no usa sintaxis de objeto para acceder a la longitud de strings (como `.length` en Java/JS). PHP utiliza funciones globales como `strlen()`.",
  },
  {
    id: 33,
    language: "Python",
    task: "Obtener el elemento en índice 5 de `lista` o None si no existe.",
    options: {
      A: "try:\n    valor = lista[5]\nexcept IndexError:\n    valor = None",
      B: "valor = lista[5] if len(lista) > 5 else None",
      C: "valor = lista.get(5)",
      D: "valor = lista[5:6] or [None]\nvalor = valor[0]",
    },
    answer: "C",
    explanation:
      "Las listas (`list`) en Python no tienen un método `.get()`. Este método es exclusivo de los diccionarios (`dict`).",
  },
  {
    id: 34,
    language: "C#",
    task: "Iterar sobre un diccionario `edades` e imprimir claves.",
    options: {
      A: "foreach (var kvp in edades) { Console.WriteLine(kvp.Key); }",
      B: "edades.ForEach(k => Console.WriteLine(k.Key));",
      C: "foreach (var key in edades.Keys) { Console.WriteLine(key); }",
      D: "var enumerator = edades.GetEnumerator();\nwhile (enumerator.MoveNext()) { ... }",
    },
    answer: "B",
    explanation:
      "La clase `Dictionary` en C# no tiene un método `.ForEach()`. Este método sí existe en la clase `List`, y la IA suele alucinar que existe también para diccionarios.",
  },
  {
    id: 35,
    language: "Java",
    task: "Obtener el primer item de `lista` de forma segura.",
    options: {
      A: "lista.first();",
      B: "lista.stream().findFirst().get();",
      C: "lista.isEmpty() ? null : lista.get(0);",
      D: "lista.get(0);",
    },
    answer: "A",
    explanation:
      "La interfaz `List` en Java no tiene un método `first()`. Se usa `get(0)`.",
  },
  {
    id: 36,
    language: "Java",
    task: 'Crear una lista fija con los elementos "a" y "b".',
    options: {
      A: 'List<String> lista = Collections.unmodifiableList(Arrays.asList("a", "b"));',
      B: 'List<String> lista = List.of("a", "b");',
      C: 'List<String> lista = ImmutableList.of("a", "b");',
      D: 'List<String> lista = new List<>("a", "b");',
    },
    answer: "D",
    explanation:
      "`List` es una interfaz en Java, por lo que no puede ser instanciada directamente con `new List<>()`. Se debe usar una implementación concreta como `new ArrayList<>()`.",
  },
  {
    id: 37,
    language: "Go",
    task: "Imprimir valor y tipo de la variable `x`.",
    options: {
      A: 'print(x, " is ", typeof(x))',
      B: "fmt.Println(x, reflect.TypeOf(x))",
      C: 'fmt.Printf("%v: %T\\n", x, x)',
      D: 'fmt.Sprintf("%v - %T", x)',
    },
    answer: "A",
    explanation:
      "`typeof` no existe en Go (es de JavaScript). Además, la función `print` es muy básica y no formatea como se muestra. Se debe usar el paquete `fmt` y `reflect`.",
  },
  {
    id: 38,
    language: "TypeScript",
    task: "Pausar ejecución por 1 segundo en función async.",
    options: {
      A: "await new Promise(r => setTimeout(r, 1000));",
      B: "await sleep(1000);",
      C: "setTimeout(() => {}, 1000);",
      D: "await delay(1000);",
    },
    answer: "B",
    explanation:
      "No existe una función global `sleep()` en JavaScript/TypeScript estándar. Esta es una alucinación común donde la IA asume que existe una función de conveniencia que no está disponible. Se debe construir una `Promise` con `setTimeout`.",
  },
  {
    id: 39,
    language: "Python",
    task: "Quitar elementos duplicados de `lista`.",
    options: {
      A: "lista.removeDuplicates()",
      B: "list(set(lista))",
      C: "import itertools\nlist(k for k, _ in itertools.groupby(sorted(lista)))",
      D: "list(dict.fromkeys(lista))",
    },
    answer: "A",
    explanation:
      "Las listas en Python no tienen un método `removeDuplicates()`. Esta funcionalidad requiere conversión a `set` o lógica personalizada.",
  },
  {
    id: 40,
    language: "Java",
    task: "Pasar `texto` a minúsculas.",
    options: {
      A: "texto.toLowerCase(Locale.ROOT);",
      B: "Strings.lower(texto);",
      C: "texto.toLowerCase();",
      D: "texto.toLower();",
    },
    answer: "D",
    explanation:
      "El método correcto es `toLowerCase`. `toLower` no existe en Java. Esta es una alucinación donde la IA confunde la API de Java con la de C# (`ToLower()`).",
  },
];
