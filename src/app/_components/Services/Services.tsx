import React from 'react';
import Link from 'next/link';
import styles from './Services.module.scss';
import { services } from '@/constants/services';
import { Icon } from '@/components/ui/Icon/Icon';

const Services: React.FC = () => {
    return (
        <section className={styles.services}>
            <div className={styles.services__container}>
                <div className={styles.services__header}>
                    <h2 className={styles.services__title}>Our Services</h2>
                    <p className={styles.services__subtitle}>
                        Residential & Commercial Cleaning, Laundry, Mobile Car Wash, and Errand Services – Delivered with Excellence.
                        From cleaning and laundry to cooking, errands, mobile car washing, pest control, and more – we handle it all so you can focus on what matters most
                    </p>
                </div>

                <div className={styles.services__grid}>
                    {services.map((service) => (
                        <Link
                            href={`/services/${service.slug}`}
                            key={service.id}
                            className={styles.services__card}
                        >
                            <div className={styles.services__iconWrapper}>
                                <div className={styles.services__icon}>
                                    <Icon name={service.icon} />
                                </div>
                            </div>
                            <div>


                                <h3 className={styles.services__cardTitle}>{service.name}</h3>
                                <p className={styles.services__cardDescription}>{service.shortDescription}</p>
                                <span className={styles.services__cardLink}>
                                    Learn more
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;