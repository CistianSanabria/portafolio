# CONTINUIDAD_PORTAFOLIO.md
> Diagnóstico completo del sitio — Portafolio de Cristian Sanabria  
> Fecha: 2026-04-13

---

## RESUMEN EJECUTIVO

El sitio es un portafolio personal construido con HTML5/CSS3/JS vanilla (sin frameworks ni dependencias externas). El código es limpio y bien estructurado, con un diseño glassmorphism en modo claro y oscuro. Sin embargo, existen **3 bugs críticos que bloquean funcionalidad real**, incluyendo uno con fecha de expiración concreta (9 días). Además hay problemas de accesibilidad y SEO que deben resolverse antes de compartir el sitio con empleadores o clientes.

**Estado general: Funcional en desktop, roto en mobile. Dark mode con defectos visuales. Imagen de perfil a punto de expirar.**

---

## STACK TECNOLÓGICO

| Capa | Tecnología |
|------|-----------|
| Markup | HTML5 semántico |
| Estilos | CSS3 con variables, Grid, Flexbox, backdrop-filter |
| Lógica | JavaScript ES6+ vanilla |
| Fuentes | System fonts (sin dependencias externas) |
| Imagen de perfil | LinkedIn CDN (URL temporal con expiración) |
| Control de versiones | Git |

**Archivos principales:**

- [index.html](index.html) — 221 líneas
- [styles.css](styles.css) — 547 líneas
- [script.js](script.js) — 145 líneas

---

## BUGS ENCONTRADOS

### BUG #1 — CRÍTICO | Menú mobile completamente roto
- **Archivo:** [script.js](script.js#L112) y [styles.css](styles.css)
- **Descripción:** El JS agrega la clase `.nav-menu.active` al hacer clic en el hamburger, pero el CSS **no tiene ninguna regla para ese estado**. El menú permanece invisible tanto abierto como cerrado.
- **Impacto:** El menú de navegación no funciona en ningún dispositivo móvil o tablet.
- **Fix requerido:** Agregar en CSS:
  ```css
  @media (max-width: 768px) {
    .nav-menu.active {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      background: var(--glass-bg);
    }
  }
  ```

---

### BUG #2 — CRÍTICO | Tags del modal ilegibles en dark mode
- **Archivo:** [script.js](script.js#L80)
- **Descripción:** Los tags del modal de proyectos se generan con colores hardcodeados para modo claro (`background: #f5f5f5; color: #666`). En dark mode, el texto casi desaparece contra el fondo oscuro `#0a0a0a`.
- **Impacto:** Usuarios en dark mode (que en macOS es la mayoría por defecto) no pueden leer las etiquetas de tecnología en el modal.
- **Línea exacta:**
  ```javascript
  // script.js:80 — colores hardcodeados, no respetan el tema
  tagsHtml += `<span style="background: #f5f5f5; color: #666; ...">`;
  ```
- **Fix requerido:** Reemplazar inline styles con una clase CSS que use variables:
  ```css
  .modal-tag {
    background: var(--bg-tertiary);
    color: var(--text-secondary);
  }
  ```

---

### BUG #3 — CRÍTICO | Imagen de perfil expira el 23 de abril de 2026
- **Archivo:** [index.html](index.html#L39)
- **Descripción:** La imagen del hero proviene de LinkedIn CDN con el parámetro `e=1776902400` (timestamp Unix = 23 abril 2026). En **10 días** la URL devolverá error y el hero quedará con un espacio vacío.
- **Impacto:** El primer elemento visual del sitio desaparece sin aviso.
- **Fix requerido:** Descargar la foto y hostearla localmente en `/assets/foto-perfil.jpg` antes del 23 de abril.

---

## PRIORIDADES VISUALES Y DE EXPERIENCIA

### ALTA — Afecta funcionalidad o primera impresión directamente

| # | Problema | Archivo | Línea |
|---|----------|---------|-------|
| 1 | Menú mobile roto (ver Bug #1) | [styles.css](styles.css) | falta regla |
| 2 | Tags ilegibles en dark mode (ver Bug #2) | [script.js](script.js#L80) | 80 |
| 3 | Imagen de perfil expira en 10 días (ver Bug #3) | [index.html](index.html#L39) | 39 |
| 4 | Sin focus states en elementos interactivos — teclado invisible | [styles.css](styles.css) | 92, 104, 182, 409, 420 |
| 5 | Botón cerrar modal sin `aria-label` — inaccesible con lector de pantalla | [index.html](index.html#L210) | 210 |

---

### MEDIA — Afecta SEO, compartibilidad y profesionalismo

| # | Problema | Archivo | Línea |
|---|----------|---------|-------|
| 1 | Sin `<meta name="description">` — SEO y previsualizaciones vacías | [index.html](index.html#L6) | head |
| 2 | Sin Open Graph tags (`og:title`, `og:image`, `og:description`) — mal preview en LinkedIn/WhatsApp | [index.html](index.html#L6) | head |
| 3 | Sin favicon — el navegador pide `/favicon.ico` y obtiene 404 | [index.html](index.html#L6) | head |
| 4 | `.DS_Store` trackeado en git — no debería estar en el repositorio | .gitignore | falta archivo |
| 5 | Sin `.gitignore` — cualquier `node_modules` o archivo sensible puede commitearse accidentalmente | — | falta archivo |

---

### BAJA — Mejoras de calidad, estándares y mantenibilidad

| # | Problema | Archivo | Línea |
|---|----------|---------|-------|
| 1 | Gradientes de proyectos como `inline style` en HTML — violan separación de responsabilidades | [index.html](index.html#L55) | 55, 73, 91, 109, 127 |
| 2 | Código de lazy loading sin uso (IntersectionObserver configurado pero ninguna imagen usa `data-src`) | [script.js](script.js#L133) | 133–145 |
| 3 | Sintaxis mixta en JS (concatenación con `+` y template literals mezclados) | [script.js](script.js#L76) | 76, 80 |
| 4 | Sin `<link rel="preconnect">` ni `dns-prefetch` para el CDN de LinkedIn | [index.html](index.html#L6) | head |
| 5 | Tarjetas de proyectos sin imágenes reales — placeholders de color en vez de capturas | [index.html](index.html#L55) | 55–143 |
| 6 | Proyectos sin links a casos de estudio detallados | [index.html](index.html#L55) | 55–143 |

---

## MAPA DE ARCHIVOS POR PROBLEMA

| Problema | Archivo | Líneas | Severidad |
|----------|---------|--------|-----------|
| Menú mobile sin CSS | [styles.css](styles.css) | falta regla | CRÍTICO |
| Tags modal dark mode | [script.js](script.js#L80) | 80 | CRÍTICO |
| Imagen de perfil expira | [index.html](index.html#L39) | 39 | CRÍTICO |
| Sin focus states | [styles.css](styles.css) | 92, 104, 182, 409, 420 | ALTA |
| Close button sin aria-label | [index.html](index.html#L210) | 210 | ALTA |
| Sin meta description | [index.html](index.html#L6) | head | MEDIA |
| Sin OG tags | [index.html](index.html#L6) | head | MEDIA |
| Sin favicon | [index.html](index.html#L6) | head | MEDIA |
| .DS_Store en git | `.git` | — | MEDIA |
| Sin .gitignore | — | — | MEDIA |
| Gradientes inline | [index.html](index.html#L55) | 55, 73, 91, 109, 127 | BAJA |
| Lazy loading sin uso | [script.js](script.js#L133) | 133–145 | BAJA |
| Sintaxis JS mixta | [script.js](script.js#L76) | 76, 80 | BAJA |

---

## CHECKLIST DE ACCIÓN

### Esta semana (antes del 23 abril)
- [ ] Descargar foto de perfil y hostearla localmente
- [ ] Corregir CSS del menú mobile (`.nav-menu.active`)
- [ ] Reemplazar colores hardcodeados en tags del modal
- [ ] Crear `.gitignore` y eliminar `.DS_Store` del historial

### Próximas sesiones
- [ ] Agregar `:focus-visible` a todos los elementos interactivos
- [ ] Agregar `aria-label="Cerrar"` al botón del modal
- [ ] Agregar `<meta name="description">` y Open Graph tags
- [ ] Agregar favicon
- [ ] Reemplazar gradientes de tarjetas por capturas reales de proyectos

### Backlog de calidad
- [ ] Mover gradientes inline de HTML a clases CSS
- [ ] Limpiar código dead (lazy loading sin uso)
- [ ] Homogeneizar sintaxis JS (template literals consistentes)
- [ ] Agregar `preconnect`/`dns-prefetch` para recursos externos

---

*Generado con análisis estático del código fuente — 2026-04-13*
