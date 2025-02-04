import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const StepNavigation = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className="justify-content-center mb-4">
            {/* Step 1: Sign In */}
            <Nav.Item>
                {step1 ? (
                    <Nav.Link as={Link} to="/login">
                        Sign In
                    </Nav.Link>
                ) : (
                    <Nav.Link disabled>Sign In</Nav.Link>
                )}
            </Nav.Item>

            {/* Step 2: Payment */}
            <Nav.Item>
                {step2 ? (
                    <Nav.Link as={Link} to="/shipping">
                        Shipping
                    </Nav.Link>
                ) : (
                    <Nav.Link disabled>Shipping</Nav.Link>
                )}
            </Nav.Item>

            {/* Step 3: Review */}
            <Nav.Item>
                {step3 ? (
                    <Nav.Link as={Link} to="/payment">
                        Payment
                    </Nav.Link>
                ) : (
                    <Nav.Link disabled>Payment</Nav.Link>
                )}
            </Nav.Item>

            {/* Step 4: Completed */}
            <Nav.Item>
                {step4 ? (
                    <Nav.Link as={Link} to="/placeorder">
                        Place Order
                    </Nav.Link>
                ) : (
                    <Nav.Link disabled>Place Order</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    );
};

export default StepNavigation;
