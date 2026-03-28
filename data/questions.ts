import type { Question } from "@/lib/types";

export const questions: Question[] = [
  // ── SQL Injection ──────────────────────────────────────
  {
    id: 1,
    language: "Python",
    vulnerability: "SQL Injection",
    task: "Buscar un usuario por nombre.",
    options: {
      A: `cursor.execute(f"SELECT * FROM users WHERE name='{name}'")`,
      B: `cursor.execute("SELECT * FROM users WHERE name=%s", (name,))`,
      C: `cursor.execute("SELECT * FROM users WHERE name=?", (name,))`,
      D: `cursor.execute("SELECT * FROM users WHERE name=:n", {"n": name})`,
    },
    answer: "A",
    explanation:
      "El f-string inserta name directo en el SQL. Si name es ' OR 1=1 --, se ejecuta SQL malicioso. Las demás usan parámetros que escapan el valor.",
  },
  {
    id: 2,
    language: "PHP",
    vulnerability: "SQL Injection",
    task: "Verificar login de un usuario.",
    options: {
      A: `$stmt = $pdo->prepare("SELECT * FROM users WHERE email=?");\n$stmt->execute([$email]);`,
      B: `mysqli_query($conn, "SELECT * FROM users WHERE email='$email'");`,
      C: `$stmt = $pdo->prepare("SELECT * FROM users WHERE email=:e");\n$stmt->execute(['e' => $email]);`,
      D: `$stmt = $pdo->prepare("SELECT * FROM users WHERE email=?");\n$stmt->bindParam(1, $email);\n$stmt->execute();`,
    },
    answer: "B",
    explanation:
      "$email se concatena directo en el SQL. Un atacante envía ' OR '1'='1 como email y accede sin contraseña. Las demás usan prepared statements.",
  },
  {
    id: 3,
    language: "Java",
    vulnerability: "SQL Injection",
    task: "Eliminar un producto por ID.",
    options: {
      A: `PreparedStatement ps = conn.prepareStatement("DELETE FROM products WHERE id=?");\nps.setInt(1, id);\nps.executeUpdate();`,
      B: `stmt.executeUpdate("DELETE FROM products WHERE id=" + id);`,
      C: `conn.prepareStatement("DELETE FROM products WHERE id=?")\n  .setString(1, String.valueOf(id));`,
      D: `em.createQuery("DELETE FROM Product p WHERE p.id=:id")\n  .setParameter("id", id).executeUpdate();`,
    },
    answer: "B",
    explanation:
      "Se concatena id con + en el SQL. Si id es '1 OR 1=1' se borran todos los registros. PreparedStatement con ? evita esto.",
  },
  {
    id: 4,
    language: "Go",
    vulnerability: "SQL Injection",
    task: "Buscar productos por nombre.",
    options: {
      A: `db.Query("SELECT * FROM products WHERE name=?", name)`,
      B: `db.Query(fmt.Sprintf("SELECT * FROM products WHERE name='%s'", name))`,
      C: `db.Query("SELECT * FROM products WHERE name=$1", name)`,
      D: `stmt, _ := db.Prepare("SELECT * FROM products WHERE name=$1")\nstmt.Query(name)`,
    },
    answer: "B",
    explanation:
      "fmt.Sprintf inserta name directo en el SQL sin escapar. Un atacante puede romper la comilla e inyectar SQL. Las demás usan placeholders (? o $1).",
  },
  {
    id: 5,
    language: "C#",
    vulnerability: "SQL Injection",
    task: "Buscar clientes por ciudad.",
    options: {
      A: `cmd = new SqlCommand("SELECT * FROM clients WHERE city=@c", conn);\ncmd.Parameters.AddWithValue("@c", city);`,
      B: `cmd = new SqlCommand($"SELECT * FROM clients WHERE city='{city}'", conn);`,
      C: `context.Clients.Where(c => c.City == city).ToList();`,
      D: `cmd = new SqlCommand("SELECT * FROM clients WHERE city=@c", conn);\ncmd.Parameters.Add("@c", SqlDbType.NVarChar).Value = city;`,
    },
    answer: "B",
    explanation:
      "El string interpolado $\"...\" inserta city directo en el SQL. Un atacante inyecta '; DROP TABLE clients;--. Las demás usan parámetros @c o LINQ.",
  },

  // ── XSS ────────────────────────────────────────────────
  {
    id: 6,
    language: "JavaScript",
    vulnerability: "XSS (Cross-Site Scripting)",
    task: "Mostrar un comentario del usuario.",
    options: {
      A: `element.textContent = comment;`,
      B: `element.innerHTML = comment;`,
      C: `element.innerText = comment;`,
      D: `element.appendChild(document.createTextNode(comment));`,
    },
    answer: "B",
    explanation:
      "innerHTML interpreta HTML. Si comment es <script>alert('XSS')</script>, el navegador lo ejecuta. textContent e innerText tratan todo como texto plano.",
  },
  {
    id: 7,
    language: "PHP",
    vulnerability: "XSS (Cross-Site Scripting)",
    task: "Mostrar el nombre del usuario.",
    options: {
      A: `echo "Hola, " . $_GET['name'];`,
      B: `echo "Hola, " . htmlspecialchars($_GET['name']);`,
      C: `echo "Hola, " . strip_tags($_GET['name']);`,
      D: `$n = htmlspecialchars($_GET['name'], ENT_QUOTES, 'UTF-8');\necho "Hola, $n";`,
    },
    answer: "A",
    explanation:
      "Imprime $_GET['name'] directo en HTML. Un atacante pone <script>alert(document.cookie)</script> en la URL para robar cookies. htmlspecialchars() escapa los caracteres peligrosos.",
  },
  {
    id: 8,
    language: "TypeScript",
    vulnerability: "XSS (Cross-Site Scripting)",
    task: "Mostrar el nombre de usuario en React.",
    options: {
      A: `<div>{user.name}</div>`,
      B: `<div dangerouslySetInnerHTML={{ __html: user.name }} />`,
      C: `<span>{String(user.name)}</span>`,
      D: `<p>{user.name}</p>`,
    },
    answer: "B",
    explanation:
      "dangerouslySetInnerHTML inyecta HTML sin escapar. Si user.name tiene <img onerror=alert('XSS')>, se ejecuta JS. React escapa automáticamente dentro de {llaves}.",
  },

  // ── Command Injection ──────────────────────────────────
  {
    id: 9,
    language: "Python",
    vulnerability: "Command Injection",
    task: "Hacer ping a un servidor.",
    options: {
      A: `os.system(f"ping -c 4 {host}")`,
      B: `subprocess.run(["ping", "-c", "4", host])`,
      C: `subprocess.run(["ping", "-c", "4", host], shell=False)`,
      D: `subprocess.run(["ping", "-c", "4", shlex.quote(host)])`,
    },
    answer: "A",
    explanation:
      "os.system() pasa todo al shell. Si host es '8.8.8.8; rm -rf /', se ejecutan ambos comandos. subprocess con lista separa comando de argumentos.",
  },
  {
    id: 10,
    language: "Java",
    vulnerability: "Command Injection",
    task: "Ejecutar ping al host del usuario.",
    options: {
      A: `new ProcessBuilder("ping", "-c", "4", host).start();`,
      B: `Runtime.getRuntime().exec("ping -c 4 " + host);`,
      C: `Runtime.getRuntime().exec(new String[]{"ping","-c","4",host});`,
      D: `new ProcessBuilder("ping", "-c", "4", host)\n  .redirectErrorStream(true).start();`,
    },
    answer: "B",
    explanation:
      "Concatena host en un string para el shell. '8.8.8.8; cat /etc/passwd' ejecuta dos comandos. Pasar argumentos como array evita la inyección.",
  },
  {
    id: 11,
    language: "PHP",
    vulnerability: "Command Injection",
    task: "Redimensionar una imagen.",
    options: {
      A: `exec("convert " . $_GET['img'] . " -resize 100x100 out.jpg");`,
      B: `exec("convert " . escapeshellarg($_GET['img']) . " -resize 100x100 out.jpg");`,
      C: `$img = basename($_GET['img']);\nexec("convert " . escapeshellarg($img) . " out.jpg");`,
      D: `$im = new Imagick(basename($_GET['img']));\n$im->thumbnailImage(100,100);\n$im->writeImage("out.jpg");`,
    },
    answer: "A",
    explanation:
      "$_GET['img'] va directo al comando shell. Si es 'a.jpg; rm -rf /', se ejecuta el borrado. escapeshellarg() protege envolviendo el valor entre comillas.",
  },

  // ── Path Traversal ─────────────────────────────────────
  {
    id: 12,
    language: "Python",
    vulnerability: "Path Traversal",
    task: "Descargar un archivo de uploads/.",
    options: {
      A: `return open("uploads/" + filename).read()`,
      B: `safe = os.path.basename(filename)\nreturn open(os.path.join("uploads", safe)).read()`,
      C: `full = os.path.abspath(os.path.join("uploads", filename))\nassert full.startswith(os.path.abspath("uploads"))\nreturn open(full).read()`,
      D: `from pathlib import Path\nbase = Path("uploads").resolve()\ntarget = (base / filename).resolve()\nassert str(target).startswith(str(base))\nreturn target.read_text()`,
    },
    answer: "A",
    explanation:
      "Concatena filename directo al path. Si es '../../etc/passwd', lee archivos del sistema. basename() extrae solo el nombre y abspath()+startswith() validan el directorio.",
  },
  {
    id: 13,
    language: "C#",
    vulnerability: "Path Traversal",
    task: "Servir un archivo al usuario.",
    options: {
      A: `var path = Path.Combine("files", filename);\nreturn PhysicalFile(path, "application/octet-stream");`,
      B: `var safe = Path.GetFileName(filename);\nreturn PhysicalFile(Path.Combine("files", safe), "application/octet-stream");`,
      C: `var full = Path.GetFullPath(Path.Combine("files", filename));\nif (!full.StartsWith(Path.GetFullPath("files"))) return Forbid();\nreturn PhysicalFile(full, "application/octet-stream");`,
      D: `var safe = Path.GetFileName(filename);\nvar full = Path.GetFullPath(Path.Combine("files", safe));\nreturn PhysicalFile(full, "application/octet-stream");`,
    },
    answer: "A",
    explanation:
      "Path.Combine no impide '../' en filename. Con '../../../etc/passwd' se accede fuera del directorio. GetFileName() quita las barras y GetFullPath()+StartsWith() validan.",
  },
  {
    id: 14,
    language: "Go",
    vulnerability: "Path Traversal",
    task: "Servir archivos estáticos.",
    options: {
      A: `file := r.URL.Path[len("/files/"):]\nhttp.ServeFile(w, r, "./static/" + file)`,
      B: `fs := http.FileServer(http.Dir("./static"))\nhttp.Handle("/files/", http.StripPrefix("/files/", fs))`,
      C: `file := filepath.Base(r.URL.Path[len("/files/"):])\nhttp.ServeFile(w, r, filepath.Join("./static", file))`,
      D: `clean := filepath.Clean(r.URL.Path[len("/files/"):])\nfull := filepath.Join("./static", clean)\nif !strings.HasPrefix(full, "static") { return }\nhttp.ServeFile(w, r, full)`,
    },
    answer: "A",
    explanation:
      "Concatena el path del usuario sin validar. Con /files/../../../etc/passwd lee cualquier archivo. filepath.Base() y http.FileServer sanitizan los paths.",
  },

  // ── Hardcoded Credentials ──────────────────────────────
  {
    id: 15,
    language: "Python",
    vulnerability: "Hardcoded Credentials",
    task: "Conectarse a la base de datos.",
    options: {
      A: `conn = psycopg2.connect(host="db.prod", password="S3cret!")`,
      B: `conn = psycopg2.connect(os.environ["DATABASE_URL"])`,
      C: `conn = psycopg2.connect(password=config("DB_PASS"))`,
      D: `secrets = json.loads(Path("/run/secrets/db").read_text())\nconn = psycopg2.connect(**secrets)`,
    },
    answer: "A",
    explanation:
      "La contraseña está escrita en el código. Si el repo se hace público, el atacante accede a la DB de producción. Siempre usar variables de entorno o secret managers.",
  },
  {
    id: 16,
    language: "JavaScript",
    vulnerability: "Hardcoded Credentials",
    task: "Configurar conexión a API externa.",
    options: {
      A: `const api = axios.create({\n  headers: { Authorization: 'Bearer sk-abc123secret' }\n});`,
      B: `const api = axios.create({\n  headers: { Authorization: 'Bearer ' + process.env.API_KEY }\n});`,
      C: `const token = await getSecret('API_KEY');\nconst api = axios.create({\n  headers: { Authorization: 'Bearer ' + token }\n});`,
      D: `const api = axios.create({\n  headers: { Authorization: 'Bearer ' + process.env.API_KEY }\n});`,
    },
    answer: "A",
    explanation:
      "El API key está en el código fuente. Cualquiera con acceso al repo puede verlo y usarlo. Los secretos deben estar en variables de entorno o un vault.",
  },

  // ── Deserialización Insegura ───────────────────────────
  {
    id: 17,
    language: "Python",
    vulnerability: "Deserialización Insegura",
    task: "Cargar datos del cliente.",
    options: {
      A: `config = json.loads(data)`,
      B: `config = pickle.loads(data)`,
      C: `config = yaml.safe_load(data)`,
      D: `config = tomllib.loads(data)`,
    },
    answer: "B",
    explanation:
      "pickle.loads() ejecuta código al deserializar. Un atacante crea un payload que ejecuta os.system('rm -rf /'). JSON, YAML safe_load y TOML solo parsean datos.",
  },
  {
    id: 18,
    language: "Java",
    vulnerability: "Deserialización Insegura",
    task: "Recibir datos del cliente.",
    options: {
      A: `UserPrefs p = new ObjectMapper()\n  .readValue(json, UserPrefs.class);`,
      B: `ObjectInputStream ois = new ObjectInputStream(input);\nUserPrefs p = (UserPrefs) ois.readObject();`,
      C: `UserPrefs p = new Gson().fromJson(json, UserPrefs.class);`,
      D: `UserPrefs p = JsonParser.parseString(json).getAsJsonObject();`,
    },
    answer: "B",
    explanation:
      "ObjectInputStream.readObject() con datos no confiables permite ejecución remota de código. Existen 'gadget chains' que el atacante explota. JSON (Jackson, Gson) es seguro.",
  },

  // ── SSRF ───────────────────────────────────────────────
  {
    id: 19,
    language: "TypeScript",
    vulnerability: "SSRF",
    task: "Proxy para obtener datos de una URL.",
    options: {
      A: `const resp = await fetch(req.query.url as string);\nres.send(await resp.text());`,
      B: `const url = new URL(req.query.url as string);\nif (!ALLOWED.includes(url.hostname)) return res.status(403).end();\nres.send(await (await fetch(url)).text());`,
      C: `const urls: Record<string,string> = {\n  weather: 'https://api.weather.com/data'\n};\nconst url = urls[req.params.source];\nif (!url) return res.status(404).end();\nres.send(await (await fetch(url)).text());`,
      D: `const url = new URL(req.query.url as string);\nif (url.protocol !== 'https:') return res.status(400).end();\nif (!ALLOWED.includes(url.hostname)) return res.status(403).end();\nres.send(await (await fetch(url)).text());`,
    },
    answer: "A",
    explanation:
      "Hace fetch a cualquier URL sin restricción. Un atacante pide http://169.254.169.254/ (metadata AWS) o http://localhost:6379 (Redis) para acceder a servicios internos.",
  },

  // ── CSRF ───────────────────────────────────────────────
  {
    id: 20,
    language: "C#",
    vulnerability: "CSRF",
    task: "Endpoint para transferir fondos.",
    options: {
      A: `[HttpPost]\npublic IActionResult Transfer(string to, decimal amount) {\n  _bank.Transfer(User.Id, to, amount);\n  return Ok();\n}`,
      B: `[HttpPost]\n[ValidateAntiForgeryToken]\npublic IActionResult Transfer(TransferRequest req) {\n  _bank.Transfer(User.Id, req.To, req.Amount);\n  return Ok();\n}`,
      C: `[HttpPost, Authorize, ValidateAntiForgeryToken]\npublic IActionResult Transfer([FromBody] TransferRequest req) {\n  _bank.Transfer(User.Id, req.To, req.Amount);\n  return Ok();\n}`,
      D: `[HttpPost, Authorize]\npublic IActionResult Transfer([FromBody] TransferRequest req) {\n  if (Request.Headers["X-CSRF"] != Session.GetString("csrf"))\n    return Forbid();\n  _bank.Transfer(User.Id, req.To, req.Amount);\n  return Ok();\n}`,
    },
    answer: "A",
    explanation:
      "Sin protección CSRF ni [Authorize]. Un sitio malicioso hace que el navegador envíe un POST automático, transfiriendo fondos sin consentimiento. El token anti-forgery lo previene.",
  },

  // ── IDOR ───────────────────────────────────────────────
  {
    id: 21,
    language: "TypeScript",
    vulnerability: "IDOR",
    task: "Obtener datos de un pedido.",
    options: {
      A: `const order = await db.orders.findById(req.params.id);\nres.json(order);`,
      B: `const order = await db.orders.findOne({\n  id: req.params.id, userId: req.user.id\n});\nif (!order) return res.status(404).end();\nres.json(order);`,
      C: `const order = await db.orders.findOne({\n  id: req.params.id, userId: req.user.id\n});\nif (!order) return res.status(403).end();\nres.json(order);`,
      D: `// middleware: auth + authorize('order:read')\nconst order = await db.orders.findById(req.params.id);\nres.json(order);`,
    },
    answer: "A",
    explanation:
      "Busca solo por ID sin autenticación. Cualquiera accede a pedidos ajenos cambiando el número en la URL (/orders/1, /orders/2...). Se debe verificar que pertenezca al usuario.",
  },

  // ── Broken Access Control ──────────────────────────────
  {
    id: 22,
    language: "Java",
    vulnerability: "Broken Access Control",
    task: "Actualizar perfil de usuario.",
    options: {
      A: `@PostMapping("/api/users/{id}/profile")\npublic ResponseEntity<?> update(@PathVariable Long id, @RequestBody ProfileDTO dto) {\n  userService.updateProfile(id, dto);\n  return ResponseEntity.ok().build();\n}`,
      B: `@PostMapping("/api/profile")\npublic ResponseEntity<?> update(@AuthenticationPrincipal User u, @RequestBody ProfileDTO dto) {\n  userService.updateProfile(u.getId(), dto);\n  return ResponseEntity.ok().build();\n}`,
      C: `@PostMapping("/api/users/{id}/profile")\n@PreAuthorize("#id == authentication.principal.id")\npublic ResponseEntity<?> update(@PathVariable Long id, @RequestBody ProfileDTO dto) {\n  userService.updateProfile(id, dto);\n  return ResponseEntity.ok().build();\n}`,
      D: `@PostMapping("/api/profile")\npublic ResponseEntity<?> update(HttpServletRequest req, @RequestBody ProfileDTO dto) {\n  Long uid = (Long) req.getAttribute("userId");\n  userService.updateProfile(uid, dto);\n  return ResponseEntity.ok().build();\n}`,
    },
    answer: "A",
    explanation:
      "Toma el ID de la URL sin verificar que sea el usuario autenticado. Un atacante cambia el ID para modificar el perfil de otro. Las demás usan el ID del usuario autenticado.",
  },

  // ── Prototype Pollution ────────────────────────────────
  {
    id: 23,
    language: "JavaScript",
    vulnerability: "Prototype Pollution",
    task: "Combinar config del usuario con defaults.",
    options: {
      A: `function merge(t, s) {\n  for (let k in s) {\n    if (typeof s[k]==='object') t[k]=merge(t[k]||{},s[k]);\n    else t[k]=s[k];\n  }\n  return t;\n}`,
      B: `const config = { ...defaults, ...userConfig };`,
      C: `const config = Object.assign({}, defaults, userConfig);`,
      D: `const config = structuredClone({...defaults,...userConfig});`,
    },
    answer: "A",
    explanation:
      "El merge recursivo no filtra claves. Con {\"__proto__\":{\"isAdmin\":true}} se contamina el prototipo de Object, afectando TODOS los objetos. Spread y assign no tocan prototipos.",
  },

  // ── NoSQL Injection ────────────────────────────────────
  {
    id: 24,
    language: "JavaScript",
    vulnerability: "NoSQL Injection",
    task: "Login con MongoDB.",
    options: {
      A: `const user = await users.findOne(req.body);`,
      B: `const user = await users.findOne({ email: String(req.body.email) });`,
      C: `const { email } = await schema.validateAsync(req.body);\nconst user = await users.findOne({ email });`,
      D: `if (typeof req.body.email !== 'string') return res.status(400).end();\nconst user = await users.findOne({ email: req.body.email });`,
    },
    answer: "A",
    explanation:
      "Pasa req.body directo a findOne(). Un atacante envía {\"email\":{\"$gt\":\"\"}} para que MongoDB devuelva el primer usuario. Se deben validar tipos antes de consultar.",
  },

  // ── Weak Crypto ────────────────────────────────────────
  {
    id: 25,
    language: "Go",
    vulnerability: "Criptografía Débil",
    task: "Hashear una contraseña.",
    options: {
      A: `hash := md5.Sum([]byte(password))\nresult := fmt.Sprintf("%x", hash)`,
      B: `hashed, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)`,
      C: `salt := make([]byte, 16)\nrand.Read(salt)\nhash := argon2.IDKey([]byte(password), salt, 1, 64*1024, 4, 32)`,
      D: `salt := make([]byte, 32)\nrand.Read(salt)\nhash, _ := scrypt.Key([]byte(password), salt, 32768, 8, 1, 32)`,
    },
    answer: "A",
    explanation:
      "MD5 es rápido y está roto. Con GPUs se prueban miles de millones por segundo. bcrypt, argon2 y scrypt son lentos a propósito, haciendo la fuerza bruta inviable.",
  },
  {
    id: 26,
    language: "Python",
    vulnerability: "Criptografía Débil",
    task: "Hashear contraseña para almacenar.",
    options: {
      A: `hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())`,
      B: `hashed = hashlib.sha256(password.encode()).hexdigest()`,
      C: `ph = PasswordHasher()\nhashed = ph.hash(password)`,
      D: `hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))`,
    },
    answer: "B",
    explanation:
      "SHA-256 es rápido y sin salt. Se pueden usar rainbow tables para revertirlo. bcrypt y argon2 incluyen salt automático y son lentos a propósito.",
  },

  // ── JWT Inseguro ───────────────────────────────────────
  {
    id: 27,
    language: "JavaScript",
    vulnerability: "JWT Inseguro",
    task: "Verificar token JWT del usuario.",
    options: {
      A: `const decoded = jwt.decode(token);\nif (decoded) { req.user = decoded; next(); }`,
      B: `req.user = jwt.verify(token, process.env.JWT_SECRET);\nnext();`,
      C: `req.user = jwt.verify(token, process.env.JWT_SECRET, {\n  algorithms: ['HS256']\n});\nnext();`,
      D: `req.user = jwt.verify(token, publicKey, {\n  algorithms: ['RS256'], issuer: 'auth.myapp.com'\n});\nnext();`,
    },
    answer: "A",
    explanation:
      "jwt.decode() NO verifica la firma. Un atacante crea un JWT falso con {role:'admin'} y es aceptado. jwt.verify() valida la firma criptográfica.",
  },

  // ── Session Fixation ───────────────────────────────────
  {
    id: 28,
    language: "PHP",
    vulnerability: "Session Fixation",
    task: "Iniciar sesión de usuario.",
    options: {
      A: `session_start();\n$_SESSION['user_id'] = $user->id;`,
      B: `session_start();\nsession_regenerate_id(true);\n$_SESSION['user_id'] = $user->id;`,
      C: `ini_set('session.cookie_httponly', 1);\nsession_start();\nsession_regenerate_id(true);\n$_SESSION['user_id'] = $user->id;`,
      D: `session_start();\nsession_regenerate_id(true);\n$_SESSION['user_id'] = $user->id;\n$_SESSION['ip'] = $_SERVER['REMOTE_ADDR'];`,
    },
    answer: "A",
    explanation:
      "No regenera el session ID tras login. Un atacante fija un ID conocido (vía enlace) y cuando la víctima inicia sesión, hereda su sesión. session_regenerate_id() crea uno nuevo.",
  },

  // ── Datos Sensibles ────────────────────────────────────
  {
    id: 29,
    language: "JavaScript",
    vulnerability: "Exposición de Datos Sensibles",
    task: "Almacenar token de autenticación.",
    options: {
      A: `localStorage.setItem('token', authToken);`,
      B: `// Servidor: Set-Cookie: token=xxx; HttpOnly; Secure`,
      C: `// Cookie HttpOnly — no accesible desde JavaScript`,
      D: `sessionStorage.setItem('token', authToken);`,
    },
    answer: "A",
    explanation:
      "localStorage es legible por cualquier script JS. Si hay XSS, el atacante lee el token. Una cookie HttpOnly no es accesible desde JavaScript.",
  },

  // ── Open Redirect ──────────────────────────────────────
  {
    id: 30,
    language: "C#",
    vulnerability: "Open Redirect",
    task: "Redirigir tras login.",
    options: {
      A: `return Redirect(model.ReturnUrl);`,
      B: `if (Url.IsLocalUrl(model.ReturnUrl))\n  return Redirect(model.ReturnUrl);\nreturn RedirectToAction("Index", "Home");`,
      C: `return LocalRedirect(model.ReturnUrl ?? "/");`,
      D: `var ok = new[]{ "/dashboard", "/profile" };\nreturn Redirect(ok.Contains(model.ReturnUrl) ? model.ReturnUrl : "/");`,
    },
    answer: "A",
    explanation:
      "Redirige a cualquier URL. Un atacante crea /login?ReturnUrl=https://evil.com que tras login envía al usuario a un sitio de phishing. Se debe validar que sea URL local.",
  },

  // ── Mass Assignment ────────────────────────────────────
  {
    id: 31,
    language: "Python",
    vulnerability: "Mass Assignment",
    task: "Actualizar perfil del usuario.",
    options: {
      A: `for key, val in request.json.items():\n  setattr(user, key, val)\ndb.session.commit()`,
      B: `allowed = ['name', 'bio']\nfor k,v in request.json.items():\n  if k in allowed: setattr(user, k, v)\ndb.session.commit()`,
      C: `user.name = request.json.get('name', user.name)\nuser.bio = request.json.get('bio', user.bio)\ndb.session.commit()`,
      D: `data = ProfileSchema().load(request.json)\nuser.name = data.get('name', user.name)\ndb.session.commit()`,
    },
    answer: "A",
    explanation:
      "Asigna TODOS los campos enviados sin filtrar. Un atacante envía {\"is_admin\":true} para escalar privilegios. Se debe usar allowlist de campos permitidos.",
  },

  // ── Race Condition ─────────────────────────────────────
  {
    id: 32,
    language: "Go",
    vulnerability: "Race Condition",
    task: "Contador de visitas web.",
    options: {
      A: `var counter int\nfunc handler(w http.ResponseWriter, r *http.Request) {\n  counter++\n  fmt.Fprintf(w, "Visitas: %d", counter)\n}`,
      B: `var (counter int; mu sync.Mutex)\nfunc handler(w http.ResponseWriter, r *http.Request) {\n  mu.Lock(); counter++; mu.Unlock()\n  fmt.Fprintf(w, "Visitas: %d", counter)\n}`,
      C: `var counter atomic.Int64\nfunc handler(w http.ResponseWriter, r *http.Request) {\n  fmt.Fprintf(w, "Visitas: %d", counter.Add(1))\n}`,
      D: `var counter int64\nfunc handler(w http.ResponseWriter, r *http.Request) {\n  fmt.Fprintf(w, "Visitas: %d", atomic.AddInt64(&counter, 1))\n}`,
    },
    answer: "A",
    explanation:
      "Varias goroutines leen y escriben counter a la vez (data race). Dos requests leen el mismo valor y ambos escriben +1, perdiendo un incremento. Mutex y atomic dan acceso exclusivo.",
  },

  // ── Type Juggling ──────────────────────────────────────
  {
    id: 33,
    language: "PHP",
    vulnerability: "Type Juggling",
    task: "Verificar código de acceso.",
    options: {
      A: `if ($_POST['code'] == $secret) grant_access();`,
      B: `if ($_POST['code'] === $secret) grant_access();`,
      C: `if (hash_equals($secret, $_POST['code'])) grant_access();`,
      D: `if ($_POST['code'] !== null && $_POST['code'] === $secret)\n  grant_access();`,
    },
    answer: "A",
    explanation:
      "== en PHP hace comparación loose. Si $secret es '0e12345' (hash MD5), PHP lo ve como 0. Enviar '0' pasa la comparación. === compara tipo y valor estrictamente.",
  },

  // ── CORS Inseguro ──────────────────────────────────────
  {
    id: 34,
    language: "JavaScript",
    vulnerability: "CORS Inseguro",
    task: "Configurar CORS para API.",
    options: {
      A: `app.use(cors({ origin: '*', credentials: true }));`,
      B: `app.use(cors({ origin: 'https://app.example.com', credentials: true }));`,
      C: `app.use(cors({\n  origin: ['https://app.example.com'],\n  methods: ['GET','POST'], credentials: true\n}));`,
      D: `app.use(cors({\n  origin: (o,cb) => ALLOWED.includes(o) ? cb(null,true) : cb(new Error('No')),\n  credentials: true\n}));`,
    },
    answer: "A",
    explanation:
      "origin:'*' con credentials:true permite que CUALQUIER sitio haga requests autenticados. Un atacante crea una página que roba datos del usuario con sus cookies.",
  },

  // ── File Upload ────────────────────────────────────────
  {
    id: 35,
    language: "PHP",
    vulnerability: "File Upload sin Validación",
    task: "Subir imagen de perfil.",
    options: {
      A: `move_uploaded_file(\n  $_FILES["img"]["tmp_name"],\n  "uploads/" . $_FILES["img"]["name"]);`,
      B: `$mime = mime_content_type($_FILES["img"]["tmp_name"]);\nif (!in_array($mime, ['image/jpeg','image/png'])) die("No");\n$n = bin2hex(random_bytes(16)).'.jpg';\nmove_uploaded_file($_FILES["img"]["tmp_name"], "uploads/".$n);`,
      C: `$ext = strtolower(pathinfo($_FILES["img"]["name"], PATHINFO_EXTENSION));\nif (!in_array($ext, ['jpg','png'])) die("No");\nmove_uploaded_file($_FILES["img"]["tmp_name"], "uploads/".uniqid().".".$ext);`,
      D: `$im = new Imagick($_FILES["img"]["tmp_name"]);\n$im->thumbnailImage(200,200);\n$im->writeImage("uploads/".uniqid().".jpg");`,
    },
    answer: "A",
    explanation:
      "Usa el nombre original sin validar tipo ni extensión. Un atacante sube 'shell.php' y lo ejecuta en uploads/shell.php. Se debe validar MIME y generar nombre aleatorio.",
  },

  // ── XXE ────────────────────────────────────────────────
  {
    id: 36,
    language: "Java",
    vulnerability: "XXE",
    task: "Parsear XML del usuario.",
    options: {
      A: `DocumentBuilderFactory.newInstance()\n  .newDocumentBuilder()\n  .parse(new InputSource(new StringReader(xml)));`,
      B: `DocumentBuilderFactory f = DocumentBuilderFactory.newInstance();\nf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);\nf.newDocumentBuilder().parse(new InputSource(new StringReader(xml)));`,
      C: `SAXParserFactory f = SAXParserFactory.newInstance();\nf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);\nf.newSAXParser();`,
      D: `XMLInputFactory f = XMLInputFactory.newInstance();\nf.setProperty(XMLInputFactory.SUPPORT_DTD, false);\nf.createXMLStreamReader(new StringReader(xml));`,
    },
    answer: "A",
    explanation:
      "Parser con config por defecto permite entidades externas. Un atacante incluye <!ENTITY xxe SYSTEM \"file:///etc/passwd\"> para leer archivos del servidor. Se deben deshabilitar DTDs.",
  },

  // ── SSTI ───────────────────────────────────────────────
  {
    id: 37,
    language: "Python",
    vulnerability: "SSTI",
    task: "Email de bienvenida personalizado.",
    options: {
      A: `template = f"<h1>Hola {name}</h1>"\nreturn render_template_string(template)`,
      B: `t = env.from_string("<h1>Hola {{ name }}</h1>")\nreturn t.render(name=name)`,
      C: `return render_template("welcome.html", name=name)`,
      D: `return f"<h1>Hola {escape(name)}</h1>"`,
    },
    answer: "A",
    explanation:
      "Interpola name ANTES de pasarlo al motor de templates. Si name es {{config.SECRET_KEY}}, Jinja2 lo ejecuta y revela el secreto. Se debe pasar name como variable, no en el string.",
  },

  // ── Timing Attack ──────────────────────────────────────
  {
    id: 38,
    language: "TypeScript",
    vulnerability: "Timing Attack",
    task: "Verificar un API key.",
    options: {
      A: `return provided === process.env.API_KEY;`,
      B: `const a = Buffer.from(process.env.API_KEY!);\nconst b = Buffer.from(provided);\nif (a.length !== b.length) return false;\nreturn timingSafeEqual(a, b);`,
      C: `const h1 = createHmac('sha256','k').update(provided).digest('hex');\nconst h2 = createHmac('sha256','k').update(process.env.API_KEY!).digest('hex');\nreturn h1 === h2;`,
      D: `const h = createHash('sha256').update(provided).digest();\nconst e = createHash('sha256').update(process.env.API_KEY!).digest();\nreturn timingSafeEqual(h, e);`,
    },
    answer: "A",
    explanation:
      "=== se detiene en el primer carácter diferente, tardando más cuantos más coincidan. Midiendo tiempos, un atacante deduce el key carácter a carácter. timingSafeEqual tarda siempre igual.",
  },

  // ── Log Injection ──────────────────────────────────────
  {
    id: 39,
    language: "Java",
    vulnerability: "Log Injection",
    task: "Registrar login fallido.",
    options: {
      A: `logger.info("Login fallido: " + username);`,
      B: `logger.info("Login fallido: {}", username.replaceAll("[\\n\\r]", "_"));`,
      C: `logger.info("Login fallido: {}", username.replaceAll("[^a-zA-Z0-9@._-]", ""));`,
      D: `logger.info("Login fallido: {}", sanitize(username));`,
    },
    answer: "A",
    explanation:
      "Username va directo al log. Un atacante inyecta 'admin\\nINFO Login exitoso: admin' para falsificar logs y ocultar actividad maliciosa. Se deben eliminar saltos de línea.",
  },

  // ── Integer Overflow ───────────────────────────────────
  {
    id: 40,
    language: "Go",
    vulnerability: "Integer Overflow",
    task: "Calcular precio total de pedido.",
    options: {
      A: `func total(qty int32, price int32) int32 {\n  return qty * price\n}`,
      B: `func total(qty, price int64) (int64, error) {\n  t := qty * price\n  if qty != 0 && t/qty != price { return 0, errors.New("overflow") }\n  return t, nil\n}`,
      C: `func total(qty, price int64) *big.Int {\n  return new(big.Int).Mul(big.NewInt(qty), big.NewInt(price))\n}`,
      D: `func total(qty, price int64) (int64, error) {\n  if qty > 0 && price > math.MaxInt64/qty { return 0, errors.New("overflow") }\n  return qty * price, nil\n}`,
    },
    answer: "A",
    explanation:
      "Con int32, 100000×50000=5 mil millones excede el máximo (2.147 millones), dando un número negativo. Un atacante paga menos. Las demás detectan o previenen el overflow.",
  },
];
