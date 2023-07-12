import React from 'react'
import { useGetProductsQuery } from './productSlice'
import ProductItem from './ProductItem'
import { AccordionBody, AccordionHeader, AccordionItem, UncontrolledAccordion } from 'reactstrap'

type Props = {}

const ProductsPage = (props: Props) => {
  const {
    data,
    // isLoading,
    // isSuccess,
    // isError,
    // error
  } = useGetProductsQuery("") as any;
  if(!data){
    return <div>Loading...</div>
  }
  return (
    <div>
      <UncontrolledAccordion>
        {data && Object.entries(data)?.map((product: any, indx: number) => {
          return (
            <AccordionItem key={indx}>
              <AccordionHeader targetId={indx.toString()}>
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
    </div>
  )
}

export default ProductsPage