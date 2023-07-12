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
                    <div className="text-start">
                        <h4>Title: {title}</h4>
                        <h4>Brand: {brand}</h4>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ProductItem