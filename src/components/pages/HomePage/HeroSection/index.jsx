import { MediaContainer } from 'components/common';

import Video from 'assets/videos/hero2.mp4';

import styles from './index.module.scss';

const HeroSection = () => {
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <MediaContainer
          video={Video}
          autoPlay
          loop
          muted
          containerClassName={styles.video_container}
          fillClassName={styles.video_fill}
          mediaClassName={styles.video}
        />
        <div className={styles.content}>
          <div className={styles.logo_wrapper}>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
