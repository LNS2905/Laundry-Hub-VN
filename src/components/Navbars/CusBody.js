/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// components



export default function Navbar(props) {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>



            <div
                className={
                    "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
                    (navbarOpen ? " block rounded shadow-lg" : " hidden")
                }
                id="example-navbar-warning"
            >
                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">



                    <li className="flex items-center">
                        <Link
                            className="hover:text-blueGray-500 text-white px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                            to="/productpage"
                        >
                            Shopping Page
                        </Link>
                    </li>


                </ul>
            </div>


        </>
    );
}
