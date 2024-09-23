export interface Note {
    id: number;                // Identificador único de la tarea
    date: string;             // Fecha en formato ISO (puedes cambiar a Date si prefieres manejarlo como objeto Date)
    title: string;            // Título de la tarea
    description: string;      // Descripción de la tarea
    state: number;            // Estado de la tarea (podrías usar un enum si es necesario)
    activeTodo: number;           // Estado activo o inactivo
    userId: number;           // ID del usuario asociado (puedes vincular con la entidad User si es necesario)
}