"use client";
import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useDraggable } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';

const ShapeMatchingGame = () => {
  // Define the shapes with their properties - now with pentagon added
  const initialShapes = [
    { id: 'diamond', color: '#c44ed0', type: 'diamond' },
    { id: 'triangle', color: '#ffff00', type: 'triangle' },
    { id: 'square', color: '#7b0f80', type: 'square' },
    { id: 'rectangle', color: '#a0e39a', type: 'rectangle' },
    { id: 'circle', color: '#f05c3f', type: 'circle' },
    { id: 'pentagon', color: '#4287f5', type: 'pentagon' }, // Added pentagon
  ];

  // State for randomized shapes
  const [shapes, setShapes] = useState([...initialShapes]);

  // Define drop zones - now with pentagon added
  const dropZones = [
    { id: 'triangle-zone', accepts: 'triangle', label: 'triangle' },
    { id: 'rectangle-zone', accepts: 'rectangle', label: 'rectangle' },
    { id: 'diamond-zone', accepts: 'diamond', label: 'diamond' },
    { id: 'square-zone', accepts: 'square', label: 'square' },
    { id: 'circle-zone', accepts: 'circle', label: 'circle' },
    { id: 'pentagon-zone', accepts: 'pentagon', label: 'pentagon' }, // Added pentagon zone
  ];

  // State to track which shapes have been placed correctly
  const [placedShapes, setPlacedShapes] = useState({});
  const [activeId, setActiveId] = useState(null);

  // Function to randomize shapes
  const randomizeShapes = () => {
    const shuffled = [...initialShapes];
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShapes(shuffled);
  };

  // Randomize shapes on initial load
  useEffect(() => {
    randomizeShapes();
  }, []);

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Minimum drag distance to start a drag operation
      },
    }),
    useSensor(KeyboardSensor, {
      // Using standard keyboard controls
      keyboardCodes: {
        start: ['Space', 'Enter'],
        cancel: ['Escape'],
        end: ['Space', 'Enter'],
      },
    })
  );

  // Handle drag start
  function handleDragStart(event) {
    const { active } = event;
    setActiveId(active.id);
  }

  // Handle drag end
  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveId(null);
    
    if (!over) return;
    
    // Check if the shape matches the drop zone
    const shape = shapes.find(s => s.id === active.id);
    const dropZone = dropZones.find(d => d.id === over.id);
    
    if (dropZone && shape.type === dropZone.accepts) {
      setPlacedShapes(prev => ({
        ...prev,
        [shape.id]: dropZone.id
      }));
    }
  }

  // Handle game reset
  const resetGame = () => {
    setPlacedShapes({});
    randomizeShapes();
  };

  // Get the active shape for the drag overlay
  const activeShape = shapes.find(s => s.id === activeId);

  // Calculate score
  const score = Object.keys(placedShapes).length;
  const isGameComplete = score === shapes.length;

  // Randomize dropZones order too
  const [randomizedDropZones, setRandomizedDropZones] = useState([...dropZones]);
  
  useEffect(() => {
    const shuffled = [...dropZones];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setRandomizedDropZones(shuffled);
  }, [placedShapes]); // Re-randomize when game is reset

  return (
    <div className="w-full h-full bg-blue-400 p-6 flex flex-col">
      <div className="mb-4 text-white text-xl font-bold">
        Score: {score} / {shapes.length}
        {isGameComplete && <span className="ml-4 text-yellow-300">Game Complete!</span>}
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Main game container with more space for drop zones */}
        <div className="flex">
          {/* Shapes container - made more compact */}
          <div className="w-1/2 pr-2">
            <div className="bg-white bg-opacity-20 p-3 rounded-lg shadow-md">
              <div className="grid grid-cols-3 gap-2">
                {shapes.map(shape => (
                  !placedShapes[shape.id] && (
                    <DraggableShape 
                      key={shape.id} 
                      id={shape.id} 
                      color={shape.color} 
                      type={shape.type} 
                      compact={true}
                    />
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Drop zones container - pushed to the right edge */}
          <div className="w-1/2 flex justify-end">
            <div className="flex flex-col space-y-3">
              {randomizedDropZones.map(zone => (
                <DropZone 
                  key={zone.id} 
                  id={zone.id} 
                  label={zone.label}
                  placedShape={shapes.find(s => placedShapes[s.id] === zone.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="opacity-80">
              <ShapeComponent 
                color={activeShape.color} 
                type={activeShape.type} 
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      
      {isGameComplete && (
        <button 
          onClick={resetGame} 
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded self-center"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

// Draggable shape component using useDraggable hook
function DraggableShape({ id, color, type, compact }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
  } = useDraggable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="bg-white p-2 rounded-md flex items-center justify-center cursor-grab touch-manipulation"
    >
      <ShapeComponent color={color} type={type} compact={compact} />
    </div>
  );
}

// Shape component for rendering different shapes
function ShapeComponent({ color, type, compact }) {
  // Determine size based on compact mode
  const size = compact ? "w-12 h-12" : "w-16 h-16";
  const rectSize = compact ? "w-14 h-10" : "w-20 h-12";
  
  switch (type) {
    case 'circle':
      return (
        <div 
          className={`${size} rounded-full border-2 border-black`}
          style={{ backgroundColor: color }}
        />
      );
    case 'square':
      return (
        <div 
          className={`${size} border-2 border-black`}
          style={{ backgroundColor: color }}
        />
      );
    case 'rectangle':
      return (
        <div 
          className={`${rectSize} border-2 border-black`}
          style={{ backgroundColor: color }}
        />
      );
    case 'triangle':
      return (
        <div className={`relative ${size} flex items-center justify-center`}>
          <div 
            className="absolute"
            style={{ 
              width: '0', 
              height: '0', 
              borderLeft: compact ? '20px solid transparent' : '25px solid transparent', 
              borderRight: compact ? '20px solid transparent' : '25px solid transparent', 
              borderBottom: `${compact ? '34px' : '43px'} solid ${color}`,
              filter: 'drop-shadow(0px 0px 1px black)'
            }} 
          />
        </div>
      );
    case 'diamond':
      return (
        <div 
          className={`${size} border-2 border-black transform rotate-45`}
          style={{ backgroundColor: color }}
        />
      );
    case 'pentagon':
      return (
        <div className={`relative ${size} flex items-center justify-center`}>
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full"
          >
            <polygon 
              points="50,5 95,35 80,90 20,90 5,35" 
              fill={color} 
              stroke="black" 
              strokeWidth="3"
            />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

// Drop zone component
function DropZone({ id, label, placedShape }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex items-center">
      <div 
        ref={setNodeRef}
        className={`w-24 h-20 rounded-lg flex items-center justify-center mr-4 transition-colors ${
          isOver ? 'bg-blue-200' : 'bg-blue-300'
        }`}
      >
        {placedShape && (
          <ShapeComponent color={placedShape.color} type={placedShape.type} />
        )}
      </div>
      <span className="text-xl font-bold text-black">{label}</span>
    </div>
  );
}

export default ShapeMatchingGame;