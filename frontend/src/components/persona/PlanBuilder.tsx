import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';

interface Module {
  id: number;
  name: string;
  description?: string;
}

interface PlanBuilderProps {
  initialModules: Module[];
  onReorder: (modules: Module[]) => void;
  onStartModule?: (moduleId: number) => void;
}

export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const PlanBuilder: React.FC<PlanBuilderProps> = ({ initialModules = [], onReorder, onStartModule }) => {
  const [modules, setModules] = useState<Module[]>(initialModules);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = reorder(modules, result.source.index, result.destination.index);

    setModules(items);
    onReorder(items);
  };

  return (
    <div className="plan-builder">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="modules">
          {(provided) => (
            <div
              className="modules-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {modules.map((module, index) => (
                <Draggable key={module.id} draggableId={String(module.id)} index={index}>
                  {(provided) => (
                    <div
                      className="module-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="module-info">
                        <h4>{module.name}</h4>
                        <p>{module.description}</p>
                      </div>
                      {onStartModule && (
                        <button className="start-btn" onClick={() => onStartModule(module.id)}>
                          Start Lesson
                        </button>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PlanBuilder;
