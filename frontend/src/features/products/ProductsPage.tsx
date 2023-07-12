import React from 'react'
import { useGetProductsQuery } from './productSlice'
import ProductItem from './ProductItem'
import { AccordionBody, AccordionHeader, AccordionItem, Container, UncontrolledAccordion } from 'reactstrap'
import { decodeUrl } from 'utils/helpers'

type Props = {}

const ProductsPage = (props: Props) => {
  const {
    data,
    // isLoading,
    // isSuccess,
    // isError,
    // error
  } = useGetProductsQuery("") as any;
  if (!data) {
    return <div>Loading...</div>
  }
  
  return (
    <section className="product-page my-3">
      <Container>
        <UncontrolledAccordion>
          {data && Object.entries(data)?.map((product: any, indx: number) => {
            return (
              <AccordionItem key={indx}>
                <AccordionHeader targetId={indx.toString()} className="bg-success">
                  {product[0]}
                </AccordionHeader>
                <AccordionBody accordionId={indx.toString()}>
                  {product[1].map((val: any, index: number) => {
                    return <ProductItem
                      key={index}
                      thumbnail={val.images.at(-1)}
                      title={val.title}
                      brand={val.category}
                    />
                  })}

                </AccordionBody>
              </AccordionItem>
            )
          })}
        </UncontrolledAccordion>
      </Container>
    </section>
  )
}

export default ProductsPage