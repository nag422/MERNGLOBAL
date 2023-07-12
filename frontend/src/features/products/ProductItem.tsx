import { Col, Row } from 'reactstrap';

type Props = {
    thumbnail: string,
    title: string,
    brand: string,
}

const ProductItem = (props: Props) => {
    const { thumbnail, title, brand } = props;
    return (
        <div>
            <Row>
                <Col md="3" lg="3" sm="12">
                    <div>
                        <img src={thumbnail} alt={title} className="img-fluid" style={{ width: "2rem" }} />
                    </div>
                </Col>
                <Col md="9" lg="9" sm="12">
                    <div>
                        <h2>Title: {title}</h2>
                        <h2>Brand: {brand}</h2>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ProductItem