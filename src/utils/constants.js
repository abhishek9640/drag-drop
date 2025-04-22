// Element types definitions
export const ELEMENT_TYPES = {
  TEXT: 'Text',
  IMAGE: 'Image',
  BUTTON: 'Button'
};

// Default properties for each element type
export const DEFAULT_ELEMENT_PROPS = {
  [ELEMENT_TYPES.TEXT]: {
    content: 'Text content',
    fontSize: 16,
    color: '#000000'
  },
  [ELEMENT_TYPES.IMAGE]: {
    src: 'https://via.placeholder.com/300x200',
    alt: 'Image description',
    useUpload: false,
    uploadedImage: null
  },
  [ELEMENT_TYPES.BUTTON]: {
    label: 'Button',
    link: '#',
    variant: 'primary'
  }
};

// Generate a unique id
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
}; 