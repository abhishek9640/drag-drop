import { useDrop } from 'react-dnd';
import { useEditor } from '../context/EditorContext';
import Element from './Element';
import { Alert } from 'react-bootstrap';

const Canvas = () => {
  const { layout, addElement, setSelectedElement, previewMode } = useEditor();
  
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ELEMENT',
    drop: (item) => {
      const id = addElement(item.type, item.props);
      // Select the newly added element
      const newElement = { id, type: item.type, props: item.props };
      setSelectedElement(newElement);
      return { id };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const handleCanvasClick = (e) => {
    // Deselect when clicking on empty canvas area
    if (!previewMode && e.target === e.currentTarget) {
      setSelectedElement(null);
    }
  };
  
  return (
    <div 
      ref={drop}
      className={`canvas ${isOver ? 'drop-active' : ''} ${previewMode ? 'preview-mode' : ''}`}
      onClick={handleCanvasClick}
    >
      {previewMode && (
        <Alert variant="info" className="mb-3 fade-in">
          <i className="bi bi-eye-fill me-2"></i>
          Preview Mode - Interact with your elements as they would appear live
        </Alert>
      )}
      
      {layout.length === 0 ? (
        <div className={`canvas-placeholder ${isOver ? 'fade-in' : ''}`}>
          <i className={`bi ${isOver ? 'bi-cursor-fill' : 'bi-arrow-down-square'}`}></i>
          <h5>{isOver ? 'Drop element here' : 'Start building your page'}</h5>
          <p className="text-center">{
            isOver 
              ? 'Release to place element' 
              : 'Drag elements from the sidebar to build your page'
          }</p>
        </div>
      ) : (
        <div className="element-container">
          {layout.map((element) => (
            <Element key={element.id} element={element} />
          ))}
        </div>
      )}
      
      {!previewMode && layout.length > 0 && (
        <div className="text-center mt-4 text-muted small">
          <i className="bi bi-info-circle me-1"></i>
          Click on an element to edit its properties
        </div>
      )}
    </div>
  );
};

export default Canvas; 