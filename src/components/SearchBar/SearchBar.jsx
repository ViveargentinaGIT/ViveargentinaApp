import React, { useEffect, useState } from "react"; 
import { useDispatch} from "react-redux";
import { useHistory } from "react-router-dom"
import  {getCitiesByName, getPackagesByName, getExperiencesByName}  from "../../redux/action"; 
import styles from '../SearchBar/SearchBar.module.css';

export default function Search() {

    const dispatch = useDispatch();
    const history = useHistory();
    let pathName = history.location.pathname
    const [name, setName] = useState("")

    function handleName(e) {
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        if (name) {
            if(pathName === "/cities") {
                dispatch(getCitiesByName(name))
                setName("")
            }
            if(pathName === "/packages") {
                dispatch(getPackagesByName(name))
                setName("")
            }
            if(pathName === "/experiences") {
                dispatch(getExperiencesByName(name))
                setName("")
            }
        }
    }
 

    
    return (
        <div className="container-fluid">

            <div className={styles.container}>
                <form className={styles.searchbarstyle} onSubmit={(e) => handleSubmit(e)}>
                    <div className="col-md-2">
                        <label className="visually-hidden" for="specificSizeInputName">Name</label>
                        <input type="text" value={name} className="form-control input-lg" id="specificSizeInputName" placeholder="Example: Córdoba" onChange={(e)=>handleName(e)} />
                    </div>
                    <div className="col-md-auto">
                        <button type="submit" className="btn btn-outline-secondary btn-lg">Search</button>
                    </div>
                </form>
            </div>

            {/* <form className={styles.formsearch} onSubmit={(e) => handleSubmit(e)}>
                <input
                    className="input-search"
                    type="text"
                    placeholder="Search..."
                    value={nameCity}
                    onChange={(e) => handleInput(e)}
                />
                <button className="btn-search" type="submit">
                    Search
                </button>
            </form> */}

        </div>
    );


}

