// ========================================
// VERIFICACIÓN DE AUTENTICACIÓN Y ROL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Admin Dashboard TECNM cargado correctamente');
    
    // Verificar autenticación
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    const userRole = sessionStorage.getItem('userRole');
    
    if (!isAuthenticated || userRole !== 'admin') {
        console.log('⚠️ Acceso denegado. Redirigiendo al login...');
        showNotification('Acceso restringido solo para administradores', 'error');
        setTimeout(() => {
            window.location.href = 'Login.html';
        }, 1500);
        return;
    }
    
    console.log('✓ Usuario administrador autenticado');
    initializeAdminDashboard();
});

// ========================================
// INICIALIZACIÓN DEL DASHBOARD
// ========================================

function initializeAdminDashboard() {
    console.log('🚀 Inicializando dashboard de administrador...');
    
    loadAdminInfo();
    setupNavigation();
    setupLogout();
    updateDashboardStats();
    setupNotifications();
    
    // Dar tiempo al DOM para cargar completamente
    setTimeout(() => {
        console.log('⏱️ Configurando módulo de estudiantes (con delay)...');
        setupStudentsModule();
    }, 500);
    
    console.log('✓ Dashboard de administrador inicializado');
}

// ========================================
// CARGAR INFORMACIÓN DEL ADMINISTRADOR
// ========================================

function loadAdminInfo() {
    const adminName = sessionStorage.getItem('adminName') || 'Administrador';
    const adminEmail = sessionStorage.getItem('adminEmail') || 'admin@tecnm.mx';
    
    // Actualizar nombre en el header
    const adminNameElement = document.getElementById('adminName');
    if (adminNameElement) {
        adminNameElement.textContent = adminName;
    }
    
    console.log(`✓ Sesión activa: ${adminName} (${adminEmail})`);
}

// ========================================
// NAVEGACIÓN DEL SIDEBAR
// ========================================

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sectionName = this.getAttribute('data-section');
            
            // Remover active de todos los nav-items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Agregar active al nav-item clickeado
            this.classList.add('active');
            
            // Cambiar sección de contenido
            changeSection(sectionName);
        });
    });
    
    console.log('✓ Navegación configurada');
}

function changeSection(sectionName) {
    // Ocultar todas las secciones
    const allSections = document.querySelectorAll('.section-content');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Actualizar título del header
        updateHeaderTitle(sectionName);
        
        // Si es la sección de estudiantes, recargar la tabla
        if (sectionName === 'estudiantes') {
            console.log('📊 Recargando módulo de estudiantes...');
            setTimeout(() => {
                loadStudents();
            }, 100);
        }
        
        console.log(`📍 Navegando a: ${sectionName.toUpperCase()}`);
        showNotification(`Navegando a ${getSectionTitle(sectionName)}`, 'info');
    }
}

function updateHeaderTitle(sectionName) {
    const pageTitle = document.getElementById('pageTitle');
    const pageSubtitle = document.getElementById('pageSubtitle');
    
    const titles = {
        'dashboard': {
            title: 'Dashboard Administrativo',
            subtitle: 'Vista general del sistema'
        },
        'solicitudes': {
            title: 'Gestión de Solicitudes',
            subtitle: 'Administra las solicitudes de becas'
        },
        'estudiantes': {
            title: 'Base de Datos de Estudiantes',
            subtitle: 'Administra la información de estudiantes'
        },
        'becas': {
            title: 'Catálogo de Becas',
            subtitle: 'Gestiona los programas de becas disponibles'
        },
        'reportes': {
            title: 'Reportes y Estadísticas',
            subtitle: 'Genera reportes detallados del sistema'
        },
        'configuracion': {
            title: 'Configuración del Sistema',
            subtitle: 'Ajusta parámetros y configuraciones generales'
        }
    };
    
    if (titles[sectionName]) {
        if (pageTitle) pageTitle.textContent = titles[sectionName].title;
        if (pageSubtitle) pageSubtitle.textContent = titles[sectionName].subtitle;
    }
}

function getSectionTitle(sectionName) {
    const titles = {
        'dashboard': 'Dashboard',
        'solicitudes': 'Solicitudes',
        'estudiantes': 'Estudiantes',
        'becas': 'Becas',
        'reportes': 'Reportes',
        'configuracion': 'Configuración'
    };
    return titles[sectionName] || sectionName;
}

// ========================================
// ACTUALIZAR ESTADÍSTICAS DEL DASHBOARD
// ========================================

function updateDashboardStats() {
    // Simular carga de estadísticas desde el servidor
    const stats = {
        totalStudents: 1234,
        pendingRequests: 47,
        approvedScholarships: 892,
        budget: '$2.5M'
    };
    
    // Animar números con efecto de conteo
    animateValue('totalStudents', 0, stats.totalStudents, 2000);
    animateValue('pendingRequests', 0, stats.pendingRequests, 1500);
    animateValue('approvedScholarships', 0, stats.approvedScholarships, 2500);
    
    console.log('✓ Estadísticas actualizadas');
    console.log('📊 Dashboard Stats:', stats);
}

function animateValue(id, start, end, duration) {
    const element = document.getElementById(id);
    if (!element) return;
    
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// ========================================
// SISTEMA DE NOTIFICACIONES
// ========================================

function setupNotifications() {
    const notificationBtn = document.getElementById('notificationBtn');
    
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function() {
            showNotification('Panel de notificaciones en desarrollo', 'info');
        });
    }
}

function showNotification(message, type) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Estilos
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '12px';
    notification.style.color = 'white';
    notification.style.fontWeight = '600';
    notification.style.fontSize = '14px';
    notification.style.zIndex = '9999';
    notification.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
    notification.style.animation = 'slideIn 0.3s ease-out';
    notification.style.minWidth = '300px';
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
    } else if (type === 'info') {
        notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// CERRAR SESIÓN
// ========================================

function setupLogout() {
    const logoutBtn = document.querySelector('.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                console.log('🚪 Cerrando sesión de administrador...');
                
                // Limpiar sesión
                sessionStorage.clear();
                
                showNotification('Cerrando sesión...', 'info');
                setTimeout(() => {
                    window.location.href = 'Login.html';
                }, 1000);
            }
        });
    }
}

// ========================================
// ATAJOS DE TECLADO
// ========================================

document.addEventListener('keydown', function(e) {
    // Ctrl + D = Dashboard
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        document.querySelector('.nav-item[data-section="dashboard"]').click();
    }
    
    // Ctrl + S = Solicitudes
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        document.querySelector('.nav-item[data-section="solicitudes"]').click();
    }
    
    // Ctrl + E = Estudiantes
    if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        document.querySelector('.nav-item[data-section="estudiantes"]').click();
    }
    
    // Ctrl + B = Becas
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        document.querySelector('.nav-item[data-section="becas"]').click();
    }
    
    // Ctrl + R = Reportes
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        document.querySelector('.nav-item[data-section="reportes"]').click();
    }
});

// ========================================
// MENSAJE DE BIENVENIDA Y DEBUG
// ========================================

setTimeout(() => {
    const adminName = sessionStorage.getItem('adminName') || 'Administrador';
    showNotification(`¡Bienvenido ${adminName}! 👋`, 'success');
    
    // Debug: Verificar que el botón existe
    setTimeout(() => {
        const btn = document.getElementById('btnAddStudent');
        if (btn) {
            console.log('✅ DEBUG: Botón btnAddStudent existe en el DOM');
            console.log('📍 Ubicación del botón:', btn);
        } else {
            console.error('❌ DEBUG: Botón btnAddStudent NO existe en el DOM');
        }
    }, 1000);
}, 500);

// ========================================
// INFORMACIÓN EN CONSOLA
// ========================================

console.log('╔════════════════════════════════════════╗');
console.log('║     PANEL DE ADMINISTRACIÓN TECNM     ║');
console.log('╚════════════════════════════════════════╝');
console.log('\n🔐 ATAJOS DE TECLADO:');
console.log('  Ctrl + D → Dashboard');
console.log('  Ctrl + S → Solicitudes');
console.log('  Ctrl + E → Estudiantes');
console.log('  Ctrl + B → Becas');
console.log('  Ctrl + R → Reportes');
console.log('\n✓ Sistema listo para administrar');
console.log('════════════════════════════════════════\n');

// ========================================
// MÓDULO DE GESTIÓN DE ESTUDIANTES
// ========================================

function setupStudentsModule() {
    console.log('🔧 Configurando módulo de estudiantes...');
    
    // Cargar estudiantes desde localStorage
    loadStudents();
    
    // Botón de agregar estudiante
    const btnAddStudent = document.getElementById('btnAddStudent');
    if (btnAddStudent) {
        console.log('✓ Botón de agregar estudiante encontrado');
        btnAddStudent.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🖱️ Clic en botón Registrar Estudiante');
            openStudentModal();
        });
    } else {
        console.error('❌ No se encontró el botón btnAddStudent');
    }
    
    // Formulario de registro
    const studentForm = document.getElementById('studentForm');
    if (studentForm) {
        console.log('✓ Formulario de registro encontrado');
        studentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📝 Enviando formulario de registro');
            handleStudentSubmit(e);
        });
    } else {
        console.error('❌ No se encontró el formulario studentForm');
    }
    
    // Formulario de edición
    const editStudentForm = document.getElementById('editStudentForm');
    if (editStudentForm) {
        editStudentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEditStudentSubmit(e);
        });
    }
    
    // Búsqueda
    const searchStudent = document.getElementById('searchStudent');
    if (searchStudent) {
        searchStudent.addEventListener('input', filterStudents);
    }
    
    // Validación de matrícula en tiempo real
    const studentMatricula = document.getElementById('studentMatricula');
    if (studentMatricula) {
        studentMatricula.addEventListener('input', function(e) {
            // Solo números
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Validar si ya existe
            if (this.value.length === 8) {
                const students = getStudentsFromStorage();
                if (students[this.value]) {
                    this.style.borderColor = '#ef4444';
                    showNotification('Esta matrícula ya está registrada', 'error');
                } else {
                    this.style.borderColor = '#10b981';
                }
            }
        });
    }
    
    console.log('✅ Módulo de estudiantes configurado completamente');
}

// Obtener estudiantes desde localStorage
function getStudentsFromStorage() {
    const studentsData = localStorage.getItem('tecnm_students');
    return studentsData ? JSON.parse(studentsData) : {};
}

// Guardar estudiantes en localStorage
function saveStudentsToStorage(students) {
    localStorage.setItem('tecnm_students', JSON.stringify(students));
}

// Cargar estudiantes en la tabla
function loadStudents() {
    const students = getStudentsFromStorage();
    const studentsList = Object.entries(students);
    
    const tableBody = document.getElementById('studentsTableBody');
    const emptyState = document.getElementById('emptyState');
    const tableContainer = document.querySelector('.students-table-container');
    const totalCount = document.getElementById('totalStudentsCount');
    
    if (!tableBody) return;
    
    // Actualizar contador
    if (totalCount) {
        totalCount.textContent = studentsList.length;
    }
    
    if (studentsList.length === 0) {
        // Mostrar estado vacío
        if (tableContainer) tableContainer.style.display = 'none';
        if (emptyState) emptyState.style.display = 'flex';
        return;
    }
    
    // Ocultar estado vacío y mostrar tabla
    if (tableContainer) tableContainer.style.display = 'block';
    if (emptyState) emptyState.style.display = 'none';
    
    // Limpiar tabla
    tableBody.innerHTML = '';
    
    // Llenar tabla
    studentsList.forEach(([matricula, student]) => {
        const row = document.createElement('tr');
        row.setAttribute('data-matricula', matricula);
        
        row.innerHTML = `
            <td><strong>${matricula}</strong></td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.registrationDate || 'N/A'}</td>
            <td><span class="student-status active">Activo</span></td>
            <td>
                <div class="student-actions">
                    <button class="action-btn edit" onclick="openEditStudentModal('${matricula}')" title="Editar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="action-btn reset" onclick="resetStudentPassword('${matricula}')" title="Restablecer contraseña">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                        </svg>
                    </button>
                    <button class="action-btn delete" onclick="deleteStudent('${matricula}')" title="Eliminar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    console.log(`✓ ${studentsList.length} estudiantes cargados en la tabla`);
}

// Abrir modal de registro
function openStudentModal() {
    console.log('📂 Abriendo modal de registro de estudiante...');
    
    const modal = document.getElementById('studentModal');
    
    if (!modal) {
        console.error('❌ Modal studentModal no encontrado en el DOM');
        showNotification('Error: Modal no encontrado', 'error');
        return;
    }
    
    console.log('✓ Modal encontrado, mostrando...');
    modal.style.display = 'flex';
    
    // Limpiar formulario
    const form = document.getElementById('studentForm');
    if (form) {
        form.reset();
        console.log('✓ Formulario limpiado');
    }
    
    const matriculaInput = document.getElementById('studentMatricula');
    if (matriculaInput) {
        matriculaInput.style.borderColor = '#e5e7eb';
    }
    
    console.log('✅ Modal abierto correctamente');
}

// Cerrar modal de registro
function closeStudentModal() {
    const modal = document.getElementById('studentModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Manejar envío del formulario de registro
function handleStudentSubmit(e) {
    e.preventDefault();
    
    const matricula = document.getElementById('studentMatricula').value.trim();
    const name = document.getElementById('studentName').value.trim();
    const email = document.getElementById('studentEmail').value.trim();
    
    // Validaciones
    if (matricula.length !== 8) {
        showNotification('La matrícula debe tener 8 dígitos', 'error');
        return;
    }
    
    const students = getStudentsFromStorage();
    
    // Verificar si ya existe
    if (students[matricula]) {
        showNotification('Esta matrícula ya está registrada', 'error');
        return;
    }
    
    // Crear nuevo estudiante
    const newStudent = {
        name: name,
        email: email,
        role: 'student',
        registrationDate: new Date().toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    };
    
    // Guardar estudiante
    students[matricula] = newStudent;
    saveStudentsToStorage(students);
    
    // Establecer contraseña por defecto
    localStorage.setItem(`userPassword_${matricula}`, 'tecnm2025');
    
    // IMPORTANTE: Guardar el email individualmente para que aparezca en el perfil
    localStorage.setItem(`userEmail_${matricula}`, email);
    
    console.log(`✓ Estudiante guardado con email: ${email}`);
    
    // Recargar tabla
    loadStudents();
    
    // Cerrar modal
    closeStudentModal();
    
    // Notificación de éxito
    showNotification(`✅ Estudiante ${name} registrado exitosamente con matrícula ${matricula}`, 'success');
    
    console.log(`✓ Nuevo estudiante registrado: ${matricula} - ${name} - ${email}`);
}

// Abrir modal de edición
function openEditStudentModal(matricula) {
    const students = getStudentsFromStorage();
    const student = students[matricula];
    
    if (!student) {
        showNotification('Estudiante no encontrado', 'error');
        return;
    }
    
    // Llenar formulario
    document.getElementById('editStudentMatricula').value = matricula;
    document.getElementById('editStudentName').value = student.name;
    document.getElementById('editStudentEmail').value = student.email;
    
    // Mostrar modal
    const modal = document.getElementById('editStudentModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// Cerrar modal de edición
function closeEditStudentModal() {
    const modal = document.getElementById('editStudentModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Manejar envío del formulario de edición
function handleEditStudentSubmit(e) {
    e.preventDefault();
    
    const matricula = document.getElementById('editStudentMatricula').value;
    const name = document.getElementById('editStudentName').value.trim();
    const email = document.getElementById('editStudentEmail').value.trim();
    
    const students = getStudentsFromStorage();
    
    if (!students[matricula]) {
        showNotification('Estudiante no encontrado', 'error');
        return;
    }
    
    // Actualizar datos
    students[matricula].name = name;
    students[matricula].email = email;
    
    // Guardar cambios
    saveStudentsToStorage(students);
    
    // IMPORTANTE: Actualizar el email individualmente también
    localStorage.setItem(`userEmail_${matricula}`, email);
    
    console.log(`✓ Email actualizado para ${matricula}: ${email}`);
    
    // Recargar tabla
    loadStudents();
    
    // Cerrar modal
    closeEditStudentModal();
    
    // Notificación de éxito
    showNotification(`✅ Información de ${name} actualizada correctamente`, 'success');
    
    console.log(`✓ Estudiante actualizado: ${matricula} - ${name} - ${email}`);
}

// Eliminar estudiante
function deleteStudent(matricula) {
    const students = getStudentsFromStorage();
    const student = students[matricula];
    
    if (!student) {
        showNotification('Estudiante no encontrado', 'error');
        return;
    }
    
    if (confirm(`¿Estás seguro de eliminar al estudiante ${student.name} (${matricula})?\n\nEsta acción no se puede deshacer.`)) {
        // Eliminar estudiante
        delete students[matricula];
        saveStudentsToStorage(students);
        
        // Eliminar contraseña asociada
        localStorage.removeItem(`userPassword_${matricula}`);
        
        // Eliminar email asociado
        localStorage.removeItem(`userEmail_${matricula}`);
        
        console.log(`✓ Datos eliminados para matrícula: ${matricula}`);
        
        // Recargar tabla
        loadStudents();
        
        // Notificación
        showNotification(`🗑️ Estudiante ${student.name} eliminado`, 'info');
        
        console.log(`✓ Estudiante eliminado: ${matricula} - ${student.name}`);
    }
}

// Restablecer contraseña
function resetStudentPassword(matricula) {
    const students = getStudentsFromStorage();
    const student = students[matricula];
    
    if (!student) {
        showNotification('Estudiante no encontrado', 'error');
        return;
    }
    
    if (confirm(`¿Restablecer la contraseña de ${student.name} a la contraseña por defecto?\n\nNueva contraseña: tecnm2025`)) {
        // Restablecer a contraseña por defecto
        localStorage.setItem(`userPassword_${matricula}`, 'tecnm2025');
        
        showNotification(`🔑 Contraseña restablecida para ${student.name}`, 'success');
        
        console.log(`✓ Contraseña restablecida: ${matricula}`);
    }
}

// Filtrar estudiantes
function filterStudents() {
    const searchTerm = document.getElementById('searchStudent').value.toLowerCase();
    const rows = document.querySelectorAll('#studentsTableBody tr');
    let visibleCount = 0;
    
    rows.forEach(row => {
        const matricula = row.getAttribute('data-matricula').toLowerCase();
        const name = row.children[1].textContent.toLowerCase();
        const email = row.children[2].textContent.toLowerCase();
        
        if (matricula.includes(searchTerm) || name.includes(searchTerm) || email.includes(searchTerm)) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    console.log(`🔍 Búsqueda: "${searchTerm}" - ${visibleCount} resultados`);
}

// Hacer las funciones globales para los onclick del HTML
window.openEditStudentModal = openEditStudentModal;
window.closeEditStudentModal = closeEditStudentModal;
window.deleteStudent = deleteStudent;
window.resetStudentPassword = resetStudentPassword;
window.closeStudentModal = closeStudentModal;

// ========================================
// MIGRAR EMAILS DE ESTUDIANTES EXISTENTES
// ========================================

// Esta función migra los emails de los estudiantes predefinidos al formato individual
function migrateExistingStudentsEmails() {
    const predefinedStudents = {
        '20401234': 'juan.perez@tecnm.mx',
        '20401235': 'maria.lopez@tecnm.mx',
        '20401236': 'carlos.ramirez@tecnm.mx'
    };
    
    Object.entries(predefinedStudents).forEach(([matricula, email]) => {
        const emailKey = `userEmail_${matricula}`;
        if (!localStorage.getItem(emailKey)) {
            localStorage.setItem(emailKey, email);
            console.log(`✓ Email migrado para ${matricula}: ${email}`);
        }
    });
}

// Ejecutar migración al cargar
migrateExistingStudentsEmails();