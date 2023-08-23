import { useState } from "react";
import CrearProducto from "./producto/CrearProducto";
import styles from "./PanelAdministracion.module.css";
import BasicTable from "./producto/BasicTable";
import { Button } from "@mui/material";
import ListarCategorias from "./categoria/ListarCategorias";
import CrearCategoria from "./categoria/CrearCategoria";
import CrearCaracteristica from "./caracteristica/CrearCaracteristica";
import ListarCaracteristicas from "./caracteristica/ListarCaracteristicas";
import UserList from "./usuarios/UserList";

function PanelAdministracion() {
  const [isProd, setIsProd] = useState([true, false]);
  const [isCat, setIsCat] = useState([false, false]);
  const [isCar, setIsCar] = useState([false, false]);
  const [isUser, setIsUser] = useState([false, false]);

  function ShowProd() {
    if (!isProd[0]) {
      setIsProd([true, false]);
      setIsCat([false, false]);
      setIsCar([false, false]);
      setIsUser([false, false]);
    }
  }

  function ShowProdForm(){
    setIsProd([false,true])
  }

  function ShowCatForm(){
    setIsCat([false,true])
  }
  
  function ShowCarForm(){
    setIsCar([false,true])
  }

  function ShowCat() {
    if (!isCat[0]) {
      setIsProd([false, false]);
      setIsCat([true, false]);
      setIsCar([false, false]);
      setIsUser([false, false]);
    }
  }

  function ShowCar() {
    if (!isCar[0]) {
      setIsProd([false, false]);
      setIsCat([false, false]);
      setIsCar([true, false]);
      setIsUser([false, false]);
    }
  }

  function ShowUser() {
    if (!isUser[0]) {
      setIsProd([false, false]);
      setIsCat([false, false]);
      setIsCar([false, false]);
      setIsUser([true, false]);
    }
  }


  return (
    <>
      <div className={styles.container}>
        <nav className={styles.menu}>
          <span className={styles.item} onClick={ShowProd}>
            Administrar Productos
          </span>
          <span className={styles.item} onClick={ShowCat}>
            Administrar Categorias
          </span>
          <span className={styles.item} onClick={ShowCar}>
            Administrar Caracteristicas
          </span>
          <span className={styles.item} onClick={ShowUser}>
            Administrar Usuarios
          </span>
        </nav>
        <div className={styles.contenedor}>
          {isProd[1] && <CrearProducto />}
          {isProd[0] && <Button onClick={ShowProdForm} variant="outlined">Nuevo Producto</Button>}
          {isProd[0] && <BasicTable />}

          {isCat[1] && <CrearCategoria />}
          {isCat[0] && <Button onClick={ShowCatForm} variant="outlined">Nueva Categoria</Button>}
          {isCat[0] && <ListarCategorias />}

          {isCar[1] && <CrearCaracteristica />}
          {isCar[0] && <Button onClick={ShowCarForm} variant="outlined">Nueva Caracteristica</Button>}
          {isCar[0] && <ListarCaracteristicas />}

          {/* {isUser[1] && <CrearCaracteristica />}
          {isUser[0] && <Button onClick={ShowCarForm} variant="outlined">Nueva Caracteristica</Button>} */}
          {isUser[0] && <UserList />}
        </div>
      </div>
      <div className={styles.nomovil}>
        <h4>Este panel no está disponible para dispositivos móviles</h4>
      </div>
    </>
  );
}

export default PanelAdministracion;
