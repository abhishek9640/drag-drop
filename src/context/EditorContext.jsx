import { createContext, useState, useContext } from 'react';
import { generateId } from '../utils/constants';

const EditorContext = createContext();

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
  const [layout, setLayout] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const addElement = (type, props) => {
    const newElement = {
      id: generateId(),
      type,
      props
    };
    
    setLayout(prevLayout => [...prevLayout, newElement]);
    return newElement.id;
  };

  const updateElementProps = (elementId, newProps) => {
    setLayout(prevLayout => 
      prevLayout.map(element => 
        element.id === elementId 
          ? { ...element, props: { ...element.props, ...newProps } }
          : element
      )
    );
  };

  const removeElement = (elementId) => {
    setLayout(prevLayout => prevLayout.filter(element => element.id !== elementId));
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement(null);
    }
  };

  const value = {
    layout,
    setLayout,
    selectedElement,
    setSelectedElement,
    previewMode,
    setPreviewMode,
    addElement,
    updateElementProps,
    removeElement
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
}; 