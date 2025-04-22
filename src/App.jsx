import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Container, Row, Col, Navbar, Button, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/styles.css';

import { EditorProvider } from './context/EditorContext';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import PropertyForm from './components/PropertyForm';
import PreviewToggle from './components/PreviewToggle';
import { useState, useEffect } from 'react';
import { useEditor } from './context/EditorContext';

function MobilePropertyPanel() {
  const { selectedElement } = useEditor();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (selectedElement) {
      setShow(true);
    }
  }, [selectedElement]);

  const handleClose = () => setShow(false);

  return (
    <>
      {selectedElement && (
        <Button
          variant="primary"
          className="property-form-toggle d-md-none"
          onClick={() => setShow(!show)}
        >
          <i className="bi bi-sliders"></i>
        </Button>
      )}

      <Offcanvas 
        show={show} 
        onHide={handleClose} 
        placement="bottom" 
        className="d-md-none property-form-mobile"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Properties</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <PropertyForm />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <EditorProvider>
        <div className="app">
          <Navbar bg="dark" variant="dark" expand="md" className="mb-3">
            <Container fluid>
              <Navbar.Brand className="d-flex align-items-center">
                <i className="bi bi-grid-1x2-fill me-2"></i>
                Website Builder
              </Navbar.Brand>
              <div className="ms-auto d-flex">
                <PreviewToggle />
                <Button 
                  variant="outline-light" 
                  className="d-md-none ms-2"
                  onClick={toggleSidebar}
                >
                  <i className="bi bi-list"></i>
                </Button>
              </div>
            </Container>
          </Navbar>
          
          <Container fluid className="pb-5">
            <Row className="g-3">
              <Col md={3} className={`sidebar d-md-block ${showSidebar ? 'show' : ''}`}>
                <Button
                  variant="light"
                  size="sm"
                  className="position-absolute top-0 end-0 m-2 d-md-none"
                  onClick={toggleSidebar}
                >
                  <i className="bi bi-x-lg"></i>
                </Button>
                <Sidebar />
              </Col>
              {showSidebar && <div className="sidebar-overlay d-md-none" onClick={toggleSidebar}></div>}
              
              <Col md={6} className="px-md-4">
                <Canvas />
              </Col>
              
              <Col md={3} className="d-none d-md-block">
                <PropertyForm />
              </Col>
            </Row>
          </Container>
          
          <MobilePropertyPanel />
        </div>
      </EditorProvider>
    </DndProvider>
  );
}

export default App;
