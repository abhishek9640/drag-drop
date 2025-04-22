# Drag and Drop Website Builder

A modern, responsive drag-and-drop website builder prototype built with React, React DnD, and Bootstrap 5. This project transforms a form-based website builder into an intuitive visual editor.

## Features

- **Modern Drag & Drop Interface**: Visually build pages by dragging elements onto the canvas
- **Intuitive Element Editing**: Edit properties through a user-friendly form panel
- **Live Preview Mode**: Toggle between editing and live preview
- **Image Upload**: Upload images directly or use image URLs
- **Responsive Design**: Fully optimized for both desktop and mobile devices
- **Sleek UI**: Modern design with visual feedback and animations

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/drag-drop-builder.git
cd drag-drop-builder
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Usage

1. **Adding Elements**: Drag elements from the left sidebar onto the canvas
2. **Editing Properties**: Click any element to open its property editor
3. **Preview Mode**: Use the toggle button to preview your creation
4. **Mobile View**: 
   - Access the sidebar via the menu button
   - Edit properties using the bottom drawer

## Architecture

The application follows a component-based architecture with React Context API for state management. See the [ARCHITECTURE.md](./ARCHITECTURE.md) file for a detailed breakdown of:

- Technology stack and rationale
- Component structure and relationships
- State management approach
- Design decisions
- Future enhancements

## User Interface

The UI is built with accessibility and user experience in mind:

- **Visual Feedback**: Hover and drag states provide clear feedback
- **Contextual Controls**: Elements show relevant controls when interacted with
- **Responsive Design**: Adapts to different screen sizes:
  - Desktop: Three-column layout (Sidebar, Canvas, Properties)
  - Tablet: Two-column layout with toggleable sidebar
  - Mobile: Full-width canvas with bottom drawer for editing

## Extending the Builder

### Adding New Element Types

1. Add a new element type constant in `src/utils/constants.js`
2. Define default properties for the new element type
3. Add a new case to the Element component's render method in `src/components/Element.jsx`
4. Add a new form section in the PropertyForm component in `src/components/PropertyForm.jsx`
5. Add the new element to the sidebar in `src/components/Sidebar.jsx`

## Technologies Used

- **React**: UI library
- **React DnD**: Drag and drop functionality
- **Formik & Yup**: Form handling and validation
- **Bootstrap 5**: Responsive layout framework
- **React Context API**: State management
- **Bootstrap Icons**: Icon library

## License

MIT
