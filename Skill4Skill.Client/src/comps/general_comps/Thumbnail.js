import styles from "../css/Thumbnail.module.css";
const Thumbnail = () => {
  return (
    <div className={styles.thumbnail}>
      <b className={styles.collegeIllustrations}>
        <p className={styles.college}>Barter</p>
        <p className={styles.illustrations}>
          <span className={styles.illustrations1}>
            <span className={styles.span}>{` `}</span>
            <span className={styles.illustrations2}>World</span>
            {/* <p>Where Teams Grow Together</p> */}
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
          src="images/avatar/two.png"
        />
        <img
          className={styles.toshjmoshAStunning3dCartooIcon1}
          alt=""
          src="images/avatar/one.png"
        />
        <div className={styles.groupChild} />
      </div>
    </div>
  );
};

export default Thumbnail;
