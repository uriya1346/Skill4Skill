import styles from "../css/Thumbnail.module.css";
const Thumbnail = () => {
  return (
    <div className={styles.thumbnail}>
      <b className={styles.collegeIllustrations}>
        <p className={styles.college}>Barter</p>
        <p className={styles.illustrations}>
          <span className={styles.illustrations1}>
            <span className={styles.span}>{` `}</span>
            <span className={styles.illustrations2}>Illustrations</span>
          </span>
        </p>
      </b>
      <div className={styles.groupParent}>
      </div>
      <b className={styles.free3d}>SKILL4SKILL</b>
      <div className={styles.toshjmoshAStunning3dCartooParent}>
        <img
          className={styles.toshjmoshAStunning3dCartooIcon}
          alt=""
          src="images/home/toshjmosh-a-stunning-3d-cartoon-illustration-of-a-female-studen-cbfe8361841b47b487f5310e8b96eb6a@2x.png"
        />
        <img
          className={styles.toshjmoshAStunning3dCartooIcon1}
          alt=""
          src="images/home/toshjmosh-a-stunning-3d-cartoon-illustration-of-a-male-student--1d5b097ccf94409ea42c6d171d839dc8@2x.png"
        />
        <div className={styles.groupChild} />
      </div>
    </div>
  );
};

export default Thumbnail;
