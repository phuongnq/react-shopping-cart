import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { from, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { getICEAttributes, fetchIsAuthoring, repaintPencils } from '@craftercms/ice';
import { useICE } from '@craftercms/ice/react';
import { getItem, parseDescriptor } from '@craftercms/content';

import Thumb from '../../../Thumb';
import { formatPrice, getCookie } from '../../../../services/util';
import { addProduct } from '../../../../services/cart/actions';

const Product = ({ product, addProduct }) => {
  const [state, setState] = useState();

  useEffect(() => {
    forkJoin({
      isAuthoring: from(fetchIsAuthoring()),
      model: getItem(product.cmsId, { site: getCookie('crafterSite') }).pipe(map(parseDescriptor))
    }).subscribe(({ isAuthoring, model }) => {
      setState({ isAuthoring, model });
    });
  }, []);

  return (
    state ? <IceProduct
              product={product}
              isAuthoring={state.isAuthoring}
              model={state.model}
            />
          :
          'Loading...'
  );
};

function IceProduct(props) {
  const { product, isAuthoring, model } = props;
  const ice = useICE({ isAuthoring, model }).props;

  product.quantity = 1;

  let formattedPrice = formatPrice(product.price, product.currencyId);

  let productInstallment;

  if (!!product.installments) {
    const installmentPrice = product.price / product.installments;

    productInstallment = (
      <div className="installment">
        <span>or {product.installments} x</span>
        <b>
          {product.currencyFormat}
          {formatPrice(installmentPrice, product.currencyId)}
        </b>
      </div>
    );
  }

  return (
    <div
      className="shelf-item"
      onClick={() => addProduct(product)}
      data-sku={product.sku}
      {...ice}
    >
      {product.isFreeShipping && (
        <div className="shelf-stopper">Free shipping</div>
      )}
      <Thumb
        classes="shelf-item__thumb"
        src={product.largeImage}
        alt={product.title}
      />
      <p className="shelf-item__title">{product.title}</p>
      <div className="shelf-item__price">
        <div className="val">
          <small>{product.currencyFormat}</small>
          <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
        </div>
        {productInstallment}
      </div>
      <div className="shelf-item__buy-btn">Add to cart</div>
    </div>
  );
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

export default connect(
  null,
  { addProduct }
)(Product);
