# Laboratorio 2: Búsqueda y Filtros con Algolia - CiberNova

## Documentación y Justificación UI/UX

**1. Decisiones de Diseño (UI)**
Los componentes predeterminados de Algolia (mediante `react-instantsearch`) fueron adaptados para alinearse completamente con el sistema de diseño y la paleta de colores del Proyecto I (CiberNova).
Se sobrescribieron los estilos nativos del tema `satellite.css` utilizando CSS Modules y variables CSS globales (`--color-primary`, `--color-surface`).
Se eliminaron los rellenos (`padding`) y márgenes automáticos de las listas de Algolia (`.ais-Hits-list`) para integrar las tarjetas de productos dentro de una cuadrícula CSS personalizada (CSS Grid), asegurando que los inputs, botones de limpieza y resultados mantuvieran la identidad visual (bordes redondeados y sombras suaves) sin parecer un plugin externo de terceros.

**2. Experiencia de Usuario (UX)**
La disposición de los elementos fue diseñada para minimizar la fricción en el proceso de compra:
* **Escritorio:** Se implementó una barra lateral izquierda (Sidebar) para los filtros, siguiendo el estándar de lectura occidental en e-commerce.
* Esto permite al usuario refinar por precio o categoría antes de procesar visualmente el catálogo.
* La barra de búsqueda corona los resultados para consultas directas, y la paginación cierra el flujo natural de navegación al final de la página.
* 
* **Móvil (Responsive):** Mediante `flex-direction: column`, los filtros se apilan estratégicamente en la parte superior. Esto evita que el usuario tenga que hacer *scroll* a través de decenas de productos irrelevantes antes de poder acotar su búsqueda, mejorando la retención y la experiencia de navegación táctil[cite: 8].

**3. Manejo de Estados (Empty State)**
Para evitar frustración cuando una combinación de filtros o búsqueda no arroja coincidencias, se implementó un manejador de estado personalizado (`EmptyViewResults`).

En lugar de mostrar una página rota o en blanco, la interfaz oculta la cuadrícula y la paginación, renderizando un contenedor centrado con un mensaje amigable ("No encontramos resultados").

Este diseño incluye retroalimentación activa, invitando al usuario a ajustar sus parámetros de categoría o precio para continuar explorando el catálogo, manteniendo así al cliente dentro del flujo de la tienda.
