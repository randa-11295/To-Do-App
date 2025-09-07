import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    padding: "12px",
    margin: "8px 0",
    background: "#3498db",
    color: "#fff",
    borderRadius: 6,
    cursor: "grab",
    textAlign: "center",
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {id}
    </div>
  );
};

export default function App() {
  const [groups, setGroups] = useState({
    group1: ["Task 1", "Task 2", "Task 3"],
    group2: ["Task 4", "Task 5"],
    group3: ["Task 6", "Task 7"],
    group4: ["Task 8"],
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id) || over.id;

    // نفس الحاوية → إعادة الترتيب
    if (activeContainer === overContainer) {
      setGroups((prev) => {
        const newItems = arrayMove(
          prev[activeContainer],
          prev[activeContainer].indexOf(active.id),
          prev[activeContainer].indexOf(over.id)
        );
        return { ...prev, [activeContainer]: newItems };
      });
    } else {
      // النقل بين المجموعات
      setGroups((prev) => {
        const sourceItems = [...prev[activeContainer]];
        const destItems = [...prev[overContainer]];

        // إزالة من الحاوية الأصلية
        sourceItems.splice(sourceItems.indexOf(active.id), 1);

        // لو سقط في مكان عنصر موجود
        const overIndex = prev[overContainer].indexOf(over.id);
        if (overIndex >= 0) {
          destItems.splice(overIndex + 1, 0, active.id);
        } else {
          // لو سقط في منطقة فاضية في الحاوية
          destItems.push(active.id);
        }

        return {
          ...prev,
          [activeContainer]: sourceItems,
          [overContainer]: destItems,
        };
      });
    }
  };

  const findContainer = (id) => {
    return Object.keys(groups).find((group) =>
      groups[group].includes(id)
    );
  };

  const containerStyle = {
    flex: 1,
    padding: 20,
    background: "#f1f1f1",
    borderRadius: 8,
    minHeight: 300,
    margin: "0 10px",
    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
  };

  const titleStyle = {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  };

  return (
    <div style={{ padding: 20 }}>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div style={{ display: "flex", gap: 10 }}>
          {Object.keys(groups).map((group) => (
            <SortableContext
              key={group}
              items={groups[group]}
              strategy={rectSortingStrategy}
            >
              <div style={containerStyle} id={group}>
                <div style={titleStyle}>{group.toUpperCase()}</div>
                {groups[group].map((item) => (
                  <SortableItem key={item} id={item} />
                ))}
                {groups[group].length === 0 && (
                  <div style={{ textAlign: "center", color: "#888" }}>
                    Drop Here
                  </div>
                )}
              </div>
            </SortableContext>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
