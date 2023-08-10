import { useState } from 'react';
import './crearProducto.css'

function CrearProducto(){
      const [formData, setFormData] = useState({
        nombre: '',
        detalles: [{ descripcion: '', precio: '' }],
        images: []
      });
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleItemChange = (index, field, value) => {
        const newDetalles = [...formData.detalles];
        newDetalles[index][field] = value;
        setFormData({
          ...formData,
          detalles: newDetalles
        });
      };
    
      const handleImageChange = (event, index) => {
        const newImages = [...formData.images];
        newImages[index] = event.target.files[0];
        setFormData({
          ...formData,
          images: newImages
        });
      };
    
      const removeImage = (index) => {
        const newImages = [...formData.images];
        newImages.splice(index, 1);
        setFormData({
          ...formData,
          images: newImages
        });
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form data submitted:', formData);
        const imageToBase64 = (image) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(image);
          });
        };
        const base64Images = await Promise.all(formData.images.map(imageToBase64))
        const imgs = []
        base64Images.forEach(img => {
          imgs.push({"image": img})
        });
        const productoData = {
          nombre: formData.nombre,
          detalles: formData.detalles,
          imagenes: imgs
        };
        
         try {
          const response = await fetch('http://3.144.46.39:8080/productos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoData)
          });
          
          if (response.status == 400) {
            const res = await response.text()
            console.log('Error al crear el producto: ' + res);
            //  mostar cartel de error de acuerdo a la respuesta 
            //  la api responde con 400 cuando el nombre ya existe
            alert('Error al crear el producto: ' + res) // sacar esta chanchada
          }
          if (response.ok) {
            console.log('Producto creado correctamente.');
            // mostrar cartel de producto agregado
              alert('Producto creado correctamente.') // sacar esta chanchada
            // limpiar formulario y estados
            setFormData({
              nombre: '',
              detalles: [{ descripcion: '', precio: '' }],
              images: []
            })
          }  
        } catch (error) {
          
          console.error('Error en la solicitud.');
          // atajando otros errores para que no explote
          alert('Error en la solicitud.') // sacar esta chanchada
        }
      }; 
    
      return (
        <div className="form">
          
          <h2>Agregar Producto</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <h3>Detalles adicionales</h3>
              
              {formData.detalles.map((detalle, index) => (
                <div key={index}>
                  <label>Descripción:</label>
                  <input
                    type="text"
                    placeholder="Descripción"
                    value={detalle.descripcion}
                    onChange={(e) => handleItemChange(index, 'descripcion', e.target.value)}
                  />
                  <label>Precio:</label>
                  <input
                    type="number"
                    placeholder="Valor"
                    value={detalle.value}
                    onChange={(e) => handleItemChange(index, 'precio', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newDetalles = [...formData.detalles];
                      newDetalles.splice(index, 1);
                      setFormData({ ...formData, detalles: newDetalles });
                    }}
                  >
                    Quitar detalle
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, detalles: [...formData.detalles, { descripcion: '', precio: '' }] })}
              >
                Agregar detalle
              </button>
            </div>
            <div className="form-group">
              <label>Imagenes:</label>
              {formData.images.map((image, index) => (
                <div key={index}>
                  {image && (
                    <div>
                      <img className='uploadimg' src={URL.createObjectURL(image)} alt={`Imagen ${index}`} />
                      <button type="button" onClick={() => removeImage(index)}>Quitar</button>
                    </div>
                  )}
                  <input type="file" onChange={(e) => handleImageChange(e, index)} />
                </div>
              ))}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, images: [...formData.images, null] })}
              >
                Agregar imagen
              </button>
            </div>
            <button type="submit">Enviar</button>
          </form>
        </div>
      );


}

export default CrearProducto;