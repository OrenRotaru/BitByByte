import img1 from "../assets/img/products/1.jpg";
import img2 from "../assets/img/products/2.jpg";
import img3 from "../assets/img/products/3.jpg";


const Landing = () => {
  return (
    <>
      <header className="bg-dark">
        <div className="container pt-4 pt-xl-5">
          <div className="row pt-5">
            <div className="col-md-8 col-xl-6 text-center text-md-start mx-auto">
              <div className="text-center">
                <p className="fw-bold text-success mb-2">Voted #1 Worldwide</p>
                <h1 className="fw-bold">
                  The best solution for you and your customers
                </h1>
              </div>
            </div>
            <div className="col-12 col-lg-10 mx-auto">
              <div
                className="position-relative"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    flex: "0 0 45%",
                    transform: "translate3d(-15%, 35%, 0)",
                  }}
                >
                  <img
                    className="img-fluid"
                    data-bss-parallax=""
                    data-bss-parallax-speed="0.8"
                    src={img3}
                  />
                </div>
                <div
                  style={{
                    position: "relative",
                    flex: "0 0 45%",
                    transform: "translate3d(-5%, 20%, 0)",
                  }}
                >
                  <img
                    className="img-fluid"
                    data-bss-parallax=""
                    data-bss-parallax-speed="0.4"
                    src={img2}
                  />
                </div>
                <div
                  style={{
                    position: "relative",
                    flex: "0 0 60%",
                    transform: "translate3d(0, 0%, 0)",
                  }}
                >
                  <img
                    className="img-fluid"
                    data-bss-parallax=""
                    data-bss-parallax-speed="0.25"
                    src={img1}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="py-5">
        <div className="container text-center py-5">
          <p className="mb-4" style={{ fontSize: "1.6rem" }}>
            Used by{" "}
            <span className="text-success">
              <strong>2400+</strong>
            </span>
            &nbsp;of the best companies in the world.
          </p>
          <a href="#">
            <img className="m-3" src="assets/img/brands/google.png" />
          </a>
          <a href="#">
            <img className="m-3" src="assets/img/brands/microsoft.png" />
          </a>
          <a href="#">
            <img className="m-3" src="assets/img/brands/apple.png" />
          </a>
          <a href="#">
            <img className="m-3" src="assets/img/brands/facebook.png" />
          </a>
          <a href="#">
            <img className="m-3" src="assets/img/brands/twitter.png" />
          </a>
        </div>
      </section>
      <section>
        <div className="container bg-dark py-5">
          <div className="row">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <p className="fw-bold text-success mb-2">Our Services</p>
              <h3 className="fw-bold">What we can do for you</h3>
            </div>
          </div>
          <div className="py-5 p-lg-5">
            <div
              className="row row-cols-1 row-cols-md-2 mx-auto"
              style={{ maxWidth: "900px" }}
            >
              <div className="col mb-5">
                <div className="card shadow-sm">
                  <div className="card-body px-4 py-5 px-md-5">
                    <div
                      className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon"
                      style={{
                        top: "1rem",
                        right: "1rem",
                        position: "absolute",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="bi bi-bell text-success"
                      >
                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"></path>
                      </svg>
                    </div>
                    <h5 className="fw-bold card-title">
                      Lorem ipsum dolor sit&nbsp;
                    </h5>
                    <p className="text-muted card-text mb-4">
                      Erat netus est hendrerit, nullam et quis ad cras porttitor
                      iaculis. Bibendum vulputate cras aenean.
                    </p>
                    <button className="btn btn-primary shadow" type="button">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
              <div className="col mb-5">
                <div className="card shadow-sm">
                  <div className="card-body px-4 py-5 px-md-5">
                    <div
                      className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon"
                      style={{
                        top: "1rem",
                        right: "1rem",
                        position: "absolute",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="bi bi-bezier text-success"
                      >
                        <path
                          fillRule="evenodd"
                          d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
                        ></path>
                        <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>
                      </svg>
                    </div>
                    <h5 className="fw-bold card-title">
                      Lorem ipsum dolor sit&nbsp;
                    </h5>
                    <p className="text-muted card-text mb-4">
                      Erat netus est hendrerit, nullam et quis ad cras porttitor
                      iaculis. Bibendum vulputate cras aenean.
                    </p>
                    <button className="btn btn-primary shadow" type="button">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
              <div className="col mb-4">
                <div className="card shadow-sm">
                  <div className="card-body px-4 py-5 px-md-5">
                    <div
                      className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon"
                      style={{
                        top: "1rem",
                        right: "1rem",
                        position: "absolute",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="bi bi-pin-angle text-success"
                      >
                        <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a5.927 5.927 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707-.195-.195.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a5.922 5.922 0 0 1 1.013.16l3.134-3.133a2.772 2.772 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146zm.122 2.112v-.002.002zm0-.002v.002a.5.5 0 0 1-.122.51L6.293 6.878a.5.5 0 0 1-.511.12H5.78l-.014-.004a4.507 4.507 0 0 0-.288-.076 4.922 4.922 0 0 0-.765-.116c-.422-.028-.836.008-1.175.15l5.51 5.509c.141-.34.177-.753.149-1.175a4.924 4.924 0 0 0-.192-1.054l-.004-.013v-.001a.5.5 0 0 1 .12-.512l3.536-3.535a.5.5 0 0 1 .532-.115l.096.022c.087.017.208.034.344.034.114 0 .23-.011.343-.04L9.927 2.028c-.029.113-.04.23-.04.343a1.779 1.779 0 0 0 .062.46z"></path>
                      </svg>
                    </div>
                    <h5 className="fw-bold card-title">
                      Lorem ipsum dolor sit&nbsp;
                    </h5>
                    <p className="text-muted card-text mb-4">
                      Erat netus est hendrerit, nullam et quis ad cras porttitor
                      iaculis. Bibendum vulputate cras aenean.
                    </p>
                    <button className="btn btn-primary shadow" type="button">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
              <div className="col mb-4">
                <div className="card shadow-sm">
                  <div className="card-body px-4 py-5 px-md-5">
                    <div
                      className="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon"
                      style={{
                        top: "1rem",
                        right: "1rem",
                        position: "absolute",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="bi bi-chat-quote text-success"
                      >
                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path>
                        <path d="M7.066 6.76A1.665 1.665 0 0 0 4 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z"></path>
                      </svg>
                    </div>
                    <h5 className="fw-bold card-title">
                      Lorem ipsum dolor sit&nbsp;
                    </h5>
                    <p className="text-muted card-text mb-4">
                      Erat netus est hendrerit, nullam et quis ad cras porttitor
                      iaculis. Bibendum vulputate cras aenean.
                    </p>
                    <button className="btn btn-primary shadow" type="button">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container py-5">
          <div className="mx-auto" style={{ maxWidth: "900px" }}>
            <div className="row row-cols-1 row-cols-md-2 d-flex justify-content-center">
              <div className="col mb-4">
                <div className="card bg-primary-light">
                  <div className="card-body text-center px-4 py-5 px-md-5">
                    <p className="fw-bold text-primary card-text mb-2">
                      Fully Managed
                    </p>
                    <h5 className="fw-bold card-title mb-3">
                      Lorem ipsum dolor sit&nbsp;nullam et quis ad cras
                      porttitor
                    </h5>
                    <button className="btn btn-primary btn-sm" type="button">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
              <div className="col mb-4">
                <div className="card bg-secondary-light">
                  <div className="card-body text-center px-4 py-5 px-md-5">
                    <p className="fw-bold text-secondary card-text mb-2">
                      Fully Managed
                    </p>
                    <h5 className="fw-bold card-title mb-3">
                      Lorem ipsum dolor sit&nbsp;nullam et quis ad cras
                      porttitor
                    </h5>
                    <button className="btn btn-secondary btn-sm" type="button">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
              <div className="col mb-4">
                <div className="card bg-info-light">
                  <div className="card-body text-center px-4 py-5 px-md-5">
                    <p className="fw-bold text-info card-text mb-2">
                      Fully Managed
                    </p>
                    <h5 className="fw-bold card-title mb-3">
                      Lorem ipsum dolor sit&nbsp;nullam et quis ad cras
                      porttitor
                    </h5>
                    <button className="btn btn-info btn-sm" type="button">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 mt-5"></section>
      <footer className="bg-dark">
        <div className="container py-4 py-lg-5">
          <div className="row justify-content-center">
            <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
              <h3 className="fs-6 fw-bold">Services</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Web design</a>
                </li>
                <li>
                  <a href="#">Development</a>
                </li>
                <li>
                  <a href="#">Hosting</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
              <h3 className="fs-6 fw-bold">About</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Company</a>
                </li>
                <li>
                  <a href="#">Team</a>
                </li>
                <li>
                  <a href="#">Legacy</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-4 col-md-3 text-center text-lg-start d-flex flex-column">
              <h3 className="fs-6 fw-bold">Careers</h3>
              <ul className="list-unstyled">
                <li>
                  <a href="#">Job openings</a>
                </li>
                <li>
                  <a href="#">Employee success</a>
                </li>
                <li>
                  <a href="#">Benefits</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 text-center text-lg-start d-flex flex-column align-items-center order-first align-items-lg-start order-lg-last">
              <div className="fw-bold d-flex align-items-center mb-2">
                <span className="bs-icon-sm bs-icon-circle bs-icon-primary d-flex justify-content-center align-items-center bs-icon me-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="bi bi-bezier"
                  >
                    <path
                      fillRule="evenodd"
                      d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
                    ></path>
                    <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z"></path>
                  </svg>
                </span>
                <span>Brand</span>
              </div>
              <p className="text-muted">
                Sem eleifend donec molestie, integer quisque orci aliquam.
              </p>
            </div>
          </div>
          <div className="text-muted d-flex justify-content-between align-items-center pt-3">
            <p className="mb-0">Copyright © 2023 Brand</p>
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-facebook"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                </svg>
              </li>
              <li className="list-inline-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-twitter"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
                </svg>
              </li>
              <li className="list-inline-item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-instagram"
                >
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
                </svg>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
