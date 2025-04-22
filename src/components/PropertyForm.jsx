import { useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, InputGroup, Card, Badge } from 'react-bootstrap';
import { useEditor } from '../context/EditorContext';
import { ELEMENT_TYPES } from '../utils/constants';

const PropertyForm = () => {
  const { selectedElement, updateElementProps, removeElement } = useEditor();
  const fileInputRef = useRef(null);
  
  if (!selectedElement) {
    return (
      <Card className="property-form h-100">
        <Card.Body className="text-center d-flex flex-column align-items-center justify-content-center">
          <div className="mb-3">
            <i className="bi bi-sliders text-muted" style={{ fontSize: '2rem' }}></i>
          </div>
          <h5 className="mb-2">No Element Selected</h5>
          <p className="text-muted">
            Select an element on the canvas to edit its properties
          </p>
        </Card.Body>
      </Card>
    );
  }
  
  const { id, type, props } = selectedElement;
  
  let validationSchema;
  let initialValues = { ...props };
  
  switch (type) {
    case ELEMENT_TYPES.TEXT:
      validationSchema = Yup.object({
        content: Yup.string().required('Required'),
        fontSize: Yup.number().min(8, 'Min 8px').max(72, 'Max 72px').required('Required'),
        color: Yup.string().required('Required')
      });
      break;
      
    case ELEMENT_TYPES.IMAGE:
      validationSchema = Yup.object({
        src: Yup.string().when('useUpload', {
          is: false,
          then: Yup.string().url('Must be a valid URL').required('Required')
        }),
        alt: Yup.string().required('Required'),
        useUpload: Yup.boolean()
      });
      break;
      
    case ELEMENT_TYPES.BUTTON:
      validationSchema = Yup.object({
        label: Yup.string().required('Required'),
        link: Yup.string().required('Required'),
        variant: Yup.string().required('Required')
      });
      break;
      
    default:
      validationSchema = Yup.object({});
  }
  
  const handleSubmit = (values, { setSubmitting }) => {
    updateElementProps(id, values);
    setSubmitting(false);
  };
  
  const handleDelete = () => {
    removeElement(id);
  };

  const handleImageUpload = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('uploadedImage', event.target.result);
        setFieldValue('src', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getElementIcon = () => {
    switch (type) {
      case ELEMENT_TYPES.TEXT:
        return 'bi-fonts';
      case ELEMENT_TYPES.IMAGE:
        return 'bi-image';
      case ELEMENT_TYPES.BUTTON:
        return 'bi-ui-radios';
      default:
        return 'bi-question-circle';
    }
  };
  
  const renderFields = () => {
    switch (type) {
      case ELEMENT_TYPES.TEXT:
        return (
          <>
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>
                <i className="bi bi-text-paragraph me-1"></i>
                Content
              </BootstrapForm.Label>
              <Field
                as="textarea"
                name="content"
                className="form-control"
                rows={3}
              />
              <ErrorMessage name="content" component="div" className="text-danger small" />
            </BootstrapForm.Group>
            
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>
                <i className="bi bi-type me-1"></i>
                Font Size (px)
              </BootstrapForm.Label>
              <Field
                type="number"
                name="fontSize"
                className="form-control"
              />
              <ErrorMessage name="fontSize" component="div" className="text-danger small" />
            </BootstrapForm.Group>
            
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>
                <i className="bi bi-palette me-1"></i>
                Color
              </BootstrapForm.Label>
              <InputGroup className="color-picker-container">
                <Field
                  type="color"
                  name="color"
                  className="form-control form-control-color"
                />
                <Field
                  type="text"
                  name="color"
                  className="form-control"
                  placeholder="#000000"
                />
              </InputGroup>
              <ErrorMessage name="color" component="div" className="text-danger small" />
            </BootstrapForm.Group>
          </>
        );
        
      case ELEMENT_TYPES.IMAGE:
        return (
          <>
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>
                <i className="bi bi-image me-1"></i>
                Image Source
              </BootstrapForm.Label>
              <Field name="useUpload">
                {({ field, form }) => (
                  <div className="mb-3">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        {...field}
                        id="useUpload"
                        checked={field.value}
                        onChange={(e) => {
                          form.setFieldValue('useUpload', e.target.checked);
                        }}
                      />
                      <label className="form-check-label" htmlFor="useUpload">
                        {field.value ? 'Upload Image' : 'Use URL'}
                      </label>
                    </div>
                  </div>
                )}
              </Field>

              <Field name="src">
                {({ field, form }) => (
                  <>
                    {!form.values.useUpload ? (
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="https://example.com/image.jpg"
                          {...field}
                        />
                        <div className="form-text">
                          Enter a valid image URL
                        </div>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="file"
                          className="form-control"
                          ref={fileInputRef}
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, form.setFieldValue)}
                        />
                        <div className="form-text">
                          Select an image from your device
                        </div>
                        {form.values.uploadedImage && (
                          <div className="mt-2">
                            <p className="text-success small mb-1">
                              <i className="bi bi-check-circle me-1"></i>
                              Image uploaded
                            </p>
                            <img 
                              src={form.values.uploadedImage} 
                              alt="Preview" 
                              style={{ maxWidth: '100%', maxHeight: '150px' }} 
                              className="mt-1 border rounded" 
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </Field>
              <ErrorMessage name="src" component="div" className="text-danger small" />
            </BootstrapForm.Group>
            
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>
                <i className="bi bi-chat-square me-1"></i>
                Alt Text
              </BootstrapForm.Label>
              <Field
                type="text"
                name="alt"
                className="form-control"
                placeholder="Describe this image"
              />
              <div className="form-text">
                Describe the image for accessibility
              </div>
              <ErrorMessage name="alt" component="div" className="text-danger small" />
            </BootstrapForm.Group>
          </>
        );
        
      case ELEMENT_TYPES.BUTTON:
        return (
          <>
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>
                <i className="bi bi-type me-1"></i>
                Button Text
              </BootstrapForm.Label>
              <Field
                type="text"
                name="label"
                className="form-control"
                placeholder="Click me"
              />
              <ErrorMessage name="label" component="div" className="text-danger small" />
            </BootstrapForm.Group>
            
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>
                <i className="bi bi-link-45deg me-1"></i>
                Link URL
              </BootstrapForm.Label>
              <Field
                type="text"
                name="link"
                className="form-control"
                placeholder="https://example.com"
              />
              <div className="form-text">
                Where should this button link to?
              </div>
              <ErrorMessage name="link" component="div" className="text-danger small" />
            </BootstrapForm.Group>
            
            <BootstrapForm.Group className="mb-3">
              <BootstrapForm.Label>
                <i className="bi bi-palette me-1"></i>
                Button Style
              </BootstrapForm.Label>
              <Field name="variant">
                {({ field }) => (
                  <div>
                    <select {...field} className="form-select">
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="success">Success</option>
                      <option value="danger">Danger</option>
                      <option value="warning">Warning</option>
                      <option value="info">Info</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="outline-primary">Outline Primary</option>
                      <option value="outline-secondary">Outline Secondary</option>
                    </select>
                    <div className="mt-2">
                      <div className="d-flex flex-wrap gap-1">
                        {['primary', 'secondary', 'success', 'danger', 'warning', 'info'].map(variant => (
                          <Button 
                            key={variant} 
                            variant={variant} 
                            size="sm"
                            onClick={() => field.onChange({ target: { name: field.name, value: variant } })}
                            className={`me-1 mb-1 ${field.value === variant ? 'border-dark' : ''}`}
                            style={{ minWidth: '60px' }}
                          >
                            {variant === field.value && <i className="bi bi-check me-1"></i>}
                            {variant}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </Field>
              <ErrorMessage name="variant" component="div" className="text-danger small" />
            </BootstrapForm.Group>
          </>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Card className="property-form h-100">
      <Card.Header className="d-flex justify-content-between align-items-center py-3">
        <div className="d-flex align-items-center">
          <i className={`bi ${getElementIcon()} me-2`}></i>
          <span>Edit {type}</span>
          <Badge bg="light" text="dark" className="ms-2">ID: {id.slice(0, 4)}</Badge>
        </div>
        <Button variant="outline-danger" size="sm" onClick={handleDelete}>
          <i className="bi bi-trash me-1"></i>
          Delete
        </Button>
      </Card.Header>
      <Card.Body className="p-3">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting, dirty }) => (
            <Form>
              {renderFields()}
              
              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || !dirty}
                  className="mt-3"
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Apply Changes
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
};

export default PropertyForm; 