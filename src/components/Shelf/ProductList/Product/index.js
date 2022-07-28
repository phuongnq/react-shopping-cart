import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  ExperienceBuilder,
  Model,
  RenderField,
} from '@craftercms/experience-builder/react';
import { parseDescriptor } from '@craftercms/content';

import Thumb from '../../../Thumb';
import { formatPrice } from '../../../../services/util';
import { addProduct } from '../../../../services/cart/actions';

const Product = ({ product, addProduct, isAuthoring }) => {
  const model = parseDescriptor(product.descriptor);
  product.quantity = 1;

  let formattedPrice = formatPrice(product.price, product.currencyId);

  let productInstallment;

  if (!!product.installments) {
    const installmentPrice = product.price / product.installments;

    productInstallment = (
      <div className="installment">
        <span>or </span>
        <RenderField
          model={model}
          fieldId="installments_s"
          component="span"
        >
          {product.installments}
        </RenderField>
        <span> x</span>
        <b>
          {product.currencyFormat}
          {formatPrice(installmentPrice, product.currencyId)}
        </b>
      </div>
    );
  }

  return (
    <ExperienceBuilder path={model.craftercms.path} isAuthoring={isAuthoring}>
      <Model
        model={model}
        className="shelf-item"
      >
        <div
          data-sku={product.sku}
        >
          {product.isFreeShipping && (
            <div className="shelf-stopper">Free shipping</div>
          )}
          <RenderField
            model={model}
            fieldId="largeImage_s"
            render={(value, fieldId) => {
              return (
                <Thumb classes="shelf-item__thumb" src={product.largeImage} alt={product.title} />
              );
            }}
          />
          <RenderField
            model={model}
            fieldId="title_s"
            component="p"
            className="shelf-item__title"
          >
            {product.title}
          </RenderField>
          <div className="shelf-item__price">
            <div className="val">
              <small>{product.currencyFormat}</small>
              <RenderField
                model={model}
                fieldId="price_s"
                component="span"
                render={(value, fieldId) => {
                  return (
                    <span>
                      <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
                      <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
                    </span>
                  )
                }}
              />
            </div>
              {productInstallment}
          </div>
          <div className="shelf-item__buy-btn" onClick={() => addProduct(product)}>Add to cart</div>
        </div>
      </Model>
    </ExperienceBuilder>
  );
};

const mapStateToProps = state => {
  console.log(state);
  return {
    isAuthoring: state.authoring.isAuthoring,
  };
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { addProduct }
)(Product);
