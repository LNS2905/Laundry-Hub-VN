import React from "react";

export default function FooterSmall(props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-blueGray-800"
            : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-blueGray-600" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.techrepublic.com/wp-content/uploads/2017/03/cce53b95907bc6a657c0b5f6de78d757.jpg"
                  className="text-white hover:text-blueGray-300 text-sm font-semibold py-1"
                >
                  Laundry Hub VN
                </a>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <a
                    href="https://www.techrepublic.com/wp-content/uploads/2017/03/cce53b95907bc6a657c0b5f6de78d757.jpg"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                    Laundry Hub VN
                  </a>
                </li>
                <li>
                  <a

                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                    Hotline: 0333336938
                  </a>
                </li>


              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
