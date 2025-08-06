import React from 'react';
import styles from './OurProcess.module.scss';

interface ProcessStep {
    id: number;
    title: string;
    description: string;
    icon: string;
}

const processData: ProcessStep[] = [
    {
        id: 1,
        title: 'Schedule Your Service',
        description: 'Easily book your cleaning service online or by phone. Select your service type.',
        icon: '★'
    },
    {
        id: 2,
        title: 'We Clean',
        description: 'Our team arrives on time, fully equipped and ready to transform your space.',
        icon: '★'
    },
    {
        id: 3,
        title: 'Enjoy Your Sparkling Space',
        description: 'Relax and enjoy a freshly cleaned environment that enhances your well-being.',
        icon: '★'
    }
];

const OurProcess = () => {
    return (
        <section className={styles.process}>
            <div className={styles.process__container}>
                <h2 className={styles.process__title}>Our Process</h2>
                <p className={styles.process__subtitle}>We know your time is valuable</p>

                <div className={styles.process__steps}>
                    {processData.map((step) => (
                        <div key={step.id} className={styles.process__step}>
                            <div className={styles.process__stepIcon}>
                                <span className={styles.process__icon}>{step.icon}</span>
                            </div>
                            <div className={styles.process__stepNumber}>{step.id}.</div>
                            <h3 className={styles.process__stepTitle}>{step.title}</h3>
                            <p className={styles.process__stepDescription}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurProcess;