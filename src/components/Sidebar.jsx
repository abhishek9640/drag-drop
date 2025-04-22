import { useDrag } from 'react-dnd';
import { Card } from 'react-bootstrap';
import { ELEMENT_TYPES, DEFAULT_ELEMENT_PROPS } from '../utils/constants';

const DraggableItem = ({ type, label, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ELEMENT',
    item: { 
      type, 
      props: DEFAULT_ELEMENT_PROPS[type]
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Card 
      ref={drag}
      className={`mb-3 draggable-item ${isDragging ? 'dragging' : ''}`}
      style={{ 
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      <Card.Body className="p-3 text-center">
        <div className="mb-2">
          {icon}
        </div>
        <div className="fw-medium">{label}</div>
        <small className="text-muted d-block mt-1">Drag to canvas</small>
      </Card.Body>
    </Card>
  );
};

const Sidebar = () => {
  return (
    <div className="sidebar p-3">
      <h5 className="mb-4 d-flex align-items-center">
        <i className="bi bi-grid-1x2 me-2"></i>
        Elements
      </h5>
      
      <div className="mb-4">
        <h6 className="text-muted mb-3 small fw-bold text-uppercase">Content</h6>
        <DraggableItem 
          type={ELEMENT_TYPES.TEXT} 
          label="Text Block"
          icon={<i className="bi bi-fonts"></i>}
        />
        <DraggableItem 
          type={ELEMENT_TYPES.IMAGE} 
          label="Image"
          icon={<i className="bi bi-image"></i>}
        />
      </div>
      
      <div className="mb-4">
        <h6 className="text-muted mb-3 small fw-bold text-uppercase">Interactive</h6>
        <DraggableItem 
          type={ELEMENT_TYPES.BUTTON} 
          label="Button"
          icon={<i className="bi bi-ui-radios"></i>}
        />
      </div>
      
      <div className="text-center text-muted mt-5 pt-3 border-top">
        <i className="bi bi-cursor-fill me-1"></i>
        <small>Drag elements to build your page</small>
      </div>
    </div>
  );
};

export default Sidebar; 