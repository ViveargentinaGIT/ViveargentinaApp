import React, { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.css'
import { getAllCities, getCityById, getAllPackages } from '../../redux/action';


export default function FilterPackages({ handleOrder }) {

    const allCities = useSelector(state => state.allCities);



    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCities())
    }, [dispatch]);



    function handleFilterByCity(e) {
        if (e.target.value === 'all') {
            dispatch(getAllPackages())
        } else {
            dispatch(getCityById(e.target.value))
        }
    }

    return (
        <Fragment>
            <div>

                <form id='formFilter'>
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-md-6">
                                <h4 className="text-center mb-3"><i class="bi bi-filter-square-fill"style={{color:"#C49D48"}}></i> ORDER PACKAGES BY</h4>
                                <ul className={styles.filterstyle}>
                                    <li>
                                        <h5><i class="bi bi-sort-alpha-down"style={{color:"#C49D48"}}></i> ALFABETIC</h5>
                                        <select id="alphabeticOrder" onChange={e => handleOrder(e)}>
                                            <option hidden>ALFABETIC</option>
                                            <option value='sort'>Sort</option>
                                            <option value='ascendant by name'>A - Z</option>
                                            <option value='descendant by name'>Z - A</option>
                                        </select>
                                    </li>
                                    <li>
                                        <h5><i class="bi bi-tags-fill"style={{color:"#C49D48"}}></i> PRICE</h5>
                                        <select id="priceOrder" onChange={e => handleOrder(e)}>
                                            <option hidden>PRICE</option>
                                            <option value='sort'>Sort</option>
                                            <option value='ascendant by price'>$</option>
                                            <option value='descendant by price'>$$$</option>
                                        </select>
                                    </li>
                                    <li>
                                        <h5><i class="bi bi-star-half"style={{color:"#C49D48"}}></i> SCORE</h5>
                                        <select id="scoreOrder" onChange={e => handleOrder(e)}>
                                            <option hidden>SCORE</option>
                                            <option value='sort'>Sort</option>
                                            <option value='ascendant by score'>★</option>
                                            <option value='descendant by score'>★★★</option>
                                        </select>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-6">
                                <h4 className="text-center mb-3"><i class="bi bi-funnel-fill"style={{color:"#C49D48"}}></i> FILTER PACKAGES BY</h4>
                                <ul className={styles.filterstyle}>
                                    <li>
                                        <h5><i class="bi bi-geo-alt-fill"style={{color:"#C49D48"}}></i> CITIES</h5>
                                        <select id="cityFilter" onChange={e => handleFilterByCity(e)}>
                                            <option value='all'>All</option>
                                            {allCities && allCities.sort((a, b) => {
                                                if (a.name < b.name) return -1;
                                                if (a.name > b.name) return 1;
                                                return 0;
                                            })
                                                .map((c) => {
                                                    return (
                                                        <option value={c.id} key={c.id}>
                                                            {c.name}
                                                        </option>
                                                    );
                                                })};
                                        </select>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </Fragment>
    )
}