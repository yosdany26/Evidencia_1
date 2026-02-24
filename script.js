/* ============================================
   PROYECTO: TARJETA DE PRESENTACIÓN INTERACTIVA
   Estudiante: Yosdany Fanay
   Especialidad: Servicios Financieros
   ============================================ */

// 1. Datos de Usuario Personalizados
const userData = {
  name: "Servicios Financieros",
  title: "FNY Financial Solutions S.A.S.",
  location: "Colombia, Bogotá",
  email: "yosdany.fanay@finance.com",
  phone: "+34 600 000 000",
  bio: "Especialista en planificación estratégica y optimización de activos financieros. Ayudo a empresas y particulares a maximizar su rendimiento mediante soluciones seguras y personalizadas.",
  avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300",
  skills: [
    { name: "Gestión de Activos", level: 95, category: "finance" },
    { name: "Análisis de Riesgo", level: 90, category: "finance" },
    { name: "Planificación Fiscal", level: 85, category: "legal" },
    { name: "Estrategias de Inversión", level: 98, category: "finance" },
    { name: "Tecnología Fintech", level: 80, category: "tools" },
    { name: "Mercados Globales", level: 92, category: "finance" }
  ],
  social: [
    { platform: "LinkedIn", url: "https://linkedin.com/", icon: "💼" },
    { platform: "Forbes", url: "https://forbes.com/", icon: "🏛️" },
    { platform: "Twitter", url: "https://twitter.com/", icon: "📈" }
  ]
};

// 2. Referencias al DOM (Selección de elementos del HTML)
const elements = {
  userName: document.getElementById('userName'),
  userTitle: document.getElementById('userTitle'),
  userLocation: document.getElementById('userLocation'),
  userEmail: document.getElementById('userEmail'),
  userPhone: document.getElementById('userPhone'),
  userBio: document.getElementById('userBio'),
  avatarImg: document.getElementById('avatarImg'),
  skillsList: document.getElementById('skillsList'),
  socialLinks: document.getElementById('socialLinks'),
  statsContainer: document.getElementById('stats'),
  themeToggle: document.getElementById('themeToggle'),
  copyEmailBtn: document.getElementById('copyEmailBtn'),
  toggleSkills: document.getElementById('toggleSkills'),
  toast: document.getElementById('toast'),
  toastMessage: document.getElementById('toastMessage')
};

// 3. Función para Renderizar Información Básica (Uso de Destructuring)
const renderBasicInfo = () => {
  const { name, title, location, email, phone, bio, avatar } = userData;
  
  elements.userName.textContent = name;
  elements.userTitle.textContent = title;
  elements.userLocation.textContent = `📍 ${location}`;
  elements.userEmail.textContent = email;
  elements.userPhone.textContent = phone;
  elements.userBio.textContent = bio;
  elements.avatarImg.src = avatar;
  
  // Respaldo si falla la imagen
  elements.avatarImg.onerror = () => {
    elements.avatarImg.src = `https://ui-avatars.com/api/?name=Yosdany+Fanay&background=0D8ABC&color=fff`;
  };
};

// 4. Función para Renderizar Habilidades (Uso de Array Methods)
const renderSkills = (showAll = false) => {
  const skillsToShow = showAll ? userData.skills : userData.skills.slice(0, 4);
  
  elements.skillsList.innerHTML = skillsToShow.map(skill => `
    <div class="skill-item">
      <div class="skill-name">${skill.name}</div>
      <div class="skill-level">
        <span>${skill.level}%</span>
        <div class="skill-bar">
          <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
        </div>
      </div>
    </div>
  `).join('');
};

// 5. Función para Renderizar Redes Sociales
const renderSocialLinks = () => {
  elements.socialLinks.innerHTML = userData.social.map(({ url, icon, platform }) => `
    <a href="${url}" class="social-link" target="_blank" rel="noopener noreferrer">
      <span>${icon}</span>
      <span>${platform}</span>
    </a>
  `).join('');
};

// 6. Calcular y Renderizar Estadísticas (Uso de Reduce)
const renderStats = () => {
  const totalSkills = userData.skills.length;
  const avgLevel = Math.round(userData.skills.reduce((acc, curr) => acc + curr.level, 0) / totalSkills);
  const activeSocial = userData.social.length;

  const stats = [
    { label: "Habilidades", value: totalSkills },
    { label: "Nivel Promedio", value: `${avgLevel}%` },
    { label: "Redes Activas", value: activeSocial }
  ];

  elements.statsContainer.innerHTML = stats.map(stat => `
    <div class="stat-item">
      <span class="stat-value">${stat.value}</span>
      <span class="stat-label">${stat.label}</span>
    </div>
  `).join('');
};

// 7. Funcionalidad de Portapapeles (Toast)
const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(userData.email);
    showToast("¡Email copiado al portapapeles! 📈");
  } catch (err) {
    console.error("Error al copiar:", err);
  }
};

const showToast = (msg) => {
  elements.toastMessage.textContent = msg;
  elements.toast.classList.add('show');
  setTimeout(() => elements.toast.classList.remove('show'), 3000);
};

// 8. Gestión de Tema (Dark/Light Mode con LocalStorage)
const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  elements.themeToggle.querySelector('.theme-icon').textContent = newTheme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('preferred-theme', newTheme);
};

// 9. Inicialización de la Aplicación
const init = () => {
  // Cargar tema guardado
  const savedTheme = localStorage.getItem('preferred-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  elements.themeToggle.querySelector('.theme-icon').textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  // Renderizar todo
  renderBasicInfo();
  renderSkills();
  renderSocialLinks();
  renderStats();

  // Event Listeners
  elements.themeToggle.addEventListener('click', toggleTheme);
  elements.copyEmailBtn.addEventListener('click', copyEmail);
  
  let isExpanded = false;
  elements.toggleSkills.addEventListener('click', () => {
    isExpanded = !isExpanded;
    renderSkills(isExpanded);
    elements.toggleSkills.textContent = isExpanded ? "Ver menos" : "Ver más";
  });

  console.log("Card initialized for Yosdany Fanay");
};

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', init);