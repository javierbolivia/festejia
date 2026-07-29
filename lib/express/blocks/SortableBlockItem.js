// lib/express/blocks/SortableBlockItem.js
//
// Envoltorio de @dnd-kit/sortable para UN item del acordeón. Cualquier
// bloque marcado como reordenable en la plantilla usa este mismo wrapper
// — nada bloque-específico aquí.
'use client'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function SortableBlockItem({ id, children, arrastrable }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id, disabled: !arrastrable })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="sbi-wrap">
      {arrastrable && (
        <button type="button" className="sbi-handle" {...attributes} {...listeners} aria-label="Arrastrar para reordenar">
          ⠿
        </button>
      )}
      <div className="sbi-content">{children}</div>
      <style jsx>{`
        .sbi-wrap { display: flex; align-items: stretch; gap: 0.3rem; }
        .sbi-handle {
          background: none; border: none; cursor: grab; color: #bbb; font-size: 1rem;
          padding: 0 0.3rem; display: flex; align-items: center; touch-action: none;
        }
        .sbi-handle:hover { color: #c9a96e; }
        .sbi-content { flex: 1; min-width: 0; }
      `}</style>
    </div>
  )
}
