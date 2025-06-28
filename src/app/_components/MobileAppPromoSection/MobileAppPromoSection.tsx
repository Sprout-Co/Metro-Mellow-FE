// import React from 'react';
// import styles from './MobileAppPromoSection.module.scss';

// const MobileAppPromoSection = () => {
//   return (
//     <section className={styles['app-promo']}>
//       <div className={styles['app-promo__container']}>
//         <div className={styles['app-promo__content']}>
//           <h2 className={styles['app-promo__heading']}>
//             It gets even <br /> better with our <br /> mobile App
//           </h2>
//           <p className={styles['app-promo__description']}>
//             We're the spark that turns your chaos into calm, the groove that gets your life back in tune.
//           </p>
//           <div className={styles['app-promo__buttons']}>
//             <button className={styles['app-promo__button-primary']}>
//               DOWNLOAD THE APP
//             </button>
//             <button className={styles['app-promo__button-secondary']}>
//               IOS DOWNLOAD
//             </button>
//           </div>
//         </div>
//         <div className={styles['app-promo__image']}>
//           <img
//             className={styles['app-promo__phone']}
//             src="/images/home/iphone.jpeg"
//             alt="Metromellow mobile app on iPhone"
//             width={350}
//             height={700}
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MobileAppPromoSection;




import React from 'react';
import styles from './MobileAppPromoSection.module.scss';

const MobileAppPromoSection = () => {
  return (
    <section className={styles['app-promo']}>
      <div className={styles['app-promo__container']}>
        <div className={styles['app-promo__content']}>
          <h2 className={styles['app-promo__heading']}>
            It gets even <br /> better with our <br /> mobile App
          </h2>
          <p className={styles['app-promo__description']}>
            We're the spark that turns your chaos into calm, the groove that gets your life back in tune.
          </p>
          <div className={styles['app-promo__buttons']}>
            <button className={styles['app-promo__button-primary']}>
              DOWNLOAD THE APP
            </button>
            <button className={styles['app-promo__button-secondary']}>
              IOS DOWNLOAD
            </button>
          </div>
        </div>
        <div className={styles['app-promo__image']}>
          <img
            className={styles['app-promo__phone']}
            src="/images/home/iphone.jpeg"
            alt="Metromellow mobile app on iPhone"
            width={350}
            height={700}
          />
        </div>
      </div>
    </section>
  );
};

export default MobileAppPromoSection;