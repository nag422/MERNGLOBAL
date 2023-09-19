import React from 'react';
import page from "assets/images/page.jpg";
import page2 from "assets/images/page2.jpg";
import page3 from "assets/images/page3.jpg";

type Props = {}

const Book = (props: Props) => {
  return (
    <div className="d-flex align-items-center justify-content-center bg-primary">
      {/* <input type="checkbox" id="checkbox-cover"></input>
      <input type="checkbox" id="checkbox-page1"></input>
      <input type="checkbox" id="checkbox-page2"></input>
      <input type="checkbox" id="checkbox-page3"></input>
      <div className="book">
        <div className="cover">
          <label htmlFor="checkbox-cover"></label>
        </div>
        <div className="page" id="page1">
          <div className="front-page">
            <p>Minglom veran deskt dolor sit amet consectetur, adipisicing elit. Nihil magni laudantium beatae quia. Recusandae, fuga quas consectetur perferendis aperiam esse velit veniam ducimus? Quisquam consequatur perferendis quidem quia, recusandae ab!</p>
            <label className="next" htmlFor="checkbox-page1"><i className="fas fa-chevron-right"></i></label>
          </div>
          <div className="back-page">
            <img src={page} alt="1jpg" />
            <label className="prev" htmlFor="checkbox-page1"><i className="fas fa-chevron-left"></i></label>
          </div>
        </div>
        <div className="page" id="page2">
          <div className="front-page">
            <p>Jaquer face man ipsum dolor sit amet consectetur, adipisicing elit. Nihil magni laudantium beatae quia. Recusandae, fuga quas consectetur perferendis aperiam esse velit veniam ducimus? Quisquam consequatur perferendis quidem quia, recusandae ab!</p>
            <label className="next" htmlFor="checkbox-page2"><i className="fas fa-chevron-right"></i></label>
          </div>
          <div className="back-page">
            <img src={page2} alt="1jpg" />
            <label className="prev" htmlFor="checkbox-page2"><i className="fas fa-chevron-left"></i></label>
          </div>
        </div>
        <div className="page" id="page3">
            <div className="front-page">
                <h2>Page 3</h2>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil magni laudantium beatae quia. Recusandae, fuga quas consectetur perferendis aperiam esse velit veniam ducimus? Quisquam consequatur perferendis quidem quia, recusandae ab!</p>
            </div>
        </div>
        <div className="back-cover" />
      </div> */}
      <div className="card">
        <div className="card__content">
          <div className="card__front">
            <h3 className="card__title">
              The Fair
            </h3>
            <p className="card__subtitle">
              Time for some funcs
            </p>
          </div>

          <div className="card__back">
            <p className="card__body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda illo laboriosam facere tempore, voluptas atque accusantium odit reiciendis iure alias. Esse cupiditate, amet ratione pariatur odit aliquid sapiente modi debitis?
            </p>
          </div>
          
        </div>
      </div>

    </div>
  )
}

export default Book