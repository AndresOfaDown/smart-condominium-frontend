# Smart Condominium - Frontend React

Sistema de gestión inteligente para condominios con funcionalidades de administración, seguridad con IA, finanzas y más.

## 🚀 Características

- **Dashboard Administrativo**: Visualización de estadísticas financieras y de seguridad
- **Gestión Financiera**: Control de pagos, cuotas y morosidad
- **Seguridad con IA**: 
  - Reconocimiento facial
  - Lectura de placas vehiculares (OCR)
  - Registro automático de visitantes
  - Detección de anomalías
- **Gestión de Usuarios**: Administración de residentes y unidades
- **Áreas Comunes**: Sistema de reservas
- **Comunicaciones**: Publicación de avisos
- **Mantenimiento**: Gestión de tareas preventivas y correctivas
- **Reportes y Analítica**: Indicadores visuales y reportes

## 🛠️ Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **Recharts** - Gráficos y visualizaciones
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos
- **Framer Motion** - Animaciones

## 📁 Estructura del Proyecto (Feature-Based)

```
src/
├── features/              # Módulos por funcionalidad
│   ├── auth/             # Autenticación
│   ├── dashboard/        # Dashboard principal
│   ├── finances/         # Gestión financiera
│   ├── users/            # Gestión de usuarios
│   ├── security/         # Seguridad e IA
│   ├── common-areas/     # Áreas comunes
│   ├── communications/   # Comunicaciones
│   └── maintenance/      # Mantenimiento
├── shared/               # Código compartido
│   ├── components/       # Componentes reutilizables
│   │   ├── ui/          # Componentes UI básicos
│   │   └── layout/      # Componentes de layout
│   ├── services/        # Servicios API
│   └── utils/           # Utilidades
├── styles/              # Estilos globales
└── App.jsx             # Componente raíz
```

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio (si aplica)
cd smart-condominium-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL de tu backend Django
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

### Producción

```bash
# Construir para producción
npm run build

# Vista previa de la build
npm run preview
```

## 🔐 Autenticación

El sistema usa autenticación basada en tokens JWT. Para conectar con tu backend Django:

1. Configura `VITE_API_BASE_URL` en el archivo `.env`
2. Asegúrate de que tu backend Django tenga configurado CORS
3. El frontend enviará el token en el header `Authorization: Bearer <token>`

### Login Demo

Para propósitos de demostración, puedes usar cualquier usuario/contraseña. El sistema está configurado con un mock de autenticación que se puede reemplazar fácilmente con llamadas reales a tu API Django.

## 🎨 Sistema de Diseño

El proyecto incluye un sistema de diseño completo con:

- **Tema oscuro** con colores vibrantes
- **Glassmorphism** para efectos de vidrio esmerilado
- **Animaciones suaves** con CSS y Framer Motion
- **Componentes reutilizables**: Button, Card, Input, Modal
- **Grid system** responsivo
- **Utilidades CSS** para desarrollo rápido

## 📡 Integración con Backend Django

### Configuración de API

El archivo `src/shared/services/api.js` contiene la configuración de Axios:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';
```

### Endpoints Esperados

El frontend espera los siguientes endpoints en tu backend:

- `POST /api/auth/login` - Autenticación
- `GET /api/dashboard/stats` - Estadísticas del dashboard
- `GET /api/finances/payments` - Listado de pagos
- `GET /api/security/cameras` - Cámaras activas
- Y más...

## 🔧 Personalización

### Colores

Los colores se definen en `src/styles/index.css` usando CSS custom properties:

```css
:root {
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  /* ... más colores */
}
```

### Componentes

Todos los componentes UI están en `src/shared/components/ui/` y pueden ser personalizados fácilmente.

## 📝 Próximos Pasos

- [ ] Conectar con API Django real
- [ ] Implementar formularios completos en cada módulo
- [ ] Agregar tests unitarios
- [ ] Implementar WebSockets para notificaciones en tiempo real
- [ ] Agregar más gráficos y visualizaciones
- [ ] Implementar modo claro/oscuro toggle

## 🤝 Contribución

Este es un proyecto académico para la materia de Sistemas de Información II - UAGRM FICCT.

## 📄 Licencia

Este proyecto es parte de un examen académico.

---

Desarrollado con ❤️ para Smart Condominium
