import React, { useState } from 'react';

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  onQuickView,
  isWishlisted,
  isCompared,
  formatPrice
}) {
  const [selectedPlan, setSelectedPlan] = useState(12);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const {
    name,
    brand,
    subCategory,
    price,
    oldPrice,
    discount,
    rating,
    reviewsCount,
    inStock,
    isNew,
    isHit,
    warranty,
    image,
    specs
  } = product;

  // Tanlangan oy bo'yicha oylik to'lovni hisoblash
  const monthlyPayment = Math.round(price / selectedPlan);

  // Tejamkorlik summasi
  const savedAmount = oldPrice ? oldPrice - price : 0;

  // Xususiyatlarni massivga aylantirish
  const specEntries = Object.entries(specs || {});
  const visibleSpecs = showAllSpecs ? specEntries : specEntries.slice(0, 3);

  // Savatchaga qo'shish tugmasi bosilganda qisqa vizual effekt
  const handleCartClick = () => {
    if (!inStock) return;
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => {
      setIsAdding(false);
    }, 650);
  };

  // Yulduzchalarni vizual ko'rsatish
  const renderStars = (score) => {
    const fullStars = Math.round(score);
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`ever-card__star ${index < fullStars ? 'filled' : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <article
      className={`ever-card ${!inStock ? 'ever-card--out-of-stock' : ''} ${
        isCompared ? 'ever-card--compared' : ''
      }`}
    >
      {/* Yuqori rasm va nishonlar qismi */}
      <div className="ever-card__media">
        {/* Chap yuqori burchakdagi status nishonlari */}
        <div className="ever-card__badges">
          {discount > 0 && (
            <span className="ever-card__badge ever-card__badge--discount">
              −{discount}%
            </span>
          )}
          {isNew && (
            <span className="ever-card__badge ever-card__badge--new">
              YANGI
            </span>
          )}
          {isHit && (
            <span className="ever-card__badge ever-card__badge--hit">
              XIT SAVDO
            </span>
          )}
        </div>

        {/* O'ng yuqori burchakdagi interaktiv tugmalar */}
        <div className="ever-card__floating-actions">
          <button
            type="button"
            className={`ever-card__icon-btn ${isWishlisted ? 'active' : ''}`}
            onClick={() => onToggleWishlist(product)}
            title={
              isWishlisted
                ? 'Sevimlilardan olib tashlash'
                : 'Sevimlilarga qo‘shish'
            }
            aria-label="Sevimlilar"
          >
            {isWishlisted ? '♥' : '♡'}
          </button>

          <button
            type="button"
            className={`ever-card__icon-btn ${isCompared ? 'active' : ''}`}
            onClick={() => onToggleCompare(product)}
            title={
              isCompared
                ? 'Solishtirishdan olib tashlash'
                : 'Solishtirishga qo‘shish'
            }
            aria-label="Solishtirish"
          >
            ⚖️
          </button>

          <button
            type="button"
            className="ever-card__icon-btn"
            onClick={() => onQuickView(product)}
            title="Tezkor ko‘rish"
            aria-label="Tezkor ko‘rish"
          >
            👁️
          </button>
        </div>

        {/* Mahsulot rasmi */}
        <div
          className="ever-card__img-wrap"
          onClick={() => onQuickView(product)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onQuickView(product);
          }}
        >
          <img
            src={image}
            alt={name}
            className="ever-card__img"
            loading="lazy"
          />
          <div className="ever-card__quick-overlay">
            <span>Tezkor ko‘rish</span>
          </div>
        </div>

        {/* Sotuvda mavjud emas qatlami */}
        {!inStock && (
          <div className="ever-card__soldout-ribbon">
            Vaqtincha sotuvda yo‘q
          </div>
        )}
      </div>

      {/* Karta asosiy ma'lumotlar qismi */}
      <div className="ever-card__body">
        {/* Brend, kategoriya va mavjudlik holati */}
        <div className="ever-card__meta-top">
          <span className="ever-card__brand">
            {brand} • <small>{subCategory}</small>
          </span>
          <span
            className={`ever-card__stock ${
              inStock ? 'in-stock' : 'no-stock'
            }`}
          >
            <i className="ever-card__stock-dot"></i>
            {inStock ? 'Sotuvda bor' : 'Tugagan'}
          </span>
        </div>

        {/* Mahsulot nomi */}
        <h3
          className="ever-card__title"
          onClick={() => onQuickView(product)}
          title={name}
        >
          {name}
        </h3>

        {/* Reyting va sharhlar */}
        <div className="ever-card__rating-row">
          <div className="ever-card__stars">
            {renderStars(rating)}
            <span className="ever-card__rating-num">{rating.toFixed(1)}</span>
          </div>
          <span className="ever-card__reviews">
            ({reviewsCount} ta sharh)
          </span>
        </div>

        {/* Asosiy texnik xususiyatlar */}
        <div className="ever-card__specs">
          <ul className="ever-card__specs-list">
            {visibleSpecs.map(([specKey, specValue]) => (
              <li key={specKey} className="ever-card__spec-item">
                <span className="ever-card__spec-key">{specKey}:</span>
                <span className="ever-card__spec-val">{specValue}</span>
              </li>
            ))}
          </ul>

          {specEntries.length > 3 && (
            <button
              type="button"
              className="ever-card__specs-toggle"
              onClick={() => setShowAllSpecs((prev) => !prev)}
            >
              {showAllSpecs
                ? 'Qisqartirish ▲'
                : `Barcha xususiyatlar (${specEntries.length}) ▼`}
            </button>
          )}
        </div>

        {/* Kafolat nishoni */}
        <div className="ever-card__warranty">
          <span>🛡️</span>
          <span>{warranty}</span>
        </div>

        {/* Muddatli to'lov mini-kalkulyatori */}
        <div className="ever-card__installment">
          <div className="ever-card__installment-head">
            <span className="ever-card__installment-label">
              Muddatli to‘lov (0%):
            </span>
            <div className="ever-card__plan-pills">
              {[6, 12, 24].map((months) => (
                <button
                  key={months}
                  type="button"
                  className={`ever-card__plan-pill ${
                    selectedPlan === months ? 'active' : ''
                  }`}
                  onClick={() => setSelectedPlan(months)}
                >
                  {months} oy
                </button>
              ))}
            </div>
          </div>

          <div className="ever-card__installment-val">
            <strong>{formatPrice(monthlyPayment)}</strong>
            <span> / oyiga</span>
          </div>
        </div>

        {/* Narx va Savatchaga qo'shish qismi */}
        <div className="ever-card__footer">
          <div className="ever-card__price-box">
            {oldPrice && (
              <div className="ever-card__old-row">
                <span className="ever-card__old-price">
                  {formatPrice(oldPrice)}
                </span>
                {savedAmount > 0 && (
                  <span className="ever-card__saved-pill">
                    −{formatPrice(savedAmount)}
                  </span>
                )}
              </div>
            )}
            <div className="ever-card__current-price">
              {formatPrice(price)}
            </div>
          </div>

          <button
            type="button"
            disabled={!inStock}
            onClick={handleCartClick}
            className={`ever-card__cart-btn ${
              isAdding ? 'ever-card__cart-btn--added' : ''
            }`}
          >
            {!inStock ? (
              <span>Mavjud emas</span>
            ) : isAdding ? (
              <>
                <span>✓</span>
                <span>Qo‘shildi</span>
              </>
            ) : (
              <>
                <span>🛒</span>
                <span>Savatga</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}