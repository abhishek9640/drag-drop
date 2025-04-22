import { useEditor } from '../context/EditorContext';
import { ELEMENT_TYPES } from '../utils/constants';
import { Button, Badge } from 'react-bootstrap';

const Element = ({ element }) => {
  const { selectedElement, setSelectedElement, previewMode, removeElement } = useEditor();
  const { id, type, props } = element;
  
  const isSelected = selectedElement && selectedElement.id === id;
  
  const handleClick = (e) => {
    e.stopPropagation();
    if (!previewMode) {
      setSelectedElement(element);
    }
  };
  
  const handleDelete = (e) => {
    e.stopPropagation();
    removeElement(id);
  };
  
  const renderElementControls = () => {
    if (previewMode) return null;
    
    return (
      <div className="element-controls p-1">
        <Badge 
          bg="secondary" 
          className="me-1"
          style={{ fontSize: '0.7rem' }}
        >
          {type}
        </Badge>
        <Button 
          variant="danger" 
          size="sm" 
          className="btn-sm p-0 px-1" 
          onClick={handleDelete}
          style={{ fontSize: '0.7rem' }}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
    );
  };
  
  const renderElement = () => {
    switch (type) {
      case ELEMENT_TYPES.TEXT:
        return (
          <p 
            style={{ 
              fontSize: `${props.fontSize}px`, 
              color: props.color,
              padding: '8px',
              margin: 0,
              lineHeight: 1.5
            }}
          >
            {props.content}
          </p>
        );
        
      case ELEMENT_TYPES.IMAGE:
        return (
          <div className="image-container">
            <img 
              src={props.src} 
              alt={props.alt} 
              className="img-fluid rounded" 
              style={{ maxWidth: '100%' }}
            />
            {!previewMode && (
              <div className="image-caption text-muted small mt-1">
                <i className="bi bi-image me-1"></i>
                {props.alt || 'Image'}
              </div>
            )}
          </div>
        );
        
      case ELEMENT_TYPES.BUTTON:
        return (
          <Button 
            variant={props.variant || 'primary'} 
            href={previewMode ? props.link : undefined}
            className="m-1"
            size={props.size || "md"}
          >
            {props.label}
          </Button>
        );
        
      default:
        return <div>Unknown element type</div>;
    }
  };
  
  return (
    <div 
      className={`element ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      style={{
        padding: '8px',
        margin: '8px 0',
        cursor: previewMode ? (type === ELEMENT_TYPES.BUTTON ? 'pointer' : 'default') : 'pointer',
        position: 'relative'
      }}
    >
      {renderElementControls()}
      {renderElement()}
    </div>
  );
};

export default Element; 