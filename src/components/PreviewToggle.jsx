import { Button } from 'react-bootstrap';
import { useEditor } from '../context/EditorContext';

const PreviewToggle = () => {
  const { previewMode, setPreviewMode, setSelectedElement } = useEditor();

  const togglePreview = () => {
    // When entering preview mode, deselect any selected element
    if (!previewMode) {
      setSelectedElement(null);
    }
    setPreviewMode(!previewMode);
  };

  return (
    <Button
      variant={previewMode ? 'outline-primary' : 'primary'}
      onClick={togglePreview}
      className="preview-toggle w-100 mb-3 d-flex align-items-center justify-content-center"
    >
      <i className={`bi ${previewMode ? 'bi-pencil-square' : 'bi-eye'} me-2`}></i>
      {previewMode ? 'Exit Preview' : 'Preview Mode'}
    </Button>
  );
};

export default PreviewToggle; 