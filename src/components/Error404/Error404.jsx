import styles from './Error404.module.css'
import { Link } from 'react-router-dom'


export default function Error404() {

    return (
        <div className={styles.notfoundbkg}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className={styles.notfoundstyle}>
                            404 <br/> 
                        </h1>
                        <h1 className={styles.notfoundstyle2}>NOT FOUND</h1>
                        <h2 className={styles.notfoundstyletxt}>
                            The page you were looking for does not exist
                        </h2>

                        <Link to='/home'>
                            <div className={styles.citybuttons}>
                                <button className={styles.button404} type="button" class="btn btn-light">BACK TO HOME</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}