import { AuthModal } from "components/modals";
import { logOut } from "features/home/homeSlice";
import { useState, useCallback, FC } from "react";
import { useDispatch } from "react-redux";
import {
    Navbar,
    Nav,
    NavbarBrand,
    Button,
    Collapse,
    NavbarToggler,
} from "reactstrap";
import { logo } from "utils/Images";
import { LogOut, sleep } from "utils/helpers";


type Props = {
    userinfo?:string
}
const ProductNavBar:FC<Props> = ({ userinfo }) => {
    const [isOpen, setIsOpen] = useState(false);    
    const [show, setShow] = useState(false);
    const [modalType, setModalType] = useState<null|string>(null);
    const dispatch = useDispatch();

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
                            <div className="d-flex align-items-center gap-3">
                               <div className="align-middle"><h6 className="text-muted">User: {userinfo}</h6></div>
                            <Button variant="outline-primary" className='px-5 py-2 mobile-margin-1' id="logout" onClick={()=>{
                                sleep(100).then(() => {
                                   dispatch(logOut) 
                                }).then(() => {
                                    LogOut()
                                })
                                
                            }}>Logout</Button> 
                            </div>
                            
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
            {show && <AuthModal show={show} handleClose={modalToggle} modalType={modalType} modaltypehandler={setModalType} />}
        </section>
    );
};

export default ProductNavBar;
