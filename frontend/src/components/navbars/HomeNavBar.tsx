import { AuthModal } from "components/modals";
import { useState, useCallback } from "react";
import {
    Navbar,
    Nav,
    NavbarBrand,
    Button,
    Collapse,
    NavbarToggler,
} from "reactstrap";
import { logo } from "utils/Images";

const HomeNavBar = () => {
    const [isOpen, setIsOpen] = useState(false);    
    const [show, setShow] = useState(false);
    const [modalType, setModalType] = useState<null|string>(null);

    const toggle = useCallback(() => setIsOpen(!isOpen),[isOpen]);
    const modalToggle = useCallback(() => setShow(!show),[show]);

    const handleShow = useCallback((modaltype:string) => {
        setModalType(modaltype)
        modalToggle();
    }, [modalToggle])

    return (
        <section className="home-navbar">
            <div>
                <Navbar expand="sm" className="shadow-sm bg-white">
                    <NavbarBrand href="/">
                        <img src={logo} alt="logo" className="img-fluid" style={{width:"3rem"}} /> 
                        <h5 className="d-inline mx-2">Global technologies</h5>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="me-auto" navbar>
                        </Nav>
                        <Nav className="ml-auto gap-2 my-2" navbar>
                            <Button className='btn btn-primary px-5 py-2 mobile-margin-1' id="login" onClick={() => handleShow("login")}>Login</Button>
                            <Button variant="outline-primary" className='px-5 py-2 mobile-margin-1' id="signup" onClick={() => handleShow("signup")}>SignUp</Button>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
            {show && <AuthModal show={show} handleClose={modalToggle} modalType={modalType} modaltypehandler={setModalType} />}
        </section>
    );
};

export default HomeNavBar;
